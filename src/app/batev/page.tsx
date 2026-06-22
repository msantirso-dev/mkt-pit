import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Button } from "@/components/ui/Button";
import { PiLogo } from "@/components/brand/PiLogo";
import { KitItemCard } from "@/components/ui/KitItemCard";

const kitItems = [
  { id: "libro", icon: "📘", title: "Libro digital gratuito", desc: "De la cueva al hogar inteligente" },
  { id: "audiolibro", icon: "🎧", title: "Audiolibro", desc: "Escuchalo donde quieras" },
  { id: "podcast", icon: "🎙️", title: "Podcast exclusivo BATEV", desc: "¿Cada inteligente? — PI Proyectos Inteligentes" },
  { id: "checklist", icon: "✅", title: "Checklist profesional", desc: "Para viviendas inteligentes" },
  { id: "canalizaciones", icon: "🔧", title: "Guía de preinstalación", desc: "Canalizaciones recomendadas" },
  { id: "diagnostico", icon: "📊", title: "Diagnóstico personalizado", desc: "Score tecnológico de tu obra" },
];

export default function BatevPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 hero-glow">
        <section className="mx-auto max-w-6xl px-4 py-12 sm:py-20">
          <div className="flex justify-center mb-6">
            <PiLogo size="lg" showUrl align="center" priority />
          </div>
          <div className="text-center mb-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <span className="inline-block rounded-full border border-pi-red/30 bg-pi-red/10 px-4 py-1 text-xs text-pi-red uppercase tracking-widest">
              BATEV 2026
            </span>
            <Link
              href="/expo-batev"
              className="text-xs text-electric hover:underline"
            >
              Info de la expo y acreditación →
            </Link>
          </div>

          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              La casa inteligente empieza antes de colocar el primer ladrillo
            </h1>
            <p className="mt-6 text-muted text-base sm:text-lg">
              Descubrí en 2 minutos qué tan preparada está tu obra para domótica,
              seguridad, conectividad, energía solar e inteligencia artificial.
            </p>
            <div className="mt-8">
              <Link href="/diagnostico">
                <Button size="lg">Comenzar diagnóstico gratuito</Button>
              </Link>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {kitItems.map((item) => (
              <KitItemCard key={item.id} item={item} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-muted mb-4">
              Stand BATEV ·{" "}
              <a
                href="https://pit.com.ar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-pi-red transition-colors"
              >
                pit.com.ar
              </a>
            </p>
            <Link href="/diagnostico">
              <Button variant="outline" size="lg">
                Quiero mi kit digital gratuito
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
