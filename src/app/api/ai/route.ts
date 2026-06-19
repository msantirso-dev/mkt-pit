import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateRecommendations } from "@/lib/recommendations";
import { getJaimeAdvisorResponse, isAiEnabled } from "@/lib/ai";

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

    const recommendations = generateRecommendations(
      lead.testAnswers.map((a) => ({
        questionKey: a.questionKey,
        answer: a.answer,
      }))
    );

    const response = await getJaimeAdvisorResponse({
      leadId: lead.id,
      firstName: lead.firstName,
      technicalScore: lead.technicalScore,
      commercialScore: lead.commercialScore,
      recommendations,
      interests: lead.interests as string[],
    });

    return NextResponse.json({
      ...response,
      aiEnabled: isAiEnabled(),
    });
  } catch (error) {
    console.error("AI API error:", error);
    return NextResponse.json({ error: "Error al generar consejo" }, { status: 500 });
  }
}

export async function GET() {
  const { checkOllamaHealth } = await import("@/lib/ai/ollama");
  const healthy = isAiEnabled() ? await checkOllamaHealth() : false;

  return NextResponse.json({
    enabled: isAiEnabled(),
    ollamaHealthy: healthy,
    model: process.env.AI_MODEL ?? "llama3.2",
    ollamaUrl: process.env.OLLAMA_URL ?? "http://localhost:11434",
  });
}
