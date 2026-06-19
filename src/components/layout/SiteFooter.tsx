import { PiLogo } from "@/components/brand/PiLogo";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/5 mt-auto">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <PiLogo size="sm" href="https://pit.com.ar" showUrl align="center" />
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} PI Proyectos Inteligentes · BATEV · Jaime Smart Advisor
          </p>
        </div>
      </div>
    </footer>
  );
}
