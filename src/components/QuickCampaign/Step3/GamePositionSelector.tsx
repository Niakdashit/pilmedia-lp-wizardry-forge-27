
import React from 'react';
import { useQuickCampaignStore } from '../../../stores/quickCampaignStore';

const GamePositionSelector: React.FC = () => {
  const { gamePosition, setGamePosition } = useQuickCampaignStore();

  const positions = [
    { id: 'top' as const, name: 'Haut', description: 'Jeu en haut de l\'écran' },
    { id: 'center' as const, name: 'Centre', description: 'Jeu au centre (recommandé)' },
    { id: 'bottom' as const, name: 'Bas', description: 'Jeu en bas de l\'écran' },
    { id: 'left' as const, name: 'Gauche', description: 'Jeu à gauche' },
    { id: 'right' as const, name: 'Droite', description: 'Jeu à droite' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
          <span className="text-white text-xs">📍</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Position du jeu</h3>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {positions.map((position) => (
          <button
            key={position.id}
            onClick={() => setGamePosition(position.id)}
            className={`p-4 border-2 rounded-xl text-left transition-all duration-200 hover:shadow-md ${
              gamePosition === position.id
                ? 'border-green-500 bg-green-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">{position.name}</div>
                <div className="text-sm text-gray-600">{position.description}</div>
              </div>
              <div className={`w-4 h-4 rounded-full border-2 ${
                gamePosition === position.id
                  ? 'bg-green-500 border-green-500'
                  : 'border-gray-300'
              }`}>
                {gamePosition === position.id && (
                  <div className="w-full h-full rounded-full bg-white scale-50"></div>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <p className="text-sm text-gray-600">
          💡 La position "Centre" est recommandée pour une meilleure expérience utilisateur sur tous les appareils.
        </p>
      </div>
    </div>
  );
};

export default GamePositionSelector;
