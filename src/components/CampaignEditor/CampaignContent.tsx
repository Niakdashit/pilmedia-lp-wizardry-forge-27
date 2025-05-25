import React, { useState } from 'react';
import { Quiz, Scratch, Memory, Puzzle, Dice, Jackpot } from '../GameTypes';
import TabRoulette from '@/components/configurators/TabRoulette';
import TabJackpot from '@/components/configurators/TabJackpot';
import { Palette, Type, Square, Box } from 'lucide-react';

interface CampaignContentProps {
  campaign: any;
  setCampaign: React.Dispatch<React.SetStateAction<any>>;
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
    setCampaign(prev => ({
      ...prev,
      design: {
        ...prev.design,
        [key]: value
      }
    }));
  };

  const getContentEditor = () => {
    console.log('Current campaign type:', campaign.type);
    console.log('Current gameConfig:', campaign.gameConfig);

    switch (campaign.type) {
      case 'quiz':
        return (
          <Quiz 
            config={campaign.gameConfig?.quiz} 
            onConfigChange={(config) => {
              setCampaign(prev => ({
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
          <TabRoulette 
            campaign={campaign}
            setCampaign={setCampaign}
          />
        );
      case 'scratch':
        return (
          <Scratch 
            config={campaign.gameConfig?.scratch} 
            onConfigChange={(config) => {
              setCampaign(prev => ({
                ...prev,
                gameConfig: {
                  ...prev.gameConfig,
                  scratch: config
                }
              }));
            }} 
          />
        );
      case 'memory':
        return (
          <Memory 
            config={campaign.gameConfig?.memory} 
            onConfigChange={(config) => {
              setCampaign(prev => ({
                ...prev,
                gameConfig: {
                  ...prev.gameConfig,
                  memory: config
                }
              }));
            }} 
          />
        );
      case 'puzzle':
        return (
          <Puzzle 
            config={campaign.gameConfig?.puzzle} 
            onConfigChange={(config) => {
              setCampaign(prev => ({
                ...prev,
                gameConfig: {
                  ...prev.gameConfig,
                  puzzle: config
                }
              }));
            }} 
          />
        );
      case 'dice':
        return (
          <Dice 
            config={campaign.gameConfig?.dice} 
            onConfigChange={(config) => {
              setCampaign(prev => ({
                ...prev,
                gameConfig: {
                  ...prev.gameConfig,
                  dice: config
                }
              }));
            }} 
          />
        );
      case 'jackpot':
        console.log('Rendering Jackpot editor with config:', campaign.gameConfig?.jackpot);
        return (
          <TabJackpot
            config={campaign.gameConfig?.jackpot}
            onConfigChange={(config) => {
              console.log('Updating jackpot config:', config);
              setCampaign(prev => ({
                ...prev,
                gameConfig: {
                  ...prev.gameConfig,
                  jackpot: config
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
              {['0', '0.5rem', '9999px'].map((value, i) => (
                <button
                  key={i}
                  onClick={() => updateStyle('borderRadius', value)}
                  className={`p-4 border rounded flex items-center justify-center ${
                    campaign.design.borderRadius === value
                      ? 'border-[#841b60] bg-[#f8f0f5]'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div
                    className={`w-8 h-8 bg-gray-200 ${
                      value === '0' ? '' : value === '0.5rem' ? 'rounded-lg' : 'rounded-full'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center">
              <Box className="w-5 h-5 mr-2" />
              Ombres
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {['none', 'shadow-md', 'shadow-xl'].map((value, i) => (
                <button
                  key={i}
                  onClick={() => updateStyle('shadow', value)}
                  className={`p-4 border rounded flex items-center justify-center ${
                    campaign.design.shadow === value
                      ? 'border-[#841b60] bg-[#f8f0f5]'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-8 h-8 bg-gray-200 rounded ${value}`} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center">
              <Type className="w-5 h-5 mr-2" />
              Typographie
            </h3>
            <div className="space-y-4">
              {['titleFont', 'textFont'].map((key, i) => (
                <div key={i}>
                  <label className="block text-sm text-gray-600 mb-2">
                    {key === 'titleFont' ? 'Police des titres' : 'Police du texte'}
                  </label>
                  <select
                    value={campaign.design[key] || fonts[0].value}
                    onChange={(e) => updateStyle(key, e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                  >
                    {fonts.map((font) => (
                      <option key={font.value} value={font.value}>
                        {font.name}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
              <div>
                <label className="block text-sm text-gray-600 mb-2">Taille du texte</label>
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
                <label className="block text-sm text-gray-600 mb-2">Graisse du texte</label>
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