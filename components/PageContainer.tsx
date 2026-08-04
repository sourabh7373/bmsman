import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const PageContainer: React.FC<ContainerProps> = ({ children, className = "" }) => {
  return (
    <main className={`p-4 md:p-6 lg:p-8 w-full mx-auto space-y-6 ${className} overflow-x-hidden`}>
      {children}
    </main>
  );
};
