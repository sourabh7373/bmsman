"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import BackButton from "@/components/BackButton";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import PageHeader from "@/components/PageHeader";

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
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-4 lg:p-8">
          <PageHeader title="Create Organization" showBack={true} />

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg border border-red-100">
              {error}
            </div>
          )}

          <div className="bg-card border border-border rounded-xl shadow-sm p-6 lg:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {fields.map((field) => (
                <div key={field.name} className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-foreground">{field.label}</label>
                  <input
                    name={field.name}
                    value={(form as any)[field.name]}
                    onChange={handleChange}
                    placeholder={field.label}
                    type={field.type || "text"}
                    className="border border-border rounded-md px-4 py-2.5 w-full outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={createOrganization}
                disabled={loading}
                className="bg-primary text-primary-foreground px-6 py-2.5 rounded-md font-medium hover:bg-primary/90 transition-all w-full md:w-auto disabled:opacity-50"
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
