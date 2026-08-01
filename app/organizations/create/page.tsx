"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const createOrganization = async () => {
    try {
      setLoading(true);
      await api.post("/organizations", form);
      alert("Organization Created Successfully");
      router.push("/organizations");
    } catch (error: any) {
      console.log(error.response?.data);
      alert(JSON.stringify(error.response?.data));
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
    <div className="p-8 max-w-3xl">
      <h1 className="text-2xl font-bold text-foreground mb-8">Create Organization</h1>

      <div className="bg-card border border-border rounded-xl shadow-sm p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fields.map((field) => (
            <div key={field.name} className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground">{field.label}</label>
              <input
                name={field.name}
                value={(form as any)[field.name]}
                onChange={handleChange}
                placeholder={field.label}
                type={field.type || "text"}
                className="border border-border rounded-lg px-4 py-2.5 w-full outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          ))}
        </div>

        <button
          onClick={createOrganization}
          disabled={loading}
          className="mt-8 w-full bg-primary text-primary-foreground font-medium rounded-lg py-3 hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Organization"}
        </button>
      </div>
    </div>
  );
}
