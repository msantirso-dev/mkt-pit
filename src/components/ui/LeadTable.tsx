import Link from "next/link";
import { StatusBadge } from "./StatusBadge";

export interface LeadTableRow {
  id: string;
  createdAt: string;
  firstName: string;
  lastName: string;
  company: string | null;
  profile: string;
  projectType: string;
  projectStage: string;
  projectTiming: string;
  technicalScore: number;
  status: string;
}

interface LeadTableProps {
  leads: LeadTableRow[];
}

export function LeadTable({ leads }: LeadTableProps) {
  if (leads.length === 0) {
    return (
      <div className="glass-card rounded-2xl p-8 text-center text-muted">
        No hay leads registrados todavía.
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left text-muted">
              <th className="px-4 py-3 font-medium">Fecha</th>
              <th className="px-4 py-3 font-medium">Nombre</th>
              <th className="px-4 py-3 font-medium hidden md:table-cell">Empresa</th>
              <th className="px-4 py-3 font-medium hidden lg:table-cell">Perfil</th>
              <th className="px-4 py-3 font-medium hidden xl:table-cell">Proyecto</th>
              <th className="px-4 py-3 font-medium hidden xl:table-cell">Etapa</th>
              <th className="px-4 py-3 font-medium hidden xl:table-cell">Tiempo</th>
              <th className="px-4 py-3 font-medium">Score</th>
              <th className="px-4 py-3 font-medium">Estado</th>
              <th className="px-4 py-3 font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr
                key={lead.id}
                className="border-b border-white/5 hover:bg-white/5 transition-colors"
              >
                <td className="px-4 py-3 whitespace-nowrap">
                  {new Date(lead.createdAt).toLocaleDateString("es-AR")}
                </td>
                <td className="px-4 py-3">
                  {lead.firstName} {lead.lastName}
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  {lead.company ?? "—"}
                </td>
                <td className="px-4 py-3 hidden lg:table-cell">{lead.profile}</td>
                <td className="px-4 py-3 hidden xl:table-cell">{lead.projectType}</td>
                <td className="px-4 py-3 hidden xl:table-cell">{lead.projectStage}</td>
                <td className="px-4 py-3 hidden xl:table-cell">{lead.projectTiming}</td>
                <td className="px-4 py-3 font-medium text-electric">
                  {lead.technicalScore}%
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={lead.status} />
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/leads/${lead.id}`}
                    className="text-electric hover:underline"
                  >
                    Ver
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
