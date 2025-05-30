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

  // Responsive sizing: max size depending on device type
  let maxPx = 340;
  if (previewMode === 'mobile') maxPx = 180;
  if (previewMode === 'tablet') maxPx = 240;

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
      style={{
        minHeight: 0,
        minWidth: 0,
        ...style
      }}
    >
      <div
        className="relative flex items-center justify-center w-full h-full"
        style={{
          maxWidth: maxPx,
          maxHeight: maxPx,
          aspectRatio: '1 / 1',
          width: '100%',
          height: '100%',
        }}
      >
        <div
          ref={wheelRef}
          className="rounded-full border-8 border-gray-800 relative overflow-hidden bg-white flex items-center justify-center"
          style={{
            width: '100%',
            height: '100%',
            aspectRatio: '1 / 1',
            maxWidth: '100%',
            maxHeight: '100%',
            minWidth: 0,
            minHeight: 0,
            transition: 'transform 3s cubic-bezier(.17,.67,.83,.67)',
            background: 'white',
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

      <button
        onClick={spin}
        disabled={isSpinning}
        className="px-8 py-3 mt-4 bg-[#841b60] text-white font-bold rounded-xl hover:bg-[#6d164f] disabled:opacity-50 transition-colors duration-200"
      >
        {isSpinning ? 'Rotation...' : 'Faire tourner'}
      </button>
    </div>
  );
};

export default Wheel;
