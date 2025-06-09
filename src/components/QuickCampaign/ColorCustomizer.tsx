import React, { useState } from 'react';
import { Palette, RotateCcw, RefreshCw } from 'lucide-react';
import { useQuickCampaignStore } from '../../stores/quickCampaignStore';
import JackpotBorderCustomizer from './JackpotBorderCustomizer';

// Palettes harmonieuses et équilibrées
const baseColorPalettes = [{
  id: 'violet-corporate',
  name: 'Violet Corporate',
  colors: {
    primary: '#8b5cf6',
    secondary: '#a78bfa',
    accent: '#c4b5fd',
    containerBg: '#1f2937',
    slotBg: '#ffffff'
  }
}, {
  id: 'ocean-blue',
  name: 'Océan Bleu',
  colors: {
    primary: '#3b82f6',
    secondary: '#60a5fa',
    accent: '#93c5fd',
    containerBg: '#0f172a',
    slotBg: '#f8fafc'
  }
}, {
  id: 'emerald-nature',
  name: 'Émeraude Nature',
  colors: {
    primary: '#10b981',
    secondary: '#34d399',
    accent: '#6ee7b7',
    containerBg: '#064e3b',
    slotBg: '#f0fdf4'
  }
}, {
  id: 'sunset-warm',
  name: 'Coucher de Soleil',
  colors: {
    primary: '#f59e0b',
    secondary: '#fbbf24',
    accent: '#fcd34d',
    containerBg: '#451a03',
    slotBg: '#fffbeb'
  }
}, {
  id: 'rose-elegant',
  name: 'Rose Élégant',
  colors: {
    primary: '#ec4899',
    secondary: '#f472b6',
    accent: '#f9a8d4',
    containerBg: '#4a044e',
    slotBg: '#fdf2f8'
  }
}, {
  id: 'crimson-passion',
  name: 'Passion Cramoisie',
  colors: {
    primary: '#dc2626',
    secondary: '#ef4444',
    accent: '#f87171',
    containerBg: '#450a0a',
    slotBg: '#fef2f2'
  }
}];

