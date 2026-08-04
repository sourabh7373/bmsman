import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-[#f8fafc] flex flex-col lg:flex-row overflow-x-hidden">
      <Sidebar />
      <div className="flex flex-col w-full min-w-0 lg:pl-64">
        <Topbar />
        <main className="p-4 md:p-6 lg:p-8 w-full flex-1 max-w-full">
          {children}
        </main>
      </div>
    </div>
  );
};
