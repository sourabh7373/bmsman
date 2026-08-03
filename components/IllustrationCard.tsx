import React from "react";
import { LucideIcon } from "lucide-react";

interface IllustrationCardProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  badge?: string;
  gradient?: string;
  children?: React.ReactNode;
  className?: string;
}

export function IllustrationCard({
  title,
  subtitle,
  icon: Icon,
  badge,
  gradient = "from-blue-600 via-indigo-600 to-purple-600",
  children,
  className = "",
}: IllustrationCardProps) {
  return (
    <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${gradient} p-8 text-white shadow-xl ${className}`}>
      {/* Abstract background shapes */}
      <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -left-12 -bottom-12 h-64 w-64 rounded-full bg-black/10 blur-2xl" />
      
      <div className="relative z-10 flex flex-col justify-between h-full">
        <div className="flex items-start justify-between">
          {Icon && (
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-inner">
              <Icon className="h-7 w-7 text-white" />
            </div>
          )}
          {badge && (
            <span className="rounded-full bg-white/20 px-4 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
              {badge}
            </span>
          )}
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          {subtitle && <p className="mt-2 text-white/80 text-sm leading-relaxed">{subtitle}</p>}
        </div>

        {children && <div className="mt-6">{children}</div>}
      </div>
    </div>
  );
}
