
import React from 'react';
import { Image, Settings } from 'lucide-react';

interface ScratchContentEditorProps {
  campaign: any;
  setCampaign: React.Dispatch<React.SetStateAction<any>>;
}

const ScratchContentEditor: React.FC<ScratchContentEditorProps> = ({ campaign, setCampaign }) => {
  const config = campaign.gameConfig?.scratch || {};

  const handleConfigChange = (field: string, value: any) => {
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
      <div className="grid grid-cols-2 gap-6">
        {/* Images */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Image className="w-5 h-5 mr-2" />
            Images
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image de fond (résultat)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      handleConfigChange('backgroundImage', reader.result);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
              {config.backgroundImage && (
                <img
                  src={config.backgroundImage}
                  alt="Image de fond"
                  className="mt-2 w-32 h-24 object-cover rounded border"
                />
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image à gratter
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      handleConfigChange('scratchImage', reader.result);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
              {config.scratchImage && (
                <img
                  src={config.scratchImage}
                  alt="Image à gratter"
                  className="mt-2 w-32 h-24 object-cover rounded border"
                />
              )}
            </div>
          </div>
        </div>

        {/* Configuration */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Settings className="w-5 h-5 mr-2" />
            Paramètres
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Taille du pinceau
              </label>
              <input
                type="range"
                min="10"
                max="50"
                value={config.brushSize || 20}
                onChange={(e) => handleConfigChange('brushSize', parseInt(e.target.value))}
                className="w-full"
              />
              <div className="text-sm text-gray-500 text-center">
                {config.brushSize || 20}px
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pourcentage de découverte pour révéler
              </label>
              <input
                type="range"
                min="20"
                max="80"
                value={config.revealPercentage || 50}
                onChange={(e) => handleConfigChange('revealPercentage', parseInt(e.target.value))}
                className="w-full"
              />
              <div className="text-sm text-gray-500 text-center">
                {config.revealPercentage || 50}%
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Probabilité de gain (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={config.winProbability || 10}
                onChange={(e) => handleConfigChange('winProbability', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScratchContentEditor;
