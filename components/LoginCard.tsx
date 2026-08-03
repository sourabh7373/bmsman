import React from 'react';

interface LoginCardProps {
  children: React.ReactNode;
}

export const LoginCard: React.FC<LoginCardProps> = ({ children }) => {
  return (
    <div className="w-full max-w-[400px] mx-auto animate-in slide-in-from-bottom-4 duration-500">
      {children}
    </div>
  );
};
