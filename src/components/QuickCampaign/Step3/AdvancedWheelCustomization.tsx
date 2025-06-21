
import React from 'react';
import { useQuickCampaignStore } from '../../../stores/quickCampaignStore';

const AdvancedWheelCustomization: React.FC = () => {
  const { wheelCustomization, setWheelCustomization } = useQuickCampaignStore();

  const handleChange = (field: string, value: any) => {
    setWheelCustomization({
      ...wheelCustomization,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bordures */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">Rayon des bordures</label>
          <input
            type="range"
            min="0"
            max="100"
            value={wheelCustomization.borderRadius}
            onChange={(e) => handleChange('borderRadius', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-xs text-gray-500">{wheelCustomization.borderRadius}%</span>
        </div>

        {/* Intensité de l'ombre */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">Intensité de l'ombre</label>
          <input
            type="range"
            min="0"
            max="50"
            value={wheelCustomization.shadowIntensity}
            onChange={(e) => handleChange('shadowIntensity', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-xs text-gray-500">{wheelCustomization.shadowIntensity}px</span>
        </div>

        {/* Couleur de l'ombre */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">Couleur de l'ombre</label>
          <input
            type="color"
            value={wheelCustomization.shadowColor}
            onChange={(e) => handleChange('shadowColor', e.target.value)}
            className="w-full h-10 border border-gray-200 rounded-lg cursor-pointer"
          />
        </div>

        {/* Texture */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">Texture</label>
          <select
            value={wheelCustomization.texture || 'metallic'}
            onChange={(e) => handleChange('texture', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="metallic">Métallique</option>
            <option value="glass">Verre</option>
            <option value="neon">Néon</option>
            <option value="wood">Bois</option>
          </select>
        </div>
      </div>

      {/* Effets spéciaux */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-700">Effets spéciaux</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={wheelCustomization.bevelEffect}
              onChange={(e) => handleChange('bevelEffect', e.target.checked)}
              className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <span className="text-sm text-gray-700">Effet de biseau</span>
          </label>

          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={wheelCustomization.glowEffect}
              onChange={(e) => handleChange('glowEffect', e.target.checked)}
              className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <span className="text-sm text-gray-700">Effet de lueur</span>
          </label>

          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={wheelCustomization.pulseAnimation}
              onChange={(e) => handleChange('pulseAnimation', e.target.checked)}
              className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <span className="text-sm text-gray-700">Animation pulsante</span>
          </label>

          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={wheelCustomization.particleEffect}
              onChange={(e) => handleChange('particleEffect', e.target.checked)}
              className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <span className="text-sm text-gray-700">Effet de particules</span>
          </label>
        </div>
      </div>

      {/* Couleur de lueur */}
      {wheelCustomization.glowEffect && (
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">Couleur de la lueur</label>
          <input
            type="color"
            value={wheelCustomization.glowColor}
            onChange={(e) => handleChange('glowColor', e.target.value)}
            className="w-full h-10 border border-gray-200 rounded-lg cursor-pointer"
          />
        </div>
      )}
    </div>
  );
};

export default AdvancedWheelCustomization;
