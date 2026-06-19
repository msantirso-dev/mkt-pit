import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  calculateCommercialScore,
  calculateTechnicalScore,
  getLeadTemperature,
  getTechnicalCategory,
  getTechnicalSummary,
} from "@/lib/scoring";
import { generateRecommendations } from "@/lib/recommendations";

export async function POST(request: NextRequest) {
  try {
    const { leadId } = (await request.json()) as { leadId: string };

    if (!leadId) {
      return NextResponse.json({ error: "leadId requerido" }, { status: 400 });
    }

    const lead = await prisma.lead.findUnique({
      where: { id: leadId },
      include: { testAnswers: true },
    });

    if (!lead) {
      return NextResponse.json({ error: "Lead no encontrado" }, { status: 404 });
    }

    const answers = lead.testAnswers.map((a) => ({
      questionKey: a.questionKey,
      answer: a.answer,
    }));

    const technicalScore =
      answers.length > 0
        ? calculateTechnicalScore(answers)
        : lead.technicalScore;

    const interests = lead.interests as string[];
    const commercialScore = calculateCommercialScore({
      profile: lead.profile,
      projectType: lead.projectType,
      projectStage: lead.projectStage,
      projectTiming: lead.projectTiming,
      interests,
      whatsapp: lead.whatsapp,
    });

    const leadTemperature = getLeadTemperature(commercialScore);
    const category = getTechnicalCategory(technicalScore);
    const summary = getTechnicalSummary(technicalScore);
    const recommendations = generateRecommendations(answers);

    await prisma.lead.update({
      where: { id: leadId },
      data: {
        technicalScore,
        commercialScore,
        leadTemperature,
      },
    });

    return NextResponse.json({
      technicalScore,
      commercialScore,
      leadTemperature,
      category,
      summary,
      recommendations,
    });
  } catch (error) {
    console.error("Error calculating score:", error);
    return NextResponse.json(
      { error: "Error al calcular score" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const leadId = searchParams.get("leadId");

    if (!leadId) {
      return NextResponse.json({ error: "leadId requerido" }, { status: 400 });
    }

    const lead = await prisma.lead.findUnique({
      where: { id: leadId },
      include: { testAnswers: true },
    });

    if (!lead) {
      return NextResponse.json({ error: "Lead no encontrado" }, { status: 404 });
    }

    const answers = lead.testAnswers.map((a) => ({
      questionKey: a.questionKey,
      answer: a.answer,
    }));

    const category = getTechnicalCategory(lead.technicalScore);
    const summary = getTechnicalSummary(lead.technicalScore);
    const recommendations = generateRecommendations(answers);

    return NextResponse.json({
      technicalScore: lead.technicalScore,
      commercialScore: lead.commercialScore,
      leadTemperature: lead.leadTemperature,
      category,
      summary,
      recommendations,
    });
  } catch (error) {
    console.error("Error getting score:", error);
    return NextResponse.json(
      { error: "Error al obtener score" },
      { status: 500 }
    );
  }
}
