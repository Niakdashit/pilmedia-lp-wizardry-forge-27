
import React from 'react';
import { Upload, Sparkles } from 'lucide-react';

interface ContentStepProps {
  campaign: any;
  setCampaign: (campaign: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

const ContentStep: React.FC<ContentStepProps> = ({ campaign, setCampaign, onNext, onPrev }) => {
  const handleFileUpload = (field: string, file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setCampaign({
        ...campaign,
        design: {
          ...campaign.design,
          [field]: reader.result as string
        }
      });
    };
    reader.readAsDataURL(file);
  };

  const canProceed = campaign.design?.logoUrl && campaign.design?.backgroundImage && campaign.name;

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-6 bg-gradient-to-br from-[#161B33] to-[#24123B] relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 bg-blue-400/25 rounded-full blur-3xl animate-pulse" style={{animationDuration: '2.5s'}}></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-[#841b60]/30 rounded-full blur-2xl animate-ping" style={{animationDuration: '3.5s'}}></div>
      </div>

      <div className="max-w-4xl mx-auto w-full relative z-10">
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
                  onChange={(e) => e.target.files?.[0] && handleFileUpload('logoUrl', e.target.files[0])}
                  className="hidden"
                  id="logo-upload"
                />
                <label
                  htmlFor="logo-upload"
                  className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-white/30 rounded-2xl cursor-pointer hover:border-[#841b60] hover:bg-white/5 transition-all duration-300"
                >
                  {campaign.design?.logoUrl ? (
                    <img src={campaign.design.logoUrl} alt="Logo" className="max-h-40 max-w-full object-contain" />
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
                  onChange={(e) => e.target.files?.[0] && handleFileUpload('backgroundImage', e.target.files[0])}
                  className="hidden"
                  id="desktop-upload"
                />
                <label
                  htmlFor="desktop-upload"
                  className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-white/30 rounded-2xl cursor-pointer hover:border-[#841b60] hover:bg-white/5 transition-all duration-300"
                >
                  {campaign.design?.backgroundImage ? (
                    <img src={campaign.design.backgroundImage} alt="Desktop Visual" className="max-h-40 max-w-full object-contain" />
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
                  onChange={(e) => e.target.files?.[0] && handleFileUpload('mobileBackgroundImage', e.target.files[0])}
                  className="hidden"
                  id="mobile-upload"
                />
                <label
                  htmlFor="mobile-upload"
                  className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-white/30 rounded-2xl cursor-pointer hover:border-[#841b60] hover:bg-white/5 transition-all duration-300"
                >
                  {campaign.design?.mobileBackgroundImage ? (
                    <img src={campaign.design.mobileBackgroundImage} alt="Mobile Visual" className="max-h-40 max-w-full object-contain" />
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
                value={campaign.name || ''}
                onChange={(e) => setCampaign({ ...campaign, name: e.target.value })}
                placeholder="Ex: iPhone 15 Pro, Formation Marketing..."
                className="w-full h-16 px-6 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-[#841b60] focus:bg-white/15 transition-all duration-300"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center mt-12">
            <button
              onClick={onPrev}
              className="px-8 py-4 text-gray-300 hover:text-white transition-colors duration-300"
            >
              ← Retour
            </button>
            
            <button
              onClick={onNext}
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

export default ContentStep;
