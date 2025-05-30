
import React from 'react';
import { Monitor } from 'lucide-react';

interface GameSizeSelectorProps {
  selectedSize: number;
  onSizeChange: (size: number) => void;
}

const GameSizeSelector: React.FC<GameSizeSelectorProps> = ({ selectedSize, onSizeChange }) => {
  const sizes = [
    { id: 1, label: 'Petit', width: '300px', height: '200px', description: '300x200px' },
    { id: 2, label: 'Moyen', width: '400px', height: '300px', description: '400x300px' },
    { id: 3, label: 'Grand', width: '500px', height: '400px', description: '500x400px' },
    { id: 4, label: 'Très Grand', width: '600px', height: '500px', description: '600x500px' }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Monitor className="w-5 h-5 text-[#841b60]" />
        <h4 className="text-md font-medium text-gray-900">Taille du jeu</h4>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {sizes.map((size) => (
          <button
            key={size.id}
            onClick={() => onSizeChange(size.id)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 ${
              selectedSize === size.id
                ? 'border-[#841b60] bg-[#f9f0f5] text-[#841b60]'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="text-left">
              <div className="font-medium">{size.label}</div>
              <div className="text-sm text-gray-500 mt-1">{size.description}</div>
            </div>
          </button>
        ))}
      </div>
      
      <div className="text-sm text-gray-600">
        La taille sélectionnée sera appliquée lors de l'affichage du jeu dans la campagne.
      </div>
    </div>
  );
};

export default GameSizeSelector;
