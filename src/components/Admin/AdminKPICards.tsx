
import React from 'react';
import { TrendingUp, Users, Target, Eye } from 'lucide-react';
import { AdminStats } from './types';

interface AdminKPICardsProps {
  stats: AdminStats;
}

const AdminKPICards: React.FC<AdminKPICardsProps> = ({ stats }) => {
  const kpiData = [
    {
      title: 'Campagnes Totales',
      value: stats.totalCampaigns,
      icon: Target,
      color: 'blue',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Campagnes Actives',
      value: stats.activeCampaigns,
      icon: TrendingUp,
      color: 'green',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      title: 'Clients Totaux',
      value: stats.totalClients,
      icon: Users,
      color: 'purple',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    {
      title: 'Participations',
      value: stats.totalParticipations.toLocaleString(),
      icon: Eye,
      color: 'orange',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
      {kpiData.map((kpi, index) => {
        const Icon = kpi.icon;
        return (
          <div key={index} className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">{kpi.title}</p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">{kpi.value}</p>
              </div>
              <div className={`w-10 h-10 sm:w-12 sm:h-12 ${kpi.bgColor} rounded-lg flex items-center justify-center flex-shrink-0 ml-3`}>
                <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${kpi.iconColor}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AdminKPICards;
