
import React from 'react';
import Jackpot from '../GameTypes/Jackpot';
import { Quiz } from '../GameTypes';
import WheelPreview from '../GameTypes/WheelPreview';
import MemoryPreview from '../GameTypes/MemoryPreview';
import PuzzlePreview from '../GameTypes/PuzzlePreview';
import ScratchPreview from '../GameTypes/ScratchPreview';
import DicePreview from '../GameTypes/DicePreview';
import { Wheel } from '../GameTypes';

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
    // Props communes pour tous les jeux - 100% responsive
    const gameProps = {
      style: { 
        width: '50%', 
        height: '50%',
        minHeight: '300px',
        maxWidth: '100%', 
        maxHeight: '100%'
      },
      className: 'w-full h-full'
    };

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
            selectedTemplate={selectedTemplateId}
            {...gameProps}
          />
        );
      case 'quiz':
        return (
          <Quiz 
            config={campaign.gameConfig?.quiz || {}} 
            campaign={campaign}
            {...gameProps}
          />
        );
      case 'wheel':
        return (
          <Wheel
            config={campaign.gameConfig?.wheel || {}}
            isPreview={true}
            previewMode="desktop"
            {...gameProps}
          />
        );
      case 'scratch':
        return (
          <div className="w-full h-full flex items-center justify-center">
            <ScratchPreview 
              config={campaign.gameConfig?.scratch || {}} 
            />
          </div>
        );
      case 'memory':
        return (
          <div className="w-full h-full flex items-center justify-center">
            <MemoryPreview 
              config={campaign.gameConfig?.memory || {}} 
            />
          </div>
        );
      case 'puzzle':
        return (
          <div className="w-full h-full flex items-center justify-center">
            <PuzzlePreview 
              config={campaign.gameConfig?.puzzle || {}} 
            />
          </div>
        );
      case 'dice':
        return (
          <div className="w-full h-full flex items-center justify-center">
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
    <div 
      className={`relative w-full flex items-center justify-center ${className}`} 
      style={{ 
        minHeight: '400px',
        height: '500px',
        backgroundColor: '#f8f9fa',
        border: '2px dashed #e9ecef',
        borderRadius: '8px',
        padding: '20px'
      }}
    >
      {/* Image de fond plein écran */}
      {gameBackgroundImage && (
        <img
          src={gameBackgroundImage}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover z-0 rounded-lg"
          style={{ pointerEvents: 'none' }}
        />
      )}

      {/* Jeu responsive centré */}
      <div className="relative z-20 w-full h-full flex items-center justify-center">
        {renderGame()}
      </div>
    </div>
  );
};

export default GameCanvasPreview;
