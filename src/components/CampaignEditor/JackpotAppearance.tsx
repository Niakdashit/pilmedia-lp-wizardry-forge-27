
import React from 'react';
import ImageUpload from '../common/ImageUpload';

interface JackpotAppearanceProps {
  campaign: any;
  setCampaign: React.Dispatch<React.SetStateAction<any>>;
}

const JackpotAppearance: React.FC<JackpotAppearanceProps> = ({
  campaign,
  setCampaign
}) => {
  const gameConfig = campaign.gameConfig?.[campaign.type] || {};

  const updateGameConfig = (key: string, value: any) => {
    setCampaign((prev: any) => ({
      ...prev,
      gameConfig: {
        ...prev.gameConfig,
        [campaign.type]: {
          ...prev.gameConfig?.[campaign.type],
          [key]: value
        }
      }
    }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#f9f0f5] border border-[#e9d0e5] rounded-lg p-4">
        <p className="text-[#841b60] text-sm">
          Personnalisez l'apparence de votre jeu Jackpot avec vos propres visuels.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Image de fond du jeu */}
        <ImageUpload
          label="Image de fond du jeu"
          value={gameConfig.backgroundImage || ''}
          onChange={(value) => updateGameConfig('backgroundImage', value)}
          className="w-full"
        />

        {/* Modèle personnalisé du jackpot */}
        <ImageUpload
          label="Modèle de jackpot (optionnel)"
          value={gameConfig.customTemplate || ''}
          onChange={(value) => updateGameConfig('customTemplate', value)}
          className="w-full"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Texte du bouton */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Texte du bouton
          </label>
          <input
            type="text"
            value={gameConfig.buttonLabel || 'Lancer le Jackpot'}
            onChange={(e) => updateGameConfig('buttonLabel', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
            placeholder="Lancer le Jackpot"
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
              onChange={(e) => updateGameConfig('buttonColor', e.target.value)}
              className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={gameConfig.buttonColor || '#ec4899'}
              onChange={(e) => updateGameConfig('buttonColor', e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
              placeholder="#ec4899"
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Recommandations :</h4>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>• Le modèle de jackpot doit idéalement être de 680x400px</li>
          <li>• L'image servira de décor autour des rouleaux de jeu</li>
          <li>• Laissez de l'espace au centre pour les rouleaux et le bouton</li>
        </ul>
      </div>
    </div>
  );
};

export default JackpotAppearance;
