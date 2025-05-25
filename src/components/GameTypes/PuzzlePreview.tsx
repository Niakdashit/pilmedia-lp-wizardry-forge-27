
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

interface PuzzlePreviewProps {
  config: {
    image: string;
    gridSize: number;
    difficulty: 'easy' | 'medium' | 'hard';
    timeLimit?: number;
  };
  onComplete?: (result: 'win' | 'lose') => void;
}

const PuzzlePreview: React.FC<PuzzlePreviewProps> = ({ config, onComplete }) => {
  const [pieces, setPieces] = useState<number[]>([]);
  const [emptyIndex, setEmptyIndex] = useState<number>(0);
  const [moves, setMoves] = useState(0);
  const [timeLeft, setTimeLeft] = useState(config.timeLimit || 0);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    const size = config.gridSize * config.gridSize;
    const initialPieces = Array.from({ length: size }, (_, i) => i);
    
    // Shuffle based on difficulty
    let shuffleCount;
    switch (config.difficulty) {
      case 'easy': shuffleCount = 20; break;
      case 'medium': shuffleCount = 40; break;
      case 'hard': shuffleCount = 60; break;
      default: shuffleCount = 30;
    }

    for (let i = 0; i < shuffleCount; i++) {
      const randomIndex = Math.floor(Math.random() * size);
      [initialPieces[0], initialPieces[randomIndex]] = 
      [initialPieces[randomIndex], initialPieces[0]];
    }

    setPieces(initialPieces);
    setEmptyIndex(initialPieces.indexOf(size - 1));
  }, [config.gridSize, config.difficulty]);

  useEffect(() => {
    if (gameStarted && config.timeLimit && config.timeLimit > 0) {
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
  }, [gameStarted, config.timeLimit]);

  const handlePieceClick = (index: number) => {
    if (!gameStarted) {
      setGameStarted(true);
    }

    const isAdjacent = (
      (Math.abs(index - emptyIndex) === 1 && Math.floor(index / config.gridSize) === Math.floor(emptyIndex / config.gridSize)) ||
      Math.abs(index - emptyIndex) === config.gridSize
    );

    if (isAdjacent) {
      const newPieces = [...pieces];
      [newPieces[index], newPieces[emptyIndex]] = [newPieces[emptyIndex], newPieces[index]];
      setPieces(newPieces);
      setEmptyIndex(index);
      setMoves(moves + 1);

      // Check if puzzle is solved
      const isSolved = newPieces.every((piece, i) => piece === i);
      if (isSolved) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        onComplete?.('win');
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-bold">Mouvements: {moves}</div>
        {config.timeLimit && config.timeLimit > 0 && (
          <div className="text-lg font-bold">
            Temps: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </div>
        )}
      </div>

      <div 
        className="grid gap-1 bg-gray-200 p-1 rounded-lg"
        style={{
          gridTemplateColumns: `repeat(${config.gridSize}, 1fr)`
        }}
      >
        {pieces.map((piece, index) => (
          <motion.div
            key={index}
            className={`aspect-square rounded-sm cursor-move ${
              piece === pieces.length - 1 ? 'invisible' : 'bg-white shadow-md'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handlePieceClick(index)}
            style={{
              backgroundImage: config.image ? `url(${config.image})` : undefined,
              backgroundSize: `${config.gridSize * 100}%`,
              backgroundPosition: `${(piece % config.gridSize) * 100}% ${Math.floor(piece / config.gridSize) * 100}%`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default PuzzlePreview;
