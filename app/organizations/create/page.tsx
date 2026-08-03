"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import PageHeader from "@/components/PageHeader";
import { InputField } from "@/components/InputField";
import { handleApiError } from "@/lib/errorUtils";

export default function CreateOrganization() {
  const router = useRouter();
  const [form, setForm] = useState({
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
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: [] });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string[]> = {};
    if (!form.companyName) newErrors.companyName = ["Organization name is required"];
    if (!form.email) {
      newErrors.email = ["Email is required"];
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = ["Enter a valid email address"];
    }
    if (!form.phone) newErrors.phone = ["Phone number is required"];
    if (!form.address) newErrors.address = ["Address is required"];
    if (!form.adminPassword) {
      newErrors.adminPassword = ["Admin password is required"];
    } else if (form.adminPassword.length < 8) {
      newErrors.adminPassword = ["Password must be at least 8 characters"];
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const createOrganization = async () => {
    // Remove client-side validation if we want to rely on backend,
    // but keeping it for now as per existing code.
    if (!validate()) return;
    
    setError("");
    setErrors({});
    try {
      setLoading(true);
      await api.post("/organizations", form);
      alert("Organization Created Successfully");
      router.push("/organizations");
    } catch (error: any) {
      const apiError = handleApiError(error);
      setError(apiError.message);
      setErrors(apiError.validationErrors);
      // If allErrors exists, we can use it for the summary
      if (apiError.allErrors && apiError.allErrors.length > 0) {
        // Optionally, we could set a specific state for allErrors if needed
        // but for now, let's just ensure the UI uses the validationErrors correctly
      }
    } finally {
      setLoading(false);
    }
  };

  const fields: { name: string; label: string; type?: string }[] = [
    { name: "companyName", label: "Company Name" },
    { name: "companyCode", label: "Company Code" },
    { name: "address", label: "Address" },
    { name: "city", label: "City" },
    { name: "country", label: "Country" },
    { name: "postalCode", label: "Postal Code" },
    { name: "phone", label: "Phone" },
    { name: "mobileNumber", label: "Mobile Number" },
    { name: "email", label: "Email" },
    { name: "gstNo", label: "GST No" },
    { name: "adminUsername", label: "Admin Username" },
    { name: "adminEmail", label: "Admin Email" },
    { name: "adminDisplayName", label: "Admin Display Name" },
    { name: "adminPassword", label: "Admin Password", type: "password" },
    { name: "adminMobileNumber", label: "Admin Mobile Number" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <Sidebar />
      <div className="lg:pl-64 flex flex-col w-full">
        <Topbar />
        <main className="p-6 lg:p-10 w-full max-w-5xl mx-auto">
          <PageHeader title="Create Organization" showBack={true} />

          {error && (
            <div className="mb-8 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100">
              <p className="font-semibold">{error}</p>
              {Object.keys(errors).length > 0 && (
                <ul className="list-disc list-inside mt-2">
                  {Object.values(errors).flat().map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 lg:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {fields.map((field) => (
                <InputField
                  key={field.name}
                  label={field.label}
                  name={field.name}
                  value={(form as any)[field.name] ?? ""}
                  onChange={handleChange}
                  placeholder={field.label}
                  type={field.type || "text"}
                  error={errors[field.name]?.join(", ")}
                />
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-gray-100 flex justify-end">
              <button
                onClick={createOrganization}
                disabled={loading}
                className="bg-gray-900 text-white px-8 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all w-full md:w-auto disabled:opacity-50 shadow-lg shadow-gray-200"
              >
                {loading ? "Creating..." : "Create Organization"}
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
