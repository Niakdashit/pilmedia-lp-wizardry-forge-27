import React from 'react';
import GameRenderer from './GameRenderer';
import { useGamePositionCalculator } from './GamePositionCalculator';
import { GAME_SIZES, GameSize } from '../configurators/GameSizeSelector';
import MobilePreview from './Mobile/MobilePreview';

interface GameCanvasPreviewProps {
  campaign: any;
  className?: string;
  previewDevice?: 'desktop' | 'tablet' | 'mobile';
}

const GameCanvasPreview: React.FC<GameCanvasPreviewProps> = ({
  campaign,
  className = "",
  previewDevice = 'desktop'
}) => {
  // Affichage Mobile & Tablette = composant device simulé
  if (previewDevice === 'mobile' || previewDevice === 'tablet') {
    return (
      <div className={`w-full h-full ${className}`}>
        <MobilePreview campaign={campaign} previewMode={previewDevice} />
      </div>
    );
  }

  // Desktop : rendu standard
  const baseBackgroundImage = campaign.gameConfig?.[campaign.type]?.backgroundImage || campaign.design?.backgroundImage;
  const gameBackgroundImage = baseBackgroundImage;
  const buttonLabel = campaign.gameConfig?.[campaign.type]?.buttonLabel || campaign.buttonConfig?.text || 'Jouer';
  const buttonColor = campaign.buttonConfig?.color || campaign.gameConfig?.[campaign.type]?.buttonColor || '#841b60';

  // Récup taille et position du jeu
  const gameSize: GameSize = campaign.gameSize && Object.keys(GAME_SIZES).includes(campaign.gameSize) ? campaign.gameSize as GameSize : 'medium';
  const gamePosition = campaign.gamePosition || 'center';

  // Desktop : pas de crop
  const shouldCropWheel = false;
  const { getPositionStyles } = useGamePositionCalculator({
    gameSize,
    gamePosition,
    shouldCropWheel
  });
  const gameContainerStyle = getPositionStyles();
  
  return (
    <div 
      className={`relative w-full h-full overflow-hidden ${className}`} 
      style={{ minHeight: '600px' }} 
      key={`game-preview-${gameSize}-${gamePosition}-${previewDevice}-${buttonColor}-${JSON.stringify(campaign.gameConfig?.[campaign.type])}`}
    >
      {/* Image de fond plein écran */}
      {gameBackgroundImage && (
        <img 
          src={gameBackgroundImage} 
          alt="Background" 
          className="absolute inset-0 w-full h-full object-cover z-0" 
          style={{ pointerEvents: 'none' }} 
        />
      )}

      {/* Conteneur pour le jeu avec positionnement dynamique */}
      <div className="relative z-20 w-full h-full flex my-0 py-0">
        <GameRenderer 
          campaign={campaign} 
          gameSize={gameSize} 
          gamePosition={gamePosition} 
          previewDevice={previewDevice} 
          gameContainerStyle={gameContainerStyle} 
          buttonLabel={buttonLabel} 
          buttonColor={buttonColor} 
          gameBackgroundImage={gameBackgroundImage} 
        />
      </div>
    </div>
  );
};

export default GameCanvasPreview;
