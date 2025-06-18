
import React from "react";
import { Palette, RotateCcw, Sparkles } from "lucide-react";
import { useQuickCampaignStore } from "../../stores/quickCampaignStore";
import { getAccessibleTextColor } from "../../utils/BrandStyleAnalyzer";

const DEFAULT_COLORS = {
  primary: "#8b5cf6",
  secondary: "#a78bfa",
  accent: "#c4b5fd",
};

const PRESET_PALETTES = [
  { name: "Violet", colors: { primary: "#8b5cf6", secondary: "#a78bfa", accent: "#c4b5fd" } },
  { name: "Bleu", colors: { primary: "#3b82f6", secondary: "#60a5fa", accent: "#93c5fd" } },
  { name: "Vert", colors: { primary: "#10b981", secondary: "#34d399", accent: "#6ee7b7" } },
  { name: "Rouge", colors: { primary: "#ef4444", secondary: "#f87171", accent: "#fca5a5" } },
  { name: "Orange", colors: { primary: "#f59e0b", secondary: "#fbbf24", accent: "#fcd34d" } },
  { name: "Rose", colors: { primary: "#ec4899", secondary: "#f472b6", accent: "#f9a8d4" } },
];

const ColorCustomizer: React.FC = () => {
  const {
    customColors,
    setCustomColors,
    jackpotColors,
    setJackpotColors,
    selectedGameType,
  } = useQuickCampaignStore();

  const handleColorChange = (
    field: "primary" | "secondary" | "accent",
    value: string,
  ) => {
    const newColors = {
      ...customColors,
      [field]: value,
    } as typeof customColors;
    
    if (field === "accent") {
      newColors.textColor = getAccessibleTextColor(value);
    }
    setCustomColors(newColors);

    if (selectedGameType === "jackpot") {
      setJackpotColors({
        ...jackpotColors,
        borderColor: newColors.primary,
        slotBorderColor: newColors.secondary,
        containerBackgroundColor: newColors.primary + "20",
        backgroundColor: (newColors.accent || newColors.secondary) + "30",
      });
    }
  };

  const applyPresetPalette = (palette: typeof PRESET_PALETTES[0]) => {
    const newColors = {
      ...palette.colors,
      textColor: getAccessibleTextColor(palette.colors.accent),
    };
    setCustomColors(newColors);
  };

  const resetToDefault = () => {
    setCustomColors({
      primary: DEFAULT_COLORS.primary,
      secondary: DEFAULT_COLORS.secondary,
      accent: DEFAULT_COLORS.accent,
      textColor: getAccessibleTextColor(DEFAULT_COLORS.accent),
    });
  };

  return (
    <div className="space-y-6">
      {/* Palettes prédéfinies */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-medium text-gray-700 flex items-center">
            <Sparkles className="w-4 h-4 mr-2 text-purple-500" />
            Palettes suggérées
          </h4>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {PRESET_PALETTES.map((palette) => (
            <button
              key={palette.name}
              onClick={() => applyPresetPalette(palette)}
              className="group relative overflow-hidden rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-200 hover:scale-105"
            >
              <div className="flex h-12">
                <div 
                  className="flex-1" 
                  style={{ backgroundColor: palette.colors.primary }}
                />
                <div 
                  className="flex-1" 
                  style={{ backgroundColor: palette.colors.secondary }}
                />
                <div 
                  className="flex-1" 
                  style={{ backgroundColor: palette.colors.accent }}
                />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200 flex items-center justify-center">
                <span className="text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/50 px-2 py-1 rounded">
                  {palette.name}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Couleurs personnalisées */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-medium text-gray-700 flex items-center">
            <Palette className="w-4 h-4 mr-2 text-blue-500" />
            Couleurs personnalisées
          </h4>
          <button
            onClick={resetToDefault}
            className="flex items-center space-x-1 px-3 py-1.5 text-xs text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>

        <div className="space-y-4">
          {[
            { key: "primary" as const, label: "Couleur primaire", description: "Couleur principale de votre marque" },
            { key: "secondary" as const, label: "Couleur secondaire", description: "Couleur complémentaire" },
            { key: "accent" as const, label: "Couleur d'accent", description: "Pour les boutons et éléments actifs" },
          ].map(({ key, label, description }) => (
            <div key={key} className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <label className="text-sm font-medium text-gray-900">{label}</label>
                  <p className="text-xs text-gray-500">{description}</p>
                </div>
                <div 
                  className="w-8 h-8 rounded-lg border-2 border-white shadow-sm"
                  style={{ backgroundColor: customColors[key] }}
                />
              </div>
              
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={customColors[key]}
                  onChange={(e) => handleColorChange(key, e.target.value)}
                  className="w-12 h-10 border border-gray-200 rounded-lg cursor-pointer bg-white shadow-sm"
                />
                <input
                  type="text"
                  value={customColors[key]}
                  onChange={(e) => handleColorChange(key, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-mono bg-white"
                  placeholder="#000000"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Aperçu des couleurs */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Aperçu</h4>
        <div className="flex items-center space-x-3">
          <div 
            className="px-4 py-2 rounded-lg text-white text-sm font-medium shadow-sm"
            style={{ backgroundColor: customColors.primary }}
          >
            Bouton Principal
          </div>
          <div 
            className="px-4 py-2 rounded-lg text-white text-sm font-medium shadow-sm"
            style={{ backgroundColor: customColors.secondary }}
          >
            Bouton Secondaire
          </div>
          <div 
            className="px-4 py-2 rounded-lg text-sm font-medium shadow-sm"
            style={{ 
              backgroundColor: customColors.accent,
              color: customColors.textColor || '#000000'
            }}
          >
            Bouton d'Action
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorCustomizer;
