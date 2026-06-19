interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
}

export function ProgressBar({
  value,
  max = 100,
  label,
  showPercentage = true,
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className="space-y-2">
      {(label || showPercentage) && (
        <div className="flex items-center justify-between text-sm">
          {label && <span className="text-muted">{label}</span>}
          {showPercentage && (
            <span className="font-medium text-electric">{Math.round(percentage)}%</span>
          )}
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-electric to-[#33bff2] transition-all duration-700"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
