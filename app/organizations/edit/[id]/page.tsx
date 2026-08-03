"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { useRouter, useParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import PageHeader from "@/components/PageHeader";
import { ThemeBackground } from "@/components/ThemeBackground";
import { InputField } from "@/components/InputField";
import { handleApiError } from "@/lib/errorUtils";
import { useFormValidation } from "@/lib/useFormValidation";
import { organizationValidationSchema } from "@/lib/validationSchema";
import { Building2, Users, Globe, ArrowLeft, Save } from "lucide-react";

export default function EditOrganization() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const { form, setForm, errors, handleChange, validateAll } = useFormValidation({
    companyName: "",
    companyCode: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    phone: "",
    mobileNumber: "",
    email: "",
    gstNo: "",
    adminUsername: "",
    adminPassword: "",
    adminEmail: "",
    adminDisplayName: "",
    adminMobileNumber: "",
  }, organizationValidationSchema);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrg = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/organizations/${id}`);
        setForm({
          companyName: res.data?.companyName ?? "",
          companyCode: res.data?.companyCode ?? "",
          address: res.data?.address ?? "",
          city: res.data?.city ?? "",
          country: res.data?.country ?? "",
          postalCode: res.data?.postalCode ?? "",
          phone: res.data?.phone ?? "",
          mobileNumber: res.data?.mobileNumber ?? "",
          email: res.data?.email ?? "",
          gstNo: res.data?.gstNo ?? "",
          adminUsername: res.data?.adminUsername ?? "",
          adminPassword: "",
          adminEmail: res.data?.adminEmail ?? "",
          adminDisplayName: res.data?.adminDisplayName ?? "",
          adminMobileNumber: res.data?.adminMobileNumber ?? "",
        });
      } catch (err) {
        setError("Failed to load organization details");
      } finally {
        setLoading(false);
      }
    };
    loadOrg();
  }, [id, setForm]);

  const updateOrganization = async () => {
    if (!validateAll()) return;
    
    setError("");
    try {
      setSaving(true);
      const payload = {
        id,
        ...form,
        mobileNumber: form.mobileNumber || null,
        adminMobileNumber: form.adminMobileNumber || null
      };
      await api.put(`/organizations`, payload);
      alert("Organization Updated Successfully");
      router.push("/organizations");
    } catch (error: any) {
      const apiError = handleApiError(error);
      setError(apiError.message);
    } finally {
      setSaving(false);
    }
  };

  const companyFields: { name: string; label: string; type?: string }[] = [
    { name: "companyName", label: "Company Name" },
    { name: "companyCode", label: "Company Code" },
    { name: "email", label: "Email" },
    { name: "phone", label: "Phone" },
    { name: "mobileNumber", label: "Mobile Number" },
    { name: "gstNo", label: "GST No" },
  ];

  const addressFields = [
    { name: "address", label: "Address" },
    { name: "city", label: "City" },
    { name: "country", label: "Country" },
    { name: "postalCode", label: "Postal Code" },
  ];

  const adminFields = [
    { name: "adminUsername", label: "Admin Username" },
    { name: "adminEmail", label: "Admin Email" },
    { name: "adminDisplayName", label: "Admin Display Name" },
    { name: "adminPassword", label: "Admin Password", type: "password" },
    { name: "adminMobileNumber", label: "Admin Mobile Number" },
  ];

  return (
    <ThemeBackground type="forms" className="min-h-screen w-full">
      <Sidebar />
      <div className="lg:pl-64 flex flex-col w-full">
        <Topbar />
        <main className="p-6 lg:p-10 w-full max-w-7xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-8 shadow-xl">
            <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -left-12 -bottom-12 h-64 w-64 rounded-full bg-black/10 blur-2xl" />
            <div className="relative z-10 flex items-start gap-4">
              <button onClick={() => router.back()} className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all">
                <ArrowLeft size={20} />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">Edit Organization</h1>
                <p className="text-white/70 text-sm mt-1">Update the organization details and admin information</p>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center p-16 text-center rounded-3xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200/60 dark:border-slate-800/60 shadow-lg">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 mb-4 shadow-inner">
                <Building2 size={32} className="animate-pulse" />
              </div>
              <p className="text-slate-500 dark:text-slate-400 font-medium">Loading organization data...</p>
            </div>
          ) : (
            <>
              {error && (
                <div className="p-4 bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 rounded-2xl border border-rose-100 dark:border-rose-900/50 shadow-sm">
                  <p className="font-semibold">{error}</p>
                </div>
              )}

              {/* Company Information Section */}
              <div className="rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none p-8 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md">
                    <Building2 size={20} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Company Information</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Basic details about the organization</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {companyFields.map((field) => {
                    const isMobile = field.name.toLowerCase().includes('mobile');
                    return (
                      <InputField
                        key={field.name}
                        label={field.label}
                        name={field.name}
                        value={(form as any)[field.name] ?? ""}
                        onChange={handleChange}
                        placeholder={field.label}
                        type={isMobile ? "tel" : (field.type || "text")}
                        inputMode={isMobile ? "numeric" : undefined}
                        maxLength={isMobile ? 10 : undefined}
                        error={errors[field.name]}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Address Section */}
              <div className="rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none p-8 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md">
                    <Globe size={20} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Address Details</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Location information for the organization</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {addressFields.map((field) => (
                    <InputField
                      key={field.name}
                      label={field.label}
                      name={field.name}
                      value={(form as any)[field.name] ?? ""}
                      onChange={handleChange}
                      placeholder={field.label}
                      error={errors[field.name]}
                    />
                  ))}
                </div>
              </div>

              {/* Admin Account Section */}
              <div className="rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none p-8 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-md">
                    <Users size={20} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Admin Account</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Administrator credentials for the organization</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {adminFields.map((field) => {
                    const isMobile = field.name.toLowerCase().includes('mobile');
                    return (
                      <InputField
                        key={field.name}
                        label={field.label}
                        name={field.name}
                        value={(form as any)[field.name] ?? ""}
                        onChange={handleChange}
                        placeholder={field.label}
                        type={isMobile ? "tel" : (field.type || "text")}
                        inputMode={isMobile ? "numeric" : undefined}
                        maxLength={isMobile ? 10 : undefined}
                        error={errors[field.name]}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => router.back()}
                  className="px-6 py-3 rounded-xl font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border border-slate-200 dark:border-slate-800"
                >
                  Cancel
                </button>
                <button
                  onClick={updateOrganization}
                  disabled={saving}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transition-all disabled:opacity-50 active:scale-[0.99]"
                >
                  <Save size={18} />
                  {saving ? "Updating..." : "Update Organization"}
                </button>
              </div>
            </>
          )}
        </main>
      </div>
    </ThemeBackground>
  );
}
