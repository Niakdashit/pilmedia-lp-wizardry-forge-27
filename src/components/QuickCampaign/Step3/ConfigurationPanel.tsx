
import React from 'react';
import { Palette, Settings, Gamepad2 } from 'lucide-react';
import WheelConfiguration from './WheelConfiguration';
import GamePositionSelector from './GamePositionSelector';
import ButtonStyleSelector from './ButtonStyleSelector';
import { useQuickCampaignStore } from '../../../stores/quickCampaignStore';

const ConfigurationPanel: React.FC = () => {
  const { selectedGameType, customColors, setCustomColors } = useQuickCampaignStore();

  const colorPalettes = [
    { primary: '#8B5CF6', secondary: '#A78BFA', accent: '#C4B5FD' },
    { primary: '#3B82F6', secondary: '#60A5FA', accent: '#93C5FD' },
    { primary: '#10B981', secondary: '#34D399', accent: '#6EE7B7' },
    { primary: '#F59E0B', secondary: '#FBBF24', accent: '#FCD34D' },
    { primary: '#EF4444', secondary: '#F87171', accent: '#FCA5A5' },
    { primary: '#8B5A3C', secondary: '#A0845C', accent: '#D4B894' }
  ];

  return (
    <div className="col-span-12 lg:col-span-5">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 h-full">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <Settings className="w-5 h-5 mr-3 text-blue-600" />
            Configuration
          </h2>
          <p className="text-gray-500 mt-1">Personnalisez votre jeu</p>
        </div>

        <div className="p-6 space-y-8 max-h-[calc(100vh-200px)] overflow-y-auto">
          {/* Palettes de couleurs suggérées */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <Palette className="w-5 h-5 mr-2 text-purple-600" />
              Palettes suggérées
            </h3>
            
            <div className="grid grid-cols-3 gap-3">
              {colorPalettes.map((palette, index) => (
                <button
                  key={index}
                  onClick={() => setCustomColors(palette)}
                  className="group relative overflow-hidden rounded-lg border-2 border-gray-200 hover:border-blue-400 transition-all duration-200"
                >
                  <div className="h-16 flex">
                    <div className="flex-1" style={{ backgroundColor: palette.primary }} />
                    <div className="flex-1" style={{ backgroundColor: palette.secondary }} />
                    <div className="flex-1" style={{ backgroundColor: palette.accent }} />
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200" />
                </button>
              ))}
            </div>
          </div>

          {/* Couleurs personnalisées */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              🎨 Couleurs personnalisées
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Couleur primaire</span>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={customColors.primary}
                    onChange={(e) => setCustomColors({ ...customColors, primary: e.target.value })}
                    className="w-10 h-10 rounded-lg border border-gray-300 cursor-pointer"
                  />
                  <span className="text-xs text-gray-500 font-mono">
                    {customColors.primary}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Couleur secondaire</span>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={customColors.secondary}
                    onChange={(e) => setCustomColors({ ...customColors, secondary: e.target.value })}
                    className="w-10 h-10 rounded-lg border border-gray-300 cursor-pointer"
                  />
                  <span className="text-xs text-gray-500 font-mono">
                    {customColors.secondary}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Couleur d'accent</span>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={customColors.accent}
                    onChange={(e) => setCustomColors({ ...customColors, accent: e.target.value })}
                    className="w-10 h-10 rounded-lg border border-gray-300 cursor-pointer"
                  />
                  <span className="text-xs text-gray-500 font-mono">
                    {customColors.accent}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Style du bouton */}
          <ButtonStyleSelector />

          {/* Configuration spécifique au jeu */}
          {selectedGameType === 'wheel' && <WheelConfiguration />}
          
          {/* Position du jeu */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <Gamepad2 className="w-5 h-5 mr-2 text-green-600" />
              Position du jeu
            </h3>
            <GamePositionSelector />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationPanel;
