
import React from 'react';
import { Activity, Users, BarChart2, Target, TrendingUp } from 'lucide-react';
import { AdminStats } from './types';

interface AdminKPICardsProps {
  stats: AdminStats;
}

const AdminKPICards: React.FC<AdminKPICardsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm font-medium">Campagnes Actives</p>
            <p className="text-2xl font-bold text-green-600">{stats.activeCampaigns}</p>
          </div>
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <Activity className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm font-medium">Total Participations</p>
            <p className="text-2xl font-bold text-purple-600">{stats.totalParticipations.toLocaleString()}</p>
          </div>
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <Users className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm font-medium">Taux Conversion Moyen</p>
            <p className="text-2xl font-bold text-orange-600">{stats.avgConversionRate}%</p>
          </div>
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
            <BarChart2 className="w-6 h-6 text-orange-600" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm font-medium">Jeu le Plus Populaire</p>
            <p className="text-lg font-bold text-blue-600">{stats.topGameType}</p>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Target className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm font-medium">Client Top Perf.</p>
            <p className="text-lg font-bold text-indigo-600">{stats.topClient}</p>
          </div>
          <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-indigo-600" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm font-medium">Total Clients</p>
            <p className="text-2xl font-bold text-[#841b60]">{stats.totalClients}</p>
          </div>
          <div className="w-12 h-12 bg-[#841b60]/10 rounded-lg flex items-center justify-center">
            <Users className="w-6 h-6 text-[#841b60]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminKPICards;
