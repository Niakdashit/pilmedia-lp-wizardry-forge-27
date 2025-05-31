
import React from 'react';
import { Gamepad2 } from 'lucide-react';
import { Quiz, Scratch, Memory, Puzzle, Dice } from '../GameTypes';
import TabRoulette from '../configurators/TabRoulette';
import TabJackpot from '../configurators/TabJackpot';

interface ModernGameTabProps {
  campaign: any;
  setCampaign: React.Dispatch<React.SetStateAction<any>>;
}

const ModernGameTab: React.FC<ModernGameTabProps> = ({ 
  campaign, 
  setCampaign 
}) => {
  const updateGameConfig = (gameType: string, config: any) => {
    setCampaign((prev: any) => ({
      ...prev,
      gameConfig: {
        ...prev.gameConfig,
        [gameType]: config,
      },
    }));
  };

  const getGameEditor = () => {
    switch (campaign.type) {
      case 'quiz':
        return (
          <Quiz
            config={campaign.gameConfig?.quiz}
            onConfigChange={(config) => updateGameConfig('quiz', config)}
          />
        );
      case 'wheel':
        return <TabRoulette campaign={campaign} setCampaign={setCampaign} />;
      case 'scratch':
        return (
          <Scratch
            config={campaign.gameConfig?.scratch}
            onConfigChange={(config) => updateGameConfig('scratch', config)}
          />
        );
      case 'memory':
        return (
          <Memory
            config={campaign.gameConfig?.memory}
            onConfigChange={(config) => updateGameConfig('memory', config)}
          />
        );
      case 'puzzle':
        return (
          <Puzzle
            config={campaign.gameConfig?.puzzle}
            onConfigChange={(config) => updateGameConfig('puzzle', config)}
          />
        );
      case 'dice':
        return (
          <Dice
            config={campaign.gameConfig?.dice}
            onConfigChange={(config) => updateGameConfig('dice', config)}
          />
        );
      case 'jackpot':
        return <TabJackpot campaign={campaign} setCampaign={setCampaign} />;
      default:
        return (
          <div className="flex items-center justify-center h-64 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-gray-500">
              Éditeur de jeu pour le type "{campaign.type}" en cours de développement.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Gamepad2 className="w-5 h-5 text-[#841b60]" />
        <h3 className="text-lg font-medium text-gray-900">Configuration du jeu</h3>
      </div>
      
      <div className="bg-[#f9f0f5] border border-[#e9d0e5] rounded-lg p-4 mb-6">
        <p className="text-[#841b60] text-sm">
          Configurez les paramètres de votre {campaign.type}.
        </p>
      </div>

      {getGameEditor()}
    </div>
  );
};

export default ModernGameTab;
