
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CampaignType } from '../../utils/campaignTypes';
import GameSelectionStep from './steps/GameSelectionStep';
import BrandAssetsStep from './steps/BrandAssetsStep';
import GenerationStep from './steps/GenerationStep';
import PreviewStep from './steps/PreviewStep';
import AdvancedStep from './steps/AdvancedStep';
import PublishStep from './steps/PublishStep';
import { Settings, Upload, Sparkles, Eye, Sliders, Rocket } from 'lucide-react';

export interface WizardData {
  selectedGame?: CampaignType;
  logo?: string;
  desktopVisual?: string;
  mobileVisual?: string;
  productName?: string;
  generatedCampaign?: any;
  customizations?: any;
}

const ModernWizard: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [wizardData, setWizardData] = useState<WizardData>({
    selectedGame: searchParams.get('type') as CampaignType || undefined
  });

  const steps = [
    { id: 'game-selection', label: 'Mécanique', icon: Settings, required: true },
    { id: 'brand-assets', label: 'Contenus', icon: Upload, required: true },
    { id: 'generation', label: 'Génération', icon: Sparkles, required: false },
    { id: 'preview', label: 'Aperçu', icon: Eye, required: false },
    { id: 'advanced', label: 'Avancé', icon: Sliders, required: false },
    { id: 'publish', label: 'Publication', icon: Rocket, required: false }
  ];

  const updateWizardData = (data: Partial<WizardData>) => {
    setWizardData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  const isStepAccessible = (stepIndex: number) => {
    if (stepIndex === 0) return true;
    if (stepIndex === 1) return wizardData.selectedGame;
    if (stepIndex === 2) return wizardData.selectedGame && wizardData.logo && wizardData.productName;
    return stepIndex <= currentStep + 1;
  };

  const renderCurrentStep = () => {
    const commonProps = {
      wizardData,
      updateWizardData,
      nextStep,
      prevStep,
      goToStep,
      currentStep,
      totalSteps: steps.length
    };

    switch (steps[currentStep].id) {
      case 'game-selection':
        return <GameSelectionStep {...commonProps} />;
      case 'brand-assets':
        return <BrandAssetsStep {...commonProps} />;
      case 'generation':
        return <GenerationStep {...commonProps} />;
      case 'preview':
        return <PreviewStep {...commonProps} />;
      case 'advanced':
        return <AdvancedStep {...commonProps} />;
      case 'publish':
        return <PublishStep {...commonProps} />;
      default:
        return <GameSelectionStep {...commonProps} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#141e29] mb-2">
            Créer une nouvelle campagne
          </h1>
          <p className="text-gray-600 text-lg">
            Configurez votre expérience interactive en quelques étapes
          </p>
        </div>

        {/* Horizontal Stepper */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/50 shadow-sm mb-8 p-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === index;
              const isCompleted = currentStep > index;
              const isAccessible = isStepAccessible(index);
              
              return (
                <React.Fragment key={step.id}>
                  <button
                    onClick={() => isAccessible && goToStep(index)}
                    disabled={!isAccessible}
                    className={`
                      group flex flex-col items-center space-y-2 px-4 py-3 rounded-xl transition-all duration-200
                      ${isActive 
                        ? 'bg-[#951b6d] text-white shadow-lg scale-105' 
                        : isCompleted
                        ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                        : isAccessible
                        ? 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:scale-105'
                        : 'bg-gray-25 text-gray-300 cursor-not-allowed opacity-50'
                      }
                    `}
                  >
                    <div className={`
                      w-10 h-10 rounded-xl flex items-center justify-center transition-colors
                      ${isActive 
                        ? 'bg-white/20' 
                        : isCompleted
                        ? 'bg-emerald-100'
                        : 'bg-white/80'
                      }
                    `}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium">{step.label}</span>
                  </button>
                  
                  {index < steps.length - 1 && (
                    <div className={`
                      flex-1 h-px mx-4 transition-colors duration-300
                      ${currentStep > index ? 'bg-emerald-300' : 'bg-gray-200'}
                    `} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="transition-all duration-300">
          {renderCurrentStep()}
        </div>
      </div>
    </div>
  );
};

export default ModernWizard;
