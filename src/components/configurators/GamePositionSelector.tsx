import React from 'react';

export type GamePosition = 'top' | 'center' | 'bottom' | 'left' | 'right';

// Fonction pour obtenir la position opposée
export function getInversedPosition(position: GamePosition): GamePosition {
  switch (position) {
    case 'top':
      return 'bottom';
    case 'bottom':
      return 'top';
    case 'left':
      return 'right';
    case 'right':
      return 'left';
    case 'center':
    default:
      return 'center';
  }
}

interface GamePositionSelectorProps {
  selectedPosition: GamePosition;
  onPositionChange: (position: GamePosition) => void;
  className?: string;
}

const GamePositionSelector: React.FC<GamePositionSelectorProps> = ({
  selectedPosition,
  onPositionChange,
  className = ""
}) => {
  // Calcul automatique de la position opposée pour le bouton
  const buttonPosition = getInversedPosition(selectedPosition);

  return (
    <div className={`space-y-3 ${className}`}>
      <label className="block text-sm font-medium text-gray-700">
        Position du jeu
      </label>
      <div className="grid grid-cols-3 gap-2">
        {/* Top */}
        <div></div>
        <button
          onClick={() => onPositionChange('top')}
          className={`p-2 text-xs rounded border transition-colors ${
            selectedPosition === 'top'
              ? 'bg-[#841b60] text-white border-[#841b60]'
              : 'bg-white text-gray-700 border-gray-300 hover:border-[#841b60]'
          }`}
        >
          Haut
        </button>
        <div></div>
        
        {/* Middle row */}
        <button
          onClick={() => onPositionChange('left')}
          className={`p-2 text-xs rounded border transition-colors ${
            selectedPosition === 'left'
              ? 'bg-[#841b60] text-white border-[#841b60]'
              : 'bg-white text-gray-700 border-gray-300 hover:border-[#841b60]'
          }`}
        >
          Gauche
        </button>
        <button
          onClick={() => onPositionChange('center')}
          className={`p-2 text-xs rounded border transition-colors ${
            selectedPosition === 'center'
              ? 'bg-[#841b60] text-white border-[#841b60]'
              : 'bg-white text-gray-700 border-gray-300 hover:border-[#841b60]'
          }`}
        >
          Centre
        </button>
        <button
          onClick={() => onPositionChange('right')}
          className={`p-2 text-xs rounded border transition-colors ${
            selectedPosition === 'right'
              ? 'bg-[#841b60] text-white border-[#841b60]'
              : 'bg-white text-gray-700 border-gray-300 hover:border-[#841b60]'
          }`}
        >
          Droite
        </button>
        
        {/* Bottom */}
        <div></div>
        <button
          onClick={() => onPositionChange('bottom')}
          className={`p-2 text-xs rounded border transition-colors ${
            selectedPosition === 'bottom'
              ? 'bg-[#841b60] text-white border-[#841b60]'
              : 'bg-white text-gray-700 border-gray-300 hover:border-[#841b60]'
          }`}
        >
          Bas
        </button>
        <div></div>
      </div>

      {/* Affichage dynamique de la position du bouton de lancement */}
      <div className="mt-2 text-xs text-gray-500">
        Position du bouton de lancement : <span className="font-bold">{ 
          buttonPosition === 'top' ? 'Haut'
          : buttonPosition === 'bottom' ? 'Bas'
          : buttonPosition === 'left' ? 'Gauche'
          : buttonPosition === 'right' ? 'Droite'
          : 'Centre'
        }</span>
      </div>
    </div>
  );
};

export default GamePositionSelector;
