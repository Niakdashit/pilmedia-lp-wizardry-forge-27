
import React from 'react';
import WheelPreview from '../../../GameTypes/WheelPreview';
import { Jackpot, QuizGame } from '../../../GameTypes';
import ScratchPreview from '../../../GameTypes/ScratchPreview';
import DicePreview from '../../../GameTypes/DicePreview';
import FormPreview from '../../../GameTypes/FormPreview';

interface GameSwitcherProps {
  gameType: string;
  synchronizedCampaign: any;
  mockCampaign: any;
  finalColors: {
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
  gameSize: 'small' | 'medium' | 'large' | 'xlarge';
  gamePosition: 'top' | 'center' | 'bottom' | 'left' | 'right';
  previewDevice: 'desktop' | 'tablet' | 'mobile';
  containerStyle: React.CSSProperties;
  wrapperStyle: React.CSSProperties;
  getPositionStyles: () => React.CSSProperties;
  renderKey: string;
}

const GameSwitcher: React.FC<GameSwitcherProps> = ({
  gameType,
  synchronizedCampaign,
  mockCampaign,
  finalColors,
  jackpotColors,
  gameSize,
  gamePosition,
  previewDevice,
  containerStyle,
  wrapperStyle,
  getPositionStyles,
  renderKey
}) => {
  const baseContainerStyle = {
    ...containerStyle,
    minHeight: '400px',
    padding: '20px',
    boxSizing: 'border-box' as const
  };

  const baseWrapperStyle = {
    ...wrapperStyle,
    ...getPositionStyles()
  };

  switch (gameType) {
    case 'wheel':
      return (
        <div style={baseContainerStyle}>
          <div style={baseWrapperStyle}>
            <WheelPreview
              campaign={synchronizedCampaign}
              config={mockCampaign.gameConfig?.wheel || {
                mode: "instant_winner" as const,
                winProbability: 0.1,
                maxWinners: 10,
                winnersCount: 0
              }}
              gameSize={gameSize}
              gamePosition={gamePosition}
              previewDevice={previewDevice}
              key={renderKey}
            />
          </div>
        </div>
      );

    case 'jackpot':
      return (
        <div style={baseContainerStyle}>
          <div style={baseWrapperStyle}>
            <Jackpot
              isPreview={true}
              instantWinConfig={mockCampaign.gameConfig?.jackpot?.instantWin || {
                mode: "instant_winner" as const,
                winProbability: 0.1,
                maxWinners: 10,
                winnersCount: 0
              }}
              buttonLabel={mockCampaign.gameConfig?.jackpot?.buttonLabel || mockCampaign.buttonConfig?.text || 'Lancer le Jackpot'}
              buttonColor={finalColors.primary}
              backgroundImage={mockCampaign.gameConfig?.jackpot?.backgroundImage}
              containerBackgroundColor={jackpotColors.containerBackgroundColor}
              backgroundColor={jackpotColors.backgroundColor}
              borderColor={jackpotColors.borderColor}
              borderWidth={jackpotColors.borderWidth}
              slotBorderColor={jackpotColors.slotBorderColor}
              slotBorderWidth={jackpotColors.slotBorderWidth}
              slotBackgroundColor={jackpotColors.slotBackgroundColor}
            />
          </div>
        </div>
      );

    case 'scratch':
      return (
        <div style={baseContainerStyle}>
          <div style={baseWrapperStyle}>
            <ScratchPreview
              config={mockCampaign.gameConfig?.scratch || {}}
              autoStart
            />
          </div>
        </div>
      );


    case 'dice':
      return (
        <div style={baseContainerStyle}>
          <div style={baseWrapperStyle}>
            <DicePreview
              config={mockCampaign.gameConfig?.dice || {}}
            />
          </div>
        </div>
      );

    case 'quiz':
      return (
        <div style={baseContainerStyle}>
          <div style={baseWrapperStyle}>
            <QuizGame
              campaignId={synchronizedCampaign.id}
              config={mockCampaign.gameConfig?.quiz || {}}
            />
          </div>
        </div>
      );

    case 'form':
      return (
        <div style={baseContainerStyle}>
          <div style={baseWrapperStyle}>
            <FormPreview
              campaign={synchronizedCampaign}
              gameSize={gameSize}
            />
          </div>
        </div>
      );

    default:
      return (
        <div style={baseContainerStyle}>
          <div style={baseWrapperStyle}>
            <div className="text-center text-gray-500">
              <p>Type de jeu non supporté: {gameType}</p>
            </div>
          </div>
        </div>
      );
  }
};

export default GameSwitcher;
