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
  // Configuration responsive de la grille
  const getGridConfig = () => {
    const cardCount = cards.length;

    if (cardCount === 1) {
      return {
        containerClass: 'w-full flex justify-center',
        gridClass: 'flex justify-center',
        spacing: isModal ? 'gap-6' : 'gap-8'
      };
    }

    // Pour 2+ cartes : responsive grid
    return {
      containerClass: 'w-full',
      gridClass: 'grid grid-cols-2 lg:grid-cols-3 place-items-center',
      spacing: isModal ? 'gap-6 sm:gap-8' : 'gap-8 sm:gap-10 lg:gap-12'
    };
  };

  const { containerClass, gridClass, spacing } = getGridConfig();

  return (
    <div className={`w-full mx-auto ${isModal ? 'max-w-5xl px-4 py-6' : 'max-w-7xl px-6 py-8'}`}>
      <div className={containerClass}>
        <div className={`${gridClass} ${spacing} w-full max-w-6xl`}>
          {cards.map((card: any, index: number) => {
            const isThisCardSelected = selectedCard === index;
            
            const isLocked = gameStarted && scratchStarted && !isThisCardSelected;
            const isSelectable = gameStarted && !scratchStarted && selectedCard === null;
            const canScratch = gameStarted && isThisCardSelected;

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
