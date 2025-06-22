
import React from 'react';
import { Users, Target, BarChart, Calendar } from 'lucide-react';
import { DashboardStat } from './types';

const StatsGrid: React.FC = () => {
  const stats: DashboardStat[] = [
    {
      name: 'Campagnes actives',
      value: '5',
      change: '+2 cette semaine',
      icon: <Target className="w-6 h-6 text-[#951B6D]" />
    },
    {
      name: 'Participations',
      value: '1254',
      change: '+18% ce mois',
      icon: <Users className="w-6 h-6 text-[#951B6D]" />
    },
    {
      name: 'Taux de conversion',
      value: '42%',
      change: '+5% ce mois',
      icon: <BarChart className="w-6 h-6 text-[#951B6D]" />
    },
    {
      name: 'Prochaine campagne',
      value: '2j',
      change: '10 avril',
      icon: <Calendar className="w-6 h-6 text-[#951B6D]" />
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
      {stats.map((stat, statIndex) => (
        <div 
          key={statIndex} 
          className="bg-white p-6 rounded-xl border border-[#EDF3F7] shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <p className="text-[#64748B] font-semibold text-sm uppercase tracking-wide mb-3">
                {stat.name}
              </p>
              <div className="space-y-2">
                <h3 className="text-3xl font-bold text-[#141E29]">
                  {stat.value}
                </h3>
                <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#F0FDF4] text-[#16A34A] text-xs font-semibold">
                  {stat.change}
                </div>
              </div>
            </div>
            <div className="w-12 h-12 bg-[#F8E9F0] rounded-full flex items-center justify-center flex-shrink-0">
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
