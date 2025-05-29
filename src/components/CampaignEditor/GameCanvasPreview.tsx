import React from 'react';
import Jackpot from '../GameTypes/Jackpot';
import { Quiz } from '../GameTypes';
import WheelPreview from '../GameTypes/WheelPreview';
import MemoryPreview from '../GameTypes/MemoryPreview';
import PuzzlePreview from '../GameTypes/PuzzlePreview';
import ScratchPreview from '../GameTypes/ScratchPreview';
import DicePreview from '../GameTypes/DicePreview';

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
  
  // Récupération du template sélectionné
  const selectedTemplateId = campaign?.design?.template || campaign?.gameConfig?.jackpot?.template;

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
              selectedTemplate={selectedTemplateId}
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
            <ScratchPreview 
              config={campaign.gameConfig?.scratch || {}} 
            />
          </div>
        );
      case 'memory':
        return (
          <div style={gameProps.style}>
            <MemoryPreview 
              config={campaign.gameConfig?.memory || {}} 
            />
          </div>
        );
      case 'puzzle':
        return (
          <div style={gameProps.style}>
            <PuzzlePreview 
              config={campaign.gameConfig?.puzzle || {}} 
            />
          </div>
        );
      case 'dice':
        return (
          <div style={gameProps.style}>
            <DicePreview 
              config={campaign.gameConfig?.dice || {}} 
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
    <div className={`relative w-full h-full ${className} flex items-center justify-center`} style={{ minHeight: '400px' }}>
      {/* Image de fond plein écran */}
      {gameBackgroundImage && (
        <img
          src={gameBackgroundImage}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ pointerEvents: 'none' }}
        />
      )}

      {/* Jeu centré avec contraintes de taille */}
      <div className="relative z-20 w-full h-full flex items-center justify-center p-4" style={{ maxWidth: '100%', maxHeight: '100%' }}>
        {renderGame()}
      </div>
    </div>
  );
};

export default GameCanvasPreview;
