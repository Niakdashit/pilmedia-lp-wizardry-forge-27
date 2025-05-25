
import React from 'react';
import GameCanvasPreview from '../CampaignEditor/GameCanvasPreview';

interface JackpotAppearanceProps {
  campaign: any;
  setCampaign: (value: any) => void;
}

const JackpotAppearance: React.FC<JackpotAppearanceProps> = ({ campaign, setCampaign }) => {
  const handleInputChange = (key: string, value: string) => {
    const updatedCampaign = {
      ...campaign,
      gameConfig: {
        ...campaign.gameConfig,
        [campaign.type]: {
          ...campaign.gameConfig?.[campaign.type],
          [key]: value
        }
      }
    };
    setCampaign(updatedCampaign);
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#f9f0f5] border border-[#e9d0e5] rounded-lg p-4">
        <p className="text-[#841b60] text-sm">
          Personnalisez l'apparence de votre jeu Jackpot avec vos propres visuels et boutons.
        </p>
      </div>

      {/* Aperçu du jeu avec configurateur intégré */}
      <GameCanvasPreview 
        campaign={campaign} 
        handleInputChange={handleInputChange}
      />
    </div>
  );
};

export default JackpotAppearance;
