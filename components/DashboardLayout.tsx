import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-[#f8fafc] flex">
      <Sidebar />
      <div className="lg:pl-64 flex flex-col w-full">
        <Topbar />
        <main className="p-4 md:p-6 lg:p-8 w-full">
          {children}
        </main>
      </div>
    </div>
  );
};
