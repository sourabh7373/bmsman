"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-2 text-muted hover:text-foreground transition-colors h-[44px] px-2"
      aria-label="Go back"
    >
      <ArrowLeft size={20} />
      <span className="font-medium">Back</span>
    </button>
  );
}
