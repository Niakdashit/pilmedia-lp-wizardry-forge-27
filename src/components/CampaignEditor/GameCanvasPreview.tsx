
import React from 'react';
import Jackpot from '../GameTypes/Jackpot';
import { Quiz } from '../GameTypes';
import WheelPreview from '../GameTypes/WheelPreview';
import MemoryPreview from '../GameTypes/MemoryPreview';
import PuzzlePreview from '../GameTypes/PuzzlePreview';
import ScratchPreview from '../GameTypes/ScratchPreview';
import DicePreview from '../GameTypes/DicePreview';
import { GAME_SIZES } from '../configurators/GameSizeSelector';

interface GameCanvasPreviewProps {
  campaign: any;
  className?: string;
}

const GameCanvasPreview: React.FC<GameCanvasPreviewProps> = ({
  campaign,
  className = ""
}) => {
  const gameBackgroundImage = campaign.gameConfig?.[campaign.type]?.backgroundImage;
  const buttonLabel = campaign.gameConfig?.[campaign.type]?.buttonLabel || 'Lancer le Jackpot';
  const buttonColor = campaign.gameConfig?.[campaign.type]?.buttonColor || '#ec4899';

  // Get game size and position from campaign
  const gameSize = campaign.gameSize || 'medium';
  const gamePosition = campaign.gamePosition || 'center';
  
  // Get dimensions based on game size
  const gameDimensions = GAME_SIZES[gameSize];
  
  // Calculate positioning styles based on gamePosition
  const getPositionStyles = () => {
    const baseStyles = {
      width: `${gameDimensions.width}px`,
      height: `${gameDimensions.height}px`,
      maxWidth: `${gameDimensions.width}px`,
      maxHeight: `${gameDimensions.height}px`,
    };

    switch (gamePosition) {
      case 'top':
        return {
          ...baseStyles,
          alignSelf: 'flex-start',
          margin: '20px auto 0 auto'
        };
      case 'bottom':
        return {
          ...baseStyles,
          alignSelf: 'flex-end',
          margin: '0 auto 20px auto'
        };
      case 'left':
        return {
          ...baseStyles,
          alignSelf: 'center',
          margin: 'auto 0 auto 20px'
        };
      case 'right':
        return {
          ...baseStyles,
          alignSelf: 'center',
          margin: 'auto 20px auto 0'
        };
      case 'center':
      default:
        return {
          ...baseStyles,
          alignSelf: 'center',
          margin: 'auto'
        };
    }
  };

  const renderGame = () => {
    const gameContainerStyle = getPositionStyles();
    
    switch (campaign.type) {
      case 'jackpot':
        return (
          <div style={gameContainerStyle}>
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
        );
      case 'quiz':
        return (
          <div style={gameContainerStyle}>
            <Quiz config={campaign.gameConfig?.quiz || {}} onConfigChange={() => {}} />
          </div>
        );
      case 'wheel':
        return (
          <div style={gameContainerStyle}>
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
              gamePosition={gamePosition}
              key={`${gameSize}-${gamePosition}-${JSON.stringify(campaign.config?.roulette)}`}
            />
          </div>
        );
      case 'scratch':
        return (
          <div style={gameContainerStyle}>
            <ScratchPreview config={campaign.gameConfig?.scratch || {}} />
          </div>
        );
      case 'memory':
        return (
          <div style={gameContainerStyle}>
            <MemoryPreview config={campaign.gameConfig?.memory || {}} />
          </div>
        );
      case 'puzzle':
        return (
          <div style={gameContainerStyle}>
            <PuzzlePreview config={campaign.gameConfig?.puzzle || {}} />
          </div>
        );
      case 'dice':
        return (
          <div style={gameContainerStyle}>
            <DicePreview config={campaign.gameConfig?.dice || {}} />
          </div>
        );
      default:
        return (
          <div className="text-center text-gray-500 flex items-center justify-center h-full">
            <p className="text-sm">Type de jeu non pris en charge</p>
          </div>
        );
    }
  };

  return (
    <div 
      className={`relative w-full h-full overflow-hidden ${className}`} 
      style={{ minHeight: '600px' }}
    >
      {/* Image de fond plein écran */}
      {gameBackgroundImage && (
        <img 
          src={gameBackgroundImage} 
          alt="Background" 
          className="absolute inset-0 w-full h-full object-cover z-0" 
          style={{ pointerEvents: 'none' }} 
        />
      )}

      {/* Conteneur pour le jeu avec positionnement dynamique */}
      <div className="relative z-20 w-full h-full flex">
        {renderGame()}
      </div>
    </div>
  );
};

export default GameCanvasPreview;
