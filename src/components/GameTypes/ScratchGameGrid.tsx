
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
  return (
    <div className="w-full max-w-4xl mx-auto px-6">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
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
