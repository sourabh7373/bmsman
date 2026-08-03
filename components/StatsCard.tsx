interface Props {
  title: string;
  value: string;
}

export default function StatsCard({ title, value }: Props) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm transition-all hover:shadow-md flex flex-col justify-center">
      <p className="text-sm font-medium text-muted uppercase tracking-wider">{title}</p>
      <h2 className="text-3xl font-bold text-foreground mt-2">{value}</h2>
    </div>
  );
}
