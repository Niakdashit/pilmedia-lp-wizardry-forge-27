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
  return <div className="space-y-6">
      <div>
        
        
      </div>

      {/* Position du jeu */}
      <div className="space-y-3">
        
        <div className="grid grid-cols-3 gap-2">
          <div></div>
          
          <div></div>
          
          
          
          
          
          <div></div>
          
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
    </div>;
};
export default ModernGameTab;