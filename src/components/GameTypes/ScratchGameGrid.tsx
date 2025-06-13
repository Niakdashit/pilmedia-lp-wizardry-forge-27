
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
  // Style constant pour une grille responsive qui remplit tout l'espace
  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '24px',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyItems: 'center'
  };

  return (
    <div className="w-full h-full">
      <div style={gridStyle}>
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
  );
};

export default ScratchGameGrid;
