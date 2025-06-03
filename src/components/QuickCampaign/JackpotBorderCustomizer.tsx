
import React from 'react';
import { Palette } from 'lucide-react';
import { useQuickCampaignStore } from '../../stores/quickCampaignStore';

const JackpotBorderCustomizer: React.FC = () => {
  const { jackpotColors, setJackpotColors } = useQuickCampaignStore();

  const handleColorChange = (field: keyof typeof jackpotColors, value: string | number) => {
    setJackpotColors({
      ...jackpotColors,
      [field]: value
    });
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-xl border border-gray-200">
      <div className="flex items-center space-x-2 mb-4">
        <Palette className="w-5 h-5 text-[#841b60]" />
        <h3 className="text-lg font-semibold text-gray-800">Personnalisation Jackpot</h3>
      </div>

      {/* Couleur de fond du conteneur */}
      <div className="space-y-4">
        <h4 className="text-md font-medium text-gray-700">Fond du conteneur</h4>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Couleur de fond</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={jackpotColors.containerBackgroundColor}
                onChange={(e) => handleColorChange('containerBackgroundColor', e.target.value)}
                className="w-12 h-10 rounded-lg border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={jackpotColors.containerBackgroundColor}
                onChange={(e) => handleColorChange('containerBackgroundColor', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                placeholder="#1f2937"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Couleur bordure</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={jackpotColors.borderColor}
                onChange={(e) => handleColorChange('borderColor', e.target.value)}
                className="w-12 h-10 rounded-lg border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={jackpotColors.borderColor}
                onChange={(e) => handleColorChange('borderColor', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                placeholder="#ffd700"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600">Épaisseur bordure (px)</label>
          <input
            type="number"
            min="0"
            max="20"
            value={jackpotColors.borderWidth}
            onChange={(e) => handleColorChange('borderWidth', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
      </div>

      {/* Zone de jeu centrale */}
      <div className="space-y-4">
        <h4 className="text-md font-medium text-gray-700">Zone de jeu centrale</h4>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600">Couleur de fond</label>
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={jackpotColors.backgroundColor}
              onChange={(e) => handleColorChange('backgroundColor', e.target.value)}
              className="w-12 h-10 rounded-lg border border-gray-300 cursor-pointer"
            />
            <input
              type="text"
              value={jackpotColors.backgroundColor}
              onChange={(e) => handleColorChange('backgroundColor', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
              placeholder="#f3f4f6"
            />
          </div>
        </div>
      </div>

      {/* Bordure des slots */}
      <div className="space-y-4">
        <h4 className="text-md font-medium text-gray-700">Symboles du jackpot</h4>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Fond des symboles</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={jackpotColors.slotBackgroundColor}
                onChange={(e) => handleColorChange('slotBackgroundColor', e.target.value)}
                className="w-12 h-10 rounded-lg border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={jackpotColors.slotBackgroundColor}
                onChange={(e) => handleColorChange('slotBackgroundColor', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                placeholder="#ffffff"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Bordure des symboles</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={jackpotColors.slotBorderColor}
                onChange={(e) => handleColorChange('slotBorderColor', e.target.value)}
                className="w-12 h-10 rounded-lg border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={jackpotColors.slotBorderColor}
                onChange={(e) => handleColorChange('slotBorderColor', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                placeholder="#ffffff"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600">Épaisseur bordure symboles (px)</label>
          <input
            type="number"
            min="0"
            max="8"
            value={jackpotColors.slotBorderWidth}
            onChange={(e) => handleColorChange('slotBorderWidth', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
      </div>

      {/* Aperçu visuel */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600 mb-3">Aperçu des couleurs :</p>
        <div 
          className="relative p-4 rounded-lg"
          style={{
            backgroundColor: jackpotColors.containerBackgroundColor,
            border: `${jackpotColors.borderWidth}px solid ${jackpotColors.borderColor}`
          }}
        >
          <div 
            className="p-3 rounded-lg mb-3"
            style={{ backgroundColor: jackpotColors.backgroundColor + '66' }}
          >
            <div className="flex items-center justify-center space-x-2">
              <div 
                className="w-12 h-12 rounded flex items-center justify-center text-lg"
                style={{
                  backgroundColor: jackpotColors.slotBackgroundColor,
                  border: `${jackpotColors.slotBorderWidth}px solid ${jackpotColors.slotBorderColor}`
                }}
              >
                🍒
              </div>
              <div 
                className="w-12 h-12 rounded flex items-center justify-center text-lg"
                style={{
                  backgroundColor: jackpotColors.slotBackgroundColor,
                  border: `${jackpotColors.slotBorderWidth}px solid ${jackpotColors.slotBorderColor}`
                }}
              >
                🍋
              </div>
              <div 
                className="w-12 h-12 rounded flex items-center justify-center text-lg"
                style={{
                  backgroundColor: jackpotColors.slotBackgroundColor,
                  border: `${jackpotColors.slotBorderWidth}px solid ${jackpotColors.slotBorderColor}`
                }}
              >
                🍊
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JackpotBorderCustomizer;
