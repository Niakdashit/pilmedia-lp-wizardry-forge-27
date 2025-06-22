
import React from 'react';
import { WizardData } from '../ModernWizard';
import { Upload, Sparkles } from 'lucide-react';

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
  const handleFileUpload = (field: keyof WizardData, file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      updateWizardData({ [field]: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const canProceed = wizardData.logo && wizardData.desktopVisual && wizardData.productName;

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#841b60] to-[#6d164f] rounded-2xl mb-6">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Donnez vie à votre marque
          </h1>
          <p className="text-xl text-gray-300">
            Uploadez vos assets pour créer une expérience sur-mesure
          </p>
        </div>

        {/* Form */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Logo Upload */}
            <div className="space-y-4">
              <label className="block text-white font-semibold text-lg">
                Logo de votre marque *
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload('logo', e.target.files[0])}
                  className="hidden"
                  id="logo-upload"
                />
                <label
                  htmlFor="logo-upload"
                  className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-white/30 rounded-2xl cursor-pointer hover:border-[#841b60] hover:bg-white/5 transition-all duration-300"
                >
                  {wizardData.logo ? (
                    <img src={wizardData.logo} alt="Logo" className="max-h-40 max-w-full object-contain" />
                  ) : (
                    <>
                      <Upload className="w-12 h-12 text-gray-400 mb-4" />
                      <span className="text-gray-300">Cliquez pour ajouter votre logo</span>
                    </>
                  )}
                </label>
              </div>
            </div>

            {/* Desktop Visual */}
            <div className="space-y-4">
              <label className="block text-white font-semibold text-lg">
                Visuel desktop *
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload('desktopVisual', e.target.files[0])}
                  className="hidden"
                  id="desktop-upload"
                />
                <label
                  htmlFor="desktop-upload"
                  className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-white/30 rounded-2xl cursor-pointer hover:border-[#841b60] hover:bg-white/5 transition-all duration-300"
                >
                  {wizardData.desktopVisual ? (
                    <img src={wizardData.desktopVisual} alt="Desktop Visual" className="max-h-40 max-w-full object-contain" />
                  ) : (
                    <>
                      <Upload className="w-12 h-12 text-gray-400 mb-4" />
                      <span className="text-gray-300">Visuel principal de campagne</span>
                    </>
                  )}
                </label>
              </div>
            </div>

            {/* Mobile Visual */}
            <div className="space-y-4">
              <label className="block text-white font-semibold text-lg">
                Visuel mobile (optionnel)
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload('mobileVisual', e.target.files[0])}
                  className="hidden"
                  id="mobile-upload"
                />
                <label
                  htmlFor="mobile-upload"
                  className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-white/30 rounded-2xl cursor-pointer hover:border-[#841b60] hover:bg-white/5 transition-all duration-300"
                >
                  {wizardData.mobileVisual ? (
                    <img src={wizardData.mobileVisual} alt="Mobile Visual" className="max-h-40 max-w-full object-contain" />
                  ) : (
                    <>
                      <Upload className="w-12 h-12 text-gray-400 mb-4" />
                      <span className="text-gray-300">Version mobile (fallback: desktop)</span>
                    </>
                  )}
                </label>
              </div>
            </div>

            {/* Product Name */}
            <div className="space-y-4">
              <label className="block text-white font-semibold text-lg">
                Nom du produit/offre *
              </label>
              <input
                type="text"
                value={wizardData.productName || ''}
                onChange={(e) => updateWizardData({ productName: e.target.value })}
                placeholder="Ex: iPhone 15 Pro, Formation Marketing..."
                className="w-full h-16 px-6 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-[#841b60] focus:bg-white/15 transition-all duration-300"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center mt-12">
            <button
              onClick={prevStep}
              className="px-8 py-4 text-gray-300 hover:text-white transition-colors duration-300"
            >
              ← Retour
            </button>
            
            <button
              onClick={nextStep}
              disabled={!canProceed}
              className={`
                px-12 py-4 rounded-2xl font-semibold transition-all duration-300 transform
                ${canProceed
                  ? 'bg-gradient-to-r from-[#841b60] to-[#6d164f] text-white hover:scale-105 shadow-2xl hover:shadow-[#841b60]/50'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }
              `}
            >
              Générer ma campagne →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandAssetsStep;
