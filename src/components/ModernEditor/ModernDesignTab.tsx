
import React from 'react';
import { Palette } from 'lucide-react';
import ImageUpload from '../common/ImageUpload';

interface ModernDesignTabProps {
  campaign: any;
  setCampaign: (updater: (prev: any) => any) => void;
}

const ModernDesignTab: React.FC<ModernDesignTabProps> = ({
  campaign,
  setCampaign
}) => {
  const handleBackgroundImageChange = (image: string) => {
    setCampaign((prev: any) => ({
      ...prev,
      design: {
        ...prev.design,
        backgroundImage: image
      }
    }));
  };

  const handleCenterLogoChange = (image: string) => {
    setCampaign((prev: any) => ({
      ...prev,
      design: {
        ...prev.design,
        centerLogo: image
      }
    }));
  };

  const handleColorChange = (property: string, value: string) => {
    setCampaign((prev: any) => ({
      ...prev,
      design: {
        ...prev.design,
        [property]: value
      }
    }));
  };

  const handleCustomTextChange = (property: string, value: any) => {
    setCampaign((prev: any) => ({
      ...prev,
      design: {
        ...prev.design,
        customText: {
          ...prev.design.customText,
          [property]: value
        }
      }
    }));
  };

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-[#f8f0f5] rounded-lg">
            <Palette className="w-5 h-5 text-[#841b60]" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Centre & Arrière-plan</h3>
        </div>

        <div className="space-y-6">
          <ImageUpload
            label="Image de fond"
            value={campaign.design?.backgroundImage || ''}
            onChange={handleBackgroundImageChange}
          />

          <ImageUpload
            label="Logo central de la roue"
            value={campaign.design?.centerLogo || ''}
            onChange={handleCenterLogoChange}
          />
        </div>
      </div>

      <div>
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-[#f8f0f5] rounded-lg">
            <Palette className="w-5 h-5 text-[#841b60]" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Couleurs & Typographie</h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Fond</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={campaign.design?.background || '#f8fafc'}
                onChange={(e) => handleColorChange('background', e.target.value)}
                className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={campaign.design?.background || '#f8fafc'}
                onChange={(e) => handleColorChange('background', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                placeholder="#f8fafc"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Texte</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={campaign.design?.titleColor || '#000000'}
                onChange={(e) => handleColorChange('titleColor', e.target.value)}
                className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={campaign.design?.titleColor || '#000000'}
                onChange={(e) => handleColorChange('titleColor', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                placeholder="#000000"
              />
            </div>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Police</label>
          <select
            value={campaign.design?.fontFamily || 'Inter'}
            onChange={(e) => handleColorChange('fontFamily', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="Inter">Inter</option>
            <option value="Arial">Arial</option>
            <option value="Helvetica">Helvetica</option>
            <option value="Georgia">Georgia</option>
            <option value="Times New Roman">Times New Roman</option>
          </select>
        </div>
      </div>

      <div>
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-[#f8f0f5] rounded-lg">
            <Palette className="w-5 h-5 text-[#841b60]" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Texte personnalisé</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="enableCustomText"
              checked={campaign.design?.customText?.enabled || false}
              onChange={(e) => handleCustomTextChange('enabled', e.target.checked)}
              className="rounded border-gray-300"
            />
            <label htmlFor="enableCustomText" className="text-sm font-medium text-gray-700">
              Activer le texte personnalisé
            </label>
          </div>

          {campaign.design?.customText?.enabled && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Texte</label>
                <textarea
                  value={campaign.design?.customText?.text || ''}
                  onChange={(e) => handleCustomTextChange('text', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={3}
                  placeholder="Votre texte personnalisé"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                  <select
                    value={campaign.design?.customText?.position || 'top'}
                    onChange={(e) => handleCustomTextChange('position', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="top">En haut</option>
                    <option value="bottom">En bas</option>
                    <option value="left">À gauche</option>
                    <option value="right">À droite</option>
                    <option value="center">Au centre</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Taille</label>
                  <select
                    value={campaign.design?.customText?.size || 'medium'}
                    onChange={(e) => handleCustomTextChange('size', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="small">Petit</option>
                    <option value="medium">Moyen</option>
                    <option value="large">Grand</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Couleur du texte</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={campaign.design?.customText?.color || '#000000'}
                    onChange={(e) => handleCustomTextChange('color', e.target.value)}
                    className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={campaign.design?.customText?.color || '#000000'}
                    onChange={(e) => handleCustomTextChange('color', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                    placeholder="#000000"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="showFrame"
                    checked={campaign.design?.customText?.showFrame || false}
                    onChange={(e) => handleCustomTextChange('showFrame', e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <label htmlFor="showFrame" className="text-sm font-medium text-gray-700">
                    Afficher un cadre
                  </label>
                </div>

                {campaign.design?.customText?.showFrame && (
                  <div className="grid grid-cols-2 gap-4 pl-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Couleur du fond</label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="color"
                          value={campaign.design?.customText?.frameColor || '#ffffff'}
                          onChange={(e) => handleCustomTextChange('frameColor', e.target.value)}
                          className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
                        />
                        <input
                          type="text"
                          value={campaign.design?.customText?.frameColor || '#ffffff'}
                          onChange={(e) => handleCustomTextChange('frameColor', e.target.value)}
                          className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"
                          placeholder="#ffffff"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Couleur de la bordure</label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="color"
                          value={campaign.design?.customText?.frameBorderColor || '#e5e7eb'}
                          onChange={(e) => handleCustomTextChange('frameBorderColor', e.target.value)}
                          className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
                        />
                        <input
                          type="text"
                          value={campaign.design?.customText?.frameBorderColor || '#e5e7eb'}
                          onChange={(e) => handleCustomTextChange('frameBorderColor', e.target.value)}
                          className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"
                          placeholder="#e5e7eb"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernDesignTab;
