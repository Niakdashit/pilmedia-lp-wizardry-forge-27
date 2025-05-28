
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

interface DiceProps {
  config?: any;
  onConfigChange: (config: any) => void;
  isPreview?: boolean;
  onComplete?: () => void;
}

const Dice: React.FC<DiceProps> = ({ config = {}, onConfigChange, isPreview, onComplete }) => {
  const [diceValues, setDiceValues] = useState<number[]>([]);
  const [isRolling, setIsRolling] = useState(false);
  const [hasResult, setHasResult] = useState(false);

  const getDiceDots = (value: number) => {
    const dots = [];
    const dotColor = config?.dotColor || 'white';
    
    switch (value) {
      case 1:
        dots.push(<div key="center" className="absolute inset-0 m-auto w-2 h-2 rounded-full" style={{ background: dotColor }} />);
        break;
      case 2:
        dots.push(
          <div key="top-right" className="absolute top-2 right-2 w-2 h-2 rounded-full" style={{ background: dotColor }} />,
          <div key="bottom-left" className="absolute bottom-2 left-2 w-2 h-2 rounded-full" style={{ background: dotColor }} />
        );
        break;
      case 3:
        dots.push(
          <div key="top-right" className="absolute top-2 right-2 w-2 h-2 rounded-full" style={{ background: dotColor }} />,
          <div key="center" className="absolute inset-0 m-auto w-2 h-2 rounded-full" style={{ background: dotColor }} />,
          <div key="bottom-left" className="absolute bottom-2 left-2 w-2 h-2 rounded-full" style={{ background: dotColor }} />
        );
        break;
      case 4:
        dots.push(
          <div key="top-left" className="absolute top-2 left-2 w-2 h-2 rounded-full" style={{ background: dotColor }} />,
          <div key="top-right" className="absolute top-2 right-2 w-2 h-2 rounded-full" style={{ background: dotColor }} />,
          <div key="bottom-left" className="absolute bottom-2 left-2 w-2 h-2 rounded-full" style={{ background: dotColor }} />,
          <div key="bottom-right" className="absolute bottom-2 right-2 w-2 h-2 rounded-full" style={{ background: dotColor }} />
        );
        break;
      case 5:
        dots.push(
          <div key="top-left" className="absolute top-2 left-2 w-2 h-2 rounded-full" style={{ background: dotColor }} />,
          <div key="top-right" className="absolute top-2 right-2 w-2 h-2 rounded-full" style={{ background: dotColor }} />,
          <div key="center" className="absolute inset-0 m-auto w-2 h-2 rounded-full" style={{ background: dotColor }} />,
          <div key="bottom-left" className="absolute bottom-2 left-2 w-2 h-2 rounded-full" style={{ background: dotColor }} />,
          <div key="bottom-right" className="absolute bottom-2 right-2 w-2 h-2 rounded-full" style={{ background: dotColor }} />
        );
        break;
      case 6:
        dots.push(
          <div key="top-left" className="absolute top-2 left-2 w-2 h-2 rounded-full" style={{ background: dotColor }} />,
          <div key="top-right" className="absolute top-2 right-2 w-2 h-2 rounded-full" style={{ background: dotColor }} />,
          <div key="middle-left" className="absolute top-1/2 -translate-y-1/2 left-2 w-2 h-2 rounded-full" style={{ background: dotColor }} />,
          <div key="middle-right" className="absolute top-1/2 -translate-y-1/2 right-2 w-2 h-2 rounded-full" style={{ background: dotColor }} />,
          <div key="bottom-left" className="absolute bottom-2 left-2 w-2 h-2 rounded-full" style={{ background: dotColor }} />,
          <div key="bottom-right" className="absolute bottom-2 right-2 w-2 h-2 rounded-full" style={{ background: dotColor }} />
        );
        break;
    }
    return dots;
  };

  const rollDice = () => {
    if (isRolling || hasResult) return;
    setIsRolling(true);

    const rollInterval = setInterval(() => {
      const newValues = Array.from(
        { length: config?.diceCount || 2 },
        () => Math.floor(Math.random() * 6) + 1
      );
      setDiceValues(newValues);
    }, 100);

    setTimeout(() => {
      clearInterval(rollInterval);
      const finalValues = Array.from(
        { length: config?.diceCount || 2 },
        () => Math.floor(Math.random() * 6) + 1
      );
      setDiceValues(finalValues);
      setIsRolling(false);
      setHasResult(true);

      const isWinning = (config?.winningCombinations || [[6, 6]]).some((combo: number[]) => 
        combo.length === finalValues.length && 
        combo.every((val, idx) => val === finalValues[idx])
      );

      if (isWinning) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        onComplete?.();
      }
    }, 2000);
  };

  const resetGame = () => {
    setDiceValues([]);
    setHasResult(false);
    setIsRolling(false);
  };

  if (!isPreview) {
    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre de dés
          </label>
          <input
            type="number"
            min="1"
            max="6"
            value={config?.diceCount || 2}
            onChange={(e) => onConfigChange({ ...config, diceCount: parseInt(e.target.value) })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Combinaisons gagnantes
          </label>
          <input
            type="text"
            value={(config?.winningCombinations || [[6, 6]]).map((combo: number[]) => combo.join(', ')).join(' | ')}
            onChange={(e) => {
              const combinations = e.target.value.split('|').map(combo => 
                combo.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num))
              ).filter(combo => combo.length > 0);
              onConfigChange({ ...config, winningCombinations: combinations });
            }}
            placeholder="6, 6 | 1, 1 | 5, 5"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
          />
          <p className="text-xs text-gray-500 mt-1">
            Séparez les sommes gagnantes par des virgules, et les combinaisons par |
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Couleur des dés
          </label>
          <input
            type="color"
            value={config?.diceColor || '#841b60'}
            onChange={(e) => onConfigChange({ ...config, diceColor: e.target.value })}
            className="w-full h-10 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Couleur des points
          </label>
          <input
            type="color"
            value={config?.dotColor || '#ffffff'}
            onChange={(e) => onConfigChange({ ...config, dotColor: e.target.value })}
            className="w-full h-10 border border-gray-300 rounded-lg"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="flex flex-wrap justify-center gap-8 mb-8">
        {(diceValues.length ? diceValues : Array(config?.diceCount || 2).fill(1)).map((value, index) => (
          <motion.div
            key={index}
            className="w-24 h-24 relative rounded-2xl shadow-xl"
            style={{ background: config?.diceColor || '#841b60' }}
            animate={{
              rotate: isRolling ? [0, 360] : 0,
              scale: isRolling ? [1, 0.8, 1] : 1
            }}
            transition={{
              duration: 0.3,
              repeat: isRolling ? Infinity : 0
            }}
          >
            {getDiceDots(value)}
          </motion.div>
        ))}
      </div>

      <div className="text-center space-y-2">
        <button
          onClick={rollDice}
          disabled={isRolling}
          className="px-8 py-3 bg-[#841b60] text-white font-medium rounded-xl hover:bg-[#6d164f] transition-colors duration-200 disabled:opacity-50"
        >
          {isRolling ? 'Lancement...' : 'Lancer les dés'}
        </button>
        
        {hasResult && (
          <button
            onClick={resetGame}
            className="block mx-auto px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Rejouer
          </button>
        )}
      </div>
    </div>
  );
};

export default Dice;
