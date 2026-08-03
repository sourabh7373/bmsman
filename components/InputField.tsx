import React from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
  error?: string;
}

export const InputField: React.FC<InputFieldProps> = ({ label, icon, error, value, ...props }) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
            {icon}
          </div>
        )}
        <input
          {...props}
          value={value ?? ""}
          className={`w-full h-[52px] border ${
            error 
              ? 'border-rose-300 dark:border-rose-700 focus:ring-rose-500' 
              : 'border-slate-300 dark:border-slate-700 focus:ring-indigo-500'
          } rounded-2xl px-4 ${icon ? 'pl-12' : ''} outline-none focus:ring-2 transition-all bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 shadow-sm`}
        />
      </div>
      {error && <p className="text-xs text-rose-500 dark:text-rose-400 font-medium">{error}</p>}
    </div>
  );
};
