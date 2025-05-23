
import React, { useState } from 'react';

interface ScratchProps {
  image?: string;
  revealPercentage?: number;
  onReveal?: () => void;
  onComplete?: () => void;
  onConfigChange?: (config: any) => void;
  config?: {
    image: string;
    revealPercentage: number;
  };
}

const Scratch: React.FC<ScratchProps> = ({
  image = 'https://via.placeholder.com/300',
  onReveal,
  onComplete,
  config
}) => {
  // Use image from config if provided
  const imageToShow = config?.image || image;
  // Use revealPercentage from config if provided, otherwise default to 50
  const [revealed, setRevealed] = useState(false);

  const handleReveal = () => {
    setRevealed(true);
    if (onReveal) {
      onReveal();
    }
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-full max-w-xs aspect-square bg-gray-200 rounded-lg overflow-hidden">
        {/* Prize image */}
        <img
          src={imageToShow}
          alt="Scratch prize"
          className="w-full h-full object-cover"
          style={{ opacity: revealed ? 1 : 0.2 }}
        />
        
        {/* Scratch overlay */}
        {!revealed && (
          <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
            <div className="text-center px-4">
              <p className="font-bold text-lg mb-2">Scratch Here!</p>
              <p className="text-sm text-gray-600">Scratch to reveal your prize</p>
            </div>
          </div>
        )}
      </div>
      
      <button
        onClick={handleReveal}
        className="mt-4 bg-[#841b60] text-white px-4 py-2 rounded"
      >
        {revealed ? 'Revealed!' : 'Reveal Prize'}
      </button>
    </div>
  );
};

export default Scratch;
