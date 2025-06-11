
import React from 'react';
import GameRenderer from './GameRenderer';
import { GameSize } from '../configurators/GameSizeSelector';

interface GameCanvasPreviewProps {
  campaign: any;
  gameSize: GameSize;
  gamePosition: string;
  gameBackgroundImage?: string;
  className?: string;
  previewDevice?: 'desktop' | 'tablet' | 'mobile';
}

const GameCanvasPreview: React.FC<GameCanvasPreviewProps> = ({
  campaign,
  gameSize,
  gamePosition,
  gameBackgroundImage,
  className = '',
  previewDevice = 'desktop'
}) => {
  // Style du conteneur principal avec image de fond
  const containerStyle: React.CSSProperties = {
    width: '100%',
    height: '400px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden'
  };

  // Appliquer l'image de fond si elle existe
  if (gameBackgroundImage) {
    containerStyle.backgroundImage = `url(${gameBackgroundImage})`;
    containerStyle.backgroundSize = 'cover';
    containerStyle.backgroundPosition = 'center';
    containerStyle.backgroundRepeat = 'no-repeat';
  }

  return (
    <div className={`bg-white rounded-lg border-2 border-gray-200 overflow-hidden ${className}`}>
      <div style={containerStyle}>
        {/* Overlay pour améliorer la lisibilité si image de fond */}
        {gameBackgroundImage && (
          <div className="absolute inset-0 bg-black/10" />
        )}
        
        {/* Conteneur du jeu - toujours centré par défaut */}
        <div className="relative z-10 flex items-center justify-center w-full h-full">
          <GameRenderer
            campaign={campaign}
            gameSize={gameSize}
            gamePosition="center" // Toujours centré dans le preview
            previewDevice={previewDevice}
            buttonLabel={campaign.buttonConfig?.text || 'Jouer'}
            buttonColor={campaign.buttonConfig?.color || '#841b60'}
            gameBackgroundImage={gameBackgroundImage}
          />
        </div>
      </div>
    </div>
  );
};

export default GameCanvasPreview;
