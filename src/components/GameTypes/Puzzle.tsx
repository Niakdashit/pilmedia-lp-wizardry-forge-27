
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
  const [solved, setSolved] = useState(false);
  const [moves, setMoves] = useState(0);
  const [showPreview, setShowPreview] = useState(true); // Changé pour afficher par défaut

  useEffect(() => {
    if (isPreview || showPreview) {
      const size = config?.gridSize || 9;
      const initialPieces = Array.from({ length: size }, (_, i) => i);
      // Mélange simple pour la démo
      const shuffled = [...initialPieces];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      setPieces(shuffled);
      setMoves(0);
      setSolved(false);
    }
  }, [isPreview, showPreview, config?.gridSize]);

  const handlePieceClick = (index: number) => {
    if (solved) return;

    const newPieces = [...pieces];
    const emptyIndex = newPieces.indexOf(newPieces.length - 1);
    const gridSize = Math.sqrt(pieces.length);
    
    // Vérifier si la pièce est adjacente à l'espace vide
    const isAdjacent = (
      (Math.abs(index - emptyIndex) === 1 && Math.floor(index / gridSize) === Math.floor(emptyIndex / gridSize)) ||
      Math.abs(index - emptyIndex) === gridSize
    );

    if (isAdjacent) {
      // Échanger les pièces
      [newPieces[index], newPieces[emptyIndex]] = [newPieces[emptyIndex], newPieces[index]];
      setPieces(newPieces);
      setMoves(moves + 1);

      // Vérifier si le puzzle est résolu
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

        {/* Canvas de prévisualisation - toujours visible maintenant */}
        <div className="border-t pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-700">Aperçu du jeu</h3>
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="px-4 py-2 bg-[#841b60] text-white rounded-lg hover:bg-[#6d164f] transition-colors"
            >
              {showPreview ? 'Masquer' : 'Afficher'} l'aperçu
            </button>
          </div>

          {showPreview && (
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="text-sm text-gray-600">
                  Mouvements: <span className="font-medium">{moves}</span>
                </div>
                {solved && (
                  <div className="text-green-600 font-medium">
                    ✓ Puzzle résolu !
                  </div>
                )}
              </div>

              <div className="max-w-md mx-auto">
                <div 
                  className="grid gap-1 bg-gray-200 p-1 rounded-lg"
                  style={{
                    gridTemplateColumns: `repeat(${Math.sqrt(pieces.length)}, 1fr)`
                  }}
                >
                  {pieces.map((piece, index) => (
                    <motion.div
                      key={index}
                      className={`aspect-square rounded-sm cursor-pointer transition-transform ${
                        piece === pieces.length - 1 ? 'invisible' : 'bg-white shadow-sm hover:shadow-md'
                      }`}
                      whileHover={{ scale: piece === pieces.length - 1 ? 1 : 1.05 }}
                      whileTap={{ scale: piece === pieces.length - 1 ? 1 : 0.95 }}
                      onClick={() => handlePieceClick(index)}
                      style={{
                        backgroundImage: config?.image ? `url(${config.image})` : undefined,
                        backgroundSize: config?.image ? `${Math.sqrt(pieces.length) * 100}%` : undefined,
                        backgroundPosition: config?.image ? 
                          `${(piece % Math.sqrt(pieces.length)) * 100}% ${Math.floor(piece / Math.sqrt(pieces.length)) * 100}%` 
                          : undefined,
                        backgroundColor: !config?.image ? '#841b60' : undefined
                      }}
                    >
                      {!config?.image && piece !== pieces.length - 1 && (
                        <div className="w-full h-full flex items-center justify-center text-white font-bold">
                          {piece + 1}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="mt-4 text-center">
                <button
                  onClick={() => {
                    setShowPreview(false);
                    setTimeout(() => setShowPreview(true), 100);
                  }}
                  className="px-4 py-2 text-sm bg-[#841b60] text-white rounded-lg hover:bg-[#6d164f] transition-colors"
                >
                  Nouveau mélange
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  const gridSize = Math.sqrt(pieces.length);

  return (
    <div className="max-w-md mx-auto p-4">
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
              piece === pieces.length - 1 ? 'invisible' : 'bg-[#841b60]'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handlePieceClick(index)}
            style={{
              backgroundImage: config?.image ? `url(${config.image})` : undefined,
              backgroundSize: `${gridSize * 100}%`,
              backgroundPosition: `${(piece % gridSize) * 100}% ${Math.floor(piece / gridSize) * 100}%`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Puzzle;
