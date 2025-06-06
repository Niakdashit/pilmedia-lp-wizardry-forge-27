import React, { useState } from 'react';
import { Type, Image, Layout, AlignCenter, MoreHorizontal, ChevronDown, ChevronUp, Plus, Trash2, Bold, Italic, Underline, Palette } from 'lucide-react';
import ImageUpload from '../common/ImageUpload';

interface ModernDesignTabProps {
  campaign: any;
  setCampaign: React.Dispatch<React.SetStateAction<any>>;
}
interface AccordionSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  bgColor?: string;
}
interface TextContent {
  id: string;
  text: string;
  bold: boolean;
  italic: boolean;
  underline: boolean;
}
const AccordionSection: React.FC<AccordionSectionProps> = ({
  title,
  icon,
  children,
  defaultOpen = true,
  bgColor = 'bg-gray-50'
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`rounded-lg border ${bgColor}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-3 flex items-center justify-between text-left hover:bg-gray-100 transition-colors"
      >
        <h3 className="flex items-center text-lg font-semibold text-gray-900">
          {icon}
          {title}
        </h3>
        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      {isOpen && (
        <div className="p-4 pt-0 space-y-4">
          {children}
        </div>
      )}
    </div>
  );
};
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
  const handleHeaderBannerChange = (field: string, value: any) => {
    setCampaign((prev: any) => ({
      ...prev,
      design: {
        ...prev.design,
        headerBanner: {
          ...prev.design.headerBanner,
          [field]: value
        }
      }
    }));
  };
  const handleHeaderTextChange = (field: string, value: any) => {
    setCampaign((prev: any) => ({
      ...prev,
      design: {
        ...prev.design,
        headerText: {
          ...prev.design.headerText,
          [field]: value
        }
      }
    }));
  };
  const handleFooterBannerChange = (field: string, value: any) => {
    setCampaign((prev: any) => ({
      ...prev,
      design: {
        ...prev.design,
        footerBanner: {
          ...prev.design.footerBanner,
          [field]: value
        }
      }
    }));
  };
  const handleFooterTextChange = (field: string, value: any) => {
    setCampaign((prev: any) => ({
      ...prev,
      design: {
        ...prev.design,
        footerText: {
          ...prev.design.footerText,
          [field]: value
        }
      }
    }));
  };
  const handleTextContentChange = (section: string, contentId: string, field: string, value: any) => {
    setCampaign((prev: any) => {
      const currentSection = prev.design?.[section] || {};
      const currentContents = currentSection.textContents || [];
      const updatedContents = currentContents.map((content: TextContent) => content.id === contentId ? {
        ...content,
        [field]: value
      } : content);
      return {
        ...prev,
        design: {
          ...prev.design,
          [section]: {
            ...currentSection,
            textContents: updatedContents
          }
        }
      };
    });
  };
  const addTextContent = (section: string) => {
    setCampaign((prev: any) => {
      const currentSection = prev.design?.[section] || {};
      const currentContents = currentSection.textContents || [];
      const newContent: TextContent = {
        id: Date.now().toString(),
        text: 'Nouveau texte',
        bold: false,
        italic: false,
        underline: false
      };
      return {
        ...prev,
        design: {
          ...prev.design,
          [section]: {
            ...currentSection,
            textContents: [...currentContents, newContent]
          }
        }
      };
    });
  };
  const removeTextContent = (section: string, contentId: string) => {
    setCampaign((prev: any) => {
      const currentSection = prev.design?.[section] || {};
      const currentContents = currentSection.textContents || [];
      const updatedContents = currentContents.filter((content: TextContent) => content.id !== contentId);
      return {
        ...prev,
        design: {
          ...prev.design,
          [section]: {
            ...currentSection,
            textContents: updatedContents
          }
        }
      };
    });
  };
  const renderCompactTextEditor = (section: string, textContents: TextContent[]) => (
    <div className="space-y-2">
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
      
      {textContents.map((content: TextContent, index: number) => (
        <div key={content.id} className="border border-gray-200 rounded p-2 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-600">Texte {index + 1}</span>
            <button
              onClick={() => removeTextContent(section, content.id)}
              className="p-0.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
          
          <textarea
            value={content.text}
            onChange={(e) => handleTextContentChange(section, content.id, 'text', e.target.value)}
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#841b60] focus:border-transparent"
            rows={1}
            placeholder="Entrez votre texte"
          />
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleTextContentChange(section, content.id, 'bold', !content.bold)}
              className={`p-1 rounded text-xs ${content.bold ? 'bg-[#841b60] text-white' : 'bg-gray-100 text-gray-600'}`}
            >
              <Bold className="w-3 h-3" />
            </button>
            <button
              onClick={() => handleTextContentChange(section, content.id, 'italic', !content.italic)}
              className={`p-1 rounded text-xs ${content.italic ? 'bg-[#841b60] text-white' : 'bg-gray-100 text-gray-600'}`}
            >
              <Italic className="w-3 h-3" />
            </button>
            <button
              onClick={() => handleTextContentChange(section, content.id, 'underline', !content.underline)}
              className={`p-1 rounded text-xs ${content.underline ? 'bg-[#841b60] text-white' : 'bg-gray-100 text-gray-600'}`}
            >
              <Underline className="w-3 h-3" />
            </button>
          </div>
        </div>
      ))}
      
      {textContents.length === 0 && (
        <div className="text-center py-2 text-gray-400 text-xs">
          Aucun contenu texte
        </div>
      )}
    </div>
  );
  const renderToggle = (value: boolean, onChange: (val: boolean) => void) => (
    <button
      onClick={() => onChange(!value)}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
        value ? 'bg-[#841b60]' : 'bg-gray-200'
      }`}
    >
      <span
        className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
          value ? 'translate-x-5' : 'translate-x-1'
        }`}
      />
    </button>
  );
  const renderColorInput = (value: string, onChange: (val: string) => void, label: string) => (
    <div className="grid grid-cols-2 gap-2 items-center">
      <label className="text-sm text-gray-700 px-0 mx-[9px]">{label}</label>
      <div className="flex items-center space-x-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-8 h-8 rounded border border-gray-300 px-0 mx-0"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#841b60] focus:border-transparent px-0 mx-[7px]"
        />
      </div>
    </div>
  );
  const fontOptions = [{
    value: 'Inter',
    label: 'Inter'
  }, {
    value: 'Arial',
    label: 'Arial'
  }, {
    value: 'Helvetica',
    label: 'Helvetica'
  }, {
    value: 'Georgia',
    label: 'Georgia'
  }, {
    value: 'Times New Roman',
    label: 'Times New Roman'
  }];
  const positionOptions = [{
    value: 'top',
    label: 'Haut'
  }, {
    value: 'center',
    label: 'Centre'
  }, {
    value: 'bottom',
    label: 'Bas'
  }, {
    value: 'left',
    label: 'Gauche'
  }, {
    value: 'right',
    label: 'Droite'
  }];
  const sizeOptions = [{
    value: 'small',
    label: 'S'
  }, {
    value: 'medium',
    label: 'M'
  }, {
    value: 'large',
    label: 'L'
  }];
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
  const headerBanner = campaign.design?.headerBanner || {
    enabled: false,
    image: '',
    height: '120px',
    overlay: false
  };
  const headerText = campaign.design?.headerText || {
    enabled: false,
    text: 'Texte d\'en-tête',
    size: 'medium',
    color: '#000000',
    showFrame: false,
    frameColor: '#ffffff',
    frameBorderColor: '#e5e7eb',
    textContents: []
  };
  const footerBanner = campaign.design?.footerBanner || {
    enabled: false,
    image: '',
    height: '120px',
    overlay: false
  };
  const footerText = campaign.design?.footerText || {
    enabled: false,
    text: 'Texte de pied de page',
    size: 'medium',
    color: '#000000',
    showFrame: false,
    frameColor: '#ffffff',
    frameBorderColor: '#e5e7eb',
    textContents: []
  };
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Design et apparence</h2>
        <p className="text-sm text-gray-600">
          Personnalisez l'apparence visuelle de votre campagne
        </p>
      </div>

      {/* SECTION HEADER */}
      <AccordionSection title="En-tête" icon={<Layout className="w-5 h-5 mr-2" />} bgColor="bg-gray-50">
        {/* Bannière d'en-tête - Version compacte */}
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4 items-center">
            <span className="flex items-center text-sm font-medium text-gray-700">
              <Image className="w-4 h-4 mr-2" />
              Bannière d'en-tête
            </span>
            {renderToggle(headerBanner.enabled, (val) => handleHeaderBannerChange('enabled', val))}
          </div>

          {headerBanner.enabled && (
            <>
              <ImageUpload
                value={headerBanner.image || ''}
                onChange={(value) => handleHeaderBannerChange('image', value)}
                label="Image de bannière d'en-tête"
                compact={true}
              />
              
              <div className="grid grid-cols-2 gap-2 items-center">
                <label className="text-sm text-gray-700">Hauteur</label>
                <input
                  type="text"
                  value={headerBanner.height || '120px'}
                  onChange={(e) => handleHeaderBannerChange('height', e.target.value)}
                  className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#841b60] focus:border-transparent"
                  placeholder="120px"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 items-center">
                <span className="text-sm text-gray-700">Overlay sombre</span>
                {renderToggle(headerBanner.overlay, (val) => handleHeaderBannerChange('overlay', val))}
              </div>
            </>
          )}
        </div>

        {/* Texte personnalisé d'en-tête - Version compacte */}
        <div className="space-y-3 border-t pt-3">
          <div className="grid grid-cols-2 gap-4 items-center">
            <span className="flex items-center text-sm font-medium text-gray-700">
              <Type className="w-4 h-4 mr-2" />
              Texte d'en-tête
            </span>
            {renderToggle(headerText.enabled, (val) => handleHeaderTextChange('enabled', val))}
          </div>

          {headerText.enabled && (
            <>
              <div className="grid grid-cols-2 gap-2 items-center">
                <label className="text-sm text-gray-700">Taille</label>
                <div className="flex gap-1">
                  {sizeOptions.map(option => <button key={option.value} onClick={() => handleHeaderTextChange('size', option.value)} className={`px-2 py-1 text-xs rounded border transition-colors ${headerText.size === option.value ? 'bg-[#841b60] text-white border-[#841b60]' : 'bg-white text-gray-700 border-gray-300 hover:border-[#841b60]'}`}>
                      {option.label}
                    </button>)}
                </div>
              </div>

              {renderColorInput(headerText.color, (val) => handleHeaderTextChange('color', val), 'Couleur')}
              {renderCompactTextEditor('headerText', headerText.textContents || [])}

              <div className="grid grid-cols-2 gap-4 items-center">
                <span className="text-sm text-gray-700">Cadre de contraste</span>
                {renderToggle(headerText.showFrame, (val) => handleHeaderTextChange('showFrame', val))}
              </div>

              {headerText.showFrame && (
                <>
                  {renderColorInput(headerText.frameColor, (val) => handleHeaderTextChange('frameColor', val), 'Fond cadre')}
                  {renderColorInput(headerText.frameBorderColor, (val) => handleHeaderTextChange('frameBorderColor', val), 'Bordure cadre')}
                </>
              )}
            </>
          )}
        </div>
        
        {/* Texte personnalisé libre - Version compacte */}
        <div className="space-y-3 border-t pt-3">
          <div className="grid grid-cols-2 gap-4 items-center">
            <span className="flex items-center text-sm font-medium text-gray-700">
              <Type className="w-4 h-4 mr-2" />
              Texte libre
            </span>
            {renderToggle(customText.enabled, (val) => handleCustomTextChange('enabled', val))}
          </div>

          {customText.enabled && (
            <>
              <textarea
                value={customText.text}
                onChange={(e) => handleCustomTextChange('text', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#841b60] focus:border-transparent"
                rows={2}
                placeholder="Entrez votre texte personnalisé"
              />

              <div className="grid grid-cols-2 gap-2 items-center">
                <label className="text-sm text-gray-700">Position</label>
                <select
                  value={customText.position}
                  onChange={(e) => handleCustomTextChange('position', e.target.value)}
                  className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#841b60] focus:border-transparent"
                >
                  {positionOptions.map(option => <option key={option.value} value={option.value}>
                      {option.label}
                    </option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2 items-center">
                <label className="text-sm text-gray-700">Taille</label>
                <div className="flex gap-1">
                  {sizeOptions.map(option => <button key={option.value} onClick={() => handleCustomTextChange('size', option.value)} className={`px-2 py-1 text-xs rounded border transition-colors ${customText.size === option.value ? 'bg-[#841b60] text-white border-[#841b60]' : 'bg-white text-gray-700 border-gray-300 hover:border-[#841b60]'}`}>
                      {option.label}
                    </button>)}
                </div>
              </div>

              {renderColorInput(customText.color, (val) => handleCustomTextChange('color', val), 'Couleur')}

              <div className="grid grid-cols-2 gap-4 items-center">
                <span className="text-sm text-gray-700">Cadre de contraste</span>
                {renderToggle(customText.showFrame, (val) => handleCustomTextChange('showFrame', val))}
              </div>

              {customText.showFrame && (
                <>
                  {renderColorInput(customText.frameColor, (val) => handleCustomTextChange('frameColor', val), 'Fond cadre')}
                  {renderColorInput(customText.frameBorderColor, (val) => handleCustomTextChange('frameBorderColor', val), 'Bordure cadre')}
                </>
              )}
            </>
          )}
        </div>
      </AccordionSection>

      {/* SECTION CENTER */}
      <AccordionSection title="Centre & Arrière-plan" icon={<AlignCenter className="w-5 h-5 mr-2" />} bgColor="bg-blue-50">
        {/* Image de fond - Version compacte */}
        <div className="space-y-3">
          <h4 className="flex items-center text-sm font-medium text-gray-800">
            <Image className="w-4 h-4 mr-2" />
            Image de fond
          </h4>
          
          <ImageUpload
            value={campaign.design?.backgroundImage || ''}
            onChange={(value) => handleDesignChange('backgroundImage', value)}
            label="Image de fond"
            compact={true}
          />
        </div>

        {/* Logo central pour la roue */}
        {campaign.type === 'wheel' && (
          <div className="space-y-3 border-t pt-3">
            <h4 className="flex items-center text-sm font-medium text-gray-800">
              <Image className="w-4 h-4 mr-2" />
              Logo central de la roue
            </h4>
            
            <ImageUpload
              value={campaign.design?.centerLogo || ''}
              onChange={(value) => handleDesignChange('centerLogo', value)}
              label="Logo central"
              compact={true}
            />
          </div>
        )}

        {/* Couleurs - Version compacte */}
        <div className="space-y-3 border-t pt-3">
          <h4 className="flex items-center text-sm font-medium text-gray-800">
            <Palette className="w-4 h-4 mr-2" />
            Couleurs & Typographie
          </h4>
          
          {renderColorInput(campaign.design?.background || '#f8fafc', (val) => handleDesignChange('background', val), 'Fond')}
          {renderColorInput(campaign.design?.titleColor || '#000000', (val) => handleDesignChange('titleColor', val), 'Texte')}

          <div className="grid grid-cols-2 gap-2 items-center">
            <label className="text-sm text-gray-700">Police</label>
            <select
              value={campaign.design?.fontFamily || 'Inter'}
              onChange={(e) => handleDesignChange('fontFamily', e.target.value)}
              className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#841b60] focus:border-transparent"
            >
              {fontOptions.map(font => <option key={font.value} value={font.value}>
                  {font.label}
                </option>)}
            </select>
          </div>
        </div>
      </AccordionSection>

      {/* SECTION FOOTER */}
      <AccordionSection title="Pied de page" icon={<MoreHorizontal className="w-5 h-5 mr-2" />} bgColor="bg-green-50">
        {/* Texte personnalisé de pied de page - Version compacte */}
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4 items-center">
            <span className="flex items-center text-sm font-medium text-gray-700">
              <Type className="w-4 h-4 mr-2" />
              Texte de pied de page
            </span>
            {renderToggle(footerText.enabled, (val) => handleFooterTextChange('enabled', val))}
          </div>

          {footerText.enabled && (
            <>
              <div className="grid grid-cols-2 gap-2 items-center">
                <label className="text-sm text-gray-700">Taille</label>
                <div className="flex gap-1">
                  {sizeOptions.map(option => <button key={option.value} onClick={() => handleFooterTextChange('size', option.value)} className={`px-2 py-1 text-xs rounded border transition-colors ${footerText.size === option.value ? 'bg-[#841b60] text-white border-[#841b60]' : 'bg-white text-gray-700 border-gray-300 hover:border-[#841b60]'}`}>
                      {option.label}
                    </button>)}
                </div>
              </div>

              {renderColorInput(footerText.color, (val) => handleFooterTextChange('color', val), 'Couleur')}
              {renderCompactTextEditor('footerText', footerText.textContents || [])}

              <div className="grid grid-cols-2 gap-4 items-center">
                <span className="text-sm text-gray-700">Cadre de contraste</span>
                {renderToggle(footerText.showFrame, (val) => handleFooterTextChange('showFrame', val))}
              </div>

              {footerText.showFrame && (
                <>
                  {renderColorInput(footerText.frameColor, (val) => handleFooterTextChange('frameColor', val), 'Fond cadre')}
                  {renderColorInput(footerText.frameBorderColor, (val) => handleFooterTextChange('frameBorderColor', val), 'Bordure cadre')}
                </>
              )}
            </>
          )}
        </div>

        {/* Bannière de pied de page - Version compacte */}
        <div className="space-y-3 border-t pt-3">
          <div className="grid grid-cols-2 gap-4 items-center">
            <span className="flex items-center text-sm font-medium text-gray-700">
              <Image className="w-4 h-4 mr-2" />
              Bannière de pied
            </span>
            {renderToggle(footerBanner.enabled, (val) => handleFooterBannerChange('enabled', val))}
          </div>

          {footerBanner.enabled && (
            <>
              <ImageUpload
                value={footerBanner.image || ''}
                onChange={(value) => handleFooterBannerChange('image', value)}
                label="Image de bannière de pied de page"
                compact={true}
              />

              <div className="grid grid-cols-2 gap-2 items-center">
                <label className="text-sm text-gray-700">Hauteur</label>
                <input
                  type="text"
                  value={footerBanner.height || '120px'}
                  onChange={(e) => handleFooterBannerChange('height', e.target.value)}
                  className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#841b60] focus:border-transparent"
                  placeholder="120px"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 items-center">
                <span className="text-sm text-gray-700">Overlay sombre</span>
                {renderToggle(footerBanner.overlay, (val) => handleFooterBannerChange('overlay', val))}
              </div>
            </>
          )}
        </div>
      </AccordionSection>
    </div>
  );
};

export default ModernDesignTab;
