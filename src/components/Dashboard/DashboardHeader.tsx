
import React from 'react';
import { Link } from 'react-router-dom';
import { getCampaignTypeIcon } from '../../utils/campaignTypes';
import { User, Sparkles } from 'lucide-react';

const DashboardHeader: React.FC = () => {
  const gameShortcuts = [
    { type: 'wheel', label: 'Roue' },
    { type: 'quiz', label: 'Quiz' },
    { type: 'scratch', label: 'Grattage' },
    { type: 'dice', label: 'Dés' },
    { type: 'jackpot', label: 'Jackpot' },
    { type: 'memory', label: 'Memory' }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Glassmorphic Header Container */}
      <div className="relative bg-gradient-to-br from-purple-600/20 via-blue-500/15 to-indigo-600/20 backdrop-blur-xl border-b border-white/10 rounded-b-3xl shadow-2xl shadow-purple-500/10">
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Abstract Geometric Patterns */}
          <div className="absolute top-10 right-20 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full blur-xl"></div>
          <div className="absolute top-5 right-40 w-24 h-24 bg-gradient-to-br from-blue-400/15 to-indigo-400/15 rounded-full blur-lg"></div>
          <div className="absolute -top-5 right-10 w-20 h-20 bg-gradient-to-br from-purple-300/25 to-pink-300/25 rounded-full blur-md"></div>
          
          {/* Editorial Abstract Illustration */}
          <div className="absolute top-0 right-0 w-96 h-full opacity-30">
            <svg viewBox="0 0 400 200" className="w-full h-full">
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.3"/>
                  <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.2"/>
                  <stop offset="100%" stopColor="#6366F1" stopOpacity="0.1"/>
                </linearGradient>
              </defs>
              <path d="M300,20 Q350,60 320,100 T280,140 Q320,160 360,120 T400,80 L400,0 Z" fill="url(#grad1)"/>
              <circle cx="350" cy="40" r="15" fill="#8B5CF6" fillOpacity="0.2"/>
              <circle cx="320" cy="80" r="8" fill="#3B82F6" fillOpacity="0.3"/>
              <path d="M280,120 Q300,100 320,120 T360,140" stroke="#6366F1" strokeWidth="2" strokeOpacity="0.4" fill="none"/>
            </svg>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 px-8 py-12">
          <div className="max-w-7xl mx-auto">
            {/* Top Bar with User Profile */}
            <div className="flex justify-between items-start mb-8">
              <div className="flex-1">
                {/* Welcome Message */}
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold text-white drop-shadow-lg">
                    Bienvenue Jonathan 👋
                  </h1>
                  <p className="text-xl text-white/80 font-medium">
                    Prêt à lancer une nouvelle campagne ?
                  </p>
                </div>
              </div>

              {/* User Profile */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-full border border-white/20 flex items-center justify-center shadow-lg">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white shadow-sm"></div>
                </div>
              </div>
            </div>

            {/* Game Shortcuts */}
            <div className="flex flex-wrap gap-4 mb-8">
              {gameShortcuts.map((game, index) => {
                const IconComponent = getCampaignTypeIcon(game.type);
                return (
                  <Link
                    key={game.type}
                    to={`/quick-campaign?type=${game.type}`}
                    className="group relative"
                    style={{
                      animationDelay: `${index * 0.1}s`
                    }}
                  >
                    {/* Glassy Icon Bubble */}
                    <div className="relative overflow-hidden">
                      {/* Main Bubble */}
                      <div className="w-16 h-16 bg-gradient-to-br from-white/25 to-white/10 backdrop-blur-sm rounded-2xl border border-white/20 flex items-center justify-center shadow-xl shadow-purple-500/10 transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-purple-500/20 group-hover:bg-gradient-to-br group-hover:from-white/35 group-hover:to-white/15">
                        <IconComponent className="w-7 h-7 text-white transition-transform duration-300 group-hover:scale-110" />
                      </div>
                      
                      {/* Floating Particles on Hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute top-1 left-3 w-1 h-1 bg-white/60 rounded-full animate-ping" style={{animationDelay: '0s'}}></div>
                        <div className="absolute top-3 right-2 w-1 h-1 bg-purple-300/60 rounded-full animate-ping" style={{animationDelay: '0.3s'}}></div>
                        <div className="absolute bottom-2 left-2 w-1 h-1 bg-blue-300/60 rounded-full animate-ping" style={{animationDelay: '0.6s'}}></div>
                      </div>

                      {/* Glow Effect */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-400/0 to-blue-400/0 group-hover:from-purple-400/20 group-hover:to-blue-400/20 transition-all duration-300 blur-sm"></div>
                    </div>

                    {/* Label */}
                    <div className="mt-2 text-center">
                      <span className="text-sm font-medium text-white/90 group-hover:text-white transition-colors duration-300">
                        {game.label}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Main Actions */}
            <div className="flex flex-wrap gap-4">
              <Link
                to="/campaigns"
                className="group relative overflow-hidden px-6 py-3 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm text-white font-semibold rounded-2xl border border-white/20 shadow-xl shadow-purple-500/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 hover:bg-gradient-to-r hover:from-white/30 hover:to-white/15"
              >
                <span className="relative z-10 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 transition-transform group-hover:rotate-12" />
                  Mes campagnes
                </span>
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </Link>

              <button className="group relative overflow-hidden px-6 py-3 bg-gradient-to-r from-purple-500/80 to-blue-500/80 backdrop-blur-sm text-white font-semibold rounded-2xl border border-white/20 shadow-xl shadow-purple-500/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 hover:bg-gradient-to-r hover:from-purple-500/90 hover:to-blue-500/90">
                <span className="relative z-10 flex items-center">
                  Créer maintenant
                </span>
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Gradient Border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
        
        .animate-sparkle {
          animation: sparkle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default DashboardHeader;
