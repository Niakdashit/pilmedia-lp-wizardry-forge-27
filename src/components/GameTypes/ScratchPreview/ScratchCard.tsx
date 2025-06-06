import React, { useRef, useEffect } from 'react';
import { ScratchCardProps } from './types';

const ScratchCard: React.FC<ScratchCardProps> = ({
  cardIndex,
  card,
  cardState,
  width,
  height,
  config,
  onCardUpdate,
  onFinish
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (cardState.isRevealed) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

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
      
      onCardUpdate(cardIndex, { scratchPercentage: Math.round(percentage) });

      const requiredPercent = config?.scratchArea || 70;
      if (percentage >= requiredPercent && !cardState.isRevealed) {
        onCardUpdate(cardIndex, { isRevealed: true });
        
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
  }, [cardState.isRevealed, width, height, config, card, cardIndex, onCardUpdate, onFinish, cardState.result]);

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

  return (
    <div className="flex flex-col items-center space-y-2">
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
          {getResultContent()}
        </div>

        {/* Canvas de grattage */}
        {!cardState.isRevealed && (
          <canvas
            ref={canvasRef}
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
};

export default ScratchCard;
