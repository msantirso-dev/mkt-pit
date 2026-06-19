import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminMetricCard } from "@/components/ui/AdminMetricCard";
import { LeadTable } from "@/components/ui/LeadTable";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  const allLeads = await prisma.lead.findMany();

  const metrics = {
    totalLeads: allLeads.length,
    leadsToday: allLeads.filter((l) => l.createdAt >= today).length,
    hotLeads: allLeads.filter(
      (l) => l.leadTemperature === "Caliente" || l.leadTemperature === "Muy caliente"
    ).length,
    architects: allLeads.filter((l) => l.profile === "Arquitecto").length,
    builders: allLeads.filter((l) => l.profile === "Constructor").length,
    developers: allLeads.filter((l) => l.profile === "Desarrollador").length,
    startingSoon: allLeads.filter(
      (l) =>
        l.projectTiming === "Ya empezó" || l.projectTiming === "Menos de 3 meses"
    ).length,
    domotica: allLeads.filter((l) =>
      (l.interests as string[]).includes("Domótica")
    ).length,
    seguridad: allLeads.filter((l) =>
      (l.interests as string[]).includes("Seguridad")
    ).length,
    solar: allLeads.filter((l) =>
      (l.interests as string[]).includes("Energía solar")
    ).length,
    ia: allLeads.filter((l) =>
      (l.interests as string[]).includes("Inteligencia Artificial")
    ).length,
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted text-sm mt-1">Resumen de captación BATEV</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/admin/leads"
            className="text-sm text-electric hover:underline"
          >
            Ver todos los leads →
          </Link>
          <Link
            href="/admin/qr"
            className="text-sm text-electric hover:underline"
          >
            Imprimir QR BATEV →
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <AdminMetricCard label="Total de leads" value={metrics.totalLeads} highlight />
        <AdminMetricCard label="Leads de hoy" value={metrics.leadsToday} />
        <AdminMetricCard label="Leads calientes" value={metrics.hotLeads} highlight />
        <AdminMetricCard label="Arquitectos" value={metrics.architects} />
        <AdminMetricCard label="Constructores" value={metrics.builders} />
        <AdminMetricCard label="Desarrolladores" value={metrics.developers} />
        <AdminMetricCard label="Obra < 3 meses" value={metrics.startingSoon} />
        <AdminMetricCard label="Interés domótica" value={metrics.domotica} />
        <AdminMetricCard label="Interés seguridad" value={metrics.seguridad} />
        <AdminMetricCard label="Interés solar" value={metrics.solar} />
        <AdminMetricCard label="Interés IA" value={metrics.ia} />
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Últimos leads</h2>
        <LeadTable
          leads={leads.map((l) => ({
            id: l.id,
            createdAt: l.createdAt.toISOString(),
            firstName: l.firstName,
            lastName: l.lastName,
            company: l.company,
            profile: l.profile,
            projectType: l.projectType,
            projectStage: l.projectStage,
            projectTiming: l.projectTiming,
            technicalScore: l.technicalScore,
            status: l.status,
          }))}
        />
      </div>
    </div>
  );
}
