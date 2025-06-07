
import React from 'react';
import { motion } from 'framer-motion';
import { useScratchCard } from './useScratchCard';
import ScratchCanvas from './ScratchCanvas';
import ScratchCardContent from './ScratchCardContent';
import ScratchCardOverlays from './ScratchCardOverlays';

interface ScratchCardProps {
  card: any;
  index: number;
  gameSize: string;
  gameStarted: boolean;
  onCardFinish: (result: 'win' | 'lose') => void;
  onCardSelect: () => void;
  onScratchStart: () => void;
  locked: boolean;
  selectable: boolean;
  canScratch: boolean;
  isSelected: boolean;
  config: any;
  onReplay?: () => void;
}

const ScratchCard: React.FC<ScratchCardProps> = ({
  card,
  index,
  gameSize,
  gameStarted,
  onCardFinish,
  onCardSelect,
  onScratchStart,
  locked,
  selectable,
  canScratch,
  isSelected,
  config,
  onReplay
}) => {
  // Dimensions responsives selon la taille
  const getDimensions = () => {
    const baseSize = {
      small: { width: 220, height: 160 },
      medium: { width: 280, height: 200 },
      large: { width: 320, height: 240 },
      xlarge: { width: 360, height: 280 }
    };
    
    return baseSize[gameSize as keyof typeof baseSize] || baseSize.medium;
  };

  const { width, height } = getDimensions();

  const {
    canvasRef,
    isRevealed,
    scratchPercentage,
    result,
    showRevealContent
  } = useScratchCard({
    gameStarted,
    canScratch,
    onCardFinish,
    onScratchStart,
    config,
    card,
    width,
    height,
    index
  });

  const handleCardClick = () => {
    if (selectable && !locked) {
      onCardSelect();
      console.log(`Card ${index} selected`);
    }
  };

  if (!gameStarted) {
    return (
      <div className="flex flex-col items-center space-y-4">
        <div 
          className="relative rounded-lg overflow-hidden border-2 border-gray-300 shadow-sm bg-white" 
          style={{
            width: `${width}px`,
            height: `${height}px`,
            maxWidth: '100%'
          }}
        >
          <ScratchCardContent
            showRevealContent={false}
            result={null}
            card={card}
            config={config}
            index={index}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-6 w-full max-w-sm">
      {/* Progress bar pour le grattage */}
      {gameStarted && canScratch && !isRevealed && (
        <div className="w-full px-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-[#841b60] h-2.5 rounded-full transition-all duration-300" 
              style={{ width: `${Math.min(scratchPercentage, 100)}%` }} 
            />
          </div>
        </div>
      )}

      {/* Carte à gratter */}
      <div 
        className={`relative rounded-xl overflow-hidden border-2 transition-all duration-200 shadow-lg bg-white ${
          isSelected 
            ? 'border-[#841b60] shadow-xl ring-2 ring-[#841b60]/20' 
            : selectable && !locked
              ? 'border-gray-300 hover:border-[#841b60] cursor-pointer hover:shadow-xl' 
              : 'border-gray-300'
        } ${locked ? 'opacity-50' : ''}`}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          maxWidth: '100%',
          pointerEvents: locked ? 'none' : 'auto'
        }}
        onClick={handleCardClick}
      >
        <ScratchCardContent
          showRevealContent={showRevealContent}
          result={result}
          card={card}
          config={config}
          index={index}
        />

        <ScratchCanvas
          canvasRef={canvasRef}
          canScratch={canScratch}
          isRevealed={isRevealed}
        />

        <ScratchCardOverlays
          selectable={selectable}
          locked={locked}
          isSelected={isSelected}
          canScratch={canScratch}
          isRevealed={isRevealed}
          result={result}
          card={card}
          config={config}
        />
      </div>

      {/* Écran de résultat en dessous de la carte */}
      {isRevealed && result && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="w-full max-w-md mx-auto px-4 mt-6"
        >
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-200 text-center">
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">
              {result === 'win' ? '🎊' : '💫'}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900">
              {result === 'win' 
                ? card.revealMessage || config?.revealMessage || 'Vous avez gagné !' 
                : 'Dommage ! Réessayez !'}
            </h3>
            <p className="text-gray-600 mb-6 sm:mb-8 leading-relaxed text-base sm:text-lg">
              {result === 'win' 
                ? 'Félicitations pour votre victoire !' 
                : 'Tentez votre chance une prochaine fois.'}
            </p>
            {onReplay && (
              <button
                onClick={onReplay}
                className="px-8 sm:px-10 py-3 sm:py-4 bg-[#841b60] text-white font-semibold rounded-xl hover:bg-[#6d164f] transition-colors shadow-lg hover:shadow-xl text-base sm:text-lg"
              >
                Rejouer
              </button>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ScratchCard;
