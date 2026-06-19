"use client";

import { useState } from "react";
import { QrPoster, type QrPosterFormat } from "./QrPoster";

interface QrPrintPageProps {
  qrDataUrl: string;
  batevUrl: string;
  downloadUrl: string;
}

const PRINT_STYLES: Record<QrPosterFormat, string> = {
  a4: `
    @page { size: A4 portrait; margin: 12mm; }
    .print-poster { max-width: 100% !important; }
  `,
  a5: `
    @page { size: A5 portrait; margin: 8mm; }
    .print-poster { max-width: 148mm !important; margin: 0 auto !important; }
  `,
};

export function QrPrintPage({
  qrDataUrl,
  batevUrl,
  downloadUrl,
}: QrPrintPageProps) {
  const [format, setFormat] = useState<QrPosterFormat>("a4");

  const handlePrint = () => {
    const styleId = "qr-print-page-size";
    let styleEl = document.getElementById(styleId) as HTMLStyleElement | null;

    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }

    styleEl.textContent = `
      @media print {
        ${PRINT_STYLES[format]}
        body { background: white !important; color: black !important; }
        .print-poster {
          background: white !important;
          color: #05070A !important;
          border: 1px solid #e5e7eb !important;
          box-shadow: none !important;
        }
        .print-poster * { color: #05070A !important; }
        .print-accent { color: #e31e24 !important; }
        .print\\:hidden { display: none !important; }
      }
    `;

    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="print:hidden">
        <h1 className="text-2xl font-bold">QR imprimible BATEV</h1>
        <p className="text-muted text-sm mt-1">
          Elegí formato, imprimí o descargá el QR. Apunta a{" "}
          <span className="text-pi-red break-all">{batevUrl}</span>
        </p>
      </div>

      <div className="print:hidden flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex rounded-xl border border-white/10 overflow-hidden">
          <button
            type="button"
            onClick={() => setFormat("a4")}
            className={[
              "px-4 py-2 text-sm font-medium transition-colors",
              format === "a4"
                ? "bg-electric text-background"
                : "bg-white/5 text-muted hover:text-white",
            ].join(" ")}
          >
            A4 — Cartel stand
          </button>
          <button
            type="button"
            onClick={() => setFormat("a5")}
            className={[
              "px-4 py-2 text-sm font-medium transition-colors",
              format === "a5"
                ? "bg-electric text-background"
                : "bg-white/5 text-muted hover:text-white",
            ].join(" ")}
          >
            A5 — Mesa / mostrador
          </button>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handlePrint}
            className="rounded-xl bg-electric px-5 py-2.5 text-sm font-medium text-background hover:bg-[#33bff2] transition-colors"
          >
            Imprimir {format.toUpperCase()}
          </button>
          <a
            href={downloadUrl}
            download="batev-qr-pi.png"
            className="rounded-xl border border-electric text-electric px-5 py-2.5 text-sm font-medium hover:bg-electric/10 transition-colors"
          >
            Descargar PNG
          </a>
        </div>
      </div>

      <QrPoster format={format} qrDataUrl={qrDataUrl} batevUrl={batevUrl} />
    </div>
  );
}
