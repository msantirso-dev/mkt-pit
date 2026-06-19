import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { TEST_QUESTIONS } from "@/lib/constants";
import {
  calculateCommercialScore,
  calculateTechnicalScore,
  getAnswerScore,
  getLeadTemperature,
} from "@/lib/scoring";
import type { TestAnswerPayload } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as TestAnswerPayload;

    if (!body.leadId || !body.answers || body.answers.length === 0) {
      return NextResponse.json(
        { error: "Datos del test incompletos" },
        { status: 400 }
      );
    }

    const lead = await prisma.lead.findUnique({
      where: { id: body.leadId },
    });

    if (!lead) {
      return NextResponse.json({ error: "Lead no encontrado" }, { status: 404 });
    }

    await prisma.testAnswer.deleteMany({
      where: { leadId: body.leadId },
    });

    const testAnswers = body.answers.map((item) => {
      const question = TEST_QUESTIONS.find((q) => q.key === item.questionKey);
      return {
        leadId: body.leadId,
        questionKey: item.questionKey,
        questionText: question?.text ?? item.questionKey,
        answer: item.answer,
        score: getAnswerScore(item.answer),
      };
    });

    await prisma.testAnswer.createMany({ data: testAnswers });

    const technicalScore = calculateTechnicalScore(body.answers);
    const interests = lead.interests as string[];

    const commercialScore = calculateCommercialScore({
      profile: lead.profile,
      projectType: lead.projectType,
      projectStage: lead.projectStage,
      projectTiming: lead.projectTiming,
      interests,
      whatsapp: lead.whatsapp,
    });

    const updatedLead = await prisma.lead.update({
      where: { id: body.leadId },
      data: {
        technicalScore,
        commercialScore,
        leadTemperature: getLeadTemperature(commercialScore),
      },
      include: {
        testAnswers: true,
      },
    });

    return NextResponse.json({ lead: updatedLead });
  } catch (error) {
    console.error("Error saving test:", error);
    return NextResponse.json(
      { error: "Error al guardar el test" },
      { status: 500 }
    );
  }
}
