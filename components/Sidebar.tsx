"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Organizations", href: "/organizations" },
    { name: "Jobs", href: "#" },
    { name: "Quotes", href: "#" },
  ];

  return (
    <>
      {/* Mobile Hamburger */}
      <div className="lg:hidden flex items-center p-4 border-b border-border bg-card">
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="p-2 text-foreground rounded-lg hover:bg-gray-100 focus:ring-2 focus:ring-primary focus:outline-none"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <span className="ml-4 font-bold text-lg">BMSMan</span>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-card border-r border-border p-6 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between mb-10 px-3">
          <h1 className="text-xl font-bold text-foreground">BMSMan</h1>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 text-muted hover:text-foreground"
          >
            <X size={20} />
          </button>
        </div>
        <nav aria-label="Main navigation">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center p-3 text-foreground rounded-md hover:bg-blue-50 hover:text-primary transition-all h-[44px] focus:ring-2 focus:ring-primary focus:outline-none"
                >
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
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
