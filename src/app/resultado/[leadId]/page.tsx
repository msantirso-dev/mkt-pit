import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ScoreCard } from "@/components/ui/ScoreCard";
import { Button } from "@/components/ui/Button";
import { JaimeAdvice, JaimeAdviceSkeleton } from "@/components/ai/JaimeAdvice";
import { PodcastPlayer } from "@/components/ui/PodcastPlayer";
import {
  getTechnicalCategory,
  getTechnicalSummary,
} from "@/lib/scoring";
import { generateRecommendations } from "@/lib/recommendations";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ leadId: string }>;
}

export default async function ResultadoPage({ params }: PageProps) {
  const { leadId } = await params;

  const lead = await prisma.lead.findUnique({
    where: { id: leadId },
    include: { testAnswers: true },
  });

  if (!lead) {
    notFound();
  }

  const category = getTechnicalCategory(lead.technicalScore);
  const summary = getTechnicalSummary(lead.technicalScore);
  const recommendations = generateRecommendations(
    lead.testAnswers.map((a) => ({
      questionKey: a.questionKey,
      answer: a.answer,
    }))
  );

  return (
    <>
      <SiteHeader showCta={false} />
      <main className="flex-1 hero-glow">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:py-16">
          <div className="text-center mb-8">
            <p className="text-electric text-sm uppercase tracking-widest mb-2">
              Resultado del diagnóstico
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold">
              Hola, {lead.firstName}
            </h1>
            <p className="text-muted text-sm mt-2">
              Este es el análisis tecnológico de tu proyecto
            </p>
          </div>

          <ScoreCard
            title="Preparación tecnológica"
            score={lead.technicalScore}
            category={category}
            subtitle={summary}
          />

          {recommendations.length > 0 && (
            <div className="glass-card rounded-2xl p-6 mt-6">
              <h2 className="font-semibold mb-4">Recomendaciones para tu obra</h2>
              <ul className="space-y-3">
                {recommendations.map((rec, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-muted">
                    <span className="text-electric shrink-0">✓</span>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Suspense fallback={<JaimeAdviceSkeleton />}>
            <JaimeAdvice
              leadId={lead.id}
              firstName={lead.firstName}
              technicalScore={lead.technicalScore}
              commercialScore={lead.commercialScore}
              recommendations={recommendations}
              interests={lead.interests as string[]}
            />
          </Suspense>

          <div className="mt-8">
            <p className="text-sm text-muted mb-3 text-center">
              Escuchá ahora el podcast exclusivo de BATEV
            </p>
            <PodcastPlayer />
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link href={`/biblioteca/${leadId}`} className="flex-1">
              <Button fullWidth size="lg">
                Descargar kit digital gratuito
              </Button>
            </Link>
            <a
              href="mailto:contacto@piproyectos.com?subject=Reunión%20BATEV%20-%20Jaime%20Smart%20Advisor"
              className="flex-1"
            >
              <Button variant="success" fullWidth size="lg">
                Solicitar reunión
              </Button>
            </a>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
