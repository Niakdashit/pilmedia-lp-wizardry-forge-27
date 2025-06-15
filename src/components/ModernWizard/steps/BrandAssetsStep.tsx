
import React from 'react';
import { WizardData } from '../ModernWizard';
import { Image, Smartphone, Monitor } from 'lucide-react';
import ImageUploadCard from './components/ImageUploadCard';
import WebsiteUrlInput from './components/WebsiteUrlInput';
import ProductNameInput from './components/ProductNameInput';

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
