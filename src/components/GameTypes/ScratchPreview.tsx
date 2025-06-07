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
  gameSize = 'medium'
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
    setFinishedCards(prev => new Set([...prev, cardIndex]));
    if (result === 'win') {
      setHasWon(true);
    }

    // Vérifier si toutes les cartes sont terminées
    const totalCards = config?.cards?.length || 1;
    if (finishedCards.size + 1 >= totalCards) {
      if (onFinish) {
        onFinish(hasWon || result === 'win' ? 'win' : 'lose');
      }
    }
  };
  const cards = config?.cards || [{
    id: 1,
    revealImage: '',
    revealMessage: ''
  }];

  // Si le jeu n'a pas encore commencé, afficher le bouton
  if (!gameStarted) {
    return <div className="flex flex-col items-center space-y-6 px-0 mx-[6px] my-[240px]">
        {/* Grille des cartes avant le jeu - responsive avec espacement renforcé */}
        <ScratchGameGrid cards={cards} gameSize={gameSize} gameStarted={false} onCardFinish={() => {}} config={config} />

        <button onClick={handleGameStart} disabled={disabled} className="px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90" style={{
        backgroundColor: disabled ? '#6b7280' : buttonColor
      }}>
          {disabled ? 'Remplissez le formulaire' : buttonLabel}
        </button>
      </div>;
  }
  return <div className="w-full flex flex-col items-center space-y-6">
      {/* Grille responsive des cartes - toutes affichées simultanément avec espacement renforcé */}
      <ScratchGameGrid cards={cards} gameSize={gameSize} gameStarted={gameStarted} onCardFinish={handleCardFinish} config={config} />

      {/* Indicateur de progression */}
      <div className="text-center">
        <div className="text-sm text-gray-600">
          Cartes terminées: {finishedCards.size}/{cards.length}
        </div>
      </div>
    </div>;
};
export default ScratchPreview;