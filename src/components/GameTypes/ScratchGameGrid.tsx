
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
          // Determine if this card should be locked
          const isLocked = gameStarted && scratchStarted && selectedCard !== index;
          // Determine if this card is selectable (can be clicked to select)
          const isSelectable = gameStarted && !scratchStarted && selectedCard === null;
          // Determine if this card can be scratched
          const canScratch = gameStarted && selectedCard === index && !scratchStarted;

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
              isSelected={selectedCard === index}
              config={config}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ScratchGameGrid;
