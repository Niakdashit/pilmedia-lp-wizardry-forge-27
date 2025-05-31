
import React from 'react';
import { Palette, Image, Type } from 'lucide-react';
import ImageUpload from '../common/ImageUpload';
import MultipleTextManager from './MultipleTextManager';

interface ModernDesignTabProps {
  campaign: any;
  setCampaign: React.Dispatch<React.SetStateAction<any>>;
}

const ModernDesignTab: React.FC<ModernDesignTabProps> = ({
  campaign,
  setCampaign
}) => {
  const design = campaign.design || {};
  
  // Initialize text fields if they don't exist
  const headerTexts = campaign.design?.headerTexts || [];
  const centerTexts = campaign.design?.centerTexts || [];
  const footerTexts = campaign.design?.footerTexts || [];

  const updateDesign = (updates: any) => {
    setCampaign((prev: any) => ({
      ...prev,
      design: {
        ...prev.design,
        ...updates
      }
    }));
  };

  const handleTextFieldsChange = (zone: 'header' | 'center' | 'footer', fields: any[]) => {
    const zoneKey = `${zone}Texts`;
    updateDesign({ [zoneKey]: fields });
  };

  return (
    <div className="space-y-8">
      {/* Background Settings */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-[#841b60] flex items-center">
          <Image className="w-5 h-5 mr-2" />
          Arrière-plan
        </h2>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Image de fond</label>
            <ImageUpload
              value={design.backgroundImage || ''}
              onChange={(value) => updateDesign({ backgroundImage: value })}
              label=""
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Couleur de fond</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={design.background || '#f8fafc'}
                onChange={(e) => updateDesign({ background: e.target.value })}
                className="w-10 h-10 rounded border border-gray-300"
              />
              <input
                type="text"
                value={design.background || '#f8fafc'}
                onChange={(e) => updateDesign({ background: e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Colors */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-[#841b60] flex items-center">
          <Palette className="w-5 h-5 mr-2" />
          Couleurs
        </h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Couleur primaire</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={design.primaryColor || '#841b60'}
                onChange={(e) => updateDesign({ primaryColor: e.target.value })}
                className="w-10 h-10 rounded border border-gray-300"
              />
              <input
                type="text"
                value={design.primaryColor || '#841b60'}
                onChange={(e) => updateDesign({ primaryColor: e.target.value })}
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#841b60]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Couleur secondaire</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={design.secondaryColor || '#ffffff'}
                onChange={(e) => updateDesign({ secondaryColor: e.target.value })}
                className="w-10 h-10 rounded border border-gray-300"
              />
              <input
                type="text"
                value={design.secondaryColor || '#ffffff'}
                onChange={(e) => updateDesign({ secondaryColor: e.target.value })}
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#841b60]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Typography */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-[#841b60] flex items-center">
          <Type className="w-5 h-5 mr-2" />
          Typographie
        </h2>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Police de caractères</label>
            <select
              value={design.fontFamily || 'Inter'}
              onChange={(e) => updateDesign({ fontFamily: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
            >
              <option value="Inter">Inter</option>
              <option value="Roboto">Roboto</option>
              <option value="Open Sans">Open Sans</option>
              <option value="Poppins">Poppins</option>
              <option value="Montserrat">Montserrat</option>
            </select>
          </div>
        </div>
      </div>

      {/* Multiple Text Fields */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-[#841b60] flex items-center">
          <Type className="w-5 h-5 mr-2" />
          Textes personnalisés
        </h2>
        
        <MultipleTextManager
          zone="header"
          textFields={headerTexts}
          onTextFieldsChange={(fields) => handleTextFieldsChange('header', fields)}
        />
        
        <MultipleTextManager
          zone="center"
          textFields={centerTexts}
          onTextFieldsChange={(fields) => handleTextFieldsChange('center', fields)}
        />
        
        <MultipleTextManager
          zone="footer"
          textFields={footerTexts}
          onTextFieldsChange={(fields) => handleTextFieldsChange('footer', fields)}
        />
      </div>
    </div>
  );
};

export default ModernDesignTab;
