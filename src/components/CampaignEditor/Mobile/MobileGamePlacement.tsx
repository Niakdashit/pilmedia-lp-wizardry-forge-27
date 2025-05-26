
import React from 'react';
import { Gamepad2, Maximize, Move } from 'lucide-react';
import ImageUpload from '../../common/ImageUpload';

interface MobileGamePlacementProps {
  campaign: any;
  setCampaign: React.Dispatch<React.SetStateAction<any>>;
}

const MobileGamePlacement: React.FC<MobileGamePlacementProps> = ({ campaign, setCampaign }) => {
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
        <Gamepad2 className="w-5 h-5 text-[#841b60]" />
        <h3 className="text-lg font-medium text-gray-900">Game Placement</h3>
      </div>

      {/* Game Position */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Position verticale du jeu
        </label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: 'top', label: 'Haut', desc: 'Positionné en haut' },
            { value: 'center', label: 'Centre', desc: 'Centré verticalement' },
            { value: 'bottom', label: 'Bas', desc: 'Positionné en bas' }
          ].map((position) => (
            <button
              key={position.value}
              onClick={() => updateMobileConfig('gamePosition', position.value)}
              className={`p-4 border-2 rounded-lg text-center transition-colors ${
                (mobileConfig.gamePosition || 'center') === position.value
                  ? 'border-[#841b60] bg-[#f9f0f5] text-[#841b60]'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Move className="w-5 h-5 mx-auto mb-2" />
              <div className="text-sm font-medium">{position.label}</div>
              <div className="text-xs text-gray-500 mt-1">{position.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Game Sizing */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Dimensionnement du jeu
        </label>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="fullscreen-game"
              checked={mobileConfig.fullscreenGame || false}
              onChange={(e) => updateMobileConfig('fullscreenGame', e.target.checked)}
              className="w-4 h-4 text-[#841b60] border-gray-300 rounded focus:ring-[#841b60]"
            />
            <label htmlFor="fullscreen-game" className="flex items-center space-x-2">
              <Maximize className="w-4 h-4" />
              <span className="text-sm font-medium">Jeu plein écran mobile</span>
            </label>
          </div>
          
          {!mobileConfig.fullscreenGame && (
            <div className="grid grid-cols-2 gap-4 pl-7">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Largeur max (%)</label>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={mobileConfig.gameMaxWidth || 85}
                  onChange={(e) => updateMobileConfig('gameMaxWidth', Number(e.target.value))}
                  className="w-full accent-[#841b60]"
                />
                <div className="text-xs text-gray-500 mt-1">{mobileConfig.gameMaxWidth || 85}%</div>
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Hauteur max (%)</label>
                <input
                  type="range"
                  min="30"
                  max="70"
                  value={mobileConfig.gameMaxHeight || 50}
                  onChange={(e) => updateMobileConfig('gameMaxHeight', Number(e.target.value))}
                  className="w-full accent-[#841b60]"
                />
                <div className="text-xs text-gray-500 mt-1">{mobileConfig.gameMaxHeight || 50}%</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Internal Padding */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Padding interne du jeu
        </label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Padding horizontal (px)</label>
            <input
              type="range"
              min="0"
              max="24"
              value={mobileConfig.gamePaddingX || 8}
              onChange={(e) => updateMobileConfig('gamePaddingX', Number(e.target.value))}
              className="w-full accent-[#841b60]"
            />
            <div className="text-xs text-gray-500 mt-1">{mobileConfig.gamePaddingX || 8}px</div>
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Padding vertical (px)</label>
            <input
              type="range"
              min="0"
              max="24"
              value={mobileConfig.gamePaddingY || 8}
              onChange={(e) => updateMobileConfig('gamePaddingY', Number(e.target.value))}
              className="w-full accent-[#841b60]"
            />
            <div className="text-xs text-gray-500 mt-1">{mobileConfig.gamePaddingY || 8}px</div>
          </div>
        </div>
      </div>

      {/* Mobile Template */}
      <div>
        <ImageUpload
          label="Template mobile personnalisé"
          value={mobileConfig.customTemplate || ''}
          onChange={(value) => updateMobileConfig('customTemplate', value)}
        />
        <p className="text-xs text-gray-500 mt-2">
          Template spécifique pour mobile, superposé au jeu. Recommandé : 1080x1920px
        </p>
      </div>

      {/* Auto-resize */}
      <div>
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="auto-resize"
            checked={mobileConfig.autoResize !== false}
            onChange={(e) => updateMobileConfig('autoResize', e.target.checked)}
            className="w-4 h-4 text-[#841b60] border-gray-300 rounded focus:ring-[#841b60]"
          />
          <label htmlFor="auto-resize" className="text-sm font-medium">
            Redimensionnement automatique
          </label>
        </div>
        <p className="text-xs text-gray-500 mt-1 pl-7">
          Ajuste automatiquement la taille des éléments du jeu selon l'écran.
        </p>
      </div>
    </div>
  );
};

export default MobileGamePlacement;
