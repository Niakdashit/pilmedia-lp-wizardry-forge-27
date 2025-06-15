
import React, { useState } from 'react';
import { WizardData } from '../ModernWizard';
import { CheckCircle, Rocket, Copy, ExternalLink, Share, BarChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PublishStepProps {
  wizardData: WizardData;
  prevStep: () => void;
}

const PublishStep: React.FC<PublishStepProps> = ({
  wizardData,
  prevStep
}) => {
  const navigate = useNavigate();
  const [isPublishing, setIsPublishing] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [progress, setProgress] = useState(0);
  const [campaignUrl] = useState(`https://campaign.leadya.com/${Date.now()}`);

  const handlePublish = async () => {
    setIsPublishing(true);
    setProgress(0);
    
    const steps = ['Finalisation...', 'Déploiement...', 'Activation...'];
    
    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProgress(((i + 1) / steps.length) * 100);
    }
    
    setIsPublishing(false);
    setIsPublished(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(campaignUrl);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/50 shadow-sm p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#141e29] mb-3">
            Publication de votre campagne
          </h2>
          <p className="text-gray-600 leading-relaxed max-w-3xl">
            Votre expérience interactive est prête ! Publiez-la pour commencer à collecter des participations.
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-sm p-8 text-center mb-8">
          {isPublishing ? (
            <div className="space-y-6">
              <div className="w-20 h-20 bg-[#951b6d]/10 rounded-2xl flex items-center justify-center mx-auto">
                <Rocket className="w-10 h-10 text-[#951b6d] animate-bounce" />
              </div>
              <div>
                <h3 className="font-semibold text-[#141e29] mb-2 text-lg">Publication en cours...</h3>
                <p className="text-gray-600">Déploiement de votre campagne</p>
              </div>
              <div className="w-full max-w-md mx-auto">
                <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-[#951b6d] to-emerald-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-500 mt-2">{Math.round(progress)}%</div>
              </div>
            </div>
          ) : isPublished ? (
            <div className="space-y-6">
              <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-semibold text-[#141e29] mb-2 text-lg">Campagne publiée avec succès !</h3>
                <p className="text-gray-600">Votre expérience est maintenant accessible à vos participants</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="w-20 h-20 bg-[#951b6d]/10 rounded-2xl flex items-center justify-center mx-auto">
                <Rocket className="w-10 h-10 text-[#951b6d]" />
              </div>
              <div>
                <h3 className="font-semibold text-[#141e29] mb-2 text-lg">Prêt à publier</h3>
                <p className="text-gray-600 mb-6">
                  Votre campagne "{wizardData.productName}" est configurée et prête à être diffusée
                </p>
                <button
                  onClick={handlePublish}
                  className="px-10 py-4 bg-[#951b6d] text-white font-semibold rounded-xl hover:bg-[#7d1659] transition-all duration-200 hover:scale-105 shadow-lg text-lg"
                >
                  Publier maintenant
                </button>
              </div>
            </div>
          )}
        </div>

        {isPublished && (
          <>
            {/* Campaign URL */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-sm p-6 mb-6">
              <h3 className="font-semibold text-[#141e29] mb-4">Lien de votre campagne</h3>
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                <input
                  type="text"
                  value={campaignUrl}
                  readOnly
                  className="flex-1 bg-transparent border-none outline-none text-gray-700 font-medium"
                />
                <button
                  onClick={copyToClipboard}
                  className="p-3 text-gray-500 hover:text-[#951b6d] hover:bg-white rounded-lg transition-all duration-200 hover:scale-105"
                  title="Copier le lien"
                >
                  <Copy className="w-5 h-5" />
                </button>
                <a
                  href={campaignUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 text-gray-500 hover:text-[#951b6d] hover:bg-white rounded-lg transition-all duration-200 hover:scale-105"
                  title="Ouvrir dans un nouvel onglet"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-gradient-to-r from-emerald-50 to-[#951b6d]/5 rounded-2xl border border-emerald-200 p-6 mb-8">
              <h3 className="font-semibold text-[#141e29] mb-4">Prochaines étapes</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => navigate('/campaigns')}
                  className="p-6 text-left bg-white/60 backdrop-blur-sm border border-white/50 rounded-xl hover:bg-white/80 hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <div className="w-10 h-10 bg-[#951b6d]/10 rounded-xl flex items-center justify-center mb-4">
                    <BarChart className="w-5 h-5 text-[#951b6d]" />
                  </div>
                  <h4 className="font-semibold text-[#141e29] mb-2">Gérer la campagne</h4>
                  <p className="text-sm text-gray-600">Voir les statistiques et modifier les paramètres</p>
                </button>

                <button className="p-6 text-left bg-white/60 backdrop-blur-sm border border-white/50 rounded-xl hover:bg-white/80 hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md">
                  <div className="w-10 h-10 bg-[#951b6d]/10 rounded-xl flex items-center justify-center mb-4">
                    <Share className="w-5 h-5 text-[#951b6d]" />
                  </div>
                  <h4 className="font-semibold text-[#141e29] mb-2">Partager</h4>
                  <p className="text-sm text-gray-600">Diffuser votre campagne sur vos canaux</p>
                </button>

                <button
                  onClick={() => navigate('/modern-wizard')}
                  className="p-6 text-left bg-white/60 backdrop-blur-sm border border-white/50 rounded-xl hover:bg-white/80 hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <div className="w-10 h-10 bg-[#951b6d]/10 rounded-xl flex items-center justify-center mb-4">
                    <Rocket className="w-5 h-5 text-[#951b6d]" />
                  </div>
                  <h4 className="font-semibold text-[#141e29] mb-2">Nouvelle campagne</h4>
                  <p className="text-sm text-gray-600">Créer une autre expérience interactive</p>
                </button>
              </div>
            </div>
          </>
        )}

        <div className="flex justify-between items-center">
          {!isPublished && (
            <button
              onClick={prevStep}
              className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-200 hover:scale-105"
            >
              Retour
            </button>
          )}
          {isPublished && (
            <button
              onClick={() => navigate('/campaigns')}
              className="px-8 py-3 bg-[#951b6d] text-white font-semibold rounded-xl hover:bg-[#7d1659] transition-all duration-200 hover:scale-105 shadow-lg ml-auto"
            >
              Voir mes campagnes
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublishStep;
