
import React from 'react';
import { Dices, Settings, Palette } from 'lucide-react';

interface JackpotGameConfigProps {
  campaign: any;
  setCampaign: React.Dispatch<React.SetStateAction<any>>;
}

const JackpotGameConfig: React.FC<JackpotGameConfigProps> = ({
  campaign,
  setCampaign
}) => {
  const gameConfig = campaign.gameConfig?.jackpot || {};

  const handleConfigChange = (key: string, value: any) => {
    setCampaign((prev: any) => ({
      ...prev,
      gameConfig: {
        ...prev.gameConfig,
        jackpot: {
          ...prev.gameConfig?.jackpot,
          [key]: value
        }
      }
    }));
  };

  const handleJackpotColorChange = (field: string, value: string | number) => {
    setCampaign((prev: any) => ({
      ...prev,
      gameConfig: {
        ...prev.gameConfig,
        jackpot: {
          ...prev.gameConfig?.jackpot,
          [field]: value
        }
      }
    }));
  };

  const handleFileUpload = (key: string, file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      handleConfigChange(key, reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Dices className="w-5 h-5 mr-2" />
          Configuration du Jackpot
        </h3>
      </div>

      {/* Paramètres de base */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Texte du bouton
          </label>
          <input
            type="text"
            value={gameConfig.buttonLabel || 'Lancer le Jackpot'}
            onChange={(e) => handleConfigChange('buttonLabel', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image de fond du jeu
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileUpload('backgroundImage', file);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
          />
          {gameConfig.backgroundImage && (
            <div className="mt-2">
              <img
                src={gameConfig.backgroundImage}
                alt="Aperçu image de fond"
                className="w-32 h-20 object-cover border rounded"
              />
            </div>
          )}
        </div>
      </div>

      {/* Personnalisation des couleurs du Jackpot */}
      <div className="border-t pt-6">
        <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center">
          <Palette className="w-4 h-4 mr-2" />
          Couleurs du Jackpot
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Arrière-plan du conteneur */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Arrière-plan du conteneur
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={gameConfig.containerBackgroundColor || '#1f2937'}
                onChange={(e) => handleJackpotColorChange('containerBackgroundColor', e.target.value)}
                className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={gameConfig.containerBackgroundColor || '#1f2937'}
                onChange={(e) => handleJackpotColorChange('containerBackgroundColor', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent text-sm"
              />
            </div>
          </div>

          {/* Arrière-plan interne */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Arrière-plan interne
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={gameConfig.backgroundColor || '#c4b5fd30'}
                onChange={(e) => handleJackpotColorChange('backgroundColor', e.target.value)}
                className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={gameConfig.backgroundColor || '#c4b5fd30'}
                onChange={(e) => handleJackpotColorChange('backgroundColor', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent text-sm"
              />
            </div>
          </div>

          {/* Bordure principale */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Bordure principale
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={gameConfig.borderColor || '#8b5cf6'}
                onChange={(e) => handleJackpotColorChange('borderColor', e.target.value)}
                className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={gameConfig.borderColor || '#8b5cf6'}
                onChange={(e) => handleJackpotColorChange('borderColor', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent text-sm"
              />
            </div>
          </div>

          {/* Épaisseur bordure principale */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Épaisseur bordure principale ({gameConfig.borderWidth || 3}px)
            </label>
            <input
              type="range"
              min="0"
              max="10"
              value={gameConfig.borderWidth || 3}
              onChange={(e) => handleJackpotColorChange('borderWidth', parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Bordure des slots */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Bordure des slots
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={gameConfig.slotBorderColor || '#a78bfa'}
                onChange={(e) => handleJackpotColorChange('slotBorderColor', e.target.value)}
                className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={gameConfig.slotBorderColor || '#a78bfa'}
                onChange={(e) => handleJackpotColorChange('slotBorderColor', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent text-sm"
              />
            </div>
          </div>

          {/* Épaisseur bordure slots */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Épaisseur bordure slots ({gameConfig.slotBorderWidth || 2}px)
            </label>
            <input
              type="range"
              min="0"
              max="6"
              value={gameConfig.slotBorderWidth || 2}
              onChange={(e) => handleJackpotColorChange('slotBorderWidth', parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Arrière-plan des slots */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Arrière-plan des slots
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={gameConfig.slotBackgroundColor || '#ffffff'}
                onChange={(e) => handleJackpotColorChange('slotBackgroundColor', e.target.value)}
                className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={gameConfig.slotBackgroundColor || '#ffffff'}
                onChange={(e) => handleJackpotColorChange('slotBackgroundColor', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Paramètres de probabilité */}
      <div className="border-t pt-6">
        <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center">
          <Settings className="w-4 h-4 mr-2" />
          Paramètres de jeu
        </h4>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Probabilité de gain ({((gameConfig.instantWin?.winProbability || 0.1) * 100).toFixed(1)}%)
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={gameConfig.instantWin?.winProbability || 0.1}
              onChange={(e) => handleConfigChange('instantWin', {
                ...gameConfig.instantWin,
                winProbability: parseFloat(e.target.value)
              })}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre maximum de gagnants
            </label>
            <input
              type="number"
              min="1"
              value={gameConfig.instantWin?.maxWinners || 10}
              onChange={(e) => handleConfigChange('instantWin', {
                ...gameConfig.instantWin,
                maxWinners: parseInt(e.target.value)
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JackpotGameConfig;
