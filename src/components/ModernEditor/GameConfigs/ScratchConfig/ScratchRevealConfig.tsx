
import React from 'react';
import { Percent, Type, Image } from 'lucide-react';

interface ScratchRevealConfigProps {
  scratchArea: number;
  revealMessage: string;
  revealImage?: string;
  onScratchAreaChange: (area: number) => void;
  onRevealMessageChange: (message: string) => void;
  onRevealImageChange: (image: string) => void;
}

const ScratchRevealConfig: React.FC<ScratchRevealConfigProps> = ({
  scratchArea,
  revealMessage,
  revealImage,
  onScratchAreaChange,
  onRevealMessageChange,
  onRevealImageChange
}) => {
  return (
    <>
      {/* Zone à gratter */}
      <div className="space-y-2">
        <label className="flex items-center text-sm font-medium text-gray-700">
          <Percent className="w-4 h-4 mr-2" />
          Pourcentage à gratter pour révéler
        </label>
        <input
          type="range"
          min="30"
          max="90"
          value={scratchArea}
          onChange={(e) => onScratchAreaChange(parseInt(e.target.value))}
          className="w-full"
        />
        <div className="text-xs text-gray-500 text-center">
          {scratchArea}%
        </div>
      </div>

      {/* Message de révélation global */}
      <div className="space-y-2">
        <label className="flex items-center text-sm font-medium text-gray-700">
          <Type className="w-4 h-4 mr-2" />
          Message de révélation par défaut
        </label>
        <input
          type="text"
          value={revealMessage}
          onChange={(e) => onRevealMessageChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
          placeholder="Message affiché en cas de victoire"
        />
      </div>

      {/* Image de révélation globale */}
      <div className="space-y-2">
        <label className="flex items-center text-sm font-medium text-gray-700">
          <Image className="w-4 h-4 mr-2" />
          Image de révélation par défaut (optionnel)
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const url = URL.createObjectURL(file);
              onRevealImageChange(url);
            }
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
        />
        {revealImage && (
          <div className="mt-2">
            <img
              src={revealImage}
              alt="Aperçu"
              className="w-full h-20 object-cover rounded border"
            />
            <button
              onClick={() => onRevealImageChange('')}
              className="mt-1 text-xs text-red-600 hover:text-red-800"
            >
              Supprimer
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ScratchRevealConfig;
