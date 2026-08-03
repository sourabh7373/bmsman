import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import PageHeader from "@/components/PageHeader";
import { Building2 } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <Sidebar />
      <div className="lg:pl-64 flex flex-col w-full">
        <Topbar />
        <main className="p-6 lg:p-10 w-full max-w-7xl mx-auto">
          <PageHeader title="Dashboard" showBack={false} />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                <Building2 size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Organizations</p>
                <h2 className="text-2xl font-bold text-gray-900">12</h2>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                <Building2 size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Active Organizations</p>
                <h2 className="text-2xl font-bold text-gray-900">10</h2>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                <Building2 size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Pending Approval</p>
                <h2 className="text-2xl font-bold text-gray-900">2</h2>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
