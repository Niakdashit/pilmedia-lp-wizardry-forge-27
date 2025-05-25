import React from 'react';
import { ModuleData } from '@/stores/newsletterStore';

interface HeaderPropertiesProps {
  module: ModuleData;
  onUpdate: (id: string, updates: Partial<ModuleData>) => void;
}

export const HeaderProperties: React.FC<HeaderPropertiesProps> = ({ module, onUpdate }) => {
  const handleSettingChange = (key: string, value: any) => {
    onUpdate(module.id, {
      settings: {
        ...module.settings,
        [key]: value
      }
    });
  };

  const handleNavLinkChange = (index: number, field: 'label' | 'url', value: string) => {
    const navLinks = [...(module.settings?.navLinks || [])];
    navLinks[index] = { ...navLinks[index], [field]: value };
    handleSettingChange('navLinks', navLinks);
  };

  const addNavLink = () => {
    const navLinks = [...(module.settings?.navLinks || [])];
    navLinks.push({ label: '', url: '' });
    handleSettingChange('navLinks', navLinks);
  };

  const removeNavLink = (index: number) => {
    const navLinks = [...(module.settings?.navLinks || [])];
    navLinks.splice(index, 1);
    handleSettingChange('navLinks', navLinks);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          URL du logo
        </label>
        <input
          type="text"
          value={module.settings?.logoUrl || ''}
          onChange={(e) => handleSettingChange('logoUrl', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#841b60]"
          placeholder="https://..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Liens de navigation
        </label>
        <div className="space-y-2">
          {(module.settings?.navLinks || []).map((link: any, index: number) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={link.label}
                onChange={(e) => handleNavLinkChange(index, 'label', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                placeholder="Libellé"
              />
              <input
                type="text"
                value={link.url}
                onChange={(e) => handleNavLinkChange(index, 'url', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                placeholder="URL"
              />
              <button
                onClick={() => removeNavLink(index)}
                className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-md"
              >
                ×
              </button>
            </div>
          ))}
          <button
            onClick={addNavLink}
            
            className="text-sm text-[#841b60] hover:text-[#6d164f]"
          >
            + Ajouter un lien
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Alignement
        </label>
        <select
          value={module.settings?.align || 'space-between'}
          onChange={(e) => handleSettingChange('align', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#841b60]"
        >
          <option value="center">Centre</option>
          <option value="space-between">Espacé</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Couleur de fond
        </label>
        <input
          type="color"
          value={module.settings?.bgColor || '#ffffff'}
          onChange={(e) => handleSettingChange('bgColor', e.target.value)}
          className="w-full h-10 rounded-md cursor-pointer"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Couleur des liens
        </label>
        <input
          type="color"
          value={module.settings?.linkColor || '#841b60'}
          onChange={(e) => handleSettingChange('linkColor', e.target.value)}
          className="w-full h-10 rounded-md cursor-pointer"
        />
      </div>
    </div>
  );
};