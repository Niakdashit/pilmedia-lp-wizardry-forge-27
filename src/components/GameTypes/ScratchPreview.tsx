
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

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
  instantWinConfig?: {
    mode: 'instant_winner';
    winProbability: number;
    maxWinners?: number;
    winnersCount?: number;
  };
}

interface CardState {
  isRevealed: boolean;
  scratchPercentage: number;
  result: 'win' | 'lose' | null;
}

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
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);

  // Calculer le résultat avec la logique instant win
  const calculateResult = (): 'win' | 'lose' => {
    if (instantWinConfig && instantWinConfig.mode === 'instant_winner') {
      const hasReachedMaxWinners = instantWinConfig.maxWinners 
        ? (instantWinConfig.winnersCount || 0) >= instantWinConfig.maxWinners 
        : false;
      
      if (hasReachedMaxWinners) return 'lose';
      
      return Math.random() < instantWinConfig.winProbability ? 'win' : 'lose';
    }
    
    return Math.random() > 0.7 ? 'win' : 'lose';
  };

  // Gérer le démarrage du jeu
  const handleGameStart = () => {
    if (disabled) return;
    
    setGameStarted(true);
    const cards = config?.cards || [{}];
    const initialStates = cards.map(() => ({
      isRevealed: false,
      scratchPercentage: 0,
      result: calculateResult()
    }));
    setCardsState(initialStates);
    canvasRefs.current = new Array(cards.length).fill(null);
    
    if (onStart) onStart();
  };

  // Dimensions selon la taille
  const getDimensions = () => {
    switch (gameSize) {
      case 'small': return { width: 160, height: 110 };
      case 'medium': return { width: 200, height: 140 };
      case 'large': return { width: 240, height: 170 };
      case 'xlarge': return { width: 280, height: 200 };
      default: return { width: 200, height: 140 };
    }
  };

  const { width, height } = getDimensions();
  const cards = config?.cards || [{}];

  // Classes CSS responsive pour la grille
  const getGridClasses = () => {
    return "grid grid-cols-2 md:grid-cols-3 gap-4";
  };

  useEffect(() => {
    if (!gameStarted || cardsState.length === 0) return;

    cardsState.forEach((cardState, cardIndex) => {
      const canvas = canvasRefs.current[cardIndex];
      const card = cards[cardIndex] || {};
      
      if (!canvas || cardState.isRevealed) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = width;
      canvas.height = height;

      // Surface à gratter
      const surface = card.scratchSurface || config?.scratchSurface;
      if (surface) {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
        img.src = surface;
      } else {
        ctx.fillStyle = card.scratchColor || config?.scratchColor || '#C0C0C0';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Texture métallique par défaut
        ctx.fillStyle = '#999';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Grattez ici', canvas.width / 2, canvas.height / 2 - 8);
        ctx.fillText('pour découvrir', canvas.width / 2, canvas.height / 2 + 8);
      }

      let isDrawing = false;

      const getXY = (e: MouseEvent | TouchEvent) => {
        const rect = canvas.getBoundingClientRect();
        if ('touches' in e) {
          return {
            x: (e.touches[0].clientX - rect.left) * (canvas.width / rect.width),
            y: (e.touches[0].clientY - rect.top) * (canvas.height / rect.height),
          };
        }
        return {
          x: (e.clientX - rect.left) * (canvas.width / rect.width),
          y: (e.clientY - rect.top) * (canvas.height / rect.height),
        };
      };

      const scratch = (e: MouseEvent | TouchEvent) => {
        if (!isDrawing) return;
        const { x, y } = getXY(e);

        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 15, 0, Math.PI * 2);
        ctx.fill();

        // Calculer le pourcentage gratté
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
        let transparentPixels = 0;

        for (let i = 0; i < pixels.length; i += 4) {
          if (pixels[i + 3] === 0) transparentPixels++;
        }

        const percentage = (transparentPixels / (pixels.length / 4)) * 100;
        
        setCardsState(prev => {
          const newState = [...prev];
          newState[cardIndex] = { ...newState[cardIndex], scratchPercentage: Math.round(percentage) };
          return newState;
        });

        const requiredPercent = config?.scratchArea || 70;
        if (percentage >= requiredPercent && !cardState.isRevealed) {
          setCardsState(prev => {
            const newState = [...prev];
            newState[cardIndex] = { ...newState[cardIndex], isRevealed: true };
            return newState;
          });
          
          if (onFinish && cardState.result) {
            setTimeout(() => onFinish(cardState.result!), 500);
          }
        }
      };

      const startDrawing = (e: Event) => {
        e.preventDefault();
        isDrawing = true;
      };
      const stopDrawing = () => (isDrawing = false);

      canvas.addEventListener('mousedown', startDrawing);
      canvas.addEventListener('mousemove', scratch);
      canvas.addEventListener('mouseup', stopDrawing);
      canvas.addEventListener('mouseleave', stopDrawing);
      canvas.addEventListener('touchstart', startDrawing);
      canvas.addEventListener('touchmove', scratch);
      canvas.addEventListener('touchend', stopDrawing);

      return () => {
        canvas.removeEventListener('mousedown', startDrawing);
        canvas.removeEventListener('mousemove', scratch);
        canvas.removeEventListener('mouseup', stopDrawing);
        canvas.removeEventListener('mouseleave', stopDrawing);
        canvas.removeEventListener('touchstart', startDrawing);
        canvas.removeEventListener('touchmove', scratch);
        canvas.removeEventListener('touchend', stopDrawing);
      };
    });
  }, [gameStarted, cardsState, width, height, config, cards, onFinish]);

  const getResultContent = (cardIndex: number) => {
    const card = cards[cardIndex] || {};
    const cardState = cardsState[cardIndex];
    const revealImage = card.revealImage || config?.revealImage;
    const revealMessage = card.revealMessage || config?.revealMessage;

    if (revealImage) {
      return (
        <img
          src={revealImage}
          alt="Contenu révélé"
          className="w-full h-full object-cover"
        />
      );
    }

    return (
      <div className={`w-full h-full flex flex-col items-center justify-center ${
        cardState?.result === 'win' ? 'bg-gradient-to-br from-yellow-300 to-yellow-500' : 'bg-gradient-to-br from-gray-300 to-gray-500'
      }`}>
        <div className="text-2xl mb-1">
          {cardState?.result === 'win' ? '🎉' : '😔'}
        </div>
        <div className="text-sm font-bold text-gray-800 text-center px-2">
          {cardState?.result === 'win'
            ? revealMessage || 'Félicitations !'
            : 'Dommage !'}
        </div>
      </div>
    );
  };

  const resetGame = () => {
    setGameStarted(false);
    setCardsState([]);
    canvasRefs.current = [];
  };

  // Si le jeu n'a pas encore commencé, afficher le bouton
  if (!gameStarted) {
    return (
      <div className="flex flex-col items-center space-y-4">
        <div className={getGridClasses()}>
          {cards.map((_, index) => (
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
      <div className={getGridClasses()}>
        {cards.map((card, cardIndex) => {
          const cardState = cardsState[cardIndex];
          if (!cardState) return null;

          return (
            <div key={cardIndex} className="flex flex-col items-center space-y-2">
              {/* Indicateur de progression pour chaque carte */}
              {!cardState.isRevealed && (
                <div className="w-full max-w-[200px]">
                  <div className="text-xs text-gray-600 mb-1 text-center">
                    Carte {cardIndex + 1}: {cardState.scratchPercentage}% / {config?.scratchArea || 70}%
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1">
                    <div 
                      className="bg-[#841b60] h-1 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(cardState.scratchPercentage, 100)}%` }}
                    />
                  </div>
                </div>
              )}

              <div 
                className="relative rounded-lg overflow-hidden border-2 border-gray-300" 
                style={{ width: `${width}px`, height: `${height}px` }}
              >
                {/* Contenu à révéler */}
                <div className="absolute inset-0">
                  {getResultContent(cardIndex)}
                </div>

                {/* Canvas de grattage */}
                {!cardState.isRevealed && (
                  <canvas
                    ref={el => canvasRefs.current[cardIndex] = el}
                    className="absolute inset-0 w-full h-full cursor-crosshair"
                    style={{ touchAction: 'none' }}
                  />
                )}

                {/* Badge de statut */}
                {cardState.isRevealed && (
                  <div className="absolute top-1 right-1 z-10">
                    <div className={`text-xs px-2 py-1 rounded-full text-white ${
                      cardState.result === 'win' ? 'bg-green-500' : 'bg-gray-500'
                    }`}>
                      {cardState.result === 'win' ? 'Gagné !' : 'Perdu'}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

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
