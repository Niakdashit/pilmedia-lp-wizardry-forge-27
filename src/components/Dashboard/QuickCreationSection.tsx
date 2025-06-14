
import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, FolderOpen, Layers } from 'lucide-react';
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

  return <div className="w-full mt-8">
      <div className="relative border-2 border-[#ffffff] rounded-3xl p-8 bg-gradient-to-b from-[#841b60]/5 to-white overflow-hidden bg-[#ffeef6]/0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#841b60]/3 via-transparent to-transparent pointer-events-none"></div>
        
        <div className="relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2 text-[#841b60]">Qu'allez-vous créer aujourd'hui ?</h2>
          </div>

          <div className="flex justify-center mb-8">
            {/* Container pour desktop avec flex center */}
            <div className="hidden md:flex items-center justify-center space-x-8 max-w-5xl">
              {gameTypes.map((game, index) => {
              const IconComponent = getCampaignTypeIcon(game.type);
              return <Link key={game.type} to={`/quick-campaign?type=${game.type}`} className="flex flex-col items-center group cursor-pointer opacity-0 animate-fade-in" style={{
                animationDelay: `${index * 0.1}s`,
                animationFillMode: 'forwards'
              }}>
                    <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300 border border-gray-100">
                      <IconComponent className="w-8 h-8 text-[#841b60] group-hover:text-[#6d164f] transition-colors" />
                    </div>
                    <span className="mt-2 text-sm font-medium text-gray-700 group-hover:text-[#841b60] transition-colors text-center">
                      {game.label}
                    </span>
                  </Link>;
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
                return <Link key={game.type} to={`/quick-campaign?type=${game.type}`} className="flex flex-col items-center group cursor-pointer opacity-0 animate-fade-in flex-shrink-0" style={{
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: 'forwards'
                }}>
                      <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300 border border-gray-100">
                        <IconComponent className="w-8 h-8 text-[#841b60] group-hover:text-[#6d164f] transition-colors" />
                      </div>
                      <span className="mt-2 text-sm font-medium text-gray-700 group-hover:text-[#841b60] transition-colors text-center">
                        {game.label}
                      </span>
                    </Link>;
              })}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <Link to="/quick-campaign" className="inline-flex items-center px-8 py-4 bg-[#841b60] text-white font-semibold rounded-2xl hover:bg-[#6d164f] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              <Zap className="w-6 h-6 mr-3" />
              Création rapide de campagne
            </Link>
            
            <Link to="/campaigns" className="inline-flex items-center px-6 py-4 bg-white text-[#841b60] font-semibold rounded-2xl hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 border border-[#841b60]/20">
              <FolderOpen className="w-5 h-5 mr-2" />
              Mes campagnes
            </Link>
            
            <button className="inline-flex items-center px-6 py-4 bg-white text-[#841b60] font-semibold rounded-2xl hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 border border-[#841b60]/20">
              <Layers className="w-5 h-5 mr-2" />
              Modèles
            </button>
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
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .scrollbar-hide {
          -webkit-overflow-scrolling: touch;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>;
};

export default QuickCreationSection;
