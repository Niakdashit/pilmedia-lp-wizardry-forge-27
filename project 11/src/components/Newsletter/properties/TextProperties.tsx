import React from 'react';
import { ModuleData } from '@/stores/newsletterStore';

interface TextPropertiesProps {
  module: ModuleData;
  onUpdate: (id: string, updates: Partial<ModuleData>) => void;
}

export const TextProperties: React.FC<TextPropertiesProps> = ({ module, onUpdate }) => {
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
          Contenu
        </label>
        <textarea
          value={module.content || ''}
          onChange={(e) => onUpdate(module.id, { content: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#841b60]"
          rows={4}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Taille de police
        </label>
        <select
          value={module.settings?.fontSize || '16px'}
          onChange={(e) => handleSettingChange('fontSize', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#841b60]"
        >
          <option value="14px">Petit (14px)</option>
          <option value="16px">Normal (16px)</option>
          <option value="20px">Grand (20px)</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Graisse
        </label>
        <select
          value={module.settings?.fontWeight || 'normal'}
          onChange={(e) => handleSettingChange('fontWeight', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#841b60]"
        >
          <option value="lighter">Fine</option>
          <option value="normal">Normale</option>
          <option value="bold">Gras</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Alignement
        </label>
        <select
          value={module.settings?.textAlign || 'left'}
          onChange={(e) => handleSettingChange('textAlign', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#841b60]"
        >
          <option value="left">Gauche</option>
          <option value="center">Centre</option>
          <option value="right">Droite</option>
          <option value="justify">Justifié</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Couleur
        </label>
        <input
          type="color"
          value={module.settings?.color || '#333333'}
          onChange={(e) => handleSettingChange('color', e.target.value)}
          className="w-full h-10 rounded-md cursor-pointer"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Hauteur de ligne
        </label>
        <select
          value={module.settings?.lineHeight || '1.5'}
          onChange={(e) => handleSettingChange('lineHeight', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#841b60]"
        >
          <option value="1.5">Normal (1.5)</option>
          <option value="1.8">Large (1.8)</option>
          <option value="2">Très large (2)</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Marge supérieure
          </label>
          <input
            type="number"
            value={module.settings?.paddingTop || 0}
            onChange={(e) => handleSettingChange('paddingTop', e.target.value + 'px')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#841b60]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Marge inférieure
          </label>
          <input
            type="number"
            value={module.settings?.paddingBottom || 0}
            onChange={(e) => handleSettingChange('paddingBottom', e.target.value + 'px')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#841b60]"
          />
        </div>
      </div>
    </div>
  );
};