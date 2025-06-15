
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CampaignType } from '../../utils/campaignTypes';
import GameSelectionStep from './steps/GameSelectionStep';
import BrandAssetsStep from './steps/BrandAssetsStep';
import GenerationStep from './steps/GenerationStep';
import PreviewStep from './steps/PreviewStep';
import AdvancedStep from './steps/AdvancedStep';
import PublishStep from './steps/PublishStep';
import { Settings, Wand2, Eye, Sparkles, FileText, Upload } from 'lucide-react';

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
    { id: 'game-selection', label: 'Configuration', icon: Settings },
    { id: 'brand-assets', label: 'Contenu', icon: Upload },
    { id: 'generation', label: 'Jeu', icon: Wand2 },
    { id: 'preview', label: 'Textes', icon: FileText },
    { id: 'advanced', label: 'Aperçu', icon: Eye },
    { id: 'publish', label: 'Publication', icon: Sparkles }
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
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Header with stepper */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-[#141e29] mb-2">Créer une nouvelle campagne</h1>
            <p className="text-gray-600">Configurez votre expérience interactive en quelques étapes simples</p>
          </div>
          
          {/* Step Navigation */}
          <div className="flex items-center space-x-1 overflow-x-auto">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === index;
              const isCompleted = currentStep > index;
              
              return (
                <button
                  key={step.id}
                  onClick={() => goToStep(index)}
                  className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200 whitespace-nowrap ${
                    isActive 
                      ? 'bg-[#951b6d] text-white shadow-sm' 
                      : isCompleted
                      ? 'bg-green-50 text-green-700 hover:bg-green-100'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium text-sm">{step.label}</span>
                  
                  {isCompleted && (
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        {renderCurrentStep()}
      </div>
    </div>
  );
};

export default ModernWizard;
