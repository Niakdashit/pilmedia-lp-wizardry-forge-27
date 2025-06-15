
import React from 'react';

const DashboardHeader: React.FC = () => {
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
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#6366F1" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              <path d="M300,20 Q350,60 320,100 T280,140 Q320,160 360,120 T400,80 L400,0 Z" fill="url(#grad1)" />
              <circle cx="350" cy="40" r="15" fill="#8B5CF6" fillOpacity="0.3" />
              <circle cx="320" cy="80" r="8" fill="#3B82F6" fillOpacity="0.4" />
              <path d="M280,120 Q300,100 320,120 T360,140" stroke="#6366F1" strokeWidth="2" strokeOpacity="0.5" fill="none" />
            </svg>
          </div>
        </div>

        {/* Main Content with Enhanced Z-index */}
        <div className="relative z-20 px-6 py-12 md:py-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              {/* Left Content */}
              <div className="text-center lg:text-left mb-8 lg:mb-0 max-w-2xl">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                  Bienvenue sur{' '}
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                    Leadya
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-white/90 mb-6 leading-relaxed">
                  Créez des campagnes engageantes qui convertissent vos visiteurs en clients fidèles
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <button className="px-8 py-4 bg-gradient-to-r from-[#841b60] to-[#6d164f] text-white font-semibold rounded-2xl hover:shadow-xl hover:shadow-[#841b60]/25 transition-all duration-300 transform hover:-translate-y-1">
                    Créer une campagne
                  </button>
                  <button className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-2xl border border-white/30 hover:bg-white/30 transition-all duration-300">
                    Voir le guide
                  </button>
                </div>
              </div>

              {/* Right Illustration - Hidden on small screens */}
              <div className="hidden lg:block relative animate-float">
                <div className="w-80 h-80 relative">
                  {/* Floating Cards Animation */}
                  <div className="absolute top-0 right-0 w-32 h-20 bg-white/95 rounded-xl shadow-2xl p-4 animate-float" style={{ animationDelay: '0s' }}>
                    <div className="h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded mb-2"></div>
                    <div className="h-1 bg-gray-200 rounded mb-1"></div>
                    <div className="h-1 bg-gray-200 rounded w-3/4"></div>
                  </div>
                  <div className="absolute top-16 left-8 w-28 h-16 bg-white/95 rounded-xl shadow-2xl p-3 animate-float" style={{ animationDelay: '0.5s' }}>
                    <div className="h-1.5 bg-gradient-to-r from-green-400 to-emerald-400 rounded mb-2"></div>
                    <div className="h-1 bg-gray-200 rounded mb-1"></div>
                    <div className="h-1 bg-gray-200 rounded w-2/3"></div>
                  </div>
                  <div className="absolute bottom-8 right-4 w-36 h-24 bg-white/95 rounded-xl shadow-2xl p-4 animate-float" style={{ animationDelay: '1s' }}>
                    <div className="h-2 bg-gradient-to-r from-orange-400 to-red-400 rounded mb-2"></div>
                    <div className="h-1 bg-gray-200 rounded mb-1"></div>
                    <div className="h-1 bg-gray-200 rounded w-4/5"></div>
                  </div>
                  
                  {/* Sparkle Effects */}
                  <div className="absolute top-4 left-4 w-2 h-2 bg-yellow-300 rounded-full animate-sparkle" style={{ animationDelay: '0.2s' }}></div>
                  <div className="absolute bottom-4 left-8 w-1.5 h-1.5 bg-blue-300 rounded-full animate-sparkle" style={{ animationDelay: '0.8s' }}></div>
                  <div className="absolute top-1/2 right-8 w-1 h-1 bg-purple-300 rounded-full animate-sparkle" style={{ animationDelay: '1.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Bottom Gradient Border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
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
