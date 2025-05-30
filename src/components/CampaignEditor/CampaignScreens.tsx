
import React from 'react';
import { Eye, Monitor, Smartphone } from 'lucide-react';
import ContrastBackground from '../common/ContrastBackground';

interface CampaignScreensProps {
  campaign: any;
  setCampaign: React.Dispatch<React.SetStateAction<any>>;
}

const CampaignScreens: React.FC<CampaignScreensProps> = ({ campaign, setCampaign }) => {
  const updateScreen = (screenIndex: number, key: string, value: any) => {
    setCampaign((prev: any) => ({
      ...prev,
      screens: {
        ...prev.screens,
        [screenIndex]: {
          ...prev.screens?.[screenIndex],
          [key]: value
        }
      }
    }));
  };

  const updateContrastBackground = (screenIndex: number, config: any) => {
    updateScreen(screenIndex, 'contrastBackground', config);
  };

  const screens = [
    { index: 0, title: 'Écran d\'accueil', description: 'Premier écran que voient les utilisateurs' },
    { index: 1, title: 'Formulaire', description: 'Écran de collecte d\'informations' },
    { index: 2, title: 'Jeu', description: 'Écran de jeu interactif' },
    { index: 3, title: 'Résultat', description: 'Écran de fin avec résultat' }
  ];

  const renderContrastBackgroundControls = (screenIndex: number) => {
    const contrastConfig = campaign.screens?.[screenIndex]?.contrastBackground || {};

    return (
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-medium text-gray-700">Fond de contraste</label>
          <input
            type="checkbox"
            checked={contrastConfig.enabled || false}
            onChange={(e) => updateContrastBackground(screenIndex, {
              ...contrastConfig,
              enabled: e.target.checked
            })}
            className="rounded border-gray-300 text-[#841b60] focus:ring-[#841b60]"
          />
        </div>

        {contrastConfig.enabled && (
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Couleur de fond</label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={contrastConfig.color || '#ffffff'}
                  onChange={(e) => updateContrastBackground(screenIndex, {
                    ...contrastConfig,
                    color: e.target.value
                  })}
                  className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={contrastConfig.color || '#ffffff'}
                  onChange={(e) => updateContrastBackground(screenIndex, {
                    ...contrastConfig,
                    color: e.target.value
                  })}
                  className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-1">Opacité ({contrastConfig.opacity || 90}%)</label>
              <input
                type="range"
                min="0"
                max="100"
                value={contrastConfig.opacity || 90}
                onChange={(e) => updateContrastBackground(screenIndex, {
                  ...contrastConfig,
                  opacity: parseInt(e.target.value)
                })}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-1">Espacement interne</label>
              <input
                type="number"
                value={contrastConfig.padding || 16}
                onChange={(e) => updateContrastBackground(screenIndex, {
                  ...contrastConfig,
                  padding: parseInt(e.target.value)
                })}
                className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
                min="0"
                max="50"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-1">Arrondi des coins</label>
              <input
                type="number"
                value={contrastConfig.borderRadius || 8}
                onChange={(e) => updateContrastBackground(screenIndex, {
                  ...contrastConfig,
                  borderRadius: parseInt(e.target.value)
                })}
                className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
                min="0"
                max="20"
              />
            </div>

            {screenIndex === 2 && (
              <div className="pt-2 border-t border-gray-200">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={contrastConfig.applyToGame || false}
                    onChange={(e) => updateContrastBackground(screenIndex, {
                      ...contrastConfig,
                      applyToGame: e.target.checked
                    })}
                    className="rounded border-gray-300 text-[#841b60] focus:ring-[#841b60]"
                  />
                  <span className="text-xs text-gray-600">Appliquer au jeu aussi</span>
                </label>
              </div>
            )}
          </div>
        )}

        {/* Aperçu du fond de contraste */}
        {contrastConfig.enabled && (
          <div className="mt-3">
            <label className="block text-xs text-gray-600 mb-2">Aperçu:</label>
            <ContrastBackground
              enabled={true}
              config={contrastConfig}
              className="text-center"
            >
              <p className="text-sm">Texte d'exemple avec fond de contraste</p>
            </ContrastBackground>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-6">
        <Eye className="w-5 h-5 text-[#841b60]" />
        <h3 className="text-lg font-medium text-gray-900">Configuration des écrans</h3>
      </div>

      {screens.map((screen) => {
        const screenData = campaign.screens?.[screen.index] || {};
        
        return (
          <div key={screen.index} className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-md font-medium text-gray-900">{screen.title}</h4>
                <p className="text-sm text-gray-500">{screen.description}</p>
              </div>
              <div className="flex space-x-2">
                <Monitor className="w-4 h-4 text-gray-400" />
                <Smartphone className="w-4 h-4 text-gray-400" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Titre */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titre
                </label>
                <input
                  type="text"
                  value={screenData.title || ''}
                  onChange={(e) => updateScreen(screen.index, 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                  placeholder="Entrez le titre"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={screenData.description || ''}
                  onChange={(e) => updateScreen(screen.index, 'description', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                  rows={2}
                  placeholder="Entrez la description"
                />
              </div>

              {/* Bouton text pour certains écrans */}
              {(screen.index === 1 || screen.index === 3) && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Texte du bouton
                  </label>
                  <input
                    type="text"
                    value={screenData.buttonText || ''}
                    onChange={(e) => updateScreen(screen.index, 'buttonText', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                    placeholder="Texte du bouton"
                  />
                </div>
              )}

              {/* Messages spécifiques à l'écran de résultat */}
              {screen.index === 3 && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message de victoire
                    </label>
                    <input
                      type="text"
                      value={screenData.winMessage || ''}
                      onChange={(e) => updateScreen(screen.index, 'winMessage', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                      placeholder="Félicitations, vous avez gagné !"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message de défaite
                    </label>
                    <input
                      type="text"
                      value={screenData.loseMessage || ''}
                      onChange={(e) => updateScreen(screen.index, 'loseMessage', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                      placeholder="Dommage, réessayez !"
                    />
                  </div>
                </>
              )}
            </div>

            {/* Options d'affichage */}
            <div className="mt-4 flex flex-wrap gap-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={screenData.showTitle !== false}
                  onChange={(e) => updateScreen(screen.index, 'showTitle', e.target.checked)}
                  className="rounded border-gray-300 text-[#841b60] focus:ring-[#841b60]"
                />
                <span className="text-sm text-gray-700">Afficher le titre</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={screenData.showDescription !== false}
                  onChange={(e) => updateScreen(screen.index, 'showDescription', e.target.checked)}
                  className="rounded border-gray-300 text-[#841b60] focus:ring-[#841b60]"
                />
                <span className="text-sm text-gray-700">Afficher la description</span>
              </label>
            </div>

            {/* Contrôles du fond de contraste */}
            {renderContrastBackgroundControls(screen.index)}
          </div>
        );
      })}
    </div>
  );
};

export default CampaignScreens;
