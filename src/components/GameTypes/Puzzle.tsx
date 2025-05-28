
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import ImageUpload from '../common/ImageUpload';

interface PuzzleProps {
  config?: any;
  onConfigChange: (config: any) => void;
  isPreview?: boolean;
  onComplete?: () => void;
}

const Puzzle: React.FC<PuzzleProps> = ({ config = {}, onConfigChange, isPreview, onComplete }) => {
  const [pieces, setPieces] = useState<number[]>([]);
  const [emptyIndex, setEmptyIndex] = useState<number>(0);
  const [moves, setMoves] = useState(0);
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    if (isPreview) {
      const size = config?.gridSize || 9;
      const initialPieces = Array.from({ length: size }, (_, i) => i);
      
      // Shuffle based on difficulty
      let shuffleCount;
      switch (config?.difficulty) {
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
    }
  }, [isPreview, config?.gridSize, config?.difficulty]);

  const handlePieceClick = (index: number) => {
    if (solved) return;

    const gridSize = Math.sqrt(pieces.length);
    const isAdjacent = (
      (Math.abs(index - emptyIndex) === 1 && Math.floor(index / gridSize) === Math.floor(emptyIndex / gridSize)) ||
      Math.abs(index - emptyIndex) === gridSize
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
        setSolved(true);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        onComplete?.();
      }
    }
  };

  if (!isPreview) {
    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image du puzzle
          </label>
          <ImageUpload
            value={config?.image}
            onChange={(value) => onConfigChange({ ...config, image: value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Taille de la grille
          </label>
          <select
            value={config?.gridSize || 9}
            onChange={(e) => onConfigChange({ ...config, gridSize: parseInt(e.target.value) })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
          >
            <option value="9">3x3</option>
            <option value="16">4x4</option>
            <option value="25">5x5</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Difficulté
          </label>
          <select
            value={config?.difficulty || 'medium'}
            onChange={(e) => onConfigChange({ ...config, difficulty: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
          >
            <option value="easy">Facile</option>
            <option value="medium">Moyen</option>
            <option value="hard">Difficile</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Temps limite (minutes)
          </label>
          <input
            type="number"
            min="0"
            max="60"
            value={config?.timeLimit || 0}
            onChange={(e) => onConfigChange({ ...config, timeLimit: parseInt(e.target.value) })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
            placeholder="0 = sans limite"
          />
        </div>
      </div>
    );
  }

  const gridSize = Math.sqrt(pieces.length);

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-bold">Mouvements: {moves}</div>
        {solved && (
          <div className="text-green-600 font-bold">Résolu !</div>
        )}
      </div>

      <div 
        className="grid gap-1 bg-gray-200 p-1 rounded-lg"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`
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
              backgroundImage: config?.image ? `url(${config.image})` : undefined,
              backgroundSize: `${gridSize * 100}%`,
              backgroundPosition: `${(piece % gridSize) * 100 / (gridSize - 1)}% ${Math.floor(piece / gridSize) * 100 / (gridSize - 1)}%`,
              backgroundColor: !config?.image ? '#841b60' : undefined
            }}
          >
            {!config?.image && piece !== pieces.length - 1 && (
              <div className="w-full h-full flex items-center justify-center text-white font-bold text-lg">
                {piece + 1}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Puzzle;
