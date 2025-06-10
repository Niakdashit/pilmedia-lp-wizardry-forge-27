
import React from 'react';
import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';
import { getCampaignTypeIcon } from '../../utils/campaignTypes';
import { GameType } from './types';

const QuickCreationSection: React.FC = () => {
  const gameTypes: GameType[] = [{
    type: 'wheel',
    label: 'Roue de la fortune'
  }, {
    type: 'quiz',
    label: 'Quiz'
  }, {
    type: 'scratch',
    label: 'Grattage'
  }, {
    type: 'dice',
    label: 'Dés'
  }, {
    type: 'jackpot',
    label: 'Jackpot'
  }, {
    type: 'memory',
    label: 'Memory'
  }, {
    type: 'puzzle',
    label: 'Puzzle'
  }, {
    type: 'form',
    label: 'Formulaire'
  }];

  return (
    <div className="w-full mt-8">
      <div className="relative border-2 border-[#ffffff] rounded-3xl p-8 bg-gradient-to-b from-[#841b60]/5 to-white overflow-hidden bg-[#3d0020]/0">
        {/* Animation de lumière qui se déplace */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shimmer"></div>
        </div>
        
        {/* Effet de pulsation lumineuse subtile */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#841b60]/3 via-transparent to-transparent pointer-events-none animate-pulse-gentle"></div>
        
        {/* Particules de lumière flottantes */}
        <div className="absolute top-4 left-1/4 w-2 h-2 bg-white/40 rounded-full animate-float-1"></div>
        <div className="absolute top-12 right-1/3 w-1.5 h-1.5 bg-[#841b60]/30 rounded-full animate-float-2"></div>
        <div className="absolute bottom-8 left-1/3 w-1 h-1 bg-white/50 rounded-full animate-float-3"></div>
        <div className="absolute bottom-16 right-1/4 w-2.5 h-2.5 bg-[#841b60]/20 rounded-full animate-float-1"></div>
        
        <div className="relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2 text-[#841b60]">Qu'allez-vous créer aujourd'hui ?</h2>
          </div>

          <div className="flex justify-center mb-8">
            {/* Container pour desktop avec flex center */}
            <div className="hidden md:flex items-center justify-center space-x-8 max-w-5xl">
              {gameTypes.map((game, index) => {
                const IconComponent = getCampaignTypeIcon(game.type);
                return (
                  <Link 
                    key={game.type} 
                    to={`/quick-campaign?type=${game.type}`} 
                    className="flex flex-col items-center group cursor-pointer opacity-0 animate-fade-in" 
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      animationFillMode: 'forwards'
                    }}
                  >
                    <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300 border border-gray-100">
                      <IconComponent className="w-8 h-8 text-[#841b60] group-hover:text-[#6d164f] transition-colors" />
                    </div>
                    <span className="mt-2 text-sm font-medium text-gray-700 group-hover:text-[#841b60] transition-colors text-center">
                      {game.label}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Container pour mobile avec scroll horizontal */}
            <div className="md:hidden w-full">
              <div className="flex space-x-6 overflow-x-auto pb-4 px-2 scrollbar-hide" style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}>
                {gameTypes.map((game, index) => {
                  const IconComponent = getCampaignTypeIcon(game.type);
                  return (
                    <Link 
                      key={game.type} 
                      to={`/quick-campaign?type=${game.type}`} 
                      className="flex flex-col items-center group cursor-pointer opacity-0 animate-fade-in flex-shrink-0" 
                      style={{
                        animationDelay: `${index * 0.1}s`,
                        animationFillMode: 'forwards'
                      }}
                    >
                      <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300 border border-gray-100">
                        <IconComponent className="w-8 h-8 text-[#841b60] group-hover:text-[#6d164f] transition-colors" />
                      </div>
                      <span className="mt-2 text-sm font-medium text-gray-700 group-hover:text-[#841b60] transition-colors text-center">
                        {game.label}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Link to="/quick-campaign" className="inline-flex items-center px-8 py-4 bg-[#841b60] text-white font-semibold rounded-2xl hover:bg-[#6d164f] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              <Zap className="w-6 h-6 mr-3" />
              Création rapide de campagne
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(200%) skewX(-12deg);
          }
        }
        
        @keyframes pulse-gentle {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        @keyframes float-1 {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.4;
          }
          33% {
            transform: translateY(-10px) translateX(5px);
            opacity: 0.7;
          }
          66% {
            transform: translateY(-5px) translateX(-3px);
            opacity: 0.5;
          }
        }
        
        @keyframes float-2 {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-15px) translateX(-8px);
            opacity: 0.6;
          }
        }
        
        @keyframes float-3 {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.5;
          }
          25% {
            transform: translateY(-8px) translateX(3px);
            opacity: 0.8;
          }
          75% {
            transform: translateY(-12px) translateX(-5px);
            opacity: 0.3;
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
        
        .animate-pulse-gentle {
          animation: pulse-gentle 4s ease-in-out infinite;
        }
        
        .animate-float-1 {
          animation: float-1 6s ease-in-out infinite;
        }
        
        .animate-float-2 {
          animation: float-2 8s ease-in-out infinite 1s;
        }
        
        .animate-float-3 {
          animation: float-3 7s ease-in-out infinite 2s;
        }

        .scrollbar-hide {
          -webkit-overflow-scrolling: touch;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default QuickCreationSection;
