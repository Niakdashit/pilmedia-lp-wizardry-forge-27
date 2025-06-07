
import React from 'react';
import WheelCanvas from './MobileWheel/WheelCanvas';
import WheelDecorations from './MobileWheel/WheelDecorations';
import WheelPointer from './MobileWheel/WheelPointer';

interface MobileWheelPreviewProps {
  campaign: any;
  gamePosition?: 'left' | 'right' | 'center' | 'top' | 'bottom';
  verticalOffset?: number;
  horizontalOffset?: number;
}

const CANVAS_SIZE = 280;
const MAX_DISPLAY_PERCENTAGE = 50; // Maximum 50% of screen display

const MobileWheelPreview: React.FC<MobileWheelPreviewProps> = ({
  campaign,
  gamePosition = 'center',
  verticalOffset = 0,
  horizontalOffset = 0
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
      pointerEvents: 'none',
      width: canvasSize,
      height: canvasSize,
      overflow: 'hidden' // Ensure cropping
    };

    // Calculate limited offsets to ensure max 50% display
    const maxOffset = 25; // Reduced from 50 to ensure 50% max display
    const limitedVerticalOffset = Math.max(-maxOffset, Math.min(maxOffset, verticalOffset));
    const limitedHorizontalOffset = Math.max(-maxOffset, Math.min(maxOffset, horizontalOffset));

    switch (gamePosition) {
      case 'left':
        return {
          ...baseStyle,
          top: '50%',
          left: `${-25 + limitedHorizontalOffset}%`, // Start at -25% max to show only 50%
          transform: 'translateY(-50%)',
          width: '50%', // Limit width to 50%
          height: canvasSize
        };
      case 'right':
        return {
          ...baseStyle,
          top: '50%',
          right: `${-25 + Math.abs(limitedHorizontalOffset)}%`, // Start at -25% max to show only 50%
          transform: 'translateY(-50%)',
          width: '50%', // Limit width to 50%
          height: canvasSize
        };
      case 'top':
        return {
          ...baseStyle,
          top: `${-25 + limitedVerticalOffset}%`, // Start at -25% max to show only 50%
          left: '50%',
          transform: 'translateX(-50%)',
          width: canvasSize,
          height: '50%' // Limit height to 50%
        };
      case 'bottom':
        return {
          ...baseStyle,
          bottom: `${-25 + Math.abs(limitedVerticalOffset)}%`, // Start at -25% max to show only 50%
          left: '50%',
          transform: 'translateX(-50%)',
          width: canvasSize,
          height: '50%' // Limit height to 50%
        };
      case 'center':
      default:
        return {
          ...baseStyle,
          top: '50%',
          left: '50%',
          transform: `translate(calc(-50% + ${limitedHorizontalOffset}%), calc(-50% + ${limitedVerticalOffset}%))`,
          maxWidth: '50%', // Ensure center position doesn't exceed 50%
          maxHeight: '50%'
        };
    }
  };

  const getCanvasOffset = (): { top: string; left: string } => {
    return { top: '0px', left: '0px' };
  };

  const containerWidth = canvasSize;
  const containerHeight = canvasSize;
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
