import { JAIME_SYSTEM_PROMPT, buildJaimeUserPrompt } from "./prompts";
import type { AIAdvisorContext, AIAdvisorResponse } from "./index";

const OLLAMA_TIMEOUT_MS = 30000;

export async function callOllama(
  context: AIAdvisorContext
): Promise<AIAdvisorResponse> {
  const ollamaUrl = (process.env.OLLAMA_URL ?? "http://localhost:11434").replace(
    /\/$/,
    ""
  );
  const model = process.env.AI_MODEL ?? "llama3.2";

  const response = await fetch(`${ollamaUrl}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: JAIME_SYSTEM_PROMPT },
        { role: "user", content: buildJaimeUserPrompt(context) },
      ],
      stream: false,
      options: {
        temperature: 0.7,
        num_predict: 400,
      },
    }),
    signal: AbortSignal.timeout(OLLAMA_TIMEOUT_MS),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Ollama error ${response.status}: ${text}`);
  }

  const data = (await response.json()) as {
    message?: { content?: string };
  };

  const message = data.message?.content?.trim();
  if (!message) {
    throw new Error("Ollama devolvió respuesta vacía");
  }

  return {
    message,
    provider: "ollama",
    model,
  };
}

export async function checkOllamaHealth(): Promise<boolean> {
  try {
    const ollamaUrl = (process.env.OLLAMA_URL ?? "http://localhost:11434").replace(
      /\/$/,
      ""
    );
    const response = await fetch(`${ollamaUrl}/api/tags`, {
      signal: AbortSignal.timeout(5000),
    });
    return response.ok;
  } catch {
    return false;
  }
}
