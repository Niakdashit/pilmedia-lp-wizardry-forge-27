
import React from 'react';
import { Palette, RotateCcw } from 'lucide-react';
import { useQuickCampaignStore } from '../../stores/quickCampaignStore';

// Palettes prédéfinies pour le jackpot
const jackpotPalettes = [
  {
    id: 'classic-gold',
    name: 'Or Classique',
    colors: {
      containerBackgroundColor: '#fbbf2420',
      backgroundColor: '#1f2937',
      borderColor: '#fbbf24',
      slotBorderColor: '#f59e0b',
      slotBackgroundColor: '#ffffff'
    }
  },
  {
    id: 'royal-purple',
    name: 'Violet Royal',
    colors: {
      containerBackgroundColor: '#841b6020',
      backgroundColor: '#1e1b4b',
      borderColor: '#841b60',
      slotBorderColor: '#a855f7',
      slotBackgroundColor: '#f8fafc'
    }
  },
  {
    id: 'casino-red',
    name: 'Rouge Casino',
    colors: {
      containerBackgroundColor: '#dc262620',
      backgroundColor: '#7f1d1d',
      borderColor: '#dc2626',
      slotBorderColor: '#ef4444',
      slotBackgroundColor: '#fef2f2'
    }
  },
  {
    id: 'emerald-luxury',
    name: 'Émeraude Luxe',
    colors: {
      containerBackgroundColor: '#05966920',
      backgroundColor: '#064e3b',
      borderColor: '#059669',
      slotBorderColor: '#10b981',
      slotBackgroundColor: '#f0fdf4'
    }
  }
];

const JackpotBorderCustomizer: React.FC = () => {
  const { jackpotColors, setJackpotColors, customColors } = useQuickCampaignStore();

  const handleColorChange = (field: keyof typeof jackpotColors, value: string | number) => {
    setJackpotColors({
      ...jackpotColors,
      [field]: value
    });
  };

  const handlePaletteSelect = (palette: typeof jackpotPalettes[0]) => {
    setJackpotColors({
      ...jackpotColors,
      ...palette.colors
    });
  };

  // Synchroniser les couleurs du jackpot avec les couleurs personnalisées
  const syncWithCustomColors = () => {
    setJackpotColors({
      ...jackpotColors,
      borderColor: customColors.primary,
      slotBorderColor: customColors.secondary,
      containerBackgroundColor: customColors.primary + '20',
    });
  };

  const resetToDefault = () => {
    setJackpotColors({
      containerBackgroundColor: '#841b6020',
      backgroundColor: '#374151',
      borderColor: '#841b60',
      borderWidth: 4,
      slotBorderColor: '#3b82f6',
      slotBorderWidth: 3,
      slotBackgroundColor: '#ffffff'
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-light text-gray-900 flex items-center">
          <Palette className="w-6 h-6 mr-3" />
          Couleurs du Jackpot
        </h3>
        <div className="flex items-center space-x-3">
          <button
            onClick={syncWithCustomColors}
            className="flex items-center space-x-2 px-4 py-2 text-[#841b60] hover:text-[#841b60]/80 transition-colors font-medium"
          >
            <span>Synchroniser</span>
          </button>
          <button 
            onClick={resetToDefault} 
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Palettes prédéfinies pour le jackpot */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jackpotPalettes.map(palette => (
          <div 
            key={palette.id} 
            onClick={() => handlePaletteSelect(palette)}
            className="p-4 rounded-2xl border-2 cursor-pointer transition-all hover:shadow-lg"
            style={{
              borderColor: jackpotColors.borderColor === palette.colors.borderColor ? '#841b60' : '#e5e7eb'
            }}
          >
            <div className="flex items-center space-x-3 mb-3">
              <div 
                className="w-6 h-6 rounded-full border-2" 
                style={{
                  backgroundColor: palette.colors.containerBackgroundColor,
                  borderColor: palette.colors.borderColor
                }} 
              />
              <div 
                className="w-6 h-6 rounded-full" 
                style={{
                  backgroundColor: palette.colors.backgroundColor
                }} 
              />
              <div 
                className="w-6 h-6 rounded-full border-2" 
                style={{
                  backgroundColor: palette.colors.slotBackgroundColor,
                  borderColor: palette.colors.slotBorderColor
                }} 
              />
            </div>
            <h4 className="font-medium text-gray-900">{palette.name}</h4>
          </div>
        ))}
      </div>

      {/* Couleurs personnalisées détaillées */}
      <div className="space-y-6">
        <h4 className="text-lg font-medium text-gray-700">Personnalisation avancée</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Couleur du conteneur */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Arrière-plan du conteneur
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={jackpotColors.containerBackgroundColor}
                onChange={(e) => handleColorChange('containerBackgroundColor', e.target.value)}
                className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={jackpotColors.containerBackgroundColor}
                onChange={(e) => handleColorChange('containerBackgroundColor', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent text-sm"
              />
            </div>
          </div>

          {/* Couleur d'arrière-plan */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Arrière-plan interne
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={jackpotColors.backgroundColor}
                onChange={(e) => handleColorChange('backgroundColor', e.target.value)}
                className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={jackpotColors.backgroundColor}
                onChange={(e) => handleColorChange('backgroundColor', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent text-sm"
              />
            </div>
          </div>

          {/* Couleur de bordure principale */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Bordure principale
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={jackpotColors.borderColor}
                onChange={(e) => handleColorChange('borderColor', e.target.value)}
                className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={jackpotColors.borderColor}
                onChange={(e) => handleColorChange('borderColor', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent text-sm"
              />
            </div>
          </div>

          {/* Épaisseur de bordure principale */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Épaisseur bordure principale ({jackpotColors.borderWidth}px)
            </label>
            <input
              type="range"
              min="0"
              max="10"
              value={jackpotColors.borderWidth}
              onChange={(e) => handleColorChange('borderWidth', parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Couleur de bordure des slots */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Bordure des slots
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={jackpotColors.slotBorderColor}
                onChange={(e) => handleColorChange('slotBorderColor', e.target.value)}
                className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={jackpotColors.slotBorderColor}
                onChange={(e) => handleColorChange('slotBorderColor', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent text-sm"
              />
            </div>
          </div>

          {/* Épaisseur bordure des slots */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Épaisseur bordure slots ({jackpotColors.slotBorderWidth}px)
            </label>
            <input
              type="range"
              min="0"
              max="6"
              value={jackpotColors.slotBorderWidth}
              onChange={(e) => handleColorChange('slotBorderWidth', parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Arrière-plan des slots */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Arrière-plan des slots
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={jackpotColors.slotBackgroundColor}
                onChange={(e) => handleColorChange('slotBackgroundColor', e.target.value)}
                className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={jackpotColors.slotBackgroundColor}
                onChange={(e) => handleColorChange('slotBackgroundColor', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          💡 <strong>Astuce :</strong> Utilisez le bouton "Synchroniser" pour appliquer automatiquement vos couleurs personnalisées au jackpot, ou choisissez une palette prédéfinie ci-dessus.
        </p>
      </div>
    </div>
  );
};

export default JackpotBorderCustomizer;
