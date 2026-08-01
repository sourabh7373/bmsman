"use client";

import { useRouter } from "next/navigation";

export default function Topbar() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    router.push("/login");
  };

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-8">
      <input
        className="w-96 bg-background border border-border rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
        placeholder="Search jobs..."
      />

      <div className="flex items-center gap-4">
        <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">
          SA
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">Super Admin</p>
          <p className="text-xs text-muted">Administrator</p>
        </div>
        <button
          onClick={logout}
          className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
