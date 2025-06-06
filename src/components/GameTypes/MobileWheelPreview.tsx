import React from 'react';
import WheelCanvas from './MobileWheel/WheelCanvas';
import WheelDecorations from './MobileWheel/WheelDecorations';
import WheelPointer from './MobileWheel/WheelPointer';

interface MobileWheelPreviewProps {
  campaign: any;
  gamePosition?: 'left' | 'right' | 'center' | 'top' | 'bottom';
}

const CANVAS_SIZE = 280;

const MobileWheelPreview: React.FC<MobileWheelPreviewProps> = ({
  campaign,
  gamePosition = 'center'
}) => {
  const mobileRouletteConfig = campaign?.mobileConfig?.roulette || campaign?.config?.roulette || {};
  const segments = mobileRouletteConfig.segments || campaign?.config?.roulette?.segments || [];
  const centerImage = mobileRouletteConfig.centerImage || campaign?.config?.roulette?.centerImage;
  const theme = mobileRouletteConfig.theme || campaign?.config?.roulette?.theme || 'default';
  const borderColor = mobileRouletteConfig.borderColor || campaign?.config?.roulette?.borderColor || '#841b60';
  const pointerColor = mobileRouletteConfig.pointerColor || campaign?.config?.roulette?.pointerColor || '#841b60';

  const canvasSize = mobileRouletteConfig.size || mobileRouletteConfig.width || campaign?.config?.roulette?.size || campaign?.config?.roulette?.width || CANVAS_SIZE;

  if (segments.length === 0) {
    return null;
  }

  // Positionnement absolu pour chaque position avec cropping correct
  const getAbsoluteGameStyle = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      position: 'absolute',
      zIndex: 10,
      pointerEvents: 'none'
    };

    switch (gamePosition) {
     case 'left':
  return {
    ...baseStyle,
    left: '50px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: canvasSize / 2,
    height: canvasSize,
    overflow: 'hidden'
  };
      
      case 'right':
        return {
          ...baseStyle,
          right: `0px`,
          top: '50%',
          transform: 'translateY(-50%)',
          width: canvasSize / 2, // Conteneur réduit à 50%
          height: canvasSize,
          overflow: 'hidden'
        };
      
      case 'top':
        return {
          ...baseStyle,
          top: `0px`,
          left: '50%',
          transform: 'translateX(-50%)',
          width: canvasSize,
          height: canvasSize / 2, // Conteneur réduit à 50%
          overflow: 'hidden'
        };
      
      case 'bottom':
        return {
          ...baseStyle,
          bottom: `0px`,
          left: '50%',
          transform: 'translateX(-50%)',
          width: canvasSize,
          height: canvasSize / 2, // Conteneur réduit à 50%
          overflow: 'hidden'
        };
      
      case 'center':
      default:
        return {
          ...baseStyle,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: canvasSize,
          height: canvasSize
        };
    }
  };

  // Détermine l'offset du canvas dans le conteneur pour les positions croppées
  const getCanvasOffset = () => {
    switch (gamePosition) {
      case 'left':
        return '0px'; // Canvas à gauche du conteneur, seule la partie droite visible
      case 'right':
        return `-${canvasSize / 2}px`; // Canvas décalé à gauche, seule la partie gauche visible
      case 'bottom':
        return '0px'; // Canvas en haut du conteneur, seule la partie haute visible
      default:
        return '0px';
    }
  };

  const containerWidth = ['left', 'right'].includes(gamePosition) ? canvasSize / 2 : canvasSize;
  const containerHeight = ['top', 'bottom'].includes(gamePosition) ? canvasSize / 2 : canvasSize;
  const shouldCropWheel = ['left', 'right', 'bottom'].includes(gamePosition);

  const renderWheelContainer = () => (
    <div style={{ 
      position: 'relative', 
      width: containerWidth, 
      height: containerHeight, 
      overflow: shouldCropWheel ? 'hidden' : 'visible' 
    }}>
      <WheelCanvas
        segments={segments}
        centerImage={centerImage}
        theme={theme}
        borderColor={borderColor}
        canvasSize={canvasSize}
        offset={getCanvasOffset()}
      />
      
      <WheelDecorations
        theme={theme}
        canvasSize={canvasSize}
        offset={getCanvasOffset()}
      />
      
      <WheelPointer
        pointerColor={pointerColor}
        gamePosition={gamePosition}
        containerWidth={containerWidth}
        canvasSize={canvasSize}
        shouldCropWheel={shouldCropWheel}
      />
    </div>
  );

  return (
    <div style={getAbsoluteGameStyle()}>
      {renderWheelContainer()}
    </div>
  );
};

export default MobileWheelPreview;
