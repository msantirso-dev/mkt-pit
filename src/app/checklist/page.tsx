import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ChecklistView } from "@/components/checklist/ChecklistView";
import { CHECKLIST_TOTAL } from "@/lib/checklist";

export const metadata: Metadata = {
  title: "Checklist profesional | Jaime Smart Advisor",
  description:
    "Checklist interactivo con todos los puntos a considerar para diseñar un hogar inteligente premium.",
};

export default function ChecklistPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 hero-glow">
        <div className="mx-auto max-w-4xl px-4 py-10 sm:py-16">
          <div className="text-center mb-10">
            <span className="inline-block rounded-full border border-success/30 bg-success/10 px-4 py-1 text-xs text-success uppercase tracking-widest font-medium mb-4">
              Checklist profesional
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold">
              Hogar inteligente: puntos clave
            </h1>
            <p className="text-muted text-sm sm:text-base mt-3 max-w-2xl mx-auto">
              {CHECKLIST_TOTAL} ítems organizados por sistema para que arquitectos,
              constructores y propietarios no dejen nada crítico fuera del proyecto.
            </p>
            <p className="text-xs text-muted mt-2">
              PI Proyectos Inteligentes · BATEV 2026
            </p>
          </div>

          <ChecklistView />

          <p className="text-center text-sm text-muted mt-8">
            <Link href="/batev" className="text-electric hover:underline">
              ← Volver al stand BATEV
            </Link>
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
