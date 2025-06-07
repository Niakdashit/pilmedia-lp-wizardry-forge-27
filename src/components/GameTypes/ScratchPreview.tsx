
import React, { useState } from 'react';
import ScratchGameGrid from './ScratchGameGrid';

interface ScratchPreviewProps {
  config?: any;
  onFinish?: (result: 'win' | 'lose') => void;
  onStart?: () => void;
  disabled?: boolean;
  buttonLabel?: string;
  buttonColor?: string;
  gameSize?: 'small' | 'medium' | 'large' | 'xlarge';
  gamePosition?: 'top' | 'center' | 'bottom' | 'left' | 'right';
  isPreview?: boolean;
}

const ScratchPreview: React.FC<ScratchPreviewProps> = ({
  config = {},
  onFinish,
  onStart,
  disabled = false,
  buttonLabel = 'Gratter',
  buttonColor = '#841b60',
  gameSize = 'medium',
  isPreview = false
}) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [finishedCards, setFinishedCards] = useState<Set<number>>(new Set());
  const [hasWon, setHasWon] = useState(false);

  // Gérer le démarrage du jeu
  const handleGameStart = () => {
    if (disabled) return;
    setGameStarted(true);
    if (onStart) onStart();
  };

  const handleCardFinish = (result: 'win' | 'lose', cardIndex: number) => {
    const newFinishedCards = new Set([...finishedCards, cardIndex]);
    setFinishedCards(newFinishedCards);
    
    if (result === 'win') {
      setHasWon(true);
    }

    // Vérifier si toutes les cartes sont terminées
    const totalCards = config?.cards?.length || 1;
    if (newFinishedCards.size >= totalCards) {
      // Délai pour permettre l'animation de la dernière carte
      setTimeout(() => {
        if (onFinish) {
          onFinish(hasWon || result === 'win' ? 'win' : 'lose');
        }
      }, 1000);
    }
  };

  // S'assurer qu'il y a au moins une carte par défaut
  const cards = config?.cards && config.cards.length > 0 
    ? config.cards 
    : [{ id: 1, revealImage: '', revealMessage: 'Félicitations !', scratchColor: config?.scratchColor }];

  // Si le jeu n'a pas encore commencé, afficher le bouton
  if (!gameStarted) {
    return (
      <div className="flex flex-col items-center space-y-6 my-6">
        {/* Grille des cartes avant le jeu - responsive avec espacement */}
        <ScratchGameGrid
          cards={cards}
          gameSize={gameSize}
          gameStarted={false}
          onCardFinish={() => {}}
          config={config}
        />

        <button
          onClick={handleGameStart}
          disabled={disabled}
          className="px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
          style={{ backgroundColor: disabled ? '#6b7280' : buttonColor }}
        >
          {disabled ? 'Remplissez le formulaire' : buttonLabel}
        </button>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center space-y-6">
      {/* Grille responsive des cartes */}
      <ScratchGameGrid
        cards={cards}
        gameSize={gameSize}
        gameStarted={gameStarted}
        onCardFinish={handleCardFinish}
        config={config}
      />

      {/* Indicateur de progression */}
      <div className="text-center">
        <div className="text-sm text-gray-600">
          Cartes terminées: {finishedCards.size}/{cards.length}
        </div>
        
        {/* Barre de progression */}
        <div className="w-48 bg-gray-200 rounded-full h-2 mt-2">
          <div 
            className="bg-[#841b60] h-2 rounded-full transition-all duration-300" 
            style={{ width: `${(finishedCards.size / cards.length) * 100}%` }} 
          />
        </div>
      </div>
    </div>
  );
};

export default ScratchPreview;
