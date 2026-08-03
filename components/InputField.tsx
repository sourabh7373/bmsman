import React from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
}

export const InputField: React.FC<InputFieldProps> = ({ label, icon, ...props }) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          {...props}
          className={`w-full h-[52px] border border-gray-200 rounded-[12px] px-4 ${icon ? 'pl-12' : ''} outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
        />
      </div>
    </div>
  );
};
