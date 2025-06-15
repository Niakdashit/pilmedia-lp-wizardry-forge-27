
import React from 'react';

interface PageHeaderProps {
  title: string;
  actions?: React.ReactNode;
  children?: React.ReactNode;
  variant?: 'default' | 'plain';
}

/**
 * PageHeader: version stylée pour Dashboard (default); version allégée ("plain") pour autres pages.
 */
const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  actions,
  children,
  variant = 'default'
}) => {
  if (variant === 'plain') {
    return (
      <div className="w-full pt-10 px-2 md:px-0 mb-6">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#841b60] drop-shadow-sm">
            {title}
          </h1>
          {children && <div className="mb-4 flex justify-center">{children}</div>}
          {actions && (
            <div className="flex flex-wrap justify-center gap-4">{actions}</div>
          )}
        </div>
      </div>
    );
  }
  // Default variant: dashboard style
  return (
    <div className="w-full pt-10 px-2 md:px-0">
      <div className="relative max-w-7xl mx-auto rounded-[40px] p-10 md:p-12 bg-white/70 backdrop-blur-[8px] border border-white/70 shadow-[0_12px_48px_0_rgba(120,90,170,0.13)]">
        <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-white/80 via-white/70 to-white/60 pointer-events-none" />
        <div className="absolute top-10 left-6 w-32 h-32 bg-gradient-to-br from-[#e6e6fd]/30 to-[#d6ecfa]/30 rounded-full blur-xl z-0" />
        <div className="absolute -bottom-2 right-8 w-40 h-20 bg-gradient-to-br from-[#e8d8fa]/20 to-[#c7f1fa]/15 rounded-full blur-2xl z-0" />
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#841b60]/10 to-transparent rounded-b-[38px]" />
        <div className="relative z-10 flex flex-col items-center text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-[#841b60] drop-shadow-sm">{title}</h1>
          {children && <div className="mb-8 flex justify-center">{children}</div>}
          {actions && <div className="flex flex-wrap justify-center gap-4">{actions}</div>}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
