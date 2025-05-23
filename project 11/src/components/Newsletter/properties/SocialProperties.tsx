import React from 'react';
import { ModuleData } from '@/stores/newsletterStore';

interface SocialPropertiesProps {
  module: ModuleData;
  onUpdate: (id: string, updates: Partial<ModuleData>) => void;
}

export const SocialProperties: React.FC<SocialPropertiesProps> = ({ module, onUpdate }) => {
  const handleSettingChange = (key: string, value: any) => {
    onUpdate(module.id, {
      settings: {
        ...module.settings,
        [key]: value
      }
    });
  };

  const platforms = ['facebook', 'twitter', 'instagram', 'linkedin', 'youtube'];

  const handlePlatformToggle = (platform: string) => {
    const currentPlatforms = module.settings?.platforms || [];
    const newPlatforms = currentPlatforms.includes(platform)
      ? currentPlatforms.filter(p => p !== platform)
      : [...currentPlatforms, platform];
    handleSettingChange('platforms', newPlatforms);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Plateformes
        </label>
        <div className="space-y-2">
          {platforms.map(platform => (
            <label key={platform} className="flex items-center">
              <input
                type="checkbox"
                checked={(module.settings?.platforms || []).includes(platform)}
                onChange={() => handlePlatformToggle(platform)}
                className="h-4 w-4 text-[#841b60] focus:ring-[#841b60] border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700 capitalize">{platform}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Style des icônes
        </label>
        <select
          value={module.settings?.iconStyle || 'circle'}
          onChange={(e) => handleSettingChange('iconStyle', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#841b60]"
        >
          <option value="circle">Cercle</option>
          <option value="square">Carré</option>
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
          Taille des icônes
        </label>
        <select
          value={module.settings?.size || '24px'}
          onChange={(e) => handleSettingChange('size', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#841b60]"
        >
          <option value="24px">Petit (24px)</option>
          <option value="32px">Moyen (32px)</option>
          <option value="48px">Grand (48px)</option>
        </select>
      </div>
    </div>
  );
};