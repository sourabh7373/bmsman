"use client";

import { useRouter } from "next/navigation";
import { LogOut, UserCircle } from "lucide-react";

export default function Topbar() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    router.push("/login");
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sm:px-10 shrink-0 shadow-sm">
      <div className="flex-1" />

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm border border-blue-200">
            SA
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">Super Admin</p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center justify-center w-10 h-10 sm:w-auto sm:px-4 sm:h-[40px] rounded-xl text-red-600 hover:bg-red-50 transition-all focus:ring-2 focus:ring-red-500 focus:outline-none border border-transparent hover:border-red-100"
          aria-label="Logout"
        >
          <LogOut size={18} aria-hidden="true" />
          <span className="hidden sm:inline ml-2 font-semibold text-sm">Logout</span>
        </button>
      </div>
    </header>
  );
}
