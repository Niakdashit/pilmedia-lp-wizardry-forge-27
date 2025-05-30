import React, { useState } from 'react';
import { Type, Image, Eye, EyeOff, Layout, AlignCenter, MoreHorizontal, ChevronDown, ChevronUp, Plus, Trash2, Bold, Italic, Underline } from 'lucide-react';
import ImageUpload from '../common/ImageUpload';

interface ModernDesignTabProps {
  campaign: any;
  setCampaign: React.Dispatch<React.SetStateAction<any>>;
}

const ModernDesignTab: React.FC<ModernDesignTabProps> = ({
  campaign,
  setCampaign
}) => {
  // Set accordions to be collapsed by default
  const [headerExpanded, setHeaderExpanded] = useState(false);
  const [centerExpanded, setCenterExpanded] = useState(false);
  const [footerExpanded, setFooterExpanded] = useState(false);

  const addTextContent = (section: 'header' | 'footer') => {
    const newContent = {
      id: `text-${Date.now()}`,
      text: 'Nouveau texte',
      bold: false,
      italic: false,
      underline: false
    };

    setCampaign((prev: any) => ({
      ...prev,
      design: {
        ...prev.design,
        [`${section}Text`]: {
          ...prev.design?.[`${section}Text`],
          textContents: [
            ...(prev.design?.[`${section}Text`]?.textContents || []),
            newContent
          ]
        }
      }
    }));
  };

  const updateTextContent = (section: 'header' | 'footer', index: number, field: string, value: any) => {
    setCampaign((prev: any) => {
      const textContents = [...(prev.design?.[`${section}Text`]?.textContents || [])];
      textContents[index] = { ...textContents[index], [field]: value };
      
      return {
        ...prev,
        design: {
          ...prev.design,
          [`${section}Text`]: {
            ...prev.design?.[`${section}Text`],
            textContents
          }
        }
      };
    });
  };

  const removeTextContent = (section: 'header' | 'footer', index: number) => {
    setCampaign((prev: any) => {
      const textContents = (prev.design?.[`${section}Text`]?.textContents || []).filter((_: any, i: number) => i !== index);
      
      return {
        ...prev,
        design: {
          ...prev.design,
          [`${section}Text`]: {
            ...prev.design?.[`${section}Text`],
            textContents
          }
        }
      };
    });
  };

  const renderTextContentEditor = (section: 'header' | 'footer') => {
    const textContents = campaign.design?.[`${section}Text`]?.textContents || [];
    
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Contenus texte</span>
          <button
            onClick={() => addTextContent(section)}
            className="flex items-center space-x-1 px-2 py-1 text-xs bg-[#841b60] text-white rounded hover:bg-[#6d164f] transition-colors"
          >
            <Plus className="w-3 h-3" />
            <span>Ajouter</span>
          </button>
        </div>
        
        {textContents.map((content: any, index: number) => (
          <div key={content.id || index} className="p-3 border border-gray-200 rounded-lg space-y-2">
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
              placeholder="Votre texte ici..."
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#841b60] focus:border-transparent resize-none"
              rows={2}
            />
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => updateTextContent(section, index, 'bold', !content.bold)}
                className={`p-1 rounded ${content.bold ? 'bg-[#841b60] text-white' : 'bg-gray-100 text-gray-600'} hover:opacity-80 transition-colors`}
              >
                <Bold className="w-3 h-3" />
              </button>
              <button
                onClick={() => updateTextContent(section, index, 'italic', !content.italic)}
                className={`p-1 rounded ${content.italic ? 'bg-[#841b60] text-white' : 'bg-gray-100 text-gray-600'} hover:opacity-80 transition-colors`}
              >
                <Italic className="w-3 h-3" />
              </button>
              <button
                onClick={() => updateTextContent(section, index, 'underline', !content.underline)}
                className={`p-1 rounded ${content.underline ? 'bg-[#841b60] text-white' : 'bg-gray-100 text-gray-600'} hover:opacity-80 transition-colors`}
              >
                <Underline className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h3 className="text-xl font-bold text-gray-900">Design</h3>
        <p className="text-sm text-gray-600">Personnalisez l'apparence de votre campagne</p>
      </div>

      {/* Arrière-plan */}
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-gray-800">Arrière-plan</h4>
        
        {/* Couleur d'arrière-plan */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Couleur de fond</label>
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={campaign.design?.background || '#f8fafc'}
              onChange={(e) => setCampaign((prev: any) => ({
                ...prev,
                design: { ...prev.design, background: e.target.value }
              }))}
              className="w-10 h-10 rounded border border-gray-300"
            />
            <input
              type="text"
              value={campaign.design?.background || '#f8fafc'}
              onChange={(e) => setCampaign((prev: any) => ({
                ...prev,
                design: { ...prev.design, background: e.target.value }
              }))}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
            />
          </div>
        </div>

        {/* Image d'arrière-plan */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Image d'arrière-plan</label>
          <ImageUpload
            value={campaign.design?.backgroundImage || ''}
            onChange={(value) => setCampaign((prev: any) => ({
              ...prev,
              design: { ...prev.design, backgroundImage: value }
            }))}
            label="Sélectionner une image de fond"
          />
          {campaign.design?.backgroundImage && (
            <button
              onClick={() => setCampaign((prev: any) => ({
                ...prev,
                design: { ...prev.design, backgroundImage: '' }
              }))}
              className="text-sm text-red-600 hover:text-red-800"
            >
              Supprimer l'image de fond
            </button>
          )}
        </div>
      </div>

      {/* Couleurs */}
      <div className="space-y-4">
        <h4 className="flex items-center text-lg font-medium text-gray-800">
          Couleurs
        </h4>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Couleur principale</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={campaign.design?.primaryColor || '#841b60'}
                onChange={(e) => setCampaign((prev: any) => ({
                  ...prev,
                  design: { ...prev.design, primaryColor: e.target.value }
                }))}
                className="w-8 h-8 rounded border border-gray-300"
              />
              <input
                type="text"
                value={campaign.design?.primaryColor || '#841b60'}
                onChange={(e) => setCampaign((prev: any) => ({
                  ...prev,
                  design: { ...prev.design, primaryColor: e.target.value }
                }))}
                className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#841b60] focus:border-transparent"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Couleur secondaire</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={campaign.design?.secondaryColor || '#ffffff'}
                onChange={(e) => setCampaign((prev: any) => ({
                  ...prev,
                  design: { ...prev.design, secondaryColor: e.target.value }
                }))}
                className="w-8 h-8 rounded border border-gray-300"
              />
              <input
                type="text"
                value={campaign.design?.secondaryColor || '#ffffff'}
                onChange={(e) => setCampaign((prev: any) => ({
                  ...prev,
                  design: { ...prev.design, secondaryColor: e.target.value }
                }))}
                className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#841b60] focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Police */}
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-gray-800">Police</h4>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Famille de police</label>
          <select
            value={campaign.design?.fontFamily || 'Inter'}
            onChange={(e) => setCampaign((prev: any) => ({
              ...prev,
              design: { ...prev.design, fontFamily: e.target.value }
            }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
          >
            <option value="Inter">Inter</option>
            <option value="Arial">Arial</option>
            <option value="Helvetica">Helvetica</option>
            <option value="Georgia">Georgia</option>
            <option value="Times New Roman">Times New Roman</option>
          </select>
        </div>
      </div>

      {/* Section En-tête */}
      <div className="border border-gray-200 rounded-lg">
        <button
          onClick={() => setHeaderExpanded(!headerExpanded)}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
        >
          <h4 className="text-lg font-medium text-gray-800">En-tête</h4>
          {headerExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
        
        {headerExpanded && (
          <div className="p-4 border-t border-gray-200 space-y-4">
            {/* Bannière d'en-tête */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <Image className="w-4 h-4 mr-2" />
                  Bannière d'en-tête
                </label>
                <button
                  onClick={() => setCampaign((prev: any) => ({
                    ...prev,
                    design: {
                      ...prev.design,
                      headerBanner: {
                        ...prev.design?.headerBanner,
                        enabled: !prev.design?.headerBanner?.enabled
                      }
                    }
                  }))}
                  className={`p-1 rounded ${campaign.design?.headerBanner?.enabled ? 'text-[#841b60]' : 'text-gray-400'}`}
                >
                  {campaign.design?.headerBanner?.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>
              
              {campaign.design?.headerBanner?.enabled && (
                <div className="space-y-3 pl-6 border-l-2 border-gray-200">
                  <ImageUpload
                    value={campaign.design?.headerBanner?.image || ''}
                    onChange={(value) => setCampaign((prev: any) => ({
                      ...prev,
                      design: {
                        ...prev.design,
                        headerBanner: { ...prev.design?.headerBanner, image: value }
                      }
                    }))}
                    label="Image de bannière"
                  />
                  
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-600">Hauteur (px)</label>
                    <input
                      type="number"
                      value={campaign.design?.headerBanner?.height || 120}
                      onChange={(e) => setCampaign((prev: any) => ({
                        ...prev,
                        design: {
                          ...prev.design,
                          headerBanner: { ...prev.design?.headerBanner, height: e.target.value }
                        }
                      }))}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#841b60] focus:border-transparent"
                      min="50"
                      max="300"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="headerOverlay"
                      checked={campaign.design?.headerBanner?.overlay || false}
                      onChange={(e) => setCampaign((prev: any) => ({
                        ...prev,
                        design: {
                          ...prev.design,
                          headerBanner: { ...prev.design?.headerBanner, overlay: e.target.checked }
                        }
                      }))}
                      className="rounded border-gray-300 text-[#841b60] focus:ring-[#841b60]"
                    />
                    <label htmlFor="headerOverlay" className="text-xs text-gray-600">Overlay sombre</label>
                  </div>
                </div>
              )}
            </div>

            {/* Texte personnalisé d'en-tête */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <Type className="w-4 h-4 mr-2" />
                  Texte personnalisé
                </label>
                <button
                  onClick={() => setCampaign((prev: any) => ({
                    ...prev,
                    design: {
                      ...prev.design,
                      headerText: {
                        ...prev.design?.headerText,
                        enabled: !prev.design?.headerText?.enabled
                      }
                    }
                  }))}
                  className={`p-1 rounded ${campaign.design?.headerText?.enabled ? 'text-[#841b60]' : 'text-gray-400'}`}
                >
                  {campaign.design?.headerText?.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>
              
              {campaign.design?.headerText?.enabled && (
                <div className="space-y-3 pl-6 border-l-2 border-gray-200">
                  {renderTextContentEditor('header')}
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-gray-600">Taille</label>
                      <select
                        value={campaign.design?.headerText?.size || 'medium'}
                        onChange={(e) => setCampaign((prev: any) => ({
                          ...prev,
                          design: {
                            ...prev.design,
                            headerText: { ...prev.design?.headerText, size: e.target.value }
                          }
                        }))}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#841b60] focus:border-transparent"
                      >
                        <option value="small">Petit</option>
                        <option value="medium">Moyen</option>
                        <option value="large">Grand</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-gray-600">Couleur</label>
                      <input
                        type="color"
                        value={campaign.design?.headerText?.color || '#000000'}
                        onChange={(e) => setCampaign((prev: any) => ({
                          ...prev,
                          design: {
                            ...prev.design,
                            headerText: { ...prev.design?.headerText, color: e.target.value }
                          }
                        }))}
                        className="w-full h-8 rounded border border-gray-300"
                      />
                    </div>
                  </div>
                  
                  {/* Cadre de contraste */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="headerFrame"
                        checked={campaign.design?.headerText?.showFrame || false}
                        onChange={(e) => setCampaign((prev: any) => ({
                          ...prev,
                          design: {
                            ...prev.design,
                            headerText: { ...prev.design?.headerText, showFrame: e.target.checked }
                          }
                        }))}
                        className="rounded border-gray-300 text-[#841b60] focus:ring-[#841b60]"
                      />
                      <label htmlFor="headerFrame" className="text-xs text-gray-600">Afficher le cadre de contraste</label>
                    </div>
                    
                    {campaign.design?.headerText?.showFrame && (
                      <div className="grid grid-cols-2 gap-3 pl-4 border-l-2 border-gray-100">
                        <div className="space-y-2">
                          <label className="text-xs font-medium text-gray-600">Couleur du cadre</label>
                          <input
                            type="color"
                            value={campaign.design?.headerText?.frameColor || '#ffffff'}
                            onChange={(e) => setCampaign((prev: any) => ({
                              ...prev,
                              design: {
                                ...prev.design,
                                headerText: { ...prev.design?.headerText, frameColor: e.target.value }
                              }
                            }))}
                            className="w-full h-8 rounded border border-gray-300"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-xs font-medium text-gray-600">Bordure du cadre</label>
                          <input
                            type="color"
                            value={campaign.design?.headerText?.frameBorderColor || '#e5e7eb'}
                            onChange={(e) => setCampaign((prev: any) => ({
                              ...prev,
                              design: {
                                ...prev.design,
                                headerText: { ...prev.design?.headerText, frameBorderColor: e.target.value }
                              }
                            }))}
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
        )}
      </div>

      {/* Section Centre */}
      <div className="border border-gray-200 rounded-lg">
        <button
          onClick={() => setCenterExpanded(!centerExpanded)}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
        >
          <h4 className="text-lg font-medium text-gray-800">Centre</h4>
          {centerExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
        
        {centerExpanded && (
          <div className="p-4 border-t border-gray-200 space-y-4">
            {/* Texte personnalisé central (legacy) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <Type className="w-4 h-4 mr-2" />
                  Texte personnalisé central
                </label>
                <button
                  onClick={() => setCampaign((prev: any) => ({
                    ...prev,
                    design: {
                      ...prev.design,
                      customText: {
                        ...prev.design?.customText,
                        enabled: !prev.design?.customText?.enabled
                      }
                    }
                  }))}
                  className={`p-1 rounded ${campaign.design?.customText?.enabled ? 'text-[#841b60]' : 'text-gray-400'}`}
                >
                  {campaign.design?.customText?.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>
              
              {campaign.design?.customText?.enabled && (
                <div className="space-y-3 pl-6 border-l-2 border-gray-200">
                  <textarea
                    value={campaign.design?.customText?.text || ''}
                    onChange={(e) => setCampaign((prev: any) => ({
                      ...prev,
                      design: {
                        ...prev.design,
                        customText: { ...prev.design?.customText, text: e.target.value }
                      }
                    }))}
                    placeholder="Votre texte personnalisé..."
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#841b60] focus:border-transparent resize-none"
                    rows={3}
                  />
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-gray-600">Position</label>
                      <select
                        value={campaign.design?.customText?.position || 'center'}
                        onChange={(e) => setCampaign((prev: any) => ({
                          ...prev,
                          design: {
                            ...prev.design,
                            customText: { ...prev.design?.customText, position: e.target.value }
                          }
                        }))}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#841b60] focus:border-transparent"
                      >
                        <option value="top">Haut</option>
                        <option value="center">Centre</option>
                        <option value="bottom">Bas</option>
                        <option value="left">Gauche</option>
                        <option value="right">Droite</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-gray-600">Taille</label>
                      <select
                        value={campaign.design?.customText?.size || 'medium'}
                        onChange={(e) => setCampaign((prev: any) => ({
                          ...prev,
                          design: {
                            ...prev.design,
                            customText: { ...prev.design?.customText, size: e.target.value }
                          }
                        }))}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#841b60] focus:border-transparent"
                      >
                        <option value="small">Petit</option>
                        <option value="medium">Moyen</option>
                        <option value="large">Grand</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-600">Couleur du texte</label>
                    <input
                      type="color"
                      value={campaign.design?.customText?.color || '#000000'}
                      onChange={(e) => setCampaign((prev: any) => ({
                        ...prev,
                        design: {
                          ...prev.design,
                          customText: { ...prev.design?.customText, color: e.target.value }
                        }
                      }))}
                      className="w-full h-8 rounded border border-gray-300"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="customTextFrame"
                        checked={campaign.design?.customText?.showFrame || false}
                        onChange={(e) => setCampaign((prev: any) => ({
                          ...prev,
                          design: {
                            ...prev.design,
                            customText: { ...prev.design?.customText, showFrame: e.target.checked }
                          }
                        }))}
                        className="rounded border-gray-300 text-[#841b60] focus:ring-[#841b60]"
                      />
                      <label htmlFor="customTextFrame" className="text-xs text-gray-600">Afficher le cadre de contraste</label>
                    </div>
                    
                    {campaign.design?.customText?.showFrame && (
                      <div className="grid grid-cols-2 gap-3 pl-4 border-l-2 border-gray-100">
                        <div className="space-y-2">
                          <label className="text-xs font-medium text-gray-600">Couleur du cadre</label>
                          <input
                            type="color"
                            value={campaign.design?.customText?.frameColor || '#ffffff'}
                            onChange={(e) => setCampaign((prev: any) => ({
                              ...prev,
                              design: {
                                ...prev.design,
                                customText: { ...prev.design?.customText, frameColor: e.target.value }
                              }
                            }))}
                            className="w-full h-8 rounded border border-gray-300"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-xs font-medium text-gray-600">Bordure du cadre</label>
                          <input
                            type="color"
                            value={campaign.design?.customText?.frameBorderColor || '#e5e7eb'}
                            onChange={(e) => setCampaign((prev: any) => ({
                              ...prev,
                              design: {
                                ...prev.design,
                                customText: { ...prev.design?.customText, frameBorderColor: e.target.value }
                              }
                            }))}
                            className="w-full h-8 rounded border border-gray-300"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Zone coupée pour la roue (mobile/tablet) */}
            {campaign.type === 'wheel' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <Layout className="w-4 h-4 mr-2" />
                    Texte zone coupée (Mobile/Tablet)
                  </label>
                  <button
                    onClick={() => setCampaign((prev: any) => ({
                      ...prev,
                      design: {
                        ...prev.design,
                        croppedAreaText: {
                          ...prev.design?.croppedAreaText,
                          enabled: !prev.design?.croppedAreaText?.enabled
                        }
                      }
                    }))}
                    className={`p-1 rounded ${campaign.design?.croppedAreaText?.enabled ? 'text-[#841b60]' : 'text-gray-400'}`}
                  >
                    {campaign.design?.croppedAreaText?.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                </div>
                
                {campaign.design?.croppedAreaText?.enabled && (
                  <div className="space-y-3 pl-6 border-l-2 border-gray-200">
                    <div className="p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-800">
                      Ce texte s'affiche uniquement sur mobile/tablet quand la roue est positionnée à gauche ou à droite
                    </div>
                    
                    <textarea
                      value={campaign.design?.croppedAreaText?.text || 'Texte personnalisé'}
                      onChange={(e) => setCampaign((prev: any) => ({
                        ...prev,
                        design: {
                          ...prev.design,
                          croppedAreaText: { ...prev.design?.croppedAreaText, text: e.target.value }
                        }
                      }))}
                      placeholder="Texte à afficher dans la zone coupée..."
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#841b60] focus:border-transparent resize-none"
                      rows={2}
                    />
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-gray-600">Taille</label>
                        <select
                          value={campaign.design?.croppedAreaText?.size || 'medium'}
                          onChange={(e) => setCampaign((prev: any) => ({
                            ...prev,
                            design: {
                              ...prev.design,
                              croppedAreaText: { ...prev.design?.croppedAreaText, size: e.target.value }
                            }
                          }))}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#841b60] focus:border-transparent"
                        >
                          <option value="small">Petit</option>
                          <option value="medium">Moyen</option>
                          <option value="large">Grand</option>
                        </select>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-gray-600">Couleur</label>
                        <input
                          type="color"
                          value={campaign.design?.croppedAreaText?.color || '#000000'}
                          onChange={(e) => setCampaign((prev: any) => ({
                            ...prev,
                            design: {
                              ...prev.design,
                              croppedAreaText: { ...prev.design?.croppedAreaText, color: e.target.value }
                            }
                          }))}
                          className="w-full h-8 rounded border border-gray-300"
                        />
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setCampaign((prev: any) => ({
                          ...prev,
                          design: {
                            ...prev.design,
                            croppedAreaText: { 
                              ...prev.design?.croppedAreaText, 
                              bold: !prev.design?.croppedAreaText?.bold 
                            }
                          }
                        }))}
                        className={`p-1 rounded text-xs ${campaign.design?.croppedAreaText?.bold ? 'bg-[#841b60] text-white' : 'bg-gray-100 text-gray-600'} hover:opacity-80 transition-colors`}
                      >
                        <Bold className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => setCampaign((prev: any) => ({
                          ...prev,
                          design: {
                            ...prev.design,
                            croppedAreaText: { 
                              ...prev.design?.croppedAreaText, 
                              italic: !prev.design?.croppedAreaText?.italic 
                            }
                          }
                        }))}
                        className={`p-1 rounded text-xs ${campaign.design?.croppedAreaText?.italic ? 'bg-[#841b60] text-white' : 'bg-gray-100 text-gray-600'} hover:opacity-80 transition-colors`}
                      >
                        <Italic className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => setCampaign((prev: any) => ({
                          ...prev,
                          design: {
                            ...prev.design,
                            croppedAreaText: { 
                              ...prev.design?.croppedAreaText, 
                              underline: !prev.design?.croppedAreaText?.underline 
                            }
                          }
                        }))}
                        className={`p-1 rounded text-xs ${campaign.design?.croppedAreaText?.underline ? 'bg-[#841b60] text-white' : 'bg-gray-100 text-gray-600'} hover:opacity-80 transition-colors`}
                      >
                        <Underline className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Section Pied de page */}
      <div className="border border-gray-200 rounded-lg">
        <button
          onClick={() => setFooterExpanded(!footerExpanded)}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
        >
          <h4 className="text-lg font-medium text-gray-800">Pied de page</h4>
          {footerExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
        
        {footerExpanded && (
          <div className="p-4 border-t border-gray-200 space-y-4">
            {/* Bannière de pied de page */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <Image className="w-4 h-4 mr-2" />
                  Bannière de pied de page
                </label>
                <button
                  onClick={() => setCampaign((prev: any) => ({
                    ...prev,
                    design: {
                      ...prev.design,
                      footerBanner: {
                        ...prev.design?.footerBanner,
                        enabled: !prev.design?.footerBanner?.enabled
                      }
                    }
                  }))}
                  className={`p-1 rounded ${campaign.design?.footerBanner?.enabled ? 'text-[#841b60]' : 'text-gray-400'}`}
                >
                  {campaign.design?.footerBanner?.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>
              
              {campaign.design?.footerBanner?.enabled && (
                <div className="space-y-3 pl-6 border-l-2 border-gray-200">
                  <ImageUpload
                    value={campaign.design?.footerBanner?.image || ''}
                    onChange={(value) => setCampaign((prev: any) => ({
                      ...prev,
                      design: {
                        ...prev.design,
                        footerBanner: { ...prev.design?.footerBanner, image: value }
                      }
                    }))}
                    label="Image de bannière"
                  />
                  
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-600">Hauteur (px)</label>
                    <input
                      type="number"
                      value={campaign.design?.footerBanner?.height || 120}
                      onChange={(e) => setCampaign((prev: any) => ({
                        ...prev,
                        design: {
                          ...prev.design,
                          footerBanner: { ...prev.design?.footerBanner, height: e.target.value }
                        }
                      }))}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#841b60] focus:border-transparent"
                      min="50"
                      max="300"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="footerOverlay"
                      checked={campaign.design?.footerBanner?.overlay || false}
                      onChange={(e) => setCampaign((prev: any) => ({
                        ...prev,
                        design: {
                          ...prev.design,
                          footerBanner: { ...prev.design?.footerBanner, overlay: e.target.checked }
                        }
                      }))}
                      className="rounded border-gray-300 text-[#841b60] focus:ring-[#841b60]"
                    />
                    <label htmlFor="footerOverlay" className="text-xs text-gray-600">Overlay sombre</label>
                  </div>
                </div>
              )}
            </div>

            {/* Texte personnalisé de pied de page */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <Type className="w-4 h-4 mr-2" />
                  Texte personnalisé
                </label>
                <button
                  onClick={() => setCampaign((prev: any) => ({
                    ...prev,
                    design: {
                      ...prev.design,
                      footerText: {
                        ...prev.design?.footerText,
                        enabled: !prev.design?.footerText?.enabled
                      }
                    }
                  }))}
                  className={`p-1 rounded ${campaign.design?.footerText?.enabled ? 'text-[#841b60]' : 'text-gray-400'}`}
                >
                  {campaign.design?.footerText?.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>
              
              {campaign.design?.footerText?.enabled && (
                <div className="space-y-3 pl-6 border-l-2 border-gray-200">
                  {renderTextContentEditor('footer')}
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-gray-600">Taille</label>
                      <select
                        value={campaign.design?.footerText?.size || 'medium'}
                        onChange={(e) => setCampaign((prev: any) => ({
                          ...prev,
                          design: {
                            ...prev.design,
                            footerText: { ...prev.design?.footerText, size: e.target.value }
                          }
                        }))}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#841b60] focus:border-transparent"
                      >
                        <option value="small">Petit</option>
                        <option value="medium">Moyen</option>
                        <option value="large">Grand</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-gray-600">Couleur</label>
                      <input
                        type="color"
                        value={campaign.design?.footerText?.color || '#000000'}
                        onChange={(e) => setCampaign((prev: any) => ({
                          ...prev,
                          design: {
                            ...prev.design,
                            footerText: { ...prev.design?.footerText, color: e.target.value }
                          }
                        }))}
                        className="w-full h-8 rounded border border-gray-300"
                      />
                    </div>
                  </div>
                  
                  {/* Cadre de contraste */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="footerFrame"
                        checked={campaign.design?.footerText?.showFrame || false}
                        onChange={(e) => setCampaign((prev: any) => ({
                          ...prev,
                          design: {
                            ...prev.design,
                            footerText: { ...prev.design?.footerText, showFrame: e.target.checked }
                          }
                        }))}
                        className="rounded border-gray-300 text-[#841b60] focus:ring-[#841b60]"
                      />
                      <label htmlFor="footerFrame" className="text-xs text-gray-600">Afficher le cadre de contraste</label>
                    </div>
                    
                    {campaign.design?.footerText?.showFrame && (
                      <div className="grid grid-cols-2 gap-3 pl-4 border-l-2 border-gray-100">
                        <div className="space-y-2">
                          <label className="text-xs font-medium text-gray-600">Couleur du cadre</label>
                          <input
                            type="color"
                            value={campaign.design?.footerText?.frameColor || '#ffffff'}
                            onChange={(e) => setCampaign((prev: any) => ({
                              ...prev,
                              design: {
                                ...prev.design,
                                footerText: { ...prev.design?.footerText, frameColor: e.target.value }
                              }
                            }))}
                            className="w-full h-8 rounded border border-gray-300"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-xs font-medium text-gray-600">Bordure du cadre</label>
                          <input
                            type="color"
                            value={campaign.design?.footerText?.frameBorderColor || '#e5e7eb'}
                            onChange={(e) => setCampaign((prev: any) => ({
                              ...prev,
                              design: {
                                ...prev.design,
                                footerText: { ...prev.design?.footerText, frameBorderColor: e.target.value }
                              }
                            }))}
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
        )}
      </div>
    </div>
  );
};

export default ModernDesignTab;
