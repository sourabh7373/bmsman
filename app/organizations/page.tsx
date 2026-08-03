"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import PageHeader from "@/components/PageHeader";
import { Plus, Eye, Pencil } from "lucide-react";

export default function Organizations() {
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadOrganizations();
  }, []);

  const loadOrganizations = async () => {
    try {
      setLoading(true);
      const res = await api.get("/organizations");
      if (Array.isArray(res.data)) {
        setOrganizations(res.data);
      } else if (Array.isArray(res.data.content)) {
        setOrganizations(res.data.content);
      } else if (Array.isArray(res.data.data)) {
        setOrganizations(res.data.data);
      } else {
        setOrganizations([]);
      }
    } catch (error: any) {
      setError("Failed to load organizations");
      console.error("Organization Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <Sidebar />
      <div className="lg:pl-64 flex flex-col w-full">
        <Topbar />
        <main className="p-6 lg:p-10 w-full max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
            <PageHeader title="Organizations" showBack={true} />
            <Link href="/organizations/create">
              <button className="flex items-center justify-center gap-2 bg-gray-900 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-800 transition-all h-[48px] w-full sm:w-auto shadow-lg shadow-gray-200">
                <Plus size={18} />
                Create Organization
              </button>
            </Link>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100">
              {error}
            </div>
          )}

          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            {loading ? (
              <div className="p-12 text-center text-gray-500">Loading organizations...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[600px]">
                  <thead>
                    <tr className="border-b border-gray-100 text-gray-500">
                      <th className="p-6 text-left font-medium">Company Name</th>
                      <th className="p-6 text-left font-medium">Email</th>
                      <th className="p-6 text-right font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {organizations.map((org) => (
                      <tr key={org.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="p-6 font-semibold text-gray-900">{org.companyName}</td>
                        <td className="p-6 text-gray-600">{org.email}</td>
                        <td className="p-6 text-right flex items-center justify-end gap-2">
                          <Link href={`/organizations/${org.id}`}>
                            <span className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-50 transition-all">
                              <Eye size={16} />
                              View
                            </span>
                          </Link>
                          <Link href={`/organizations/edit/${org.id}`}>
                            <span className="inline-flex items-center gap-2 text-gray-600 font-semibold hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-all">
                              <Pencil size={16} />
                              Edit
                            </span>
                          </Link>
                        </td>
                      </tr>
                    ))}
                    {organizations.length === 0 && (
                      <tr>
                        <td colSpan={3} className="p-12 text-center text-gray-500">
                          No Organizations Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
