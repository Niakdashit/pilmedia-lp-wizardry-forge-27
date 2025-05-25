
import React, { useState } from 'react';
import { Eye, Monitor, Smartphone, Tablet, Plus, Trash2 } from 'lucide-react';
import ImageUpload from '../common/ImageUpload';

interface CampaignScreensProps {
  campaign: any;
  setCampaign: React.Dispatch<React.SetStateAction<any>>;
}

const CampaignScreens: React.FC<CampaignScreensProps> = ({ campaign, setCampaign }) => {
  const [activeScreen, setActiveScreen] = useState(1);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const updateScreen = (screenId: number, field: string, value: any) => {
    setCampaign((prev: any) => ({
      ...prev,
      screens: {
        ...prev.screens,
        [screenId]: {
          ...prev.screens[screenId],
          [field]: value
        }
      }
    }));
  };

  const updateDesign = (field: string, value: any) => {
    setCampaign((prev: any) => ({
      ...prev,
      design: {
        ...prev.design,
        [field]: value
      }
    }));
  };

  const getDeviceClass = () => {
    switch (previewDevice) {
      case 'mobile':
        return 'w-80 h-96';
      case 'tablet':
        return 'w-96 h-[30rem]';
      default:
        return 'w-full h-96';
    }
  };

  const getDeviceIcon = () => {
    switch (previewDevice) {
      case 'mobile':
        return <Smartphone className="w-4 h-4" />;
      case 'tablet':
        return <Tablet className="w-4 h-4" />;
      default:
        return <Monitor className="w-4 h-4" />;
    }
  };

  const screens = [
    { id: 1, name: 'Écran d\'accueil', description: 'Page d\'introduction' },
    { id: 2, name: 'Jeu', description: 'Interface du jeu' },
    { id: 3, name: 'Écran de fin', description: 'Page de remerciement' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-[#f9f0f5] border border-[#e9d0e5] rounded-lg p-4">
        <p className="text-[#841b60] text-sm">
          Personnalisez l'apparence et le contenu de chaque écran de votre campagne.
        </p>
      </div>

      {/* Design général */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Design général</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Couleur de fond
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={campaign.design.background}
                onChange={(e) => updateDesign('background', e.target.value)}
                className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={campaign.design.background}
                onChange={(e) => updateDesign('background', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                placeholder="#ebf4f7"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Couleur principale
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={campaign.design.primaryColor}
                onChange={(e) => updateDesign('primaryColor', e.target.value)}
                className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={campaign.design.primaryColor}
                onChange={(e) => updateDesign('primaryColor', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                placeholder="#841b60"
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <ImageUpload
            value={campaign.design.backgroundImage}
            onChange={(value) => updateDesign('backgroundImage', value)}
            label="Image de fond"
            className="w-full"
          />
          <p className="text-sm text-gray-500 mt-1">
            Cette image sera affichée en arrière-plan de toute la campagne.
          </p>
        </div>

        <div className="mt-6">
          <ImageUpload
            value={campaign.design.logoUrl}
            onChange={(value) => updateDesign('logoUrl', value)}
            label="Logo"
            className="w-full"
          />
          <p className="text-sm text-gray-500 mt-1">
            Logo qui apparaîtra sur les écrans de votre campagne.
          </p>
        </div>
      </div>

      {/* Navigation des écrans */}
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {screens.map((screen) => (
          <button
            key={screen.id}
            onClick={() => setActiveScreen(screen.id)}
            className={`flex-shrink-0 px-4 py-3 rounded-lg border text-left min-w-[200px] ${
              activeScreen === screen.id
                ? 'border-[#841b60] bg-[#f8f0f5] text-[#841b60]'
                : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
            }`}
          >
            <div className="font-medium">{screen.name}</div>
            <div className="text-sm opacity-75">{screen.description}</div>
          </button>
        ))}
      </div>

      {/* Configuration de l'écran actif */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Configuration - {screens.find(s => s.id === activeScreen)?.name}
          </h3>

          {activeScreen !== 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Titre
                </label>
                <input
                  type="text"
                  value={campaign.screens[activeScreen]?.title || ''}
                  onChange={(e) => updateScreen(activeScreen, 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                  placeholder="Titre de l'écran"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={campaign.screens[activeScreen]?.description || ''}
                  onChange={(e) => updateScreen(activeScreen, 'description', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                  placeholder="Description de l'écran"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Texte du bouton
                </label>
                <input
                  type="text"
                  value={campaign.screens[activeScreen]?.buttonText || ''}
                  onChange={(e) => updateScreen(activeScreen, 'buttonText', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                  placeholder="Texte du bouton"
                />
              </div>
            </div>
          )}

          {activeScreen === 2 && (
            <div className="text-center text-gray-500 py-8">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Eye className="w-6 h-6" />
              </div>
              <p className="font-medium">Configuration du jeu</p>
              <p className="text-sm">
                Le contenu de cet écran est géré dans l'onglet "Contenu"
              </p>
            </div>
          )}
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Aperçu</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setPreviewDevice('desktop')}
                className={`p-2 rounded ${previewDevice === 'desktop' ? 'bg-[#841b60] text-white' : 'bg-gray-100 text-gray-600'}`}
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPreviewDevice('tablet')}
                className={`p-2 rounded ${previewDevice === 'tablet' ? 'bg-[#841b60] text-white' : 'bg-gray-100 text-gray-600'}`}
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPreviewDevice('mobile')}
                className={`p-2 rounded ${previewDevice === 'mobile' ? 'bg-[#841b60] text-white' : 'bg-gray-100 text-gray-600'}`}
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <div 
              className={`${getDeviceClass()} border border-gray-300 rounded-lg overflow-hidden relative`}
              style={{
                backgroundColor: campaign.design.background,
                backgroundImage: campaign.design.backgroundImage ? `url(${campaign.design.backgroundImage})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-5" />
              <div className="relative z-10 h-full flex flex-col items-center justify-center p-6 text-center">
                {campaign.design.logoUrl && (
                  <img
                    src={campaign.design.logoUrl}
                    alt="Logo"
                    className="w-16 h-16 object-contain mb-4"
                  />
                )}
                
                {activeScreen !== 2 && (
                  <>
                    <h2 
                      className="text-xl font-bold mb-4"
                      style={{ color: campaign.design.titleColor }}
                    >
                      {campaign.screens[activeScreen]?.title || 'Titre de l\'écran'}
                    </h2>
                    <p 
                      className="text-gray-600 mb-6"
                      style={{ color: campaign.design.titleColor }}
                    >
                      {campaign.screens[activeScreen]?.description || 'Description de l\'écran'}
                    </p>
                    <button
                      className="px-6 py-3 rounded-lg font-medium"
                      style={{
                        backgroundColor: campaign.design.primaryColor,
                        color: 'white'
                      }}
                    >
                      {campaign.screens[activeScreen]?.buttonText || 'Bouton'}
                    </button>
                  </>
                )}

                {activeScreen === 2 && (
                  <div className="text-gray-500">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Eye className="w-8 h-8" />
                    </div>
                    <p>Interface du jeu</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignScreens;
