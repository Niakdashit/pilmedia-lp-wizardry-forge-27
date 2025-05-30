import React, { useRef, useEffect, useState } from 'react';
import WheelStyleSelector from '../configurators/WheelStyleSelector';

interface WheelProps {
  config: any;
  isPreview?: boolean;
  onComplete?: (prize: string) => void;
  onFinish?: (result: 'win' | 'lose') => void;
  currentWinners?: number;
  maxWinners?: number;
  winRate?: number;
}

const Wheel: React.FC<WheelProps> = ({ config, isPreview, onComplete, onFinish }) => {
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

      // Correction du calcul de l'index gagnant
      const normalizedRotation = (randomRotation % 360 + 360) % 360; // angle [0, 360[
      const slice = 360 / prizes.length;
      const prizeIndex = prizes.length - 1 - Math.floor(normalizedRotation / slice);
      const selectedPrize = prizes[(prizeIndex + prizes.length) % prizes.length] || prizes[0];
      
      // Appeler onComplete si fourni (pour la compatibilité)
      onComplete?.(selectedPrize);

      // Appeler onFinish si fourni (pour la cohérence avec les autres jeux)
      if (onFinish) {
        // Simuler un résultat win/lose basé sur le prix (remplace par ta logique si besoin)
        const result = Math.random() > 0.5 ? 'win' : 'lose';
        onFinish(result);
      }
    }, 3000);
  };

  useEffect(() => {
    if (wheelRef.current) {
      wheelRef.current.style.transition = isSpinning ? 'transform 3s ease-out' : 'none';
    }
  }, [isSpinning]);

  // Mode édition : uniquement le sélecteur de style
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

  // Mode preview : roue interactive
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
