"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import Link from "next/link";

export default function Organizations() {
  const [organizations, setOrganizations] = useState<any[]>([]);

  useEffect(() => {
    loadOrganizations();
  }, []);

  const loadOrganizations = async () => {
    try {
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
      console.log("Organization Error:", error.response?.data || error);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-foreground">Organizations</h1>
        <Link href="/organizations/create">
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
            + Create Organization
          </button>
        </Link>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
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
              {organizations?.map((org) => (
                <tr key={org.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-medium text-foreground">{org.companyName}</td>
                  <td className="p-4 text-muted">{org.email}</td>
                  <td className="p-4 text-right">
                    <Link href={`/organizations/${org.id}`}>
                      <button className="text-primary hover:text-primary/80 font-medium">
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
      </div>
    </div>
  );
}
