
import React from 'react';

interface GameSizeSelectorProps {
  selectedSize: number;
  onSizeChange: (size: number) => void;
}

const GAME_SIZES = [
  { id: 1, label: 'Taille 1', description: 'Petit', width: 300, height: 200 },
  { id: 2, label: 'Taille 2', description: 'Moyen', width: 400, height: 300 },
  { id: 3, label: 'Taille 3', description: 'Grand', width: 500, height: 400 },
  { id: 4, label: 'Taille 4', description: 'Très Grand', width: 600, height: 500 }
];

const GameSizeSelector: React.FC<GameSizeSelectorProps> = ({
  selectedSize,
  onSizeChange
}) => {
  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-gray-900">Taille du jeu</h4>
      <div className="grid grid-cols-2 gap-3">
        {GAME_SIZES.map((size) => (
          <button
            key={size.id}
            onClick={() => onSizeChange(size.id)}
            className={`p-3 border rounded-lg text-left transition-colors ${
              selectedSize === size.id
                ? 'border-[#841b60] bg-[#f9f0f5] text-[#841b60]'
                : 'border-gray-200 hover:border-gray-300 text-gray-700'
            }`}
          >
            <div className="font-medium text-sm">{size.label}</div>
            <div className="text-xs text-gray-500 mt-1">{size.description}</div>
            <div className="text-xs text-gray-400 mt-1">
              {size.width} × {size.height}px
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GameSizeSelector;
export { GAME_SIZES };
