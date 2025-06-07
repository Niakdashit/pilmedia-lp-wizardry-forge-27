
import React from 'react';
import { Palette } from 'lucide-react';

interface ScratchSurfaceConfigProps {
  scratchColor: string;
  scratchSurface?: string;
  onScratchColorChange: (color: string) => void;
  onScratchSurfaceChange: (surface: string) => void;
}

const ScratchSurfaceConfig: React.FC<ScratchSurfaceConfigProps> = ({
  scratchColor,
  scratchSurface,
  onScratchColorChange,
  onScratchSurfaceChange
}) => {
  return (
    <>
      {/* Couleur de grattage personnalisée */}
      <div className="space-y-2">
        <label className="flex items-center text-sm font-medium text-gray-700">
          <Palette className="w-4 h-4 mr-2" />
          Couleur de la surface à gratter
        </label>
        <div className="flex items-center space-x-2">
          <input
            type="color"
            value={scratchColor}
            onChange={(e) => onScratchColorChange(e.target.value)}
            className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
          />
          <span className="text-sm text-gray-600">
            {scratchColor}
          </span>
        </div>
      </div>

      {/* Surface à gratter personnalisée */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Surface à gratter personnalisée</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const url = URL.createObjectURL(file);
              onScratchSurfaceChange(url);
            }
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
        />
        {scratchSurface && (
          <div className="mt-2">
            <img
              src={scratchSurface}
              alt="Surface à gratter"
              className="w-full h-20 object-cover rounded border"
            />
            <button
              onClick={() => onScratchSurfaceChange('')}
              className="mt-1 text-xs text-red-600 hover:text-red-800"
            >
              Supprimer
            </button>
          </div>
        )}
        <p className="text-xs text-gray-500">
          Image qui sera utilisée comme surface à gratter (par défaut: couleur métallique)
        </p>
      </div>
    </>
  );
};

export default ScratchSurfaceConfig;
