
import React, { useState } from 'react';
import { Palette, RotateCcw, RefreshCw } from 'lucide-react';
import { useQuickCampaignStore } from '../../stores/quickCampaignStore';
import JackpotBorderCustomizer from './JackpotBorderCustomizer';

// Palettes de base plus attrayantes
const baseColorPalettes = [
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
    id: 'emeraude-moderne',
    name: 'Émeraude Moderne',
    colors: {
      primary: '#059669',
      secondary: '#0d9488',
      accent: '#f59e0b'
    }
  },
  {
    id: 'rose-elegante',
    name: 'Rose Élégante',
    colors: {
      primary: '#ec4899',
      secondary: '#8b5cf6',
      accent: '#06b6d4'
    }
  },
  {
    id: 'rouge-passion',
    name: 'Rouge Passion',
    colors: {
      primary: '#dc2626',
      secondary: '#ea580c',
      accent: '#eab308'
    }
  }
];

// Couleurs avancées pour génération aléatoire
const advancedColors = {
  primaries: ['#7c3aed', '#db2777', '#059669', '#dc2626', '#ea580c', '#d97706', '#ca8a04', '#65a30d', '#16a34a', '#0891b2', '#0284c7', '#2563eb', '#4f46e5', '#7c2d12', '#92400e'],
  secondaries: ['#8b5cf6', '#f472b6', '#10b981', '#f87171', '#fb7185', '#fbbf24', '#a3e635', '#34d399', '#22d3ee', '#60a5fa', '#818cf8', '#a78bfa', '#c084fc', '#f9a8d4'],
  accents: ['#fef08a', '#fed7aa', '#fca5a5', '#f9a8d4', '#ddd6fe', '#bfdbfe', '#a7f3d0', '#86efac', '#67e8f9', '#7dd3fc', '#93c5fd', '#c7d2fe', '#e879f9', '#fbbf24']
};

const generateRandomPalettes = () => {
  const palettes = [];
  
  for (let i = 0; i < 6; i++) {
    const primary = advancedColors.primaries[Math.floor(Math.random() * advancedColors.primaries.length)];
    const secondary = advancedColors.secondaries[Math.floor(Math.random() * advancedColors.secondaries.length)];
    const accent = advancedColors.accents[Math.floor(Math.random() * advancedColors.accents.length)];
    
    palettes.push({
      id: `random-${i}`,
      name: `Palette ${i + 1}`,
      colors: { primary, secondary, accent }
    });
  }
  
  return palettes;
};

const ColorCustomizer: React.FC = () => {
  const {
    customColors,
    setCustomColors,
    selectedGameType
  } = useQuickCampaignStore();
  
  const [colorPalettes, setColorPalettes] = useState(baseColorPalettes);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handlePaletteSelect = (palette: typeof colorPalettes[0]) => {
    setCustomColors(palette.colors);
  };

  const resetToDefault = () => {
    setCustomColors({
      primary: '#841b60',
      secondary: '#3b82f6',
      accent: '#10b981'
    });
  };

  const refreshPalettes = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      const newPalettes = generateRandomPalettes();
      setColorPalettes(newPalettes);
      setIsRefreshing(false);
    }, 500);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-light text-gray-900 flex items-center">
          <Palette className="w-6 h-6 mr-3" />
          Combinaisons de couleurs
        </h3>
        <div className="flex items-center space-x-2">
          <button 
            onClick={refreshPalettes}
            disabled={isRefreshing}
            className="flex items-center space-x-2 px-4 py-2 text-[#841b60] hover:text-[#6b1548] transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Actualiser</span>
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

      {/* Palettes prédéfinies */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {colorPalettes.map(palette => (
          <div 
            key={palette.id}
            onClick={() => handlePaletteSelect(palette)}
            className="p-4 rounded-2xl border-2 cursor-pointer transition-all hover:shadow-lg hover:scale-105"
            style={{
              borderColor: customColors.primary === palette.colors.primary && 
                          customColors.secondary === palette.colors.secondary && 
                          customColors.accent === palette.colors.accent 
                          ? '#841b60' : '#e5e7eb'
            }}
          >
            <div className="flex items-center space-x-3 mb-3">
              <div 
                className="w-6 h-6 rounded-full shadow-sm" 
                style={{ backgroundColor: palette.colors.primary }} 
              />
              <div 
                className="w-6 h-6 rounded-full shadow-sm" 
                style={{ backgroundColor: palette.colors.secondary }} 
              />
              <div 
                className="w-6 h-6 rounded-full shadow-sm" 
                style={{ backgroundColor: palette.colors.accent }} 
              />
            </div>
            <h4 className="font-medium text-gray-900">{palette.name}</h4>
          </div>
        ))}
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
