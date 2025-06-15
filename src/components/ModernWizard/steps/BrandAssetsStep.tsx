
import React from 'react';
import { WizardData } from '../ModernWizard';
import { Upload, Image, Monitor, Smartphone, CheckCircle } from 'lucide-react';

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

  const canContinue = wizardData.logo && wizardData.productName && wizardData.desktopVisual;

  return (
    <div className="space-y-8">
      {/* Content Container */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/50 shadow-sm p-8">
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#141e29] mb-3">
            Vos contenus de marque
          </h2>
          <p className="text-gray-600 leading-relaxed max-w-3xl">
            Ajoutez vos éléments visuels pour personnaliser automatiquement votre campagne.
          </p>
        </div>

        {/* Product Name */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-[#951b6d]/10 rounded-lg flex items-center justify-center">
              <Image className="w-4 h-4 text-[#951b6d]" />
            </div>
            <h3 className="font-semibold text-[#141e29]">Nom de votre offre</h3>
            <span className="text-[#951b6d] text-sm font-medium">Obligatoire</span>
          </div>
          <input
            type="text"
            value={wizardData.productName || ''}
            onChange={(e) => updateWizardData({ productName: e.target.value })}
            placeholder="Ex: Concours été 2024, Nouvelle collection..."
            className="w-full px-6 py-4 bg-white/60 backdrop-blur-sm border border-white/50 rounded-xl text-[#141e29] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#951b6d]/20 focus:border-[#951b6d]/30 transition-all text-lg"
          />
        </div>

        {/* Upload Areas Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Logo Upload */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-[#951b6d]/10 rounded-lg flex items-center justify-center">
                <Image className="w-4 h-4 text-[#951b6d]" />
              </div>
              <h3 className="font-semibold text-[#141e29]">Logo</h3>
              <span className="text-[#951b6d] text-sm font-medium">Obligatoire</span>
            </div>
            
            <div className="relative group">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleFileUpload('logo', e.target.files[0])}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                id="logo-upload"
              />
              <div className={`
                border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 group-hover:border-[#951b6d]/50 group-hover:bg-[#951b6d]/5
                ${wizardData.logo ? 'border-emerald-300 bg-emerald-50' : 'border-gray-200 bg-gray-50/50'}
              `}>
                {wizardData.logo ? (
                  <div className="space-y-3">
                    <img src={wizardData.logo} alt="Logo" className="max-h-16 mx-auto rounded-lg" />
                    <div className="flex items-center justify-center space-x-2 text-emerald-600">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">Logo ajouté</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto group-hover:text-[#951b6d] transition-colors" />
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Glissez votre logo ici</p>
                      <p className="text-xs text-gray-500">PNG, JPG jusqu'à 10MB</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Desktop Visual */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-[#951b6d]/10 rounded-lg flex items-center justify-center">
                <Monitor className="w-4 h-4 text-[#951b6d]" />
              </div>
              <h3 className="font-semibold text-[#141e29]">Visuel desktop</h3>
              <span className="text-[#951b6d] text-sm font-medium">Obligatoire</span>
            </div>
            
            <div className="relative group">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleFileUpload('desktopVisual', e.target.files[0])}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                id="desktop-upload"
              />
              <div className={`
                border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 group-hover:border-[#951b6d]/50 group-hover:bg-[#951b6d]/5
                ${wizardData.desktopVisual ? 'border-emerald-300 bg-emerald-50' : 'border-gray-200 bg-gray-50/50'}
              `}>
                {wizardData.desktopVisual ? (
                  <div className="space-y-3">
                    <img src={wizardData.desktopVisual} alt="Desktop visual" className="max-h-16 mx-auto rounded-lg" />
                    <div className="flex items-center justify-center space-x-2 text-emerald-600">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">Visuel ajouté</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto group-hover:text-[#951b6d] transition-colors" />
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Visuel principal</p>
                      <p className="text-xs text-gray-500">Affiché sur ordinateur</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Visual */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <Smartphone className="w-4 h-4 text-gray-600" />
              </div>
              <h3 className="font-semibold text-[#141e29]">Visuel mobile</h3>
              <span className="text-gray-500 text-sm">Optionnel</span>
            </div>
            
            <div className="relative group">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleFileUpload('mobileVisual', e.target.files[0])}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                id="mobile-upload"
              />
              <div className={`
                border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 group-hover:border-[#951b6d]/50 group-hover:bg-[#951b6d]/5
                ${wizardData.mobileVisual ? 'border-emerald-300 bg-emerald-50' : 'border-gray-200 bg-gray-50/50'}
              `}>
                {wizardData.mobileVisual ? (
                  <div className="space-y-3">
                    <img src={wizardData.mobileVisual} alt="Mobile visual" className="max-h-16 mx-auto rounded-lg" />
                    <div className="flex items-center justify-center space-x-2 text-emerald-600">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">Visuel ajouté</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto group-hover:text-[#951b6d] transition-colors" />
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Version mobile</p>
                      <p className="text-xs text-gray-500">Sinon desktop utilisé</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={prevStep}
            className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-200 hover:scale-105"
          >
            Retour
          </button>
          
          {canContinue ? (
            <button
              onClick={nextStep}
              className="px-8 py-3 bg-[#951b6d] text-white font-semibold rounded-xl hover:bg-[#7d1659] transition-all duration-200 hover:scale-105 shadow-lg"
            >
              Lancer la génération
            </button>
          ) : (
            <div className="text-gray-500 text-sm">
              Ajoutez vos contenus obligatoires pour continuer
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrandAssetsStep;
