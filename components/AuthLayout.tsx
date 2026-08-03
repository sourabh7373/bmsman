import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#2563EB] via-[#4F46E5] to-[#7C3AED] p-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-3xl" />
      
      <div className="w-full max-w-[440px] bg-white/95 backdrop-blur-xl p-8 md:p-10 rounded-[18px] shadow-[0_25px_60px_rgba(0,0,0,0.15)] animate-in fade-in zoom-in duration-500 relative z-10">
        {children}
      </div>
      
      <footer className="absolute bottom-6 text-white/70 text-sm">
        © 2026 BMSMAN
      </footer>
    </div>
  );
};
