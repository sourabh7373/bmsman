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
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-4 lg:p-8">
          <PageHeader title="Organization Details" showBack={true} />

          {loading ? (
            <div className="p-8 text-center text-muted">Loading...</div>
          ) : error ? (
            <div className="p-8 text-red-600">{error}</div>
          ) : !org ? (
            <div className="p-8">Organization not found</div>
          ) : (
            <div className="bg-card border border-border rounded-xl shadow-sm p-6 lg:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted">Company Name</p>
                  <p className="font-medium text-foreground">{org.companyName || org.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted">Email</p>
                  <p className="font-medium text-foreground">{org.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted">ID</p>
                  <p className="font-medium text-foreground">{org.id}</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
