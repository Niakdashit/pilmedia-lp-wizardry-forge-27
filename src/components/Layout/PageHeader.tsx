import React from 'react';

interface PageHeaderProps {
  title: string;
  actions?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, actions }) => (
  <div className="bg-white shadow-sm border-b border-gray-200">
    <div className="px-6 py-4 flex items-center justify-between">
      <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
      {actions && <div className="flex space-x-3">{actions}</div>}
    </div>
  </div>
);

export default PageHeader;
