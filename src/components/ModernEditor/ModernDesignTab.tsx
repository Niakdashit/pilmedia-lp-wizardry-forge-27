
import React from 'react';
import { Palette, Type, Square } from 'lucide-react';

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

  const fontOptions = [
    { value: 'Inter', label: 'Inter' },
    { value: 'Arial', label: 'Arial' },
    { value: 'Helvetica', label: 'Helvetica' },
    { value: 'Georgia', label: 'Georgia' },
    { value: 'Times New Roman', label: 'Times New Roman' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Design et apparence</h2>
        <p className="text-sm text-gray-600">
          Personnalisez l'apparence visuelle de votre campagne
        </p>
      </div>

      {/* Couleurs */}
      <div className="space-y-4">
        <h3 className="flex items-center text-lg font-semibold text-gray-900">
          <Palette className="w-5 h-5 mr-2" />
          Couleurs
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Couleur principale</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={campaign.design?.primaryColor || '#841b60'}
                onChange={(e) => handleDesignChange('primaryColor', e.target.value)}
                className="w-10 h-10 rounded border border-gray-300"
              />
              <input
                type="text"
                value={campaign.design?.primaryColor || '#841b60'}
                onChange={(e) => handleDesignChange('primaryColor', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Couleur des boutons</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={campaign.design?.buttonColor || '#841b60'}
                onChange={(e) => handleDesignChange('buttonColor', e.target.value)}
                className="w-10 h-10 rounded border border-gray-300"
              />
              <input
                type="text"
                value={campaign.design?.buttonColor || '#841b60'}
                onChange={(e) => handleDesignChange('buttonColor', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Couleur de fond</label>
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={campaign.design?.background || '#f8fafc'}
              onChange={(e) => handleDesignChange('background', e.target.value)}
              className="w-10 h-10 rounded border border-gray-300"
            />
            <input
              type="text"
              value={campaign.design?.background || '#f8fafc'}
              onChange={(e) => handleDesignChange('background', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Typography */}
      <div className="space-y-4">
        <h3 className="flex items-center text-lg font-semibold text-gray-900">
          <Type className="w-5 h-5 mr-2" />
          Typographie
        </h3>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Police de caractères</label>
          <select
            value={campaign.design?.fontFamily || 'Inter'}
            onChange={(e) => handleDesignChange('fontFamily', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
          >
            {fontOptions.map((font) => (
              <option key={font.value} value={font.value}>
                {font.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Couleur du texte</label>
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={campaign.design?.titleColor || '#000000'}
              onChange={(e) => handleDesignChange('titleColor', e.target.value)}
              className="w-10 h-10 rounded border border-gray-300"
            />
            <input
              type="text"
              value={campaign.design?.titleColor || '#000000'}
              onChange={(e) => handleDesignChange('titleColor', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Borders */}
      <div className="space-y-4">
        <h3 className="flex items-center text-lg font-semibold text-gray-900">
          <Square className="w-5 h-5 mr-2" />
          Bordures
        </h3>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Rayon des bordures</label>
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={parseFloat(campaign.design?.borderRadius || '0.5')}
            onChange={(e) => handleDesignChange('borderRadius', e.target.value + 'rem')}
            className="w-full"
          />
          <div className="text-sm text-gray-500">
            {campaign.design?.borderRadius || '0.5rem'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernDesignTab;
