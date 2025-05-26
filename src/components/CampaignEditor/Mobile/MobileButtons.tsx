
import React from 'react';
import { MousePointer, ArrowUp, ArrowDown, Minus } from 'lucide-react';

interface MobileButtonsProps {
  campaign: any;
  setCampaign: React.Dispatch<React.SetStateAction<any>>;
}

const MobileButtons: React.FC<MobileButtonsProps> = ({ campaign, setCampaign }) => {
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
        <MousePointer className="w-5 h-5 text-[#841b60]" />
        <h3 className="text-lg font-medium text-gray-900">Buttons & Actions</h3>
      </div>

      {/* Button Placement */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Placement du bouton principal
        </label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: 'top', label: 'En haut', icon: ArrowUp },
            { value: 'center', label: 'Centré', icon: Minus },
            { value: 'bottom', label: 'En bas', icon: ArrowDown }
          ].map((position) => (
            <button
              key={position.value}
              onClick={() => updateMobileConfig('buttonPlacement', position.value)}
              className={`p-4 border-2 rounded-lg text-center transition-colors ${
                (mobileConfig.buttonPlacement || 'bottom') === position.value
                  ? 'border-[#841b60] bg-[#f9f0f5] text-[#841b60]'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <position.icon className="w-5 h-5 mx-auto mb-2" />
              <div className="text-sm font-medium">{position.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Button Text */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Texte du bouton mobile
        </label>
        <input
          type="text"
          value={mobileConfig.buttonText || campaign.gameConfig?.[campaign.type]?.buttonLabel || 'Jouer'}
          onChange={(e) => updateMobileConfig('buttonText', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
          placeholder="Texte spécifique au mobile"
        />
      </div>

      {/* Button Style */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Style du bouton
        </label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Couleur</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={mobileConfig.buttonColor || '#841b60'}
                onChange={(e) => updateMobileConfig('buttonColor', e.target.value)}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={mobileConfig.buttonColor || '#841b60'}
                onChange={(e) => updateMobileConfig('buttonColor', e.target.value)}
                className="flex-1 px-3 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#841b60]"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Couleur du texte</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={mobileConfig.buttonTextColor || '#ffffff'}
                onChange={(e) => updateMobileConfig('buttonTextColor', e.target.value)}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={mobileConfig.buttonTextColor || '#ffffff'}
                onChange={(e) => updateMobileConfig('buttonTextColor', e.target.value)}
                className="flex-1 px-3 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#841b60]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Button Shape */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Forme du bouton
        </label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: 'rounded-md', label: 'Arrondi léger' },
            { value: 'rounded-lg', label: 'Arrondi moyen' },
            { value: 'rounded-full', label: 'Arrondi complet' }
          ].map((shape) => (
            <button
              key={shape.value}
              onClick={() => updateMobileConfig('buttonShape', shape.value)}
              className={`p-3 border-2 rounded-lg text-center transition-colors ${
                (mobileConfig.buttonShape || 'rounded-lg') === shape.value
                  ? 'border-[#841b60] bg-[#f9f0f5] text-[#841b60]'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-sm font-medium">{shape.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Button Size */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Taille du bouton
        </label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: 'small', label: 'Petit', classes: 'px-4 py-2 text-sm' },
            { value: 'medium', label: 'Moyen', classes: 'px-6 py-3 text-base' },
            { value: 'large', label: 'Grand', classes: 'px-8 py-4 text-lg' }
          ].map((size) => (
            <button
              key={size.value}
              onClick={() => updateMobileConfig('buttonSize', size.value)}
              className={`p-3 border-2 rounded-lg text-center transition-colors ${
                (mobileConfig.buttonSize || 'medium') === size.value
                  ? 'border-[#841b60] bg-[#f9f0f5] text-[#841b60]'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-sm font-medium">{size.label}</div>
              <div className="text-xs text-gray-500 mt-1">{size.classes}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Button Shadow */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Ombre du bouton
        </label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: '', label: 'Aucune' },
            { value: 'shadow-md', label: 'Légère' },
            { value: 'shadow-lg', label: 'Forte' }
          ].map((shadow) => (
            <button
              key={shadow.value}
              onClick={() => updateMobileConfig('buttonShadow', shadow.value)}
              className={`p-3 border-2 rounded-lg text-center transition-colors ${
                (mobileConfig.buttonShadow || 'shadow-md') === shadow.value
                  ? 'border-[#841b60] bg-[#f9f0f5] text-[#841b60]'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-sm font-medium">{shadow.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Button Spacing */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Espacement du bouton
        </label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Marge externe</label>
            <input
              type="range"
              min="0"
              max="40"
              value={mobileConfig.buttonMargin || 16}
              onChange={(e) => updateMobileConfig('buttonMargin', Number(e.target.value))}
              className="w-full accent-[#841b60]"
            />
            <div className="text-xs text-gray-500 mt-1">{mobileConfig.buttonMargin || 16}px</div>
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Largeur (%)</label>
            <input
              type="range"
              min="40"
              max="100"
              value={mobileConfig.buttonWidth || 80}
              onChange={(e) => updateMobileConfig('buttonWidth', Number(e.target.value))}
              className="w-full accent-[#841b60]"
            />
            <div className="text-xs text-gray-500 mt-1">{mobileConfig.buttonWidth || 80}%</div>
          </div>
        </div>
      </div>

      {/* Hover Effect */}
      <div>
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="button-hover"
            checked={mobileConfig.buttonHoverEffect !== false}
            onChange={(e) => updateMobileConfig('buttonHoverEffect', e.target.checked)}
            className="w-4 h-4 text-[#841b60] border-gray-300 rounded focus:ring-[#841b60]"
          />
          <label htmlFor="button-hover" className="text-sm font-medium">
            Effet au survol/touch
          </label>
        </div>
        <p className="text-xs text-gray-500 mt-1 pl-7">
          Active les effets visuels lors de l'interaction avec le bouton.
        </p>
      </div>
    </div>
  );
};

export default MobileButtons;
