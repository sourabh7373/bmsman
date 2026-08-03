"use client";

import { useRouter } from "next/navigation";
import { LogOut, UserCircle, Bell } from "lucide-react";

export default function Topbar() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    router.push("/login");
  };

  return (
    <header className="h-16 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between px-6 sm:px-10 shrink-0 shadow-sm sticky top-0 z-20">
      <div className="flex-1" />

      <div className="flex items-center gap-4">
        {/* Notification bell */}
        <button className="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
          <Bell size={18} />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-indigo-500 ring-2 ring-white dark:ring-slate-900" />
        </button>

        <div className="hidden sm:flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-indigo-500/20">
            SA
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">Super Admin</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Administrator</p>
          </div>
        </div>

        <div className="w-px h-8 bg-slate-200 dark:bg-slate-700 hidden sm:block" />

        <button
          onClick={logout}
          className="flex items-center justify-center w-10 h-10 sm:w-auto sm:px-4 sm:h-[40px] rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all border border-transparent hover:border-rose-200 dark:hover:border-rose-900/50 focus:ring-2 focus:ring-rose-500 focus:outline-none"
          aria-label="Logout"
        >
          <LogOut size={18} aria-hidden="true" />
          <span className="hidden sm:inline ml-2 font-semibold text-sm">Logout</span>
        </button>
      </div>
    </header>
  );
}
