
import React from 'react';
import { Palette, Image, Type, Layout } from 'lucide-react';
import ImageUpload from '../common/ImageUpload';

interface ModernDesignTabProps {
  campaign: any;
  setCampaign: React.Dispatch<React.SetStateAction<any>>;
}

const ModernDesignTab: React.FC<ModernDesignTabProps> = ({
  campaign,
  setCampaign
}) => {
  const handleDesignChange = (field: string, value: any) => {
    setCampaign((prev: any) => ({
      ...prev,
      design: {
        ...prev.design,
        [field]: value
      }
    }));
  };

  const handleBackgroundImageChange = (imageData: string) => {
    console.log('Image de fond uploadée:', imageData ? 'Image reçue' : 'Image supprimée');
    handleDesignChange('backgroundImage', imageData);
  };

  const handleColorChange = (field: string, value: string) => {
    handleDesignChange(field, value);
  };

  return (
    <div className="space-y-8 p-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Design et Apparence</h2>
        <p className="text-sm text-gray-600">
          Personnalisez l'apparence visuelle de votre campagne
        </p>
      </div>

      {/* Section Image de fond */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Image className="w-6 h-6 text-[#841b60]" />
          <h3 className="text-xl font-semibold text-gray-900">Image de fond</h3>
        </div>
        
        <ImageUpload
          value={campaign.design?.backgroundImage || ''}
          onChange={handleBackgroundImageChange}
          label="Image de fond de la campagne"
          className="mb-4"
        />
        
        <p className="text-sm text-gray-500">
          L'image de fond sera affichée sur toute la zone de jeu. Recommandé : 1920x1080px
        </p>
      </div>

      {/* Section Couleurs */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Palette className="w-6 h-6 text-[#841b60]" />
          <h3 className="text-xl font-semibold text-gray-900">Couleurs</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Couleur de fond (si pas d'image)
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={campaign.design?.background || '#f8fafc'}
                onChange={(e) => handleColorChange('background', e.target.value)}
                className="w-12 h-12 border border-gray-300 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={campaign.design?.background || '#f8fafc'}
                onChange={(e) => handleColorChange('background', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
                placeholder="#f8fafc"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Couleur primaire
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={campaign.design?.primaryColor || '#841b60'}
                onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                className="w-12 h-12 border border-gray-300 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={campaign.design?.primaryColor || '#841b60'}
                onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
                placeholder="#841b60"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section Police */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Type className="w-6 h-6 text-[#841b60]" />
          <h3 className="text-xl font-semibold text-gray-900">Typographie</h3>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Police de caractère
          </label>
          <select
            value={campaign.design?.fontFamily || 'Inter'}
            onChange={(e) => handleDesignChange('fontFamily', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
          >
            <option value="Inter">Inter (Moderne)</option>
            <option value="Arial">Arial (Classique)</option>
            <option value="Georgia">Georgia (Élégant)</option>
            <option value="Helvetica">Helvetica (Propre)</option>
            <option value="Times New Roman">Times New Roman (Traditionnel)</option>
            <option value="Roboto">Roboto (Tech)</option>
            <option value="Open Sans">Open Sans (Lisible)</option>
          </select>
        </div>
      </div>

      {/* Section Layout */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Layout className="w-6 h-6 text-[#841b60]" />
          <h3 className="text-xl font-semibold text-gray-900">Mise en page</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Espacement général
            </label>
            <select
              value={campaign.design?.spacing || 'normal'}
              onChange={(e) => handleDesignChange('spacing', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
            >
              <option value="compact">Compact</option>
              <option value="normal">Normal</option>
              <option value="spacious">Spacieux</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Coins arrondis
            </label>
            <select
              value={campaign.design?.borderRadius || 'normal'}
              onChange={(e) => handleDesignChange('borderRadius', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
            >
              <option value="none">Aucun</option>
              <option value="small">Petits</option>
              <option value="normal">Normaux</option>
              <option value="large">Grands</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernDesignTab;
