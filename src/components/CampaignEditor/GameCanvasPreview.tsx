
import React from 'react';
import { Quiz, Wheel, Scratch, Memory, Puzzle, Dice, Jackpot } from '../GameTypes';

interface GameCanvasPreviewProps {
  campaign: any;
  className?: string;
}

const GameCanvasPreview: React.FC<GameCanvasPreviewProps> = ({
  campaign,
  className = ""
}) => {
  const gameBackgroundImage = campaign.gameConfig?.[campaign.type]?.backgroundImage;
  const customTemplate = campaign.gameConfig?.[campaign.type]?.customTemplate;
  
  // Configuration spécifique pour le jackpot
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
            config={campaign.gameConfig.quiz} 
            onConfigChange={() => {}}
          />
        );
      case 'wheel':
        return (
          <Wheel 
            config={campaign.gameConfig.wheel}
            isPreview={true}
            currentWinners={0}
            maxWinners={100}
            winRate={10}
          />
        );
      case 'scratch':
        return (
          <Scratch 
            config={campaign.gameConfig.scratch} 
            onConfigChange={() => {}}
          />
        );
      case 'memory':
        return (
          <Memory 
            config={campaign.gameConfig.memory} 
            onConfigChange={() => {}}
          />
        );
      case 'puzzle':
        return (
          <Puzzle 
            config={campaign.gameConfig.puzzle} 
            onConfigChange={() => {}}
          />
        );
      case 'dice':
        return (
          <Dice 
            config={campaign.gameConfig.dice} 
            onConfigChange={() => {}}
          />
        );
      default:
        return (
          <div className="text-center text-gray-500">
            <p className="text-sm">Aperçu du jeu {campaign.type}</p>
            <p className="text-xs mt-1">Le jeu apparaîtra ici</p>
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

      {/* Template personnalisé du jeu au-dessus (optionnel) */}
      {customTemplate && (
        <img
          src={customTemplate}
          alt={`${campaign.type} Template`}
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
