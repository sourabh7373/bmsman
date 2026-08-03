"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import PageHeader from "@/components/PageHeader";
import { InputField } from "@/components/InputField";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const createOrganization = async () => {
    setError("");
    try {
      setLoading(true);
      await api.post("/organizations", form);
      alert("Organization Created Successfully");
      router.push("/organizations");
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to create organization");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
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
    { name: "adminPassword", label: "Admin Password", type: "password" },
    { name: "adminEmail", label: "Admin Email" },
    { name: "adminDisplayName", label: "Admin Display Name" },
    { name: "adminMobileNumber", label: "Admin Mobile Number" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 w-full overflow-x-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col w-full min-w-0">
        <Topbar />
        <main className="p-6 lg:p-10 w-full max-w-5xl mx-auto">
          <PageHeader title="Create Organization" showBack={true} />

          {error && (
            <div className="mb-8 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100">
              {error}
            </div>
          )}

          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 lg:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {fields.map((field) => (
                <InputField
                  key={field.name}
                  label={field.label}
                  name={field.name}
                  value={(form as any)[field.name]}
                  onChange={handleChange}
                  placeholder={field.label}
                  type={field.type || "text"}
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
