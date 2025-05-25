import React, { useState } from 'react';
import GameCanvasPreview from './GameCanvasPreview';

interface CampaignEditorContentProps {
  campaign: any;
  setCampaign: (campaign: any) => void;
}

const CampaignEditorContent: React.FC<CampaignEditorContentProps> = ({ campaign, setCampaign }) => {
  const handleInputChange = (field: string, value: string) => {
    setCampaign((prev: any) => ({
      ...prev,
      gameConfig: {
        ...prev.gameConfig,
        [prev.type]: {
          ...prev.gameConfig?.[prev.type],
          [field]: value
        }
      }
    }));
  };

  const handleFileChange = (field: string, file: File | null) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setCampaign((prev: any) => ({
      ...prev,
      gameConfig: {
        ...prev.gameConfig,
        [prev.type]: {
          ...prev.gameConfig?.[prev.type],
          [field]: url
        }
      }
    }));
  };

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-xl font-bold">Aperçu du jeu</h2>
      <GameCanvasPreview campaign={campaign} className="mb-6" />

      <div className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Image de fond du jeu</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange('backgroundImage', e.target.files?.[0] || null)}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Modèle personnalisé du jackpot (680x400)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange('customTemplate', e.target.files?.[0] || null)}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Texte du bouton</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={campaign.gameConfig?.[campaign.type]?.buttonLabel || ''}
            onChange={(e) => handleInputChange('buttonLabel', e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Couleur du bouton</label>
          <input
            type="color"
            className="w-12 h-10 p-0 border-0"
            value={campaign.gameConfig?.[campaign.type]?.buttonColor || '#ec4899'}
            onChange={(e) => handleInputChange('buttonColor', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default CampaignEditorContent;
