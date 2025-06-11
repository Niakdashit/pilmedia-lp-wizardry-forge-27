
import React from 'react';

const DashboardHeader: React.FC = () => {
  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Gérez vos campagnes et suivez vos performances</p>
      </div>
    </div>
  );
};

export default DashboardHeader;
