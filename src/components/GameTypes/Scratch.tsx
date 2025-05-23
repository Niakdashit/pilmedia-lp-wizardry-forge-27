
import React, { useState } from 'react';

interface ScratchProps {
  image?: string;
  revealPercentage?: number;
  onReveal?: () => void;
}

const Scratch: React.FC<ScratchProps> = ({
  image = 'https://via.placeholder.com/300',
  revealPercentage = 50,
  onReveal
}) => {
  const [revealed, setRevealed] = useState(false);

  const handleReveal = () => {
    setRevealed(true);
    if (onReveal) {
      onReveal();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-full max-w-xs aspect-square bg-gray-200 rounded-lg overflow-hidden">
        {/* Prize image */}
        <img
          src={image}
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
