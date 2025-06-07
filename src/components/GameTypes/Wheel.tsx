import React, { useRef, useEffect, useState } from 'react';
import WheelStyleSelector from '../configurators/WheelStyleSelector';
import { useGameSize } from '../../hooks/useGameSize';

interface WheelProps {
  config: any;
  isPreview?: boolean;
  onComplete?: (prize: string) => void;
  onFinish?: (result: 'win' | 'lose') => void;
  onStart?: () => void;
  currentWinners?: number;
  maxWinners?: number;
  winRate?: number;
  disabled?: boolean;
  gameSize?: 'small' | 'medium' | 'large' | 'xlarge';
  position?: 'gauche' | 'droite' | 'bas' | 'centre';
}

const getClipPath = (position: string | undefined) => {
  switch (position) {
    case 'gauche':
      return 'inset(0 0 0 50%)';
    case 'droite':
      return 'inset(0 50% 0 0)';
    case 'bas':
      return 'inset(0 0 50% 0)';
    case 'centre':
    default:
      return 'none';
  }
};

const Wheel: React.FC<WheelProps> = ({ 
  config, 
  isPreview, 
  onComplete, 
  onFinish,
  onStart,
  disabled = false,
  gameSize = 'large',
  position = 'centre'
}) => {
  const wheelRef = useRef<HTMLDivElement>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState('roulette_casino.svg');

  const { getGameDimensions } = useGameSize(gameSize);
  const gameDimensions = getGameDimensions();
  
  // Configuration par défaut si aucune config fournie
  const defaultSegments = [
    { label: 'Prix 1', color: '#ff6b6b' },
    { label: 'Prix 2', color: '#4ecdc4' },
    { label: 'Prix 3', color: '#45b7d1' },
    { label: 'Prix 4', color: '#96ceb4' },
    { label: 'Dommage', color: '#feca57' },
    { label: 'Rejouer', color: '#ff9ff3' }
  ];

  const segments = config?.segments?.length > 0 ? config.segments : defaultSegments;
  
  // Calculer la taille de la roue en fonction des dimensions du jeu - taille augmentée
  const wheelSize = Math.min(gameDimensions.width, gameDimensions.height) - 20; // Réduction de marge pour une roue plus grande

  const spin = () => {
    if (!wheelRef.current || isSpinning || disabled) return;

    if (onStart) {
      onStart();
    }

    setIsSpinning(true);
    const randomRotation = Math.random() * 360 + 1440;
    
    wheelRef.current.style.transform = `rotate(${randomRotation}deg)`;
    
    setTimeout(() => {
      setIsSpinning(false);
      const segmentAngle = 360 / segments.length;
      const normalizedRotation = (360 - (randomRotation % 360)) % 360;
      const prizeIndex = Math.floor(normalizedRotation / segmentAngle);
      const selectedSegment = segments[prizeIndex] || segments[0];
      
      if (onComplete) {
        onComplete(selectedSegment.label);
      }
      
      if (onFinish) {
        const result = selectedSegment.label.toLowerCase().includes('dommage') || 
                      selectedSegment.label.toLowerCase().includes('rejouer') ? 'lose' : 'win';
        onFinish(result);
      }
    }, 3000);
  };

  useEffect(() => {
    if (wheelRef.current) {
      wheelRef.current.style.transition = isSpinning ? 'transform 3s ease-out' : 'none';
    }
  }, [isSpinning]);

  if (!isPreview) {
    return (
      <div className="space-y-6">
        <WheelStyleSelector 
          selectedStyle={selectedStyle}
          setSelectedStyle={setSelectedStyle}
        />
      </div>
    );
  }

  return (
    <div 
      className="flex flex-col items-center justify-center space-y-6"
      style={{
        width: `${gameDimensions.width}px`,
        height: `${gameDimensions.height}px`,
        maxWidth: `${gameDimensions.width}px`,
        maxHeight: `${gameDimensions.height}px`
      }}
    >
      <div 
        className="relative"
        style={{
          width: wheelSize,
          height: wheelSize,
          clipPath: getClipPath(position),
          WebkitClipPath: getClipPath(position),
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div
          ref={wheelRef}
          className="relative rounded-full border-4 border-gray-800 overflow-hidden"
          style={{ 
            width: wheelSize, 
            height: wheelSize,
            transition: 'transform 3s ease-out',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
          }}
        >
          {segments.map((segment: any, index: number) => {
            const segmentAngle = 360 / segments.length;
            const rotation = segmentAngle * index;
            
            return (
              <div
                key={index}
                className="absolute w-1/2 h-1/2 origin-bottom-right flex items-center justify-center text-white font-bold text-sm"
                style={{
                  backgroundColor: segment.color,
                  transform: `rotate(${rotation}deg)`,
                  clipPath: `polygon(0 0, ${Math.cos((segmentAngle * Math.PI) / 180) * 100}% ${Math.sin((segmentAngle * Math.PI) / 180) * 100}%, 0 100%)`
                }}
              >
                <span 
                  className="transform text-center leading-tight"
                  style={{ 
                    transform: `rotate(${segmentAngle / 2}deg)`,
                    fontSize: wheelSize < 250 ? '12px' : '14px',
                    maxWidth: '80%'
                  }}
                >
                  {segment.label}
                </span>
              </div>
            );
          })}
        </div>
        
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div 
            className="border-l-4 border-r-4 border-b-8 border-transparent border-b-gray-800"
            style={{
              borderBottomWidth: wheelSize < 250 ? '8px' : '10px',
              borderLeftWidth: wheelSize < 250 ? '4px' : '5px',
              borderRightWidth: wheelSize < 250 ? '4px' : '5px'
            }}
          ></div>
        </div>
      </div>

      <button
        onClick={spin}
        disabled={isSpinning || disabled}
        className="px-6 py-3 bg-[#841b60] text-white font-bold rounded-xl hover:bg-[#6d164f] disabled:opacity-50 transition-colors duration-200"
        style={{
          fontSize: wheelSize < 250 ? '16px' : '18px',
          padding: wheelSize < 250 ? '12px 24px' : '14px 28px'
        }}
      >
        {isSpinning ? 'Rotation...' : 'Faire tourner'}
      </button>
    </div>
  );
};

export default Wheel;
