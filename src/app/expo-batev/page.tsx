import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Button } from "@/components/ui/Button";
import { PiLogo } from "@/components/brand/PiLogo";
import {
  BATEV_ACCREDITATION_URL,
  BATEV_HIGHLIGHTS,
  BATEV_IMAGES,
  BATEV_INFO,
  BATEV_STATS_2025,
  BATEV_WEBSITE,
} from "@/lib/batev";

export const metadata: Metadata = {
  title: "BATEV 2026 | Acreditación y Expo",
  description:
    "Exposición Internacional de la Construcción y la Vivienda. 24 al 27 de junio 2026 en La Rural. Preacreditación online gratuita.",
};

export default function ExpoBatevPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={BATEV_IMAGES.background}
              alt="BATEV 2026"
              fill
              className="object-cover opacity-30"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background" />
          </div>

          <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-24">
            <div className="flex flex-col items-center text-center gap-6">
              <Image
                src={BATEV_IMAGES.logo}
                alt="BATEV"
                width={220}
                height={80}
                className="h-16 sm:h-20 w-auto"
                priority
              />
              <span className="inline-block rounded-full border border-pi-red/30 bg-pi-red/10 px-4 py-1 text-xs text-pi-red uppercase tracking-widest font-medium">
                Save the date
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight max-w-3xl">
                {BATEV_INFO.subtitle}
              </h1>
              <p className="text-lg sm:text-xl text-electric font-medium">
                {BATEV_INFO.dates} · {BATEV_INFO.hours}
              </p>
              <p className="text-muted">{BATEV_INFO.venue}</p>
              <p className="text-sm text-muted max-w-2xl">{BATEV_INFO.edition}</p>

              <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
                <a href={BATEV_ACCREDITATION_URL} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" fullWidth className="sm:min-w-[220px]">
                    Acreditarme gratis
                  </Button>
                </a>
                <Link href="/diagnostico">
                  <Button variant="outline" size="lg" fullWidth className="sm:min-w-[220px]">
                    Diagnóstico PI en el stand
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Promo + acreditación */}
        <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="glass-card rounded-2xl overflow-hidden border border-white/10">
              <Image
                src={BATEV_IMAGES.popup}
                alt="BATEV 2026 — Preacreditación"
                width={600}
                height={600}
                className="w-full h-auto"
              />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Preacreditación online
              </h2>
              <p className="text-muted leading-relaxed mb-4">
                Para ingresar a BATEV 2026 necesitás tu credencial de visitante.
                Completá el formulario oficial de preacreditación y recibí tu
                acceso de forma rápida y gratuita.
              </p>
              <ul className="space-y-2 text-sm text-muted mb-6">
                <li className="flex gap-2">
                  <span className="text-pi-red">✓</span> Registro online en pocos minutos
                </li>
                <li className="flex gap-2">
                  <span className="text-pi-red">✓</span> Acceso ágil el día de la feria
                </li>
                <li className="flex gap-2">
                  <span className="text-pi-red">✓</span> Sin costo para visitantes profesionales
                </li>
              </ul>
              <a
                href={BATEV_ACCREDITATION_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg">Ir al formulario de acreditación</Button>
              </a>
              <p className="text-xs text-muted mt-4">
                Formulario oficial en{" "}
                <a
                  href={BATEV_ACCREDITATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-electric hover:underline break-all"
                >
                  batev.com.ar/preacreditacion2026
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-bold text-center mb-8">
            La edición 2025 en números
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {BATEV_STATS_2025.map((stat) => (
              <div key={stat.label} className="glass-card rounded-2xl p-6 text-center">
                <p className="text-3xl sm:text-4xl font-bold text-electric">{stat.value}</p>
                <p className="text-sm text-muted mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Highlights */}
        <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">
            Por qué visitar BATEV
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {BATEV_HIGHLIGHTS.map((item) => (
              <div key={item.title} className="glass-card rounded-2xl p-6">
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PI en BATEV */}
        <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
          <div className="glass-card rounded-2xl p-8 sm:p-12 border border-pi-red/20">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <PiLogo size="lg" showUrl align="center" href={null} />
              <div className="flex-1 text-center lg:text-left">
                <h2 className="text-2xl font-bold mb-3">
                  PI Proyectos Inteligentes en BATEV
                </h2>
                <p className="text-muted leading-relaxed mb-6">
                  Visitá nuestro stand y descubrí <strong className="text-white">Jaime Smart Advisor</strong>:
                  un diagnóstico tecnológico gratuito para tu obra en 2 minutos.
                  Domótica, seguridad, conectividad, energía solar e inteligencia artificial.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <Link href="/diagnostico">
                    <Button size="lg">Comenzar diagnóstico</Button>
                  </Link>
                  <Link href="/batev">
                    <Button variant="outline" size="lg">
                      Kit digital BATEV
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer visual BATEV */}
        <section className="relative h-48 sm:h-64 overflow-hidden">
          <Image
            src={BATEV_IMAGES.footer}
            alt="BATEV"
            fill
            className="object-cover opacity-40"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        </section>

        {/* CTA final */}
        <section className="mx-auto max-w-4xl px-4 py-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Te esperamos en BATEV 2026
          </h2>
          <p className="text-muted mb-8 max-w-2xl mx-auto">
            Acreditarte antes de ir te ahorra tiempo en la entrada. Después, pasá por
            el stand de PI y llevate tu diagnóstico y kit digital gratuito.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={BATEV_ACCREDITATION_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg">Acreditarme ahora</Button>
            </a>
            <a href={BATEV_WEBSITE} target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" size="lg">
                Sitio oficial BATEV
              </Button>
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
