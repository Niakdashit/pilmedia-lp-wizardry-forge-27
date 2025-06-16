
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ScratchPreviewProps {
  config?: any;
}

const ScratchPreview: React.FC<ScratchPreviewProps> = ({ config = {} }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchPercentage, setScratchPercentage] = useState(0);
  const [result] = useState<'win' | 'lose'>(Math.random() > 0.7 ? 'win' : 'lose');

  useEffect(() => {
    if (canvasRef.current && !isRevealed) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Set canvas size
      canvas.width = 280;
      canvas.height = 200;

      // Draw scratch layer
      ctx.fillStyle = config?.scratchColor || '#C0C0C0';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add scratch pattern text
      ctx.fillStyle = '#999';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Grattez ici', canvas.width / 2, canvas.height / 2 - 10);
      ctx.fillText('pour découvrir', canvas.width / 2, canvas.height / 2 + 10);

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

        // Calculate scratch percentage
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
        let transparentPixels = 0;

        for (let i = 0; i < pixels.length; i += 4) {
          if (pixels[i + 3] === 0) transparentPixels++;
        }

        const percentage = (transparentPixels / (pixels.length / 4)) * 100;
        setScratchPercentage(Math.round(percentage));

        if (percentage >= (config?.requiredScratchPercent || 70) && !isRevealed) {
          setIsRevealed(true);
        }
      };

      const startDrawing = () => (isDrawing = true);
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
  }, [config, isRevealed]);

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
            ? config?.winMessage || 'Félicitations !' 
            : config?.loseMessage || 'Dommage !'}
        </div>
      </div>
    );
  };

  const resetGame = () => {
    setIsRevealed(false);
    setScratchPercentage(0);
    // Trigger useEffect to redraw canvas
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto p-4">
      <div className="mb-4 text-center">
        <div className="text-sm text-gray-600 mb-2">
          Progression: {scratchPercentage}% / {config?.requiredScratchPercent || 70}%
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-[#841b60] h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(scratchPercentage, 100)}%` }}
          />
        </div>
      </div>

      <div className="relative w-full aspect-[7/5] rounded-lg overflow-hidden border-2 border-gray-300">
        {/* Background content */}
        <div className="absolute inset-0">
          {getResultContent()}
        </div>

        {/* Scratch canvas overlay */}
        {!isRevealed && (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full cursor-crosshair"
            style={{ touchAction: 'none' }}
          />
        )}

        {/* Result overlay */}
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
                  ? config?.winMessage || 'Vous avez gagné !' 
                  : config?.loseMessage || 'Réessayez !'}
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
