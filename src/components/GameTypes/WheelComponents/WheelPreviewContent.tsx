
import React from 'react';
import ValidationMessage from '../../common/ValidationMessage';
import WheelCanvas from './WheelCanvas';
import WheelPointer from './WheelPointer';
import WheelDecorations from './WheelDecorations';
import WheelInteractionHandler from './WheelInteractionHandler';

interface WheelPreviewContentProps {
  segments: any[];
  rotation: number;
  centerImage?: string;
  centerLogo?: string;
  theme: string;
  customColors?: any;
  borderColor: string;
  borderOutlineColor: string;
  canvasSize: number;
  containerWidth: number;
  containerHeight: number;
  pointerSize: number;
  shouldCropWheel: boolean;
  gamePosition: 'top' | 'center' | 'bottom' | 'left' | 'right';
  formValidated: boolean;
  showValidationMessage: boolean;
  onWheelClick: () => void;
}

const WheelPreviewContent: React.FC<WheelPreviewContentProps> = ({
  segments,
  rotation,
  centerImage,
  centerLogo,
  theme,
  customColors,
  borderColor,
  borderOutlineColor,
  canvasSize,
  containerWidth,
  containerHeight,
  pointerSize,
  shouldCropWheel,
  gamePosition,
  formValidated,
  showValidationMessage,
  onWheelClick
}) => {
  const getContainerStyle = () => {
    const baseStyle = {
      position: 'relative' as const,
      width: containerWidth,
      height: containerHeight,
      overflow: shouldCropWheel ? 'hidden' : 'visible',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    };

    return baseStyle;
  };

  const getWheelOffset = () => {
    if (!shouldCropWheel) return { left: 0, top: 0 };
    
    switch (gamePosition) {
      case 'left':
        return { left: -canvasSize * 0.4, top: 0 };
      case 'right':
        return { left: canvasSize * 0.4, top: 0 };
      case 'bottom':
        return { left: 0, top: canvasSize * 0.3 };
      default:
        return { left: 0, top: 0 };
    }
  };

  const wheelOffset = getWheelOffset();

  return (
    <div style={getContainerStyle()}>
      {/* Ombre de la roue */}
      <div 
        style={{
          position: 'absolute',
          width: canvasSize - 20,
          height: canvasSize - 20,
          left: wheelOffset.left + 10,
          top: wheelOffset.top + 15,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.05) 50%, transparent 70%)',
          filter: 'blur(8px)',
          zIndex: 0
        }}
      />
      
      <WheelInteractionHandler
        formValidated={formValidated}
        onWheelClick={onWheelClick}
      >
        <div style={{
          position: 'relative',
          left: wheelOffset.left,
          top: wheelOffset.top
        }}>
          <WheelCanvas
            segments={segments}
            rotation={rotation}
            centerImage={centerImage}
            centerLogo={centerLogo}
            theme={theme}
            customColors={customColors}
            borderColor={borderColor}
            borderOutlineColor={borderOutlineColor}
            canvasSize={canvasSize}
            offset="0px"
          />
          
          <WheelDecorations
            theme={theme}
            canvasSize={canvasSize}
            shouldCropWheel={shouldCropWheel}
            gamePosition={gamePosition}
          />
          
          <WheelPointer
            canvasSize={canvasSize}
            shouldCropWheel={shouldCropWheel}
            gamePosition={gamePosition}
            pointerSize={pointerSize}
          />
        </div>
      </WheelInteractionHandler>

      <ValidationMessage
        show={showValidationMessage}
        message="Formulaire validé ! Vous pouvez maintenant jouer."
        type="success"
      />
    </div>
  );
};

export default WheelPreviewContent;
