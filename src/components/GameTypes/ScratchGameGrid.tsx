
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
  const gridClasses =
    cards.length === 1
      ?
        'grid grid-cols-1 gap-4 justify-center place-items-center'
      :
        'grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 justify-items-center';

  return (
    <div className="w-full max-w-4xl mx-auto px-6">
      <div className={gridClasses}>
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

