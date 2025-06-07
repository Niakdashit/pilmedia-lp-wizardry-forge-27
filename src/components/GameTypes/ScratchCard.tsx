
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
        return { width: 180, height: 140 };
      case 'medium':
        return { width: 220, height: 170 };
      case 'large':
        return { width: 260, height: 200 };
      case 'xlarge':
        return { width: 300, height: 230 };
      default:
        return { width: 220, height: 170 };
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
          className="relative rounded-xl overflow-hidden border-2 border-gray-200 shadow-sm bg-white" 
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
    <div className="flex flex-col items-center w-full space-y-3">
      {/* Progress bar pour le grattage */}
      {gameStarted && canScratch && !isRevealed && (
        <div className="w-full max-w-[180px]">
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
        className={`relative rounded-xl overflow-hidden border-2 transition-all duration-200 shadow-lg bg-white ${
          isSelected 
            ? 'border-[#841b60] shadow-xl ring-2 ring-[#841b60]/20' 
            : selectable && !locked
              ? 'border-gray-200 hover:border-[#841b60] cursor-pointer hover:shadow-xl' 
              : 'border-gray-200'
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
          className="w-full max-w-sm mx-auto mt-4"
        >
          <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 text-center">
            <div className="text-3xl mb-2">
              {result === 'win' ? '🎊' : '💫'}
            </div>
            <h3 className="text-lg font-bold mb-2 text-gray-900">
              {result === 'win' 
                ? card.revealMessage || config?.revealMessage || 'Vous avez gagné !' 
                : 'Dommage ! Réessayez !'}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              {result === 'win' 
                ? 'Félicitations pour votre victoire !' 
                : 'Tentez votre chance une prochaine fois.'}
            </p>
            {onReplay && (
              <button
                onClick={onReplay}
                className="px-6 py-2 bg-[#841b60] text-white font-medium rounded-lg hover:bg-[#6d164f] transition-colors shadow-sm"
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
