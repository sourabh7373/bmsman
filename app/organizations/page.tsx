"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import PageHeader from "@/components/PageHeader";

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
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-4 lg:p-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
            <PageHeader title="Organizations" showBack={true} />
            <Link href="/organizations/create">
              <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors h-[44px] w-full sm:w-auto">
                + Create Organization
              </button>
            </Link>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg border border-red-100">
              {error}
            </div>
          )}

          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            {loading ? (
              <div className="p-8 text-center text-muted">Loading...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-muted bg-gray-50/50">
                      <th className="p-4 text-left font-medium">Company Name</th>
                      <th className="p-4 text-left font-medium">Email</th>
                      <th className="p-4 text-right font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {organizations.map((org) => (
                      <tr key={org.id} className="hover:bg-gray-50 transition-colors">
                        <td className="p-4 font-medium text-foreground">{org.companyName}</td>
                        <td className="p-4 text-muted">{org.email}</td>
                        <td className="p-4 text-right">
                          <Link href={`/organizations/${org.id}`}>
                            <button className="text-primary hover:text-primary/80 font-medium h-[44px] px-4">
                              View
                            </button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                    {organizations.length === 0 && (
                      <tr>
                        <td colSpan={3} className="p-8 text-center text-muted">
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
