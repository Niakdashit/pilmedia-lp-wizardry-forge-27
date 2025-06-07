
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
  autoStart = false
}) => {
  const [gameStarted, setGameStarted] = useState(autoStart && !disabled);
  const [finishedCards, setFinishedCards] = useState<Set<number>>(new Set());
  const [hasWon, setHasWon] = useState(false);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [scratchStarted, setScratchStarted] = useState(false);

  // Clear any previous session data on component mount to ensure fresh start
  useEffect(() => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(SCRATCH_STARTED_KEY);
    console.log('Starting fresh session - all cards are selectable');
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
      console.log(`Card ${index} selected but not saved to storage yet`);
    }
  };

  const handleScratchStart = (index: number) => {
    // Only allow scratch to start on the selected card and if no scratch has started yet
    if (selectedCard === index && !scratchStarted) {
      setScratchStarted(true);
      localStorage.setItem(STORAGE_KEY, index.toString());
      localStorage.setItem(SCRATCH_STARTED_KEY, 'true');
      console.log(`Scratch started on card ${index}, all other cards are now permanently locked`);
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
      setTimeout(() => {
        if (onFinish) {
          onFinish(hasWon || result === 'win' ? 'win' : 'lose');
        }
      }, 1000);
    }
  };

  const handleReplay = () => {
    // Reset all states to restart the game
    setGameStarted(false);
    setFinishedCards(new Set());
    setHasWon(false);
    setSelectedCard(null);
    setScratchStarted(false);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(SCRATCH_STARTED_KEY);
    console.log('Game reset - ready to start over');
  };

  // Ensure we have at least one card with proper defaults
  const cards = config?.cards && config.cards.length > 0 
    ? config.cards 
    : [{ 
        id: 1, 
        revealImage: config?.revealImage || '', 
        revealMessage: config?.revealMessage || 'Félicitations !', 
        scratchColor: config?.scratchColor || '#C0C0C0' 
      }];

  if (!gameStarted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-8 px-4 py-8">
        <div className="w-full max-w-6xl mx-auto">
          <ScratchGameGrid
            cards={cards}
            gameSize={gameSize}
            gameStarted={false}
            onCardFinish={() => {}}
            onCardSelect={() => {}}
            onScratchStart={() => {}}
            selectedCard={null}
            scratchStarted={false}
            config={config}
          />
        </div>

        <button
          onClick={handleGameStart}
          disabled={disabled}
          className="px-8 py-4 rounded-lg font-semibold text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 shadow-lg"
          style={{ backgroundColor: disabled ? '#6b7280' : buttonColor }}
        >
          {disabled ? 'Remplissez le formulaire' : buttonLabel}
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full">
      <ScratchGameGrid
        cards={cards}
        gameSize={gameSize}
        gameStarted={gameStarted}
        onCardFinish={handleCardFinish}
        onCardSelect={handleCardSelect}
        onScratchStart={handleScratchStart}
        selectedCard={selectedCard}
        scratchStarted={scratchStarted}
        config={config}
        onReplay={handleReplay}
      />

      {/* Instructions et progrès */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 px-4 py-4">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <div className="text-sm sm:text-base text-gray-600 font-medium">
            {!scratchStarted && selectedCard === null && "Choisissez une carte à gratter"}
            {!scratchStarted && selectedCard !== null && "Grattez votre carte sélectionnée"}
            {scratchStarted && `Cartes terminées: ${finishedCards.size}/${cards.length}`}
          </div>
          
          {scratchStarted && (
            <div className="w-full max-w-xs mx-auto">
              <div className="w-full bg-gray-200 rounded-full h-2.5 shadow-inner">
                <div 
                  className="bg-[#841b60] h-2.5 rounded-full transition-all duration-300 shadow-sm" 
                  style={{ width: `${(finishedCards.size / cards.length) * 100}%` }} 
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScratchPreview;
