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

const ScratchPreview: React.FC<ScratchPreviewProps> = ({ 
  config = {},
  onFinish,
  onStart,
  disabled = false,
  buttonLabel = 'Gratter',
  buttonColor = '#841b60',
  gameSize = 'medium',
  isPreview = true,
  instantWinConfig
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchPercentage, setScratchPercentage] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [result, setResult] = useState<'win' | 'lose' | null>(null);

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
    const gameResult = calculateResult();
    setResult(gameResult);
    
    if (onStart) onStart();
  };

  // Dimensions selon la taille
  const getDimensions = () => {
    switch (gameSize) {
      case 'small': return { width: 200, height: 140 };
      case 'medium': return { width: 280, height: 200 };
      case 'large': return { width: 350, height: 250 };
      case 'xlarge': return { width: 420, height: 300 };
      default: return { width: 280, height: 200 };
    }
  };

  const { width, height } = getDimensions();

  useEffect(() => {
    if (canvasRef.current && gameStarted && !isRevealed) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = width;
      canvas.height = height;

      // Surface à gratter
      if (config?.scratchSurface) {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
        img.src = config.scratchSurface;
      } else {
        ctx.fillStyle = config?.scratchColor || '#C0C0C0';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Texture métallique par défaut
        ctx.fillStyle = '#999';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Grattez ici', canvas.width / 2, canvas.height / 2 - 10);
        ctx.fillText('pour découvrir', canvas.width / 2, canvas.height / 2 + 10);
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
        ctx.arc(x, y, 20, 0, Math.PI * 2);
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
          if (onFinish && result) {
            setTimeout(() => onFinish(result), 500);
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
  }, [config, isRevealed, gameStarted, result, width, height, onFinish]);

  const getResultContent = () => {
    if (config?.revealImage) {
      return (
        <img
          src={config.revealImage}
          alt="Contenu révélé"
          className="w-full h-full object-cover"
        />
      );
    }

    return (
      <div className={`w-full h-full flex flex-col items-center justify-center ${
        result === 'win' ? 'bg-gradient-to-br from-yellow-300 to-yellow-500' : 'bg-gradient-to-br from-gray-300 to-gray-500'
      }`}>
        <div className="text-4xl mb-2">
          {result === 'win' ? '🎉' : '😔'}
        </div>
        <div className="text-lg font-bold text-gray-800">
          {result === 'win' 
            ? config?.revealMessage || 'Félicitations !' 
            : 'Dommage, réessayez !'}
        </div>
      </div>
    );
  };

  const resetGame = () => {
    setIsRevealed(false);
    setScratchPercentage(0);
    setGameStarted(false);
    setResult(null);
  };

  // Si le jeu n'a pas encore commencé, afficher le bouton
  if (!gameStarted) {
    return (
      <div className="flex flex-col items-center space-y-4">
        <div 
          className="relative rounded-lg overflow-hidden border-2 border-gray-300"
          style={{ width: `${width}px`, height: `${height}px` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="text-2xl mb-2">🎫</div>
              <div className="text-sm">Carte à gratter</div>
            </div>
          </div>
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
      {gameStarted && !isRevealed && (
        <div className="text-center">
          <div className="text-sm text-gray-600 mb-2">
            Progression: {scratchPercentage}% / {config?.scratchArea || 70}%
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 max-w-xs mx-auto">
            <div 
              className="bg-[#841b60] h-2 rounded-full transition-all duration-300"
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
            <div className="bg-white p-4 rounded-lg shadow-lg text-center">
              <div className="text-2xl mb-2">
                {result === 'win' ? '🎊' : '💫'}
              </div>
              <p className="text-lg font-bold mb-2">
                {result === 'win' 
                  ? config?.revealMessage || 'Vous avez gagné !' 
                  : 'Réessayez !'}
              </p>
              <button
                onClick={resetGame}
                className="px-4 py-2 bg-[#841b60] text-white rounded hover:bg-[#6d1650] transition-colors"
              >
                Rejouer
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ScratchPreview;