// Palettes harmonieuses pour génération aléatoire
const harmonicColorSets = [
// Set bleu-violet
{
  primaries: ['#6366f1', '#8b5cf6', '#3b82f6'],
  secondaries: ['#818cf8', '#a78bfa', '#60a5fa'],
  accents: ['#c7d2fe', '#ddd6fe', '#bfdbfe'],
  containerBgs: ['#1e1b4b', '#1f2937', '#0f172a'],
  slotBgs: ['#f8fafc', '#ffffff', '#fafbff']
},
// Set vert-émeraude
{
  primaries: ['#059669', '#10b981', '#065f46'],
  secondaries: ['#0d9488', '#34d399', '#047857'],
  accents: ['#5eead4', '#6ee7b7', '#86efac'],
  containerBgs: ['#064e3b', '#134e4a', '#052e16'],
  slotBgs: ['#f0fdf4', '#ffffff', '#ecfdf5']
},
// Set orange-rouge
{
  primaries: ['#dc2626', '#ea580c', '#d97706'],
  secondaries: ['#ef4444', '#f97316', '#f59e0b'],
  accents: ['#fca5a5', '#fed7aa', '#fcd34d'],
  containerBgs: ['#450a0a', '#431407', '#451a03'],
  slotBgs: ['#fef2f2', '#fff7ed', '#fffbeb']
},
// Set rose-violet
{
  primaries: ['#db2777', '#ec4899', '#be185d'],
  secondaries: ['#f472b6', '#f9a8d4', '#ec4899'],
  accents: ['#fbcfe8', '#fce7f3', '#fdf2f8'],
  containerBgs: ['#4a044e', '#581c87', '#831843'],
  slotBgs: ['#fdf2f8', '#ffffff', '#fef7ff']
},
// Set bleu marine-cyan
{
  primaries: ['#0c4a6e', '#0284c7', '#0891b2'],
  secondaries: ['#0369a1', '#0ea5e9', '#06b6d4'],
  accents: ['#7dd3fc', '#67e8f9', '#a5f3fc'],
  containerBgs: ['#0c4a6e', '#164e63', '#083344'],
  slotBgs: ['#f0f9ff', '#ffffff', '#ecfeff']
},
// Set terre-brun
{
  primaries: ['#92400e', '#c2410c', '#ea580c'],
  secondaries: ['#d97706', '#f59e0b', '#fbbf24'],
  accents: ['#fed7aa', '#fef3c7', '#fffbeb'],
  containerBgs: ['#451a03', '#713f12', '#78350f'],
  slotBgs: ['#fffbeb', '#ffffff', '#fefce8']
}];
const generateRandomPalettes = () => {
  const palettes = [];
  for (let i = 0; i < 6; i++) {
    // Choisir un set harmonique aléatoire
    const colorSet = harmonicColorSets[Math.floor(Math.random() * harmonicColorSets.length)];

    // Sélectionner des couleurs du même set pour garantir l'harmonie
    const primary = colorSet.primaries[Math.floor(Math.random() * colorSet.primaries.length)];
    const secondary = colorSet.secondaries[Math.floor(Math.random() * colorSet.secondaries.length)];
    const accent = colorSet.accents[Math.floor(Math.random() * colorSet.accents.length)];
    const containerBg = colorSet.containerBgs[Math.floor(Math.random() * colorSet.containerBgs.length)];
    const slotBg = colorSet.slotBgs[Math.floor(Math.random() * colorSet.slotBgs.length)];
    palettes.push({
      id: `random-${i}`,
      name: `Palette ${i + 1}`,
      colors: {
        primary,
        secondary,
        accent,
        containerBg,
        slotBg
      }
    });
  }
  return palettes;
};
const ColorCustomizer: React.FC = () => {
  const {
    customColors,
    setCustomColors,
    jackpotColors,
    setJackpotColors,
    selectedGameType
  } = useQuickCampaignStore();
  const [colorPalettes, setColorPalettes] = useState(baseColorPalettes);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const handlePaletteSelect = (palette: typeof colorPalettes[0]) => {
    // Mettre à jour les couleurs personnalisées
    setCustomColors({
      primary: palette.colors.primary,
      secondary: palette.colors.secondary,
      accent: palette.colors.accent
    });

    // Mettre à jour les couleurs du jackpot si on est en mode jackpot
    if (selectedGameType === 'jackpot') {
      setJackpotColors({
        ...jackpotColors,
        containerBackgroundColor: palette.colors.containerBg,
        backgroundColor: palette.colors.accent + '30',
        borderColor: palette.colors.primary,
        slotBorderColor: palette.colors.secondary,
        slotBackgroundColor: palette.colors.slotBg
      });
    }
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
  return <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="font-light text-gray-900 flex items-center text-sm">
          <Palette className="w-6 h-6 mr-3" />
          Combinaisons de couleurs
        </h3>
        <div className="flex items-center space-x-2">
          <button onClick={refreshPalettes} disabled={isRefreshing} className="flex items-center space-x-2 px-4 py-2 text-[#8b5cf6] hover:text-[#7c3aed] transition-colors disabled:opacity-50">
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Actualiser</span>
          </button>
          <button onClick={resetToDefault} className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors">
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Palettes prédéfinies */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {colorPalettes.map(palette => <div key={palette.id} onClick={() => handlePaletteSelect(palette)} className="p-4 rounded-2xl border-2 cursor-pointer transition-all hover:shadow-lg hover:scale-105" style={{
        borderColor: customColors.primary === palette.colors.primary && customColors.secondary === palette.colors.secondary && customColors.accent === palette.colors.accent ? '#8b5cf6' : '#e5e7eb'
      }}>
            <div className="flex items-center space-x-2 mb-3">
              {/* Arrière-plan du conteneur - vraie couleur */}
              <div className="w-5 h-5 rounded-full shadow-sm border border-white/20" style={{
            backgroundColor: palette.colors.containerBg
          }} title="Arrière-plan du conteneur" />
              {/* Arrière-plan interne - vraie couleur avec transparence */}
              <div className="w-5 h-5 rounded-full shadow-sm border border-white/20" style={{
            backgroundColor: palette.colors.accent
          }} title="Arrière-plan interne" />
              {/* Bordure principale */}
              <div className="w-5 h-5 rounded-full shadow-sm border border-white/20" style={{
            backgroundColor: palette.colors.primary
          }} title="Bordure principale" />
              {/* Bordure des slots */}
              <div className="w-5 h-5 rounded-full shadow-sm border border-white/20" style={{
            backgroundColor: palette.colors.secondary
          }} title="Bordure des slots" />
              {/* Arrière-plan des slots */}
              <div className="w-5 h-5 rounded-full shadow-sm border border-white/20" style={{
            backgroundColor: palette.colors.slotBg
          }} title="Arrière-plan des slots" />
            </div>
            <h4 className="font-medium text-gray-900">{palette.name}</h4>
          </div>)}
      </div>

      {/* Configuration spécifique au jackpot */}
      {selectedGameType === 'jackpot' && <div className="border-t pt-8">
          <JackpotBorderCustomizer />
        </div>}
    </div>;
};
export default ColorCustomizer;