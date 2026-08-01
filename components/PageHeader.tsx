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
    <div className="flex items-center justify-between mb-8 bg-card p-4 rounded-xl border border-border">
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
            className="flex items-center justify-center w-11 h-11 rounded-lg hover:bg-gray-100 text-muted hover:text-foreground transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
          </button>
        )}
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
      </div>
    </div>
  );
}
