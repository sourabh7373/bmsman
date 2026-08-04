"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import privilegeService from "@/lib/privilegeService";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { ThemeBackground } from "@/components/ThemeBackground";
import { ShieldCheck, Key, ArrowLeft, Pencil, Lock, CheckCircle2, XCircle, Globe, Layers } from "lucide-react";
import Link from "next/link";

export default function PrivilegeDetails() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [privilege, setPrivilege] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPrivilege = async () => {
      try {
        setLoading(true);
        const privileges = await privilegeService.getPrivileges();
        const privilegeData = privileges.find((p: any) => String(p.id) === String(id));

        if (!privilegeData || !privilegeData.id) {
          setError("Privilege record not found");
          return;
        }

        setPrivilege(privilegeData);
      } catch (err: any) {
        console.error("Error loading privilege:", err);
        setError("Failed to load privilege details");
      } finally {
        setLoading(false);
      }
    };
    loadPrivilege();
  }, [id]);

  const detailFields = privilege ? [
    { label: "Privilege", value: privilege.privilege, icon: Key },
    { label: "Privilege Code", value: privilege.privilegeCode, icon: ShieldCheck },
    { label: "Privilege Type", value: privilege.privilegeType, icon: Layers },
    { label: "Domain", value: privilege.domain || "N/A", icon: Globe },
    { label: "Field Key", value: privilege.fieldKey || "N/A", icon: Key },
    { label: "Access Mode", value: privilege.accessMode || "N/A", icon: ShieldCheck },
    { label: "Parent ID", value: privilege.parentId !== null ? String(privilege.parentId) : "None", icon: Layers },
    { label: "Sort Order", value: privilege.sortOrder ?? 1, icon: Layers },
    { label: "Platform Only", value: privilege.platformOnly ? "Yes" : "No", icon: ShieldCheck },
    { label: "System Managed", value: privilege.systemManaged ? "Yes" : "No", icon: Lock },
    { label: "Active", value: privilege.active ? "Yes" : "No", icon: CheckCircle2 },
  ] : [];

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
                <button onClick={() => router.back()} className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all">
                  <ArrowLeft size={20} />
                </button>
                <div className="flex items-start gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-inner">
                    <ShieldCheck className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Privilege Details</h1>
                    <p className="text-white/70 text-sm mt-1">View complete configuration for this access privilege</p>
                  </div>
                </div>
              </div>
              {privilege && !privilege.systemManaged && (
                <Link href={`/privileges/edit/${id}`}>
                  <button className="flex items-center gap-2 bg-white/25 backdrop-blur-md text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-white/35 transition-all border border-white/20 shadow-lg">
                    <Pencil size={18} />
                    Edit Privilege
                  </button>
                </Link>
              )}
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center p-16 text-center rounded-3xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200/60 dark:border-slate-800/60 shadow-lg">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 mb-4 shadow-inner">
                <ShieldCheck size={32} className="animate-pulse" />
              </div>
              <p className="text-slate-500 dark:text-slate-400 font-medium">Loading privilege details...</p>
            </div>
          ) : error ? (
            <div className="p-6 bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 rounded-2xl border border-rose-100 dark:border-rose-900/50 shadow-sm">{error}</div>
          ) : !privilege ? (
            <div className="flex flex-col items-center justify-center p-16 text-center rounded-3xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200/60 dark:border-slate-800/60 shadow-lg">
              <ShieldCheck size={48} className="text-slate-300 dark:text-slate-600 mb-4" />
              <p className="text-slate-500 dark:text-slate-400 font-medium">Privilege not found</p>
            </div>
          ) : (
            <div className="rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none p-8 transition-all duration-300">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/20">
                    <Key size={28} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">{privilege.privilege}</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-mono mt-0.5">{privilege.privilegeCode}</p>
                  </div>
                </div>
                {privilege.systemManaged && (
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900">
                    <Lock size={14} />
                    System Managed
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {detailFields.map((field) => {
                  const Icon = field.icon;
                  return (
                    <div key={field.label} className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/50">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 shrink-0">
                        <Icon size={18} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{field.label}</p>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white mt-0.5 break-words">{field.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </main>
      </div>
    </ThemeBackground>
  );
}
