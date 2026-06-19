import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Button } from "@/components/ui/Button";
import { PiLogo } from "@/components/brand/PiLogo";

const features = [
  {
    icon: "📘",
    title: "Libro digital gratuito",
    description: "Guía completa sobre hogares inteligentes",
  },
  {
    icon: "🎧",
    title: "Audiolibro",
    description: "Aprendé mientras te movés",
  },
  {
    icon: "🎙️",
    title: "Podcast exclusivo",
    description: "Contenido premium para profesionales",
  },
  {
    icon: "✅",
    title: "Checklist profesional",
    description: "Lista de verificación para obras",
  },
  {
    icon: "🔧",
    title: "Guía de preinstalación",
    description: "Canalizaciones y rack técnico",
  },
  {
    icon: "📊",
    title: "Diagnóstico personalizado",
    description: "Score tecnológico de tu proyecto",
  },
];

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 hero-glow">
        <section className="mx-auto max-w-6xl px-4 py-16 sm:py-24 text-center">
          <div className="flex justify-center mb-8">
            <PiLogo size="xl" showUrl align="center" priority />
          </div>
          <p className="text-pi-red text-sm uppercase tracking-widest mb-4 font-medium">
            Jaime Smart Advisor · BATEV
          </p>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="gradient-text">
              La casa inteligente empieza antes de colocar el primer ladrillo
            </span>
          </h1>
          <p className="mt-6 text-muted text-base sm:text-lg max-w-2xl mx-auto">
            Jaime Smart Advisor te ayuda a evaluar la preparación tecnológica de
            tu obra: domótica, seguridad, conectividad, energía solar e
            inteligencia artificial.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/diagnostico">
              <Button size="lg">Comenzar diagnóstico gratuito</Button>
            </Link>
            <Link href="/batev">
              <Button variant="outline" size="lg">
                Stand BATEV
              </Button>
            </Link>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">
            Qué recibís al completar el diagnóstico
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f) => (
              <div key={f.title} className="glass-card rounded-2xl p-6">
                <span className="text-3xl">{f.icon}</span>
                <h3 className="font-semibold mt-3">{f.title}</h3>
                <p className="text-sm text-muted mt-2">{f.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 pb-20 text-center">
          <div className="glass-card rounded-2xl p-8 sm:p-12">
            <h2 className="text-2xl font-bold mb-4">
              Tecnología, seguridad y confort en un solo diagnóstico
            </h2>
            <p className="text-muted mb-6">
              Diseñado para arquitectos, constructores, desarrolladores y
              propietarios que quieren evitar errores costosos en obra.
            </p>
            <Link href="/diagnostico">
              <Button size="lg">Empezar ahora — es gratis</Button>
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
