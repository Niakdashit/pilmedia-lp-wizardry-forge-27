
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
          cardGlow: 'hover:shadow-[0_0_40px_rgba(139,69,244,0.15)]',
          border: 'border-violet-500/20 hover:border-violet-400/40',
          iconBg: 'bg-gradient-to-br from-violet-500/20 to-purple-600/30',
          iconGlow: 'shadow-[0_0_20px_rgba(139,69,244,0.3)]',
          iconColor: 'text-violet-300',
          valueColor: 'text-white'
        };
      case 'growth':
        return {
          cardGlow: 'hover:shadow-[0_0_40px_rgba(34,197,94,0.15)]',
          border: 'border-emerald-500/20 hover:border-emerald-400/40',
          iconBg: 'bg-gradient-to-br from-emerald-500/20 to-green-600/30',
          iconGlow: 'shadow-[0_0_20px_rgba(34,197,94,0.3)]',
          iconColor: 'text-emerald-300',
          valueColor: 'text-white'
        };
      case 'analytics':
        return {
          cardGlow: 'hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]',
          border: 'border-blue-500/20 hover:border-blue-400/40',
          iconBg: 'bg-gradient-to-br from-blue-500/20 to-cyan-600/30',
          iconGlow: 'shadow-[0_0_20px_rgba(59,130,246,0.3)]',
          iconColor: 'text-blue-300',
          valueColor: 'text-white'
        };
      case 'schedule':
        return {
          cardGlow: 'hover:shadow-[0_0_40px_rgba(249,115,22,0.15)]',
          border: 'border-orange-500/20 hover:border-orange-400/40',
          iconBg: 'bg-gradient-to-br from-orange-500/20 to-amber-600/30',
          iconGlow: 'shadow-[0_0_20px_rgba(249,115,22,0.3)]',
          iconColor: 'text-orange-300',
          valueColor: 'text-white'
        };
      default:
        return {
          cardGlow: 'hover:shadow-[0_0_40px_rgba(132,27,96,0.15)]',
          border: 'border-pink-500/20 hover:border-pink-400/40',
          iconBg: 'bg-gradient-to-br from-pink-500/20 to-rose-600/30',
          iconGlow: 'shadow-[0_0_20px_rgba(132,27,96,0.3)]',
          iconColor: 'text-pink-300',
          valueColor: 'text-white'
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
        return 'bg-emerald-500/90 text-white border-emerald-300/50';
      case 'down':
        return 'bg-rose-500/90 text-white border-rose-300/50';
      default:
        return 'bg-blue-500/90 text-white border-blue-300/50';
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
            className={`group relative overflow-hidden rounded-3xl backdrop-blur-xl bg-gradient-to-br from-white/10 via-white/5 to-transparent border ${styles.border} ${styles.cardGlow} transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02] cursor-pointer opacity-0 animate-fade-in`}
            style={{
              animationDelay: `${statIndex * 0.15}s`,
              animationFillMode: 'forwards'
            }}
            onClick={() => {
              // Ripple effect on click
              const card = document.getElementById(`stat-card-${statIndex}`);
              if (card) {
                card.style.transform = 'scale(0.98)';
                setTimeout(() => {
                  card.style.transform = '';
                }, 150);
              }
            }}
          >
            {/* Glass reflection overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Neon border glow animation */}
            <div className="absolute inset-0 rounded-3xl border border-white/10 group-hover:border-white/20 transition-all duration-500"></div>
            
            {/* Card content */}
            <div id={`stat-card-${statIndex}`} className="relative p-8 transition-transform duration-150">
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <p className="text-white/70 font-semibold text-xs uppercase tracking-wider mb-3 group-hover:text-white/90 transition-colors duration-300">
                    {stat.name}
                  </p>
                  <div className="flex items-baseline space-x-3 mb-4">
                    <h3 className={`text-4xl font-black ${styles.valueColor} group-hover:text-white transition-colors duration-300 counter-animation`}>
                      {stat.value}
                    </h3>
                    {trendIcon && stat.trend === 'up' && (
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold border backdrop-blur-sm ${trendColor} group-hover:scale-110 transition-all duration-300`}>
                        {trendIcon}
                      </div>
                    )}
                  </div>
                  
                  {/* Change/Delta Badge */}
                  <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold border backdrop-blur-sm ${trendColor} group-hover:scale-105 group-hover:shadow-lg transition-all duration-300`}>
                    {trendIcon && <span className="mr-1">{trendIcon}</span>}
                    <span className="relative z-10">{stat.change}</span>
                    {/* Badge glow effect */}
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                  </div>
                </div>
                
                {/* Icon with glowing badge */}
                <div className="relative ml-4">
                  <div className={`w-16 h-16 ${styles.iconBg} backdrop-blur-sm rounded-full flex items-center justify-center ${styles.iconGlow} group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 border border-white/20`}>
                    <div className={`${styles.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                      {React.cloneElement(stat.icon, { 
                        className: "w-7 h-7 group-hover:animate-pulse" 
                      })}
                    </div>
                    
                    {/* Icon background glow animation */}
                    <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                  </div>
                  
                  {/* Floating particles around icon */}
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-white/60 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-500"></div>
                  <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-white/40 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-700" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>

            {/* Animated light streak */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              <div className="absolute -top-full -left-full w-full h-full bg-gradient-to-br from-transparent via-white/15 to-transparent transform rotate-45 group-hover:top-full group-hover:left-full transition-all duration-1000 ease-out"></div>
            </div>

            {/* Ultra-soft drop shadow (handled by parent hover state) */}
            <div className="absolute inset-0 rounded-3xl shadow-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
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

        .counter-animation {
          background: linear-gradient(135deg, currentColor 0%, currentColor 70%, rgba(255,255,255,0.9) 100%);
          background-clip: text;
          -webkit-background-clip: text;
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
