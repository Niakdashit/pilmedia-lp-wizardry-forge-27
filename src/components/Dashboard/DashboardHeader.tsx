import React from 'react';
import { Link } from 'react-router-dom';
import { getCampaignTypeIcon } from '../../utils/campaignTypes';
import { User, Sparkles } from 'lucide-react';
const DashboardHeader: React.FC = () => {
  const gameShortcuts = [{
    type: 'wheel',
    label: 'Roue'
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
  }];
  return <div className="relative overflow-hidden">
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
    </div>;
};
export default DashboardHeader;
