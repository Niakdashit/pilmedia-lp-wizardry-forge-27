
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WizardData } from '../ModernWizard';
import { Rocket, Link, Code, Share2, CheckCircle, Sparkles } from 'lucide-react';

interface PublishStepProps {
  wizardData: WizardData;
}

const PublishStep: React.FC<PublishStepProps> = ({ wizardData }) => {
  const navigate = useNavigate();
  const [isPublishing, setIsPublishing] = useState(false);
  const [isPublished, setIsPublished] = useState(false);

  const handlePublish = async () => {
    setIsPublishing(true);
    
    // Simulate publishing process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsPublishing(false);
    setIsPublished(true);
  };

  const handleFinish = () => {
    navigate('/gamification');
  };

  if (isPublishing) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-lg mx-auto">
          <div className="relative mb-12">
            <div className="w-32 h-32 bg-gradient-to-br from-[#841b60] to-[#6d164f] rounded-full flex items-center justify-center mx-auto shadow-2xl animate-pulse">
              <Rocket className="w-16 h-16 text-white" />
            </div>
            <div className="absolute inset-0 animate-ping">
              <div className="w-32 h-32 bg-[#841b60]/30 rounded-full mx-auto"></div>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-4">
            Publication en cours...
          </h1>
          <p className="text-xl text-gray-300">
            Votre campagne va bientôt être disponible
          </p>
        </div>
      </div>
    );
  }

  if (isPublished) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-2xl mx-auto">
          {/* Success Animation */}
          <div className="relative mb-12">
            <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-2xl">
              <CheckCircle className="w-16 h-16 text-white" />
            </div>
            <div className="absolute inset-0">
              {[...Array(6)].map((_, i) => (
                <Sparkles 
                  key={i}
                  className="absolute w-6 h-6 text-yellow-400 animate-ping"
                  style={{
                    top: `${20 + Math.sin(i * 60 * Math.PI / 180) * 40}%`,
                    left: `${50 + Math.cos(i * 60 * Math.PI / 180) * 40}%`,
                    animationDelay: `${i * 0.2}s`
                  }}
                />
              ))}
            </div>
          </div>

          <h1 className="text-5xl font-bold text-white mb-6">
            🎉 Félicitations !
          </h1>
          <p className="text-xl text-gray-300 mb-12">
            Votre campagne <strong>{wizardData.productName}</strong> est maintenant publiée et prête à captiver votre audience.
          </p>

          {/* Share Options */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 mb-8">
            <h3 className="text-white font-semibold text-lg mb-6">Partagez votre campagne</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="flex items-center justify-center space-x-3 p-4 bg-white/10 border border-white/20 rounded-2xl text-white hover:bg-white/20 transition-all duration-300">
                <Link className="w-5 h-5" />
                <span>Lien direct</span>
              </button>
              <button className="flex items-center justify-center space-x-3 p-4 bg-white/10 border border-white/20 rounded-2xl text-white hover:bg-white/20 transition-all duration-300">
                <Code className="w-5 h-5" />
                <span>Code d'intégration</span>
              </button>
              <button className="flex items-center justify-center space-x-3 p-4 bg-white/10 border border-white/20 rounded-2xl text-white hover:bg-white/20 transition-all duration-300">
                <Share2 className="w-5 h-5" />
                <span>Réseaux sociaux</span>
              </button>
            </div>
          </div>

          <button
            onClick={handleFinish}
            className="px-12 py-4 bg-gradient-to-r from-[#841b60] to-[#6d164f] text-white rounded-2xl font-semibold hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-[#841b60]/50"
          >
            Voir toutes mes campagnes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#841b60] to-[#6d164f] rounded-3xl mb-6">
            <Rocket className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Prêt pour le décollage ?
          </h1>
          <p className="text-xl text-gray-300">
            Votre campagne est configurée et prête à être publiée
          </p>
        </div>

        {/* Campaign Summary */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 mb-8 shadow-2xl">
          <h3 className="text-white font-semibold text-lg mb-6">Résumé de votre campagne</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Info */}
            <div className="space-y-4">
              <div>
                <span className="text-gray-400 text-sm block">Produit/Offre</span>
                <span className="text-white font-semibold">{wizardData.productName}</span>
              </div>
              <div>
                <span className="text-gray-400 text-sm block">Type de jeu</span>
                <span className="text-white font-semibold capitalize">{wizardData.selectedGame}</span>
              </div>
              <div>
                <span className="text-gray-400 text-sm block">Titre</span>
                <span className="text-white font-semibold">{wizardData.generatedCampaign?.title}</span>
              </div>
              <div>
                <span className="text-gray-400 text-sm block">Description</span>
                <span className="text-white">{wizardData.generatedCampaign?.description}</span>
              </div>
            </div>

            {/* Visuals */}
            <div className="space-y-4">
              {wizardData.logo && (
                <div>
                  <span className="text-gray-400 text-sm block mb-2">Logo</span>
                  <img src={wizardData.logo} alt="Logo" className="h-16 bg-white rounded-lg p-2" />
                </div>
              )}
              {wizardData.desktopVisual && (
                <div>
                  <span className="text-gray-400 text-sm block mb-2">Visuel principal</span>
                  <img src={wizardData.desktopVisual} alt="Visual" className="w-32 h-20 object-cover rounded-lg" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Publish Button */}
        <div className="text-center">
          <button
            onClick={handlePublish}
            className="group relative px-16 py-6 bg-gradient-to-r from-[#841b60] to-[#6d164f] text-white rounded-3xl font-bold text-xl hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-[#841b60]/50 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <div className="relative flex items-center justify-center space-x-3">
              <Rocket className="w-8 h-8" />
              <span>Publier ma campagne</span>
            </div>
          </button>
          
          <p className="text-gray-400 text-sm mt-4">
            Votre campagne sera instantanément disponible et prête à recevoir des participants
          </p>
        </div>
      </div>
    </div>
  );
};

export default PublishStep;
