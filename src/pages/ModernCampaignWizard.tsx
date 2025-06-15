
import React, { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import GameMechanicSelection from '../components/ModernWizard/steps/GameMechanicSelection';
import GameConfiguration from '../components/ModernWizard/steps/GameConfiguration';
import BrandCustomization from '../components/ModernWizard/steps/BrandCustomization';
import AIGeneration from '../components/ModernWizard/steps/AIGeneration';
import LivePreview from '../components/ModernWizard/steps/LivePreview';
import FinalizePublish from '../components/ModernWizard/steps/FinalizePublish';
import WizardProgress from '../components/ModernWizard/WizardProgress';

export type GameType = 'wheel' | 'quiz' | 'jackpot' | 'memory' | 'puzzle' | 'dice' | 'scratch';

export interface CampaignData {
  gameType: GameType | null;
  logo?: File | string;
  mainColor: string;
  slogan: string;
  campaignGoal: string;
  targetAudience: string;
  gameConfig: any;
  brandConfig: any;
  generatedContent: any;
}

const ModernCampaignWizard: React.FC = () => {
  const { type } = useParams();
  const [searchParams] = useSearchParams();
  const preselectedType = searchParams.get('type') as GameType;
  
  const [currentStep, setCurrentStep] = useState(preselectedType ? 2 : 1);
  const [campaignData, setCampaignData] = useState<CampaignData>({
    gameType: preselectedType || null,
    mainColor: '#841b60',
    slogan: '',
    campaignGoal: '',
    targetAudience: '',
    gameConfig: {},
    brandConfig: {},
    generatedContent: null
  });

  const steps = [
    { id: 1, name: 'Game Selection', component: GameMechanicSelection },
    { id: 2, name: 'Configuration', component: GameConfiguration },
    { id: 3, name: 'Brand Identity', component: BrandCustomization },
    { id: 4, name: 'AI Generation', component: AIGeneration },
    { id: 5, name: 'Live Preview', component: LivePreview },
    { id: 6, name: 'Publish', component: FinalizePublish }
  ];

  const currentStepData = steps.find(step => step.id === currentStep);
  const CurrentStepComponent = currentStepData?.component;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateCampaignData = (updates: Partial<CampaignData>) => {
    setCampaignData(prev => ({ ...prev, ...updates }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-[#841b60] to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">L</span>
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Campaign Creator</h1>
            </div>
            
            <WizardProgress 
              currentStep={currentStep} 
              totalSteps={steps.length}
              steps={steps}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {CurrentStepComponent && (
              <CurrentStepComponent
                campaignData={campaignData}
                updateCampaignData={updateCampaignData}
                onNext={handleNext}
                onBack={handleBack}
                isFirstStep={currentStep === 1}
                isLastStep={currentStep === steps.length}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ModernCampaignWizard;
