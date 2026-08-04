"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import Link from "next/link";
import { DashboardLayout } from "@/components/DashboardLayout";
import { EmptyState } from "@/components/EmptyState";
import { Plus, Building2, Eye, Pencil } from "lucide-react";

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
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Organizations</h1>
            <p className="text-slate-500 text-sm mt-1">Manage your enterprise organizations and their settings</p>
          </div>
          <Link href="/organizations/create">
            <button className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20">
              <Plus size={18} />
              Create Organization
            </button>
          </Link>
        </div>

        {error && (
          <div className="p-4 bg-rose-50 text-rose-600 rounded-2xl border border-rose-100 shadow-sm">
            {error}
          </div>
        )}

        {/* Main Content Card */}
        <div className="rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-16 text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 mb-4">
                <Building2 size={24} className="animate-pulse" />
              </div>
              <p className="text-slate-500 font-medium">Loading organizations...</p>
            </div>
          ) : organizations.length === 0 ? (
            <EmptyState
              title="No Organizations Found"
              description="Create your first organization to start managing your enterprise workspace."
              icon={Building2}
              action={
                <Link href="/organizations/create">
                  <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-all">
                    <Plus size={18} />
                    Create Organization
                  </button>
                </Link>
              }
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50">
                    <th className="px-6 py-4 text-left font-semibold text-slate-700 uppercase tracking-wider text-xs">Company Name</th>
                    <th className="px-6 py-4 text-left font-semibold text-slate-700 uppercase tracking-wider text-xs">Email</th>
                    <th className="px-6 py-4 text-right font-semibold text-slate-700 uppercase tracking-wider text-xs">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {organizations.map((org) => (
                    <tr key={org.id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                            <Building2 size={18} />
                          </div>
                          <span className="font-medium text-slate-900">{org.companyName || org.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{org.email}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/organizations/${org.id}`}>
                            <span className="inline-flex items-center gap-1.5 text-blue-600 font-medium px-3 py-1.5 rounded-lg border border-blue-200 hover:bg-blue-50 transition-all text-xs">
                              <Eye size={14} />
                              View
                            </span>
                          </Link>
                          <Link href={`/organizations/edit/${org.id}`}>
                            <span className="inline-flex items-center gap-1.5 text-slate-600 font-medium px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 transition-all text-xs">
                              <Pencil size={14} />
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
      </div>
    </DashboardLayout>
  );
}
