import React from "react";
import { Palette, RotateCcw } from "lucide-react";
import { useQuickCampaignStore } from "../../stores/quickCampaignStore";
import { getAccessibleTextColor } from "../../utils/BrandStyleAnalyzer";
import JackpotBorderCustomizer from "./JackpotBorderCustomizer";

const DEFAULT_COLORS = {
  primary: "#8b5cf6",
  secondary: "#a78bfa",
  accent: "#c4b5fd",
};

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
    // On ne recalcule le textColor que si c'est l'accent qui change (pour garantir la meilleure lisibilité)
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

  const resetToDefault = () => {
    setCustomColors({
      primary: DEFAULT_COLORS.primary,
      secondary: DEFAULT_COLORS.secondary,
      accent: DEFAULT_COLORS.accent,
      textColor: getAccessibleTextColor(DEFAULT_COLORS.accent),
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="font-light text-gray-900 flex items-center text-sm">
          <Palette className="w-6 h-6 mr-3" />
          Couleurs personnalisées
        </h3>
        <button
          onClick={resetToDefault}
          className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Couleur primaire
          </label>
          <div className="flex items-center space-x-3">
            <input
              type="color"
              value={customColors.primary}
              onChange={(e) => handleColorChange("primary", e.target.value)}
              className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={customColors.primary}
              onChange={(e) => handleColorChange("primary", e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent text-sm"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Couleur secondaire
          </label>
          <div className="flex items-center space-x-3">
            <input
              type="color"
              value={customColors.secondary}
              onChange={(e) => handleColorChange("secondary", e.target.value)}
              className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={customColors.secondary}
              onChange={(e) => handleColorChange("secondary", e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent text-sm"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Couleur d'accent
          </label>
          <div className="flex items-center space-x-3">
            <input
              type="color"
              value={customColors.accent}
              onChange={(e) => handleColorChange("accent", e.target.value)}
              className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={customColors.accent}
              onChange={(e) => handleColorChange("accent", e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent text-sm"
            />
          </div>
        </div>
      </div>

      {selectedGameType === "jackpot" && (
        <div className="border-t pt-8">
          <JackpotBorderCustomizer />
        </div>
      )}
    </div>
  );
};

export default ColorCustomizer;
