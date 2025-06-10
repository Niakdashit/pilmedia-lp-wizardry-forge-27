
import React from 'react';
import { Users, Target, BarChart, Calendar, TrendingUp, TrendingDown } from 'lucide-react';
import { DashboardStat } from './types';

const StatsGrid: React.FC = () => {
  const stats: DashboardStat[] = [
    {
      name: 'Campagnes actives',
      value: '5',
      change: '+2 cette semaine',
      icon: <Target className="w-6 h-6 text-primary-600 dark:text-primary-400" />,
      trend: 'up'
    },
    {
      name: 'Participations',
      value: '1,254',
      change: '+18% ce mois',
      icon: <Users className="w-6 h-6 text-accent-600 dark:text-accent-400" />,
      trend: 'up'
    },
    {
      name: 'Taux de conversion',
      value: '42%',
      change: '+5% ce mois',
      icon: <BarChart className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      trend: 'up'
    },
    {
      name: 'Prochaine campagne',
      value: '2j',
      change: '10 avril',
      icon: <Calendar className="w-6 h-6 text-orange-600 dark:text-orange-400" />,
      trend: 'neutral'
    }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-emerald-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-emerald-600 dark:text-emerald-400';
      case 'down':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-surface-600 dark:text-surface-400';
    }
  };

  return (
    <div className="stats-grid">
      {stats.map((stat, statIndex) => (
        <div key={statIndex} className="stat-card group">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-2xl bg-surface-50 dark:bg-surface-700/50 group-hover:scale-110 transition-transform duration-200">
              {stat.icon}
            </div>
            {getTrendIcon(stat.trend)}
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium text-surface-600 dark:text-surface-400">
              {stat.name}
            </p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-semibold text-surface-900 dark:text-surface-50">
                {stat.value}
              </h3>
              <p className={`text-sm font-medium ${getTrendColor(stat.trend)}`}>
                {stat.change}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
