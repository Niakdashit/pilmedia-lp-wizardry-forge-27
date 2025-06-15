
import React from 'react';
import { WizardData } from '../ModernWizard';
import { CampaignType } from '../../../utils/campaignTypes';
import GameBubble from '../components/GameBubble';

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
    }, 300);
  };

  return (
    <div className="space-y-8">
      {/* Content Container */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/50 shadow-sm p-8">
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#141e29] mb-3">
            Choisissez votre mécanique de jeu
          </h2>
          <p className="text-gray-600 leading-relaxed max-w-3xl">
            Sélectionnez le type d'interaction qui correspond le mieux à vos objectifs. 
            Chaque mécanique sera automatiquement personnalisée selon vos contenus.
          </p>
        </div>

        {/* Game Bubbles Dock */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-sm p-8 mb-8">
          <div className="flex flex-wrap justify-center gap-8">
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
        </div>

        {/* Selection Confirmation */}
        {wizardData.selectedGame && (
          <div className="bg-gradient-to-r from-[#951b6d]/10 to-emerald-50 rounded-2xl border border-[#951b6d]/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-[#141e29] mb-1">
                  {gameTypes.find(g => g.type === wizardData.selectedGame)?.name} sélectionné
                </h3>
                <p className="text-gray-600 text-sm">
                  Prêt à configurer vos contenus de marque
                </p>
              </div>
              <button
                onClick={nextStep}
                className="px-6 py-3 bg-[#951b6d] text-white font-semibold rounded-xl hover:bg-[#7d1659] transition-all duration-200 hover:scale-105 shadow-lg"
              >
                Continuer
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameSelectionStep;
