
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#841b60] to-[#6d164f] rounded-2xl mb-6 shadow-lg">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Donnez vie à votre
            <span className="text-[#841b60]"> marque</span>
          </h1>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Uploadez vos assets pour créer une expérience sur-mesure qui captivera votre audience.
          </p>
        </div>

        {/* Content Form */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-gray-200/50 p-8 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Logo Upload */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-2 h-2 bg-[#841b60] rounded-full"></div>
                <label className="block text-gray-900 font-semibold text-lg">
                  Logo de votre marque
                </label>
                <span className="text-[#841b60] text-sm font-medium">*</span>
              </div>
              <div className="relative group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload('logoUrl', e.target.files[0])}
                  className="hidden"
                  id="logo-upload"
                />
                <label
                  htmlFor="logo-upload"
                  className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-[#841b60] hover:bg-[#841b60]/5 transition-all duration-300 bg-white/50 backdrop-blur-sm group-hover:shadow-lg"
                >
                  {campaign.design?.logoUrl ? (
                    <div className="relative">
                      <img src={campaign.design.logoUrl} alt="Logo" className="max-h-36 max-w-full object-contain rounded-xl" />
                      <div className="absolute inset-0 bg-black/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-gray-700 font-medium bg-white/90 px-3 py-1 rounded-lg">Changer le logo</span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#841b60]/10 transition-colors duration-300">
                        <Upload className="w-6 h-6 text-gray-400 group-hover:text-[#841b60] transition-colors duration-300" />
                      </div>
                      <span className="text-gray-600 text-base font-medium group-hover:text-gray-800 transition-colors duration-300">Cliquez pour ajouter votre logo</span>
                      <span className="text-gray-400 text-sm mt-1">PNG, JPG, SVG (max 5MB)</span>
                    </>
                  )}
                </label>
              </div>
            </div>

            {/* Desktop Visual */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-2 h-2 bg-[#841b60] rounded-full"></div>
                <label className="block text-gray-900 font-semibold text-lg">
                  Visuel desktop
                </label>
                <span className="text-[#841b60] text-sm font-medium">*</span>
              </div>
              <div className="relative group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload('backgroundImage', e.target.files[0])}
                  className="hidden"
                  id="desktop-upload"
                />
                <label
                  htmlFor="desktop-upload"
                  className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-[#841b60] hover:bg-[#841b60]/5 transition-all duration-300 bg-white/50 backdrop-blur-sm group-hover:shadow-lg"
                >
                  {campaign.design?.backgroundImage ? (
                    <div className="relative">
                      <img src={campaign.design.backgroundImage} alt="Desktop Visual" className="max-h-36 max-w-full object-contain rounded-xl" />
                      <div className="absolute inset-0 bg-black/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-gray-700 font-medium bg-white/90 px-3 py-1 rounded-lg">Changer le visuel</span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#841b60]/10 transition-colors duration-300">
                        <Upload className="w-6 h-6 text-gray-400 group-hover:text-[#841b60] transition-colors duration-300" />
                      </div>
                      <span className="text-gray-600 text-base font-medium group-hover:text-gray-800 transition-colors duration-300">Visuel principal de campagne</span>
                      <span className="text-gray-400 text-sm mt-1">Recommandé: 1920x1080px</span>
                    </>
                  )}
                </label>
              </div>
            </div>

            {/* Mobile Visual */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <label className="block text-gray-900 font-semibold text-lg">
                  Visuel mobile
                </label>
                <span className="text-gray-400 text-sm font-medium">(optionnel)</span>
              </div>
              <div className="relative group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload('mobileBackgroundImage', e.target.files[0])}
                  className="hidden"
                  id="mobile-upload"
                />
                <label
                  htmlFor="mobile-upload"
                  className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 bg-white/50 backdrop-blur-sm group-hover:shadow-lg"
                >
                  {campaign.design?.mobileBackgroundImage ? (
                    <div className="relative">
                      <img src={campaign.design.mobileBackgroundImage} alt="Mobile Visual" className="max-h-36 max-w-full object-contain rounded-xl" />
                      <div className="absolute inset-0 bg-black/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-gray-700 font-medium bg-white/90 px-3 py-1 rounded-lg">Changer le visuel mobile</span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-50 transition-colors duration-300">
                        <Upload className="w-6 h-6 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                      </div>
                      <span className="text-gray-600 text-base font-medium group-hover:text-gray-800 transition-colors duration-300">Version mobile optimisée</span>
                      <span className="text-gray-400 text-sm mt-1">Fallback: visuel desktop</span>
                    </>
                  )}
                </label>
              </div>
            </div>

            {/* Product Name */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-2 h-2 bg-[#841b60] rounded-full"></div>
                <label className="block text-gray-900 font-semibold text-lg">
                  Nom du produit/offre
                </label>
                <span className="text-[#841b60] text-sm font-medium">*</span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={campaign.name || ''}
                  onChange={(e) => setCampaign({ ...campaign, name: e.target.value })}
                  placeholder="Ex: iPhone 15 Pro, Formation Marketing..."
                  className="w-full h-16 px-6 bg-white/70 backdrop-blur-sm border-2 border-gray-200 rounded-2xl text-gray-900 text-base placeholder-gray-400 focus:outline-none focus:border-[#841b60] focus:bg-white transition-all duration-300 shadow-sm"
                />
                {campaign.name && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="mt-12 flex justify-center">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-[#841b60] rounded-full"></div>
              <div className="w-12 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div className={`h-full bg-[#841b60] rounded-full transition-all duration-1000 ${canProceed ? 'w-full' : 'w-1/2'}`}></div>
              </div>
              <div className={`w-2 h-2 rounded-full transition-all duration-500 ${canProceed ? 'bg-[#841b60]' : 'bg-gray-300'}`}></div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center mt-10">
            <button
              onClick={onPrev}
              className="flex items-center space-x-2 px-6 py-3 text-gray-600 hover:text-gray-800 transition-all duration-300 hover:bg-gray-50 rounded-xl group border border-gray-200"
            >
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full group-hover:bg-gray-600 transition-colors duration-300"></div>
              <span className="text-base font-medium">Retour</span>
            </button>
            
            <button
              onClick={onNext}
              disabled={!canProceed}
              className={`
                relative flex items-center space-x-3 px-8 py-3 rounded-xl font-semibold text-base transition-all duration-300 transform
                ${canProceed
                  ? 'bg-gradient-to-r from-[#841b60] to-[#6d164f] text-white hover:scale-105 shadow-lg hover:shadow-xl group'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }
              `}
            >
              <span>Générer ma campagne</span>
              <div className={`w-1.5 h-1.5 rounded-full ${canProceed ? 'bg-white group-hover:animate-pulse' : 'bg-gray-400'}`}></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentStep;
