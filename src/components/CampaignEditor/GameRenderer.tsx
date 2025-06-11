
import React from 'react';
import Jackpot from '../GameTypes/Jackpot';
import { Quiz } from '../GameTypes';
import WheelPreview from '../GameTypes/WheelPreview';
import MemoryPreview from '../GameTypes/MemoryPreview';
import PuzzlePreview from '../GameTypes/PuzzlePreview';
import ScratchPreview from '../GameTypes/ScratchPreview';
import DicePreview from '../GameTypes/DicePreview';
import FormPreview from '../GameTypes/FormPreview';
import { GameSize } from '../configurators/GameSizeSelector';

interface GameRendererProps {
  campaign: any;
  gameSize: GameSize;
  gamePosition: string;
  previewDevice: 'desktop' | 'tablet' | 'mobile';
  gameContainerStyle: any;
  buttonLabel: string;
  buttonColor: string;
  gameBackgroundImage?: string;
}

const GameRenderer: React.FC<GameRendererProps> = ({
  campaign,
  gameSize,
  gamePosition,
  previewDevice,
  gameContainerStyle,
  buttonLabel,
  buttonColor,
  gameBackgroundImage
}) => {
  // Ensure gamePosition is properly typed for WheelPreview
  const validGamePosition = (['top', 'center', 'bottom', 'left', 'right'].includes(gamePosition) 
    ? gamePosition 
    : 'center') as 'top' | 'center' | 'bottom' | 'left' | 'right';

  // Universal centering container style that overrides any positioning
  const centeredContainerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    minHeight: '400px',
    position: 'relative',
    padding: '20px',
    boxSizing: 'border-box'
  };

  // Game wrapper with consistent centering
  const gameWrapperStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '20px',
    maxWidth: '100%',
    maxHeight: '100%'
  };

  switch (campaign.type) {
    case 'jackpot':
      return (
        <div style={centeredContainerStyle}>
          <div style={gameWrapperStyle}>
            <Jackpot
              isPreview={true}
              instantWinConfig={{
                mode: 'instant_winner' as const,
                winProbability: campaign.gameConfig?.jackpot?.instantWin?.winProbability || 0.05,
                maxWinners: campaign.gameConfig?.jackpot?.instantWin?.maxWinners,
                winnersCount: 0
              }}
              buttonLabel={buttonLabel}
              buttonColor={buttonColor}
              backgroundImage={gameBackgroundImage}
              containerBackgroundColor={campaign.gameConfig?.jackpot?.containerBackgroundColor || '#1f2937'}
              backgroundColor={campaign.gameConfig?.jackpot?.backgroundColor || '#c4b5fd30'}
              borderColor={campaign.gameConfig?.jackpot?.borderColor || '#8b5cf6'}
              borderWidth={campaign.gameConfig?.jackpot?.borderWidth || 3}
              slotBorderColor={campaign.gameConfig?.jackpot?.slotBorderColor || '#a78bfa'}
              slotBorderWidth={campaign.gameConfig?.jackpot?.slotBorderWidth || 2}
              slotBackgroundColor={campaign.gameConfig?.jackpot?.slotBackgroundColor || '#ffffff'}
            />
          </div>
        </div>
      );
    case 'quiz':
      return (
        <div style={centeredContainerStyle}>
          <div style={gameWrapperStyle}>
            <Quiz config={campaign.gameConfig?.quiz || {}} onConfigChange={() => {}} />
          </div>
        </div>
      );
    case 'wheel':
      return (
        <div style={centeredContainerStyle}>
          <div style={gameWrapperStyle}>
            <WheelPreview
              campaign={campaign}
              config={{
                mode: 'instant_winner' as const,
                winProbability: campaign.gameConfig?.wheel?.winProbability || 0.1,
                maxWinners: campaign.gameConfig?.wheel?.maxWinners,
                winnersCount: 0
              }}
              onFinish={() => {}}
              gameSize={gameSize}
              gamePosition={validGamePosition}
              previewDevice={previewDevice}
              key={`${gameSize}-${gamePosition}-${previewDevice}-${JSON.stringify(campaign.gameConfig?.wheel)}`}
            />
          </div>
        </div>
      );
    case 'scratch':
      return (
        <div style={centeredContainerStyle}>
          <div style={gameWrapperStyle}>
            <ScratchPreview
              config={campaign.gameConfig?.scratch || {}}
              buttonLabel={buttonLabel}
              buttonColor={buttonColor}
              gameSize={gameSize}
              autoStart
            />
          </div>
        </div>
      );
    case 'memory':
      return (
        <div style={centeredContainerStyle}>
          <div style={gameWrapperStyle}>
            <MemoryPreview config={campaign.gameConfig?.memory || {}} />
          </div>
        </div>
      );
    case 'puzzle':
      return (
        <div style={centeredContainerStyle}>
          <div style={gameWrapperStyle}>
            <PuzzlePreview config={campaign.gameConfig?.puzzle || {}} />
          </div>
        </div>
      );
    case 'dice':
      return (
        <div style={centeredContainerStyle}>
          <div style={gameWrapperStyle}>
            <DicePreview config={campaign.gameConfig?.dice || {}} />
          </div>
        </div>
      );
    case 'form':
      return (
        <div style={centeredContainerStyle}>
          <div style={gameWrapperStyle}>
            <FormPreview
              campaign={campaign}
              gameSize={gameSize}
            />
          </div>
        </div>
      );
    default:
      return (
        <div style={centeredContainerStyle}>
          <div style={gameWrapperStyle}>
            <div className="text-center text-gray-500 flex items-center justify-center h-full">
              <p className="text-sm">Type de jeu non pris en charge</p>
            </div>
          </div>
        </div>
      );
  }
};

export default GameRenderer;
