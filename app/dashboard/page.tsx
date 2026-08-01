import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import StatsCard from "@/components/StatsCard";
import PageHeader from "@/components/PageHeader";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-background w-full overflow-x-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col w-full min-w-0">
        <Topbar />
        <main className="p-4 lg:p-8 w-full">
          <PageHeader title="Dashboard" showBack={false} />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard title="Active Jobs" value="308" />
            <StatsCard title="Manufacturing" value="11" />
            <StatsCard title="Delivered" value="26" />
            <StatsCard title="Overdue" value="81" />
          </div>

          <div className="mt-8 bg-card border border-border rounded-xl shadow-sm p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">Recent Jobs</h2>
            <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
              <table className="w-full text-sm min-w-[500px]">
                <thead>
                  <tr className="border-b border-border text-muted">
                    <th className="text-left pb-4 font-medium">Job</th>
                    <th className="text-left pb-4 font-medium">Client</th>
                    <th className="text-left pb-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 font-medium">JOB-1001</td>
                    <td className="py-4 text-muted">ABC Company</td>
                    <td className="py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Delivered
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 font-medium">JOB-1002</td>
                    <td className="py-4 text-muted">XYZ Ltd</td>
                    <td className="py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                        Manufacturing
                      </span>
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
