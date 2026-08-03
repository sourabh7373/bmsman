"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { useRouter, useParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import PageHeader from "@/components/PageHeader";
import { InputField } from "@/components/InputField";
import { handleApiError } from "@/lib/errorUtils";

export default function EditOrganization() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

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
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<Record<string, string[]>>({});

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
  }, [id]);

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

  const updateOrganization = async () => {
    if (!validate()) return;
    
    setError("");
    setErrors({});
    try {
      setSaving(true);
      const payload = { id, ...form };
      await api.put(`/organizations`, payload);
      alert("Organization Updated Successfully");
      router.push("/organizations");
    } catch (error: any) {
      const apiError = handleApiError(error);
      setError(apiError.message);
      setErrors(apiError.validationErrors);
    } finally {
      setSaving(false);
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
          <PageHeader title="Edit Organization" showBack={true} />

          {loading ? (
            <div className="p-12 text-center text-gray-500">Loading...</div>
          ) : (
            <>
              {error && (
                <div className="mb-8 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100">
                  <p className="font-semibold">{error}</p>
                  <ul className="list-disc list-inside mt-2">
                    {Object.values(errors).flat().map((err, i) => (
                      <li key={i}>{err}</li>
                    ))}
                  </ul>
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
                      error={errors[field.name]?.join(", ")}
                    />
                  ))}
                </div>

                <div className="mt-10 pt-8 border-t border-gray-100 flex justify-end">
                  <button
                    onClick={updateOrganization}
                    disabled={saving}
                    className="bg-gray-900 text-white px-8 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all w-full md:w-auto disabled:opacity-50 shadow-lg shadow-gray-200"
                  >
                    {saving ? "Updating..." : "Update Organization"}
                  </button>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
