
import React, { useRef, useEffect, useState } from 'react';
import WheelStyleSelector from '../configurators/WheelStyleSelector';

interface WheelProps {
  config: any;
  isPreview?: boolean;
  onComplete?: (prize: string) => void;
  onFinish?: (result: 'win' | 'lose') => void;
  previewMode?: 'mobile' | 'tablet' | 'desktop';
  style?: React.CSSProperties;
  className?: string;
}

const Wheel: React.FC<WheelProps> = ({
  config,
  isPreview,
  onComplete,
  onFinish,
  previewMode = 'desktop',
  style,
  className
}) => {
  const wheelRef = useRef<HTMLDivElement>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState('roulette_casino.svg');

  const prizes = config?.prizes || ['Prix 1', 'Prix 2', 'Prix 3', 'Prix 4'];
  const colors = config?.colors || ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4'];

  const spin = () => {
    if (!wheelRef.current || isSpinning) return;

    setIsSpinning(true);
    const randomRotation = Math.random() * 360 + 1440; // Au moins 4 tours

    wheelRef.current.style.transform = `rotate(${randomRotation}deg)`;

    setTimeout(() => {
      setIsSpinning(false);
      const normalizedRotation = (randomRotation % 360 + 360) % 360;
      const slice = 360 / prizes.length;
      const prizeIndex = prizes.length - 1 - Math.floor(normalizedRotation / slice);
      const selectedPrize = prizes[(prizeIndex + prizes.length) % prizes.length] || prizes[0];
      onComplete?.(selectedPrize);

      if (onFinish) {
        const result = Math.random() > 0.5 ? 'win' : 'lose';
        onFinish(result);
      }
    }, 3000);
  };

  useEffect(() => {
    if (wheelRef.current) {
      wheelRef.current.style.transition = isSpinning ? 'transform 3s cubic-bezier(.17,.67,.83,.67)' : 'none';
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
      className={`flex flex-col items-center justify-center w-full h-full ${className || ''}`}
      style={style}
    >
      {/* Container de la roue - maintient un aspect ratio parfaitement carré */}
      <div
        className="relative flex items-center justify-center"
        style={{
          // Utilise le minimum entre largeur et hauteur disponibles pour garder l'aspect carré
          width: Math.min(
            (style?.width as number) || 300,
            (style?.height as number) || 300
          ),
          height: Math.min(
            (style?.width as number) || 300,
            (style?.height as number) || 300
          ),
          maxWidth: '100%',
          maxHeight: '100%',
        }}
      >
        <div
          ref={wheelRef}
          className="rounded-full border-8 border-gray-800 relative overflow-hidden bg-white flex items-center justify-center w-full h-full"
          style={{
            transition: 'transform 3s cubic-bezier(.17,.67,.83,.67)',
          }}
        >
          {prizes.map((prize: string, index: number) => (
            <div
              key={index}
              className="absolute w-1/2 h-1/2 origin-bottom-right flex items-center justify-center text-white font-bold"
              style={{
                backgroundColor: colors[index % colors.length],
                transform: `rotate(${(360 / prizes.length) * index}deg)`,
                clipPath: `polygon(0 0, ${100 / prizes.length}% 0, 0 100%)`
              }}
            >
              <span className="transform -rotate-45 text-xs md:text-sm truncate">{prize}</span>
            </div>
          ))}
        </div>
        {/* Curseur/flèche */}
        <div
          className="absolute z-30"
          style={{
            top: 0,
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-transparent border-b-gray-800"></div>
        </div>
      </div>

      {/* Bouton responsive */}
      <button
        onClick={spin}
        disabled={isSpinning}
        className="px-4 py-2 mt-4 bg-[#841b60] text-white font-bold rounded-xl hover:bg-[#6d164f] disabled:opacity-50 transition-colors duration-200 text-sm md:text-base"
        style={{
          width: previewMode === 'mobile' ? '80%' : previewMode === 'tablet' ? '70%' : '60%',
          maxWidth: '280px',
          minWidth: '120px',
        }}
      >
        {isSpinning ? 'Rotation...' : 'Faire tourner'}
      </button>
    </div>
  );
};

export default Wheel;
