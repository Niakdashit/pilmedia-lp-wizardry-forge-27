
import React, { useState } from 'react';
import { Palette, RotateCcw, RefreshCw } from 'lucide-react';
import { useQuickCampaignStore } from '../../stores/quickCampaignStore';
import JackpotBorderCustomizer from './JackpotBorderCustomizer';

// Palettes harmonieuses et équilibrées
const baseColorPalettes = [
  {
    id: 'violet-corporate',
    name: 'Violet Corporate',
    colors: {
      primary: '#8b5cf6',
      secondary: '#a78bfa',
      accent: '#c4b5fd'
    }
  },
  {
    id: 'ocean-blue',
    name: 'Océan Bleu',
    colors: {
      primary: '#3b82f6',
      secondary: '#60a5fa',
      accent: '#93c5fd'
    }
  },
  {
    id: 'emerald-nature',
    name: 'Émeraude Nature',
    colors: {
      primary: '#10b981',
      secondary: '#34d399',
      accent: '#6ee7b7'
    }
  },
  {
    id: 'sunset-warm',
    name: 'Coucher de Soleil',
    colors: {
      primary: '#f59e0b',
      secondary: '#fbbf24',
      accent: '#fcd34d'
    }
  },
  {
    id: 'rose-elegant',
    name: 'Rose Élégant',
    colors: {
      primary: '#ec4899',
      secondary: '#f472b6',
      accent: '#f9a8d4'
    }
  },
  {
    id: 'crimson-passion',
    name: 'Passion Cramoisie',
    colors: {
      primary: '#dc2626',
      secondary: '#ef4444',
      accent: '#f87171'
    }
  }
];

// Palettes harmonieuses pour génération aléatoire - couleurs qui vont bien ensemble
const harmonicColorSets = [
  // Set bleu-violet
  {
    primaries: ['#6366f1', '#8b5cf6', '#3b82f6'],
    secondaries: ['#818cf8', '#a78bfa', '#60a5fa'],
    accents: ['#c7d2fe', '#ddd6fe', '#bfdbfe']
  },
  // Set vert-émeraude
  {
    primaries: ['#059669', '#10b981', '#065f46'],
    secondaries: ['#0d9488', '#34d399', '#047857'],
    accents: ['#5eead4', '#6ee7b7', '#86efac']
  },
  // Set orange-rouge
  {
    primaries: ['#dc2626', '#ea580c', '#d97706'],
    secondaries: ['#ef4444', '#f97316', '#f59e0b'],
    accents: ['#fca5a5', '#fed7aa', '#fcd34d']
  },
  // Set rose-violet
  {
    primaries: ['#db2777', '#ec4899', '#be185d'],
    secondaries: ['#f472b6', '#f9a8d4', '#ec4899'],
    accents: ['#fbcfe8', '#fce7f3', '#fdf2f8']
  },
  // Set bleu marine-cyan
  {
    primaries: ['#0c4a6e', '#0284c7', '#0891b2'],
    secondaries: ['#0369a1', '#0ea5e9', '#06b6d4'],
    accents: ['#7dd3fc', '#67e8f9', '#a5f3fc']
  },
  // Set terre-brun
  {
    primaries: ['#92400e', '#c2410c', '#ea580c'],
    secondaries: ['#d97706', '#f59e0b', '#fbbf24'],
    accents: ['#fed7aa', '#fef3c7', '#fffbeb']
  }
];

const generateRandomPalettes = () => {
  const palettes = [];
  
  for (let i = 0; i < 6; i++) {
    // Choisir un set harmonique aléatoire
    const colorSet = harmonicColorSets[Math.floor(Math.random() * harmonicColorSets.length)];
    
    // Sélectionner des couleurs du même set pour garantir l'harmonie
    const primary = colorSet.primaries[Math.floor(Math.random() * colorSet.primaries.length)];
    const secondary = colorSet.secondaries[Math.floor(Math.random() * colorSet.secondaries.length)];
    const accent = colorSet.accents[Math.floor(Math.random() * colorSet.accents.length)];
    
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
      primary: '#8b5cf6',
      secondary: '#a78bfa',
      accent: '#c4b5fd'
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
            className="flex items-center space-x-2 px-4 py-2 text-[#8b5cf6] hover:text-[#7c3aed] transition-colors disabled:opacity-50"
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
                          ? '#8b5cf6' : '#e5e7eb'
            }}
          >
            <div className="flex items-center space-x-3 mb-3">
              <div 
                className="w-6 h-6 rounded-full shadow-sm border border-white/20" 
                style={{ backgroundColor: palette.colors.primary }} 
              />
              <div 
                className="w-6 h-6 rounded-full shadow-sm border border-white/20" 
                style={{ backgroundColor: palette.colors.secondary }} 
              />
              <div 
                className="w-6 h-6 rounded-full shadow-sm border border-white/20" 
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
