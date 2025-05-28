
import React from 'react';
import { Eye, EyeOff, Palette, Type } from 'lucide-react';

interface CampaignScreensProps {
  campaign: any;
  setCampaign: React.Dispatch<React.SetStateAction<any>>;
}

const CampaignScreens: React.FC<CampaignScreensProps> = ({ campaign, setCampaign }) => {
  const updateScreen = (screenIndex: number, updates: any) => {
    setCampaign((prev: any) => ({
      ...prev,
      screens: {
        ...prev.screens,
        [screenIndex]: {
          ...prev.screens[screenIndex],
          ...updates
        }
      }
    }));
  };

  const updateContrastBackground = (screenIndex: number, key: string, value: any) => {
    updateScreen(screenIndex, {
      contrastBackground: {
        ...campaign.screens?.[screenIndex]?.contrastBackground,
        [key]: value
      }
    });
  };

  const renderScreenEditor = (screenIndex: number, screenTitle: string) => {
    const screen = campaign.screens?.[screenIndex] || {};
    const contrastBg = screen.contrastBackground || {};

    return (
      <div key={screenIndex} className="border border-gray-200 rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
          <Type className="w-5 h-5 text-[#841b60]" />
          <span>{screenTitle}</span>
        </h3>

        {/* Toggle d'affichage du titre */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={screen.showTitle !== false}
                onChange={(e) => updateScreen(screenIndex, { showTitle: e.target.checked })}
                className="w-4 h-4 text-[#841b60] rounded focus:ring-[#841b60]"
              />
              <span className="text-sm font-medium text-gray-700">
                Afficher le titre
              </span>
            </label>
            {screen.showTitle !== false ? (
              <Eye className="w-4 h-4 text-green-600" />
            ) : (
              <EyeOff className="w-4 h-4 text-gray-400" />
            )}
          </div>

          {screen.showTitle !== false && (
            <input
              type="text"
              value={screen.title || ''}
              onChange={(e) => updateScreen(screenIndex, { title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
              placeholder="Titre de l'écran"
            />
          )}
        </div>

        {/* Toggle d'affichage de la description */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={screen.showDescription !== false}
                onChange={(e) => updateScreen(screenIndex, { showDescription: e.target.checked })}
                className="w-4 h-4 text-[#841b60] rounded focus:ring-[#841b60]"
              />
              <span className="text-sm font-medium text-gray-700">
                Afficher la description
              </span>
            </label>
            {screen.showDescription !== false ? (
              <Eye className="w-4 h-4 text-green-600" />
            ) : (
              <EyeOff className="w-4 h-4 text-gray-400" />
            )}
          </div>

          {screen.showDescription !== false && (
            <textarea
              value={screen.description || ''}
              onChange={(e) => updateScreen(screenIndex, { description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
              rows={3}
              placeholder="Description de l'écran"
            />
          )}
        </div>

        {/* Texte du bouton */}
        {screenIndex !== 3 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Texte du bouton
            </label>
            <input
              type="text"
              value={screen.buttonText || ''}
              onChange={(e) => updateScreen(screenIndex, { buttonText: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
              placeholder="Texte du bouton"
            />
          </div>
        )}

        {/* Fond de contraste */}
        <div className="border-t pt-4">
          <div className="flex items-center space-x-2 mb-4">
            <Palette className="w-4 h-4 text-[#841b60]" />
            <span className="text-sm font-medium text-gray-900">Fond de contraste</span>
          </div>

          {/* Enable/Disable Toggle */}
          <div className="mb-4">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={contrastBg.enabled || false}
                onChange={(e) => updateContrastBackground(screenIndex, 'enabled', e.target.checked)}
                className="w-4 h-4 text-[#841b60] rounded focus:ring-[#841b60]"
              />
              <span className="text-sm font-medium text-gray-700">
                Afficher un fond de contraste
              </span>
            </label>
          </div>

          {contrastBg.enabled && (
            <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
              {/* Background Color */}
              <div>
                <label className="block text-xs text-gray-600 mb-1">Couleur de fond</label>
                <div className="flex space-x-2">
                  <input
                    type="color"
                    value={contrastBg.color?.replace(/rgba?\([^)]+\)/, '') || '#ffffff'}
                    onChange={(e) => updateContrastBackground(screenIndex, 'color', `${e.target.value}90`)}
                    className="w-12 h-8 rounded border"
                  />
                  <input
                    type="text"
                    value={contrastBg.color || 'rgba(255, 255, 255, 0.9)'}
                    onChange={(e) => updateContrastBackground(screenIndex, 'color', e.target.value)}
                    className="flex-1 px-3 py-1 text-sm border rounded"
                    placeholder="rgba(255, 255, 255, 0.9)"
                  />
                </div>
              </div>

              {/* Padding */}
              <div>
                <label className="block text-xs text-gray-600 mb-1">Padding interne</label>
                <input
                  type="range"
                  min="0"
                  max="40"
                  value={contrastBg.padding || 16}
                  onChange={(e) => updateContrastBackground(screenIndex, 'padding', Number(e.target.value))}
                  className="w-full"
                />
                <div className="text-xs text-gray-500 mt-1">{contrastBg.padding || 16}px</div>
              </div>

              {/* Border Radius */}
              <div>
                <label className="block text-xs text-gray-600 mb-1">Arrondi des angles</label>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={contrastBg.borderRadius || 8}
                  onChange={(e) => updateContrastBackground(screenIndex, 'borderRadius', Number(e.target.value))}
                  className="w-full"
                />
                <div className="text-xs text-gray-500 mt-1">{contrastBg.borderRadius || 8}px</div>
              </div>

              {/* Apply to Game (for game screen) */}
              {screenIndex === 2 && (
                <div>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={contrastBg.applyToGame || false}
                      onChange={(e) => updateContrastBackground(screenIndex, 'applyToGame', e.target.checked)}
                      className="w-4 h-4 text-[#841b60] rounded focus:ring-[#841b60]"
                    />
                    <span className="text-sm text-gray-700">
                      Appliquer aussi au jeu
                    </span>
                  </label>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  const screens = [
    { index: 0, title: 'Écran d\'accueil' },
    { index: 1, title: 'Écran formulaire' },
    { index: 2, title: 'Écran jeu' },
    { index: 3, title: 'Écran résultat' }
  ];

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Configuration des écrans</h2>
        <p className="text-gray-600">
          Personnalisez chaque étape du parcours utilisateur avec des fonds de contraste et des options d'affichage.
        </p>
      </div>

      {screens.map(screen => 
        renderScreenEditor(screen.index, screen.title)
      )}
    </div>
  );
};

export default CampaignScreens;
