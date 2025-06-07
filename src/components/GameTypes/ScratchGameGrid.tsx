
import React from 'react';
import ScratchCard from './ScratchCard';

interface ScratchGameGridProps {
  cards: any[];
  gameSize: string;
  gameStarted: boolean;
  onCardFinish: (result: 'win' | 'lose', cardIndex: number) => void;
  config: any;
}

const ScratchGameGrid: React.FC<ScratchGameGridProps> = ({
  cards,
  gameSize,
  gameStarted,
  onCardFinish,
  config
}) => {
  // Responsive grid: 2 cards max on mobile, 3 on tablet/desktop
  const gridClasses = cards.length === 1
    ? 'grid grid-cols-1 justify-items-center'
    : 'grid grid-cols-2 md:grid-cols-3 justify-items-center';

  // Spacing based on number of cards and screen size
  const spacingClasses = cards.length === 1
    ? 'gap-0'
    : 'gap-4 md:gap-6';

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className={`${gridClasses} ${spacingClasses}`}>
        {cards.map((card: any, index: number) => (
          <ScratchCard
            key={card.id || index}
            card={card}
            index={index}
            gameSize={gameSize}
            gameStarted={gameStarted}
            onCardFinish={(result) => onCardFinish(result, index)}
            config={config}
          />
        ))}
      </div>
    </div>
  );
};

export default ScratchGameGrid;
