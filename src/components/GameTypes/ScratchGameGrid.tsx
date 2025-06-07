
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
  config
}) => {
  // Responsive grid: 2 cards on mobile, 3 on tablet/desktop
  const columnClasses = cards.length === 1
    ? 'grid-cols-1'
    : 'grid-cols-2 md:grid-cols-3';

  // Center the grid when there is a single card
  const gridClasses = `grid ${columnClasses} justify-center`;

  // Consistent spacing between cards
  const spacingClasses = cards.length === 1
    ? 'gap-y-6'
    : 'gap-4 md:gap-6';

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className={`${gridClasses} ${spacingClasses}`}>
        {cards.map((card: any, index: number) => {
          const isThisCardSelected = selectedCard === index;
          
          // Card states logic:
          // 1. If game hasn't started -> show preview only
          // 2. If game started but no scratch started and no card selected -> all cards selectable
          // 3. If a card is selected but scratch hasn't started -> only selected card can be scratched, others locked
          // 4. If scratch has started -> only the scratched card is active, all others permanently locked
          
          const isLocked = gameStarted && (
            (scratchStarted && !isThisCardSelected) || // Once scratching starts, lock all non-selected cards
            (selectedCard !== null && !isThisCardSelected && !scratchStarted) // If a card is selected but scratching hasn't started, lock others
          );
          
          // Cards are selectable only when game started, no scratch started, and no card is selected yet
          const isSelectable = gameStarted && !scratchStarted && selectedCard === null;
          
          // Only the selected card can be scratched (and only if scratching hasn't started yet)
          const canScratch = gameStarted && isThisCardSelected && !scratchStarted;

          console.log(`Card ${index}: selected=${isThisCardSelected}, locked=${isLocked}, selectable=${isSelectable}, canScratch=${canScratch}`);

          return (
            <ScratchCard
              key={card.id || index}
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
            />
          );
        })}
      </div>
    </div>
  );
};

export default ScratchGameGrid;
