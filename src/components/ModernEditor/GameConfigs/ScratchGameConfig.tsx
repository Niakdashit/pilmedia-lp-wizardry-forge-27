import React, { useState } from 'react';
import { Image, Percent, Type, Plus, Trash2 } from 'lucide-react';
import ColorPaletteSelector from './ColorPaletteSelector';

interface ScratchGameConfigProps {
  campaign: any;
  setCampaign: React.Dispatch<React.SetStateAction<any>>;
}

const ScratchGameConfig: React.FC<ScratchGameConfigProps> = ({
  campaign,
  setCampaign
}) => {
  const [selectedPalette, setSelectedPalette] = useState<any>(undefined);
  const MAX_CARDS = 6;

  const handleScratchChange = (field: string, value: any) => {
    setCampaign((prev: any) => ({
      ...prev,
      gameConfig: {
        ...prev.gameConfig,
        scratch: {
          ...prev.gameConfig?.scratch,
          [field]: value
        }
      }
    }));
  };

  const addCard = () => {
    const cards = campaign.gameConfig?.scratch?.cards || [];
    if (cards.length >= MAX_CARDS) return;
    const newCard = { id: Date.now(), revealImage: '', revealMessage: '' };
    handleScratchChange('cards', [...cards, newCard]);
  };

  const removeCard = (index: number) => {
    const cards = [...(campaign.gameConfig?.scratch?.cards || [])];
    cards.splice(index, 1);
    handleScratchChange('cards', cards);
  };

  const updateCard = (index: number, field: string, value: string) => {
    const cards = [...(campaign.gameConfig?.scratch?.cards || [])];
    cards[index] = { ...cards[index], [field]: value };
    handleScratchChange('cards', cards);
  };

  const handlePaletteSelect = (palette: any) => {
    setSelectedPalette(palette);
    
    setCampaign((prev: any) => ({
      ...prev,
      gameConfig: {
        ...prev.gameConfig,
        scratch: {
          ...prev.gameConfig?.scratch,
          scratchColor: palette.colors.background || palette.colors.primary,
          palette: palette
        }
      }
    }));
  };

  return (
    <div className="space-y-6">
      {/* Palette de couleurs */}
      <ColorPaletteSelector
        selectedPalette={selectedPalette}
        onPaletteSelect={handlePaletteSelect}
        gameType="scratch"
      />

      {/* Zone à gratter */}
      <div className="space-y-2">
        <label className="flex items-center text-sm font-medium text-gray-700">
          <Percent className="w-4 h-4 mr-2" />
          Pourcentage à gratter pour révéler
        </label>
        <input
          type="range"
          min="30"
          max="90"
          value={campaign.gameConfig?.scratch?.scratchArea || 70}
          onChange={(e) => handleScratchChange('scratchArea', parseInt(e.target.value))}
          className="w-full"
        />
        <div className="text-xs text-gray-500 text-center">
          {campaign.gameConfig?.scratch?.scratchArea || 70}%
        </div>
      </div>

      {/* Message de révélation */}
      <div className="space-y-2">
        <label className="flex items-center text-sm font-medium text-gray-700">
          <Type className="w-4 h-4 mr-2" />
          Message de révélation
        </label>
        <input
          type="text"
          value={campaign.gameConfig?.scratch?.revealMessage || 'Félicitations !'}
          onChange={(e) => handleScratchChange('revealMessage', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
          placeholder="Message affiché en cas de victoire"
        />
      </div>

      {/* Image de révélation */}
      <div className="space-y-2">
        <label className="flex items-center text-sm font-medium text-gray-700">
          <Image className="w-4 h-4 mr-2" />
          Image de révélation (optionnel)
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const url = URL.createObjectURL(file);
              handleScratchChange('revealImage', url);
            }
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
        />
        {campaign.gameConfig?.scratch?.revealImage && (
          <div className="mt-2">
            <img
              src={campaign.gameConfig.scratch.revealImage}
              alt="Aperçu"
              className="w-full h-20 object-cover rounded border"
            />
            <button
              onClick={() => handleScratchChange('revealImage', '')}
              className="mt-1 text-xs text-red-600 hover:text-red-800"
            >
              Supprimer
            </button>
          </div>
        )}
      </div>

      {/* Surface à gratter personnalisée */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Surface à gratter personnalisée</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const url = URL.createObjectURL(file);
              handleScratchChange('scratchSurface', url);
            }
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
        />
        {campaign.gameConfig?.scratch?.scratchSurface && (
          <div className="mt-2">
            <img
              src={campaign.gameConfig.scratch.scratchSurface}
              alt="Surface à gratter"
              className="w-full h-20 object-cover rounded border"
            />
            <button
              onClick={() => handleScratchChange('scratchSurface', '')}
              className="mt-1 text-xs text-red-600 hover:text-red-800"
            >
              Supprimer
            </button>
          </div>
        )}
        <p className="text-xs text-gray-500">
          Image qui sera utilisée comme surface à gratter (par défaut: couleur métallique)
        </p>
      </div>

      {/* Cartes */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">
            Cartes ({(campaign.gameConfig?.scratch?.cards || []).length})
          </label>
          {(campaign.gameConfig?.scratch?.cards || []).length < MAX_CARDS && (
            <button
              type="button"
              onClick={addCard}
              className="text-sm text-[#841b60] hover:text-[#6d164f] flex items-center"
            >
              <Plus className="w-4 h-4 mr-1" /> Ajouter une carte
            </button>
          )}
        </div>

        {(campaign.gameConfig?.scratch?.cards || []).map((card: any, index: number) => (
          <div key={card.id} className="border border-gray-200 rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-start">
              <h4 className="text-sm font-medium text-gray-700">Carte {index + 1}</h4>
              <button onClick={() => removeCard(index)} className="p-1 text-red-500 hover:bg-red-50 rounded">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Message</label>
              <input
                type="text"
                value={card.revealMessage}
                onChange={(e) => updateCard(index, 'revealMessage', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const url = URL.createObjectURL(file);
                    updateCard(index, 'revealImage', url);
                  }
                }}
                className="w-full"
              />
              {card.revealImage && (
                <img src={card.revealImage} alt="Aperçu" className="w-full h-20 object-cover rounded border" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScratchGameConfig;
