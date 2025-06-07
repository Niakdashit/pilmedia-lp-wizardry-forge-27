
import React from 'react';
import { motion } from 'framer-motion';

interface ScratchCardOverlaysProps {
  selectable: boolean;
  locked: boolean;
  isSelected: boolean;
  canScratch: boolean;
  isRevealed: boolean;
  result: 'win' | 'lose' | null;
  card: any;
  config: any;
}

const ScratchCardOverlays: React.FC<ScratchCardOverlaysProps> = ({
  selectable,
  locked,
  isSelected,
  canScratch,
  isRevealed,
  result,
  card,
  config
}) => {
  return (
    <>
      {selectable && !locked && (
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center text-white text-sm font-semibold">
          Cliquez pour sélectionner
        </div>
      )}

      {isSelected && !canScratch && !locked && (
        <div className="absolute inset-0 bg-[#841b60]/20 flex items-center justify-center text-[#841b60] text-sm font-semibold">
          Carte sélectionnée
        </div>
      )}

      {isRevealed && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="absolute inset-0 flex items-center justify-center bg-black/80"
        >
          <div className="bg-white p-3 rounded-lg shadow-lg text-center max-w-[90%]">
            <div className="text-xl mb-1">
              {result === 'win' ? '🎊' : '💫'}
            </div>
            <p className="text-sm font-bold">
              {result === 'win' 
                ? card.revealMessage || config?.revealMessage || 'Vous avez gagné !' 
                : 'Réessayez !'}
            </p>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default ScratchCardOverlays;
