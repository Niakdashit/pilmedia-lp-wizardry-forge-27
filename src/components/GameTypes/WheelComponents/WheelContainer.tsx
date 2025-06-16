
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
      overflow: shouldCropWheel ? 'hidden' : 'visible',
      padding: '20px',
      boxSizing: 'border-box'
    };

    // For cropped mobile views, adjust the container
    if (shouldCropWheel) {
      switch (gamePosition) {
        case 'left':
          return {
            ...baseStyle,
            width: `${gameDimensions.width / 2}px`,
            clipPath: 'inset(0 0 0 50%)',
            justifyContent: 'flex-start'
          };
        case 'right':
          return {
            ...baseStyle,
            width: `${gameDimensions.width / 2}px`,
            clipPath: 'inset(0 50% 0 0)',
            justifyContent: 'flex-end'
          };
        case 'bottom':
          return {
            ...baseStyle,
            height: `${gameDimensions.height / 2}px`,
            clipPath: 'inset(0 0 50% 0)',
            alignItems: 'flex-end'
          };
      }
    }

    return baseStyle;
  };

  return (
    <div style={getContainerStyles()}>
      {children}
    </div>
  );
};

export default WheelContainer;
