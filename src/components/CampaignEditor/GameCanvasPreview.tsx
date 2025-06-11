
import React from 'react';
import GameRenderer from './GameRenderer';
import { GameSize } from '../configurators/GameSizeSelector';
import useCenteredStyles from '../../hooks/useCenteredStyles';
import { getCampaignBackgroundImage } from '../../utils/background';

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
  gameBackgroundImage,
  className = '',
  previewDevice = 'desktop'
}) => {
  const { containerStyle, wrapperStyle } = useCenteredStyles();

  // Déterminer l'image de fond à appliquer
  const resolvedBackground =
    gameBackgroundImage || getCampaignBackgroundImage(campaign, previewDevice);

  // Style du conteneur principal avec image de fond
  const containerStyles: React.CSSProperties = {
    ...containerStyle,
    height: '400px',
    position: 'relative',
    overflow: 'hidden'
  };

  // Appliquer l'image de fond si elle existe
  if (resolvedBackground) {
    containerStyles.backgroundImage = `url(${resolvedBackground})`;
    containerStyles.backgroundSize = 'cover';
    containerStyles.backgroundPosition = 'center';
    containerStyles.backgroundRepeat = 'no-repeat';
  }

  return (
    <div className={`bg-white rounded-lg border-2 border-gray-200 overflow-hidden ${className}`}>
      <div style={containerStyles}>
        {/* Overlay pour améliorer la lisibilité si image de fond */}
        {resolvedBackground && (
          <div className="absolute inset-0 bg-black/10" />
        )}

        {/* Conteneur du jeu - toujours centré par défaut */}
        <div className="relative z-10" style={wrapperStyle}>
          <GameRenderer
            campaign={campaign}
            gameSize={gameSize}
            gamePosition="center" // Toujours centré dans le preview
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
