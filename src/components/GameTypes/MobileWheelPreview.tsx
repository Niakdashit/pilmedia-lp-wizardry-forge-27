import React from 'react';
import WheelCanvas from './MobileWheel/WheelCanvas';
import WheelDecorations from './MobileWheel/WheelDecorations';
import WheelPointer from './MobileWheel/WheelPointer';
import { getContainerWidth, getCanvasOffset, getGameAbsoluteStyle } from './MobileWheel/utils';

interface MobileWheelPreviewProps {
  campaign: any;
  gamePosition?: 'left' | 'right' | 'center' | 'top' | 'bottom';
}

const CANVAS_SIZE = 280;

const MobileWheelPreview: React.FC<MobileWheelPreviewProps> = ({
  campaign,
  gamePosition = 'center'
}) => {
  const mobileRouletteConfig = campaign?.mobileConfig?.roulette || {};
  const segments = mobileRouletteConfig.segments || [];
  const centerImage = mobileRouletteConfig.centerImage;
  const theme = mobileRouletteConfig.theme || 'default';
  const borderColor = mobileRouletteConfig.borderColor || '#841b60';
  const pointerColor = mobileRouletteConfig.pointerColor || '#841b60';

  const canvasSize = mobileRouletteConfig.size || mobileRouletteConfig.width || CANVAS_SIZE;

  // Déterminer si on doit afficher la roue à 50% (positions left/right)
  const shouldCropWheel = gamePosition === 'left' || gamePosition === 'right';
  
  const containerWidth = getContainerWidth(canvasSize, shouldCropWheel);

  if (segments.length === 0) {
    return null;
  }

  const canvasOffset = getCanvasOffset(shouldCropWheel, gamePosition, canvasSize);

  const renderWheelContainer = () => (
    <div style={{ position: 'relative', width: canvasSize, height: canvasSize }}>
      <WheelCanvas
        segments={segments}
        centerImage={centerImage}
        theme={theme}
        borderColor={borderColor}
        canvasSize={canvasSize}
        offset={canvasOffset}
      />
      
      <WheelDecorations
        theme={theme}
        canvasSize={canvasSize}
        offset={canvasOffset}
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
    <div style={getGameAbsoluteStyle(gamePosition, containerWidth, canvasSize)}>
      {renderWheelContainer()}
    </div>
  );
};

export default MobileWheelPreview;
