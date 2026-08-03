import React from "react";
import { themeBackgrounds } from "@/lib/theme";

interface ThemeBackgroundProps {
  type?: keyof typeof themeBackgrounds;
  children: React.ReactNode;
  className?: string;
}

export function ThemeBackground({ type = "dashboard", children, className = "" }: ThemeBackgroundProps) {
  const bgClass = themeBackgrounds[type] || themeBackgrounds.dashboard;

  return (
    <div className={`${bgClass} ${className} transition-colors duration-300`}>
      {/* Decorative ambient glowing circles */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-purple-500/10 dark:bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
