
import React, { useState } from 'react';
import Jackpot from '../GameTypes/Jackpot';
import { Quiz } from '../GameTypes';
import WheelPreview from '../GameTypes/WheelPreview';
import MemoryPreview from '../GameTypes/MemoryPreview';
import PuzzlePreview from '../GameTypes/PuzzlePreview';
import ScratchPreview from '../GameTypes/ScratchPreview';
import DicePreview from '../GameTypes/DicePreview';
import GameSizeSelector, { GameSize } from '../configurators/GameSizeSelector';

interface GameCanvasPreviewProps {
  campaign: any;
  className?: string;
}

const GameCanvasPreview: React.FC<GameCanvasPreviewProps> = ({
  campaign,
  className = ""
}) => {
  const [gameSize, setGameSize] = useState<GameSize>('small');
  
  const gameBackgroundImage = campaign.gameConfig?.[campaign.type]?.backgroundImage;
  const buttonLabel = campaign.gameConfig?.[campaign.type]?.buttonLabel || 'Lancer le Jackpot';
  const buttonColor = campaign.gameConfig?.[campaign.type]?.buttonColor || '#ec4899';
  
  // Récupération du template sélectionné
  const selectedTemplateId = campaign?.design?.template || campaign?.gameConfig?.jackpot?.template;

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
            selectedTemplate={selectedTemplateId}
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
          />
        );
      case 'scratch':
        return (
          <ScratchPreview 
            config={campaign.gameConfig?.scratch || {}} 
          />
        );
      case 'memory':
        return (
          <MemoryPreview 
            config={campaign.gameConfig?.memory || {}} 
          />
        );
      case 'puzzle':
        return (
          <PuzzlePreview 
            config={campaign.gameConfig?.puzzle || {}} 
          />
        );
      case 'dice':
        return (
          <DicePreview 
            config={campaign.gameConfig?.dice || {}} 
          />
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
    <div className={`relative w-full h-full ${className}`} style={{ minHeight: '600px' }}>
      {/* Image de fond plein écran */}
      {gameBackgroundImage && (
        <img
          src={gameBackgroundImage}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ pointerEvents: 'none' }}
        />
      )}

      {/* Panneau de contrôle des tailles */}
      <div className="absolute top-4 right-4 z-30 bg-white p-4 rounded-lg shadow-lg border">
        <GameSizeSelector
          selectedSize={gameSize}
          onSizeChange={setGameSize}
        />
      </div>

      {/* Jeu centré avec taille fixe */}
      <div className="relative z-20 w-full h-full flex items-center justify-center p-4">
        {renderGame()}
      </div>
    </div>
  );
};

export default GameCanvasPreview;
