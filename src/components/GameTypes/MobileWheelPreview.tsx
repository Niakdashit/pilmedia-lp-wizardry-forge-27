import React from 'react';
import WheelCanvas from './MobileWheel/WheelCanvas';
import WheelDecorations from './MobileWheel/WheelDecorations';
import WheelPointer from './MobileWheel/WheelPointer';

interface MobileWheelPreviewProps {
  campaign: any;
  gamePosition?: 'left' | 'right' | 'center' | 'top' | 'bottom';
  verticalOffset?: number;
}

const CANVAS_SIZE = 280;

const MobileWheelPreview: React.FC<MobileWheelPreviewProps> = ({
  campaign,
  gamePosition = 'center',
  verticalOffset = 0
}) => {
  const mobileRouletteConfig = campaign?.mobileConfig?.roulette || {};
  const desktopRouletteConfig = campaign?.config?.roulette || {};
  const segments = desktopRouletteConfig.segments || [];
  const centerImage = desktopRouletteConfig.centerImage;
  const theme = desktopRouletteConfig.theme || 'default';
  const borderColor = desktopRouletteConfig.borderColor || '#841b60';
  const pointerColor = desktopRouletteConfig.pointerColor || '#841b60';

  const canvasSize =
    mobileRouletteConfig.size ||
    mobileRouletteConfig.width ||
    desktopRouletteConfig.size ||
    desktopRouletteConfig.width ||
    CANVAS_SIZE;

  if (segments.length === 0) {
    return null;
  }

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
          left: '0px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: canvasSize / 2,
          height: canvasSize,
          overflow: 'hidden'
        };
      case 'right':
        return {
          ...baseStyle,
          right: '0px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: canvasSize / 2,
          height: canvasSize,
          overflow: 'hidden'
        };
      case 'top':
        return {
          ...baseStyle,
          top: `${verticalOffset}%`,
          left: '50%',
          transform: 'translateX(-50%)',
          width: canvasSize,
          height: canvasSize / 2,
          overflow: 'hidden'
        };
      case 'bottom':
        return {
          ...baseStyle,
          bottom: `${-verticalOffset}%`,
          left: '50%',
          transform: 'translateX(-50%)',
          width: canvasSize,
          height: canvasSize / 2,
          overflow: 'hidden'
        };
      case 'center':
      default:
        return {
          ...baseStyle,
          top: '50%',
          left: '50%',
          transform: `translate(-50%, calc(-50% + ${verticalOffset}%))`,
          width: canvasSize,
          height: canvasSize
        };
    }
  };

  const getCanvasOffset = (): { top: string; left: string } => {
    switch (gamePosition) {
      case 'left':
        return { top: '0px', left: '0px' };
      case 'right':
        return { top: '0px', left: `-${canvasSize / 2}px` };
      case 'top':
        return { top: '0px', left: '0px' };
      case 'bottom':
        return { top: `-${canvasSize / 2}px`, left: '0px' };
      default:
        return { top: '0px', left: '0px' };
    }
  };

  const containerWidth = ['left', 'right'].includes(gamePosition) ? canvasSize / 2 : canvasSize;
  const containerHeight = ['top', 'bottom'].includes(gamePosition) ? canvasSize / 2 : canvasSize;
  const shouldCropWheel = ['left', 'right', 'top', 'bottom'].includes(gamePosition);
  const offset = getCanvasOffset();

  const renderWheelContainer = () => (
    <div style={{ 
      position: 'relative', 
      width: containerWidth, 
      height: containerHeight, 
      overflow: shouldCropWheel ? 'hidden' : 'visible' 
    }}>
      <div style={{ position: 'absolute', top: offset.top, left: offset.left }}>
        <WheelCanvas
          segments={segments}
          centerImage={centerImage}
          theme={theme}
          borderColor={borderColor}
          canvasSize={canvasSize}
          offset={offset.left}
        />
        <WheelDecorations
          theme={theme}
          canvasSize={canvasSize}
          offset={offset.left}
        />
      </div>

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
