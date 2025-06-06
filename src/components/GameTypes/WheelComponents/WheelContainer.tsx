
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

  const getAbsolutePositionStyles = (): React.CSSProperties => {
    const containerStyle: React.CSSProperties = {
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px',
      zIndex: 10,
      overflow: shouldCropWheel ? 'hidden' : 'visible'
    };

    const safeMargin = 20;

    // When cropping, position the wheel so only the desired part is visible
    if (shouldCropWheel) {
      switch (gamePosition) {
        case 'left':
          // Position la roue pour que seule la moitié droite soit visible
          return {
            ...containerStyle,
            flexDirection: 'row-reverse',
            left: `0px`,
            top: '50%',
            transform: 'translateY(-50%)',
            width: `${gameDimensions.width / 2}px`, // Container ne montre que la moitié
            height: `${gameDimensions.height}px`,
            clipPath: 'inset(0 0 0 50%)', // Coupe la moitié gauche
          };
        case 'right':
          // Position la roue pour que seule la moitié gauche soit visible
          return {
            ...containerStyle,
            flexDirection: 'row',
            right: `0px`,
            top: '50%',
            transform: 'translateY(-50%)',
            width: `${gameDimensions.width / 2}px`, // Container ne montre que la moitié
            height: `${gameDimensions.height}px`,
            clipPath: 'inset(0 50% 0 0)', // Coupe la moitié droite
          };
        case 'bottom':
          // Position la roue pour que seule la moitié haute soit visible
          return {
            ...containerStyle,
            flexDirection: 'column',
            bottom: `0px`,
            left: '50%',
            transform: 'translateX(-50%)',
            width: `${gameDimensions.width}px`,
            height: `${gameDimensions.height / 2}px`, // Container ne montre que la moitié
            clipPath: 'inset(0 0 50% 0)', // Coupe la moitié basse
          };
      }
    }

    // Default positioning for non-cropped cases
    switch (gamePosition) {
      case 'top':
        return {
          ...containerStyle,
          flexDirection: 'column-reverse',
          top: `${safeMargin}px`,
          left: '50%',
          transform: 'translateX(-50%)',
          width: `${gameDimensions.width}px`,
          height: `${gameDimensions.height}px`
        };
      case 'bottom':
        return {
          ...containerStyle,
          flexDirection: 'column',
          bottom: `${safeMargin}px`,
          left: '50%',
          transform: 'translateX(-50%)',
          width: `${gameDimensions.width}px`,
          height: `${gameDimensions.height}px`
        };
      case 'left':
        return {
          ...containerStyle,
          flexDirection: 'row-reverse',
          left: `${safeMargin}px`,
          top: '50%',
          transform: 'translateY(-50%)',
          width: `${gameDimensions.width}px`,
          height: `${gameDimensions.height}px`
        };
      case 'right':
        return {
          ...containerStyle,
          flexDirection: 'row-reverse',
          right: `${safeMargin}px`,
          top: '50%',
          transform: 'translateY(-50%)',
          width: `${gameDimensions.width}px`,
          height: `${gameDimensions.height}px`
        };
      default:
        // center
        return {
          ...containerStyle,
          flexDirection: 'column',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: `${gameDimensions.width}px`,
          height: `${gameDimensions.height}px`
        };
    }
  };

  return (
    <div style={getAbsolutePositionStyles()}>
      {children}
    </div>
  );
};

export default WheelContainer;
