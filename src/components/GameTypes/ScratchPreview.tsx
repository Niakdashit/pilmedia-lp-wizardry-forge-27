import React, { useState, useEffect } from 'react';
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
  autoStart?: boolean;
  isModal?: boolean;
}
const STORAGE_KEY = 'scratch_session_card';
const SCRATCH_STARTED_KEY = 'scratch_session_started';
const ScratchPreview: React.FC<ScratchPreviewProps> = ({
  config = {},
  onFinish,
  onStart,
  disabled = false,
  buttonLabel = 'Gratter',
  buttonColor = '#841b60',
  gameSize = 'medium',
  autoStart = false,
  isModal = false
}) => {
  const [gameStarted, setGameStarted] = useState(autoStart && !disabled);
  const [finishedCards, setFinishedCards] = useState<Set<number>>(new Set());
  const [hasWon, setHasWon] = useState(false);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [scratchStarted, setScratchStarted] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // Clear any previous session data on component mount to ensure fresh start
  useEffect(() => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(SCRATCH_STARTED_KEY);
  }, []);

  // Automatically start the game in preview mode if autoStart is enabled
  useEffect(() => {
    if (autoStart && !gameStarted && !disabled) {
      setGameStarted(true);
      if (onStart) onStart();
    }
  }, [autoStart, gameStarted, disabled, onStart]);
  const handleGameStart = () => {
    if (disabled) return;
    setGameStarted(true);
    if (onStart) onStart();
  };
  const handleCardSelect = (index: number) => {
    // Only allow selection if no scratch has started and no card is selected
    if (!scratchStarted && selectedCard === null) {
      setSelectedCard(index);
    }
  };
  const handleScratchStart = (index: number) => {
    // Only allow scratch to start on the selected card and if no scratch has started yet
    if (selectedCard === index && !scratchStarted) {
      setScratchStarted(true);
      localStorage.setItem(STORAGE_KEY, index.toString());
      localStorage.setItem(SCRATCH_STARTED_KEY, 'true');
    }
  };
  const handleCardFinish = (result: 'win' | 'lose', cardIndex: number) => {
    const newFinishedCards = new Set([...finishedCards, cardIndex]);
    setFinishedCards(newFinishedCards);
    if (result === 'win') {
      setHasWon(true);
    }
    const totalCards = config?.cards?.length || 1;
    if (newFinishedCards.size >= totalCards) {
      setShowResult(true);
      setTimeout(() => {
        if (onFinish) {
          onFinish(hasWon || result === 'win' ? 'win' : 'lose');
        }
      }, 1000);
    }
  };

  // Ensure we have at least one card with proper defaults
  const cards = config?.cards && config.cards.length > 0 ? config.cards : [{
    id: 1,
    revealImage: config?.revealImage || '',
    revealMessage: config?.revealMessage || 'Félicitations !',
    scratchColor: config?.scratchColor || '#C0C0C0'
  }];
  if (!gameStarted) {
    return <div className={`flex flex-col items-center justify-center ${isModal ? 'py-6 min-h-[400px]' : 'py-12 min-h-[500px]'} bg-gradient-to-br from-gray-50 to-gray-100`}>
        <div className="w-full mb-8">
          <ScratchGameGrid cards={cards} gameSize={gameSize} gameStarted={false} onCardFinish={() => {}} onCardSelect={() => {}} onScratchStart={() => {}} selectedCard={null} scratchStarted={false} config={config} isModal={isModal} />
        </div>

        {!isModal && <div className="text-center space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-800">Cartes à gratter</h3>
              <p className="text-gray-600">Cliquez sur le bouton pour commencer à jouer</p>
            </div>
            
            <button onClick={handleGameStart} disabled={disabled} className="px-8 py-4 rounded-xl font-semibold text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 shadow-lg" style={{
          backgroundColor: disabled ? '#6b7280' : buttonColor
        }}>
              {disabled ? 'Remplissez le formulaire' : buttonLabel}
            </button>
          </div>}
      </div>;
  }
  return <div className={`w-full flex flex-col items-center ${isModal ? 'py-6 min-h-[500px]' : 'py-8 min-h-[600px]'} bg-gradient-to-br from-gray-50 to-gray-100`}>
      <div className="w-full flex-1">
        <ScratchGameGrid cards={cards} gameSize={gameSize} gameStarted={gameStarted} onCardFinish={handleCardFinish} onCardSelect={handleCardSelect} onScratchStart={handleScratchStart} selectedCard={selectedCard} scratchStarted={scratchStarted} config={config} isModal={isModal} />
      </div>

      {/* Message d'instruction et progression - en bas, séparé des cartes */}
      {!showResult && !isModal}
    </div>;
};
export default ScratchPreview;