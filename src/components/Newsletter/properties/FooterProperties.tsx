import React from 'react';
import { ModuleData } from '@/stores/newsletterStore';

interface FooterPropertiesProps {
  module: ModuleData;
  onUpdate: (id: string, updates: Partial<ModuleData>) => void;
}

export const FooterProperties: React.FC<FooterPropertiesProps> = ({ module, onUpdate }) => {
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
          Adresse
        </label>
        <textarea
          value={module.settings?.address || ''}
          onChange={(e) => handleSettingChange('address', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#841b60]"
          rows={3}
          placeholder="Votre adresse complète"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Lien de désinscription
        </label>
        <input
          type="text"
          value={module.settings?.unsubscribeLink || ''}
          onChange={(e) => handleSettingChange('unsubscribeLink', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#841b60]"
          placeholder="https://..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Alignement du texte
        </label>
        <select
          value={module.settings?.textAlign || 'center'}
          onChange={(e) => handleSettingChange('textAlign', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#841b60]"
        >
          <option value="left">Gauche</option>
          <option value="center">Centre</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Taille de police
        </label>
        <select
          value={module.settings?.fontSize || '12px'}
          onChange={(e) => handleSettingChange('fontSize', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#841b60]"
        >
          <option value="10px">Très petit (10px)</option>
          <option value="12px">Petit (12px)</option>
          <option value="14px">Normal (14px)</option>
        </select>
      </div>
    </div>
  );
};