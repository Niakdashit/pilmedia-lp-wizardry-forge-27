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
  position?: 'gauche' | 'droite' | 'bas' | 'centre'; // AJOUT DE LA POSITION
}

const getClipPath = (position: string | undefined) => {
  // Retourne le clip-path CSS adapté à la position choisie
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
  gameSize = 'small',
  position = 'centre' // NOUVEAU : par défaut "centre"
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
  
  // Calculer la taille de la roue en fonction des dimensions du jeu
  const wheelSize = Math.min(gameDimensions.width, gameDimensions.height) - 40;

  const spin = () => {
    if (!wheelRef.current || isSpinning || disabled) return;

    // Déclencher l'événement de début de jeu
    if (onStart) {
      onStart();
    }

    setIsSpinning(true);
    const randomRotation = Math.random() * 360 + 1440; // Au moins 4 tours
    
    wheelRef.current.style.transform = `rotate(${randomRotation}deg)`;
    
    setTimeout(() => {
      setIsSpinning(false);
      const segmentAngle = 360 / segments.length;
      const normalizedRotation = (360 - (randomRotation % 360)) % 360;
      const prizeIndex = Math.floor(normalizedRotation / segmentAngle);
      const selectedSegment = segments[prizeIndex] || segments[0];
      
      
      // Appeler onComplete si fourni (pour la compatibilité)
      if (onComplete) {
        onComplete(selectedSegment.label);
      }
      
      // Appeler onFinish si fourni (pour la cohérence avec les autres jeux)
      if (onFinish) {
        // Simuler un résultat win/lose - si c'est "Dommage" ou "Rejouer" = lose, sinon win
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
      className="flex flex-col items-center space-y-6"
      style={{
        width: `${gameDimensions.width}px`,
        height: `${gameDimensions.height}px`,
        maxWidth: `${gameDimensions.width}px`,
        maxHeight: `${gameDimensions.height}px`
      }}
    >
      {/* --- CLIPPING RESPONSIVE --- */}
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
        {/* Ombre 3D externe */}
        <div
          className="absolute rounded-full"
          style={{
            width: wheelSize + 30,
            height: wheelSize + 30,
            top: -15,
            left: -15,
            background: 'radial-gradient(circle, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0) 70%)',
            filter: 'blur(8px)',
            zIndex: -1
          }}
        />

        {/* Roue avec bordure 3D améliorée */}
        <div
          ref={wheelRef}
          className="relative rounded-full overflow-hidden"
          style={{ 
            width: wheelSize, 
            height: wheelSize,
            transition: 'transform 3s ease-out',
            border: '8px solid transparent',
            background: `
              linear-gradient(145deg, #e2e8f0 0%, #94a3b8 50%, #475569 100%) border-box,
              linear-gradient(white, white) padding-box
            `,
            boxShadow: `
              0 0 0 3px #841b60,
              0 0 0 6px rgba(132, 27, 96, 0.3),
              inset 0 2px 4px rgba(255, 255, 255, 0.5),
              inset 0 -2px 4px rgba(0, 0, 0, 0.2),
              0 8px 32px rgba(0,0,0,0.3)
            `
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
                    fontSize: wheelSize < 250 ? '10px' : '12px',
                    maxWidth: '80%'
                  }}
                >
                  {segment.label}
                </span>
              </div>
            );
          })}
        </div>
        
        {/* Pointeur central avec ombre 3D */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div 
            className="border-l-4 border-r-4 border-b-8 border-transparent border-b-gray-800"
            style={{
              borderBottomWidth: wheelSize < 250 ? '6px' : '8px',
              borderLeftWidth: wheelSize < 250 ? '3px' : '4px',
              borderRightWidth: wheelSize < 250 ? '3px' : '4px',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
            }}
          ></div>
        </div>
      </div>

      <button
        onClick={spin}
        disabled={isSpinning || disabled}
        className="px-6 py-3 bg-[#841b60] text-white font-bold rounded-xl hover:bg-[#6d164f] disabled:opacity-50 transition-colors duration-200"
        style={{
          fontSize: wheelSize < 250 ? '14px' : '16px',
          padding: wheelSize < 250 ? '10px 20px' : '12px 24px'
        }}
      >
        {isSpinning ? 'Rotation...' : 'Faire tourner'}
      </button>
    </div>
  );
};

export default Wheel;
