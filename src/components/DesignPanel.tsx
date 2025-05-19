
import React from 'react';
import { Image, Layout, Text, Palette, Box, Upload, X } from 'lucide-react';
import { Campaign } from '../types'; 
import ColorPicker from './ColorPicker';
import GradientPicker from './GradientPicker';
import FontSelector from './FontSelector';
import ShadowControls from './ShadowControls';
import BorderControls from './BorderControls';
import SpacingControls from './SpacingControls';

interface DesignPanelProps {
  campaign: Campaign;
  setCampaign: React.Dispatch<React.SetStateAction<Campaign | null>>;
  getRootProps: any;
  getInputProps: any;
  isDragActive: boolean;
  uploadError: string | null;
  uploading: boolean;
  removeImage: () => void;
}

const DesignPanel: React.FC<DesignPanelProps> = ({
  campaign,
  setCampaign,
  getRootProps,
  getInputProps,
  isDragActive,
  uploadError,
  uploading,
  removeImage
}) => {
  const [activeSection, setActiveSection] = React.useState<'background' | 'colors' | 'typography' | 'layout' | 'elements' | 'effects'>('background');

  const updateCampaignColors = (key: keyof Campaign['colors'], value: string) => {
    if (!campaign) return;
    
    setCampaign({
      ...campaign,
      colors: {
        ...campaign.colors,
        [key]: value
      }
    });
  };

  const updateCampaignStyle = (key: keyof Campaign['style'], value: string) => {
    if (!campaign) return;
    
    setCampaign({
      ...campaign,
      style: {
        ...campaign.style,
        [key]: value
      }
    });
  };

  return (
    <div className="p-4">
      {/* Design Panel Navigation */}
      <div className="flex overflow-x-auto mb-6 border-b">
        <button
          onClick={() => setActiveSection('background')}
          className={`flex flex-col items-center px-4 py-3 whitespace-nowrap ${activeSection === 'background' ? 'text-[#841b60] border-b-2 border-[#841b60]' : 'text-gray-600'}`}
        >
          <Image className="w-5 h-5 mb-1" />
          <span className="text-xs">Arrière-plan</span>
        </button>
        <button
          onClick={() => setActiveSection('colors')}
          className={`flex flex-col items-center px-4 py-3 whitespace-nowrap ${activeSection === 'colors' ? 'text-[#841b60] border-b-2 border-[#841b60]' : 'text-gray-600'}`}
        >
          <Palette className="w-5 h-5 mb-1" />
          <span className="text-xs">Couleurs</span>
        </button>
        <button
          onClick={() => setActiveSection('typography')}
          className={`flex flex-col items-center px-4 py-3 whitespace-nowrap ${activeSection === 'typography' ? 'text-[#841b60] border-b-2 border-[#841b60]' : 'text-gray-600'}`}
        >
          <Text className="w-5 h-5 mb-1" />
          <span className="text-xs">Typographie</span>
        </button>
        <button
          onClick={() => setActiveSection('layout')}
          className={`flex flex-col items-center px-4 py-3 whitespace-nowrap ${activeSection === 'layout' ? 'text-[#841b60] border-b-2 border-[#841b60]' : 'text-gray-600'}`}
        >
          <Layout className="w-5 h-5 mb-1" />
          <span className="text-xs">Mise en page</span>
        </button>
        <button
          onClick={() => setActiveSection('effects')}
          className={`flex flex-col items-center px-4 py-3 whitespace-nowrap ${activeSection === 'effects' ? 'text-[#841b60] border-b-2 border-[#841b60]' : 'text-gray-600'}`}
        >
          <Box className="w-5 h-5 mb-1" />
          <span className="text-xs">Effets</span>
        </button>
      </div>

      {/* Background Section */}
      {activeSection === 'background' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Image de fond</h3>
            <div className="space-y-4">
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors
                  ${isDragActive ? 'border-[#841b60] bg-[#841b60] bg-opacity-5' : 'border-gray-300 hover:border-[#841b60]'}`}
              >
                <input {...getInputProps()} />
                <div className="w-8 h-8 mx-auto mb-2 text-gray-400">
                  <Upload className="w-full h-full" />
                </div>
                <p className="text-sm text-gray-600">
                  {isDragActive
                    ? "Déposez l'image ici"
                    : "Glissez-déposez une image ou cliquez pour sélectionner"}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  JPG, PNG ou GIF (max. 5MB)
                </p>
              </div>

              {uploadError && (
                <p className="text-sm text-red-600">{uploadError}</p>
              )}

              {uploading && (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-[#841b60] border-t-transparent"></div>
                  <span className="ml-2 text-sm text-gray-600">Upload en cours...</span>
                </div>
              )}

              {campaign.background_image && (
                <div className="relative">
                  <img
                    src={campaign.background_image}
                    alt="Aperçu"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    onClick={removeImage}
                    className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Style de fond</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type de fond
                </label>
                <select 
                  value={campaign.style?.backgroundType || 'color'} 
                  onChange={(e) => updateCampaignStyle('backgroundType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                >
                  <option value="color">Couleur unie</option>
                  <option value="gradient">Dégradé</option>
                  <option value="image">Image</option>
                </select>
              </div>
              
              {(campaign.style?.backgroundType === 'color' || !campaign.style?.backgroundType) && (
                <ColorPicker 
                  color={campaign.colors?.background || '#ffffff'} 
                  onChange={(color) => updateCampaignColors('background', color)}
                  label="Couleur de fond" 
                />
              )}
              
              {campaign.style?.backgroundType === 'gradient' && (
                <GradientPicker 
                  gradient={campaign.style?.gradient || 'linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)'}
                  onChange={(gradient) => updateCampaignStyle('gradient', gradient)}
                />
              )}

              {campaign.style?.backgroundType === 'image' && campaign.background_image && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Opacité de l'overlay
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={parseInt(campaign.style?.imageOverlayOpacity || '50')}
                    onChange={(e) => updateCampaignStyle('imageOverlayOpacity', e.target.value)}
                    className="w-full"
                  />

                  <label className="block text-sm font-medium text-gray-700 mb-2 mt-4">
                    Couleur de l'overlay
                  </label>
                  <ColorPicker 
                    color={campaign.style?.imageOverlayColor || 'rgba(0,0,0,0.5)'} 
                    onChange={(color) => updateCampaignStyle('imageOverlayColor', color)} 
                  />

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Position de l'image
                    </label>
                    <select 
                      value={campaign.style?.backgroundPosition || 'center center'} 
                      onChange={(e) => updateCampaignStyle('backgroundPosition', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                    >
                      <option value="center center">Centre</option>
                      <option value="top center">Haut</option>
                      <option value="bottom center">Bas</option>
                      <option value="center left">Gauche</option>
                      <option value="center right">Droite</option>
                      <option value="top left">Haut gauche</option>
                      <option value="top right">Haut droite</option>
                      <option value="bottom left">Bas gauche</option>
                      <option value="bottom right">Bas droite</option>
                    </select>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Taille de l'image
                    </label>
                    <select 
                      value={campaign.style?.backgroundSize || 'cover'} 
                      onChange={(e) => updateCampaignStyle('backgroundSize', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                    >
                      <option value="cover">Couvrir</option>
                      <option value="contain">Contenir</option>
                      <option value="auto">Auto</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Colors Section */}
      {activeSection === 'colors' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Couleurs</h3>
            <div className="space-y-4">
              <ColorPicker
                label="Boutons"
                color={campaign.colors?.button || '#841b60'}
                onChange={(color) => updateCampaignColors('button', color)}
              />
              
              <ColorPicker
                label="Texte des boutons"
                color={campaign.colors?.buttonText || '#ffffff'}
                onChange={(color) => updateCampaignColors('buttonText', color)}
              />
              
              <ColorPicker
                label="Texte principal"
                color={campaign.colors?.text || '#333333'}
                onChange={(color) => updateCampaignColors('text', color)}
              />
              
              <ColorPicker
                label="Bordures"
                color={campaign.colors?.border || '#e5e7eb'}
                onChange={(color) => updateCampaignColors('border', color)}
              />
              
              <ColorPicker
                label="Arrière-plan questions"
                color={campaign.colors?.questionBackground || 'rgba(255, 255, 255, 0.9)'}
                onChange={(color) => updateCampaignColors('questionBackground', color)}
              />
              
              <ColorPicker
                label="Barre de progression"
                color={campaign.colors?.progressBar || '#841b60'}
                onChange={(color) => updateCampaignColors('progressBar', color)}
              />
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Thème de couleurs prédéfini</h4>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { name: 'Purple', primary: '#841b60', text: '#333333', bg: '#ffffff' },
                    { name: 'Blue', primary: '#1a73e8', text: '#333333', bg: '#f8f9fa' },
                    { name: 'Green', primary: '#0f9d58', text: '#333333', bg: '#f1f8e9' },
                    { name: 'Orange', primary: '#fa7b17', text: '#333333', bg: '#fff8e1' },
                    { name: 'Red', primary: '#ea4335', text: '#333333', bg: '#fce4ec' },
                    { name: 'Dark', primary: '#5f6368', text: '#ffffff', bg: '#202124' },
                    { name: 'Light', primary: '#dadce0', text: '#202124', bg: '#ffffff' },
                    { name: 'Custom', primary: campaign.colors?.button || '#841b60', text: campaign.colors?.text || '#333333', bg: campaign.colors?.background || '#ffffff' }
                  ].map((theme, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setCampaign({
                          ...campaign,
                          colors: {
                            ...campaign.colors,
                            button: theme.primary,
                            text: theme.text,
                            background: theme.bg,
                            progressBar: theme.primary,
                          }
                        });
                      }}
                      className="p-2 border rounded-md hover:border-[#841b60] transition-colors"
                      style={{ background: theme.bg }}
                    >
                      <div 
                        className="h-6 rounded mb-1" 
                        style={{ background: theme.primary }}
                      ></div>
                      <div className="text-xs text-center" style={{ color: theme.text }}>
                        {theme.name}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Typography Section */}
      {activeSection === 'typography' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Typographie</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Police principale
                </label>
                <FontSelector
                  value={campaign.style?.fontFamily || 'Inter'}
                  onChange={(font) => updateCampaignStyle('fontFamily', font)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Taille du texte
                </label>
                <select 
                  value={campaign.style?.fontSize || 'medium'} 
                  onChange={(e) => updateCampaignStyle('fontSize', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                >
                  <option value="small">Petit</option>
                  <option value="medium">Moyen</option>
                  <option value="large">Grand</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Style des titres
                </label>
                <select 
                  value={campaign.style?.headingStyle || 'normal'} 
                  onChange={(e) => updateCampaignStyle('headingStyle', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                >
                  <option value="normal">Normal</option>
                  <option value="bold">Gras</option>
                  <option value="light">Léger</option>
                  <option value="uppercase">MAJUSCULES</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interligne
                </label>
                <select 
                  value={campaign.style?.lineHeight || 'normal'} 
                  onChange={(e) => updateCampaignStyle('lineHeight', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                >
                  <option value="tight">Serré</option>
                  <option value="normal">Normal</option>
                  <option value="relaxed">Espacé</option>
                  <option value="loose">Très espacé</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alignement du texte
                </label>
                <div className="flex space-x-2">
                  {['left', 'center', 'right'].map((align) => (
                    <button
                      key={align}
                      onClick={() => updateCampaignStyle('textAlign', align)}
                      className={`flex-1 py-2 border ${campaign.style?.textAlign === align ? 'border-[#841b60] bg-[#841b60] text-white' : 'border-gray-300 hover:border-[#841b60]'}`}
                    >
                      {align === 'left' && 'Gauche'}
                      {align === 'center' && 'Centre'}
                      {align === 'right' && 'Droite'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Layout Section */}
      {activeSection === 'layout' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Mise en page</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rayon des coins (conteneur)
                </label>
                <input
                  type="range"
                  min="0"
                  max="24"
                  value={parseInt(campaign.style?.containerRadius || '12')}
                  onChange={(e) => updateCampaignStyle('containerRadius', `${e.target.value}px`)}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0px</span>
                  <span>12px</span>
                  <span>24px</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rayon des coins (boutons)
                </label>
                <input
                  type="range"
                  min="0"
                  max="24"
                  value={parseInt(campaign.style?.buttonRadius || '8')}
                  onChange={(e) => updateCampaignStyle('buttonRadius', `${e.target.value}px`)}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0px</span>
                  <span>12px</span>
                  <span>24px</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Opacité du conteneur
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={parseFloat(campaign.style?.containerOpacity || '0.9') * 100}
                  onChange={(e) => updateCampaignStyle('containerOpacity', (parseInt(e.target.value) / 100).toString())}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Taille du conteneur
                </label>
                <select 
                  value={campaign.style?.containerSize || 'medium'} 
                  onChange={(e) => updateCampaignStyle('containerSize', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                >
                  <option value="small">Petit</option>
                  <option value="medium">Moyen</option>
                  <option value="large">Grand</option>
                  <option value="fullscreen">Plein écran</option>
                </select>
              </div>
              
              <SpacingControls 
                padding={campaign.style?.containerPadding || '20px'}
                onChange={(value) => updateCampaignStyle('containerPadding', value)}
                label="Espacement interne (padding)"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Position du formulaire
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['top-left', 'top-center', 'top-right', 'center-left', 'center-center', 'center-right', 'bottom-left', 'bottom-center', 'bottom-right'].map((position) => (
                    <button
                      key={position}
                      onClick={() => updateCampaignStyle('formPosition', position)}
                      className={`aspect-square border ${campaign.style?.formPosition === position ? 'border-[#841b60] bg-[#841b60] bg-opacity-10' : 'border-gray-300'}`}
                    >
                      <div className={`h-full w-full flex items-${position.split('-')[0]} justify-${position.split('-')[1]}`}>
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Effects Section */}
      {activeSection === 'effects' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Effets</h3>
            <div className="space-y-4">
              <ShadowControls 
                shadow={campaign.style?.containerShadow || 'none'} 
                onChange={(value) => updateCampaignStyle('containerShadow', value)}
                label="Ombre du conteneur"
              />
              
              <ShadowControls 
                shadow={campaign.style?.buttonShadow || 'none'} 
                onChange={(value) => updateCampaignStyle('buttonShadow', value)}
                label="Ombre des boutons"
              />
              
              <BorderControls 
                border={campaign.style?.containerBorder || 'none'} 
                onChange={(value) => updateCampaignStyle('containerBorder', value)}
                label="Bordure du conteneur"
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Animation d'entrée
                </label>
                <select 
                  value={campaign.style?.animation || 'none'} 
                  onChange={(e) => updateCampaignStyle('animation', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                >
                  <option value="none">Aucune</option>
                  <option value="fade">Fondu</option>
                  <option value="slide-up">Glissement vers le haut</option>
                  <option value="slide-down">Glissement vers le bas</option>
                  <option value="zoom-in">Zoom avant</option>
                  <option value="bounce">Rebond</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Effet au survol des boutons
                </label>
                <select 
                  value={campaign.style?.buttonHoverEffect || 'darken'} 
                  onChange={(e) => updateCampaignStyle('buttonHoverEffect', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                >
                  <option value="darken">Assombrir</option>
                  <option value="lighten">Éclaircir</option>
                  <option value="scale">Agrandir</option>
                  <option value="shadow">Ombre</option>
                  <option value="none">Aucun</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DesignPanel;
