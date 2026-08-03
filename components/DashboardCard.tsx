import React from "react";
import { LucideIcon } from "lucide-react";

interface DashboardCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon: LucideIcon;
  gradient?: string;
  className?: string;
}

export function DashboardCard({
  title,
  value,
  change,
  isPositive = true,
  icon: Icon,
  gradient = "from-blue-500 to-indigo-600",
  className = "",
}: DashboardCardProps) {
  return (
    <div className={`relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 p-6 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:shadow-2xl transition-all duration-300 group ${className}`}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform duration-500" />
      
      <div className="flex items-center justify-between">
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-md shadow-indigo-500/20`}>
          <Icon className="h-6 w-6" />
        </div>
        {change && (
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${isPositive ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400' : 'bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400'}`}>
            {change}
          </span>
        )}
      </div>

      <div className="mt-4">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
        <h4 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">{value}</h4>
      </div>
    </div>
  );
}
