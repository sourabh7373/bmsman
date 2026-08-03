"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, LayoutDashboard, Building2, ShieldCheck, ChevronLeft } from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Organizations", href: "/organizations", icon: Building2 },
    { name: "Privileges", href: "/privileges", icon: ShieldCheck },
  ];

  const isActive = (href: string) => pathname?.startsWith(href);

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between px-5 py-3 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md sticky top-0 z-30 h-[64px] shadow-sm">
        <button 
          onClick={() => setIsOpen(true)} 
          className="p-2 text-slate-600 dark:text-slate-300 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
          aria-label="Toggle navigation menu"
        >
          <Menu size={22} />
        </button>
        <span className="font-bold text-lg text-slate-900 dark:text-white tracking-tight">BMSMan</span>
        <div className="w-10" />
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white h-screen fixed left-0 top-0 p-6 shadow-2xl shadow-indigo-500/5 border-r border-slate-800/50">
        {/* Logo Section */}
        <div className="mb-10 px-3 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/20">
            <ShieldCheck size={22} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight">BMSMan</h1>
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">Enterprise Suite</p>
          </div>
        </div>

        <nav aria-label="Main navigation">
          <ul className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 group ${
                      active
                        ? "bg-gradient-to-r from-blue-600/20 to-indigo-600/20 text-white border border-blue-500/20 shadow-sm"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <div className={`flex h-8 w-8 items-center justify-center rounded-xl transition-all duration-200 ${
                      active ? "bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md shadow-indigo-500/20" : "bg-slate-800/50 group-hover:bg-slate-700/50"
                    }`}>
                      <Icon size={16} className={active ? "text-white" : "text-slate-400 group-hover:text-white"} />
                    </div>
                    <span className="font-semibold text-sm">{item.name}</span>
                    {active && <div className="ml-auto h-2 w-2 rounded-full bg-blue-400 animate-pulse" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom branding */}
        <div className="mt-auto pt-6 border-t border-slate-800/50">
          <p className="text-[10px] text-slate-600 text-center font-medium">v1.0.0 • Enterprise SaaS</p>
        </div>
      </aside>

      {/* Mobile Drawer */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed inset-y-0 left-0 z-50 w-[80%] max-w-[320px] bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white flex flex-col shadow-2xl shadow-indigo-500/10">
            <div className="flex items-center justify-between px-6 h-[70px] border-b border-slate-800/50">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg">
                  <ShieldCheck size={20} />
                </div>
                <span className="text-lg font-bold tracking-tight">BMSMan</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-all"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>
            <nav className="flex-1 p-4" aria-label="Mobile navigation">
              <ul className="space-y-1.5">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 px-4 py-4 rounded-2xl transition-all duration-200 ${
                          active
                            ? "bg-gradient-to-r from-blue-600/20 to-indigo-600/20 text-white border border-blue-500/20"
                            : "text-slate-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                          active ? "bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md" : "bg-slate-800/50"
                        }`}>
                          <Icon size={18} className={active ? "text-white" : "text-slate-400"} />
                        </div>
                        <span className="font-semibold text-sm">{item.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </>
      )}
    </>
  );
}
