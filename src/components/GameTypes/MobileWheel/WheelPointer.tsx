
import React from 'react';

interface WheelPointerProps {
  pointerColor: string;
  gamePosition: 'left' | 'right' | 'center' | 'top' | 'bottom';
  containerWidth: number;
  canvasSize: number;
  shouldCropWheel: boolean;
}

const WheelPointer: React.FC<WheelPointerProps> = ({
  pointerColor,
  gamePosition,
  containerWidth,
  canvasSize,
  shouldCropWheel
}) => {
  const getPointerPosition = () => {
    if (shouldCropWheel) {
      return gamePosition === 'left' 
        ? containerWidth - 15  // Pour left, pointeur au bord droit du conteneur visible
        : -15;  // Pour right, pointeur au bord gauche du conteneur visible
    }
    return canvasSize / 2 - 15;  // Position normale au centre
  };

  return (
    <div
      style={{
        position: 'absolute',
        left: getPointerPosition(),
        top: -20,
        width: 30,
        height: 50,
        zIndex: 3,
        pointerEvents: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      <svg width="30" height="50">
        <polygon
          points="15,50 27,15 3,15"
          fill={pointerColor}
          stroke="#fff"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
};

export default WheelPointer;
