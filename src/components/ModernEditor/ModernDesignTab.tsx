
import React from 'react';
import { Palette, Image as ImageIcon, Type } from 'lucide-react';
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
    </div>
  );
};

export default ModernDesignTab;
