import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  className = '',
  ...props
}) => (
  <div className="space-y-1">
    {label && (
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
    )}
    <div className="relative rounded-md shadow-sm">
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
      )}
      <input
        className={`
          block w-full rounded-md border-gray-300 shadow-sm
          focus:ring-purple-500 focus:border-purple-500 sm:text-sm
          ${icon ? 'pl-10' : ''}
          ${error ? 'border-red-300' : ''}
          ${className}
        `}
        {...props}
      />
    </div>
    {error && (
      <p className="text-sm text-red-600">{error}</p>
    )}
  </div>
);