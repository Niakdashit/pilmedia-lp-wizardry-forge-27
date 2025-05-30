import React, { useState } from 'react';
import { Palette, Type, Image, Eye, EyeOff, Layout, AlignCenter, MoreHorizontal, ChevronDown, ChevronUp } from 'lucide-react';
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
        className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-100 transition-colors"
      >
        <h3 className="flex items-center text-xl font-semibold text-gray-900">
          {icon}
          {title}
        </h3>
        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>
      {isOpen && (
        <div className="p-6 pt-0 space-y-6">
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

  const handleCroppedAreaTextChange = (field: string, value: any) => {
    setCampaign((prev: any) => ({
      ...prev,
      design: {
        ...prev.design,
        croppedAreaText: {
          ...prev.design.croppedAreaText,
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

  const croppedAreaText = campaign.design?.croppedAreaText || {
    enabled: false,
    text: 'Texte personnalisé',
    size: 'medium',
    color: '#000000',
    bold: false,
    italic: false,
    underline: false
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
    frameBorderColor: '#e5e7eb'
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
    frameBorderColor: '#e5e7eb'
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Design et apparence</h2>
        <p className="text-sm text-gray-600">
          Personnalisez l'apparence visuelle de votre campagne
        </p>
      </div>

      {/* SECTION HEADER */}
      <AccordionSection
        title="Header"
        icon={<Layout className="w-6 h-6 mr-3" />}
        bgColor="bg-gray-50"
      >
        {/* Bannière d'en-tête */}
        <div className="space-y-4">
          <h4 className="flex items-center text-lg font-medium text-gray-800">
            <Image className="w-5 h-5 mr-2" />
            Bannière d'en-tête
          </h4>
          
          <div className="space-y-2">
            <label className="flex items-center justify-between">
              <span className="flex items-center text-sm font-medium text-gray-700">
                {headerBanner.enabled ? <Eye className="w-4 h-4 mr-2" /> : <EyeOff className="w-4 h-4 mr-2" />}
                Afficher une bannière d'en-tête
              </span>
              <button
                onClick={() => handleHeaderBannerChange('enabled', !headerBanner.enabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  headerBanner.enabled ? 'bg-[#841b60]' : 'bg-gray-200'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  headerBanner.enabled ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </label>
          </div>

          {headerBanner.enabled && (
            <>
              <ImageUpload
                value={headerBanner.image || ''}
                onChange={(value) => handleHeaderBannerChange('image', value)}
                label="Image de bannière d'en-tête"
              />

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Hauteur de la bannière</label>
                <input
                  type="text"
                  value={headerBanner.height || '120px'}
                  onChange={(e) => handleHeaderBannerChange('height', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
                  placeholder="120px"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    Overlay sombre
                  </span>
                  <button
                    onClick={() => handleHeaderBannerChange('overlay', !headerBanner.overlay)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      headerBanner.overlay ? 'bg-[#841b60]' : 'bg-gray-200'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      headerBanner.overlay ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </label>
              </div>
            </>
          )}
        </div>

        {/* Texte personnalisé d'en-tête */}
        <div className="space-y-4">
          <h4 className="flex items-center text-lg font-medium text-gray-800">
            <Type className="w-5 h-5 mr-2" />
            Texte personnalisé d'en-tête
          </h4>
          
          <div className="space-y-2">
            <label className="flex items-center justify-between">
              <span className="flex items-center text-sm font-medium text-gray-700">
                {headerText.enabled ? <Eye className="w-4 h-4 mr-2" /> : <EyeOff className="w-4 h-4 mr-2" />}
                Afficher un texte d'en-tête
              </span>
              <button
                onClick={() => handleHeaderTextChange('enabled', !headerText.enabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  headerText.enabled ? 'bg-[#841b60]' : 'bg-gray-200'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  headerText.enabled ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </label>
          </div>

          {headerText.enabled && (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Contenu du texte</label>
                <textarea
                  value={headerText.text}
                  onChange={(e) => handleHeaderTextChange('text', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
                  rows={3}
                  placeholder="Entrez votre texte d'en-tête"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Taille du texte</label>
                <div className="grid grid-cols-3 gap-2">
                  {sizeOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleHeaderTextChange('size', option.value)}
                      className={`p-2 text-xs rounded border transition-colors ${
                        headerText.size === option.value
                          ? 'bg-[#841b60] text-white border-[#841b60]'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-[#841b60]'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Couleur du texte</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={headerText.color}
                    onChange={(e) => handleHeaderTextChange('color', e.target.value)}
                    className="w-10 h-10 rounded border border-gray-300"
                  />
                  <input
                    type="text"
                    value={headerText.color}
                    onChange={(e) => handleHeaderTextChange('color', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    Afficher un cadre de contraste
                  </span>
                  <button
                    onClick={() => handleHeaderTextChange('showFrame', !headerText.showFrame)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      headerText.showFrame ? 'bg-[#841b60]' : 'bg-gray-200'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      headerText.showFrame ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </label>
              </div>

              {headerText.showFrame && (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Couleur du fond du cadre</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={headerText.frameColor}
                        onChange={(e) => handleHeaderTextChange('frameColor', e.target.value)}
                        className="w-10 h-10 rounded border border-gray-300"
                      />
                      <input
                        type="text"
                        value={headerText.frameColor}
                        onChange={(e) => handleHeaderTextChange('frameColor', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Couleur de la bordure du cadre</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={headerText.frameBorderColor}
                        onChange={(e) => handleHeaderTextChange('frameBorderColor', e.target.value)}
                        className="w-10 h-10 rounded border border-gray-300"
                      />
                      <input
                        type="text"
                        value={headerText.frameBorderColor}
                        onChange={(e) => handleHeaderTextChange('frameBorderColor', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
                      />
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        
        {/* Texte personnalisé (legacy) */}
        <div className="space-y-4">
          <h4 className="flex items-center text-lg font-medium text-gray-800">
            <Type className="w-5 h-5 mr-2" />
            Texte personnalisé (positioning libre)
          </h4>
          
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
      </AccordionSection>

      {/* SECTION CENTER */}
      <AccordionSection
        title="Center"
        icon={<AlignCenter className="w-6 h-6 mr-3" />}
        bgColor="bg-blue-50"
      >
        {/* Logo central pour la roue */}
        {campaign.type === 'wheel' && (
          <div className="space-y-4">
            <h4 className="flex items-center text-lg font-medium text-gray-800">
              <Image className="w-5 h-5 mr-2" />
              Logo central de la roue
            </h4>
            
            <ImageUpload
              value={campaign.design?.centerLogo || ''}
              onChange={(value) => handleDesignChange('centerLogo', value)}
              label="Logo à afficher au centre de la roue"
            />
          </div>
        )}

        {/* Texte zone recadrée (pour positions left/right) */}
        <div className="space-y-4">
          <h4 className="flex items-center text-lg font-medium text-gray-800">
            <Type className="w-5 h-5 mr-2" />
            Texte zone recadrée (mobile/tablette - positions gauche/droite)
          </h4>
          
          <div className="space-y-2">
            <label className="flex items-center justify-between">
              <span className="flex items-center text-sm font-medium text-gray-700">
                {croppedAreaText.enabled ? <Eye className="w-4 h-4 mr-2" /> : <EyeOff className="w-4 h-4 mr-2" />}
                Afficher du texte dans la zone recadrée
              </span>
              <button
                onClick={() => handleCroppedAreaTextChange('enabled', !croppedAreaText.enabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  croppedAreaText.enabled ? 'bg-[#841b60]' : 'bg-gray-200'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  croppedAreaText.enabled ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </label>
          </div>

          {croppedAreaText.enabled && (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Contenu du texte</label>
                <textarea
                  value={croppedAreaText.text}
                  onChange={(e) => handleCroppedAreaTextChange('text', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
                  rows={3}
                  placeholder="Entrez votre texte pour la zone recadrée"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Taille du texte</label>
                <div className="grid grid-cols-3 gap-2">
                  {sizeOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleCroppedAreaTextChange('size', option.value)}
                      className={`p-2 text-xs rounded border transition-colors ${
                        croppedAreaText.size === option.value
                          ? 'bg-[#841b60] text-white border-[#841b60]'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-[#841b60]'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Couleur du texte</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={croppedAreaText.color}
                    onChange={(e) => handleCroppedAreaTextChange('color', e.target.value)}
                    className="w-10 h-10 rounded border border-gray-300"
                  />
                  <input
                    type="text"
                    value={croppedAreaText.color}
                    onChange={(e) => handleCroppedAreaTextChange('color', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Style options */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Style du texte</label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={croppedAreaText.bold}
                      onChange={(e) => handleCroppedAreaTextChange('bold', e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm font-bold">Gras</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={croppedAreaText.italic}
                      onChange={(e) => handleCroppedAreaTextChange('italic', e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm italic">Italique</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={croppedAreaText.underline}
                      onChange={(e) => handleCroppedAreaTextChange('underline', e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm underline">Souligné</span>
                  </label>
                </div>
              </div>
            </>
          )}
        </div>

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
      </AccordionSection>

      {/* SECTION FOOTER */}
      <AccordionSection
        title="Footer"
        icon={<MoreHorizontal className="w-6 h-6 mr-3" />}
        bgColor="bg-green-50"
      >
        {/* Texte personnalisé de pied de page */}
        <div className="space-y-4">
          <h4 className="flex items-center text-lg font-medium text-gray-800">
            <Type className="w-5 h-5 mr-2" />
            Texte personnalisé de pied de page
          </h4>
          
          <div className="space-y-2">
            <label className="flex items-center justify-between">
              <span className="flex items-center text-sm font-medium text-gray-700">
                {footerText.enabled ? <Eye className="w-4 h-4 mr-2" /> : <EyeOff className="w-4 h-4 mr-2" />}
                Afficher un texte de pied de page
              </span>
              <button
                onClick={() => handleFooterTextChange('enabled', !footerText.enabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  footerText.enabled ? 'bg-[#841b60]' : 'bg-gray-200'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  footerText.enabled ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </label>
          </div>

          {footerText.enabled && (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Contenu du texte</label>
                <textarea
                  value={footerText.text}
                  onChange={(e) => handleFooterTextChange('text', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
                  rows={3}
                  placeholder="Entrez votre texte de pied de page"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Taille du texte</label>
                <div className="grid grid-cols-3 gap-2">
                  {sizeOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleFooterTextChange('size', option.value)}
                      className={`p-2 text-xs rounded border transition-colors ${
                        footerText.size === option.value
                          ? 'bg-[#841b60] text-white border-[#841b60]'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-[#841b60]'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Couleur du texte</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={footerText.color}
                    onChange={(e) => handleFooterTextChange('color', e.target.value)}
                    className="w-10 h-10 rounded border border-gray-300"
                  />
                  <input
                    type="text"
                    value={footerText.color}
                    onChange={(e) => handleFooterTextChange('color', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    Afficher un cadre de contraste
                  </span>
                  <button
                    onClick={() => handleFooterTextChange('showFrame', !footerText.showFrame)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      footerText.showFrame ? 'bg-[#841b60]' : 'bg-gray-200'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      footerText.showFrame ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </label>
              </div>

              {footerText.showFrame && (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Couleur du fond du cadre</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={footerText.frameColor}
                        onChange={(e) => handleFooterTextChange('frameColor', e.target.value)}
                        className="w-10 h-10 rounded border border-gray-300"
                      />
                      <input
                        type="text"
                        value={footerText.frameColor}
                        onChange={(e) => handleFooterTextChange('frameColor', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Couleur de la bordure du cadre</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={footerText.frameBorderColor}
                        onChange={(e) => handleFooterTextChange('frameBorderColor', e.target.value)}
                        className="w-10 h-10 rounded border border-gray-300"
                      />
                      <input
                        type="text"
                        value={footerText.frameBorderColor}
                        onChange={(e) => handleFooterTextChange('frameBorderColor', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
                      />
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>

        {/* Bannière de pied de page */}
        <div className="space-y-4">
          <h4 className="flex items-center text-lg font-medium text-gray-800">
            <Image className="w-5 h-5 mr-2" />
            Bannière de pied de page
          </h4>
          
          <div className="space-y-2">
            <label className="flex items-center justify-between">
              <span className="flex items-center text-sm font-medium text-gray-700">
                {footerBanner.enabled ? <Eye className="w-4 h-4 mr-2" /> : <EyeOff className="w-4 h-4 mr-2" />}
                Afficher une bannière de pied de page
              </span>
              <button
                onClick={() => handleFooterBannerChange('enabled', !footerBanner.enabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  footerBanner.enabled ? 'bg-[#841b60]' : 'bg-gray-200'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  footerBanner.enabled ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </label>
          </div>

          {footerBanner.enabled && (
            <>
              <ImageUpload
                value={footerBanner.image || ''}
                onChange={(value) => handleFooterBannerChange('image', value)}
                label="Image de bannière de pied de page"
              />

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Hauteur de la bannière</label>
                <input
                  type="text"
                  value={footerBanner.height || '120px'}
                  onChange={(e) => handleFooterBannerChange('height', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
                  placeholder="120px"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    Overlay sombre
                  </span>
                  <button
                    onClick={() => handleFooterBannerChange('overlay', !footerBanner.overlay)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      footerBanner.overlay ? 'bg-[#841b60]' : 'bg-gray-200'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      footerBanner.overlay ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </label>
              </div>
            </>
          )}
        </div>
      </AccordionSection>
    </div>
  );
};

export default ModernDesignTab;
