
import React, { useRef, useEffect, useState } from 'react';
import WheelStyleSelector from '../configurators/WheelStyleSelector';

interface WheelProps {
  config: any;
  isPreview?: boolean;
  onComplete?: (prize: string) => void;
  currentWinners?: number;
  maxWinners?: number;
  winRate?: number;
}

const Wheel: React.FC<WheelProps> = ({ config, isPreview, onComplete }) => {
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
      const prizeIndex = Math.floor((360 - (randomRotation % 360)) / (360 / prizes.length));
      const selectedPrize = prizes[prizeIndex] || prizes[0];
      onComplete?.(selectedPrize);
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
    <div className="flex flex-col items-center space-y-8">
      <div className="relative">
        <div
          ref={wheelRef}
          className="w-80 h-80 rounded-full border-8 border-gray-800 relative overflow-hidden"
          style={{ transition: 'transform 3s ease-out' }}
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
              <span className="transform -rotate-45 text-sm">{prize}</span>
            </div>
          ))}
        </div>
        
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-transparent border-b-gray-800"></div>
        </div>
      </div>

      <button
        onClick={spin}
        disabled={isSpinning}
        className="px-8 py-3 bg-[#841b60] text-white font-bold rounded-xl hover:bg-[#6d164f] disabled:opacity-50 transition-colors duration-200"
      >
        {isSpinning ? 'Rotation...' : 'Faire tourner'}
      </button>
    </div>
  );
};

export default Wheel;
