import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex w-full bg-gray-50">
      {/* Left Panel - Form */}
      <div className="w-full lg:w-[40%] flex flex-col justify-center p-8 md:p-16 bg-white shadow-2xl z-10 animate-in fade-in duration-500">
        {children}
      </div>
      
      {/* Right Panel - Abstract Visual */}
      <div className="hidden lg:flex lg:w-[60%] relative bg-blue-900 items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-800 to-blue-950" />
        <div className="relative z-10 text-white p-12 max-w-xl">
          <h2 className="text-4xl font-bold mb-6">Enterprise-Grade Management</h2>
          <p className="text-blue-200 text-lg leading-relaxed">
            Streamline your operations with our AI-powered platform. Designed for scale, built for performance, and tailored for your business needs.
          </p>
          <div className="mt-12 flex gap-4">
            <div className="w-16 h-1 bg-blue-400 rounded-full" />
            <div className="w-8 h-1 bg-blue-600 rounded-full" />
          </div>
        </div>
        {/* Abstract geometric shapes */}
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-700 rounded-full opacity-20 blur-3xl" />
        <div className="absolute top-24 left-24 w-64 h-64 bg-blue-500 rounded-full opacity-10 blur-3xl" />
      </div>
    </div>
  );
};
