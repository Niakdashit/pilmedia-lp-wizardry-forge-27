import React from 'react';
import { Image as ImageIcon, Type, Percent } from 'lucide-react';

interface ScratchProps {
  config: any;
  onConfigChange: (config: any) => void;
}

const Scratch: React.FC<ScratchProps> = ({ config, onConfigChange }) => {
  const updateConfig = (field: string, value: any) => {
    onConfigChange({
      ...config,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Image à révéler
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <ImageIcon className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={config?.revealImage || ''}
            onChange={(e) => updateConfig('revealImage', e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
            placeholder="URL de l'image à révéler"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Couleur de la couche à gratter
          </label>
          <input
            type="color"
            value={config?.scratchColor || '#CCCCCC'}
            onChange={(e) => updateConfig('scratchColor', e.target.value)}
            className="w-full h-10 p-1 border border-gray-300 rounded-lg cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image de la couche à gratter (optionnelle)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <ImageIcon className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={config?.scratchImage || ''}
              onChange={(e) => updateConfig('scratchImage', e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
              placeholder="URL de l'image de grattage"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Forme du masque
        </label>
        <select
          value={config?.maskShape || 'rectangle'}
          onChange={(e) => updateConfig('maskShape', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
        >
          <option value="rectangle">Rectangle</option>
          <option value="circle">Cercle</option>
          <option value="star">Étoile</option>
          <option value="heart">Cœur</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Curseur personnalisé
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <ImageIcon className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={config?.cursorImage || ''}
            onChange={(e) => updateConfig('cursorImage', e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
            placeholder="URL de l'image du curseur"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Pourcentage de grattage nécessaire
        </label>
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <input
              type="range"
              min="1"
              max="100"
              value={config?.requiredScratchPercent || 70}
              onChange={(e) => updateConfig('requiredScratchPercent', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#841b60]"
            />
          </div>
          <div className="w-16 relative">
            <input
              type="number"
              min="1"
              max="100"
              value={config?.requiredScratchPercent || 70}
              onChange={(e) => updateConfig('requiredScratchPercent', parseInt(e.target.value))}
              className="w-full pl-2 pr-8 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
            />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Message de victoire
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Type className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={config?.winMessage || 'Félicitations ! Vous avez gagné !'}
              onChange={(e) => updateConfig('winMessage', e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
              placeholder="Message de victoire"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Message de défaite
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Type className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={config?.loseMessage || 'Pas de chance ! Réessayez !'}
              onChange={(e) => updateConfig('loseMessage', e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
              placeholder="Message de défaite"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scratch;