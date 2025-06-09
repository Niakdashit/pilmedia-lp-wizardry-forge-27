
import React from 'react';

const DashboardHeader: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-[#841b60] to-[#6d164f] text-white p-6 rounded-lg mb-6">
      <h1 className="text-2xl font-bold mb-2">Tableau de bord</h1>
      <p className="text-white/80">Gérez vos campagnes et suivez vos performances</p>
    </div>
  );
};

export default DashboardHeader;
