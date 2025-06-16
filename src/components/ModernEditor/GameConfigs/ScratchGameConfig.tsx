
import React from 'react';
import { Cookie, Image, Settings } from 'lucide-react';

interface ScratchGameConfigProps {
  campaign: any;
  setCampaign: React.Dispatch<React.SetStateAction<any>>;
}

const ScratchGameConfig: React.FC<ScratchGameConfigProps> = ({
  campaign,
  setCampaign
}) => {
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

  return (
    <div className="space-y-6">
      {/* Zone à gratter */}
      <div className="space-y-3">
        <label className="flex items-center text-sm font-medium text-gray-700">
          <Cookie className="w-4 h-4 mr-2" />
          Zone à gratter ({campaign.gameConfig?.scratch?.scratchArea || 70}%)
        </label>
        <input
          type="range"
          min="50"
          max="90"
          value={campaign.gameConfig?.scratch?.scratchArea || 70}
          onChange={(e) => handleScratchChange('scratchArea', parseInt(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>50%</span>
          <span>90%</span>
        </div>
        <p className="text-xs text-gray-500">
          Pourcentage de la surface qui doit être grattée pour révéler le contenu
        </p>
      </div>

      {/* Message de révélation */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Message à révéler</label>
        <input
          type="text"
          value={campaign.gameConfig?.scratch?.revealMessage || 'Félicitations !'}
          onChange={(e) => handleScratchChange('revealMessage', e.target.value)}
          placeholder="Félicitations !"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
        />
      </div>

      {/* Image de fond à révéler */}
      <div className="space-y-2">
        <label className="flex items-center text-sm font-medium text-gray-700">
          <Image className="w-4 h-4 mr-2" />
          Image à révéler (optionnel)
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
              alt="Aperçu de l'image à révéler"
              className="w-full h-32 object-cover rounded border"
            />
            <button
              onClick={() => handleScratchChange('revealImage', '')}
              className="mt-1 text-xs text-red-600 hover:text-red-800"
            >
              Supprimer l'image
            </button>
          </div>
        )}
      </div>

      {/* Surface de grattage personnalisée */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Surface de grattage (optionnel)</label>
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
              alt="Aperçu de la surface"
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
          Image qui sera utilisée comme surface à gratter (par défaut: gris métallique)
        </p>
      </div>

      {/* Image de fond */}
      <div className="space-y-2">
        <label className="flex items-center text-sm font-medium text-gray-700">
          <Settings className="w-4 h-4 mr-2" />
          Image de fond de l'interface (optionnel)
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const url = URL.createObjectURL(file);
              handleScratchChange('backgroundImage', url);
            }
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
        />
        {campaign.gameConfig?.scratch?.backgroundImage && (
          <div className="mt-2">
            <img
              src={campaign.gameConfig.scratch.backgroundImage}
              alt="Aperçu du fond"
              className="w-full h-20 object-cover rounded border"
            />
            <button
              onClick={() => handleScratchChange('backgroundImage', '')}
              className="mt-1 text-xs text-red-600 hover:text-red-800"
            >
              Supprimer
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScratchGameConfig;
