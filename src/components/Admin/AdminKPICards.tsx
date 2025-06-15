
import React from 'react';
import { TrendingUp, Users, Target, Trophy, Award } from 'lucide-react';
import { AdminStats } from './types';

interface AdminKPICardsProps {
  stats: AdminStats;
}

const AdminKPICards: React.FC<AdminKPICardsProps> = ({ stats }) => {
  const kpiData = [
    {
      title: 'Campagnes Actives',
      value: stats.activeCampaigns,
      icon: Target,
      color: 'primary',
      bgColor: 'bg-[#841b60]/10',
      iconColor: 'text-[#841b60]',
      trend: '+2 cette semaine'
    },
    {
      title: 'Total Participations',
      value: stats.totalParticipations.toLocaleString(),
      icon: Users,
      color: 'secondary',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      trend: '+18% ce mois'
    },
    {
      title: 'Taux Conversion Moyen',
      value: `${stats.avgConversionRate}%`,
      icon: TrendingUp,
      color: 'success',
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      trend: '+0.5% ce mois'
    },
    {
      title: 'Jeu le Plus Populaire',
      value: stats.topGameType,
      icon: Trophy,
      color: 'warning',
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-600',
      trend: '67% des campagnes'
    },
    {
      title: 'Client Top Perf.',
      value: stats.topClient,
      icon: Award,
      color: 'info',
      bgColor: 'bg-cyan-50',
      iconColor: 'text-cyan-600',
      trend: 'Meilleur ROI'
    },
    {
      title: 'Total Clients',
      value: stats.totalClients,
      icon: Users,
      color: 'neutral',
      bgColor: 'bg-gray-50',
      iconColor: 'text-gray-600',
      trend: '+3 ce mois'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
      {kpiData.map((kpi, index) => {
        const Icon = kpi.icon;
        return (
          <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex flex-col space-y-3">
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 ${kpi.bgColor} rounded-full flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${kpi.iconColor}`} />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{kpi.title}</p>
                <p className="text-2xl font-bold text-gray-900 mb-1">{kpi.value}</p>
                <p className="text-xs text-gray-500">{kpi.trend}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AdminKPICards;
