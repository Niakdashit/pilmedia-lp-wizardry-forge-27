
import React from 'react';
import Jackpot from '../GameTypes/Jackpot';
import { Quiz, Scratch, Memory, Puzzle, Dice } from '../GameTypes';
import WheelPreview from '../GameTypes/WheelPreview';

interface GameCanvasPreviewProps {
  campaign: any;
  className?: string;
}

const GameCanvasPreview: React.FC<GameCanvasPreviewProps> = ({
  campaign,
  className = ""
}) => {
  const gameBackgroundImage = campaign.gameConfig?.[campaign.type]?.backgroundImage;
  const jackpotTemplateImage = campaign.gameConfig?.[campaign.type]?.customTemplate;
  const buttonLabel = campaign.gameConfig?.[campaign.type]?.buttonLabel || 'Lancer le Jackpot';
  const buttonColor = campaign.gameConfig?.[campaign.type]?.buttonColor || '#ec4899';

  const renderGame = () => {
    const gameProps = {
      style: { 
        width: '100%', 
        height: '100%', 
        maxWidth: '100%', 
        maxHeight: '100%',
        overflow: 'hidden'
      }
    };

    switch (campaign.type) {
      case 'jackpot':
        return (
          <div style={gameProps.style}>
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
            />
          </div>
        );
      case 'quiz':
        return (
          <div style={gameProps.style}>
            <Quiz 
              config={campaign.gameConfig?.quiz || {}} 
              onConfigChange={() => {}}
            />
          </div>
        );
      case 'wheel':
        return (
          <div style={gameProps.style}>
            <WheelPreview
              campaign={campaign}
              config={{
                mode: 'instant_winner' as const,
                winProbability: campaign.gameConfig?.wheel?.winProbability || 0.1,
                maxWinners: campaign.gameConfig?.wheel?.maxWinners,
                winnersCount: 0
              }}
              onFinish={() => {}}
            />
          </div>
        );
      case 'scratch':
        return (
          <div style={gameProps.style}>
            <Scratch 
              config={campaign.gameConfig?.scratch || {}} 
              onConfigChange={() => {}}
            />
          </div>
        );
      case 'memory':
        return (
          <div style={gameProps.style}>
            <Memory 
              config={campaign.gameConfig?.memory || {}} 
              onConfigChange={() => {}}
            />
          </div>
        );
      case 'puzzle':
        return (
          <div style={gameProps.style}>
            <Puzzle 
              config={campaign.gameConfig?.puzzle || {}} 
              onConfigChange={() => {}}
            />
          </div>
        );
      case 'dice':
        return (
          <div style={gameProps.style}>
            <Dice 
              config={campaign.gameConfig?.dice || {}} 
              onConfigChange={() => {}}
            />
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
    <div className={`relative w-full h-full ${className} flex items-center justify-center`} style={{ minHeight: '200px' }}>
      {/* Image de fond plein écran */}
      {gameBackgroundImage && (
        <img
          src={gameBackgroundImage}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ pointerEvents: 'none' }}
        />
      )}

      {/* Template jackpot au-dessus (uniquement pour le jackpot) */}
      {campaign.type === 'jackpot' && jackpotTemplateImage && (
        <img
          src={jackpotTemplateImage}
          alt="Jackpot Template"
          className="absolute inset-0 w-full h-full object-contain z-10"
          style={{ pointerEvents: 'none' }}
        />
      )}

      {/* Jeu centré avec contraintes de taille */}
      <div className="relative z-20 w-full h-full flex items-center justify-center p-2" style={{ maxWidth: '100%', maxHeight: '100%' }}>
        {renderGame()}
      </div>
    </div>
  );
};

export default GameCanvasPreview;
