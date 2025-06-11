
import React from 'react';
import GameRenderer from './GameRenderer';
import { GameSize } from '../configurators/GameSizeSelector';
import useCenteredStyles from '../../hooks/useCenteredStyles';
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
  const { containerStyle, wrapperStyle } = useCenteredStyles();

  // Déterminer l'image de fond à appliquer
  const resolvedBackground =
    gameBackgroundImage || getCampaignBackgroundImage(campaign, previewDevice);

  // Style du conteneur principal avec image de fond - couvre tout l'aperçu
  const previewContainerStyles: React.CSSProperties = {
    width: '100%',
    height: '100%',
    minHeight: '400px',
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: campaign.design?.background || '#f8fafc'
  };

  // Appliquer l'image de fond si elle existe
  if (resolvedBackground) {
    previewContainerStyles.backgroundImage = `url(${resolvedBackground})`;
    previewContainerStyles.backgroundSize = 'cover';
    previewContainerStyles.backgroundPosition = 'center';
    previewContainerStyles.backgroundRepeat = 'no-repeat';
  }

  // Style du conteneur du jeu - transparent pour laisser voir l'image de fond
  const gameContainerStyles: React.CSSProperties = {
    ...containerStyle,
    height: '100%',
    position: 'relative',
    backgroundColor: 'transparent'
  };

  return (
    <div className={`bg-white rounded-lg border-2 border-gray-200 overflow-hidden ${className}`}>
      <div style={previewContainerStyles}>
        {/* Overlay pour améliorer la lisibilité si image de fond */}
        {resolvedBackground && (
          <div className="absolute inset-0 bg-black/10" />
        )}

        {/* Conteneur du jeu - toujours centré par défaut */}
        <div className="relative z-10" style={gameContainerStyles}>
          <div style={wrapperStyle}>
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
    </div>
  );
};

export default GameCanvasPreview;
