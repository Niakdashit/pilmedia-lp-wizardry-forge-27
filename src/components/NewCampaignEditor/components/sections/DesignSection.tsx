
import React from 'react';
import { Palette, Image as ImageIcon } from 'lucide-react';
import ImageUpload from '../../../common/ImageUpload';

interface DesignSectionProps {
  campaign: any;
  setCampaign: React.Dispatch<React.SetStateAction<any>>;
}

const DesignSection: React.FC<DesignSectionProps> = ({ campaign, setCampaign }) => {
  const updateDesign = (key: string, value: string) => {
    setCampaign((prev: any) => ({
      ...prev,
      design: { ...prev.design, [key]: value }
    }));
  };

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Couleurs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6">
        <div className="flex items-center space-x-3 mb-4 lg:mb-6">
          <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-[#841b60] to-pink-500 rounded-lg flex items-center justify-center">
            <Palette className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Palette de couleurs</h2>
            <p className="text-gray-600 text-sm lg:text-base">Personnalisez l'apparence visuelle de votre campagne</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {[
            { key: 'primaryColor', label: 'Couleur principale', default: '#841b60' },
            { key: 'secondaryColor', label: 'Couleur secondaire', default: '#ffffff' },
            { key: 'background', label: 'Arrière-plan', default: '#ebf4f7' },
            { key: 'titleColor', label: 'Couleur des titres', default: '#000000' },
            { key: 'buttonColor', label: 'Couleur des boutons', default: '#841b60' },
            { key: 'blockColor', label: 'Couleur des blocs', default: '#ffffff' }
          ].map((color) => (
            <div key={color.key} className="space-y-2 lg:space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                {color.label}
              </label>
              <div className="flex items-center space-x-2 lg:space-x-3">
                <input
                  type="color"
                  value={campaign.design[color.key] || color.default}
                  onChange={(e) => updateDesign(color.key, e.target.value)}
                  className="w-10 h-10 lg:w-12 lg:h-12 border border-gray-300 rounded-lg cursor-pointer"
                />
                <input
                  type="text"
                  value={campaign.design[color.key] || color.default}
                  onChange={(e) => updateDesign(color.key, e.target.value)}
                  className="flex-1 px-3 lg:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60] text-sm lg:text-base"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Typographie */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6">
        <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-4 lg:mb-6">Typographie</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Police principale
            </label>
            <select
              value={campaign.design.fontFamily || 'Inter'}
              onChange={(e) => updateDesign('fontFamily', e.target.value)}
              className="w-full px-3 lg:px-4 py-2 lg:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60] text-sm lg:text-base"
            >
              <option value="Inter">Inter</option>
              <option value="Arial">Arial</option>
              <option value="Helvetica">Helvetica</option>
              <option value="Georgia">Georgia</option>
              <option value="Times New Roman">Times New Roman</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Taille de police
            </label>
            <select
              value={campaign.design.fontSize || 'normal'}
              onChange={(e) => updateDesign('fontSize', e.target.value)}
              className="w-full px-3 lg:px-4 py-2 lg:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60] text-sm lg:text-base"
            >
              <option value="small">Petite</option>
              <option value="normal">Normale</option>
              <option value="large">Grande</option>
            </select>
          </div>
        </div>
      </div>

      {/* Images */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6">
        <div className="flex items-center space-x-3 mb-4 lg:mb-6">
          <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
            <ImageIcon className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg lg:text-xl font-bold text-gray-900">Images et médias</h3>
            <p className="text-gray-600 text-sm lg:text-base">Ajoutez des images pour personnaliser votre campagne</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          <ImageUpload
            label="Logo"
            value={campaign.design.logoUrl}
            onChange={(value) => updateDesign('logoUrl', value)}
          />
          
          <ImageUpload
            label="Image d'arrière-plan"
            value={campaign.design.backgroundImage}
            onChange={(value) => updateDesign('backgroundImage', value)}
          />
        </div>
      </div>
    </div>
  );
};

export default DesignSection;
