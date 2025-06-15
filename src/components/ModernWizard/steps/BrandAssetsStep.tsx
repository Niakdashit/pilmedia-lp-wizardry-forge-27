
import React from 'react';
import { WizardData } from '../ModernWizard';
import { Image, Smartphone, Monitor } from 'lucide-react';
import ImageUploadCard from './components/ImageUploadCard';
import WebsiteUrlInput from './components/WebsiteUrlInput';
import ProductNameInput from './components/ProductNameInput';
import { useBrandThemeExtraction } from '../hooks/useBrandThemeExtraction';
import { useWebsiteContentExtraction } from '../hooks/useWebsiteContentExtraction'; // <- NOUVEAU

interface BrandAssetsStepProps {
  wizardData: WizardData;
  updateWizardData: (data: Partial<WizardData>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const BrandAssetsStep: React.FC<BrandAssetsStepProps> = ({
  wizardData,
  updateWizardData,
  nextStep,
  prevStep
}) => {
  // Extraction du thème de marque : couleur, logo
  const { brandTheme, loading: extractingTheme } = useBrandThemeExtraction(wizardData.websiteUrl);

  // Extraction du contenu du site (Firecrawl)
  const { content: extractedContent, loading: extractingSiteContent, error: siteContentError } = useWebsiteContentExtraction(wizardData.websiteUrl);

  // Injection du résultat d'extraction de thème si changé
  React.useEffect(() => {
    if (
      brandTheme && 
      JSON.stringify(wizardData.extractedBrandTheme || {}) !== JSON.stringify(brandTheme)
    ) {
      updateWizardData({ extractedBrandTheme: brandTheme });
    }
    if (!brandTheme && wizardData.extractedBrandTheme) {
      updateWizardData({ extractedBrandTheme: undefined });
    }
    // eslint-disable-next-line
  }, [brandTheme]);

  // Injection automatique du contenu du site dans wizardData.websiteContent
  React.useEffect(() => {
    if (
      typeof extractedContent === "string" &&
      extractedContent.length > 0 &&
      extractedContent !== wizardData.websiteContent
    ) {
      updateWizardData({ websiteContent: extractedContent });
    }
    if (!extractedContent && wizardData.websiteContent) {
      updateWizardData({ websiteContent: undefined });
    }
    // eslint-disable-next-line
  }, [extractedContent]);

  const handleFileUpload = (type: 'logo' | 'desktopVisual' | 'mobileVisual', file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      updateWizardData({ [type]: e.target?.result as string });
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = (type: 'logo' | 'desktopVisual' | 'mobileVisual') => {
    updateWizardData({ [type]: undefined });
  };

  return (
    <div className="space-y-8">
      {/* Main Content Card */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-gray-100/50">
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#141e29] mb-3">
            Ajoutez vos éléments de marque
          </h2>
          <p className="text-gray-600 leading-relaxed max-w-2xl">
            Personnalisez votre campagne avec vos visuels de marque pour une expérience cohérente.
          </p>
        </div>
        {/* Infos extraction */}
        {extractingTheme && (
          <div className="mb-3 flex items-center gap-3 text-[#815194] animate-pulse">
            <svg width="22" height="22" fill="none" className="animate-spin" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#ae8ac3" strokeWidth="4" />
              <path className="opacity-75" fill="#ae8ac3" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Extraction du thème de marque en cours...
          </div>
        )}
        {extractingSiteContent && (
          <div className="mb-3 flex items-center gap-3 text-indigo-600 animate-pulse">
            <svg width="20" height="20" fill="none" className="animate-spin" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#6366F1" strokeWidth="4" />
              <path className="opacity-75" fill="#6366F1" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Analyse automatique du contenu du site...
          </div>
        )}
        {siteContentError && (
          <div className="mb-3 text-red-500 flex items-center gap-2 text-sm">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#ef4444" strokeWidth="3" /><line x1="12" y1="8" x2="12" y2="13" stroke="#ef4444" strokeWidth="2" /><circle cx="12" cy="16" r="1.2" fill="#ef4444" /></svg>
            {siteContentError}
          </div>
        )}

        {/* Upload Areas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <ImageUploadCard
            title="Logo"
            icon={Image}
            value={wizardData.logo}
            onUpload={(file) => handleFileUpload('logo', file)}
            onRemove={() => handleRemoveImage('logo')}
            placeholder="Glissez votre logo ici"
            inputId="logo-upload"
          />

          <ImageUploadCard
            title="Visuel desktop"
            icon={Monitor}
            value={wizardData.desktopVisual}
            onUpload={(file) => handleFileUpload('desktopVisual', file)}
            onRemove={() => handleRemoveImage('desktopVisual')}
            placeholder="Visuel pour ordinateur"
            inputId="desktop-upload"
          />

          <ImageUploadCard
            title="Visuel mobile"
            icon={Smartphone}
            value={wizardData.mobileVisual}
            onUpload={(file) => handleFileUpload('mobileVisual', file)}
            onRemove={() => handleRemoveImage('mobileVisual')}
            placeholder="Visuel pour mobile"
            inputId="mobile-upload"
          />
        </div>

        {/* Website URL */}
        <WebsiteUrlInput
          value={wizardData.websiteUrl || ''}
          onChange={(value) => updateWizardData({ websiteUrl: value })}
        />

        {/* Product Name */}
        <ProductNameInput
          value={wizardData.productName || ''}
          onChange={(value) => updateWizardData({ productName: value })}
        />

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={prevStep}
            className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
          >
            Retour
          </button>
          <button
            onClick={nextStep}
            className="px-8 py-3 bg-[#951b6d] text-white font-semibold rounded-xl hover:bg-[#7d1659] transition-colors shadow-sm hover:shadow-md"
          >
            Continuer
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrandAssetsStep;
