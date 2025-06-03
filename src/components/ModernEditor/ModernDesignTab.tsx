import React from 'react';
import ImageUpload from '../common/ImageUpload';

interface ModernDesignTabProps {
  campaign: any;
  setCampaign: (campaign: any) => void;
}

const ModernDesignTab: React.FC<ModernDesignTabProps> = ({
  campaign,
  setCampaign
}) => {
  const handleBackgroundImageChange = (value: string | File) => {
    const imageValue = typeof value === 'string' ? value : URL.createObjectURL(value);
    setCampaign((prev: any) => ({
      ...prev,
      design: {
        ...prev.design,
        backgroundImage: imageValue
      }
    }));
  };

  const handleCenterLogoChange = (value: string | File) => {
    const imageValue = typeof value === 'string' ? value : URL.createObjectURL(value);
    setCampaign((prev: any) => ({
      ...prev,
      design: {
        ...prev.design,
        centerLogo: imageValue
      },
      config: {
        ...prev.config,
        roulette: {
          ...prev.config?.roulette,
          centerImage: imageValue
        }
      }
    }));
  };

  const handleColorChange = (field: string, value: string) => {
    setCampaign((prev: any) => ({
      ...prev,
      design: {
        ...prev.design,
        [field]: value
      }
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Centre & Arrière-plan</h3>
        
        <div className="space-y-4">
          <ImageUpload
            label="Image de fond"
            value={campaign.design?.backgroundImage}
            onChange={handleBackgroundImageChange}
            className="w-full"
          />

          <ImageUpload
            label="Logo central de la roue"
            value={campaign.design?.centerLogo}
            onChange={handleCenterLogoChange}
            className="w-full"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Couleurs & Typographie</h3>
        
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700 flex-1">Fond</label>
            <input
              type="color"
              value={campaign.design?.background || '#f8fafc'}
              onChange={(e) => handleColorChange('background', e.target.value)}
              className="w-12 h-8 rounded border border-gray-300"
            />
            <input
              type="text"
              value={campaign.design?.background || '#f8fafc'}
              onChange={(e) => handleColorChange('background', e.target.value)}
              className="ml-2 px-3 py-1 text-sm border border-gray-300 rounded w-20"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700 flex-1">Texte</label>
            <input
              type="color"
              value={campaign.design?.titleColor || '#000000'}
              onChange={(e) => handleColorChange('titleColor', e.target.value)}
              className="w-12 h-8 rounded border border-gray-300"
            />
            <input
              type="text"
              value={campaign.design?.titleColor || '#000000'}
              onChange={(e) => handleColorChange('titleColor', e.target.value)}
              className="ml-2 px-3 py-1 text-sm border border-gray-300 rounded w-20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Police</label>
            <select
              value={campaign.design?.fontFamily || 'Inter'}
              onChange={(e) => handleColorChange('fontFamily', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
            >
              <option value="Inter">Inter</option>
              <option value="Arial">Arial</option>
              <option value="Georgia">Georgia</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Helvetica">Helvetica</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernDesignTab;
