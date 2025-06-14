
import React from 'react';
import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';
import { GameType } from './types';

// Custom vector icons for each game type
const CustomGameIcons = {
  wheel: ({ className }: { className: string }) => (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2"/>
      <path d="M16 2 L18.5 8 L16 9 L13.5 8 Z" fill="currentColor"/>
      <path d="M30 16 L24 18.5 L23 16 L24 13.5 Z" fill="currentColor"/>
      <path d="M16 30 L13.5 24 L16 23 L18.5 24 Z" fill="currentColor"/>
      <path d="M2 16 L8 13.5 L9 16 L8 18.5 Z" fill="currentColor"/>
      <line x1="16" y1="2" x2="16" y2="30" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
      <line x1="2" y1="16" x2="30" y2="16" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
      <circle cx="16" cy="16" r="3" fill="currentColor"/>
    </svg>
  ),
  quiz: ({ className }: { className: string }) => (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="6" width="24" height="20" rx="3" stroke="currentColor" strokeWidth="2"/>
      <path d="M10 12 L14 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M10 16 L22 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M10 20 L18 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="22" cy="12" r="2" fill="currentColor"/>
      <path d="M20 2 L24 6 L20 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  scratch: ({ className }: { className: string }) => (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="6" width="24" height="20" rx="2" stroke="currentColor" strokeWidth="2"/>
      <path d="M8 10 L24 10 L24 22 L8 22 Z" fill="currentColor" opacity="0.1"/>
      <path d="M12 14 Q16 12 20 14 Q16 16 12 14" fill="currentColor"/>
      <circle cx="14" cy="18" r="1.5" fill="currentColor"/>
      <circle cx="18" cy="18" r="1.5" fill="currentColor"/>
      <path d="M2 2 L8 8 M6 2 L12 8 M10 2 L16 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
    </svg>
  ),
  dice: ({ className }: { className: string }) => (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 8 L14 4 L26 8 L26 20 L18 24 L6 20 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M6 8 L18 12 L26 8" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M18 12 L18 24" stroke="currentColor" strokeWidth="2"/>
      <circle cx="11" cy="11" r="1.5" fill="currentColor"/>
      <circle cx="21" cy="11" r="1.5" fill="currentColor"/>
      <circle cx="11" cy="17" r="1.5" fill="currentColor"/>
      <circle cx="21" cy="17" r="1.5" fill="currentColor"/>
      <circle cx="21" cy="14" r="1.5" fill="currentColor"/>
    </svg>
  ),
  jackpot: ({ className }: { className: string }) => (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="8" width="24" height="16" rx="4" stroke="currentColor" strokeWidth="2"/>
      <rect x="7" y="11" width="5" height="10" rx="1" fill="currentColor" opacity="0.2"/>
      <rect x="13.5" y="11" width="5" height="10" rx="1" fill="currentColor" opacity="0.2"/>
      <rect x="20" y="11" width="5" height="10" rx="1" fill="currentColor" opacity="0.2"/>
      <circle cx="9.5" cy="16" r="2" fill="currentColor"/>
      <circle cx="16" cy="16" r="2" fill="currentColor"/>
      <circle cx="22.5" cy="16" r="2" fill="currentColor"/>
      <path d="M12 4 L16 1 L20 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="6" cy="6" r="1" fill="currentColor"/>
      <circle cx="26" cy="6" r="1" fill="currentColor"/>
    </svg>
  ),
  memory: ({ className }: { className: string }) => (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="6" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="2"/>
      <rect x="13" y="6" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="2"/>
      <rect x="3" y="16" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="2"/>
      <rect x="13" y="16" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="2"/>
      <circle cx="7" cy="10" r="2" fill="currentColor"/>
      <circle cx="17" cy="20" r="2" fill="currentColor"/>
      <path d="M25 8 L29 4 M25 4 L29 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M25 20 L29 24 M25 24 L29 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  puzzle: ({ className }: { className: string }) => (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 6 L14 6 Q16 4 18 6 L26 6 L26 14 Q28 16 26 18 L26 26 L18 26 Q16 28 14 26 L6 26 L6 18 Q4 16 6 14 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M6 16 L14 16 L14 6" stroke="currentColor" strokeWidth="2"/>
      <path d="M18 6 L18 16 L26 16" stroke="currentColor" strokeWidth="2"/>
      <circle cx="16" cy="4" r="2" fill="currentColor"/>
      <circle cx="28" cy="16" r="2" fill="currentColor"/>
      <circle cx="16" cy="28" r="2" fill="currentColor"/>
      <circle cx="4" cy="16" r="2" fill="currentColor"/>
    </svg>
  ),
  form: ({ className }: { className: string }) => (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="24" height="24" rx="3" stroke="currentColor" strokeWidth="2"/>
      <path d="M8 12 L24 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M8 16 L20 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M8 20 L16 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
      <path d="M12 8 L24 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <rect x="20" y="18" width="6" height="4" rx="1" fill="currentColor" opacity="0.3"/>
    </svg>
  )
};

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
                const IconComponent = CustomGameIcons[game.type];
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
                    <div className="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300 border border-gray-100 relative overflow-hidden">
                      {/* Micro-animation background glow */}
                      <div className="absolute inset-0 bg-gradient-to-r from-[#841b60]/0 via-[#841b60]/10 to-[#841b60]/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                      <IconComponent className="w-8 h-8 text-[#841b60] group-hover:text-[#6d164f] transition-all duration-300 relative z-10 group-hover:drop-shadow-sm" />
                    </div>
                    <span className="mt-3 text-base font-bold text-gray-700 group-hover:text-[#841b60] transition-colors text-center max-w-[120px] leading-tight">
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
                  const IconComponent = CustomGameIcons[game.type];
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
                      <div className="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300 border border-gray-100 relative overflow-hidden">
                        {/* Micro-animation background glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#841b60]/0 via-[#841b60]/10 to-[#841b60]/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                        <IconComponent className="w-8 h-8 text-[#841b60] group-hover:text-[#6d164f] transition-all duration-300 relative z-10 group-hover:drop-shadow-sm" />
                      </div>
                      <span className="mt-3 text-base font-bold text-gray-700 group-hover:text-[#841b60] transition-colors text-center max-w-[120px] leading-tight">
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
