import React from 'react';
import { ModuleData } from '@/stores/newsletterStore';

interface ButtonPropertiesProps {
  module: ModuleData;
  onUpdate: (id: string, updates: Partial<ModuleData>) => void;
}

export const ButtonProperties: React.FC<ButtonPropertiesProps> = ({ module, onUpdate }) => {
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
          Texte du bouton
        </label>
        <input
          type="text"
          value={module.content || ''}
          onChange={(e) => onUpdate(module.id, { content: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#841b60]"
          placeholder="Cliquez ici"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          URL
        </label>
        <input
          type="text"
          value={module.settings?.url || ''}
          onChange={(e) => handleSettingChange('url', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#841b60]"
          placeholder="https://..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Couleur de fond
        </label>
        <input
          type="color"
          value={module.settings?.backgroundColor || '#841b60'}
          onChange={(e) => handleSettingChange('backgroundColor', e.target.value)}
          className="w-full h-10 rounded-md cursor-pointer"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Couleur du texte
        </label>
        <input
          type="color"
          value={module.settings?.textColor || '#ffffff'}
          onChange={(e) => handleSettingChange('textColor', e.target.value)}
          className="w-full h-10 rounded-md cursor-pointer"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Coins arrondis
        </label>
        <select
          value={module.settings?.borderRadius || '4px'}
          onChange={(e) => handleSettingChange('borderRadius', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#841b60]"
        >
          <option value="4px">Léger (4px)</option>
          <option value="8px">Moyen (8px)</option>
          <option value="12px">Large (12px)</option>
          <option value="9999px">Pilule</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Espacement interne
        </label>
        <input
          type="text"
          value={module.settings?.padding || '12px 24px'}
          onChange={(e) => handleSettingChange('padding', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#841b60]"
          placeholder="12px 24px"
        />
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

      <div className="flex items-center">
        <input
          type="checkbox"
          checked={module.settings?.trackingEnabled ?? true}
          onChange={(e) => handleSettingChange('trackingEnabled', e.target.checked)}
          className="h-4 w-4 text-[#841b60] focus:ring-[#841b60] border-gray-300 rounded"
        />
        <label className="ml-2 block text-sm text-gray-700">
          Activer le suivi des clics
        </label>
      </div>
    </div>
  );
};