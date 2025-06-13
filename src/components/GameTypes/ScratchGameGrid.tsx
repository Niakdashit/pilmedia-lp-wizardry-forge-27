
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
  return (
    <div className="w-full h-full p-4">
      <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center place-content-center">
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
  );
};

export default ScratchGameGrid;
