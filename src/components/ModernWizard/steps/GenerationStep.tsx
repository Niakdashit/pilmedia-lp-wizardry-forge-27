import React, { useState, useEffect } from 'react';
import { WizardData } from '../ModernWizard';
import { Loader } from 'lucide-react';

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

  useEffect(() => {
    // Auto-start generation when step loads
    if (!isGenerating) {
      handleGenerate();
    }
  }, []);

  const handleGenerate = async () => {
    setIsGenerating(true);

    try {
      const response = await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          logoUrl: wizardData.logo,
          desktopVisualUrl: wizardData.desktopVisual,
          mobileVisualUrl: wizardData.mobileVisual,
          websiteUrl: wizardData.websiteUrl,
          productName: wizardData.productName
        })
      });

      const data = await response.json();
      updateWizardData({ generatedQuiz: data });
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
      setTimeout(() => nextStep(), 500);
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Content Card */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-gray-100/50">
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#141e29] mb-3">
            Génération de votre campagne
          </h2>
          <p className="text-gray-600 leading-relaxed max-w-2xl">
            Notre IA configure automatiquement votre campagne en fonction de vos choix et éléments de marque.
          </p>
        </div>

        {/* Generation Status */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm text-center mb-8">
          <div className="space-y-6">
            <div className="w-16 h-16 bg-[#951b6d]/10 rounded-full flex items-center justify-center mx-auto">
              <Loader className="w-8 h-8 text-[#951b6d] animate-spin" />
            </div>
            <div>
              <h3 className="font-semibold text-[#141e29] mb-2">Génération en cours...</h3>
              <p className="text-gray-600">Configuration des paramètres et personnalisation</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-[#951b6d] h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={prevStep}
            className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
          >
            Retour
          </button>
          <div className="px-8 py-3 bg-gray-100 text-gray-500 font-semibold rounded-xl cursor-not-allowed">
            Génération en cours...
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerationStep;
