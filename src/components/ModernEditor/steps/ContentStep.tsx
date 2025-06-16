
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
    <div className="min-h-screen bg-gradient-to-br from-[#161B33] to-[#24123B] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 bg-blue-400/25 rounded-full blur-3xl animate-pulse" style={{animationDuration: '2.5s'}}></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-[#841b60]/30 rounded-full blur-2xl animate-ping" style={{animationDuration: '3.5s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-48 h-48 bg-indigo-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s', animationDuration: '4s'}}></div>
        <div className="absolute top-1/3 right-10 w-28 h-28 bg-violet-400/25 rounded-full blur-2xl animate-ping" style={{animationDuration: '5s', animationDelay: '2s'}}></div>
        
        {/* Glass morphism overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1f3a]/30 via-transparent to-[#2a1340]/15"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        {/* Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <div className="inline-block mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-[#841b60] to-[#6d164f] rounded-3xl flex items-center justify-center mb-6 mx-auto shadow-2xl">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
          </div>
          
          <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
            Donnez vie à votre
            <span className="bg-gradient-to-r from-[#841b60] to-[#a855f7] bg-clip-text text-transparent"> marque</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-12 leading-relaxed max-w-2xl mx-auto">
            Uploadez vos assets pour créer une expérience sur-mesure qui captivera votre audience.
          </p>
        </div>

        {/* Content Form */}
        <div className="w-full max-w-6xl mx-auto">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-12 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Logo Upload */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-3 h-3 bg-[#841b60] rounded-full"></div>
                  <label className="block text-white font-semibold text-xl">
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
                    className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-white/30 rounded-3xl cursor-pointer hover:border-[#841b60] hover:bg-white/5 transition-all duration-500 group-hover:scale-[1.02] transform"
                  >
                    {campaign.design?.logoUrl ? (
                      <div className="relative">
                        <img src={campaign.design.logoUrl} alt="Logo" className="max-h-48 max-w-full object-contain rounded-2xl" />
                        <div className="absolute inset-0 bg-black/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <span className="text-white font-medium">Changer le logo</span>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#841b60]/30 transition-colors duration-300">
                          <Upload className="w-8 h-8 text-gray-300 group-hover:text-white transition-colors duration-300" />
                        </div>
                        <span className="text-gray-300 text-lg group-hover:text-white transition-colors duration-300">Cliquez pour ajouter votre logo</span>
                        <span className="text-gray-500 text-sm mt-2">PNG, JPG, SVG (max 5MB)</span>
                      </>
                    )}
                  </label>
                </div>
              </div>

              {/* Desktop Visual */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-3 h-3 bg-[#841b60] rounded-full"></div>
                  <label className="block text-white font-semibold text-xl">
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
                    className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-white/30 rounded-3xl cursor-pointer hover:border-[#841b60] hover:bg-white/5 transition-all duration-500 group-hover:scale-[1.02] transform"
                  >
                    {campaign.design?.backgroundImage ? (
                      <div className="relative">
                        <img src={campaign.design.backgroundImage} alt="Desktop Visual" className="max-h-48 max-w-full object-contain rounded-2xl" />
                        <div className="absolute inset-0 bg-black/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <span className="text-white font-medium">Changer le visuel</span>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#841b60]/30 transition-colors duration-300">
                          <Upload className="w-8 h-8 text-gray-300 group-hover:text-white transition-colors duration-300" />
                        </div>
                        <span className="text-gray-300 text-lg group-hover:text-white transition-colors duration-300">Visuel principal de campagne</span>
                        <span className="text-gray-500 text-sm mt-2">Recommandé: 1920x1080px</span>
                      </>
                    )}
                  </label>
                </div>
              </div>

              {/* Mobile Visual */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-3 h-3 bg-violet-400 rounded-full"></div>
                  <label className="block text-white font-semibold text-xl">
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
                    className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-white/30 rounded-3xl cursor-pointer hover:border-violet-400 hover:bg-white/5 transition-all duration-500 group-hover:scale-[1.02] transform"
                  >
                    {campaign.design?.mobileBackgroundImage ? (
                      <div className="relative">
                        <img src={campaign.design.mobileBackgroundImage} alt="Mobile Visual" className="max-h-48 max-w-full object-contain rounded-2xl" />
                        <div className="absolute inset-0 bg-black/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <span className="text-white font-medium">Changer le visuel mobile</span>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-violet-400/30 transition-colors duration-300">
                          <Upload className="w-8 h-8 text-gray-300 group-hover:text-white transition-colors duration-300" />
                        </div>
                        <span className="text-gray-300 text-lg group-hover:text-white transition-colors duration-300">Version mobile optimisée</span>
                        <span className="text-gray-500 text-sm mt-2">Fallback: visuel desktop</span>
                      </>
                    )}
                  </label>
                </div>
              </div>

              {/* Product Name */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-3 h-3 bg-[#841b60] rounded-full"></div>
                  <label className="block text-white font-semibold text-xl">
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
                    className="w-full h-20 px-8 bg-white/10 border-2 border-white/20 rounded-3xl text-white text-lg placeholder-gray-400 focus:outline-none focus:border-[#841b60] focus:bg-white/15 transition-all duration-300 backdrop-blur-sm"
                  />
                  {campaign.name && (
                    <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Progress Indicator */}
            <div className="mt-16 flex justify-center">
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-[#841b60] rounded-full"></div>
                <div className="w-16 h-1 bg-[#841b60]/30 rounded-full overflow-hidden">
                  <div className={`h-full bg-[#841b60] rounded-full transition-all duration-1000 ${canProceed ? 'w-full' : 'w-1/2'}`}></div>
                </div>
                <div className={`w-3 h-3 rounded-full transition-all duration-500 ${canProceed ? 'bg-[#841b60]' : 'bg-gray-600'}`}></div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center mt-12">
              <button
                onClick={onPrev}
                className="flex items-center space-x-3 px-8 py-4 text-gray-300 hover:text-white transition-all duration-300 hover:bg-white/5 rounded-2xl group"
              >
                <div className="w-2 h-2 bg-gray-400 rounded-full group-hover:bg-white transition-colors duration-300"></div>
                <span className="text-lg">Retour</span>
              </button>
              
              <button
                onClick={onNext}
                disabled={!canProceed}
                className={`
                  relative flex items-center space-x-4 px-12 py-5 rounded-3xl font-semibold text-lg transition-all duration-500 transform overflow-hidden
                  ${canProceed
                    ? 'bg-gradient-to-r from-[#841b60] to-[#6d164f] text-white hover:scale-105 shadow-2xl hover:shadow-[#841b60]/50 group'
                    : 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
                  }
                `}
              >
                {canProceed && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#a855f7] to-[#841b60] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                )}
                <span className="relative z-10">Générer ma campagne</span>
                <div className="relative z-10 w-2 h-2 bg-white rounded-full group-hover:animate-pulse"></div>
              </button>
            </div>
          </div>
          
          {/* Floating decorative elements */}
          <div className="absolute -top-8 -left-8 w-16 h-16 bg-[#841b60]/30 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute -bottom-8 -right-8 w-12 h-12 bg-violet-400/30 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
      </div>
    </div>
  );
};

export default ContentStep;
