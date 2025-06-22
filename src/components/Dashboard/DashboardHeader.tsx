
import React from 'react';

const DashboardHeader: React.FC = () => {
  return (
    <div className="bg-white border-b border-[#EDF3F7] shadow-sm mb-8">
      <div className="px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-[#141E29] mb-2">
            Tableau de bord
          </h1>
          <p className="text-[#64748B] text-lg font-medium">
            Gérez vos campagnes et suivez vos performances en temps réel
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
