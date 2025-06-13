
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
  isModal?: boolean;
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
  isModal = false
}) => {
  // Configuration responsive de la grille améliorée
  const getGridConfig = () => {
    const cardCount = cards.length;

    if (cardCount === 1) {
      return {
        containerClass: 'w-full flex justify-center items-center',
        gridClass: 'flex justify-center items-center',
        spacing: isModal ? 'gap-6' : 'gap-8'
      };
    }

    // Pour 2+ cartes : grille responsive optimisée avec espacement garanti
    if (cardCount === 2) {
      return {
        containerClass: 'w-full flex justify-center items-center',
        gridClass: 'flex flex-row justify-center items-center flex-wrap',
        spacing: isModal ? 'gap-4 md:gap-6' : 'gap-6 md:gap-8 lg:gap-10'
      };
    }

    // Pour 3+ cartes : grille avec colonnes adaptatives
    return {
      containerClass: 'w-full flex justify-center items-center',
      gridClass: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center justify-center w-full',
      spacing: isModal ? 'gap-4 md:gap-6' : 'gap-6 md:gap-8 lg:gap-10'
    };
  };

  const { containerClass, gridClass, spacing } = getGridConfig();

  return (
    <div className={`h-full ${isModal ? 'max-w-6xl px-4 py-6' : 'max-w-7xl px-6 py-8'} mx-auto flex items-center justify-center`}>
      <div className={containerClass}>
        <div className={`${gridClass} ${spacing} w-full`}>
          {cards.map((card: any, index: number) => {
            const isThisCardSelected = selectedCard === index;
            
            const isLocked = gameStarted && scratchStarted && !isThisCardSelected;
            const isSelectable = gameStarted && !scratchStarted && selectedCard === null;
            const canScratch = gameStarted && isThisCardSelected;

            return (
              <div key={card.id || index} className="flex justify-center items-center">
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
                  isModal={isModal}
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
