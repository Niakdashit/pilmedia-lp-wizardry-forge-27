import React from 'react';
import { Link } from 'react-router-dom';
import { FolderOpen, Layers } from 'lucide-react';
import { getCampaignTypeIcon } from '../../utils/campaignTypes';
import { GameType } from './types';

const QuickCreationSection: React.FC = () => {
  const gameTypes: GameType[] = [
    { type: 'wheel', label: 'Roue de la fortune' },
    { type: 'quiz', label: 'Quiz' },
    { type: 'scratch', label: 'Grattage' },
    { type: 'dice', label: 'Dés' },
    { type: 'jackpot', label: 'Jackpot' },
    { type: 'memory', label: 'Memory' },
    { type: 'puzzle', label: 'Puzzle' },
    { type: 'form', label: 'Formulaire' }
  ];

  return (
    <div className="w-full mt-8">
      <div className="bg-white rounded-xl border border-[#EDF3F7] shadow-sm overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2 text-[#141E29]">
              Qu'allez-vous 
              <span className="text-[#951B6D] relative">
                {' '}créer
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#951B6D] opacity-40"></div>
              </span>
              {' '}aujourd'hui ?
            </h2>
          </div>

          <div className="flex justify-center mb-8">
            {/* Desktop layout */}
            <div className="hidden md:flex items-center justify-center space-x-6 max-w-5xl">
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
                    <div className="w-16 h-16 bg-[#F8FAFC] border border-[#EDF3F7] rounded-xl shadow-sm flex items-center justify-center group-hover:shadow-md transform group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-300">
                      <IconComponent className="w-8 h-8 text-[#951B6D] group-hover:text-[#A020F0] transition-colors" />
                    </div>
                    <span className="mt-3 text-sm font-semibold text-[#64748B] group-hover:text-[#951B6D] transition-colors text-center">
                      {game.label}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Mobile layout */}
            <div className="md:hidden w-full">
              <div className="flex space-x-4 overflow-x-auto pb-4 px-2 scrollbar-hide">
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
                      <div className="w-16 h-16 bg-[#F8FAFC] border border-[#EDF3F7] rounded-xl shadow-sm flex items-center justify-center group-hover:shadow-md transform group-hover:scale-105 transition-all duration-300">
                        <IconComponent className="w-8 h-8 text-[#951B6D] transition-colors" />
                      </div>
                      <span className="mt-3 text-sm font-semibold text-[#64748B] transition-colors text-center">
                        {game.label}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <Link 
              to="/campaigns" 
              className="inline-flex items-center px-6 py-3 bg-[#951B6D] text-white font-bold rounded-xl hover:bg-[#A020F0] transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
            >
              <FolderOpen className="w-5 h-5 mr-2" />
              Mes campagnes
            </Link>
            
            <button className="inline-flex items-center px-6 py-3 bg-[#F3F6F9] text-[#64748B] font-bold rounded-xl hover:bg-[#EDF3F7] hover:text-[#951B6D] transition-all duration-300 shadow-sm hover:shadow-md">
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
    </div>
  );
};

export default QuickCreationSection;
