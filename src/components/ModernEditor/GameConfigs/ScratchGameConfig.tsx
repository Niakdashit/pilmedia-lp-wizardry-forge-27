
import React from 'react';
import { Cookie, Image, Settings, Type } from 'lucide-react';

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

  const handleButtonChange = (field: string, value: any) => {
    setCampaign((prev: any) => ({
      ...prev,
      buttonConfig: {
        ...prev.buttonConfig,
        [field]: value
      },
      gameConfig: {
        ...prev.gameConfig,
        scratch: {
          ...prev.gameConfig?.scratch,
          buttonLabel: field === 'text' ? value : prev.gameConfig?.scratch?.buttonLabel,
          buttonColor: field === 'color' ? value : prev.gameConfig?.scratch?.buttonColor
        }
      }
    }));
  };

  return (
    <div className="space-y-6">
      {/* Configuration du bouton */}
      <div className="bg-gray-50 p-4 rounded-lg space-y-4">
        <h4 className="font-medium text-gray-900 flex items-center">
          <Type className="w-4 h-4 mr-2" />
          Configuration du bouton
        </h4>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Texte du bouton
            </label>
            <input
              type="text"
              value={campaign.buttonConfig?.text || campaign.gameConfig?.scratch?.buttonLabel || 'Gratter'}
              onChange={(e) => handleButtonChange('text', e.target.value)}
              placeholder="Gratter"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Couleur du bouton
            </label>
            <input
              type="color"
              value={campaign.buttonConfig?.color || campaign.gameConfig?.scratch?.buttonColor || '#841b60'}
              onChange={(e) => handleButtonChange('color', e.target.value)}
              className="w-full h-10 p-1 border border-gray-300 rounded-lg cursor-pointer"
            />
          </div>
        </div>
      </div>

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
          className="w-full accent-[#841b60]"
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

      {/* Image à révéler */}
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

      {/* Image de fond du jeu */}
      <div className="space-y-2">
        <label className="flex items-center text-sm font-medium text-gray-700">
          <Settings className="w-4 h-4 mr-2" />
          Image de fond du jeu (optionnel)
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

      {/* Configuration instant win */}
      <div className="bg-blue-50 p-4 rounded-lg space-y-3">
        <h4 className="font-medium text-blue-900">Configuration des gains</h4>
        
        <div>
          <label className="block text-sm font-medium text-blue-700 mb-1">
            Probabilité de gain (%)
          </label>
          <input
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={(campaign.gameConfig?.scratch?.instantWin?.winProbability || 0.1) * 100}
            onChange={(e) => handleScratchChange('instantWin', {
              ...campaign.gameConfig?.scratch?.instantWin,
              winProbability: parseFloat(e.target.value) / 100
            })}
            className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-blue-700 mb-1">
            Nombre maximum de gagnants
          </label>
          <input
            type="number"
            min="0"
            value={campaign.gameConfig?.scratch?.instantWin?.maxWinners || 10}
            onChange={(e) => handleScratchChange('instantWin', {
              ...campaign.gameConfig?.scratch?.instantWin,
              maxWinners: parseInt(e.target.value)
            })}
            className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default ScratchGameConfig;
