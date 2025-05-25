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
              const reader = new FileReader();
              reader.onload = () => {
                handleInputChange('backgroundImage', reader.result as string);
              };
              reader.readAsDataURL(file);
            }
          }}
        />
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
              const reader = new FileReader();
              reader.onload = () => {
                handleInputChange('customTemplate', reader.result as string);
              };
              reader.readAsDataURL(file);
            }
          }}
        />
      </div>

      {/* Texte du bouton */}
      <div>
        <label className="block font-medium mb-1">Texte du bouton</label>
        <input
          type="text"
          value={gameConfig.buttonLabel || ''}
          onChange={(e) => handleInputChange('buttonLabel', e.target.value)}
          className="border rounded px-3 py-2 w-full"
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
