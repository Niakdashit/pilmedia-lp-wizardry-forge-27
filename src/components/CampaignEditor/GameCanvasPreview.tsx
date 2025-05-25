
import React from 'react';
import Jackpot from '../GameTypes/Jackpot';
import { Quiz, Wheel, Scratch, Memory, Puzzle, Dice } from '../GameTypes';

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
    switch (campaign.type) {
      case 'jackpot':
        return (
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
        );
      case 'quiz':
        return (
          <Quiz 
            config={campaign.gameConfig?.quiz || {}} 
            onConfigChange={() => {}}
          />
        );
      case 'wheel':
        return (
          <Wheel 
            config={campaign.gameConfig?.wheel || {}}
            isPreview={true}
            currentWinners={0}
            maxWinners={100}
            winRate={10}
            onComplete={() => {}}
          />
        );
      case 'scratch':
        return (
          <Scratch 
            config={campaign.gameConfig?.scratch || {}} 
            onConfigChange={() => {}}
          />
        );
      case 'memory':
        return (
          <Memory 
            config={campaign.gameConfig?.memory || {}} 
            onConfigChange={() => {}}
          />
        );
      case 'puzzle':
        return (
          <Puzzle 
            config={campaign.gameConfig?.puzzle || {}} 
            onConfigChange={() => {}}
          />
        );
      case 'dice':
        return (
          <Dice 
            config={campaign.gameConfig?.dice || {}} 
            onConfigChange={() => {}}
          />
        );
      default:
        return (
          <div className="text-center text-gray-500">
            <p className="text-sm">Type de jeu non pris en charge</p>
          </div>
        );
    }
  };

  return (
    <div className={`relative w-full h-full ${className} overflow-hidden`}>
      {/* Image de fond plein écran, rognée si besoin */}
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

      {/* Jeu centré par-dessus */}
      <div className="relative z-20 flex items-center justify-center w-full h-full px-4">
        {renderGame()}
      </div>
    </div>
  );
};

export default GameCanvasPreview;
