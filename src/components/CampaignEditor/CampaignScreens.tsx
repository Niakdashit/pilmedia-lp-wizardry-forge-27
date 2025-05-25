
import React, { useState } from 'react';
import { Monitor } from 'lucide-react';

interface CampaignScreensProps {
  campaign: any;
  setCampaign: React.Dispatch<React.SetStateAction<any>>;
}

const CampaignScreens: React.FC<CampaignScreensProps> = ({ campaign, setCampaign }) => {
  const [activeScreen, setActiveScreen] = useState(1);

  const updateScreenContent = (screenNumber: number, field: string, value: any) => {
    setCampaign((prev: any) => ({
      ...prev,
      screens: {
        ...prev.screens,
        [screenNumber]: {
          ...prev.screens[screenNumber],
          [field]: value
        }
      }
    }));
  };

  const updateScreenVisibility = (screenNumber: number, field: string, value: boolean) => {
    setCampaign((prev: any) => ({
      ...prev,
      screens: {
        ...prev.screens,
        [screenNumber]: {
          ...prev.screens[screenNumber],
          [field]: value
        }
      }
    }));
  };

  const screens = [
    { id: 1, name: 'Écran d\'accueil', icon: Monitor },
    { id: 3, name: 'Écran de fin', icon: Monitor }
  ];

  const renderScreenConfig = (screenNumber: number) => {
    const screen = campaign.screens[screenNumber];
    
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-2 mb-4">
          <input
            type="checkbox"
            id={`show-title-${screenNumber}`}
            checked={screen?.showTitle || false}
            onChange={(e) => updateScreenVisibility(screenNumber, 'showTitle', e.target.checked)}
            className="w-4 h-4 text-[#841b60] border-gray-300 rounded focus:ring-[#841b60]"
          />
          <label htmlFor={`show-title-${screenNumber}`} className="text-sm font-medium text-gray-700">
            Afficher le titre
          </label>
        </div>

        {screen?.showTitle && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Titre
            </label>
            <input
              type="text"
              value={screen?.title || ''}
              onChange={(e) => updateScreenContent(screenNumber, 'title', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
              placeholder="Entrez le titre de l'écran"
            />
          </div>
        )}

        <div className="flex items-center space-x-2 mb-4">
          <input
            type="checkbox"
            id={`show-description-${screenNumber}`}
            checked={screen?.showDescription || false}
            onChange={(e) => updateScreenVisibility(screenNumber, 'showDescription', e.target.checked)}
            className="w-4 h-4 text-[#841b60] border-gray-300 rounded focus:ring-[#841b60]"
          />
          <label htmlFor={`show-description-${screenNumber}`} className="text-sm font-medium text-gray-700">
            Afficher la description
          </label>
        </div>

        {screen?.showDescription && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={screen?.description || ''}
              onChange={(e) => updateScreenContent(screenNumber, 'description', e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
              placeholder="Entrez la description de l'écran"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Texte du bouton
          </label>
          <input
            type="text"
            value={screen?.buttonText || ''}
            onChange={(e) => updateScreenContent(screenNumber, 'buttonText', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
            placeholder="Texte du bouton"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Lien du bouton (optionnel)
          </label>
          <input
            type="url"
            value={screen?.buttonLink || ''}
            onChange={(e) => updateScreenContent(screenNumber, 'buttonLink', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
            placeholder="https://..."
          />
        </div>

        {screenNumber === 3 && (
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="show-replay-button"
              checked={screen?.showReplayButton || false}
              onChange={(e) => updateScreenVisibility(screenNumber, 'showReplayButton', e.target.checked)}
              className="w-4 h-4 text-[#841b60] border-gray-300 rounded focus:ring-[#841b60]"
            />
            <label htmlFor="show-replay-button" className="text-sm font-medium text-gray-700">
              Afficher le bouton "Rejouer"
            </label>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#f9f0f5] border border-[#e9d0e5] rounded-lg p-4 mb-4">
        <p className="text-[#841b60] text-sm">
          Configurez le contenu et l'apparence de chaque écran de votre campagne.
          Personnalisez les titres, descriptions et boutons d'action.
        </p>
      </div>

      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {screens.map((screen) => (
            <button
              key={screen.id}
              onClick={() => setActiveScreen(screen.id)}
              className={`py-4 px-1 font-medium text-sm border-b-2 transition-colors duration-200 flex items-center space-x-2 ${
                activeScreen === screen.id
                  ? 'border-[#841b60] text-[#841b60]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <screen.icon className="w-4 h-4" />
              <span>{screen.name}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">
          Configuration de l'écran {activeScreen === 1 ? "d'accueil" : "de fin"}
        </h3>
        
        {renderScreenConfig(activeScreen)}
      </div>
    </div>
  );
};

export default CampaignScreens;
