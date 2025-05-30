
import React from 'react';

interface MobileGameAlignmentProps {
  campaign: any;
  setCampaign: (campaign: any) => void;
}

const MobileGameAlignment: React.FC<MobileGameAlignmentProps> = ({
  campaign,
  setCampaign
}) => {
  const mobileConfig = campaign.mobileConfig || {};

  const handleAlignmentChange = (key: string, value: any) => {
    setCampaign((prev: any) => ({
      ...prev,
      mobileConfig: {
        ...prev.mobileConfig,
        [key]: value
      }
    }));
  };

  return (
    <div className="space-y-6">
      {/* Alignement vertical du jeu */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Alignement vertical du jeu
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { value: 'flex-start', label: 'Haut', icon: '⬆️' },
            { value: 'center', label: 'Centre', icon: '↔️' },
            { value: 'flex-end', label: 'Bas', icon: '⬇️' }
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => handleAlignmentChange('gameVerticalAlign', option.value)}
              className={`p-3 text-center border rounded-lg transition-all ${
                mobileConfig.gameVerticalAlign === option.value
                  ? 'border-[#841b60] bg-[#841b60] text-white'
                  : 'border-gray-300 hover:border-[#841b60] hover:bg-[#f9f0f5]'
              }`}
            >
              <div className="text-lg mb-1">{option.icon}</div>
              <div className="text-sm font-medium">{option.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Position du jeu */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Position du jeu
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { value: 'top', label: 'Haut' },
            { value: 'center', label: 'Centre' },
            { value: 'bottom', label: 'Bas' }
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => handleAlignmentChange('gamePosition', option.value)}
              className={`p-3 text-center border rounded-lg transition-all ${
                mobileConfig.gamePosition === option.value
                  ? 'border-[#841b60] bg-[#841b60] text-white'
                  : 'border-gray-300 hover:border-[#841b60] hover:bg-[#f9f0f5]'
              }`}
            >
              <div className="text-sm font-medium">{option.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Template mobile personnalisé */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Template mobile personnalisé
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => {
                handleAlignmentChange('customTemplate', reader.result as string);
              };
              reader.readAsDataURL(file);
            }
          }}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[#841b60] file:text-white hover:file:bg-[#6d164f]"
        />
        {mobileConfig.customTemplate && (
          <div className="mt-2 relative">
            <img
              src={mobileConfig.customTemplate}
              alt="Template mobile personnalisé"
              className="w-full max-w-[200px] h-auto object-contain border rounded"
            />
            <button
              onClick={() => handleAlignmentChange('customTemplate', null)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
            >
              ✕
            </button>
          </div>
        )}
        <p className="text-xs text-gray-500 mt-1">
          Ce template sera affiché en arrière-plan sur mobile et tablette
        </p>
      </div>

      {/* Taille du template mobile */}
      {mobileConfig.customTemplate && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Taille du template mobile
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Largeur max (%)</label>
              <input
                type="range"
                min="50"
                max="100"
                value={mobileConfig.templateMaxWidth || 90}
                onChange={(e) => handleAlignmentChange('templateMaxWidth', parseInt(e.target.value))}
                className="w-full"
              />
              <div className="text-xs text-gray-600 text-center">
                {mobileConfig.templateMaxWidth || 90}%
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Hauteur max (%)</label>
              <input
                type="range"
                min="50"
                max="100"
                value={mobileConfig.templateMaxHeight || 70}
                onChange={(e) => handleAlignmentChange('templateMaxHeight', parseInt(e.target.value))}
                className="w-full"
              />
              <div className="text-xs text-gray-600 text-center">
                {mobileConfig.templateMaxHeight || 70}%
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileGameAlignment;
