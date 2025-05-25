
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

interface DicePreviewProps {
  config: {
    diceCount: number;
    winningCombinations: number[][];
    diceColor: string;
    dotColor: string;
  };
  onComplete?: (result: 'win' | 'lose') => void;
}

const DicePreview: React.FC<DicePreviewProps> = ({ config, onComplete }) => {
  const [diceValues, setDiceValues] = useState<number[]>([]);
  const [isRolling, setIsRolling] = useState(false);
  const [hasResult, setHasResult] = useState(false);

  const getDiceDots = (value: number) => {
    const dots = [];
    switch (value) {
      case 1:
        dots.push(<div key="center" className="absolute inset-0 m-auto w-2 h-2 rounded-full" style={{ background: config.dotColor || 'white' }} />);
        break;
      case 2:
        dots.push(
          <div key="top-right" className="absolute top-2 right-2 w-2 h-2 rounded-full" style={{ background: config.dotColor || 'white' }} />,
          <div key="bottom-left" className="absolute bottom-2 left-2 w-2 h-2 rounded-full" style={{ background: config.dotColor || 'white' }} />
        );
        break;
      case 3:
        dots.push(
          <div key="top-right" className="absolute top-2 right-2 w-2 h-2 rounded-full" style={{ background: config.dotColor || 'white' }} />,
          <div key="center" className="absolute inset-0 m-auto w-2 h-2 rounded-full" style={{ background: config.dotColor || 'white' }} />,
          <div key="bottom-left" className="absolute bottom-2 left-2 w-2 h-2 rounded-full" style={{ background: config.dotColor || 'white' }} />
        );
        break;
      case 4:
        dots.push(
          <div key="top-left" className="absolute top-2 left-2 w-2 h-2 rounded-full" style={{ background: config.dotColor || 'white' }} />,
          <div key="top-right" className="absolute top-2 right-2 w-2 h-2 rounded-full" style={{ background: config.dotColor || 'white' }} />,
          <div key="bottom-left" className="absolute bottom-2 left-2 w-2 h-2 rounded-full" style={{ background: config.dotColor || 'white' }} />,
          <div key="bottom-right" className="absolute bottom-2 right-2 w-2 h-2 rounded-full" style={{ background: config.dotColor || 'white' }} />
        );
        break;
      case 5:
        dots.push(
          <div key="top-left" className="absolute top-2 left-2 w-2 h-2 rounded-full" style={{ background: config.dotColor || 'white' }} />,
          <div key="top-right" className="absolute top-2 right-2 w-2 h-2 rounded-full" style={{ background: config.dotColor || 'white' }} />,
          <div key="center" className="absolute inset-0 m-auto w-2 h-2 rounded-full" style={{ background: config.dotColor || 'white' }} />,
          <div key="bottom-left" className="absolute bottom-2 left-2 w-2 h-2 rounded-full" style={{ background: config.dotColor || 'white' }} />,
          <div key="bottom-right" className="absolute bottom-2 right-2 w-2 h-2 rounded-full" style={{ background: config.dotColor || 'white' }} />
        );
        break;
      case 6:
        dots.push(
          <div key="top-left" className="absolute top-2 left-2 w-2 h-2 rounded-full" style={{ background: config.dotColor || 'white' }} />,
          <div key="top-right" className="absolute top-2 right-2 w-2 h-2 rounded-full" style={{ background: config.dotColor || 'white' }} />,
          <div key="middle-left" className="absolute top-1/2 -translate-y-1/2 left-2 w-2 h-2 rounded-full" style={{ background: config.dotColor || 'white' }} />,
          <div key="middle-right" className="absolute top-1/2 -translate-y-1/2 right-2 w-2 h-2 rounded-full" style={{ background: config.dotColor || 'white' }} />,
          <div key="bottom-left" className="absolute bottom-2 left-2 w-2 h-2 rounded-full" style={{ background: config.dotColor || 'white' }} />,
          <div key="bottom-right" className="absolute bottom-2 right-2 w-2 h-2 rounded-full" style={{ background: config.dotColor || 'white' }} />
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
        { length: config.diceCount },
        () => Math.floor(Math.random() * 6) + 1
      );
      setDiceValues(newValues);
    }, 100);

    setTimeout(() => {
      clearInterval(rollInterval);
      const finalValues = Array.from(
        { length: config.diceCount },
        () => Math.floor(Math.random() * 6) + 1
      );
      setDiceValues(finalValues);
      setIsRolling(false);
      setHasResult(true);

      const isWinning = config.winningCombinations.some(combo => 
        combo.length === finalValues.length && 
        combo.every((val, idx) => val === finalValues[idx])
      );

      if (isWinning) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        onComplete?.('win');
      } else {
        onComplete?.('lose');
      }
    }, 2000);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="flex flex-wrap justify-center gap-8 mb-8">
        {(diceValues.length ? diceValues : Array(config.diceCount).fill(1)).map((value, index) => (
          <motion.div
            key={index}
            className="w-24 h-24 relative rounded-2xl shadow-xl"
            style={{ background: config.diceColor || '#841b60' }}
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

      <div className="text-center">
        <button
          onClick={rollDice}
          disabled={isRolling || hasResult}
          className="px-8 py-3 bg-[#841b60] text-white font-medium rounded-xl hover:bg-[#6d164f] transition-colors duration-200 disabled:opacity-50"
        >
          {isRolling ? 'Lancement...' : 'Lancer les dés'}
        </button>
      </div>
    </div>
  );
};

export default DicePreview;
