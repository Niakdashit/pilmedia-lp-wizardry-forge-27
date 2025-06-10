
import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Sparkles } from 'lucide-react';
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
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="glass-panel p-8 md:p-12">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-accent-500/5 pointer-events-none" />
          <div className="absolute top-4 right-4 opacity-20">
            <Sparkles className="w-8 h-8 text-primary-500" />
          </div>
          
          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-10">
              <h2 className="section-title">Qu'allez-vous créer aujourd'hui ?</h2>
              <p className="section-subtitle max-w-2xl mx-auto">
                Choisissez parmi nos modèles de jeux interactifs pour créer votre campagne en quelques minutes
              </p>
            </div>

            {/* Game Types Grid */}
            <div className="game-type-grid mb-10">
              {gameTypes.map((game, index) => {
                const IconComponent = getCampaignTypeIcon(game.type);
                return (
                  <Link
                    key={game.type}
                    to={`/quick-campaign?type=${game.type}`}
                    className="game-type-item opacity-0 animate-fade-in"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      animationFillMode: 'forwards'
                    }}
                  >
                    <div className="game-type-icon">
                      <IconComponent className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <span className="game-type-label">
                      {game.label}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* CTA Button */}
            <div className="text-center">
              <Link 
                to="/quick-campaign" 
                className="btn-primary inline-flex items-center gap-3 text-lg px-8 py-4"
              >
                <Zap className="w-6 h-6" />
                Création rapide de campagne
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default QuickCreationSection;
