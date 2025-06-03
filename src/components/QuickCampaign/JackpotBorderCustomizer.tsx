
import React from 'react';
import { Palette } from 'lucide-react';
import { useQuickCampaignStore } from '../../stores/quickCampaignStore';

const JackpotBorderCustomizer: React.FC = () => {
  const { jackpotBorders, setJackpotBorders } = useQuickCampaignStore();

  const handleBorderChange = (field: keyof typeof jackpotBorders, value: string | number) => {
    setJackpotBorders({
      ...jackpotBorders,
      [field]: value
    });
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-xl border border-gray-200">
      <div className="flex items-center space-x-2 mb-4">
        <Palette className="w-5 h-5 text-[#841b60]" />
        <h3 className="text-lg font-semibold text-gray-800">Bordures Jackpot</h3>
      </div>

      {/* Bordure du conteneur principal */}
      <div className="space-y-4">
        <h4 className="text-md font-medium text-gray-700">Bordure du conteneur</h4>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Couleur</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={jackpotBorders.containerBorderColor}
                onChange={(e) => handleBorderChange('containerBorderColor', e.target.value)}
                className="w-12 h-10 rounded-lg border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={jackpotBorders.containerBorderColor}
                onChange={(e) => handleBorderChange('containerBorderColor', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                placeholder="#ffd700"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Épaisseur (px)</label>
            <input
              type="number"
              min="0"
              max="10"
              value={jackpotBorders.containerBorderWidth}
              onChange={(e) => handleBorderChange('containerBorderWidth', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>
        </div>
      </div>

      {/* Bordure des slots */}
      <div className="space-y-4">
        <h4 className="text-md font-medium text-gray-700">Bordure des symboles</h4>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Couleur</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={jackpotBorders.slotBorderColor}
                onChange={(e) => handleBorderChange('slotBorderColor', e.target.value)}
                className="w-12 h-10 rounded-lg border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={jackpotBorders.slotBorderColor}
                onChange={(e) => handleBorderChange('slotBorderColor', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                placeholder="#ffffff"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Épaisseur (px)</label>
            <input
              type="number"
              min="0"
              max="8"
              value={jackpotBorders.slotBorderWidth}
              onChange={(e) => handleBorderChange('slotBorderWidth', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>
        </div>
      </div>

      {/* Aperçu visuel */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600 mb-3">Aperçu des bordures :</p>
        <div className="flex items-center justify-center space-x-2">
          <div 
            className="w-12 h-12 bg-white rounded flex items-center justify-center text-lg"
            style={{
              border: `${jackpotBorders.slotBorderWidth}px solid ${jackpotBorders.slotBorderColor}`
            }}
          >
            🍒
          </div>
          <div 
            className="w-12 h-12 bg-white rounded flex items-center justify-center text-lg"
            style={{
              border: `${jackpotBorders.slotBorderWidth}px solid ${jackpotBorders.slotBorderColor}`
            }}
          >
            🍋
          </div>
          <div 
            className="w-12 h-12 bg-white rounded flex items-center justify-center text-lg"
            style={{
              border: `${jackpotBorders.slotBorderWidth}px solid ${jackpotBorders.slotBorderColor}`
            }}
          >
            🍊
          </div>
        </div>
      </div>
    </div>
  );
};

export default JackpotBorderCustomizer;
