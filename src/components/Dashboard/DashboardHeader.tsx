
import React from 'react';

const DashboardHeader: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-8 mb-8 shadow-lg">
      <h1 className="text-3xl font-bold text-primary-950 mb-2">Dashboard</h1>
      <p className="text-primary-600">Gérez vos campagnes et suivez vos performances</p>
    </div>
  );
};

export default DashboardHeader;
