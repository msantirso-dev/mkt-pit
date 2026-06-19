const statusColors: Record<string, string> = {
  Nuevo: "bg-electric/20 text-electric border-electric/30",
  Contactar: "bg-warning/20 text-warning border-warning/30",
  Contactado: "bg-white/10 text-white border-white/20",
  "Reunión agendada": "bg-success/20 text-success border-success/30",
  "Propuesta enviada": "bg-[#a855f7]/20 text-[#c084fc] border-[#a855f7]/30",
  Cliente: "bg-success/30 text-success border-success/40",
  Descartado: "bg-white/5 text-muted border-white/10",
};

interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const colorClass =
    statusColors[status] ?? "bg-white/10 text-white border-white/20";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap ${colorClass}`}
    >
      {status}
    </span>
  );
}
