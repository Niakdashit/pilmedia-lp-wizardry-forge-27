import React from 'react';

interface JackpotAppearanceEditorProps {
  campaign: any;
  setCampaign: (data: any) => void;
}

const JackpotAppearanceEditor: React.FC<JackpotAppearanceEditorProps> = ({ campaign, setCampaign }) => {
  const type = campaign.type;
  const gameConfig = campaign.gameConfig?.[type] || {};

  const handleInputChange = (field: string, value: any) => {
    setCampaign({
      ...campaign,
      gameConfig: {
        ...campaign.gameConfig,
        [type]: {
          ...gameConfig,
          [field]: value,
        },
      },
    });
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

export default JackpotAppearanceEditor;
