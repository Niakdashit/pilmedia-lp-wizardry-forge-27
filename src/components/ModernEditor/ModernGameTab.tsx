import React from 'react';
import { Settings, Target } from 'lucide-react';
import WheelGameConfig from './GameConfigs/WheelGameConfig';
import JackpotGameConfig from './GameConfigs/JackpotGameConfig';
import MemoryGameConfig from './GameConfigs/MemoryGameConfig';
import PuzzleGameConfig from './GameConfigs/PuzzleGameConfig';
import QuizGameConfig from './GameConfigs/QuizGameConfig';
import DiceGameConfig from './GameConfigs/DiceGameConfig';
import ScratchGameConfig from './GameConfigs/ScratchGameConfig';

interface ModernGameTabProps {
  campaign: any;
  setCampaign: React.Dispatch<React.SetStateAction<any>>;
}

const ModernGameTab: React.FC<ModernGameTabProps> = ({
  campaign,
  setCampaign
}) => {
  const gameTypeLabels = {
    wheel: 'Roue de la Fortune',
    jackpot: 'Jackpot',
    memory: 'Jeu de Mémoire',
    puzzle: 'Puzzle',
    quiz: 'Quiz Interactif',
    dice: 'Dés Magiques',
    scratch: 'Carte à Gratter',
    swiper: 'Swiper',
    form: 'Formulaire Dynamique'
  };

  const handlePositionChange = (position: string) => {
    setCampaign((prev: any) => ({
      ...prev,
      gamePosition: position
    }));
  };

  const positions = [
    { value: 'top', label: 'Haut' },
    { value: 'center', label: 'Centre' },
    { value: 'bottom', label: 'Bas' },
    { value: 'left', label: 'Gauche' },
    { value: 'right', label: 'Droite' }
  ];

  const renderGameConfig = () => {
    switch (campaign.type) {
      case 'wheel':
        return <WheelGameConfig campaign={campaign} setCampaign={setCampaign} />;
      case 'jackpot':
        return <JackpotGameConfig campaign={campaign} setCampaign={setCampaign} />;
      case 'memory':
        return <MemoryGameConfig campaign={campaign} setCampaign={setCampaign} />;
      case 'puzzle':
        return <PuzzleGameConfig campaign={campaign} setCampaign={setCampaign} />;
      case 'quiz':
        return <QuizGameConfig campaign={campaign} setCampaign={setCampaign} />;
      case 'dice':
        return <DiceGameConfig campaign={campaign} setCampaign={setCampaign} />;
      case 'scratch':
        return <ScratchGameConfig campaign={campaign} setCampaign={setCampaign} />;
      default:
        return <div className="text-gray-500">Configuration non disponible pour ce type de jeu</div>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Configuration du jeu</h2>
        <p className="text-sm text-gray-600">
          Paramétrez votre {gameTypeLabels[campaign.type as keyof typeof gameTypeLabels]}
        </p>
      </div>

      {/* Position du jeu */}
      <div className="space-y-3">
        <label className="flex items-center text-sm font-medium text-gray-700">
          <Target className="w-4 h-4 mr-2" />
          Position du jeu
        </label>
        <div className="grid grid-cols-3 gap-2">
          <div></div>
          <button
            onClick={() => handlePositionChange('top')}
            className={`p-2 text-xs rounded border transition-colors ${
              campaign.gamePosition === 'top'
                ? 'bg-[#841b60] text-white border-[#841b60]'
                : 'bg-white text-gray-700 border-gray-300 hover:border-[#841b60]'
            }`}
          >
            Haut
          </button>
          <div></div>
          
          <button
            onClick={() => handlePositionChange('left')}
            className={`p-2 text-xs rounded border transition-colors ${
              campaign.gamePosition === 'left'
                ? 'bg-[#841b60] text-white border-[#841b60]'
                : 'bg-white text-gray-700 border-gray-300 hover:border-[#841b60]'
            }`}
          >
            Gauche
          </button>
          <button
            onClick={() => handlePositionChange('center')}
            className={`p-2 text-xs rounded border transition-colors ${
              campaign.gamePosition === 'center'
                ? 'bg-[#841b60] text-white border-[#841b60]'
                : 'bg-white text-gray-700 border-gray-300 hover:border-[#841b60]'
            }`}
          >
            Centre
          </button>
          <button
            onClick={() => handlePositionChange('right')}
            className={`p-2 text-xs rounded border transition-colors ${
              campaign.gamePosition === 'right'
                ? 'bg-[#841b60] text-white border-[#841b60]'
                : 'bg-white text-gray-700 border-gray-300 hover:border-[#841b60]'
            }`}
          >
            Droite
          </button>
          
          <div></div>
          <button
            onClick={() => handlePositionChange('bottom')}
            className={`p-2 text-xs rounded border transition-colors ${
              campaign.gamePosition === 'bottom'
                ? 'bg-[#841b60] text-white border-[#841b60]'
                : 'bg-white text-gray-700 border-gray-300 hover:border-[#841b60]'
            }`}
          >
            Bas
          </button>
          <div></div>
        </div>
      </div>

      {/* Configuration spécifique au jeu */}
      <div className="border-t pt-6">
        <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-4">
          <Settings className="w-5 h-5 mr-2" />
          Paramètres spécifiques
        </h3>
        {renderGameConfig()}
      </div>
    </div>
  );
};

export default ModernGameTab;
