
import React from 'react';
import { Target, Users, BarChart, Calendar, TrendingUp } from 'lucide-react';
import { DashboardStat } from './types';

const StatsGrid: React.FC = () => {
  const stats: DashboardStat[] = [
    {
      name: 'CAMPAGNES ACTIVES',
      value: '5',
      change: '+2 cette semaine',
      icon: <Target className="w-6 h-6" />,
      category: 'campaigns',
      trend: 'up'
    },
    {
      name: 'PARTICIPATIONS',
      value: '1254',
      change: '+18% ce mois',
      icon: <Users className="w-6 h-6" />,
      category: 'growth',
      trend: 'up'
    },
    {
      name: 'TAUX DE CONVERSION',
      value: '42%',
      change: '+5% ce mois',
      icon: <BarChart className="w-6 h-6" />,
      category: 'analytics',
      trend: 'up'
    },
    {
      name: 'PROCHAINE CAMPAGNE',
      value: '2j',
      change: '10 avril',
      icon: <Calendar className="w-6 h-6" />,
      category: 'schedule',
      trend: 'neutral'
    }
  ];

  const getCategoryStyles = (category: string) => {
    switch (category) {
      case 'campaigns':
        return {
          cardGlow: 'hover:shadow-[0_0_60px_rgba(139,69,244,0.25)]',
          cardBg: 'bg-gradient-to-br from-violet-900/85 via-purple-900/80 to-violet-800/85',
          border: 'border-violet-400/30 hover:border-violet-300/60',
          iconBg: 'bg-gradient-to-br from-violet-500/30 to-purple-600/40',
          iconGlow: 'shadow-[0_0_25px_rgba(139,69,244,0.4)]',
          iconColor: 'text-violet-200',
          valueColor: 'text-white',
          reflectionBg: 'from-violet-400/20'
        };
      case 'growth':
        return {
          cardGlow: 'hover:shadow-[0_0_60px_rgba(34,197,94,0.25)]',
          cardBg: 'bg-gradient-to-br from-emerald-900/85 via-green-900/80 to-emerald-800/85',
          border: 'border-emerald-400/30 hover:border-emerald-300/60',
          iconBg: 'bg-gradient-to-br from-emerald-500/30 to-green-600/40',
          iconGlow: 'shadow-[0_0_25px_rgba(34,197,94,0.4)]',
          iconColor: 'text-emerald-200',
          valueColor: 'text-white',
          reflectionBg: 'from-emerald-400/20'
        };
      case 'analytics':
        return {
          cardGlow: 'hover:shadow-[0_0_60px_rgba(59,130,246,0.25)]',
          cardBg: 'bg-gradient-to-br from-blue-900/85 via-cyan-900/80 to-blue-800/85',
          border: 'border-blue-400/30 hover:border-blue-300/60',
          iconBg: 'bg-gradient-to-br from-blue-500/30 to-cyan-600/40',
          iconGlow: 'shadow-[0_0_25px_rgba(59,130,246,0.4)]',
          iconColor: 'text-blue-200',
          valueColor: 'text-white',
          reflectionBg: 'from-blue-400/20'
        };
      case 'schedule':
        return {
          cardGlow: 'hover:shadow-[0_0_60px_rgba(249,115,22,0.25)]',
          cardBg: 'bg-gradient-to-br from-orange-900/85 via-amber-900/80 to-orange-800/85',
          border: 'border-orange-400/30 hover:border-orange-300/60',
          iconBg: 'bg-gradient-to-br from-orange-500/30 to-amber-600/40',
          iconGlow: 'shadow-[0_0_25px_rgba(249,115,22,0.4)]',
          iconColor: 'text-orange-200',
          valueColor: 'text-white',
          reflectionBg: 'from-orange-400/20'
        };
      default:
        return {
          cardGlow: 'hover:shadow-[0_0_60px_rgba(132,27,96,0.25)]',
          cardBg: 'bg-gradient-to-br from-pink-900/85 via-rose-900/80 to-pink-800/85',
          border: 'border-pink-400/30 hover:border-pink-300/60',
          iconBg: 'bg-gradient-to-br from-pink-500/30 to-rose-600/40',
          iconGlow: 'shadow-[0_0_25px_rgba(132,27,96,0.4)]',
          iconColor: 'text-pink-200',
          valueColor: 'text-white',
          reflectionBg: 'from-pink-400/20'
        };
    }
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') {
      return <TrendingUp className="w-3 h-3" />;
    }
    return null;
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'bg-emerald-500/95 text-white border-emerald-300/60 shadow-[0_0_12px_rgba(34,197,94,0.3)]';
      case 'down':
        return 'bg-rose-500/95 text-white border-rose-300/60 shadow-[0_0_12px_rgba(244,63,94,0.3)]';
      default:
        return 'bg-blue-500/95 text-white border-blue-300/60 shadow-[0_0_12px_rgba(59,130,246,0.3)]';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8 px-2">
      {stats.map((stat, statIndex) => {
        const styles = getCategoryStyles(stat.category);
        const trendIcon = getTrendIcon(stat.trend);
        const trendColor = getTrendColor(stat.trend);
        
        return (
          <div 
            key={statIndex} 
            className={`group relative overflow-hidden rounded-3xl backdrop-blur-xl ${styles.cardBg} border-2 ${styles.border} ${styles.cardGlow} transition-all duration-500 transform hover:-translate-y-3 hover:scale-[1.03] cursor-pointer opacity-0 animate-fade-in`}
            style={{
              animationDelay: `${statIndex * 0.15}s`,
              animationFillMode: 'forwards'
            }}
            onClick={() => {
              // Ripple effect on click
              const card = document.getElementById(`stat-card-${statIndex}`);
              if (card) {
                card.style.transform = 'scale(0.97)';
                setTimeout(() => {
                  card.style.transform = '';
                }, 150);
              }
            }}
          >
            {/* Enhanced glass reflection overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${styles.reflectionBg} via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
            
            {/* Enhanced border glow animation */}
            <div className="absolute inset-0 rounded-3xl border-2 border-white/20 group-hover:border-white/40 transition-all duration-500"></div>
            
            {/* Card content */}
            <div id={`stat-card-${statIndex}`} className="relative p-8 transition-transform duration-150">
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <p className="text-white/90 font-bold text-xs uppercase tracking-widest mb-4 group-hover:text-white transition-colors duration-300">
                    {stat.name}
                  </p>
                  <div className="flex items-baseline space-x-3 mb-5">
                    <h3 className={`text-5xl font-black ${styles.valueColor} group-hover:text-white transition-colors duration-300 tracking-tight`}>
                      {stat.value}
                    </h3>
                    {trendIcon && stat.trend === 'up' && (
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold border backdrop-blur-sm ${trendColor} group-hover:scale-110 transition-all duration-300`}>
                        {trendIcon}
                      </div>
                    )}
                  </div>
                  
                  {/* Enhanced Change/Delta Badge */}
                  <div className={`inline-flex items-center px-4 py-2 rounded-full text-xs font-bold border backdrop-blur-sm ${trendColor} group-hover:scale-105 group-hover:shadow-lg transition-all duration-300`}>
                    {trendIcon && <span className="mr-2">{trendIcon}</span>}
                    <span className="relative z-10 font-semibold">{stat.change}</span>
                    {/* Badge enhanced glow effect */}
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                  </div>
                </div>
                
                {/* Enhanced Icon with stronger glow */}
                <div className="relative ml-6">
                  <div className={`w-18 h-18 ${styles.iconBg} backdrop-blur-sm rounded-full flex items-center justify-center ${styles.iconGlow} group-hover:scale-115 group-hover:rotate-12 transition-all duration-500 border-2 border-white/30 group-hover:border-white/50`}>
                    <div className={`${styles.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                      {React.isValidElement(stat.icon) ? React.cloneElement(stat.icon as React.ReactElement, { 
                        className: "w-8 h-8 group-hover:animate-pulse" 
                      }) : stat.icon}
                    </div>
                    
                    {/* Enhanced icon background glow animation */}
                    <div className="absolute inset-0 rounded-full bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                  </div>
                  
                  {/* Enhanced floating particles around icon */}
                  <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-500"></div>
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white/60 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-700" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>

            {/* Enhanced animated light streak */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              <div className={`absolute -top-full -left-full w-full h-full bg-gradient-to-br from-transparent via-white/25 to-transparent transform rotate-45 group-hover:top-full group-hover:left-full transition-all duration-1000 ease-out`}></div>
            </div>

            {/* Enhanced ultra-soft drop shadow */}
            <div className="absolute inset-0 rounded-3xl shadow-2xl opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
          </div>
        );
      })}

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        @media (max-width: 768px) {
          .grid {
            gap: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default StatsGrid;
