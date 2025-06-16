
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
  return (
    <div style={{ 
      position: 'relative', 
      width: containerWidth,
      height: containerHeight,
      overflow: shouldCropWheel ? 'hidden' : 'visible'
    }}>
      {/* Ombre placée sous la roue avec z-index négatif */}
      <div 
        style={{
          position: 'absolute',
          width: canvasSize - 15,
          height: canvasSize - 15,
          left:
            shouldCropWheel && gamePosition === 'right'
              ? `-${canvasSize * 0.5 + 8}px`
              : '8px',
          top: '12px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,215,0,0.2) 0%, rgba(255,215,0,0.05) 50%, rgba(0,0,0,0.1) 100%)',
          filter: 'blur(10px)',
          zIndex: -1
        }}
      />
      
      <WheelInteractionHandler
        formValidated={formValidated}
        onWheelClick={onWheelClick}
      >
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
          offset={
            shouldCropWheel && gamePosition === 'left'
              ? `-${canvasSize * 0.5}px`
              : '0px'
          }
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
