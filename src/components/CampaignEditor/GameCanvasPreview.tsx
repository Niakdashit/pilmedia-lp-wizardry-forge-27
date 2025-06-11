import React from 'react';
import GameRenderer from './GameRenderer';
import { GameSize } from '../configurators/GameSizeSelector';
import { getCampaignBackgroundImage } from '../../utils/background';

interface GameCanvasPreviewProps {
  campaign: any;
  gameSize: GameSize;
  gameBackgroundImage?: string;
  className?: string;
  previewDevice?: 'desktop' | 'tablet' | 'mobile';
}

const GameCanvasPreview: React.FC<GameCanvasPreviewProps> = ({
  campaign,
  gameSize,
  gameBackgroundImage,
  className = '',
  previewDevice = 'desktop'
}) => {
  // Résoudre l’image de fond à afficher
  const resolvedBackground =
    gameBackgroundImage || getCampaignBackgroundImage(campaign, previewDevice);

  // Styles du container principal (plein écran + image de fond)
  const mainContainerStyles: React.CSSProperties = {
    width: '100%',
    height: '100%',
    minHeight: '600px',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: campaign.design?.background || '#f8fafc'
  };

  if (resolvedBackground) {
    mainContainerStyles.backgroundImage = `url(${resolvedBackground})`;
    mainContainerStyles.backgroundSize = 'cover';
    mainContainerStyles.backgroundPosition = 'center';
    mainContainerStyles.backgroundRepeat = 'no-repeat';
  }

  return (
    <div className={`bg-white rounded-lg border-2 border-gray-200 overflow-hidden ${className}`}>
      <div style={mainContainerStyles}>
        {/* Overlay de lisibilité */}
        {resolvedBackground && (
          <div 
            className="absolute inset-0 bg-black/10" 
            style={{ zIndex: 1 }}
          />
        )}

        {/* Jeu centré */}
        <div 
          className="relative z-10"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%'
          }}
        >
          <GameRenderer
            campaign={campaign}
            gameSize={gameSize}
            previewDevice={previewDevice}
            buttonLabel={campaign.buttonConfig?.text || 'Jouer'}
            buttonColor={campaign.buttonConfig?.color || '#841b60'}
            gameBackgroundImage={resolvedBackground}
          />
        </div>
      </div>
    </div>
  );
};

export default GameCanvasPreview;
