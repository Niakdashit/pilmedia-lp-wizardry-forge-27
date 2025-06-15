
import React from 'react';
interface PageHeaderProps {
  title: string;
  actions?: React.ReactNode;
  children?: React.ReactNode;
  variant?: 'default' | 'plain';
  size?: 'default' | 'sm';
}
const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  actions,
  children,
  variant = 'default',
  size = 'sm'
}) => {
  // Title size and button size: 2xl everywhere except Dashboard (handled elsewhere)
  const titleClass = size === 'sm' ? 'text-2xl font-bold mb-2 text-[#841b60] drop-shadow-sm' : 'text-3xl md:text-4xl font-bold mb-4 text-[#841b60] drop-shadow-sm';
  const actionsClass = size === 'sm' ? 'flex flex-wrap justify-center gap-3 [&_button]:px-6 [&_button]:py-2.5 [&_button]:text-base [&_button]:rounded-xl [&_button]:shadow' : 'flex flex-wrap justify-center gap-4';

  // Dashboard-like glassy pastel style for all pages except Dashboard header (which already has its own)
  if (variant === 'default') {
    return <div className="relative w-full mt-3 py-7 px-2 select-none md:px-[19px]">
        {/* Aura pastel background, extra soft */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute -inset-10 bg-gradient-to-br from-[#dbeafe]/40 via-[#f3e8ff]/60 to-[#fdf2f8]/50 rounded-[48px] blur-2xl" />
        </div>
        {/* Main glassy card */}
        <div className="relative max-w-7xl mx-auto z-10">
          <div className="relative backdrop-blur-md [0_4px_32px_0_rgba(132,27,96,0.05)] rounded-[36px] px-6 md:px-16 py-10 flex flex-col items-center text-center bg-[#428cec]/[0.14]">
            {/* Decorative soft lights just like bg effect in your image */}
            <div className="absolute -top-8 -right-12 w-40 h-40 bg-gradient-to-br from-[#f3e8ff]/60 to-[#c7d2fe]/40 rounded-full blur-2xl z-0" />
            <div className="absolute bottom-0 left-16 w-32 h-32 bg-gradient-to-br from-[#fdf2f8]/60 to-[#e0e7ff]/30 rounded-full blur-2xl z-0" />
            
            <h1 className={`${titleClass} relative z-10`}>{title}</h1>
            {children && <div className="mb-3 flex justify-center relative z-10">{children}</div>}
            {actions && <div className={`${actionsClass} relative z-10`}>{actions}</div>}
          </div>
        </div>
      </div>;
  }

  // "Plain" style (rare, used for pages sans décor)
  return <div className="w-full pt-10 px-2 md:px-0">
      <div className="relative max-w-7xl mx-auto">
        <div className="relative z-10 flex flex-col items-center text-center">
          <h1 className={titleClass}>{title}</h1>
          {children && <div className="mb-4 flex justify-center">{children}</div>}
          {actions && <div className={actionsClass}>{actions}</div>}
        </div>
      </div>
    </div>;
};
export default PageHeader;
