
import React from 'react';
import WheelPreview from '../../GameTypes/WheelPreview';
import { Jackpot } from '../../GameTypes';
import ScratchPreview from '../../GameTypes/ScratchPreview';
import DicePreview from '../../GameTypes/DicePreview';

interface GameRendererProps {
  gameType: string;
  mockCampaign: any;
  customColors: {
    primary: string;
    secondary: string;
    accent?: string;
  };
  jackpotColors: {
    containerBackgroundColor: string;
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
    slotBorderColor: string;
    slotBorderWidth: number;
    slotBackgroundColor: string;
  };
}

const GameRenderer: React.FC<GameRendererProps> = ({
  gameType,
  mockCampaign,
  customColors,
  jackpotColors
}) => {
  switch (gameType) {
    case 'wheel':
      return (
        <WheelPreview
          campaign={mockCampaign}
          config={mockCampaign.gameConfig?.wheel || {
            mode: "instant_winner" as const,
            winProbability: 0.1,
            maxWinners: 10,
            winnersCount: 0
          }}
          gameSize="large"
          gamePosition="center"
          previewDevice="desktop"
        />
      );

    case 'jackpot':
      return (
        <Jackpot
          isPreview={true}
          instantWinConfig={mockCampaign.gameConfig?.jackpot?.instantWin || {
            mode: "instant_winner" as const,
            winProbability: 0.1,
            maxWinners: 10,
            winnersCount: 0
          }}
          buttonLabel={mockCampaign.gameConfig?.jackpot?.buttonLabel || 'Lancer le Jackpot'}
          buttonColor={customColors.primary}
          backgroundImage={mockCampaign.gameConfig?.jackpot?.backgroundImage}
          containerBackgroundColor={jackpotColors.containerBackgroundColor}
          backgroundColor={jackpotColors.backgroundColor}
          borderColor={jackpotColors.borderColor}
          borderWidth={jackpotColors.borderWidth}
          slotBorderColor={jackpotColors.slotBorderColor}
          slotBorderWidth={jackpotColors.slotBorderWidth}
          slotBackgroundColor={jackpotColors.slotBackgroundColor}
        />
      );

    case 'scratch':
      return (
        <ScratchPreview 
          config={mockCampaign.gameConfig?.scratch || {}}
        />
      );

    case 'dice':
      return (
        <DicePreview 
          config={mockCampaign.gameConfig?.dice || {}}
        />
      );

    default:
      return (
        <div className="text-center text-gray-500">
          <p>Type de jeu non supporté: {gameType}</p>
        </div>
      );
  }
};

export default GameRenderer;
