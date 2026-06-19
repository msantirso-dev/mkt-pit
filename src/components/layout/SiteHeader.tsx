import Link from "next/link";
import { PiLogo } from "@/components/brand/PiLogo";

interface SiteHeaderProps {
  showCta?: boolean;
}

export function SiteHeader({ showCta = true }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <PiLogo size="md" showUrl={false} />
          <div className="hidden sm:block h-8 w-px bg-white/10" />
          <Link href="/" className="hidden sm:block min-w-0">
            <span className="text-sm font-semibold text-white">Jaime Smart Advisor</span>
            <span className="block text-[11px] text-muted">Diagnóstico tecnológico BATEV</span>
          </Link>
        </div>
        {showCta && (
          <Link
            href="/diagnostico"
            className="shrink-0 rounded-xl bg-pi-red px-4 py-2 text-sm font-medium text-white hover:bg-[#c9191f] transition-colors"
          >
            Diagnóstico gratuito
          </Link>
        )}
      </div>
    </header>
  );
}
