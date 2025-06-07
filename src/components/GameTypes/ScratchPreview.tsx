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
}

const ScratchCard: React.FC<{
  card: any;
  index: number;
  gameSize: string;
  gameStarted: boolean;
  onCardFinish: (result: 'win' | 'lose') => void;
  config: any;
}> = ({ card, index, gameSize, gameStarted, onCardFinish, config }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchPercentage, setScratchPercentage] = useState(0);
  const [result, setResult] = useState<'win' | 'lose' | null>(null);

  // Dimensions selon la taille
  const getDimensions = () => {
    switch (gameSize) {
      case 'small': return { width: 160, height: 120 };
      case 'medium': return { width: 200, height: 140 };
      case 'large': return { width: 240, height: 180 };
      case 'xlarge': return { width: 280, height: 200 };
      default: return { width: 200, height: 140 };
    }
  };

  const { width, height } = getDimensions();

  useEffect(() => {
    if (gameStarted && !result) {
      // Calculer le résultat pour cette carte
      const gameResult = Math.random() > 0.7 ? 'win' : 'lose';
      setResult(gameResult);
    }
  }, [gameStarted, result]);

  useEffect(() => {
    if (canvasRef.current && gameStarted && !isRevealed && result) {
      const canvas = canvasRef.current;
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
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Grattez ici', canvas.width / 2, canvas.height / 2 - 5);
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
        setScratchPercentage(Math.round(percentage));

        const requiredPercent = config?.scratchArea || 70;
        if (percentage >= requiredPercent && !isRevealed) {
          setIsRevealed(true);
          if (onCardFinish && result) {
            setTimeout(() => onCardFinish(result), 500);
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
    }
  }, [config, isRevealed, gameStarted, result, width, height, onCardFinish, card]);

  const getResultContent = () => {
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
        result === 'win' ? 'bg-gradient-to-br from-yellow-300 to-yellow-500' : 'bg-gradient-to-br from-gray-300 to-gray-500'
      }`}>
        <div className="text-2xl mb-1">
          {result === 'win' ? '🎉' : '😔'}
        </div>
        <div className="text-sm font-bold text-gray-800 text-center px-2">
          {result === 'win'
            ? revealMessage || 'Félicitations !'
            : 'Dommage !'}
        </div>
      </div>
    );
  };

  if (!gameStarted) {
    return (
      <div className="flex flex-col items-center">
        <div
          className="relative rounded-lg overflow-hidden border-2 border-gray-300 mb-2"
          style={{ width: `${width}px`, height: `${height}px` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="text-lg mb-1">🎫</div>
              <div className="text-xs">Carte {index + 1}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      {gameStarted && !isRevealed && (
        <div className="text-center mb-2">
          <div className="text-xs text-gray-600 mb-1">
            Carte {index + 1} - {scratchPercentage}%
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1 max-w-[120px] mx-auto">
            <div 
              className="bg-[#841b60] h-1 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(scratchPercentage, 100)}%` }}
            />
          </div>
        </div>
      )}

      <div className="relative rounded-lg overflow-hidden border-2 border-gray-300" style={{ width: `${width}px`, height: `${height}px` }}>
        {/* Contenu à révéler */}
        <div className="absolute inset-0">
          {getResultContent()}
        </div>

        {/* Canvas de grattage */}
        {gameStarted && !isRevealed && (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full cursor-crosshair"
            style={{ touchAction: 'none' }}
          />
        )}

        {/* Overlay de résultat */}
        {isRevealed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-black/80"
          >
            <div className="bg-white p-3 rounded-lg shadow-lg text-center max-w-[90%]">
              <div className="text-xl mb-1">
                {result === 'win' ? '🎊' : '💫'}
              </div>
              <p className="text-sm font-bold">
                {result === 'win'
                  ? card.revealMessage || config?.revealMessage || 'Vous avez gagné !'
                  : 'Réessayez !'}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

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

  const cards = config?.cards || [{ id: 1, revealImage: '', revealMessage: '' }];

  // Si le jeu n'a pas encore commencé, afficher le bouton
  if (!gameStarted) {
    return (
      <div className="flex flex-col items-center space-y-4">
        {/* Grille des cartes avant le jeu - responsive */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {cards.map((card: any, index: number) => (
            <ScratchCard
              key={card.id || index}
              card={card}
              index={index}
              gameSize={gameSize}
              gameStarted={false}
              onCardFinish={() => {}}
              config={config}
            />
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

  return (
    <div className="w-full flex flex-col items-center space-y-4">
      {/* Grille responsive des cartes - toutes affichées simultanément */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {cards.map((card: any, index: number) => (
          <ScratchCard
            key={card.id || index}
            card={card}
            index={index}
            gameSize={gameSize}
            gameStarted={gameStarted}
            onCardFinish={(result) => handleCardFinish(result, index)}
            config={config}
          />
        ))}
      </div>

      {/* Indicateur de progression */}
      <div className="text-center">
        <div className="text-sm text-gray-600">
          Cartes terminées: {finishedCards.size}/{cards.length}
        </div>
      </div>
    </div>
  );
};

export default ScratchPreview;
