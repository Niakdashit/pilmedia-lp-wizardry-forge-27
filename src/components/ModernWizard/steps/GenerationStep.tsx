
import React, { useEffect, useState } from 'react';
import { WizardData } from '../ModernWizard';
import { Sparkles, Wand2 } from 'lucide-react';

interface GenerationStepProps {
  wizardData: WizardData;
  updateWizardData: (data: Partial<WizardData>) => void;
  nextStep: () => void;
}

const GenerationStep: React.FC<GenerationStepProps> = ({
  wizardData,
  updateWizardData,
  nextStep
}) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const generationSteps = [
    'Analyse de votre marque...',
    'Génération du contenu...',
    'Création des visuels...',
    'Optimisation mobile...',
    'Finalisation...'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Simulate campaign generation
          updateWizardData({
            generatedCampaign: {
              title: `Campagne ${wizardData.productName}`,
              description: `Participez à notre jeu interactif et tentez de gagner des prix exclusifs avec ${wizardData.productName}!`,
              cta: 'Participer maintenant',
              instructions: 'Suivez les instructions à l\'écran pour jouer',
              colors: {
                primary: '#841b60',
                secondary: '#6d164f'
              }
            }
          });
          setTimeout(nextStep, 1000);
          return 100;
        }
        
        const newProgress = prev + 2;
        const stepIndex = Math.floor((newProgress / 100) * generationSteps.length);
        setCurrentStep(Math.min(stepIndex, generationSteps.length - 1));
        
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [updateWizardData, nextStep, wizardData.productName]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-2xl mx-auto text-center">
        {/* Main Icon */}
        <div className="relative mb-12">
          <div className="w-32 h-32 bg-gradient-to-br from-[#841b60] to-[#6d164f] rounded-full flex items-center justify-center mx-auto shadow-2xl">
            <Wand2 className="w-16 h-16 text-white animate-pulse" />
          </div>
          
          {/* Floating sparkles */}
          <div className="absolute top-0 left-0 w-full h-full">
            <Sparkles className="absolute top-4 right-8 w-6 h-6 text-yellow-400 animate-ping" />
            <Sparkles className="absolute bottom-8 left-4 w-4 h-4 text-blue-400 animate-ping" style={{animationDelay: '0.5s'}} />
            <Sparkles className="absolute top-12 left-12 w-5 h-5 text-violet-400 animate-ping" style={{animationDelay: '1s'}} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-5xl font-bold text-white mb-6">
          Création en cours...
        </h1>

        {/* Current Step */}
        <p className="text-2xl text-gray-300 mb-12">
          {generationSteps[currentStep]}
        </p>

        {/* Progress Bar */}
        <div className="w-full max-w-md mx-auto mb-8">
          <div className="h-3 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#841b60] to-[#a855f7] transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-white text-sm mt-2">{Math.round(progress)}%</div>
        </div>

        {/* Background Animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GenerationStep;
