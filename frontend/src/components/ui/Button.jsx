import React from 'react';
import { Loader2 } from 'lucide-react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  icon: Icon,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-95';
  
  const variants = {
    primary: 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/10 hover:shadow-indigo-600/20 border border-indigo-500/20',
    secondary: 'bg-white/5 hover:bg-white/10 text-gray-200 border border-white/10 hover:border-white/20',
    danger: 'bg-red-600/90 hover:bg-red-600 text-white border border-red-500/20 shadow-md shadow-red-600/10',
    ghost: 'hover:bg-white/5 text-gray-400 hover:text-gray-200',
    glass: 'glassmorphic text-gray-200 hover:bg-white/10 hover:border-white/25 shadow-lg'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3.5 text-base gap-2.5'
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin text-current" />
      ) : Icon ? (
        <Icon className="h-4 w-4 shrink-0 text-current" />
      ) : null}
      {children}
    </button>
  );
};
export default Button;
