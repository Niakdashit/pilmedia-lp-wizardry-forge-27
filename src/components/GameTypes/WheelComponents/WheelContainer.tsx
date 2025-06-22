
import React from 'react';
import { GameDimensions } from '../../../hooks/useGameSize';

interface WheelContainerProps {
  children: React.ReactNode;
  gamePosition: 'top' | 'center' | 'bottom' | 'left' | 'right';
  gameDimensions: GameDimensions;
  previewDevice: 'desktop' | 'tablet' | 'mobile';
}

const WheelContainer: React.FC<WheelContainerProps> = ({
  children,
  gamePosition,
  gameDimensions,
  previewDevice
}) => {
  // Crop the wheel on mobile when placed left, right or bottom
  const isMobile = previewDevice === 'mobile';
  const isCroppablePosition = ['left', 'right', 'bottom'].includes(gamePosition);
  const shouldCropWheel = isMobile && isCroppablePosition;

  // Container style - always center by default, no matter the position setting
  const getContainerStyles = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '20px',
      position: 'relative',
      width: '100%',
      height: '100%',
      minHeight: '300px',
      overflow: 'hidden', // Always hidden to prevent overflow
      padding: '20px',
      boxSizing: 'border-box',
      maxWidth: '100%',
      maxHeight: '100%'
    };

    // For cropped mobile views, adjust the container
    if (shouldCropWheel) {
      switch (gamePosition) {
        case 'left':
          return {
            ...baseStyle,
            width: `${Math.min(gameDimensions.width / 2, 300)}px`,
            maxWidth: `${Math.min(gameDimensions.width / 2, 300)}px`,
            justifyContent: 'flex-start'
          };
        case 'right':
          return {
            ...baseStyle,
            width: `${Math.min(gameDimensions.width / 2, 300)}px`,
            maxWidth: `${Math.min(gameDimensions.width / 2, 300)}px`,
            justifyContent: 'flex-end'
          };
        case 'bottom':
          return {
            ...baseStyle,
            height: `${Math.min(gameDimensions.height / 2, 300)}px`,
            maxHeight: `${Math.min(gameDimensions.height / 2, 300)}px`,
            alignItems: 'flex-end'
          };
      }
    }

    return baseStyle;
  };

  return (
    <div style={getContainerStyles()}>
      <div className="w-full h-full overflow-hidden flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default WheelContainer;
