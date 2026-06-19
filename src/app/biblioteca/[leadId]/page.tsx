"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ResourceCard } from "@/components/ui/ResourceCard";
import { DIGITAL_RESOURCES } from "@/lib/constants";

export default function BibliotecaPage() {
  const params = useParams();
  const leadId = params.leadId as string;
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    fetch(`/api/score?leadId=${leadId}`)
      .then((r) => {
        if (r.ok) setVerified(true);
      })
      .catch(() => {});
  }, [leadId]);

  const logAccess = async (resourceName: string) => {
    await fetch("/api/resources", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ leadId, resourceName }),
    });
  };

  if (!verified) {
    return (
      <>
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center px-4 py-20">
          <p className="text-muted">Verificando acceso...</p>
        </main>
        <SiteFooter />
      </>
    );
  }

  return (
    <>
      <SiteHeader showCta={false} />
      <main className="flex-1 hero-glow">
        <div className="mx-auto max-w-4xl px-4 py-10 sm:py-16">
          <div className="text-center mb-10">
            <p className="text-electric text-sm uppercase tracking-widest mb-2">
              Kit digital gratuito
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold">Tu biblioteca digital</h1>
            <p className="text-muted text-sm mt-2">
              Recursos exclusivos de PI Proyectos Inteligentes · BATEV
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {DIGITAL_RESOURCES.map((resource) => (
              <ResourceCard
                key={resource.id}
                title={resource.title}
                description={resource.description}
                type={resource.type}
                url={resource.url}
                onAccess={() => logAccess(resource.title)}
              />
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
