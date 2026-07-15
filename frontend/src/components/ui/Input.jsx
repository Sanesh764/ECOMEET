import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export const Input = ({
  label,
  type = 'text',
  error,
  icon: Icon,
  className = '',
  id,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={`w-full flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3.5 text-gray-400 pointer-events-none">
            <Icon className="h-4.5 w-4.5" />
          </div>
        )}
        <input
          id={id}
          type={inputType}
          className={`w-full bg-black/20 hover:bg-black/35 focus:bg-black/50 border ${
            error ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/25' : 'border-white/10 focus:border-indigo-500 focus:ring-indigo-500/25'
          } rounded-xl px-4 py-3 text-sm text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-4 transition-all duration-200 ${
            Icon ? 'pl-11' : ''
          } ${isPassword ? 'pr-11' : ''}`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 text-gray-400 hover:text-gray-200 cursor-pointer focus:outline-none"
          >
            {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
          </button>
        )}
      </div>
      {error && (
        <p className="text-xs text-red-400 font-medium mt-0.5 animate-pulse-slow">
          {error}
        </p>
      )}
    </div>
  );
};
export default Input;
