
import React from 'react';
import ScratchCard from './ScratchCard';

interface ScratchGameGridProps {
  cards: any[];
  gameSize: string;
  gameStarted: boolean;
  onCardFinish: (result: 'win' | 'lose', cardIndex: number) => void;
  onCardSelect: (index: number) => void;
  onScratchStart: (index: number) => void;
  selectedCard: number | null;
  scratchStarted: boolean;
  config: any;
  onReplay?: () => void;
  modalContained?: boolean;
}

const ScratchGameGrid: React.FC<ScratchGameGridProps> = ({
  cards,
  gameSize,
  gameStarted,
  onCardFinish,
  onCardSelect,
  onScratchStart,
  selectedCard,
  scratchStarted,
  config,
  onReplay,
  modalContained = false
}) => {
  // Configuration responsive de la grille
  const getGridConfig = () => {
    const isSmallContainer = modalContained || window.innerWidth < 1200;
    
    if (cards.length === 1) {
      return {
        containerClass: 'flex justify-center items-center',
        gridClass: 'w-full max-w-sm mx-auto',
        spacing: 'gap-4'
      };
    }
    
    if (cards.length === 2) {
      return {
        containerClass: 'grid grid-cols-1 md:grid-cols-2 place-items-center justify-center',
        gridClass: 'w-full max-w-3xl mx-auto',
        spacing: 'gap-4 md:gap-6'
      };
    }
    
    // Pour 3 cartes ou plus - ajustement pour modal
    if (isSmallContainer) {
      return {
        containerClass: 'grid grid-cols-1 sm:grid-cols-2 place-items-center justify-center',
        gridClass: 'w-full max-w-4xl mx-auto',
        spacing: 'gap-4 sm:gap-6'
      };
    }
    
    return {
      containerClass: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center justify-center',
      gridClass: 'w-full max-w-6xl mx-auto',
      spacing: 'gap-4 sm:gap-6 lg:gap-8'
    };
  };

  const { containerClass, gridClass, spacing } = getGridConfig();

  const containerPadding = modalContained ? 'p-4' : 'p-6 lg:p-8';
  const minHeight = modalContained ? 'min-h-[400px]' : 'min-h-screen';

  return (
    <div className={`w-full ${minHeight} flex flex-col items-center justify-center ${containerPadding}`}>
      <div className={gridClass}>
        <div className={`${containerClass} ${spacing}`}>
          {cards.map((card: any, index: number) => {
            const isThisCardSelected = selectedCard === index;
            
            const isLocked = gameStarted && scratchStarted && !isThisCardSelected;
            const isSelectable = gameStarted && !scratchStarted && selectedCard === null;
            const canScratch = gameStarted && isThisCardSelected;

            console.log(`Card ${index}: selected=${isThisCardSelected}, locked=${isLocked}, selectable=${isSelectable}, canScratch=${canScratch}`);

            return (
              <div key={card.id || index} className="w-full flex justify-center">
                <ScratchCard
                  card={card}
                  index={index}
                  gameSize={gameSize}
                  gameStarted={gameStarted}
                  onCardFinish={(result) => onCardFinish(result, index)}
                  onCardSelect={() => onCardSelect(index)}
                  onScratchStart={() => onScratchStart(index)}
                  locked={isLocked}
                  selectable={isSelectable}
                  canScratch={canScratch}
                  isSelected={isThisCardSelected}
                  config={config}
                  onReplay={onReplay}
                  modalContained={modalContained}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ScratchGameGrid;
