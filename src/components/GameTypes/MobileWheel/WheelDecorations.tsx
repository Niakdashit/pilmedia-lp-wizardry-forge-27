
import React from 'react';

interface WheelDecorationsProps {
  theme: string;
  canvasSize: number;
  offset: string;
}

const wheelDecorByTheme: Record<string, string> = {
  casino: '/wheel-styles/roulette_casino.svg',
  luxury: '/wheel-styles/roulette_luxe.svg',
  noel: '/wheel-styles/roulette_noel.svg',
  halloween: '/wheel-styles/roulette_halloween.svg',
  promo: '/wheel-styles/roulette_promo.svg',
  food: '/wheel-styles/roulette_food.svg',
  child: '/wheel-styles/roulette_child.svg',
  gaming: '/wheel-styles/roulette_gaming.svg',
};

const WheelDecorations: React.FC<WheelDecorationsProps> = ({
  theme,
  canvasSize,
  offset
}) => {
  if (theme === 'default' || !wheelDecorByTheme[theme]) {
    return null;
  }

  return (
    <img
      src={wheelDecorByTheme[theme]}
      alt={`Décor roue ${theme}`}
      style={{
        position: 'absolute',
        left: offset,
        top: 0,
        width: canvasSize,
        height: canvasSize,
        zIndex: 2,
        pointerEvents: 'none',
      }}
      draggable={false}
    />
  );
};

export default WheelDecorations;
