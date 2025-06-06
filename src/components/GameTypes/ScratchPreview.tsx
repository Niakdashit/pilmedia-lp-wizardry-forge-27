
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ScratchCardGrid from './ScratchPreview/ScratchCardGrid';
import { ScratchPreviewProps, CardState } from './ScratchPreview/types';
import { calculateResult, getDimensions, getGridClasses } from './ScratchPreview/utils';

const ScratchPreview: React.FC<ScratchPreviewProps> = ({
  config = {},
  onFinish,
  onStart,
  disabled = false,
  buttonLabel = 'Gratter',
  buttonColor = '#841b60',
  gameSize = 'medium',
  instantWinConfig
}) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [cardsState, setCardsState] = useState<CardState[]>([]);

  // Gérer le démarrage du jeu
  const handleGameStart = () => {
    if (disabled) return;
    
    setGameStarted(true);
    const cards = config?.cards || [{}];
    const initialStates = cards.map(() => ({
      isRevealed: false,
      scratchPercentage: 0,
      result: calculateResult(instantWinConfig)
    }));
    setCardsState(initialStates);
    
    if (onStart) onStart();
  };

  const handleCardUpdate = (cardIndex: number, updates: Partial<CardState>) => {
    setCardsState(prev => {
      const newState = [...prev];
      newState[cardIndex] = { ...newState[cardIndex], ...updates };
      return newState;
    });
  };

  const { width, height } = getDimensions(gameSize);
  const cards = config?.cards || [{}];

  const resetGame = () => {
    setGameStarted(false);
    setCardsState([]);
  };

  // Si le jeu n'a pas encore commencé, afficher le bouton
  if (!gameStarted) {
    return (
      <div className="flex flex-col items-center space-y-4">
        <div className={getGridClasses()}>
          {cards.map((_: any, index: number) => (
            <div
              key={index}
              className="relative rounded-lg overflow-hidden border-2 border-gray-300"
              style={{ width: `${width}px`, height: `${height}px` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-xl mb-1">🎫</div>
                  <div className="text-xs">Carte {index + 1}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleGameStart}
          disabled={disabled}
          className="px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
          style={{
            backgroundColor: disabled ? '#6b7280' : buttonColor
          }}
        >
          {disabled ? 'Remplissez le formulaire' : buttonLabel}
        </button>
      </div>
    );
  }

  // Afficher toutes les cartes en cours de jeu
  return (
    <div className="w-full flex flex-col items-center space-y-4">
      <ScratchCardGrid
        cards={cards}
        cardsState={cardsState}
        width={width}
        height={height}
        config={config}
        onCardUpdate={handleCardUpdate}
        onFinish={onFinish}
      />

      {/* Bouton de reset quand toutes les cartes sont révélées */}
      {cardsState.length > 0 && cardsState.every(card => card.isRevealed) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-4"
        >
          <button
            onClick={resetGame}
            className="px-6 py-3 bg-[#841b60] text-white rounded-lg hover:bg-[#6d1650] transition-colors font-semibold"
          >
            Rejouer
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default ScratchPreview;
