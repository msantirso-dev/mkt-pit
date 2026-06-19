interface ScoreCardProps {
  title: string;
  score: number;
  category: string;
  subtitle?: string;
}

export function ScoreCard({ title, score, category, subtitle }: ScoreCardProps) {
  const getScoreColor = (value: number) => {
    if (value <= 39) return "text-warning";
    if (value <= 69) return "text-muted";
    if (value <= 89) return "text-electric";
    return "text-success";
  };

  return (
    <div className="glass-card rounded-2xl p-6 text-center">
      <p className="text-sm text-muted mb-2">{title}</p>
      <p className={`text-5xl font-bold ${getScoreColor(score)}`}>{score}%</p>
      <p className="mt-3 text-lg font-medium">{category}</p>
      {subtitle && <p className="mt-2 text-sm text-muted">{subtitle}</p>}
    </div>
  );
}
