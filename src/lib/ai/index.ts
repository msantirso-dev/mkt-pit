import { callOllama, checkOllamaHealth } from "./ollama";
import { buildFallbackAdvice } from "./prompts";

export interface AIAdvisorContext {
  leadId: string;
  firstName: string;
  technicalScore: number;
  commercialScore: number;
  recommendations: string[];
  interests: string[];
}

export interface AIAdvisorResponse {
  message: string;
  provider: "ollama" | "fallback" | "stub";
  model?: string;
}

export function isAiEnabled(): boolean {
  return process.env.AI_ENABLED === "true";
}

export async function getJaimeAdvisorResponse(
  context: AIAdvisorContext
): Promise<AIAdvisorResponse> {
  if (!isAiEnabled()) {
    return {
      message: buildFallbackAdvice(context),
      provider: "fallback",
    };
  }

  try {
    const healthy = await checkOllamaHealth();
    if (!healthy) {
      console.warn("Ollama no disponible, usando fallback");
      return {
        message: buildFallbackAdvice(context),
        provider: "fallback",
      };
    }

    return await callOllama(context);
  } catch (error) {
    console.error("Jaime IA error:", error);
    return {
      message: buildFallbackAdvice(context),
      provider: "fallback",
    };
  }
}

export const AI_CONFIG = {
  ollamaUrl: process.env.OLLAMA_URL ?? "http://localhost:11434",
  openaiApiKey: process.env.OPENAI_API_KEY ?? "",
  model: process.env.AI_MODEL ?? "llama3.2",
  enabled: process.env.AI_ENABLED === "true",
} as const;
