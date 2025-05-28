
import React from 'react';
import GameCanvasPreview from './GameCanvasPreview';
import TabJackpot from '../configurators/TabJackpot';
import TabRoulette from '../configurators/TabRoulette';
import { Quiz, Memory, Puzzle, Dice, Scratch } from '../GameTypes';

interface CampaignContentProps {
  campaign: any;
  setCampaign: React.Dispatch<React.SetStateAction<any>>;
}

const CampaignContent: React.FC<CampaignContentProps> = ({
  campaign,
  setCampaign
}) => {
  const updateGameConfig = (newConfig: any) => {
    setCampaign((prev: any) => ({
      ...prev,
      gameConfig: {
        ...prev.gameConfig,
        [campaign.type]: newConfig
      }
    }));
  };

  const renderGameConfiguration = () => {
    switch (campaign.type) {
      case 'jackpot':
        return (
          <TabJackpot
            campaign={campaign}
            setCampaign={setCampaign}
          />
        );

      case 'wheel':
        return (
          <TabRoulette
            campaign={campaign}
            setCampaign={setCampaign}
          />
        );

      case 'quiz':
        return (
          <Quiz
            config={campaign.gameConfig?.quiz || {}}
            onConfigChange={updateGameConfig}
          />
        );

      case 'memory':
        return (
          <Memory
            config={campaign.gameConfig?.memory || {}}
            onConfigChange={updateGameConfig}
          />
        );

      case 'puzzle':
        return (
          <Puzzle
            config={campaign.gameConfig?.puzzle || {}}
            onConfigChange={updateGameConfig}
          />
        );

      case 'dice':
        return (
          <Dice
            config={campaign.gameConfig?.dice || {}}
            onConfigChange={updateGameConfig}
          />
        );

      case 'scratch':
        return (
          <Scratch
            config={campaign.gameConfig?.scratch || {}}
            onConfigChange={updateGameConfig}
          />
        );

      default:
        return (
          <div className="text-center text-gray-500 p-8">
            Configuration non disponible pour ce type de jeu
          </div>
        );
    }
  };

  return (
    <div className="flex flex-1 gap-6 overflow-hidden">
      {/* Configuration du jeu - 50% */}
      <div className="w-1/2 overflow-y-auto bg-gray-50 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-2 h-2 bg-[#841b60] rounded-full"></div>
          <h2 className="text-xl font-bold text-[#841b60]">Configuration du jeu</h2>
        </div>
        {renderGameConfiguration()}
      </div>

      {/* Aperçu du jeu - 50% */}
      <div className="w-1/2 overflow-y-auto bg-gray-50 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-2 h-2 bg-[#841b60] rounded-full"></div>
          <h2 className="text-xl font-bold text-[#841b60]">Aperçu du jeu</h2>
        </div>
        <div className="bg-white rounded-lg border shadow-sm" style={{ minHeight: '400px' }}>
          <GameCanvasPreview campaign={campaign} />
        </div>
      </div>
    </div>
  );
};

export default CampaignContent;
