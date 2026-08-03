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
      {/* Mobile Hamburger */}
      <div className="lg:hidden flex items-center p-4 border-b border-gray-200 bg-white sticky top-0 z-30">
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="p-2 text-gray-600 rounded-lg hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <span className="ml-4 font-bold text-lg text-gray-900">BMSMan</span>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white p-6 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between mb-10 px-3">
          <h1 className="text-xl font-bold text-white">BMSMan</h1>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>
        <nav aria-label="Main navigation">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 p-3 text-gray-300 rounded-xl hover:bg-blue-600 hover:text-white transition-all h-[48px] focus:ring-2 focus:ring-blue-400 focus:outline-none"
                >
                  <item.icon size={20} />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
