
import React from 'react';
import { Bold, Italic, Underline } from 'lucide-react';

interface ModernDesignTabProps {
  campaign: any;
  setCampaign: (campaign: any) => void;
}

const ModernDesignTab: React.FC<ModernDesignTabProps> = ({
  campaign,
  setCampaign
}) => {
  const design = campaign.design || {};
  const customText = design.customText || {};

  const handleCustomTextChange = (field: string, value: any) => {
    setCampaign({
      ...campaign,
      design: {
        ...design,
        customText: {
          ...customText,
          [field]: value
        }
      }
    });
  };

  const fontSizeOptions = [
    { value: 'xs', label: '10px' },
    { value: 'sm', label: '12px' },
    { value: 'base', label: '14px' },
    { value: 'lg', label: '16px' },
    { value: 'xl', label: '18px' },
    { value: '2xl', label: '20px' },
    { value: '3xl', label: '24px' },
    { value: '4xl', label: '28px' },
    { value: '5xl', label: '32px' },
    { value: '6xl', label: '36px' },
    { value: '7xl', label: '48px' },
    { value: '8xl', label: '60px' },
    { value: '9xl', label: '72px' }
  ];

  const fontFamilyOptions = [
    { value: 'Inter, sans-serif', label: 'Inter' },
    { value: 'Arial, sans-serif', label: 'Arial' },
    { value: 'Helvetica, sans-serif', label: 'Helvetica' },
    { value: 'Georgia, serif', label: 'Georgia' },
    { value: 'Times New Roman, serif', label: 'Times New Roman' },
    { value: 'Courier New, monospace', label: 'Courier New' },
    { value: 'Verdana, sans-serif', label: 'Verdana' },
    { value: 'Trebuchet MS, sans-serif', label: 'Trebuchet MS' },
    { value: 'Palatino, serif', label: 'Palatino' },
    { value: 'Impact, sans-serif', label: 'Impact' }
  ];

  const positionOptions = [
    { value: 'top', label: 'Haut' },
    { value: 'bottom', label: 'Bas' },
    { value: 'left', label: 'Gauche' },
    { value: 'right', label: 'Droite' },
    { value: 'center', label: 'Centre' }
  ];

  return (
    <div className="space-y-8 px-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-6">Design</h2>
      </div>

      {/* Background Settings */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Arrière-plan</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Couleur de fond
          </label>
          <input
            type="color"
            value={design.background || '#f8fafc'}
            onChange={(e) => setCampaign({
              ...campaign,
              design: { ...design, background: e.target.value }
            })}
            className="w-full h-10 rounded-lg border border-gray-300"
          />
        </div>
      </div>

      {/* Custom Text Settings */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Texte personnalisé</h3>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={customText.enabled || false}
              onChange={(e) => handleCustomTextChange('enabled', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {customText.enabled && (
          <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Texte
              </label>
              <input
                type="text"
                value={customText.text || 'Texte personnalisé'}
                onChange={(e) => handleCustomTextChange('text', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Entrez votre texte"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Police
              </label>
              <select
                value={customText.fontFamily || 'Inter, sans-serif'}
                onChange={(e) => handleCustomTextChange('fontFamily', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {fontFamilyOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Taille
              </label>
              <select
                value={customText.size || 'base'}
                onChange={(e) => handleCustomTextChange('size', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {fontSizeOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Style du texte
              </label>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => handleCustomTextChange('bold', !customText.bold)}
                  className={`flex items-center justify-center w-10 h-10 rounded-lg border-2 transition-colors ${
                    customText.bold 
                      ? 'border-blue-500 bg-blue-50 text-blue-600' 
                      : 'border-gray-300 bg-white text-gray-600 hover:border-gray-400'
                  }`}
                  title="Gras"
                >
                  <Bold className="w-4 h-4" />
                </button>
                
                <button
                  type="button"
                  onClick={() => handleCustomTextChange('italic', !customText.italic)}
                  className={`flex items-center justify-center w-10 h-10 rounded-lg border-2 transition-colors ${
                    customText.italic 
                      ? 'border-blue-500 bg-blue-50 text-blue-600' 
                      : 'border-gray-300 bg-white text-gray-600 hover:border-gray-400'
                  }`}
                  title="Italique"
                >
                  <Italic className="w-4 h-4" />
                </button>
                
                <button
                  type="button"
                  onClick={() => handleCustomTextChange('underline', !customText.underline)}
                  className={`flex items-center justify-center w-10 h-10 rounded-lg border-2 transition-colors ${
                    customText.underline 
                      ? 'border-blue-500 bg-blue-50 text-blue-600' 
                      : 'border-gray-300 bg-white text-gray-600 hover:border-gray-400'
                  }`}
                  title="Souligné"
                >
                  <Underline className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Couleur du texte
              </label>
              <input
                type="color"
                value={customText.color || '#000000'}
                onChange={(e) => handleCustomTextChange('color', e.target.value)}
                className="w-full h-10 rounded-lg border border-gray-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Position initiale
              </label>
              <select
                value={customText.position || 'top'}
                onChange={(e) => handleCustomTextChange('position', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {positionOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Vous pouvez ensuite déplacer le texte en le glissant dans l'aperçu
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Cadre de fond
                </label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={customText.showFrame || false}
                    onChange={(e) => handleCustomTextChange('showFrame', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {customText.showFrame && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Couleur du cadre
                    </label>
                    <input
                      type="color"
                      value={customText.frameColor || '#ffffff'}
                      onChange={(e) => handleCustomTextChange('frameColor', e.target.value)}
                      className="w-full h-8 rounded border border-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Couleur bordure
                    </label>
                    <input
                      type="color"
                      value={customText.frameBorderColor || '#e5e7eb'}
                      onChange={(e) => handleCustomTextChange('frameBorderColor', e.target.value)}
                      className="w-full h-8 rounded border border-gray-300"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModernDesignTab;
