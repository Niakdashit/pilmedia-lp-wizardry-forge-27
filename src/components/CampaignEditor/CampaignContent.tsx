
import React, { useState } from 'react';
import { Quiz, Wheel, Scratch, Swiper } from '../GameTypes';
import { Palette, Type, Square, Box } from 'lucide-react';
import { Campaign } from '../../types/campaign';

interface CampaignContentProps {
  campaign: Campaign;
  setCampaign: React.Dispatch<React.SetStateAction<Campaign>>;
}

const CampaignContent: React.FC<CampaignContentProps> = ({ campaign, setCampaign }) => {
  const [activeSection, setActiveSection] = useState<'game' | 'style'>('game');

  const fonts = [
    { name: 'Inter', value: 'Inter, sans-serif' },
    { name: 'Poppins', value: 'Poppins, sans-serif' },
    { name: 'Roboto', value: 'Roboto, sans-serif' },
    { name: 'Montserrat', value: 'Montserrat, sans-serif' },
    { name: 'Open Sans', value: 'Open Sans, sans-serif' },
    { name: 'Lato', value: 'Lato, sans-serif' },
    { name: 'Raleway', value: 'Raleway, sans-serif' },
    { name: 'Nunito', value: 'Nunito, sans-serif' },
    { name: 'Playfair Display', value: 'Playfair Display, serif' },
    { name: 'Source Sans Pro', value: 'Source Sans Pro, sans-serif' }
  ];

  const updateStyle = (key: string, value: string) => {
    setCampaign((prev: Campaign) => ({
      ...prev,
      design: {
        ...prev.design,
        [key]: value
      }
    }));
  };

  const getContentEditor = () => {
    switch (campaign.type) {
      case 'quiz':
        return (
          <Quiz 
            config={campaign.gameConfig.quiz} 
            onConfigChange={(config) => {
              setCampaign((prev: Campaign) => ({
                ...prev,
                gameConfig: {
                  ...prev.gameConfig,
                  quiz: config
                }
              }));
            }} 
          />
        );
      case 'wheel':
        return (
          <Wheel 
            config={campaign.gameConfig.wheel} 
            onConfigChange={(config) => {
              setCampaign((prev: Campaign) => ({
                ...prev,
                gameConfig: {
                  ...prev.gameConfig,
                  wheel: config
                }
              }));
            }} 
          />
        );
      case 'scratch':
        return (
          <Scratch 
            config={campaign.gameConfig.scratch} 
            onConfigChange={(config) => {
              setCampaign((prev: Campaign) => ({
                ...prev,
                gameConfig: {
                  ...prev.gameConfig,
                  scratch: config
                }
              }));
            }} 
          />
        );
      case 'swiper':
        return (
          <Swiper 
            config={campaign.gameConfig.swiper} 
            onConfigChange={(config) => {
              setCampaign((prev: Campaign) => ({
                ...prev,
                gameConfig: {
                  ...prev.gameConfig,
                  swiper: config
                }
              }));
            }} 
          />
        );
      default:
        return (
          <div className="flex items-center justify-center h-64 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-gray-500">
              Éditeur de contenu pour le type "{campaign.type}" en cours de développement.
            </p>
          </div>
        );
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-[#f9f0f5] border border-[#e9d0e5] rounded-lg p-4">
        <p className="text-[#841b60] text-sm">
          Configurez le contenu et les paramètres de votre {campaign.type}.
        </p>
      </div>

      <div className="flex space-x-4 border-b border-gray-200">
        <button
          onClick={() => setActiveSection('game')}
          className={`py-3 px-4 font-medium text-sm border-b-2 transition-colors duration-200 ${
            activeSection === 'game'
              ? 'border-[#841b60] text-[#841b60]'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Mécanique de jeu
        </button>
        <button
          onClick={() => setActiveSection('style')}
          className={`py-3 px-4 font-medium text-sm border-b-2 transition-colors duration-200 ${
            activeSection === 'style'
              ? 'border-[#841b60] text-[#841b60]'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Style visuel
        </button>
      </div>

      {activeSection === 'game' ? (
        getContentEditor()
      ) : (
        <div className="space-y-8">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center">
              <Palette className="w-5 h-5 mr-2" />
              Couleurs
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Couleur des titres
                </label>
                <input
                  type="color"
                  value={campaign.design.titleColor || '#000000'}
                  onChange={(e) => updateStyle('titleColor', e.target.value)}
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
                  onChange={(e) => updateStyle('buttonColor', e.target.value)}
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
                  onChange={(e) => updateStyle('blockColor', e.target.value)}
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
                  onChange={(e) => updateStyle('borderColor', e.target.value)}
                  className="w-full h-10 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center">
              <Square className="w-5 h-5 mr-2" />
              Coins arrondis
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => updateStyle('borderRadius', '0')}
                className={`p-4 border rounded flex items-center justify-center ${
                  campaign.design.borderRadius === '0'
                    ? 'border-[#841b60] bg-[#f8f0f5]'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="w-8 h-8 bg-gray-200" />
              </button>
              <button
                onClick={() => updateStyle('borderRadius', '0.5rem')}
                className={`p-4 border rounded flex items-center justify-center ${
                  campaign.design.borderRadius === '0.5rem'
                    ? 'border-[#841b60] bg-[#f8f0f5]'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="w-8 h-8 bg-gray-200 rounded-lg" />
              </button>
              <button
                onClick={() => updateStyle('borderRadius', '9999px')}
                className={`p-4 border rounded flex items-center justify-center ${
                  campaign.design.borderRadius === '9999px'
                    ? 'border-[#841b60] bg-[#f8f0f5]'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="w-8 h-8 bg-gray-200 rounded-full" />
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center">
              <Box className="w-5 h-5 mr-2" />
              Ombres
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => updateStyle('shadow', 'none')}
                className={`p-4 border rounded flex items-center justify-center ${
                  campaign.design.shadow === 'none'
                    ? 'border-[#841b60] bg-[#f8f0f5]'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="w-8 h-8 bg-gray-200 rounded" />
              </button>
              <button
                onClick={() => updateStyle('shadow', 'shadow-md')}
                className={`p-4 border rounded flex items-center justify-center ${
                  campaign.design.shadow === 'shadow-md'
                    ? 'border-[#841b60] bg-[#f8f0f5]'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="w-8 h-8 bg-gray-200 rounded shadow-md" />
              </button>
              <button
                onClick={() => updateStyle('shadow', 'shadow-xl')}
                className={`p-4 border rounded flex items-center justify-center ${
                  campaign.design.shadow === 'shadow-xl'
                    ? 'border-[#841b60] bg-[#f8f0f5]'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="w-8 h-8 bg-gray-200 rounded shadow-xl" />
              </button>
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
                  onChange={(e) => updateStyle('titleFont', e.target.value)}
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
                  onChange={(e) => updateStyle('textFont', e.target.value)}
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
                  Taille du texte
                </label>
                <select
                  value={campaign.design.fontSize || 'normal'}
                  onChange={(e) => updateStyle('fontSize', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                >
                  <option value="small">Petit</option>
                  <option value="normal">Normal</option>
                  <option value="large">Grand</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Graisse du texte
                </label>
                <select
                  value={campaign.design.fontWeight || 'normal'}
                  onChange={(e) => updateStyle('fontWeight', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                >
                  <option value="light">Light</option>
                  <option value="normal">Regular</option>
                  <option value="bold">Bold</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignContent;
