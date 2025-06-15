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
      {/* Enhanced Glassmorphic Header Container */}
      <div className="relative bg-gradient-to-br from-purple-600/40 via-blue-500/35 to-indigo-600/40 backdrop-blur-2xl border-b border-white/25 rounded-b-3xl shadow-2xl shadow-purple-500/20">
        
        {/* Dark Overlay for Better Contrast */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-black/10 to-black/15 rounded-b-3xl"></div>
        
        {/* Enhanced Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Abstract Geometric Patterns with Better Opacity */}
          <div className="absolute top-10 right-20 w-32 h-32 bg-gradient-to-br from-purple-400/30 to-blue-400/30 rounded-full blur-xl"></div>
          <div className="absolute top-5 right-40 w-24 h-24 bg-gradient-to-br from-blue-400/25 to-indigo-400/25 rounded-full blur-lg"></div>
          <div className="absolute -top-5 right-10 w-20 h-20 bg-gradient-to-br from-purple-300/35 to-pink-300/35 rounded-full blur-md"></div>
          
          {/* Enhanced Editorial Abstract Illustration */}
          <div className="absolute top-0 right-0 w-96 h-full opacity-40">
            <svg viewBox="0 0 400 200" className="w-full h-full">
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.4"/>
                  <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.3"/>
                  <stop offset="100%" stopColor="#6366F1" stopOpacity="0.2"/>
                </linearGradient>
              </defs>
              <path d="M300,20 Q350,60 320,100 T280,140 Q320,160 360,120 T400,80 L400,0 Z" fill="url(#grad1)"/>
              <circle cx="350" cy="40" r="15" fill="#8B5CF6" fillOpacity="0.3"/>
              <circle cx="320" cy="80" r="8" fill="#3B82F6" fillOpacity="0.4"/>
              <path d="M280,120 Q300,100 320,120 T360,140" stroke="#6366F1" strokeWidth="2" strokeOpacity="0.5" fill="none"/>
            </svg>
          </div>
        </div>

        {/* Main Content with Enhanced Z-index */}
        <div className="relative z-20 px-8 py-12">
          <div className="max-w-7xl mx-auto">
            {/* Top Bar with User Profile - Centered */}
            <div className="flex justify-center items-center mb-8">
              {/* Enhanced User Profile - Positioned at top right */}
              <div className="absolute top-0 right-0 flex items-center space-x-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-white/30 to-white/20 backdrop-blur-sm rounded-full border border-white/30 flex items-center justify-center shadow-xl shadow-purple-500/20">
                    <User className="w-6 h-6 text-white drop-shadow-sm" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white shadow-lg"></div>
                </div>
              </div>

              {/* Enhanced Welcome Message - Centered */}
              <div className="text-center">
                <h1 className="text-4xl font-bold text-white drop-shadow-xl mb-2 filter brightness-110">
                  Bienvenue Jonathan 👋
                </h1>
                <p className="text-xl text-white/90 font-medium drop-shadow-lg">
                  Prêt à lancer une nouvelle campagne ?
                </p>
              </div>
            </div>

            {/* Enhanced Game Shortcuts - Centered */}
            <div className="flex justify-center mb-8">
              <div className="flex flex-wrap gap-4 justify-center">
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
                      {/* Enhanced Glassy Icon Bubble */}
                      <div className="relative overflow-hidden">
                        {/* Main Bubble with Better Contrast */}
                        <div className="w-16 h-16 bg-gradient-to-br from-white/35 to-white/20 backdrop-blur-md rounded-2xl border border-white/30 flex items-center justify-center shadow-2xl shadow-purple-500/15 transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-purple-500/25 group-hover:bg-gradient-to-br group-hover:from-white/45 group-hover:to-white/25">
                          <IconComponent className="w-7 h-7 text-white drop-shadow-md transition-transform duration-300 group-hover:scale-110" />
                        </div>
                        
                        {/* Enhanced Floating Particles on Hover */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="absolute top-1 left-3 w-1 h-1 bg-white/80 rounded-full animate-ping" style={{animationDelay: '0s'}}></div>
                          <div className="absolute top-3 right-2 w-1 h-1 bg-purple-300/80 rounded-full animate-ping" style={{animationDelay: '0.3s'}}></div>
                          <div className="absolute bottom-2 left-2 w-1 h-1 bg-blue-300/80 rounded-full animate-ping" style={{animationDelay: '0.6s'}}></div>
                        </div>

                        {/* Enhanced Glow Effect */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-400/0 to-blue-400/0 group-hover:from-purple-400/30 group-hover:to-blue-400/30 transition-all duration-300 blur-sm"></div>
                      </div>

                      {/* Enhanced Label */}
                      <div className="mt-2 text-center">
                        <span className="text-sm font-medium text-white drop-shadow-md group-hover:text-white transition-colors duration-300">
                          {game.label}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Enhanced Main Actions - Centered */}
            <div className="flex justify-center">
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/campaigns"
                  className="group relative overflow-hidden px-6 py-3 bg-gradient-to-r from-white/30 to-white/20 backdrop-blur-md text-white font-semibold rounded-2xl border border-white/30 shadow-2xl shadow-purple-500/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 hover:bg-gradient-to-r hover:from-white/40 hover:to-white/25"
                >
                  <span className="relative z-10 flex items-center drop-shadow-md">
                    <Sparkles className="w-5 h-5 mr-2 transition-transform group-hover:rotate-12" />
                    Mes campagnes
                  </span>
                  {/* Enhanced Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </Link>

                <button className="group relative overflow-hidden px-6 py-3 bg-gradient-to-r from-purple-600/90 to-blue-600/90 backdrop-blur-md text-white font-semibold rounded-2xl border border-white/30 shadow-2xl shadow-purple-500/25 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/35 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600">
                  <span className="relative z-10 flex items-center drop-shadow-md">
                    Créer maintenant
                  </span>
                  {/* Enhanced Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Bottom Gradient Border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      </div>

      {/* Keep existing styles */}
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
