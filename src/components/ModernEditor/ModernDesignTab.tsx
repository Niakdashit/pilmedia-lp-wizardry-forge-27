
import React from 'react';
import { Palette, Type, Image, Eye, EyeOff, Layout, AlignCenter, MoreHorizontal } from 'lucide-react';
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

  const handleCustomTextChange = (field: string, value: any) => {
    setCampaign((prev: any) => ({
      ...prev,
      design: {
        ...prev.design,
        customText: {
          ...prev.design.customText,
          [field]: value
        }
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

  const positionOptions = [
    { value: 'top', label: 'Haut' },
    { value: 'center', label: 'Centre' },
    { value: 'bottom', label: 'Bas' },
    { value: 'left', label: 'Gauche' },
    { value: 'right', label: 'Droite' }
  ];

  const sizeOptions = [
    { value: 'small', label: 'Petit' },
    { value: 'medium', label: 'Moyen' },
    { value: 'large', label: 'Grand' }
  ];

  const customText = campaign.design?.customText || {
    enabled: false,
    text: 'Texte personnalisé',
    position: 'top',
    size: 'medium',
    color: '#000000',
    showFrame: false,
    frameColor: '#ffffff',
    frameBorderColor: '#e5e7eb'
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Design et apparence</h2>
        <p className="text-sm text-gray-600">
          Personnalisez l'apparence visuelle de votre campagne
        </p>
      </div>

      {/* SECTION HEADER */}
      <div className="space-y-6 p-6 bg-gray-50 rounded-lg border">
        <h3 className="flex items-center text-xl font-semibold text-gray-900">
          <Layout className="w-6 h-6 mr-3" />
          Header
        </h3>
        
        {/* Texte personnalisé */}
        <div className="space-y-4">
          <h4 className="flex items-center text-lg font-medium text-gray-800">
            <Type className="w-5 h-5 mr-2" />
            Texte personnalisé
          </h4>
          
          {/* Activer/Désactiver le texte personnalisé */}
          <div className="space-y-2">
            <label className="flex items-center justify-between">
              <span className="flex items-center text-sm font-medium text-gray-700">
                {customText.enabled ? <Eye className="w-4 h-4 mr-2" /> : <EyeOff className="w-4 h-4 mr-2" />}
                Afficher un texte personnalisé
              </span>
              <button
                onClick={() => handleCustomTextChange('enabled', !customText.enabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  customText.enabled ? 'bg-[#841b60]' : 'bg-gray-200'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  customText.enabled ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </label>
          </div>

          {customText.enabled && (
            <>
              {/* Contenu du texte */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Contenu du texte</label>
                <textarea
                  value={customText.text}
                  onChange={(e) => handleCustomTextChange('text', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
                  rows={3}
                  placeholder="Entrez votre texte personnalisé"
                />
              </div>

              {/* Position du texte */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Position du texte</label>
                <div className="grid grid-cols-3 gap-2">
                  {positionOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleCustomTextChange('position', option.value)}
                      className={`p-2 text-xs rounded border transition-colors ${
                        customText.position === option.value
                          ? 'bg-[#841b60] text-white border-[#841b60]'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-[#841b60]'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Taille du texte */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Taille du texte</label>
                <div className="grid grid-cols-3 gap-2">
                  {sizeOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleCustomTextChange('size', option.value)}
                      className={`p-2 text-xs rounded border transition-colors ${
                        customText.size === option.value
                          ? 'bg-[#841b60] text-white border-[#841b60]'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-[#841b60]'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Couleur du texte */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Couleur du texte</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={customText.color}
                    onChange={(e) => handleCustomTextChange('color', e.target.value)}
                    className="w-10 h-10 rounded border border-gray-300"
                  />
                  <input
                    type="text"
                    value={customText.color}
                    onChange={(e) => handleCustomTextChange('color', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Cadre de contraste */}
              <div className="space-y-2">
                <label className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    Afficher un cadre de contraste
                  </span>
                  <button
                    onClick={() => handleCustomTextChange('showFrame', !customText.showFrame)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      customText.showFrame ? 'bg-[#841b60]' : 'bg-gray-200'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      customText.showFrame ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </label>
              </div>

              {customText.showFrame && (
                <>
                  {/* Couleur du fond du cadre */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Couleur du fond du cadre</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={customText.frameColor}
                        onChange={(e) => handleCustomTextChange('frameColor', e.target.value)}
                        className="w-10 h-10 rounded border border-gray-300"
                      />
                      <input
                        type="text"
                        value={customText.frameColor}
                        onChange={(e) => handleCustomTextChange('frameColor', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Couleur de la bordure du cadre */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Couleur de la bordure du cadre</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={customText.frameBorderColor}
                        onChange={(e) => handleCustomTextChange('frameBorderColor', e.target.value)}
                        className="w-10 h-10 rounded border border-gray-300"
                      />
                      <input
                        type="text"
                        value={customText.frameBorderColor}
                        onChange={(e) => handleCustomTextChange('frameBorderColor', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
                      />
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* SECTION CENTER */}
      <div className="space-y-6 p-6 bg-blue-50 rounded-lg border">
        <h3 className="flex items-center text-xl font-semibold text-gray-900">
          <AlignCenter className="w-6 h-6 mr-3" />
          Center
        </h3>

        {/* Image de fond */}
        <div className="space-y-4">
          <h4 className="flex items-center text-lg font-medium text-gray-800">
            <Image className="w-5 h-5 mr-2" />
            Image de fond
          </h4>
          
          <ImageUpload
            value={campaign.design?.backgroundImage || ''}
            onChange={(value) => handleDesignChange('backgroundImage', value)}
            label="Image de fond de la campagne"
          />
        </div>

        {/* Couleurs */}
        <div className="space-y-4">
          <h4 className="flex items-center text-lg font-medium text-gray-800">
            <Palette className="w-5 h-5 mr-2" />
            Couleurs
          </h4>
          
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
          <h4 className="flex items-center text-lg font-medium text-gray-800">
            <Type className="w-5 h-5 mr-2" />
            Typographie
          </h4>
          
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
      </div>

      {/* SECTION FOOTER */}
      <div className="space-y-6 p-6 bg-green-50 rounded-lg border">
        <h3 className="flex items-center text-xl font-semibold text-gray-900">
          <MoreHorizontal className="w-6 h-6 mr-3" />
          Footer
        </h3>
        
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Configuration du pied de page (à venir)
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModernDesignTab;
