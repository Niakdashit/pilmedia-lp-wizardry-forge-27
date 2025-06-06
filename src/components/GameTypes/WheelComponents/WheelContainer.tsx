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
  // Check if we're on mobile/tablet and position is left/right for 50% cropping
  const isMobileTablet = previewDevice === 'mobile' || previewDevice === 'tablet';
  const isLeftRightPosition = gamePosition === 'left' || gamePosition === 'right';
  const shouldCropWheel = isMobileTablet && isLeftRightPosition;
  const getAbsolutePositionStyles = (): React.CSSProperties => {
    const containerStyle: React.CSSProperties = {
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px',
      zIndex: 10
    };
    const safeMargin = 20;
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
          flexDirection: shouldCropWheel ? 'row-reverse' : 'row',
          left: shouldCropWheel ? '0px' : `${safeMargin}px`,
          top: '50%',
          transform: 'translateY(-50%)',
          width: `${gameDimensions.width}px`,
          height: `${gameDimensions.height}px`
        };
      case 'right':
        return {
          ...containerStyle,
          flexDirection: shouldCropWheel ? 'row' : 'row-reverse',
          right: shouldCropWheel ? '0px' : `${safeMargin}px`,
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
  return <div style={getAbsolutePositionStyles()} className="px-[71px]">
      {children}
    </div>;
};
export default WheelContainer;