import React from "react";

interface StyledFormContainerProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  illustration?: React.ReactNode;
  className?: string;
}

export function StyledFormContainer({
  title,
  subtitle,
  children,
  illustration,
  className = "",
}: StyledFormContainerProps) {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-start ${className}`}>
      {illustration && (
        <div className="lg:col-span-4 sticky top-8">
          {illustration}
        </div>
      )}
      <div className={`${illustration ? "lg:col-span-8" : "lg:col-span-12"}`}>
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none p-8 transition-all duration-300">
          <div className="mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">{title}</h2>
            {subtitle && <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{subtitle}</p>}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
