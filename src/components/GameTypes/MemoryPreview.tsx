
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

interface MemoryPreviewProps {
  config: {
    pairs: number;
    theme: string;
    timeLimit: number;
    cardBackColor: string;
    cardFrontColor: string;
    symbols: string[];
  };
  onComplete?: (result: 'win' | 'lose') => void;
}

const MemoryPreview: React.FC<MemoryPreviewProps> = ({ config, onComplete }) => {
  const [cards, setCards] = useState<number[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [disabled, setDisabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(config.timeLimit);

  useEffect(() => {
    const pairs = config.pairs || 8;
    const numbers = Array.from({ length: pairs }, (_, i) => i + 1);
    const deck = [...numbers, ...numbers].sort(() => Math.random() - 0.5);
    setCards(deck);

    if (config.timeLimit > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            onComplete?.('lose');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [config.pairs, config.timeLimit]);

  const handleCardClick = (index: number) => {
    if (disabled || flipped.includes(index) || matched.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setDisabled(true);
      const [first, second] = newFlipped;
      
      if (cards[first] === cards[second]) {
        setMatched([...matched, first, second]);
        setFlipped([]);
        setDisabled(false);

        if (matched.length + 2 === cards.length) {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
          onComplete?.('win');
        }
      } else {
        setTimeout(() => {
          setFlipped([]);
          setDisabled(false);
        }, 1000);
      }
    }
  };

  const getSymbol = (value: number) => {
    if (config.theme === 'emojis') {
      const emojis = ['🎮', '🎲', '🎯', '🎪', '🎨', '🎭', '🎪', '🎯'];
      return emojis[value - 1] || value;
    }
    if (config.theme === 'symbols') {
      return config.symbols[value - 1] || value;
    }
    return value;
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      {config.timeLimit > 0 && (
        <div className="mb-4 text-center">
          <div className="text-xl font-bold">
            Temps restant: {timeLeft}s
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
            <div 
              className="h-full bg-[#841b60] rounded-full transition-all duration-1000"
              style={{ width: `${(timeLeft / config.timeLimit) * 100}%` }}
            />
          </div>
        </div>
      )}

      <div className={`grid gap-4 ${
        config.pairs <= 8 ? 'grid-cols-4' : 
        config.pairs <= 12 ? 'grid-cols-5' : 
        'grid-cols-6'
      }`}>
        {cards.map((card, index) => (
          <motion.div
            key={index}
            className={`aspect-square rounded-lg cursor-pointer shadow-lg ${
              flipped.includes(index) || matched.includes(index)
                ? config.cardFrontColor || 'bg-white'
                : config.cardBackColor || 'bg-[#841b60]'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleCardClick(index)}
          >
            {(flipped.includes(index) || matched.includes(index)) && (
              <div className="w-full h-full flex items-center justify-center text-3xl font-bold">
                {getSymbol(card)}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MemoryPreview;
