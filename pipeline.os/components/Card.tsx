import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  noPadding?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  title, 
  subtitle, 
  action,
  noPadding = false 
}) => {
  return (
    <div className={`bg-white border border-gray-200/75 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col ${className}`}>
      {(title || action) && (
        <div className="px-4 py-4 sm:px-6 sm:py-5 border-b border-gray-100/50 flex items-start justify-between min-h-[64px] sm:min-h-[72px]">
          <div className="flex flex-col gap-0.5 sm:gap-1">
            {title && <h3 className="text-sm sm:text-base font-semibold text-gray-900 tracking-tight">{title}</h3>}
            {subtitle && <p className="text-xs sm:text-sm text-gray-500">{subtitle}</p>}
          </div>
          {action && <div className="flex items-center pl-3 sm:pl-4">{action}</div>}
        </div>
      )}
      <div className={`${noPadding ? 'p-0' : 'p-4 sm:p-6'} flex-1`}>
        {children}
      </div>
    </div>
  );
};