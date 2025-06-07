import React from 'react';
import { useScratchCard } from './useScratchCard';
import ScratchCanvas from './ScratchCanvas';
import ScratchCardContent from './ScratchCardContent';
import ScratchCardOverlays from './ScratchCardOverlays';

interface ScratchCardProps {
  card: any;
  index: number;
  gameSize: string;
  gameStarted: boolean;
  onCardFinish: (result: 'win' | 'lose') => void;
  onCardSelect: () => void;
  onScratchStart: () => void;
  locked: boolean;
  selectable: boolean;
  canScratch: boolean;
  isSelected: boolean;
  config: any;
}

const ScratchCard: React.FC<ScratchCardProps> = ({
  card,
  index,
  gameSize,
  gameStarted,
  onCardFinish,
  onCardSelect,
  onScratchStart,
  locked,
  selectable,
  canScratch,
  isSelected,
  config
}) => {
  // Dimensions selon la taille
  const getDimensions = () => {
    switch (gameSize) {
      case 'small':
        return { width: 160, height: 120 };
      case 'medium':
        return { width: 200, height: 140 };
      case 'large':
        return { width: 240, height: 180 };
      case 'xlarge':
        return { width: 280, height: 200 };
      default:
        return { width: 200, height: 140 };
    }
  };

  const { width, height } = getDimensions();

  const {
    canvasRef,
    isRevealed,
    scratchPercentage,
    result,
    showRevealContent
  } = useScratchCard({
    gameStarted,
    canScratch,
    onCardFinish,
    onScratchStart,
    config,
    card,
    width,
    height,
    index
  });

  const handleCardClick = () => {
    if (selectable && !locked) {
      onCardSelect();
      console.log(`Card ${index} selected`);
    }
  };

  if (!gameStarted) {
    return (
      <div className="flex flex-col items-center">
        <div 
          className="relative rounded-lg overflow-hidden border-2 border-gray-300 mb-2" 
          style={{
            width: '100%',
            maxWidth: `${width}px`,
            height: `${height}px`
          }}
        >
          <ScratchCardContent
            showRevealContent={false}
            result={null}
            card={card}
            config={config}
            index={index}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      {gameStarted && canScratch && !isRevealed && (
        <div className="text-center mb-2">
          <div className="w-full bg-gray-200 rounded-full h-1 max-w-[120px] mx-auto">
            <div 
              className="bg-[#841b60] h-1 rounded-full transition-all duration-300" 
              style={{ width: `${Math.min(scratchPercentage, 100)}%` }} 
            />
          </div>
        </div>
      )}

      <div 
        className={`relative rounded-lg overflow-hidden border-2 transition-all duration-200 ${
          isSelected 
            ? 'border-[#841b60] shadow-lg' 
            : selectable && !locked
              ? 'border-gray-300 hover:border-[#841b60] cursor-pointer' 
              : 'border-gray-300'
        } ${locked ? 'opacity-50' : ''}`}
        style={{
          width: '100%',
          maxWidth: `${width}px`,
          height: `${height}px`,
          pointerEvents: locked ? 'none' : 'auto'
        }}
        onClick={handleCardClick}
      >
        <ScratchCardContent
          showRevealContent={showRevealContent}
          result={result}
          card={card}
          config={config}
          index={index}
        />

        <ScratchCanvas
          canvasRef={canvasRef}
          canScratch={canScratch}
          isRevealed={isRevealed}
        />

        <ScratchCardOverlays
          selectable={selectable}
          locked={locked}
          isSelected={isSelected}
          canScratch={canScratch}
          isRevealed={isRevealed}
          result={result}
          card={card}
          config={config}
        />
      </div>
    </div>
  );
};

export default ScratchCard;
