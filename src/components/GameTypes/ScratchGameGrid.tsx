
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
  // Configuration responsive de la grille avec alignement et espacement optimaux
  const getGridConfig = () => {
    const cardCount = cards.length;

    // Configuration commune pour l'espacement
    const baseSpacing = isModal ? 'gap-6' : 'gap-8';
    const responsiveSpacing = isModal 
      ? 'gap-4 sm:gap-6 md:gap-8' 
      : 'gap-6 sm:gap-8 md:gap-10 lg:gap-12';

    if (cardCount === 1) {
      return {
        containerClass: 'w-full h-full flex items-center justify-center',
        gridClass: 'flex justify-center items-center',
        spacing: baseSpacing
      };
    }

    if (cardCount === 2) {
      return {
        containerClass: 'w-full h-full flex items-center justify-center',
        gridClass: 'flex flex-row justify-center items-center flex-wrap',
        spacing: responsiveSpacing
      };
    }

    if (cardCount <= 4) {
      return {
        containerClass: 'w-full h-full flex items-center justify-center',
        gridClass: 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 place-items-center justify-center',
        spacing: responsiveSpacing
      };
    }

    if (cardCount <= 6) {
      return {
        containerClass: 'w-full h-full flex items-center justify-center',
        gridClass: 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 place-items-center justify-center',
        spacing: responsiveSpacing
      };
    }

    // Pour plus de 6 cartes : grille avec 4 colonnes maximum
    return {
      containerClass: 'w-full h-full flex items-center justify-center',
      gridClass: 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 place-items-center justify-center',
      spacing: responsiveSpacing
    };
  };

  const { containerClass, gridClass, spacing } = getGridConfig();

  return (
    <div className={`${isModal ? 'max-w-5xl px-4 py-6' : 'max-w-7xl px-6 py-8'} mx-auto h-full`}>
      <div className={containerClass}>
        <div className={`${gridClass} ${spacing} w-full max-w-fit mx-auto`}>
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
