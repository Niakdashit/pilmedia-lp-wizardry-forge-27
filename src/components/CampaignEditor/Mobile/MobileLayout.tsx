
import React from 'react';
import { Move, ArrowUp, ArrowDown } from 'lucide-react';

interface MobileLayoutProps {
  campaign: any;
  setCampaign: React.Dispatch<React.SetStateAction<any>>;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ campaign, setCampaign }) => {
  const mobileConfig = campaign.mobileConfig || {};

  const updateMobileConfig = (key: string, value: any) => {
    setCampaign((prev: any) => ({
      ...prev,
      mobileConfig: { ...prev.mobileConfig, [key]: value }
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Move className="w-5 h-5 text-[#841b60]" />
        <h3 className="text-lg font-medium text-gray-900">Layout Configuration</h3>
      </div>

      {/* Game Position */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Position du jeu
        </label>
        <div className="grid grid-cols-3 gap-3">
          {['top', 'center', 'bottom'].map((position) => (
            <button
              key={position}
              onClick={() => updateMobileConfig('gamePosition', position)}
              className={`p-4 border-2 rounded-lg text-center transition-colors ${
                mobileConfig.gamePosition === position
                  ? 'border-[#841b60] bg-[#f9f0f5] text-[#841b60]'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-sm font-medium capitalize">{position}</div>
              <div className="text-xs text-gray-500 mt-1">
                {position === 'top' && 'En haut'}
                {position === 'center' && 'Centré'}
                {position === 'bottom' && 'En bas'}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Button Position */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Position du bouton principal
        </label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: 'above', label: 'Au-dessus du jeu', icon: ArrowUp },
            { value: 'below', label: 'En-dessous du jeu', icon: ArrowDown }
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => updateMobileConfig('buttonPosition', option.value)}
              className={`p-4 border-2 rounded-lg text-center transition-colors ${
                mobileConfig.buttonPosition === option.value
                  ? 'border-[#841b60] bg-[#f9f0f5] text-[#841b60]'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <option.icon className="w-5 h-5 mx-auto mb-2" />
              <div className="text-sm font-medium">{option.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Text Block Position */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Position du bloc de texte
        </label>
        <div className="grid grid-cols-3 gap-3">
          {['top', 'center', 'bottom'].map((position) => (
            <button
              key={position}
              onClick={() => updateMobileConfig('textPosition', position)}
              className={`p-4 border-2 rounded-lg text-center transition-colors ${
                mobileConfig.textPosition === position
                  ? 'border-[#841b60] bg-[#f9f0f5] text-[#841b60]'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-sm font-medium capitalize">{position}</div>
              <div className="text-xs text-gray-500 mt-1">
                {position === 'top' && 'En haut'}
                {position === 'center' && 'Centré'}
                {position === 'bottom' && 'En bas'}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Spacing Controls */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Espacement et padding
        </label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Padding horizontal</label>
            <input
              type="range"
              min="0"
              max="40"
              value={mobileConfig.horizontalPadding || 16}
              onChange={(e) => updateMobileConfig('horizontalPadding', Number(e.target.value))}
              className="w-full"
            />
            <div className="text-xs text-gray-500 mt-1">{mobileConfig.horizontalPadding || 16}px</div>
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Espacement vertical</label>
            <input
              type="range"
              min="0"
              max="60"
              value={mobileConfig.verticalSpacing || 20}
              onChange={(e) => updateMobileConfig('verticalSpacing', Number(e.target.value))}
              className="w-full"
            />
            <div className="text-xs text-gray-500 mt-1">{mobileConfig.verticalSpacing || 20}px</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileLayout;
