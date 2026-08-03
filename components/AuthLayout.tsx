import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex w-full items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-[440px] bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-blue-100 animate-in fade-in zoom-in duration-500">
        {children}
      </div>
    </div>
  );
};
