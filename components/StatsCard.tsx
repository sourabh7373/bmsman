interface Props {
  title: string;
  value: string;
}

export default function StatsCard({ title, value }: Props) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm transition-all hover:shadow-md">
      <p className="text-sm font-medium text-muted">{title}</p>
      <h2 className="text-3xl font-bold text-foreground mt-2">{value}</h2>
    </div>
  );
}
