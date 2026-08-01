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
    <div className="flex items-center justify-between mb-6 bg-card p-4 rounded-xl border border-border">
      <div className="flex items-center gap-2 sm:gap-4">
        {showBack && (
          <button
            onClick={() => {
              if (window.history.length > 1) {
                router.back();
              } else {
                router.push("/dashboard");
              }
            }}
            className="flex items-center justify-center w-11 h-11 rounded-lg hover:bg-gray-100 text-muted hover:text-foreground transition-colors shrink-0 focus:ring-2 focus:ring-primary focus:outline-none"
            aria-label="Go back to previous page"
          >
            <ArrowLeft size={20} aria-hidden="true" />
          </button>
        )}
        <h1 className="text-xl sm:text-2xl font-bold text-foreground truncate" aria-level={1}>
          {title}
        </h1>
      </div>
    </div>
  );
}
