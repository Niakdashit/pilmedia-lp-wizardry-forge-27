
import React from 'react';

const DashboardHeader: React.FC = () => {
  return (
    <div className="relative h-[100px] bg-gradient-to-b from-[#841b60] to-transparent overflow-hidden">
      <div className="absolute inset-10 opacity-[0.15]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px'
      }} />
      
      <div className="relative h-full max-w-7xl mx-auto px-6 flex items-center">
        <h1 className="text-3xl font-bold text-white">Tableau de bord</h1>
      </div>
    </div>
  );
};

export default DashboardHeader;
