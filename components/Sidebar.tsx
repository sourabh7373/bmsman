"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, LayoutDashboard, Building2 } from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Organizations", href: "/organizations", icon: Building2 },
  ];

  return (
    <>
      {/* Mobile Header (Visible only on mobile) */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200 bg-white sticky top-0 z-30 h-[60px]">
        <button 
          onClick={() => setIsOpen(true)} 
          className="p-2 text-gray-600 rounded-lg hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          <Menu size={24} />
        </button>
        <span className="font-bold text-lg text-gray-900">BMSMan</span>
        <div className="w-10" /> {/* Spacer for centering */}
      </div>

      {/* Desktop Sidebar (Visible only on desktop) */}
      <aside className="hidden lg:flex flex-col w-64 bg-gray-900 text-white h-screen fixed left-0 top-0 p-6">
        <div className="mb-10 px-3">
          <h1 className="text-xl font-bold text-white">BMSMan</h1>
        </div>
        <nav aria-label="Main navigation">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 p-3 text-gray-300 rounded-xl hover:bg-blue-600 hover:text-white transition-all h-[48px]"
                >
                  <item.icon size={20} />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Mobile Drawer (Visible only when open) */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed inset-y-0 left-0 z-50 w-[80%] max-w-[320px] bg-gray-900 text-white flex flex-col shadow-2xl">
            <div className="flex items-center justify-between p-6 h-[60px]">
              <h1 className="text-xl font-bold text-white">BMSMan</h1>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>
            <nav className="flex-1 p-4" aria-label="Mobile navigation">
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 p-4 text-gray-300 rounded-xl hover:bg-blue-600 hover:text-white transition-all h-[56px]"
                    >
                      <item.icon size={20} />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </>
      )}
    </>
  );
}
