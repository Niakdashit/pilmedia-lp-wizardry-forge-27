
import React from 'react';
import WheelPreview from '../../../GameTypes/WheelPreview';
import { Jackpot } from '../../../GameTypes';
import QuizPreview from '../../../GameTypes/QuizPreview';
import ScratchPreview from '../../../GameTypes/ScratchPreview';
import DicePreview from '../../../GameTypes/DicePreview';
import FormPreview from '../../../GameTypes/FormPreview';
import AdvancedWheelRenderer from '../AdvancedWheelRenderer';
import { useQuickCampaignStore } from '../../../../stores/quickCampaignStore';

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
  const { advancedMode } = useQuickCampaignStore();

  const baseContainerStyle = {
    ...containerStyle,
    minHeight: '400px',
    padding: '20px',
    boxSizing: 'border-box' as const,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden', // Strict overflow control
    maxWidth: '100%',
    maxHeight: '100%'
  };

  const baseWrapperStyle = {
    ...wrapperStyle,
    ...getPositionStyles(),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    overflow: 'hidden', // Prevent wrapper overflow
    maxWidth: '100%',
    maxHeight: '100%'
  };

  switch (gameType) {
    case 'wheel':
      const wheelContent = (
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
      );

      return (
        <div style={baseContainerStyle}>
          <div style={baseWrapperStyle}>
            <div className="w-full h-full overflow-hidden flex items-center justify-center">
              {advancedMode ? (
                <AdvancedWheelRenderer>
                  {wheelContent}
                </AdvancedWheelRenderer>
              ) : (
                wheelContent
              )}
            </div>
          </div>
        </div>
      );

    case 'jackpot':
      return (
        <div style={baseContainerStyle}>
          <div style={baseWrapperStyle}>
            <div className="w-full h-full overflow-hidden flex items-center justify-center">
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
        </div>
      );

    case 'quiz':
      return (
        <div style={baseContainerStyle}>
          <div style={baseWrapperStyle}>
            <div className="w-full h-full overflow-hidden flex items-center justify-center">
              <div style={{ 
                width: '100%', 
                maxWidth: '800px', 
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}>
                <QuizPreview
                  config={mockCampaign.gameConfig?.quiz || {
                    questions: [
                      {
                        id: 1,
                        text: 'Question exemple',
                        type: 'multiple',
                        options: [
                          { id: 1, text: 'Option A', isCorrect: false },
                          { id: 2, text: 'Option B', isCorrect: true }
                        ]
                      }
                    ]
                  }}
                  design={synchronizedCampaign.design}
                  useCustomLayout={true}
                  key={renderKey}
                />
              </div>
            </div>
          </div>
        </div>
      );

    case 'scratch':
      return (
        <div style={baseContainerStyle}>
          <div style={baseWrapperStyle}>
            <div className="w-full h-full overflow-hidden flex items-center justify-center">
              <ScratchPreview
                config={mockCampaign.gameConfig?.scratch || {}}
                autoStart
              />
            </div>
          </div>
        </div>
      );

    case 'dice':
      return (
        <div style={baseContainerStyle}>
          <div style={baseWrapperStyle}>
            <div className="w-full h-full overflow-hidden flex items-center justify-center">
              <DicePreview
                config={mockCampaign.gameConfig?.dice || {}}
              />
            </div>
          </div>
        </div>
      );

    case 'form':
      return (
        <div style={baseContainerStyle}>
          <div style={baseWrapperStyle}>
            <div className="w-full h-full overflow-hidden flex items-center justify-center">
              <FormPreview
                campaign={synchronizedCampaign}
                gameSize={gameSize}
              />
            </div>
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
