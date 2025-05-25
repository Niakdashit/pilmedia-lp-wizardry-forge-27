
import React from 'react';
import GameCanvasPreview from '../CampaignEditor/GameCanvasPreview';

interface JackpotAppearanceProps {
  campaign: any;
  setCampaign: (value: any) => void;
}

const JackpotAppearance: React.FC<JackpotAppearanceProps> = ({ campaign, setCampaign }) => {
  const handleInputChange = (key: string, value: string) => {
    const updatedCampaign = {
      ...campaign,
      gameConfig: {
        ...campaign.gameConfig,
        [campaign.type]: {
          ...campaign.gameConfig?.[campaign.type],
          [key]: value
        }
      }
    };
    setCampaign(updatedCampaign);
  };

  const gameConfig = campaign.gameConfig?.[campaign.type] || {};

  return (
    <div className="space-y-6">
      <div className="bg-[#f9f0f5] border border-[#e9d0e5] rounded-lg p-4">
        <p className="text-[#841b60] text-sm">
          Personnalisez l'apparence de votre jeu Jackpot avec vos propres visuels et boutons.
        </p>
      </div>

      {/* Aperçu du jeu avec configurateur intégré */}
      <GameCanvasPreview 
        campaign={campaign} 
        handleInputChange={handleInputChange}
      />

      {/* Configurateur d'apparence */}
      <div className="space-y-4 bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Configuration de l'apparence</h3>
        
        {/* Modèle personnalisé du jackpot */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Modèle personnalisé du jackpot (680x400)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  handleInputChange('customTemplate', reader.result as string);
                };
                reader.readAsDataURL(file);
              }
            }}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[#841b60] file:text-white hover:file:bg-[#6d164f]"
          />
          {gameConfig.customTemplate && (
            <div className="mt-2">
              <img
                src={gameConfig.customTemplate}
                alt="Jackpot Template Preview"
                className="w-[170px] h-[100px] object-cover border rounded"
              />
            </div>
          )}
        </div>

        {/* Texte du bouton */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Texte du bouton
          </label>
          <input
            type="text"
            value={gameConfig.buttonLabel || 'Lancer le Jackpot'}
            onChange={(e) => handleInputChange('buttonLabel', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
            placeholder="Ex: Lancer le Jackpot"
          />
        </div>

        {/* Couleur du bouton */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Couleur du bouton
          </label>
          <div className="flex items-center space-x-3">
            <input
              type="color"
              value={gameConfig.buttonColor || '#ec4899'}
              onChange={(e) => handleInputChange('buttonColor', e.target.value)}
              className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={gameConfig.buttonColor || '#ec4899'}
              onChange={(e) => handleInputChange('buttonColor', e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
              placeholder="#ec4899"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JackpotAppearance;
