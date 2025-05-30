import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Palette, Upload, Type, Frame, Plus, Trash2, Bold, Italic, Underline } from 'lucide-react';
import ImageUpload from '../common/ImageUpload';

interface ModernDesignTabProps {
  campaign: any;
  setCampaign: React.Dispatch<React.SetStateAction<any>>;
}

const ModernDesignTab: React.FC<ModernDesignTabProps> = ({
  campaign,
  setCampaign
}) => {
  const [openAccordions, setOpenAccordions] = useState<string[]>([]);

  const toggleAccordion = (id: string) => {
    setOpenAccordions(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const isOpen = (id: string) => openAccordions.includes(id);

  const updateDesign = (field: string, value: any) => {
    setCampaign((prev: any) => ({
      ...prev,
      design: {
        ...prev.design,
        [field]: value
      }
    }));
  };

  const updateHeaderText = (field: string, value: any) => {
    setCampaign((prev: any) => ({
      ...prev,
      design: {
        ...prev.design,
        headerText: {
          ...prev.design?.headerText,
          [field]: value
        }
      }
    }));
  };

  const updateFooterText = (field: string, value: any) => {
    setCampaign((prev: any) => ({
      ...prev,
      design: {
        ...prev.design,
        footerText: {
          ...prev.design?.footerText,
          [field]: value
        }
      }
    }));
  };

  const updateCroppedAreaText = (field: string, value: any) => {
    setCampaign((prev: any) => ({
      ...prev,
      design: {
        ...prev.design,
        croppedAreaText: {
          ...prev.design?.croppedAreaText,
          [field]: value
        }
      }
    }));
  };

  const addTextContent = (section: 'headerText' | 'footerText') => {
    const newContent = {
      id: Date.now().toString(),
      text: 'Nouveau texte',
      bold: false,
      italic: false,
      underline: false
    };

    setCampaign((prev: any) => ({
      ...prev,
      design: {
        ...prev.design,
        [section]: {
          ...prev.design?.[section],
          textContents: [
            ...(prev.design?.[section]?.textContents || []),
            newContent
          ]
        }
      }
    }));
  };

  const updateTextContent = (section: 'headerText' | 'footerText', index: number, field: string, value: any) => {
    setCampaign((prev: any) => {
      const textContents = [...(prev.design?.[section]?.textContents || [])];
      textContents[index] = { ...textContents[index], [field]: value };
      
      return {
        ...prev,
        design: {
          ...prev.design,
          [section]: {
            ...prev.design?.[section],
            textContents
          }
        }
      };
    });
  };

  const removeTextContent = (section: 'headerText' | 'footerText', index: number) => {
    setCampaign((prev: any) => {
      const textContents = (prev.design?.[section]?.textContents || []).filter((_: any, i: number) => i !== index);
      
      return {
        ...prev,
        design: {
          ...prev.design,
          [section]: {
            ...prev.design?.[section],
            textContents
          }
        }
      };
    });
  };

  const renderTextContentsEditor = (section: 'headerText' | 'footerText') => {
    const textContents = campaign.design?.[section]?.textContents || [];
    
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">Contenus texte</label>
          <button
            onClick={() => addTextContent(section)}
            className="flex items-center space-x-1 px-2 py-1 text-xs bg-[#841b60] text-white rounded hover:bg-[#6d164f] transition-colors"
          >
            <Plus className="w-3 h-3" />
            <span>Ajouter</span>
          </button>
        </div>
        
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {textContents.map((content: any, index: number) => (
            <div key={content.id || index} className="p-2 border border-gray-200 rounded space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-600">Texte {index + 1}</span>
                <button
                  onClick={() => removeTextContent(section, index)}
                  className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
              
              <textarea
                value={content.text || ''}
                onChange={(e) => updateTextContent(section, index, 'text', e.target.value)}
                rows={2}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#841b60] focus:border-transparent resize-none"
                placeholder="Votre texte..."
              />
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateTextContent(section, index, 'bold', !content.bold)}
                  className={`p-1 rounded text-xs ${content.bold ? 'bg-gray-200 text-gray-800' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <Bold className="w-3 h-3" />
                </button>
                <button
                  onClick={() => updateTextContent(section, index, 'italic', !content.italic)}
                  className={`p-1 rounded text-xs ${content.italic ? 'bg-gray-200 text-gray-800' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <Italic className="w-3 h-3" />
                </button>
                <button
                  onClick={() => updateTextContent(section, index, 'underline', !content.underline)}
                  className={`p-1 rounded text-xs ${content.underline ? 'bg-gray-200 text-gray-800' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <Underline className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {textContents.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            <p className="text-xs">Aucun contenu texte</p>
          </div>
        )}
      </div>
    );
  };

  const renderContrastFrameControls = (section: 'headerText' | 'footerText') => {
    const config = campaign.design?.[section];
    
    return (
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id={`${section}-frame`}
            checked={config?.showFrame || false}
            onChange={(e) => section === 'headerText' ? updateHeaderText('showFrame', e.target.checked) : updateFooterText('showFrame', e.target.checked)}
            className="rounded border-gray-300 text-[#841b60] focus:ring-[#841b60]"
          />
          <label htmlFor={`${section}-frame`} className="text-sm font-medium text-gray-700">
            Afficher le cadre de contraste
          </label>
        </div>

        {config?.showFrame && (
          <div className="ml-6 space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Couleur du cadre</label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={config.frameColor || '#ffffff'}
                  onChange={(e) => section === 'headerText' ? updateHeaderText('frameColor', e.target.value) : updateFooterText('frameColor', e.target.value)}
                  className="w-8 h-8 rounded border border-gray-300"
                />
                <input
                  type="text"
                  value={config.frameColor || '#ffffff'}
                  onChange={(e) => section === 'headerText' ? updateHeaderText('frameColor', e.target.value) : updateFooterText('frameColor', e.target.value)}
                  className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#841b60] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Couleur de bordure</label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={config.frameBorderColor || '#e5e7eb'}
                  onChange={(e) => section === 'headerText' ? updateHeaderText('frameBorderColor', e.target.value) : updateFooterText('frameBorderColor', e.target.value)}
                  className="w-8 h-8 rounded border border-gray-300"
                />
                <input
                  type="text"
                  value={config.frameBorderColor || '#e5e7eb'}
                  onChange={(e) => section === 'headerText' ? updateHeaderText('frameBorderColor', e.target.value) : updateFooterText('frameBorderColor', e.target.value)}
                  className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#841b60] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Espacement interne</label>
              <input
                type="range"
                min="8"
                max="32"
                value={config.framePadding || 12}
                onChange={(e) => section === 'headerText' ? updateHeaderText('framePadding', parseInt(e.target.value)) : updateFooterText('framePadding', parseInt(e.target.value))}
                className="w-full"
              />
              <div className="text-xs text-gray-500 text-center">{config.framePadding || 12}px</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Coins arrondis</label>
              <input
                type="range"
                min="0"
                max="20"
                value={config.frameBorderRadius || 8}
                onChange={(e) => section === 'headerText' ? updateHeaderText('frameBorderRadius', parseInt(e.target.value)) : updateFooterText('frameBorderRadius', parseInt(e.target.value))}
                className="w-full"
              />
              <div className="text-xs text-gray-500 text-center">{config.frameBorderRadius || 8}px</div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Global Background */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Arrière-plan global</h3>
        
        <div>
          <ImageUpload
            label="Image de fond"
            value={campaign.design?.backgroundImage || ''}
            onChange={(value) => updateDesign('backgroundImage', value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Couleur de fond</label>
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={campaign.design?.background || '#f8fafc'}
              onChange={(e) => updateDesign('background', e.target.value)}
              className="w-10 h-10 rounded border border-gray-300"
            />
            <input
              type="text"
              value={campaign.design?.background || '#f8fafc'}
              onChange={(e) => updateDesign('background', e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Header Text Accordion */}
      <div className="border border-gray-200 rounded-lg">
        <button
          onClick={() => toggleAccordion('header')}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-2">
            <Type className="w-4 h-4 text-[#841b60]" />
            <span className="font-medium text-gray-900">Texte d'en-tête</span>
          </div>
          {isOpen('header') ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
        
        {isOpen('header') && (
          <div className="p-4 border-t border-gray-200 space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="header-enabled"
                checked={campaign.design?.headerText?.enabled || false}
                onChange={(e) => updateHeaderText('enabled', e.target.checked)}
                className="rounded border-gray-300 text-[#841b60] focus:ring-[#841b60]"
              />
              <label htmlFor="header-enabled" className="text-sm font-medium text-gray-700">
                Activer le texte d'en-tête
              </label>
            </div>

            {campaign.design?.headerText?.enabled && (
              <div className="space-y-4">
                {renderTextContentsEditor('headerText')}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Taille du texte</label>
                  <select
                    value={campaign.design?.headerText?.size || 'medium'}
                    onChange={(e) => updateHeaderText('size', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
                  >
                    <option value="small">Petit</option>
                    <option value="medium">Moyen</option>
                    <option value="large">Grand</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Couleur du texte</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={campaign.design?.headerText?.color || '#000000'}
                      onChange={(e) => updateHeaderText('color', e.target.value)}
                      className="w-8 h-8 rounded border border-gray-300"
                    />
                    <input
                      type="text"
                      value={campaign.design?.headerText?.color || '#000000'}
                      onChange={(e) => updateHeaderText('color', e.target.value)}
                      className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#841b60] focus:border-transparent"
                    />
                  </div>
                </div>

                {renderContrastFrameControls('headerText')}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Center Content Accordion */}
      <div className="border border-gray-200 rounded-lg">
        <button
          onClick={() => toggleAccordion('center')}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-2">
            <Frame className="w-4 h-4 text-[#841b60]" />
            <span className="font-medium text-gray-900">Contenu central</span>
          </div>
          {isOpen('center') ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
        
        {isOpen('center') && (
          <div className="p-4 border-t border-gray-200 space-y-4">
            <div>
              <ImageUpload
                label="Logo central"
                value={campaign.design?.centerLogo || ''}
                onChange={(value) => updateDesign('centerLogo', value)}
              />
            </div>

            {/* Cropped Area Text for mobile/tablet wheel */}
            {campaign.type === 'wheel' && (
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-700">Texte zone rognée (mobile/tablette)</h4>
                <p className="text-xs text-gray-500">
                  Ce texte apparaît dans la zone visible quand la roue est positionnée à gauche ou droite sur mobile/tablette.
                </p>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="cropped-text-enabled"
                    checked={campaign.design?.croppedAreaText?.enabled || false}
                    onChange={(e) => updateCroppedAreaText('enabled', e.target.checked)}
                    className="rounded border-gray-300 text-[#841b60] focus:ring-[#841b60]"
                  />
                  <label htmlFor="cropped-text-enabled" className="text-sm font-medium text-gray-700">
                    Activer le texte pour zone rognée
                  </label>
                </div>

                {campaign.design?.croppedAreaText?.enabled && (
                  <div className="space-y-3">
                    <textarea
                      value={campaign.design?.croppedAreaText?.text || ''}
                      onChange={(e) => updateCroppedAreaText('text', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent resize-none"
                      placeholder="Texte pour la zone visible..."
                    />
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Taille du texte</label>
                      <select
                        value={campaign.design?.croppedAreaText?.size || 'medium'}
                        onChange={(e) => updateCroppedAreaText('size', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
                      >
                        <option value="small">Petit</option>
                        <option value="medium">Moyen</option>
                        <option value="large">Grand</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Couleur du texte</label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="color"
                          value={campaign.design?.croppedAreaText?.color || '#000000'}
                          onChange={(e) => updateCroppedAreaText('color', e.target.value)}
                          className="w-8 h-8 rounded border border-gray-300"
                        />
                        <input
                          type="text"
                          value={campaign.design?.croppedAreaText?.color || '#000000'}
                          onChange={(e) => updateCroppedAreaText('color', e.target.value)}
                          className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#841b60] focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateCroppedAreaText('bold', !campaign.design?.croppedAreaText?.bold)}
                        className={`p-2 rounded text-sm ${campaign.design?.croppedAreaText?.bold ? 'bg-gray-200 text-gray-800' : 'text-gray-600 hover:bg-gray-100'}`}
                      >
                        <Bold className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => updateCroppedAreaText('italic', !campaign.design?.croppedAreaText?.italic)}
                        className={`p-2 rounded text-sm ${campaign.design?.croppedAreaText?.italic ? 'bg-gray-200 text-gray-800' : 'text-gray-600 hover:bg-gray-100'}`}
                      >
                        <Italic className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => updateCroppedAreaText('underline', !campaign.design?.croppedAreaText?.underline)}
                        className={`p-2 rounded text-sm ${campaign.design?.croppedAreaText?.underline ? 'bg-gray-200 text-gray-800' : 'text-gray-600 hover:bg-gray-100'}`}
                      >
                        <Underline className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Text Accordion */}
      <div className="border border-gray-200 rounded-lg">
        <button
          onClick={() => toggleAccordion('footer')}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-2">
            <Type className="w-4 h-4 text-[#841b60]" />
            <span className="font-medium text-gray-900">Texte de pied de page</span>
          </div>
          {isOpen('footer') ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
        
        {isOpen('footer') && (
          <div className="p-4 border-t border-gray-200 space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="footer-enabled"
                checked={campaign.design?.footerText?.enabled || false}
                onChange={(e) => updateFooterText('enabled', e.target.checked)}
                className="rounded border-gray-300 text-[#841b60] focus:ring-[#841b60]"
              />
              <label htmlFor="footer-enabled" className="text-sm font-medium text-gray-700">
                Activer le texte de pied de page
              </label>
            </div>

            {campaign.design?.footerText?.enabled && (
              <div className="space-y-4">
                {renderTextContentsEditor('footerText')}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Taille du texte</label>
                  <select
                    value={campaign.design?.footerText?.size || 'medium'}
                    onChange={(e) => updateFooterText('size', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
                  >
                    <option value="small">Petit</option>
                    <option value="medium">Moyen</option>
                    <option value="large">Grand</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Couleur du texte</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={campaign.design?.footerText?.color || '#000000'}
                      onChange={(e) => updateFooterText('color', e.target.value)}
                      className="w-8 h-8 rounded border border-gray-300"
                    />
                    <input
                      type="text"
                      value={campaign.design?.footerText?.color || '#000000'}
                      onChange={(e) => updateFooterText('color', e.target.value)}
                      className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#841b60] focus:border-transparent"
                    />
                  </div>
                </div>

                {renderContrastFrameControls('footerText')}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModernDesignTab;
