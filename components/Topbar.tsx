"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, LogOut } from "lucide-react";

export default function Topbar() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    router.push("/login");
  };

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 sm:px-8 shrink-0">
      <input
        className="w-full max-w-[200px] sm:max-w-96 bg-background border border-border rounded-md px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all h-[40px]"
        placeholder="Search..."
        aria-label="Search"
      />

      <div className="flex items-center gap-2 sm:gap-4">
        <div className="hidden sm:flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">
            SA
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Super Admin</p>
            <p className="text-xs text-muted">Administrator</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center justify-center w-10 h-10 sm:w-auto sm:px-4 sm:h-[40px] rounded-md text-red-600 hover:bg-red-50 transition-all focus:ring-2 focus:ring-red-500 focus:outline-none"
          aria-label="Logout"
        >
          <LogOut size={18} aria-hidden="true" />
          <span className="hidden sm:inline ml-2 font-medium text-sm">Logout</span>
        </button>
      </div>
    </header>
  );
}
