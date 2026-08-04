"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import PageHeader from "@/components/PageHeader";
import { ThemeBackground } from "@/components/ThemeBackground";
import { Building2, Mail, Globe, MapPin, Phone, User, ArrowLeft, Pencil, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { PageContainer } from "@/components/PageContainer";

export default function OrganizationDetails() {
  const params = useParams();
  const router = useRouter();
  const [org, setOrg] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrg = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/organizations/${params.id}`);
        setOrg(res.data);
      } catch (err) {
        setError("Failed to load organization details");
      } finally {
        setLoading(false);
      }
    };
    loadOrg();
  }, [params.id]);

  const detailFields = [
    { label: "Company Name", value: org?.companyName || org?.name, icon: Building2 },
    { label: "Email", value: org?.email, icon: Mail },
    { label: "Phone", value: org?.phone, icon: Phone },
    { label: "Mobile", value: org?.mobileNumber, icon: Phone },
    { label: "Address", value: org?.address, icon: MapPin },
    { label: "City", value: org?.city, icon: Globe },
    { label: "Country", value: org?.country, icon: Globe },
    { label: "Postal Code", value: org?.postalCode, icon: MapPin },
    { label: "GST No", value: org?.gstNo, icon: ShieldCheck },
    { label: "Website", value: org?.website, icon: Globe },
  ];

  return (
    <ThemeBackground type="organizations" className="min-h-screen w-full">
      <Sidebar />
      <div className="lg:pl-64 flex flex-col w-full">
        <Topbar />
        <PageContainer>
          {/* Header Section */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-8 shadow-xl">
            <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -left-12 -bottom-12 h-64 w-64 rounded-full bg-black/10 blur-2xl" />
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="flex items-start gap-4">
                <button onClick={() => router.back()} className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all">
                  <ArrowLeft size={20} />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight">Organization Details</h1>
                  <p className="text-white/70 text-sm mt-1">View complete information about this organization</p>
                </div>
              </div>
              {org && (
                <Link href={`/organizations/edit/${params.id}`}>
                  <button className="flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-white/30 transition-all border border-white/20 shadow-lg">
                    <Pencil size={18} />
                    Edit Organization
                  </button>
                </Link>
              )}
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center p-16 text-center rounded-3xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200/60 dark:border-slate-800/60 shadow-lg">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 mb-4 shadow-inner">
                <Building2 size={32} className="animate-pulse" />
              </div>
              <p className="text-slate-500 dark:text-slate-400 font-medium">Loading organization details...</p>
            </div>
          ) : error ? (
            <div className="p-6 bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 rounded-2xl border border-rose-100 dark:border-rose-900/50 shadow-sm">{error}</div>
          ) : !org ? (
            <div className="flex flex-col items-center justify-center p-16 text-center rounded-3xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200/60 dark:border-slate-800/60 shadow-lg">
              <Building2 size={48} className="text-slate-300 dark:text-slate-600 mb-4" />
              <p className="text-slate-500 dark:text-slate-400 font-medium">Organization not found</p>
            </div>
          ) : (
            <div className="rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none p-6 md:p-8 transition-all duration-300">
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100 dark:border-slate-800">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md shadow-indigo-500/20">
                  <Building2 size={28} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">{org.companyName || org.name}</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Organization ID: {org.id}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {detailFields.map((field) => {
                  const Icon = field.icon;
                  return field.value ? (
                    <div key={field.label} className="group flex items-start gap-4 p-5 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/50 hover:border-indigo-200 dark:hover:border-indigo-900/50 transition-all duration-200">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm shrink-0 group-hover:scale-105 transition-transform">
                        <Icon size={22} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{field.label}</p>
                        <p className="text-sm font-bold text-slate-900 dark:text-white mt-1 break-words">{field.value}</p>
                      </div>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          )}
        </PageContainer>
      </div>
    </ThemeBackground>
  );
}
