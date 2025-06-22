
import React from 'react';
import { WizardData } from '../ModernWizard';
import GameBubble from '../components/GameBubble';
import { CampaignType } from '../../../utils/campaignTypes';

interface GameSelectionStepProps {
  wizardData: WizardData;
  updateWizardData: (data: Partial<WizardData>) => void;
  nextStep: () => void;
}

const gameTypes: { type: CampaignType; name: string; description: string }[] = [
  { type: 'wheel', name: 'Roue de la Fortune', description: 'Faites tourner la roue pour gagner' },
  { type: 'quiz', name: 'Quiz Interactif', description: 'Testez vos connaissances' },
  { type: 'jackpot', name: 'Jackpot', description: 'Tentez de décrocher le jackpot' },
  { type: 'scratch', name: 'Carte à Gratter', description: 'Découvrez ce qui se cache dessous' },
  { type: 'memory', name: 'Jeu de Mémoire', description: 'Trouvez les paires correspondantes' },
  { type: 'puzzle', name: 'Puzzle', description: 'Reconstituez l\'image' },
  { type: 'dice', name: 'Dés Chanceux', description: 'Lancez les dés et tentez votre chance' },
  { type: 'form', name: 'Formulaire Dynamique', description: 'Créez des formulaires interactifs' }
];

const GameSelectionStep: React.FC<GameSelectionStepProps> = ({
  wizardData,
  updateWizardData,
  nextStep
}) => {
  const handleGameSelect = (gameType: CampaignType) => {
    updateWizardData({ selectedGame: gameType });
    setTimeout(() => {
      nextStep();
    }, 800); // Animation delay
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      {/* Hero Section */}
      <div className="text-center mb-16 max-w-4xl mx-auto">
        <div className="inline-block mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-[#841b60] to-[#6d164f] rounded-3xl flex items-center justify-center mb-6 mx-auto shadow-2xl">
            <div className="w-8 h-8 bg-white rounded-lg"></div>
          </div>
        </div>
        
        <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
          Créez votre
          <span className="bg-gradient-to-r from-[#841b60] to-[#a855f7] bg-clip-text text-transparent"> expérience </span>
          interactive
        </h1>
        
        <p className="text-xl text-gray-300 mb-12 leading-relaxed max-w-2xl mx-auto">
          Sélectionnez la mécanique de jeu qui captivera votre audience et 
          transformera vos visiteurs en participants engagés.
        </p>
      </div>

      {/* Game Selection Dock */}
      <div className="relative">
        <div className="flex items-center justify-center space-x-6 p-8 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl">
          {gameTypes.map((game, index) => (
            <GameBubble
              key={game.type}
              gameType={game.type}
              name={game.name}
              description={game.description}
              isSelected={wizardData.selectedGame === game.type}
              onClick={() => handleGameSelect(game.type)}
              delay={index * 100}
            />
          ))}
        </div>
        
        {/* Floating elements */}
        <div className="absolute -top-4 -left-4 w-8 h-8 bg-[#841b60]/50 rounded-full blur-sm animate-pulse"></div>
        <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-violet-400/50 rounded-full blur-sm animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Instruction */}
      <div className="mt-12 text-center">
        <p className="text-gray-400 text-sm">
          Cliquez sur une mécanique pour commencer votre création
        </p>
      </div>
    </div>
  );
};

export default GameSelectionStep;
