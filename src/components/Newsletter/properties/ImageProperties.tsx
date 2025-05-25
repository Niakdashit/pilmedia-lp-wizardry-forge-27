import React from 'react';
import { ModuleData } from '@/stores/newsletterStore';

interface ImagePropertiesProps {
  module: ModuleData;
  onUpdate: (id: string, updates: Partial<ModuleData>) => void;
}

export const ImageProperties: React.FC<ImagePropertiesProps> = ({ module, onUpdate }) => {
  const handleSettingChange = (key: string, value: any) => {
    onUpdate(module.id, {
      settings: {
        ...module.settings,
        [key]: value
      }
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          URL de l'image
        </label>
        <input
          type="text"
          value={module.content || ''}
          onChange={(e) => onUpdate(module.id, { content: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#841b60]"
          placeholder="https://..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Texte alternatif
        </label>
        <input
          type="text"
          value={module.settings?.altText || ''}
          onChange={(e) => handleSettingChange('altText', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#841b60]"
          placeholder="Description de l'image"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Largeur
        </label>
        <select
          value={module.settings?.width || '100%'}
          onChange={(e) => handleSettingChange('width', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#841b60]"
        >
          <option value="100%">Pleine largeur</option>
          <option value="auto">Auto</option>
          <option value="300px">300px</option>
          <option value="500px">500px</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Hauteur
        </label>
        <select
          value={module.settings?.height || 'auto'}
          onChange={(e) => handleSettingChange('height', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#841b60]"
        >
          <option value="auto">Auto</option>
          <option value="200px">200px</option>
          <option value="300px">300px</option>
          <option value="400px">400px</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Coins arrondis
        </label>
        <select
          value={module.settings?.borderRadius || '0'}
          onChange={(e) => handleSettingChange('borderRadius', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#841b60]"
        >
          <option value="0">Aucun</option>
          <option value="8px">Léger (8px)</option>
          <option value="16px">Moyen (16px)</option>
          <option value="50%">Cercle</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Alignement
        </label>
        <select
          value={module.settings?.align || 'center'}
          onChange={(e) => handleSettingChange('align', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#841b60]"
        >
          <option value="left">Gauche</option>
          <option value="center">Centre</option>
          <option value="right">Droite</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Lien
        </label>
        <input
          type="text"
          value={module.settings?.link || ''}
          onChange={(e) => handleSettingChange('link', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#841b60]"
          placeholder="https://..."
        />
      </div>
    </div>
  );
};