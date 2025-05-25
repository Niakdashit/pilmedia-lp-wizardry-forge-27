import React, { useState } from 'react';
import { Save } from 'lucide-react';

interface CampaignScreensProps {
  campaign: any;
  setCampaign: React.Dispatch<React.SetStateAction<any>>;
}

const CampaignScreens: React.FC<CampaignScreensProps> = ({ campaign, setCampaign }) => {
  const [activeScreen, setActiveScreen] = useState(1);

  const updateScreen = (screenNumber: number, field: string, value: any) => {
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

  const updateScreenToggle = (screenNumber: number, field: string) => {
    setCampaign((prev: any) => ({
      ...prev,
      screens: {
        ...prev.screens,
        [screenNumber]: {
          ...prev.screens[screenNumber],
          [field]: !prev.screens[screenNumber]?.[field]
        }
      }
    }));
  };

  const handleSaveScreen = () => {
    setCampaign((prev: any) => ({ ...prev }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#f9f0f5] border border-[#e9d0e5] rounded-lg p-4 mb-4">
        <p className="text-[#841b60] text-sm">
          Personnalisez les écrans de votre campagne. Ajoutez des titres, des descriptions et des images pour engager votre audience.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Écran à configurer
        </label>
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveScreen(1)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              activeScreen === 1
                ? 'bg-[#841b60] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Écran d'accueil
          </button>
          <button
            onClick={() => setActiveScreen(2)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              activeScreen === 2
                ? 'bg-[#841b60] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Écran de jeu
          </button>
          <button
            onClick={() => setActiveScreen(3)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              activeScreen === 3
                ? 'bg-[#841b60] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Écran de fin
          </button>
        </div>
      </div>

      {/* Configuration de l'écran d'accueil */}
      {activeScreen === 1 && (
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Titre de l'écran d'accueil
            </label>
            <input
              type="text"
              id="title"
              value={campaign.screens[1].title}
              onChange={(e) => updateScreen(1, 'title', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
              placeholder="Bienvenue !"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description de l'écran d'accueil
            </label>
            <textarea
              id="description"
              value={campaign.screens[1].description}
              onChange={(e) => updateScreen(1, 'description', e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
              placeholder="Participez à notre jeu et tentez de gagner !"
            />
          </div>

          <div>
            <label htmlFor="buttonText" className="block text-sm font-medium text-gray-700 mb-1">
              Texte du bouton
            </label>
            <input
              type="text"
              id="buttonText"
              value={campaign.screens[1].buttonText}
              onChange={(e) => updateScreen(1, 'buttonText', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
              placeholder="Participer"
            />
          </div>

          <div>
            <label htmlFor="buttonLink" className="block text-sm font-medium text-gray-700 mb-1">
              Lien du bouton
            </label>
            <input
              type="text"
              id="buttonLink"
              value={campaign.screens[1].buttonLink}
              onChange={(e) => updateScreen(1, 'buttonLink', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
              placeholder="https://www.example.com"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="inline-flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={campaign.screens[1].showTitle}
                  onChange={() => updateScreenToggle(1, 'showTitle')}
                  className="h-5 w-5 text-[#841b60] rounded focus:ring-0 focus:ring-offset-0"
                />
                <span className="text-gray-700 text-sm font-medium">Afficher le titre</span>
              </label>
            </div>

            <div>
              <label className="inline-flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={campaign.screens[1].showDescription}
                  onChange={() => updateScreenToggle(1, 'showDescription')}
                  className="h-5 w-5 text-[#841b60] rounded focus:ring-0 focus:ring-offset-0"
                />
                <span className="text-gray-700 text-sm font-medium">Afficher la description</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Configuration de l'écran de jeu */}
      {activeScreen === 2 && (
        <div className="space-y-4">
          <p className="text-gray-500 text-sm">
            L'écran de jeu est configuré en fonction du type de campagne que vous avez sélectionné.
          </p>
        </div>
      )}

      {/* Configuration de l'écran de fin */}
      {activeScreen === 3 && (
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Titre de l'écran de fin
            </label>
            <input
              type="text"
              id="title"
              value={campaign.screens[3].title}
              onChange={(e) => updateScreen(3, 'title', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
              placeholder="Félicitations !"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description de l'écran de fin
            </label>
            <textarea
              id="description"
              value={campaign.screens[3].description}
              onChange={(e) => updateScreen(3, 'description', e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
              placeholder="Merci pour votre participation !"
            />
          </div>

          <div>
            <label htmlFor="buttonText" className="block text-sm font-medium text-gray-700 mb-1">
              Texte du bouton
            </label>
            <input
              type="text"
              id="buttonText"
              value={campaign.screens[3].buttonText}
              onChange={(e) => updateScreen(3, 'buttonText', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
              placeholder="Rejouer"
            />
          </div>

          <div>
            <label htmlFor="buttonLink" className="block text-sm font-medium text-gray-700 mb-1">
              Lien du bouton
            </label>
            <input
              type="text"
              id="buttonLink"
              value={campaign.screens[3].buttonLink}
              onChange={(e) => updateScreen(3, 'buttonLink', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
              placeholder="https://www.example.com"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="inline-flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={campaign.screens[3].showTitle}
                  onChange={() => updateScreenToggle(3, 'showTitle')}
                  className="h-5 w-5 text-[#841b60] rounded focus:ring-0 focus:ring-offset-0"
                />
                <span className="text-gray-700 text-sm font-medium">Afficher le titre</span>
              </label>
            </div>

            <div>
              <label className="inline-flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={campaign.screens[3].showDescription}
                  onChange={() => updateScreenToggle(3, 'showDescription')}
                  className="h-5 w-5 text-[#841b60] rounded focus:ring-0 focus:ring-offset-0"
                />
                <span className="text-gray-700 text-sm font-medium">Afficher la description</span>
              </label>
            </div>

            <div>
              <label className="inline-flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={campaign.screens[3].showReplayButton}
                  onChange={() => updateScreenToggle(3, 'showReplayButton')}
                  className="h-5 w-5 text-[#841b60] rounded focus:ring-0 focus:ring-offset-0"
                />
                <span className="text-gray-700 text-sm font-medium">Afficher le bouton Rejouer</span>
              </label>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={handleSaveScreen}
        className="inline-flex items-center px-4 py-2 bg-[#841b60] text-white text-sm font-medium rounded-lg hover:bg-[#6d164f] transition-colors duration-200"
      >
        <Save className="w-4 h-4 mr-2" />
        Enregistrer les écrans
      </button>
    </div>
  );
};

export default CampaignScreens;
