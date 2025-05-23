import React, { useState } from 'react';
import { Layout, Type, Palette, Box, Image as ImageIcon, Upload, Code, Eye, Link as LinkIcon } from 'lucide-react';
import Color from 'color';
import PreviewContent from './PreviewContent';

// Add the getContrastColor function
const getContrastColor = (backgroundColor: string): string => {
  try {
    const color = Color(backgroundColor);
    // Calculate relative luminance
    return color.isLight() ? '#000000' : '#FFFFFF';
  } catch (error) {
    // Fallback to black if there's an error parsing the color
    return '#000000';
  }
};

interface CampaignScreensProps {
  campaign: any;
  setCampaign: React.Dispatch<React.SetStateAction<any>>;
}

const CampaignScreens: React.FC<CampaignScreensProps> = ({ campaign, setCampaign }) => {
  const [activeScreen, setActiveScreen] = useState<'start' | 'game' | 'end'>('start');
  const [activeTab, setActiveTab] = useState<'content' | 'design'>('content');

  const fonts = [
    { name: 'Inter', value: 'Inter, sans-serif' },
    { name: 'Poppins', value: 'Poppins, sans-serif' },
    { name: 'Roboto', value: 'Roboto, sans-serif' },
    { name: 'Montserrat', value: 'Montserrat, sans-serif' },
    { name: 'Open Sans', value: 'Open Sans, sans-serif' }
  ];

  const updateScreen = (screenNumber: number, field: string, value: any) => {
    setCampaign(prev => ({
      ...prev,
      screens: {
        ...prev.screens,
        [screenNumber]: {
          ...prev.screens?.[screenNumber],
          [field]: value
        }
      }
    }));
  };

  const updateDesign = (key: string, value: any) => {
    setCampaign(prev => ({
      ...prev,
      design: {
        ...prev.design,
        [key]: value
      }
    }));
  };

  const handleBackgroundImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateDesign('backgroundImage', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const getPositionStyles = (position: string) => {
    const styles: React.CSSProperties = {
      position: 'absolute',
      maxWidth: '100%',
      padding: '1rem',
    };

    switch (position) {
      case 'top-left':
        return { ...styles, top: '1rem', left: '1rem' };
      case 'top-center':
        return { ...styles, top: '1rem', left: '50%', transform: 'translateX(-50%)' };
      case 'top-right':
        return { ...styles, top: '1rem', right: '1rem' };
      case 'center-left':
        return { ...styles, top: '50%', left: '1rem', transform: 'translateY(-50%)' };
      case 'center-center':
        return { ...styles, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
      case 'center-right':
        return { ...styles, top: '50%', right: '1rem', transform: 'translateY(-50%)' };
      case 'bottom-left':
        return { ...styles, bottom: '1rem', left: '1rem' };
      case 'bottom-center':
        return { ...styles, bottom: '1rem', left: '50%', transform: 'translateX(-50%)' };
      case 'bottom-right':
        return { ...styles, bottom: '1rem', right: '1rem' };
      default:
        return { ...styles, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
    }
  };

  const getFrameStyle = (screenNumber: number) => {
    const screenConfig = campaign.screens?.[screenNumber];
    const frameConfig = screenConfig?.frame;
    
    if (frameConfig?.show === false) {
      return {};
    }

    return {
      maxWidth: `${frameConfig?.maxWidth || campaign.design.frame?.maxWidth || 800}px`,
      maxHeight: `${frameConfig?.maxHeight || campaign.design.frame?.maxHeight || 90}%`,
      padding: `${frameConfig?.padding || campaign.design.frame?.padding || 24}px`,
      backgroundColor: Color(campaign.design.blockColor || '#FFFFFF').alpha(0.9).toString(),
      backdropFilter: 'blur(8px)',
      borderRadius: campaign.design.borderRadius || '0.5rem',
      boxShadow: campaign.design.shadow === 'shadow-xl' 
        ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
        : campaign.design.shadow === 'shadow-md'
        ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        : 'none',
      border: `1px solid ${campaign.design.borderColor || '#E5E7EB'}`,
      ...getPositionStyles(frameConfig?.position || 'center-center')
    };
  };

  const getScreenNumber = () => {
    switch (activeScreen) {
      case 'start': return 1;
      case 'game': return 2;
      case 'end': return 3;
      default: return 1;
    }
  };

  const updateScreenFrame = (field: string, value: any) => {
    const screenNumber = getScreenNumber();
    setCampaign(prev => ({
      ...prev,
      screens: {
        ...prev.screens,
        [screenNumber]: {
          ...prev.screens?.[screenNumber],
          frame: {
            ...prev.screens?.[screenNumber]?.frame,
            [field]: value
          }
        }
      }
    }));
  };

  return (
    <div className="flex h-full">
      {/* Left panel - Settings */}
      <div className="w-96 border-r border-gray-200 overflow-y-auto">
        <div className="p-6 space-y-6">
          <div className="flex space-x-4 border-b border-gray-200">
            <button
              onClick={() => setActiveScreen('start')}
              className={`py-3 px-4 font-medium text-sm border-b-2 transition-colors duration-200 ${
                activeScreen === 'start'
                  ? 'border-[#841b60] text-[#841b60]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Écran d'accueil
            </button>
            <button
              onClick={() => setActiveScreen('game')}
              className={`py-3 px-4 font-medium text-sm border-b-2 transition-colors duration-200 ${
                activeScreen === 'game'
                  ? 'border-[#841b60] text-[#841b60]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Écran de jeu
            </button>
            <button
              onClick={() => setActiveScreen('end')}
              className={`py-3 px-4 font-medium text-sm border-b-2 transition-colors duration-200 ${
                activeScreen === 'end'
                  ? 'border-[#841b60] text-[#841b60]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Écran de fin
            </button>
          </div>

          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setActiveTab('content')}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-lg ${
                activeTab === 'content'
                  ? 'bg-[#841b60] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Contenu
            </button>
            <button
              onClick={() => setActiveTab('design')}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-lg ${
                activeTab === 'design'
                  ? 'bg-[#841b60] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Design
            </button>
          </div>

          {activeTab === 'content' && (
            <div className="space-y-6">
              {activeScreen === 'start' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Titre
                    </label>
                    <input
                      type="text"
                      value={campaign.screens?.[1]?.title || ''}
                      onChange={(e) => updateScreen(1, 'title', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={campaign.screens?.[1]?.description || ''}
                      onChange={(e) => updateScreen(1, 'description', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Texte du bouton
                    </label>
                    <input
                      type="text"
                      value={campaign.screens?.[1]?.buttonText || ''}
                      onChange={(e) => updateScreen(1, 'buttonText', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                    />
                  </div>
                </>
              )}

              {activeScreen === 'end' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Titre
                    </label>
                    <input
                      type="text"
                      value={campaign.screens?.[3]?.title || ''}
                      onChange={(e) => updateScreen(3, 'title', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      value={campaign.screens?.[3]?.description || ''}
                      onChange={(e) => updateScreen(3, 'description', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Texte du bouton
                    </label>
                    <input
                      type="text"
                      value={campaign.screens?.[3]?.buttonText || ''}
                      onChange={(e) => updateScreen(3, 'buttonText', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                    />
                  </div>
                </>
              )}
            </div>
          )}

          {activeTab === 'design' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center">
                  <ImageIcon className="w-5 h-5 mr-2" />
                  Image de fond
                </h3>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleBackgroundImageChange}
                    className="hidden"
                    id="background-image"
                  />
                  <label
                    htmlFor="background-image"
                    className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <Upload className="w-5 h-5 mr-2 text-gray-400" />
                    <span className="text-sm text-gray-600">Choisir une image</span>
                  </label>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center">
                  <Box className="w-5 h-5 mr-2" />
                  Cadre blanc
                </h3>
                <div className="space-y-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={campaign.screens?.[getScreenNumber()]?.frame?.show !== false}
                      onChange={(e) => updateScreenFrame('show', e.target.checked)}
                      className="rounded border-gray-300 text-[#841b60] focus:ring-[#841b60]"
                    />
                    <span className="ml-2 text-sm text-gray-600">Afficher le cadre</span>
                  </label>

                  {campaign.screens?.[getScreenNumber()]?.frame?.show !== false && (
                    <>
                      <div>
                        <label className="block text-sm text-gray-600 mb-2">
                          Position
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            'top-left', 'top-center', 'top-right',
                            'center-left', 'center-center', 'center-right',
                            'bottom-left', 'bottom-center', 'bottom-right'
                          ].map((position) => (
                            <button
                              key={position}
                              onClick={() => updateScreenFrame('position', position)}
                              className={`p-3 border rounded-lg ${
                                campaign.screens?.[getScreenNumber()]?.frame?.position === position
                                  ? 'border-[#841b60] bg-[#f8f0f5]'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm text-gray-600 mb-2">
                          Largeur maximale (px)
                        </label>
                        <input
                          type="number"
                          min="200"
                          max="1200"
                          step="10"
                          value={campaign.screens?.[getScreenNumber()]?.frame?.maxWidth || 800}
                          onChange={(e) => updateScreenFrame('maxWidth', parseInt(e.target.value))}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-600 mb-2">
                          Hauteur maximale (%)
                        </label>
                        <input
                          type="number"
                          min="30"
                          max="100"
                          step="5"
                          value={campaign.screens?.[getScreenNumber()]?.frame?.maxHeight || 90}
                          onChange={(e) => updateScreenFrame('maxHeight', parseInt(e.target.value))}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-600 mb-2">
                          Marge intérieure (px)
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          step="4"
                          value={campaign.screens?.[getScreenNumber()]?.frame?.padding || 24}
                          onChange={(e) => updateScreenFrame('padding', parseInt(e.target.value))}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center">
                  <Palette className="w-5 h-5 mr-2" />
                  Couleurs
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      Couleur des titres
                    </label>
                    <input
                      type="color"
                      value={campaign.design.titleColor || '#000000'}
                      onChange={(e) => updateDesign('titleColor', e.target.value)}
                      className="w-full h-10 rounded-lg cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      Couleur des boutons
                    </label>
                    <input
                      type="color"
                      value={campaign.design.buttonColor || '#841b60'}
                      onChange={(e) => updateDesign('buttonColor', e.target.value)}
                      className="w-full h-10 rounded-lg cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      Couleur des blocs
                    </label>
                    <input
                      type="color"
                      value={campaign.design.blockColor || '#FFFFFF'}
                      onChange={(e) => updateDesign('blockColor', e.target.value)}
                      className="w-full h-10 rounded-lg cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      Couleur des bordures
                    </label>
                    <input
                      type="color"
                      value={campaign.design.borderColor || '#E5E7EB'}
                      onChange={(e) => updateDesign('borderColor', e.target.value)}
                      className="w-full h-10 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center">
                  <Type className="w-5 h-5 mr-2" />
                  Typographie
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      Police des titres
                    </label>
                    <select
                      value={campaign.design.titleFont || fonts[0].value}
                      onChange={(e) => updateDesign('titleFont', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                    >
                      {fonts.map((font) => (
                        <option key={font.value} value={font.value}>
                          {font.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      Police du texte
                    </label>
                    <select
                      value={campaign.design.textFont || fonts[0].value}
                      onChange={(e) => updateDesign('textFont', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                    >
                      {fonts.map((font) => (
                        <option key={font.value} value={font.value}>
                          {font.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center">
                  <Code className="w-5 h-5 mr-2" />
                  Code personnalisé
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      HTML personnalisé
                    </label>
                    <textarea
                      value={campaign.design.customHTML || ''}
                      onChange={(e) => updateDesign('customHTML', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg font-mono text-sm"
                      rows={4}
                      placeholder="<div>Mon HTML personnalisé</div>"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      CSS personnalisé
                    </label>
                    <textarea
                      value={campaign.design.customCSS || ''}
                      onChange={(e) => updateDesign('customCSS', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg font-mono text-sm"
                      rows={4}
                      placeholder=".custom-class { color: red; }"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right panel - Preview */}
      <div className="flex-1 bg-gray-100 p-6">
        <div className="h-full relative bg-white rounded-lg overflow-hidden shadow-sm">
          {campaign.design.backgroundImage && (
            <div 
              className="absolute inset-0 bg-center bg-no-repeat"
              style={{ 
                backgroundImage: `url(${campaign.design.backgroundImage})`,
                backgroundSize: 'contain'
              }}
            />
          )}

          {/* Custom HTML/CSS */}
          <div 
            className="absolute inset-0"
            dangerouslySetInnerHTML={{ 
              __html: `<style>${campaign.design.customCSS || ''}</style>${campaign.design.customHTML || ''}` 
            }}
          />

          <div className="relative h-full">
            {activeScreen === 'start' && (
              <div style={getFrameStyle(1)}>
                <h2 
                  className="text-2xl font-bold mb-4"
                  style={{ 
                    color: campaign.design.titleColor,
                    fontFamily: campaign.design.titleFont
                  }}
                >
                  {campaign.screens?.[1]?.title || 'Bienvenue !'}
                </h2>
                <p 
                  className="mb-8"
                  style={{ 
                    color: getContrastColor(campaign.design.blockColor),
                    fontFamily: campaign.design.textFont
                  }}
                >
                  {campaign.screens?.[1]?.description || 'Participez à notre jeu et tentez de gagner !'}
                </p>
                <button
                  className="px-6 py-3 font-medium transition-colors duration-200"
                  style={{
                    backgroundColor: campaign.design.buttonColor,
                    color: getContrastColor(campaign.design.buttonColor),
                    borderRadius: campaign.design.borderRadius,
                    fontFamily: campaign.design.textFont
                  }}
                >
                  {campaign.screens?.[1]?.buttonText || 'Participer'}
                </button>
              </div>
            )}

            {activeScreen === 'game' && (
              <div style={getFrameStyle(2)}>
                <PreviewContent 
                  campaign={campaign}
                  step="game"
                />
              </div>
            )}

            {activeScreen === 'end' && (
              <div style={getFrameStyle(3)}>
                <h2 
                  className="text-2xl font-bold mb-4"
                  style={{ 
                    color: campaign.design.titleColor,
                    fontFamily: campaign.design.titleFont
                  }}
                >
                  {campaign.screens?.[3]?.title || 'Félicitations !'}
                </h2>
                <p 
                  className="mb-8"
                  style={{ 
                    color: getContrastColor(campaign.design.blockColor),
                    fontFamily: campaign.design.textFont
                  }}
                >
                  {campaign.screens?.[3]?.description || 'Merci pour votre participation !'}
                </p>
                <button
                  className="px-6 py-3 font-medium transition-colors duration-200"
                  style={{
                    backgroundColor: campaign.design.buttonColor,
                    color: getContrastColor(campaign.design.buttonColor),
                    borderRadius: campaign.design.borderRadius,
                    fontFamily: campaign.design.textFont
                  }}
                >
                  {campaign.screens?.[3]?.buttonText || 'Rejouer'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignScreens;