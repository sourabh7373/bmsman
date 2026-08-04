"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/DashboardLayout";
import { InputField } from "@/components/InputField";
import { handleApiError } from "@/lib/errorUtils";
import { useFormValidation } from "@/lib/useFormValidation";
import { organizationValidationSchema } from "@/lib/validationSchema";
import { Building2, ArrowLeft, Save } from "lucide-react";

export default function CreateOrganization() {
  const router = useRouter();
  const { form, errors, handleChange, validateAll } = useFormValidation({
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
    website: "",
  }, organizationValidationSchema);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const createOrganization = async () => {
    if (!validateAll()) return;
    
    setError("");
    try {
      setLoading(true);
      const payload = {
        ...form,
        mobileNumber: form.mobileNumber || null,
        adminMobileNumber: form.adminMobileNumber || null
      };
      await api.post("/organizations", payload);
      alert("Organization Created Successfully");
      router.push("/organizations");
    } catch (error: any) {
      const apiError = handleApiError(error);
      setError(apiError.message);
    } finally {
      setLoading(false);
    }
  };

  const companyFields = [
    { name: "companyName", label: "Company Name" },
    { name: "companyCode", label: "Company Code" },
    { name: "email", label: "Email" },
    { name: "phone", label: "Phone" },
    { name: "mobileNumber", label: "Mobile Number" },
    { name: "website", label: "Website" },
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
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => router.back()} className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 transition-all">
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Create Organization</h1>
              <p className="text-slate-500 text-sm">Add a new enterprise organization to the system</p>
            </div>
          </div>
          <button 
            onClick={createOrganization}
            disabled={loading}
            className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-50"
          >
            <Save size={18} />
            {loading ? "Creating..." : "Create Organization"}
          </button>
        </div>

        {error && (
          <div className="p-4 bg-rose-50 text-rose-600 rounded-2xl border border-rose-100">
            {error}
          </div>
        )}

        {/* Form Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="font-semibold text-slate-900 flex items-center gap-2">
              <Building2 size={18} className="text-indigo-600" />
              Company Details
            </h2>
            {companyFields.map(field => (
              <InputField key={field.name} {...field} value={form[field.name]} onChange={handleChange} error={errors[field.name]} />
            ))}
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="font-semibold text-slate-900">Address Information</h2>
              {addressFields.map(field => (
                <InputField key={field.name} {...field} value={form[field.name]} onChange={handleChange} error={errors[field.name]} />
              ))}
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="font-semibold text-slate-900">Admin Account</h2>
              {adminFields.map(field => (
                <InputField key={field.name} {...field} value={form[field.name]} onChange={handleChange} error={errors[field.name]} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
