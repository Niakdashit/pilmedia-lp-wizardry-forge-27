
import React from 'react';
import { Gamepad2 } from 'lucide-react';
import GameCanvasPreview from '../../../CampaignEditor/GameCanvasPreview';
import { Quiz, Scratch, Memory, Puzzle, Dice } from '../../../GameTypes';
import TabRoulette from '../../../configurators/TabRoulette';
import TabJackpot from '../../../configurators/TabJackpot';

interface GameSectionProps {
  campaign: any;
  setCampaign: React.Dispatch<React.SetStateAction<any>>;
}

const GameSection: React.FC<GameSectionProps> = ({ campaign, setCampaign }) => {
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
            campaign={campaign}
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
          <div className="text-center text-gray-500 p-8">
            <p>Éditeur de jeu en cours de développement pour le type "{campaign.type}"</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
            <Gamepad2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Configuration du jeu</h2>
            <p className="text-gray-600">Personnalisez votre jeu {campaign.type}</p>
          </div>
        </div>

        {/* Aperçu du jeu */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Aperçu en temps réel</h3>
          <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 min-h-[400px]">
            <GameCanvasPreview campaign={campaign} setCampaign={setCampaign} />
          </div>
        </div>
      </div>

      {/* Configuration du jeu */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Paramètres du jeu</h3>
        {getGameEditor()}
      </div>
    </div>
  );
};

export default GameSection;
