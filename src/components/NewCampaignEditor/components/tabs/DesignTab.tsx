
import React from 'react';
import { Palette, Type, Image, Layout } from 'lucide-react';

interface DesignTabProps {
  campaign: any;
  setCampaign: React.Dispatch<React.SetStateAction<any>>;
}

const DesignTab: React.FC<DesignTabProps> = ({ campaign, setCampaign }) => {
  const handleDesignChange = (field: string, value: any) => {
    setCampaign((prev: any) => ({
      ...prev,
      design: {
        ...prev.design,
        [field]: value
      }
    }));
  };

  const colorPresets = [
    { name: 'Moderne', primary: '#6366f1', secondary: '#f8fafc' },
    { name: 'Chaleureux', primary: '#f59e0b', secondary: '#fef3c7' },
    { name: 'Nature', primary: '#10b981', secondary: '#d1fae5' },
    { name: 'Élégant', primary: '#8b5cf6', secondary: '#f3e8ff' },
    { name: 'Dynamique', primary: '#ef4444', secondary: '#fee2e2' }
  ];

  const fontFamilies = [
    'Inter',
    'Poppins',
    'Roboto',
    'Open Sans',
    'Montserrat',
    'Playfair Display'
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Design et apparence</h2>
        
        <div className="space-y-8">
          {/* Couleurs */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <Palette className="w-5 h-5 mr-2" />
              Couleurs
            </h3>
            
            {/* Palettes prédéfinies */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Palettes prédéfinies
              </label>
              <div className="grid grid-cols-5 gap-3">
                {colorPresets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => {
                      handleDesignChange('primaryColor', preset.primary);
                      handleDesignChange('background', preset.secondary);
                    }}
                    className="flex flex-col items-center p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors group"
                  >
                    <div className="flex space-x-1 mb-2">
                      <div
                        className="w-6 h-6 rounded-md"
                        style={{ backgroundColor: preset.primary }}
                      />
                      <div
                        className="w-6 h-6 rounded-md"
                        style={{ backgroundColor: preset.secondary }}
                      />
                    </div>
                    <span className="text-xs font-medium text-gray-700 group-hover:text-gray-900">
                      {preset.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Couleurs personnalisées */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Couleur principale
                </label>
                <div className="flex space-x-3">
                  <input
                    type="color"
                    value={campaign.design.primaryColor}
                    onChange={(e) => handleDesignChange('primaryColor', e.target.value)}
                    className="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={campaign.design.primaryColor}
                    onChange={(e) => handleDesignChange('primaryColor', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Couleur d'arrière-plan
                </label>
                <div className="flex space-x-3">
                  <input
                    type="color"
                    value={campaign.design.background}
                    onChange={(e) => handleDesignChange('background', e.target.value)}
                    className="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={campaign.design.background}
                    onChange={(e) => handleDesignChange('background', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Typographie */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <Type className="w-5 h-5 mr-2" />
              Typographie
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Famille de polices
                </label>
                <select
                  value={campaign.design.fontFamily}
                  onChange={(e) => handleDesignChange('fontFamily', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {fontFamilies.map((font) => (
                    <option key={font} value={font} style={{ fontFamily: font }}>
                      {font}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Taille de police
                </label>
                <select
                  value={campaign.design.fontSize}
                  onChange={(e) => handleDesignChange('fontSize', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="small">Petite</option>
                  <option value="normal">Normale</option>
                  <option value="large">Grande</option>
                </select>
              </div>
            </div>
          </div>

          {/* Images */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <Image className="w-5 h-5 mr-2" />
              Images
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image de fond
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          handleDesignChange('backgroundImage', reader.result);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="flex-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  />
                  {campaign.design.backgroundImage && (
                    <button
                      onClick={() => handleDesignChange('backgroundImage', null)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Supprimer
                    </button>
                  )}
                </div>
                {campaign.design.backgroundImage && (
                  <div className="mt-2">
                    <img
                      src={campaign.design.backgroundImage}
                      alt="Aperçu fond"
                      className="w-32 h-20 object-cover rounded-lg border border-gray-200"
                    />
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Logo
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          handleDesignChange('logoUrl', reader.result);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="flex-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  />
                  {campaign.design.logoUrl && (
                    <button
                      onClick={() => handleDesignChange('logoUrl', null)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Supprimer
                    </button>
                  )}
                </div>
                {campaign.design.logoUrl && (
                  <div className="mt-2">
                    <img
                      src={campaign.design.logoUrl}
                      alt="Aperçu logo"
                      className="h-16 object-contain rounded-lg border border-gray-200"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Style des blocs */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <Layout className="w-5 h-5 mr-2" />
              Style des blocs
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Arrondi des angles
                </label>
                <select
                  value={campaign.design.blockRadius}
                  onChange={(e) => handleDesignChange('blockRadius', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="rounded-none">Aucun</option>
                  <option value="rounded-md">Léger</option>
                  <option value="rounded-lg">Moyen</option>
                  <option value="rounded-xl">Fort</option>
                  <option value="rounded-3xl">Très fort</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ombre
                </label>
                <select
                  value={campaign.design.shadow}
                  onChange={(e) => handleDesignChange('shadow', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="shadow-none">Aucune</option>
                  <option value="shadow-sm">Légère</option>
                  <option value="shadow-md">Moyenne</option>
                  <option value="shadow-lg">Forte</option>
                  <option value="shadow-xl">Très forte</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignTab;
