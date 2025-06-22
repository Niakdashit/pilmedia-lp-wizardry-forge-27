
import React from 'react';
import { Eye, EyeOff, Palette, Type, Monitor } from 'lucide-react';

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

  const renderScreenEditor = (screenIndex: number, screenTitle: string, description: string) => {
    const screen = campaign.screens?.[screenIndex] || {};
    const contrastBg = screen.contrastBackground || {};

    return (
      <div key={screenIndex} className="bg-white rounded-xl border border-[#EDF3F7] shadow-sm p-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-[#F8E9F0] rounded-xl flex items-center justify-center">
            <Monitor className="w-6 h-6 text-[#951B6D]" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#141E29]">{screenTitle}</h3>
            <p className="text-[#64748B] text-sm font-medium">{description}</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Title Configuration */}
          <div className="bg-[#F8FAFC] rounded-xl p-6 border border-[#EDF3F7]">
            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={screen.showTitle !== false}
                  onChange={(e) => updateScreen(screenIndex, { showTitle: e.target.checked })}
                  className="w-5 h-5 text-[#951B6D] rounded focus:ring-[#951B6D] border-[#EDF3F7]"
                />
                <span className="text-sm font-bold text-[#141E29]">Afficher le titre</span>
              </label>
              {screen.showTitle !== false ? (
                <Eye className="w-5 h-5 text-[#16A34A]" />
              ) : (
                <EyeOff className="w-5 h-5 text-[#64748B]" />
              )}
            </div>

            {screen.showTitle !== false && (
              <input
                type="text"
                value={screen.title || ''}
                onChange={(e) => updateScreen(screenIndex, { title: e.target.value })}
                className="w-full px-4 py-3 border border-[#EDF3F7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#951B6D] focus:border-transparent bg-white text-[#141E29] font-medium"
                placeholder="Titre de l'écran"
              />
            )}
          </div>

          {/* Description Configuration */}
          <div className="bg-[#F8FAFC] rounded-xl p-6 border border-[#EDF3F7]">
            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={screen.showDescription !== false}
                  onChange={(e) => updateScreen(screenIndex, { showDescription: e.target.checked })}
                  className="w-5 h-5 text-[#951B6D] rounded focus:ring-[#951B6D] border-[#EDF3F7]"
                />
                <span className="text-sm font-bold text-[#141E29]">Afficher la description</span>
              </label>
              {screen.showDescription !== false ? (
                <Eye className="w-5 h-5 text-[#16A34A]" />
              ) : (
                <EyeOff className="w-5 h-5 text-[#64748B]" />
              )}
            </div>

            {screen.showDescription !== false && (
              <textarea
                value={screen.description || ''}
                onChange={(e) => updateScreen(screenIndex, { description: e.target.value })}
                className="w-full px-4 py-3 border border-[#EDF3F7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#951B6D] focus:border-transparent bg-white text-[#141E29] resize-none"
                rows={3}
                placeholder="Description de l'écran"
              />
            )}
          </div>

          {/* Button Text */}
          {screenIndex !== 3 && (
            <div className="bg-[#F8FAFC] rounded-xl p-6 border border-[#EDF3F7]">
              <label className="block text-sm font-bold text-[#141E29] mb-3">
                Texte du bouton
              </label>
              <input
                type="text"
                value={screen.buttonText || ''}
                onChange={(e) => updateScreen(screenIndex, { buttonText: e.target.value })}
                className="w-full px-4 py-3 border border-[#EDF3F7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#951B6D] focus:border-transparent bg-white text-[#141E29] font-medium"
                placeholder="Texte du bouton"
              />
            </div>
          )}

          {/* Contrast Background */}
          <div className="bg-[#F8FAFC] rounded-xl p-6 border border-[#EDF3F7]">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-[#F8E9F0] rounded-lg flex items-center justify-center">
                <Palette className="w-4 h-4 text-[#951B6D]" />
              </div>
              <span className="text-sm font-bold text-[#141E29]">Fond de contraste</span>
            </div>

            <div className="mb-4">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={contrastBg.enabled || false}
                  onChange={(e) => updateContrastBackground(screenIndex, 'enabled', e.target.checked)}
                  className="w-5 h-5 text-[#951B6D] rounded focus:ring-[#951B6D] border-[#EDF3F7]"
                />
                <span className="text-sm font-bold text-[#141E29]">
                  Afficher un fond de contraste
                </span>
              </label>
            </div>

            {contrastBg.enabled && (
              <div className="space-y-4 bg-white rounded-lg p-4 border border-[#EDF3F7]">
                <div>
                  <label className="block text-xs font-bold text-[#141E29] mb-2">Couleur de fond</label>
                  <div className="flex space-x-3">
                    <input
                      type="color"
                      value={contrastBg.color?.replace(/rgba?\([^)]+\)/, '') || '#ffffff'}
                      onChange={(e) => updateContrastBackground(screenIndex, 'color', `${e.target.value}90`)}
                      className="w-12 h-10 rounded-lg border border-[#EDF3F7]"
                    />
                    <input
                      type="text"
                      value={contrastBg.color || 'rgba(255, 255, 255, 0.9)'}
                      onChange={(e) => updateContrastBackground(screenIndex, 'color', e.target.value)}
                      className="flex-1 px-3 py-2 text-sm border border-[#EDF3F7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#951B6D] text-[#141E29] font-medium"
                      placeholder="rgba(255, 255, 255, 0.9)"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#141E29] mb-2">Padding interne</label>
                  <input
                    type="range"
                    min="0"
                    max="40"
                    value={contrastBg.padding || 16}
                    onChange={(e) => updateContrastBackground(screenIndex, 'padding', Number(e.target.value))}
                    className="w-full accent-[#951B6D]"
                  />
                  <div className="text-xs text-[#64748B] font-medium mt-1">{contrastBg.padding || 16}px</div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#141E29] mb-2">Arrondi des angles</label>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={contrastBg.borderRadius || 8}
                    onChange={(e) => updateContrastBackground(screenIndex, 'borderRadius', Number(e.target.value))}
                    className="w-full accent-[#951B6D]"
                  />
                  <div className="text-xs text-[#64748B] font-medium mt-1">{contrastBg.borderRadius || 8}px</div>
                </div>

                {screenIndex === 2 && (
                  <div>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={contrastBg.applyToGame || false}
                        onChange={(e) => updateContrastBackground(screenIndex, 'applyToGame', e.target.checked)}
                        className="w-5 h-5 text-[#951B6D] rounded focus:ring-[#951B6D] border-[#EDF3F7]"
                      />
                      <span className="text-sm font-bold text-[#141E29]">
                        Appliquer aussi au jeu
                      </span>
                    </label>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const screens = [
    { 
      index: 0, 
      title: 'Écran d\'accueil', 
      description: 'Première impression de votre campagne' 
    },
    { 
      index: 1, 
      title: 'Écran formulaire', 
      description: 'Collecte des informations utilisateur' 
    },
    { 
      index: 2, 
      title: 'Écran jeu', 
      description: 'Interface de jeu principale' 
    },
    { 
      index: 3, 
      title: 'Écran résultat', 
      description: 'Affichage des résultats et remerciements' 
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-left mb-12 max-w-3xl">
          <div className="mb-8">
            <h1 className="text-5xl font-light text-[#141E29] mb-6 leading-tight">
              Configurez vos
              <span className="relative">
                <span className="bg-gradient-to-r from-[#951B6D] to-[#A020F0] bg-clip-text text-transparent font-medium"> écrans</span>
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#951B6D] to-[#A020F0] opacity-30"></div>
              </span>
            </h1>
            
            <p className="text-xl text-[#64748B] leading-relaxed font-light">
              Personnalisez chaque étape du parcours utilisateur avec des fonds de contraste 
              et des options d'affichage adaptées à votre marque.
            </p>
          </div>
        </div>

        {/* Screens Configuration */}
        <div className="space-y-8">
          {screens.map(screen => 
            renderScreenEditor(screen.index, screen.title, screen.description)
          )}
        </div>
      </div>
    </div>
  );
};

export default CampaignScreens;
