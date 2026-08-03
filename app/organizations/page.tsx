"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import PageHeader from "@/components/PageHeader";
import { ThemeBackground } from "@/components/ThemeBackground";
import { EmptyState } from "@/components/EmptyState";
import { Plus, Building2, Eye, Pencil, ShieldCheck, Users, Globe } from "lucide-react";

export default function Organizations() {
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadOrganizations();
  }, []);

  const loadOrganizations = async () => {
    try {
      setLoading(true);
      const res = await api.get("/organizations");
      if (Array.isArray(res.data)) {
        setOrganizations(res.data);
      } else if (Array.isArray(res.data.content)) {
        setOrganizations(res.data.content);
      } else if (Array.isArray(res.data.data)) {
        setOrganizations(res.data.data);
      } else {
        setOrganizations([]);
      }
    } catch (error: any) {
      setError("Failed to load organizations");
      console.error("Organization Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeBackground type="organizations" className="min-h-screen w-full">
      <Sidebar />
      <div className="lg:pl-64 flex flex-col w-full">
        <Topbar />
        <main className="p-6 lg:p-10 w-full max-w-7xl mx-auto space-y-8">
          {/* Header Section with Illustration */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-8 shadow-xl">
            <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -left-12 -bottom-12 h-64 w-64 rounded-full bg-black/10 blur-2xl" />
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-inner">
                  <Building2 className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight">Organizations</h1>
                  <p className="text-white/70 text-sm mt-1">Manage your enterprise organizations and their settings</p>
                </div>
              </div>
              <Link href="/organizations/create">
                <button className="flex items-center justify-center gap-2 bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-white/30 transition-all border border-white/20 shadow-lg">
                  <Plus size={18} />
                  Create Organization
                </button>
              </Link>
            </div>
            {/* Decorative grid dots */}
            <div className="absolute bottom-0 right-1/4 w-32 h-32 opacity-10">
              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className="w-2 h-2 rounded-full bg-white" />
                ))}
              </div>
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
                  <Building2 size={24} className="animate-pulse" />
                </div>
                <p className="text-slate-500 dark:text-slate-400 font-medium">Loading organizations...</p>
              </div>
            ) : organizations.length === 0 ? (
              <EmptyState
                title="No Organizations Found"
                description="Create your first organization to start managing your enterprise workspace."
                icon={Building2}
                action={
                  <Link href="/organizations/create">
                    <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transition-all">
                      <Plus size={18} />
                      Create Organization
                    </button>
                  </Link>
                }
              />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[600px]">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                      <th className="p-5 text-left font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider text-xs">Company Name</th>
                      <th className="p-5 text-left font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider text-xs">Email</th>
                      <th className="p-5 text-right font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider text-xs">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                    {organizations.map((org) => (
                      <tr key={org.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                        <td className="p-5">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-950 dark:to-indigo-950 text-blue-700 dark:text-blue-300 shadow-sm">
                              <Building2 size={18} />
                            </div>
                            <span className="font-semibold text-slate-900 dark:text-white">{org.companyName || org.name}</span>
                          </div>
                        </td>
                        <td className="p-5 text-slate-600 dark:text-slate-400">{org.email}</td>
                        <td className="p-5 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                            <Link href={`/organizations/${org.id}`}>
                              <span className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold px-4 py-2 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-all text-xs">
                                <Eye size={16} />
                                View
                              </span>
                            </Link>
                            <Link href={`/organizations/edit/${org.id}`}>
                              <span className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 font-semibold px-4 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-xs">
                                <Pencil size={16} />
                                Edit
                              </span>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
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
