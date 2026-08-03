"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface Props {
  title: string;
  showBack?: boolean;
}

export default function PageHeader({ title, showBack = true }: Props) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-4">
        {showBack && (
          <button
            onClick={() => {
              if (window.history.length > 1) {
                router.back();
              } else {
                router.push("/dashboard");
              }
            }}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shrink-0 focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm"
            aria-label="Go back to previous page"
          >
            <ArrowLeft size={20} aria-hidden="true" />
          </button>
        )}
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight truncate" aria-level={1}>
          {title}
        </h1>
      </div>
    </div>
  );
}
