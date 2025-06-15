
import React from 'react';
import { Link } from 'react-router-dom';
import { FolderOpen, Layers } from 'lucide-react';
import { getCampaignTypeIcon } from '../../utils/campaignTypes';
import { GameType } from './types';
import Button from '../common/Button';

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
    <div className="w-full">
      <div className="relative overflow-hidden rounded-3xl p-6 md:p-8 bg-gradient-to-br from-white/50 via-white/40 to-white/30 backdrop-blur-xl border border-white/40 shadow-xl shadow-purple-500/10 bg-[#428cec]/25">
        
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#841b60]/8 via-transparent to-[#841b60]/5 pointer-events-none"></div>
        
        {/* Abstract Geometric Patterns */}
        <div className="absolute top-4 right-8 w-20 h-20 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-6 left-12 w-16 h-16 bg-gradient-to-br from-blue-400/15 to-indigo-400/15 rounded-full blur-lg"></div>
        
        <div className="relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-2xl font-bold mb-2 text-[#841b60] drop-shadow-sm">
              Qu'allez-vous créer aujourd'hui ?
            </h2>
          </div>

          <div className="flex justify-center mb-8">
            {/* Desktop Layout */}
            <div className="hidden md:flex items-center justify-center space-x-6 lg:space-x-8 max-w-5xl flex-wrap gap-y-6">
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
                    <div className="w-14 h-14 lg:w-16 lg:h-16 bg-white/80 backdrop-blur-sm rounded-full shadow-xl shadow-purple-500/15 flex items-center justify-center group-hover:shadow-2xl group-hover:shadow-purple-500/25 transform group-hover:scale-110 transition-all duration-300 border border-white/50 group-hover:bg-white/90">
                      <IconComponent className="w-6 h-6 lg:w-8 lg:h-8 text-[#841b60] group-hover:text-[#6d164f] transition-colors drop-shadow-sm" />
                    </div>
                    <span className="mt-2 text-sm font-medium text-gray-700 group-hover:text-[#841b60] transition-colors text-center drop-shadow-sm max-w-20 leading-tight">
                      {game.label}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Mobile Layout with improved navigation */}
            <div className="md:hidden w-full">
              <div className="flex space-x-4 overflow-x-auto pb-4 px-2 -mx-2 scrollbar-hide">
                {gameTypes.map((game, index) => {
                  const IconComponent = getCampaignTypeIcon(game.type);
                  return (
                    <Link
                      key={game.type}
                      to={`/quick-campaign?type=${game.type}`}
                      className="flex flex-col items-center group cursor-pointer opacity-0 animate-fade-in flex-shrink-0 min-w-[72px]"
                      style={{
                        animationDelay: `${index * 0.1}s`,
                        animationFillMode: 'forwards'
                      }}
                    >
                      <div className="w-16 h-16 bg-white/80 backdrop-blur-sm rounded-full shadow-xl shadow-purple-500/15 flex items-center justify-center group-hover:shadow-2xl group-hover:shadow-purple-500/25 transform group-hover:scale-110 transition-all duration-300 border border-white/50 group-hover:bg-white/90">
                        <IconComponent className="w-8 h-8 text-[#841b60] group-hover:text-[#6d164f] transition-colors drop-shadow-sm" />
                      </div>
                      <span className="mt-2 text-xs font-medium text-gray-700 group-hover:text-[#841b60] transition-colors text-center drop-shadow-sm leading-tight">
                        {game.label}
                      </span>
                    </Link>
                  );
                })}
              </div>
              
              {/* Mobile scroll indicator */}
              <div className="flex justify-center mt-2">
                <div className="flex space-x-1">
                  {Array.from({ length: Math.ceil(gameTypes.length / 4) }).map((_, i) => (
                    <div key={i} className="w-2 h-2 rounded-full bg-white/40"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link to="/campaigns">
              <Button variant="primary" icon={FolderOpen} size="lg">
                Mes campagnes
              </Button>
            </Link>
            
            <Button variant="outline" icon={Layers} size="lg">
              Modèles
            </Button>
          </div>
        </div>

        {/* Enhanced Bottom Gradient Border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
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
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default QuickCreationSection;
