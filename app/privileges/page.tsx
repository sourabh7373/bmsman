"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import PageHeader from "@/components/PageHeader";
import { ThemeBackground } from "@/components/ThemeBackground";
import { EmptyState } from "@/components/EmptyState";
import { Plus, ShieldCheck, Eye, Pencil, Lock, Key, Shield } from "lucide-react";

export default function Privileges() {
  const [privileges, setPrivileges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadPrivileges();
  }, []);

  const loadPrivileges = async () => {
    try {
      setLoading(true);
      const res = await api.get("/privileges");
      
      const data = Array.isArray(res.data) ? res.data : (res.data?.data || []);
      console.log("Raw API response:", res.data);
      console.log("Processed privileges data:", data);
      setPrivileges(data);
    } catch (error: any) {
      setError("Failed to load privileges");
      console.error("Privilege Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getTypeBadge = (type: string) => {
    if (type === "MENU") return { label: "MENU", classes: "bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-900" };
    if (type === "FIELD") return { label: "FIELD", classes: "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900" };
    return { label: type || "N/A", classes: "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700" };
  };

  return (
    <ThemeBackground type="privileges" className="min-h-screen w-full">
      <Sidebar />
      <div className="lg:pl-64 flex flex-col w-full">
        <Topbar />
        <main className="p-6 lg:p-10 w-full max-w-7xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 p-8 shadow-xl">
            <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -left-12 -bottom-12 h-64 w-64 rounded-full bg-black/10 blur-2xl" />
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-inner">
                  <ShieldCheck className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight">Privileges</h1>
                  <p className="text-white/70 text-sm mt-1">Manage access controls, permissions, and security privileges</p>
                </div>
              </div>
              <Link href="/privileges/create">
                <button className="flex items-center justify-center gap-2 bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-white/30 transition-all border border-white/20 shadow-lg">
                  <Plus size={18} />
                  Create Privilege
                </button>
              </Link>
            </div>
            {/* Decorative access control icons */}
            <div className="absolute bottom-3 right-1/3 flex gap-3 opacity-10">
              <Lock size={24} className="text-white" />
              <Key size={24} className="text-white" />
              <Shield size={24} className="text-white" />
            </div>
          </div>

          {error && (
            <div className="p-4 bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 rounded-2xl border border-rose-100 dark:border-rose-900/50 shadow-sm">
              {error}
            </div>
          )}

          {/* Main Content Card */}
          <div className="rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden transition-all duration-300">
            {loading ? (
              <div className="p-16 text-center">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 mb-4">
                  <ShieldCheck size={24} className="animate-pulse" />
                </div>
                <p className="text-slate-500 dark:text-slate-400 font-medium">Loading privileges...</p>
              </div>
            ) : privileges.length === 0 ? (
              <EmptyState
                title="No Privileges Found"
                description="Create your first privilege to define access control rules for your enterprise."
                icon={ShieldCheck}
                action={
                  <Link href="/privileges/create">
                    <button className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transition-all">
                      <Plus size={18} />
                      Create Privilege
                    </button>
                  </Link>
                }
              />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[600px]">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                      <th className="p-5 text-left font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider text-xs">Name</th>
                      <th className="p-5 text-left font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider text-xs">Type</th>
                      <th className="p-5 text-right font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider text-xs">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                    {privileges
                      .filter((p) => p?.id && p?.privilege?.trim())
                      .map((priv) => {
                        const badge = getTypeBadge(priv.privilegeType);
                        return (
                          <tr key={priv.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                            <td className="p-5">
                              <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-950 dark:to-purple-950 text-indigo-700 dark:text-indigo-300 shadow-sm">
                                  <ShieldCheck size={18} />
                                </div>
                                <span className="font-semibold text-slate-900 dark:text-white">{priv.privilege}</span>
                              </div>
                            </td>
                            <td className="p-5">
                              <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border ${badge.classes}`}>
                                {badge.label}
                              </span>
                            </td>
                            <td className="p-5 text-right">
                              <div className="flex items-center justify-end gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                                <Link href={`/privileges/${priv.id}/view`}>
                                  <span className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold px-4 py-2 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-all text-xs">
                                    <Eye size={16} />
                                    View
                                  </span>
                                </Link>
                                <Link href={`/privileges/edit/${priv.id}`}>
                                  <span className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 font-semibold px-4 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-xs">
                                    <Pencil size={16} />
                                    Edit
                                  </span>
                                </Link>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </ThemeBackground>
  );
}
