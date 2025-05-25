import React from 'react';

interface JackpotAppearanceProps {
  campaign: any;
  setCampaign: (value: any) => void;
}

const JackpotAppearance: React.FC<JackpotAppearanceProps> = ({ campaign, setCampaign }) => {
  const gameConfig = campaign.gameConfig?.[campaign.type] || {};

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

  return (
    <div className="space-y-6">
      {/* Image de fond */}
      <div>
        <label className="block font-medium mb-1">Image de fond du jeu</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleInputChange('backgroundImage', URL.createObjectURL(file));
          }}
        />
        {gameConfig.backgroundImage && (
          <img
            src={gameConfig.backgroundImage}
            alt="Background Preview"
            className="mt-2 max-w-full rounded border"
          />
        )}
      </div>

      {/* Modèle personnalisé du jackpot */}
      <div>
        <label className="block font-medium mb-1">Modèle personnalisé du jackpot (680x400)</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleInputChange('customTemplate', URL.createObjectURL(file));
          }}
        />
        {gameConfig.customTemplate && (
          <img
            src={gameConfig.customTemplate}
            alt="Jackpot Template Preview"
            className="mt-2 w-[340px] border rounded"
          />
        )}
      </div>

      {/* Texte du bouton */}
      <div>
        <label className="block font-medium mb-1">Texte du bouton</label>
        <input
          type="text"
          value={gameConfig.buttonLabel || ''}
          onChange={(e) => handleInputChange('buttonLabel', e.target.value)}
          className="border rounded px-3 py-2 w-full"
          placeholder="Ex: Lancer le Jackpot"
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
