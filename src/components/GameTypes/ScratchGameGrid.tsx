
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
  onReplay
}) => {
  // Configuration responsive de la grille
  const getGridConfig = () => {
    const cardCount = cards.length;
    
    if (cardCount === 1) {
      return {
        containerClass: 'flex justify-center',
        gridClass: 'grid grid-cols-1 place-items-center',
        spacing: 'gap-6'
      };
    }
    
    if (cardCount === 2) {
      return {
        containerClass: 'w-full',
        gridClass: 'grid grid-cols-1 sm:grid-cols-2 place-items-center',
        spacing: 'gap-6 sm:gap-8'
      };
    }
    
    // Pour 3 cartes ou plus
    return {
      containerClass: 'w-full',
      gridClass: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center',
      spacing: 'gap-6 sm:gap-8 lg:gap-6'
    };
  };

  const { containerClass, gridClass, spacing } = getGridConfig();

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6">
      <div className={`${containerClass}`}>
        <div className={`${gridClass} ${spacing} w-full`}>
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
