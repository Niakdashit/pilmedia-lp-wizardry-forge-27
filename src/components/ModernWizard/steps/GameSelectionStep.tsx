
import React from 'react';
import { WizardData } from '../ModernWizard';
import { CampaignType } from '../../../utils/campaignTypes';
import { RotateCcw, Brain, DollarSign, Layers, Grid3X3, Puzzle, Dice6, FileText } from 'lucide-react';

interface GameSelectionStepProps {
  wizardData: WizardData;
  updateWizardData: (data: Partial<WizardData>) => void;
  nextStep: () => void;
}

const iconComponents: Record<CampaignType, React.ReactElement> = {
  wheel: <RotateCcw className="w-5 h-5" />,
  quiz: <Brain className="w-5 h-5" />,
  jackpot: <DollarSign className="w-5 h-5" />,
  scratch: <Layers className="w-5 h-5" />,
  memory: <Grid3X3 className="w-5 h-5" />,
  puzzle: <Puzzle className="w-5 h-5" />,
  dice: <Dice6 className="w-5 h-5" />,
  form: <FileText className="w-5 h-5" />,
  swiper: <RotateCcw className="w-5 h-5" />
};

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
      {/* Section Header */}
      <div className="max-w-3xl">
        <h2 className="text-xl font-bold text-[#141e29] mb-3">Choisissez votre mécanique de jeu</h2>
        <p className="text-gray-600 leading-relaxed">
          Sélectionnez le type d'interaction qui correspond le mieux à vos objectifs. 
          Chaque mécanique peut être personnalisée selon vos besoins.
        </p>
      </div>

      {/* Game Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {gameTypes.map((game) => (
          <button
            key={game.type}
            onClick={() => handleGameSelect(game.type)}
            className={`
              p-6 rounded-xl border-2 transition-all duration-200 text-left group
              hover:shadow-md hover:border-[#951b6d]/30 hover:-translate-y-0.5
              ${wizardData.selectedGame === game.type
                ? 'border-[#951b6d] bg-[#951b6d]/5 shadow-md' 
                : 'border-gray-200 bg-white hover:bg-gray-50'
              }
            `}
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className={`
                w-10 h-10 rounded-lg flex items-center justify-center transition-colors
                ${wizardData.selectedGame === game.type
                  ? 'bg-[#951b6d] text-white' 
                  : 'bg-gray-100 text-gray-600 group-hover:bg-[#951b6d]/10 group-hover:text-[#951b6d]'
                }
              `}>
                {iconComponents[game.type]}
              </div>
              
              {wizardData.selectedGame === game.type && (
                <div className="w-2 h-2 bg-[#951b6d] rounded-full"></div>
              )}
            </div>
            
            <h3 className="font-semibold text-[#141e29] mb-2 group-hover:text-[#951b6d] transition-colors">
              {game.name}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {game.description}
            </p>
          </button>
        ))}
      </div>

      {/* Next Button */}
      {wizardData.selectedGame && (
        <div className="flex justify-end pt-6">
          <button
            onClick={nextStep}
            className="px-6 py-3 bg-[#951b6d] text-white font-semibold rounded-lg hover:bg-[#7d1659] transition-colors shadow-sm hover:shadow-md"
          >
            Continuer
          </button>
        </div>
      )}
    </div>
  );
};

export default GameSelectionStep;
