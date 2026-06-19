"use client";

import { PiLogo } from "@/components/brand/PiLogo";

export type QrPosterFormat = "a4" | "a5";

interface QrPosterProps {
  format: QrPosterFormat;
  qrDataUrl: string;
  batevUrl: string;
}

const formatStyles: Record<
  QrPosterFormat,
  { poster: string; qr: number; title: string; subtitle: string; benefits: string }
> = {
  a4: {
    poster: "max-w-lg p-8 sm:p-12",
    qr: 280,
    title: "text-xl sm:text-2xl",
    subtitle: "text-sm",
    benefits: "text-sm space-y-2",
  },
  a5: {
    poster: "max-w-xs p-5 sm:p-6",
    qr: 200,
    title: "text-base sm:text-lg",
    subtitle: "text-xs",
    benefits: "text-xs space-y-1",
  },
};

export function QrPoster({ format, qrDataUrl, batevUrl }: QrPosterProps) {
  const s = formatStyles[format];

  return (
    <div
      data-poster-format={format}
      className={`print-poster mx-auto glass-card rounded-2xl text-center border-2 border-pi-red/30 ${s.poster}`}
    >
        <div className="flex justify-center mb-6">
          <PiLogo size={format === "a5" ? "sm" : "md"} showUrl align="center" href={null} />
        </div>

      <p className="text-xs uppercase tracking-widest text-pi-red mb-4 font-medium">
        BATEV 2026
      </p>

      <h2 className={`${s.title} font-bold leading-snug mb-2`}>
        Escaneá y descubrí qué tan preparada está tu obra
      </h2>
      <p className={`${s.subtitle} text-muted mb-6`}>
        Diagnóstico gratuito · Kit digital · 2 minutos
      </p>

      <div className="inline-block rounded-2xl bg-white p-3 sm:p-4 shadow-lg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={qrDataUrl}
          alt="QR BATEV - Jaime Smart Advisor"
          width={s.qr}
          height={s.qr}
          className="mx-auto"
        />
      </div>

      <p className="mt-6 text-base sm:text-lg font-semibold print-accent text-pi-red">
        Jaime Smart Advisor
      </p>
      <p className="text-[10px] sm:text-xs text-muted mt-2 break-all px-2">
        {batevUrl}
      </p>

      <div
        className={`mt-6 pt-4 border-t border-white/10 text-left text-muted ${s.benefits}`}
      >
        <p>✓ Diagnóstico tecnológico personalizado</p>
        <p>✓ Libro digital + audiolibro + podcast</p>
        <p>✓ Checklist profesional para obras inteligentes</p>
      </div>
    </div>
  );
}
