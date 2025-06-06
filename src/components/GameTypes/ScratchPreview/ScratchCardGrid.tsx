
import React from 'react';
import ScratchCard from './ScratchCard';
import { CardState } from './types';
import { getGridClasses } from './utils';

interface ScratchCardGridProps {
  cards: any[];
  cardsState: CardState[];
  width: number;
  height: number;
  config: any;
  onCardUpdate: (cardIndex: number, updates: Partial<CardState>) => void;
  onFinish?: (result: 'win' | 'lose') => void;
}

const ScratchCardGrid: React.FC<ScratchCardGridProps> = ({
  cards,
  cardsState,
  width,
  height,
  config,
  onCardUpdate,
  onFinish
}) => {
  return (
    <div className={getGridClasses()}>
      {cards.map((card: any, cardIndex: number) => {
        const cardState = cardsState[cardIndex];
        if (!cardState) return null;

        return (
          <ScratchCard
            key={cardIndex}
            cardIndex={cardIndex}
            card={card}
            cardState={cardState}
            width={width}
            height={height}
            config={config}
            onCardUpdate={onCardUpdate}
            onFinish={onFinish}
          />
        );
      })}
    </div>
  );
};

export default ScratchCardGrid;
