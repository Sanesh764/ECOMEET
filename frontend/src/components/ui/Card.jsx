import React from 'react';

export const Card = ({
  children,
  className = '',
  hoverEffect = false,
  ...props
}) => {
  return (
    <div
      className={`glassmorphic-card rounded-2xl p-6 transition-all duration-300 ${
        hoverEffect ? 'hover:translate-y-[-4px] hover:border-white/15 hover:shadow-indigo-500/5 hover:bg-white/[0.04]' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
export default Card;
