
import React from 'react';

interface PageHeaderProps {
  title: string;
  actions?: React.ReactNode;
  children?: React.ReactNode;
  size?: 'default' | 'sm'; // Ajout d'une taille
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, actions, children, size = 'default' }) => {
  // Classes selon la taille (Dashboard == default, autres == sm)
  const titleClass =
    size === 'sm'
      ? 'text-2xl font-bold mb-4 text-[#841b60] drop-shadow-sm'
      : 'text-3xl md:text-4xl font-bold mb-6 text-[#841b60] drop-shadow-sm';

  // Pour actions, on wrappe pour modifier la taille des boutons si size == sm
  const actionsClass = size === 'sm'
    ? 'flex flex-wrap justify-center gap-3 [&_button]:px-6 [&_button]:py-2.5 [&_button]:text-base [&_button]:rounded-xl [&_button]:shadow'
    : 'flex flex-wrap justify-center gap-4';

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
