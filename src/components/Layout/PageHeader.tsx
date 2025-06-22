
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
  size = 'sm',
}) => {
  // Size for header: for all pages except Dashboard, size is 2xl
  const titleClass =
    size === 'sm'
      ? 'text-2xl font-bold mb-2 text-[#841b60] drop-shadow-sm'
      : 'text-3xl md:text-4xl font-bold mb-4 text-[#841b60] drop-shadow-sm';

  const actionsClass =
    size === 'sm'
      ? 'flex flex-wrap justify-center gap-3 [&_button]:px-6 [&_button]:py-2.5 [&_button]:text-base [&_button]:rounded-xl [&_button]:shadow'
      : 'flex flex-wrap justify-center gap-4';

  // Glassmorphic header style (mimics DashboardHeader)
  if (variant === 'default') {
    return (
      <div className="relative overflow-hidden w-full py-7 px-2 md:px-0">
        {/* Glassmorphic container */}
        <div className="relative max-w-7xl mx-auto z-10">
          <div className="relative bg-gradient-to-br from-purple-600/40 via-blue-500/30 to-indigo-600/40 backdrop-blur-2xl border-b border-white/25 rounded-2xl shadow-2xl shadow-purple-500/20 px-6 md:px-12 py-8 flex flex-col items-center text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-black/10 to-black/15 rounded-2xl z-0 pointer-events-none"></div>
            {/* Decorative SVG/art (top right, bottom left, as in Dashboard) */}
            <div className="absolute top-10 right-20 w-32 h-32 bg-gradient-to-br from-purple-400/30 to-blue-400/30 rounded-full blur-xl z-0" />
            <div className="absolute top-5 right-40 w-24 h-24 bg-gradient-to-br from-blue-400/25 to-indigo-400/25 rounded-full blur-lg z-0" />
            <div className="absolute -top-5 right-10 w-20 h-20 bg-gradient-to-br from-purple-300/35 to-pink-300/35 rounded-full blur-md z-0" />
            {/* Abstract SVG shape, top right */}
            <div className="absolute top-0 right-0 w-60 h-32 opacity-40 z-0 pointer-events-none">
              <svg viewBox="0 0 240 80" className="w-full h-full">
                <defs>
                  <linearGradient id="gradHeader" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.4" />
                    <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#6366F1" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
                <path d="M180,10 Q220,30 200,60 T180,70 Q210,78 238,55 L240,0 Z" fill="url(#gradHeader)" />
                <circle cx="200" cy="30" r="10" fill="#8B5CF6" fillOpacity="0.3" />
                <circle cx="180" cy="50" r="6" fill="#3B82F6" fillOpacity="0.4" />
                <path d="M180,55 Q190,45 200,55 T220,70" stroke="#6366F1" strokeWidth="2" strokeOpacity="0.5" fill="none" />
              </svg>
            </div>

            <h1 className={`${titleClass} relative z-10`}>{title}</h1>
            {children && <div className="mb-3 flex justify-center relative z-10">{children}</div>}
            {actions && <div className={`${actionsClass} relative z-10`}>{actions}</div>}
          </div>
        </div>
      </div>
    );
  }

  // Plain (no decoration) for variant='plain', e.g. "Futur" or special pages
  return (
    <div className="w-full pt-10 px-2 md:px-0">
      <div className="relative max-w-7xl mx-auto">
        <div className="relative z-10 flex flex-col items-center text-center">
          <h1 className={titleClass}>{title}</h1>
          {children && <div className="mb-4 flex justify-center">{children}</div>}
          {actions && <div className={actionsClass}>{actions}</div>}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
