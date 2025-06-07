
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
  // Dimensions selon la taille avec un ratio aspect plus équilibré
  const getDimensions = () => {
    switch (gameSize) {
      case 'small':
        return { width: 200, height: 160 };
      case 'medium':
        return { width: 250, height: 200 };
      case 'large':
        return { width: 300, height: 240 };
      case 'xlarge':
        return { width: 350, height: 280 };
      default:
        return { width: 250, height: 200 };
    }
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
      <div className="flex flex-col items-center w-full">
        <div 
          className="relative rounded-lg overflow-hidden border-2 border-gray-300 shadow-sm" 
          style={{
            width: `min(100%, ${width}px)`,
            height: `${height}px`,
            aspectRatio: `${width}/${height}`
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
    <div className="flex flex-col items-center w-full space-y-4">
      {/* Progress bar pour le grattage */}
      {gameStarted && canScratch && !isRevealed && (
        <div className="w-full max-w-[200px] px-2">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-[#841b60] h-2 rounded-full transition-all duration-300" 
              style={{ width: `${Math.min(scratchPercentage, 100)}%` }} 
            />
          </div>
        </div>
      )}

      {/* Carte à gratter */}
      <div 
        className={`relative rounded-lg overflow-hidden border-2 transition-all duration-200 shadow-md ${
          isSelected 
            ? 'border-[#841b60] shadow-lg ring-2 ring-[#841b60]/20' 
            : selectable && !locked
              ? 'border-gray-300 hover:border-[#841b60] cursor-pointer hover:shadow-lg' 
              : 'border-gray-300'
        } ${locked ? 'opacity-50' : ''}`}
        style={{
          width: `min(100%, ${width}px)`,
          height: `${height}px`,
          aspectRatio: `${width}/${height}`,
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
        />
      </div>

      {/* Écran de résultat en dessous de la carte */}
      {isRevealed && result && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="w-full max-w-md mx-auto"
        >
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 text-center mx-4">
            <div className="text-4xl mb-3">
              {result === 'win' ? '🎊' : '💫'}
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">
              {result === 'win' 
                ? card.revealMessage || config?.revealMessage || 'Vous avez gagné !' 
                : 'Dommage ! Réessayez !'}
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {result === 'win' 
                ? 'Félicitations pour votre victoire !' 
                : 'Tentez votre chance une prochaine fois.'}
            </p>
            {onReplay && (
              <button
                onClick={onReplay}
                className="px-8 py-3 bg-[#841b60] text-white font-medium rounded-lg hover:bg-[#6d164f] transition-colors shadow-sm"
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
