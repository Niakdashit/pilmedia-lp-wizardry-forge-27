
import React from 'react';
import Jackpot from '../GameTypes/Jackpot';
import { Quiz } from '../GameTypes';
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
  
  const selectedTemplateId = campaign?.design?.template || campaign?.gameConfig?.jackpot?.template;
  const selectedSize: number = campaign.gameConfig?.[campaign.type]?.gameSize || 1;
  
  const GAME_SIZES: Record<number, { width: number; height: number }> = {
    1: { width: 300, height: 200 },
    2: { width: 400, height: 300 },
    3: { width: 500, height: 400 },
    4: { width: 600, height: 500 }
  };

  const currentSize = GAME_SIZES[selectedSize] || GAME_SIZES[1];

  console.log('GameCanvasPreview - campaign:', campaign);
  console.log('GameCanvasPreview - campaign.type:', campaign.type);
  console.log('GameCanvasPreview - wheel config:', campaign.gameConfig?.wheel);
  console.log('GameCanvasPreview - roulette config:', campaign.config?.roulette);

  const renderGame = () => {
    // Props communes pour tous les jeux avec taille prédéfinie
    const gameProps = {
      style: { 
        width: currentSize.width, 
        height: currentSize.height,
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
        // Fusionner les configurations de différentes sources
        const wheelConfig = {
          ...campaign.gameConfig?.wheel,
          ...campaign.config?.roulette,
          // S'assurer qu'on a des segments par défaut si aucune configuration
          segments: campaign.config?.roulette?.segments || 
                   campaign.gameConfig?.wheel?.segments || 
                   campaign.gameConfig?.wheel?.prizes ||
                   ['Segment 1', 'Segment 2', 'Segment 3', 'Segment 4'],
          colors: campaign.config?.roulette?.colors || 
                 campaign.gameConfig?.wheel?.colors ||
                 ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4']
        };
        
        console.log('Final wheel config:', wheelConfig);
        
        return (
          <Wheel
            config={wheelConfig}
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
      className={`relative w-full flex items-center justify-center bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 ${className}`} 
      style={{ 
        // Container fixe qui ne change pas de taille
        minHeight: '400px',
        height: '500px',
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

      {/* Jeu avec taille prédéfinie centré */}
      <div 
        className="relative z-20 flex items-center justify-center bg-white rounded-lg shadow-sm" 
        style={{ 
          width: currentSize.width, 
          height: currentSize.height,
          minWidth: currentSize.width,
          minHeight: currentSize.height,
        }}
      >
        {renderGame()}
      </div>
    </div>
  );
};

export default GameCanvasPreview;
