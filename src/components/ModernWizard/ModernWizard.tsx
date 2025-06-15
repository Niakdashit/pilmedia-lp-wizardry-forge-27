
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CampaignType } from '../../utils/campaignTypes';
import GameSelectionStep from './steps/GameSelectionStep';
import BrandAssetsStep from './steps/BrandAssetsStep';
import GenerationStep from './steps/GenerationStep';
import PreviewStep from './steps/PreviewStep';
import AdvancedStep from './steps/AdvancedStep';
import PublishStep from './steps/PublishStep';

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
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [wizardData, setWizardData] = useState<WizardData>({
    selectedGame: searchParams.get('type') as CampaignType || undefined
  });

  const steps = [
    'game-selection',
    'brand-assets',
    'generation',
    'preview',
    'advanced',
    'publish'
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

    switch (steps[currentStep]) {
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
    <div className="min-h-screen bg-gradient-to-br from-[#161B33] to-[#24123B] relative overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 bg-blue-400/25 rounded-full blur-3xl animate-pulse" style={{animationDuration: '2.5s'}}></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-[#841b60]/30 rounded-full blur-2xl animate-ping" style={{animationDuration: '3.5s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-48 h-48 bg-indigo-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s', animationDuration: '4s'}}></div>
        <div className="absolute top-1/3 right-10 w-28 h-28 bg-violet-400/25 rounded-full blur-2xl animate-ping" style={{animationDuration: '5s', animationDelay: '2s'}}></div>
        
        {/* Glass morphism overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1f3a]/30 via-transparent to-[#2a1340]/15"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {renderCurrentStep()}
      </div>
    </div>
  );
};

export default ModernWizard;
