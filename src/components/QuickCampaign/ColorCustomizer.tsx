
import React from 'react';
import { Palette, RotateCcw } from 'lucide-react';
import { useQuickCampaignStore } from '../../stores/quickCampaignStore';
import JackpotBorderCustomizer from './JackpotBorderCustomizer';

// Palettes prédéfinies
const colorPalettes = [
  {
    id: 'violet-corporate',
    name: 'Violet Corporate',
    colors: {
      primary: '#841b60',
      secondary: '#3b82f6',
      accent: '#10b981'
    }
  },
  {
    id: 'orange-energique',
    name: 'Orange Énergique',
    colors: {
      primary: '#f97316',
      secondary: '#dc2626',
      accent: '#facc15'
    }
  },
  {
    id: 'bleu-professionnel',
    name: 'Bleu Professionnel',
    colors: {
      primary: '#1d4ed8',
      secondary: '#0891b2',
      accent: '#059669'
    }
  },
  {
    id: 'rose-moderne',
    name: 'Rose Moderne',
    colors: {
      primary: '#ec4899',
      secondary: '#8b5cf6',
      accent: '#6366f1'
    }
  },
  {
    id: 'vert-nature',
    name: 'Vert Nature',
    colors: {
      primary: '#059669',
      secondary: '#16a34a',
      accent: '#65a30d'
    }
  },
  {
    id: 'noir-elegant',
    name: 'Noir Élégant',
    colors: {
      primary: '#374151',
      secondary: '#6b7280',
      accent: '#9ca3af'
    }
  }
];

const ColorCustomizer: React.FC = () => {
  const { customColors, setCustomColors, selectedGameType } = useQuickCampaignStore();

  const handlePaletteSelect = (palette: typeof colorPalettes[0]) => {
    setCustomColors(palette.colors);
  };

  const handleColorChange = (colorType: 'primary' | 'secondary' | 'accent', value: string) => {
    setCustomColors({
      ...customColors,
      [colorType]: value
    });
  };

  const resetToDefault = () => {
    setCustomColors({
      primary: '#841b60',
      secondary: '#3b82f6',
      accent: '#10b981'
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-light text-gray-900 flex items-center">
          <Palette className="w-6 h-6 mr-3" />
          Combinaisons de couleurs
        </h3>
        <button
          onClick={resetToDefault}
          className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset</span>
        </button>
      </div>

      {/* Palettes prédéfinies */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {colorPalettes.map((palette) => (
          <div
            key={palette.id}
            onClick={() => handlePaletteSelect(palette)}
            className="p-4 rounded-2xl border-2 cursor-pointer transition-all hover:shadow-lg"
            style={{
              borderColor: customColors.primary === palette.colors.primary && 
                          customColors.secondary === palette.colors.secondary && 
                          customColors.accent === palette.colors.accent 
                          ? '#841b60' : '#e5e7eb'
            }}
          >
            <div className="flex items-center space-x-3 mb-3">
              <div 
                className="w-6 h-6 rounded-full" 
                style={{ backgroundColor: palette.colors.primary }}
              />
              <div 
                className="w-6 h-6 rounded-full" 
                style={{ backgroundColor: palette.colors.secondary }}
              />
              <div 
                className="w-6 h-6 rounded-full" 
                style={{ backgroundColor: palette.colors.accent }}
              />
            </div>
            <h4 className="font-medium text-gray-900">{palette.name}</h4>
          </div>
        ))}
      </div>

      {/* Couleurs personnalisées */}
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-gray-900">Couleurs personnalisées</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Couleur principale</label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={customColors.primary}
                onChange={(e) => handleColorChange('primary', e.target.value)}
                className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={customColors.primary}
                onChange={(e) => handleColorChange('primary', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
                placeholder="#841b60"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Couleur secondaire</label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={customColors.secondary}
                onChange={(e) => handleColorChange('secondary', e.target.value)}
                className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={customColors.secondary}
                onChange={(e) => handleColorChange('secondary', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
                placeholder="#3b82f6"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Couleur accent</label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={customColors.accent || '#10b981'}
                onChange={(e) => handleColorChange('accent', e.target.value)}
                className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={customColors.accent || '#10b981'}
                onChange={(e) => handleColorChange('accent', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
                placeholder="#10b981"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Configuration spécifique au jackpot */}
      {selectedGameType === 'jackpot' && (
        <div className="border-t pt-8">
          <JackpotBorderCustomizer />
        </div>
      )}
    </div>
  );
};

export default ColorCustomizer;
