
import React, { useState, useEffect } from 'react';
import { WizardData } from '../ModernWizard';
import { Sparkles, CheckCircle, Loader } from 'lucide-react';

interface GenerationStepProps {
  wizardData: WizardData;
  updateWizardData: (data: Partial<WizardData>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const GenerationStep: React.FC<GenerationStepProps> = ({
  wizardData,
  updateWizardData,
  nextStep,
  prevStep
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isComplete && !isGenerating) {
      handleGenerate();
    }
  }, []);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setProgress(0);
    
    // Simulate AI generation with progress
    const steps = [
      'Analyse de vos contenus...',
      'Génération des textes...',
      'Personnalisation visuelle...',
      'Finalisation...'
    ];
    
    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setProgress(((i + 1) / steps.length) * 100);
    }
    
    // Generate campaign data
    const generatedCampaign = {
      id: Date.now().toString(),
      name: wizardData.productName || 'Ma Campagne',
      type: wizardData.selectedGame,
      status: 'draft',
      title: `Gagnez avec ${wizardData.productName}`,
      description: 'Participez à notre jeu et tentez de remporter des prix exceptionnels !',
      cta: 'Jouer maintenant',
      design: {
        primaryColor: '#951b6d',
        background: '#f8fafc'
      }
    };
    
    updateWizardData({ generatedCampaign });
    setIsGenerating(false);
    setIsComplete(true);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/50 shadow-sm p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#141e29] mb-3">
            Génération de votre campagne
          </h2>
          <p className="text-gray-600 leading-relaxed max-w-3xl">
            Notre IA analyse vos contenus et génère automatiquement une campagne personnalisée.
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-sm p-8 text-center mb-8">
          {isGenerating ? (
            <div className="space-y-6">
              <div className="w-20 h-20 bg-[#951b6d]/10 rounded-2xl flex items-center justify-center mx-auto">
                <Sparkles className="w-10 h-10 text-[#951b6d] animate-pulse" />
              </div>
              <div>
                <h3 className="font-semibold text-[#141e29] mb-2 text-lg">Génération en cours...</h3>
                <p className="text-gray-600">Personnalisation de votre expérience</p>
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
          ) : isComplete ? (
            <div className="space-y-6">
              <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-semibold text-[#141e29] mb-2 text-lg">Campagne générée avec succès !</h3>
                <p className="text-gray-600">Votre expérience interactive est prête</p>
              </div>
            </div>
          ) : null}
        </div>

        {isComplete && wizardData.generatedCampaign && (
          <div className="bg-gradient-to-r from-emerald-50 to-[#951b6d]/5 rounded-2xl border border-emerald-200 p-6 mb-8">
            <h3 className="font-semibold text-[#141e29] mb-4">Aperçu de votre campagne</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium text-[#141e29] capitalize">{wizardData.selectedGame}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Titre:</span>
                  <span className="font-medium text-[#141e29]">{wizardData.generatedCampaign.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Statut:</span>
                  <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full font-medium">
                    Brouillon
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Contenus ajoutés:</span>
                  <span className="font-medium text-[#141e29]">
                    {[wizardData.logo, wizardData.desktopVisual, wizardData.mobileVisual].filter(Boolean).length}/3
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Personnalisation:</span>
                  <span className="font-medium text-emerald-600">Automatique</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center">
          <button
            onClick={prevStep}
            className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-200 hover:scale-105"
          >
            Retour
          </button>
          {isComplete && (
            <button
              onClick={nextStep}
              className="px-8 py-3 bg-[#951b6d] text-white font-semibold rounded-xl hover:bg-[#7d1659] transition-all duration-200 hover:scale-105 shadow-lg"
            >
              Voir l'aperçu
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GenerationStep;
