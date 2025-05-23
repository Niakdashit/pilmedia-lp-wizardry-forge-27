import React from 'react';
import { ModuleData } from '@/stores/newsletterStore';

interface DividerPropertiesProps {
  module: ModuleData;
  onUpdate: (id: string, updates: Partial<ModuleData>) => void;
}

export const DividerProperties: React.FC<DividerPropertiesProps> = ({ module, onUpdate }) => {
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
          Épaisseur
        </label>
        <select
          value={module.settings?.thickness || '1px'}
          onChange={(e) => handleSettingChange('thickness', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#841b60]"
        >
          <option value="1px">Fin (1px)</option>
          <option value="2px">Normal (2px)</option>
          <option value="3px">Épais (3px)</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Style
        </label>
        <select
          value={module.settings?.style || 'solid'}
          onChange={(e) => handleSettingChange('style', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#841b60]"
        >
          <option value="solid">Plein</option>
          <option value="dashed">Tirets</option>
          <option value="dotted">Pointillés</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Couleur
        </label>
        <input
          type="color"
          value={module.settings?.color || '#cccccc'}
          onChange={(e) => handleSettingChange('color', e.target.value)}
          className="w-full h-10 rounded-md cursor-pointer"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Marge supérieure
          </label>
          <input
            type="number"
            value={module.settings?.marginTop || 16}
            onChange={(e) => handleSettingChange('marginTop', e.target.value + 'px')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#841b60]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Marge inférieure
          </label>
          <input
            type="number"
            value={module.settings?.marginBottom || 16}
            onChange={(e) => handleSettingChange('marginBottom', e.target.value + 'px')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#841b60]"
          />
        </div>
      </div>
    </div>
  );
};