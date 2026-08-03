import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import PageHeader from "@/components/PageHeader";
import { ThemeBackground } from "@/components/ThemeBackground";
import { IllustrationCard } from "@/components/IllustrationCard";
import { DashboardCard } from "@/components/DashboardCard";
import { Building2, ShieldCheck, Users, Activity, TrendingUp } from "lucide-react";

export default function Dashboard() {
  return (
    <ThemeBackground type="dashboard" className="min-h-screen w-full">
      <Sidebar />
      <div className="lg:pl-64 flex flex-col w-full">
        <Topbar />
        <main className="p-6 lg:p-10 w-full max-w-7xl mx-auto space-y-8">
          <PageHeader title="Dashboard Overview" showBack={false} />

          {/* Hero Illustration Banner */}
          <IllustrationCard
            title="Welcome to Enterprise SaaS Hub"
            subtitle="Manage your organizations, privileges, security controls, and system permissions with cutting-edge analytics and seamless workflow control."
            icon={Activity}
            badge="Enterprise Edition"
            gradient="from-blue-600 via-indigo-600 to-purple-700"
          >
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-sm font-medium">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
                System Operational
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-sm font-medium">
                <TrendingUp size={16} className="text-blue-300" />
                +14.2% Growth This Month
              </div>
            </div>
          </IllustrationCard>

          {/* Styled Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <DashboardCard
              title="Total Organizations"
              value="12"
              change="+12%"
              isPositive={true}
              icon={Building2}
              gradient="from-blue-500 to-indigo-600"
            />
            <DashboardCard
              title="Active Privileges"
              value="34"
              change="+4"
              isPositive={true}
              icon={ShieldCheck}
              gradient="from-indigo-500 to-purple-600"
            />
            <DashboardCard
              title="Registered Users"
              value="128"
              change="+18%"
              isPositive={true}
              icon={Users}
              gradient="from-purple-500 to-pink-600"
            />
          </div>
        </main>
      </div>
    </ThemeBackground>
  );
}
