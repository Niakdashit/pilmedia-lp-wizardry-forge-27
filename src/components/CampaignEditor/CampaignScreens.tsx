
import React, { useState } from 'react';
import { Save, Monitor, Play, Flag } from 'lucide-react';

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

  const screens = [
    { id: 1, title: 'Écran d\'accueil', icon: Monitor, description: 'Premier contact avec vos utilisateurs' },
    { id: 2, title: 'Écran de jeu', icon: Play, description: 'Configuration automatique selon le type de jeu' },
    { id: 3, title: 'Écran de fin', icon: Flag, description: 'Message de fin et actions utilisateur' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-[#f9f0f5] border border-[#e9d0e5] rounded-lg p-4">
        <p className="text-[#841b60] text-sm">
          Personnalisez les écrans de votre campagne pour créer une expérience engageante de bout en bout.
        </p>
      </div>

      {/* Navigation des écrans avec style amélioré */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {screens.map((screen) => (
          <button
            key={screen.id}
            onClick={() => setActiveScreen(screen.id)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
              activeScreen === screen.id
                ? 'border-[#841b60] bg-[#f8f0f5] shadow-md'
                : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
            }`}
          >
            <div className="flex items-center space-x-3 mb-2">
              <screen.icon className={`w-5 h-5 ${
                activeScreen === screen.id ? 'text-[#841b60]' : 'text-gray-500'
              }`} />
              <h3 className={`font-medium ${
                activeScreen === screen.id ? 'text-[#841b60]' : 'text-gray-900'
              }`}>
                {screen.title}
              </h3>
            </div>
            <p className="text-sm text-gray-600">
              {screen.description}
            </p>
          </button>
        ))}
      </div>

      {/* Configuration de l'écran d'accueil */}
      {activeScreen === 1 && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Monitor className="w-5 h-5 text-[#841b60]" />
            <h2 className="text-xl font-semibold text-gray-900">Configuration de l'écran d'accueil</h2>
          </div>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Titre principal
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
                <label htmlFor="buttonText" className="block text-sm font-medium text-gray-700 mb-2">
                  Texte du bouton d'action
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
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description d'accueil
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
              <label htmlFor="buttonLink" className="block text-sm font-medium text-gray-700 mb-2">
                Lien du bouton (optionnel)
              </label>
              <input
                type="url"
                id="buttonLink"
                value={campaign.screens[1].buttonLink}
                onChange={(e) => updateScreen(1, 'buttonLink', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                placeholder="https://www.example.com"
              />
            </div>

            <div className="border-t pt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Options d'affichage</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="inline-flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={campaign.screens[1].showTitle}
                    onChange={() => updateScreenToggle(1, 'showTitle')}
                    className="h-5 w-5 text-[#841b60] rounded focus:ring-0 focus:ring-offset-0"
                  />
                  <span className="text-gray-700 text-sm">Afficher le titre</span>
                </label>

                <label className="inline-flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={campaign.screens[1].showDescription}
                    onChange={() => updateScreenToggle(1, 'showDescription')}
                    className="h-5 w-5 text-[#841b60] rounded focus:ring-0 focus:ring-offset-0"
                  />
                  <span className="text-gray-700 text-sm">Afficher la description</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Configuration de l'écran de jeu */}
      {activeScreen === 2 && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Play className="w-5 h-5 text-[#841b60]" />
            <h2 className="text-xl font-semibold text-gray-900">Configuration de l'écran de jeu</h2>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800 text-sm">
              L'écran de jeu est automatiquement configuré en fonction du type de campagne que vous avez sélectionné ({campaign.type}). 
              Vous pouvez personnaliser les paramètres du jeu dans l'onglet "Contenu".
            </p>
          </div>
        </div>
      )}

      {/* Configuration de l'écran de fin */}
      {activeScreen === 3 && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Flag className="w-5 h-5 text-[#841b60]" />
            <h2 className="text-xl font-semibold text-gray-900">Configuration de l'écran de fin</h2>
          </div>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Titre de fin
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
                <label htmlFor="buttonText" className="block text-sm font-medium text-gray-700 mb-2">
                  Texte du bouton d'action
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
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Message de fin
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
              <label htmlFor="buttonLink" className="block text-sm font-medium text-gray-700 mb-2">
                Lien du bouton (optionnel)
              </label>
              <input
                type="url"
                id="buttonLink"
                value={campaign.screens[3].buttonLink}
                onChange={(e) => updateScreen(3, 'buttonLink', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                placeholder="https://www.example.com"
              />
            </div>

            <div className="border-t pt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Options d'affichage</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className="inline-flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={campaign.screens[3].showTitle}
                    onChange={() => updateScreenToggle(3, 'showTitle')}
                    className="h-5 w-5 text-[#841b60] rounded focus:ring-0 focus:ring-offset-0"
                  />
                  <span className="text-gray-700 text-sm">Afficher le titre</span>
                </label>

                <label className="inline-flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={campaign.screens[3].showDescription}
                    onChange={() => updateScreenToggle(3, 'showDescription')}
                    className="h-5 w-5 text-[#841b60] rounded focus:ring-0 focus:ring-offset-0"
                  />
                  <span className="text-gray-700 text-sm">Afficher la description</span>
                </label>

                <label className="inline-flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={campaign.screens[3].showReplayButton}
                    onChange={() => updateScreenToggle(3, 'showReplayButton')}
                    className="h-5 w-5 text-[#841b60] rounded focus:ring-0 focus:ring-offset-0"
                  />
                  <span className="text-gray-700 text-sm">Bouton Rejouer</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end pt-4 border-t">
        <button
          onClick={() => setCampaign((prev: any) => ({ ...prev }))}
          className="inline-flex items-center px-6 py-2 bg-[#841b60] text-white text-sm font-medium rounded-lg hover:bg-[#6d164f] transition-colors duration-200"
        >
          <Save className="w-4 h-4 mr-2" />
          Enregistrer les modifications
        </button>
      </div>
    </div>
  );
};

export default CampaignScreens;
