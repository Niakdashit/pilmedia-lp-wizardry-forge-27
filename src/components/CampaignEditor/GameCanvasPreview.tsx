import React from 'react';
import { GameRenderer } from '../GameTypes';
import { GameSize, GAME_SIZES } from '../configurators/GameSizeSelector';
import { useGamePositionCalculator } from './GamePositionCalculator';

interface GameCanvasPreviewProps {
  campaign: any;
  gameSize: GameSize;
  gamePosition: string;
  gameBackgroundImage?: string;
}

const GameCanvasPreview: React.FC<GameCanvasPreviewProps> = ({
  campaign,
  gameSize,
  gamePosition,
  gameBackgroundImage
}) => {
  const { getPositionStyles } = useGamePositionCalculator({
    gameSize,
    gamePosition,
    shouldCropWheel: false
  });

  const centeredContainerStyle: React.CSSProperties = {
    width: '100%',
    height: '400px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    backgroundImage: gameBackgroundImage ? `url(${gameBackgroundImage})` : undefined,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  };

  return (
    <div className="bg-white rounded-lg border-2 border-gray-200 overflow-hidden">
      <div style={centeredContainerStyle}>
        <div style={getPositionStyles()}>
          <GameRenderer
            campaign={campaign}
            gameSize={gameSize}
            gamePosition={gamePosition}
            previewDevice="desktop"
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
