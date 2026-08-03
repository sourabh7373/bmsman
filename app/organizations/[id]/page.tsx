"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import PageHeader from "@/components/PageHeader";

export default function OrganizationDetails() {
  const params = useParams();
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

  return (
    <div className="flex min-h-screen bg-gray-50 w-full overflow-x-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col w-full min-w-0">
        <Topbar />
        <main className="p-6 lg:p-10 w-full max-w-5xl mx-auto">
          <PageHeader title="Organization Details" showBack={true} />

          {loading ? (
            <div className="p-12 text-center text-gray-500">Loading details...</div>
          ) : error ? (
            <div className="p-8 bg-red-50 text-red-600 rounded-xl border border-red-100">{error}</div>
          ) : !org ? (
            <div className="p-8 text-center text-gray-500">Organization not found</div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 lg:p-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Company Name</p>
                  <p className="text-lg font-semibold text-gray-900">{org.companyName || org.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-lg font-semibold text-gray-900">{org.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">ID</p>
                  <p className="text-lg font-semibold text-gray-900">{org.id}</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
