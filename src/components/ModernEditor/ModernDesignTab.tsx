
import React from 'react';
import { Palette, Type, Image } from 'lucide-react';

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

  const colorPresets = [
    { name: 'Violet', primary: '#841b60', secondary: '#ffffff', bg: '#f8fafc' },
    { name: 'Bleu', primary: '#2563eb', secondary: '#ffffff', bg: '#eff6ff' },
    { name: 'Vert', primary: '#059669', secondary: '#ffffff', bg: '#ecfdf5' },
    { name: 'Rouge', primary: '#dc2626', secondary: '#ffffff', bg: '#fef2f2' },
    { name: 'Orange', primary: '#ea580c', secondary: '#ffffff', bg: '#fff7ed' }
  ];

  const fontOptions = [
    { value: 'Inter', label: 'Inter (Moderne)' },
    { value: 'Roboto', label: 'Roboto (Clean)' },
    { value: 'Playfair Display', label: 'Playfair (Élégant)' },
    { value: 'Poppins', label: 'Poppins (Amical)' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Design & Apparence</h2>
        <p className="text-sm text-gray-600">Personnalisez l'apparence visuelle de votre campagne</p>
      </div>

      {/* Palettes de couleurs prédéfinies */}
      <div className="space-y-3">
        <label className="flex items-center text-sm font-medium text-gray-700">
          <Palette className="w-4 h-4 mr-2" />
          Palettes de couleurs
        </label>
        <div className="grid grid-cols-1 gap-2">
          {colorPresets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => {
                handleDesignChange('primaryColor', preset.primary);
                handleDesignChange('secondaryColor', preset.secondary);
                handleDesignChange('background', preset.bg);
                handleDesignChange('buttonColor', preset.primary);
              }}
              className="flex items-center p-3 border rounded-lg hover:border-gray-400 transition-colors"
            >
              <div className="flex space-x-1 mr-3">
                <div 
                  className="w-4 h-4 rounded-full border"
                  style={{ backgroundColor: preset.primary }}
                />
                <div 
                  className="w-4 h-4 rounded-full border"
                  style={{ backgroundColor: preset.secondary }}
                />
                <div 
                  className="w-4 h-4 rounded-full border"
                  style={{ backgroundColor: preset.bg }}
                />
              </div>
              <span className="text-sm font-medium">{preset.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Couleurs personnalisées */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-700">Couleurs personnalisées</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Couleur principale</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={campaign.design?.primaryColor || '#841b60'}
                onChange={(e) => handleDesignChange('primaryColor', e.target.value)}
                className="w-10 h-10 rounded border"
              />
              <input
                type="text"
                value={campaign.design?.primaryColor || '#841b60'}
                onChange={(e) => handleDesignChange('primaryColor', e.target.value)}
                className="flex-1 px-2 py-1 text-xs border rounded"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs text-gray-600 mb-1">Arrière-plan</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={campaign.design?.background || '#f8fafc'}
                onChange={(e) => handleDesignChange('background', e.target.value)}
                className="w-10 h-10 rounded border"
              />
              <input
                type="text"
                value={campaign.design?.background || '#f8fafc'}
                onChange={(e) => handleDesignChange('background', e.target.value)}
                className="flex-1 px-2 py-1 text-xs border rounded"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Police */}
      <div className="space-y-2">
        <label className="flex items-center text-sm font-medium text-gray-700">
          <Type className="w-4 h-4 mr-2" />
          Police de caractères
        </label>
        <select
          value={campaign.design?.fontFamily || 'Inter'}
          onChange={(e) => handleDesignChange('fontFamily', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent transition-all"
        >
          {fontOptions.map((font) => (
            <option key={font.value} value={font.value}>
              {font.label}
            </option>
          ))}
        </select>
      </div>

      {/* Rayon de bordure */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Rayon des bordures</label>
        <div className="grid grid-cols-4 gap-2">
          {['0rem', '0.25rem', '0.5rem', '1rem'].map((radius) => (
            <button
              key={radius}
              onClick={() => handleDesignChange('borderRadius', radius)}
              className={`p-2 text-xs rounded border transition-colors ${
                campaign.design?.borderRadius === radius
                  ? 'bg-[#841b60] text-white border-[#841b60]'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-[#841b60]'
              }`}
            >
              {radius === '0rem' ? 'Carré' : radius === '0.25rem' ? 'Petit' : radius === '0.5rem' ? 'Normal' : 'Arrondi'}
            </button>
          ))}
        </div>
      </div>

      {/* Image de fond */}
      <div className="space-y-2">
        <label className="flex items-center text-sm font-medium text-gray-700">
          <Image className="w-4 h-4 mr-2" />
          Image de fond (optionnel)
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const url = URL.createObjectURL(file);
              handleDesignChange('backgroundImage', url);
            }
          }}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent transition-all"
        />
        {campaign.design?.backgroundImage && (
          <div className="mt-2">
            <img
              src={campaign.design.backgroundImage}
              alt="Aperçu de l'image de fond"
              className="w-full h-24 object-cover rounded-lg border"
            />
            <button
              onClick={() => handleDesignChange('backgroundImage', '')}
              className="mt-2 text-xs text-red-600 hover:text-red-800"
            >
              Supprimer l'image
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModernDesignTab;
