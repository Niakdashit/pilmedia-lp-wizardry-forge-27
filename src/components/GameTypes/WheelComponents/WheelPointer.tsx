
import React from 'react';

interface WheelPointerProps {
  canvasSize: number;
  shouldCropWheel: boolean;
  gamePosition: 'top' | 'center' | 'bottom' | 'left' | 'right';
  pointerSize: number;
}

const WheelPointer: React.FC<WheelPointerProps> = ({
  canvasSize,
  shouldCropWheel,
  gamePosition,
  pointerSize
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: (shouldCropWheel ? (gamePosition === 'left' ? 0 : -canvasSize * 0.5) : canvasSize / 2) + canvasSize / 2 - pointerSize / 2,
        top: -pointerSize * 0.7,
        width: pointerSize,
        height: pointerSize * 1.6,
        zIndex: 3,
        pointerEvents: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      <svg width={pointerSize} height={pointerSize * 1.6}>
        <defs>
          <linearGradient id="pointerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="50%" stopColor="#FFA500" />
            <stop offset="100%" stopColor="#B8860B" />
          </linearGradient>
        </defs>
        <polygon
          points={`${pointerSize/2},${pointerSize*1.6} ${pointerSize*0.85},${pointerSize*0.4} ${pointerSize*0.15},${pointerSize*0.4}`}
          fill="url(#pointerGradient)"
          stroke="#8B4513"
          strokeWidth="2"
          style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }}
        />
      </svg>
    </div>
  );
};

export default WheelPointer;
