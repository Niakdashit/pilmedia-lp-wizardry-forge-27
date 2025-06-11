
import React from 'react';

const DashboardHeader: React.FC = () => {
  return (
    <div className="bg-white rounded-lg p-6 mb-6 shadow-sm border border-gray-200">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Bienvenue dans votre espace de gestion</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
