import { getJaimeAdvisorResponse } from "@/lib/ai";

interface JaimeAdviceProps {
  leadId: string;
  firstName: string;
  technicalScore: number;
  commercialScore: number;
  recommendations: string[];
  interests: string[];
}

export async function JaimeAdvice({
  leadId,
  firstName,
  technicalScore,
  commercialScore,
  recommendations,
  interests,
}: JaimeAdviceProps) {
  const advice = await getJaimeAdvisorResponse({
    leadId,
    firstName,
    technicalScore,
    commercialScore,
    recommendations,
    interests,
  });

  return (
    <div className="glass-card rounded-2xl p-6 mt-6 border border-electric/20">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-electric/20 text-electric font-bold">
          J
        </div>
        <div>
          <h2 className="font-semibold">Consejo de Jaime</h2>
          <p className="text-xs text-muted">
            {advice.provider === "ollama"
              ? `Asesor IA · ${advice.model ?? "Ollama"}`
              : advice.provider === "fallback"
                ? "Asesor PI Proyectos Inteligentes"
                : "Jaime Smart Advisor"}
          </p>
        </div>
      </div>
      <div className="text-sm text-muted leading-relaxed whitespace-pre-line">
        {advice.message}
      </div>
    </div>
  );
}

export function JaimeAdviceSkeleton() {
  return (
    <div className="glass-card rounded-2xl p-6 mt-6 border border-electric/20 animate-pulse">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 rounded-full bg-white/10" />
        <div className="space-y-2">
          <div className="h-4 w-32 bg-white/10 rounded" />
          <div className="h-3 w-24 bg-white/10 rounded" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 w-full bg-white/10 rounded" />
        <div className="h-3 w-full bg-white/10 rounded" />
        <div className="h-3 w-3/4 bg-white/10 rounded" />
      </div>
    </div>
  );
}
