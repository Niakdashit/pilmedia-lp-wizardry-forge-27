
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
  variant = 'default', // "default" = avec cadre, "plain" = sans cadre
  size = 'sm',
}) => {
  // Taille du titre et style du header
  const titleClass =
    size === 'sm'
      ? 'text-2xl font-bold mb-2 text-[#841b60] drop-shadow-sm'
      : 'text-3xl md:text-4xl font-bold mb-4 text-[#841b60] drop-shadow-sm';

  const actionsClass =
    size === 'sm'
      ? 'flex flex-wrap justify-center gap-3 [&_button]:px-6 [&_button]:py-2.5 [&_button]:text-base [&_button]:rounded-xl [&_button]:shadow'
      : 'flex flex-wrap justify-center gap-4';

  // Pour les autres pages : cadre blanc, ombre douce, coins arrondis
  if (variant === 'default') {
    return (
      <div className="w-full py-7 px-2 md:px-0">
        <div className="relative max-w-7xl mx-auto">
          <div className="bg-white/90 shadow-lg rounded-2xl px-6 md:px-12 py-8 flex flex-col items-center text-center border border-gray-100">
            <h1 className={titleClass}>{title}</h1>
            {children && <div className="mb-3 flex justify-center">{children}</div>}
            {actions && <div className={actionsClass}>{actions}</div>}
          </div>
        </div>
      </div>
    );
  }

  // Option "plain" (ex: Dashboard/Futur) => header nu, pas de cadre
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
