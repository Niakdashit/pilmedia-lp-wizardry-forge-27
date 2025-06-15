
import React from 'react';
import { Users, Target, BarChart, Calendar, TrendingUp, Zap } from 'lucide-react';
import { DashboardStat } from './types';

const StatsGrid: React.FC = () => {
  const stats: DashboardStat[] = [
    {
      name: 'Campagnes actives',
      value: '12',
      change: '+3 cette semaine',
      icon: <Target className="w-6 h-6" />
    },
    {
      name: 'Participations',
      value: '2.4K',
      change: '+24% ce mois',
      icon: <Users className="w-6 h-6" />
    },
    {
      name: 'Taux de conversion',
      value: '68%',
      change: '+12% ce mois',
      icon: <BarChart className="w-6 h-6" />
    },
    {
      name: 'Revenus générés',
      value: '€45K',
      change: '+8% ce mois',
      icon: <TrendingUp className="w-6 h-6" />
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, statIndex) => (
        <div 
          key={statIndex} 
          className="group relative overflow-hidden rounded-2xl bg-white/60 backdrop-blur-xl border border-white/20 p-6 hover:bg-white/80 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1"
          style={{
            animationDelay: `${statIndex * 0.1}s`,
            animationFillMode: 'forwards'
          }}
        >
          {/* Glass morphism effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Subtle glow on hover */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 text-purple-600 group-hover:scale-110 transition-transform duration-200">
                {stat.icon}
              </div>
              <Zap className="w-4 h-4 text-purple-400 opacity-0 group-hover:opacity-100 transition-all duration-200 transform group-hover:rotate-12" />
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-1 group-hover:text-purple-700 transition-colors duration-200">
                {stat.value}
              </h3>
              <p className="text-sm font-medium text-gray-600 mb-2">
                {stat.name}
              </p>
              <p className="text-xs text-green-600 font-semibold bg-green-50/80 px-2 py-1 rounded-full inline-block">
                {stat.change}
              </p>
            </div>
          </div>

          {/* Animated border glow */}
          <div className="absolute inset-0 rounded-2xl border border-transparent bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20 bg-clip-border opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
