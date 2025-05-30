
import React from 'react';

interface JackpotAppearanceProps {
  campaign: any;
  setCampaign: (campaign: any) => void;
}

const JackpotAppearance: React.FC<JackpotAppearanceProps> = ({ campaign, setCampaign }) => {
  const gameConfig = campaign.gameConfig?.[campaign.type] || {};

  const handleInputChange = (key: string, value: string) => {
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

  const handleFileUpload = (key: string, file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      handleInputChange(key, reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Fonction pour normaliser l'URL de l'image
  const getImageUrl = (imageData: any) => {
    if (!imageData) return null;
    if (typeof imageData === 'string') return imageData;
    if (imageData.value && imageData.value !== 'undefined') return imageData.value;
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Image de fond du jeu */}
      <div>
        <label className="block font-medium mb-1">Image de fond du jeu</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              handleFileUpload('backgroundImage', file);
            }
          }}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[#841b60] file:text-white hover:file:bg-[#6d164f]"
        />
        {getImageUrl(gameConfig.backgroundImage) && (
          <div className="mt-2">
            <img
              src={getImageUrl(gameConfig.backgroundImage)}
              alt="Aperçu image de fond"
              className="w-[170px] h-[100px] object-cover border rounded"
            />
          </div>
        )}
      </div>

      {/* Modèle personnalisé du jackpot (680x400) */}
      <div>
        <label className="block font-medium mb-1">Modèle personnalisé du jackpot (680x400)</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              handleFileUpload('customTemplate', file);
            }
          }}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[#841b60] file:text-white hover:file:bg-[#6d164f]"
        />
        {getImageUrl(gameConfig.customTemplate) && (
          <div className="mt-2">
            <img
              src={getImageUrl(gameConfig.customTemplate)}
              alt="Aperçu template jackpot"
              className="w-[170px] h-[100px] object-cover border rounded"
            />
          </div>
        )}
      </div>

      {/* Tailles prédéfinies pour le jeu */}
      <div>
        <label className="block font-medium mb-2">Taille du jeu</label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Petit', size: { width: 300, height: 300 } },
            { label: 'Moyen', size: { width: 400, height: 400 } },
            { label: 'Grand', size: { width: 500, height: 500 } }
          ].map((preset) => (
            <button
              key={preset.label}
              onClick={() => handleInputChange('gameSize', JSON.stringify(preset.size))}
              className="p-2 border border-gray-300 rounded-lg hover:border-[#841b60] hover:bg-[#f9f0f5] transition-colors text-sm"
            >
              {preset.label}
              <div className="text-xs text-gray-500">{preset.size.width}×{preset.size.height}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Texte du bouton */}
      <div>
        <label className="block font-medium mb-1">Texte du bouton</label>
        <input
          type="text"
          value={gameConfig.buttonLabel || ''}
          onChange={(e) => handleInputChange('buttonLabel', e.target.value)}
          className="border rounded px-3 py-2 w-full"
          placeholder="Lancer le Jackpot"
        />
      </div>

      {/* Couleur du bouton */}
      <div>
        <label className="block font-medium mb-1">Couleur du bouton</label>
        <input
          type="color"
          value={gameConfig.buttonColor || '#ec4899'}
          onChange={(e) => handleInputChange('buttonColor', e.target.value)}
          className="h-10 w-20 p-0 border rounded"
        />
      </div>
    </div>
  );
};

export default JackpotAppearance;
