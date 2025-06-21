
import React from 'react';
import { useQuickCampaignStore } from '../../../stores/quickCampaignStore';

const WheelRenderingEffects: React.FC = () => {
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
        {/* Profondeur 3D */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">Profondeur 3D</label>
          <input
            type="range"
            min="0"
            max="100"
            value={wheelCustomization.depth3D || 0}
            onChange={(e) => handleChange('depth3D', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-xs text-gray-500">{wheelCustomization.depth3D || 0}px</span>
        </div>

        {/* Perspective */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">Perspective</label>
          <input
            type="range"
            min="0"
            max="1000"
            value={wheelCustomization.perspective || 0}
            onChange={(e) => handleChange('perspective', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-xs text-gray-500">{wheelCustomization.perspective || 0}px</span>
        </div>
      </div>

      {/* Rotation continue */}
      <div className="space-y-4">
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={wheelCustomization.continuousRotation}
            onChange={(e) => handleChange('continuousRotation', e.target.checked)}
            className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
          />
          <span className="text-sm text-gray-700">Rotation continue</span>
        </label>
      </div>

      <div className="bg-pink-50 rounded-lg p-4">
        <p className="text-sm text-pink-700">
          ⚡ Les effets de rendu avancés peuvent impacter les performances sur les appareils moins puissants.
        </p>
      </div>
    </div>
  );
};

export default WheelRenderingEffects;
