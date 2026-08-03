import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import StatsCard from "@/components/StatsCard";
import PageHeader from "@/components/PageHeader";
import { Briefcase, Factory, CheckCircle2, AlertCircle } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50 w-full overflow-x-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col w-full min-w-0 lg:ml-64">
        <Topbar />
        <main className="p-6 lg:p-10 w-full max-w-7xl mx-auto">
          <PageHeader title="Dashboard" showBack={false} />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                <Briefcase size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Active Jobs</p>
                <h2 className="text-2xl font-bold text-gray-900">308</h2>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                <Factory size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Manufacturing</p>
                <h2 className="text-2xl font-bold text-gray-900">11</h2>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Delivered</p>
                <h2 className="text-2xl font-bold text-gray-900">26</h2>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-red-50 text-red-600 rounded-xl">
                <AlertCircle size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Overdue</p>
                <h2 className="text-2xl font-bold text-gray-900">81</h2>
              </div>
            </div>
          </div>

          <div className="mt-10 bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-gray-900">Recent Jobs</h2>
              <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 px-4 py-2 rounded-lg transition-colors">View All</button>
            </div>
            <div className="overflow-x-auto -mx-6 sm:-mx-8 px-6 sm:px-8">
              <table className="w-full text-sm min-w-[600px]">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-500">
                    <th className="text-left pb-4 font-medium">Job ID</th>
                    <th className="text-left pb-4 font-medium">Client</th>
                    <th className="text-left pb-4 font-medium">Status</th>
                    <th className="text-right pb-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-5 font-semibold text-gray-900">JOB-1001</td>
                    <td className="py-5 text-gray-600">ABC Company</td>
                    <td className="py-5">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                        Delivered
                      </span>
                    </td>
                    <td className="py-5 text-right">
                      <button className="text-blue-600 font-medium hover:text-blue-700">View</button>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-5 font-semibold text-gray-900">JOB-1002</td>
                    <td className="py-5 text-gray-600">XYZ Ltd</td>
                    <td className="py-5">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-50 text-orange-700 border border-orange-100">
                        Manufacturing
                      </span>
                    </td>
                    <td className="py-5 text-right">
                      <button className="text-blue-600 font-medium hover:text-blue-700">View</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
