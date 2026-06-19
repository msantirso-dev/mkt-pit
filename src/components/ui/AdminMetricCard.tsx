interface AdminMetricCardProps {
  label: string;
  value: number | string;
  highlight?: boolean;
}

export function AdminMetricCard({
  label,
  value,
  highlight = false,
}: AdminMetricCardProps) {
  return (
    <div className="glass-card rounded-2xl p-5">
      <p className="text-sm text-muted">{label}</p>
      <p
        className={`mt-2 text-3xl font-bold ${
          highlight ? "text-electric" : "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
