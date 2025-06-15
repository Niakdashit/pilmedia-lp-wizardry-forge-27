
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GameSelection from './steps/GameSelection';
import BrandAssets from './steps/BrandAssets';
import AIGeneration from './steps/AIGeneration';
import LivePreview from './steps/LivePreview';
import AdvancedCustomization from './steps/AdvancedCustomization';
import FinalizePublish from './steps/FinalizePublish';
import { CampaignType } from '../../utils/campaignTypes';

export interface WizardData {
  gameType?: CampaignType;
  logo?: string;
  desktopVisual?: string;
  mobileVisual?: string;
  productName?: string;
  campaign?: any;
  isAdvanced?: boolean;
}

const ModernWizard: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [wizardData, setWizardData] = useState<WizardData>({});

  const steps = [
    { id: 'game-selection', component: GameSelection },
    { id: 'brand-assets', component: BrandAssets },
    { id: 'ai-generation', component: AIGeneration },
    { id: 'live-preview', component: LivePreview },
    { id: 'advanced-customization', component: AdvancedCustomization },
    { id: 'finalize-publish', component: FinalizePublish }
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

  const handleClose = () => {
    navigate('/gamification');
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-violet-50 via-white to-blue-50">
      {/* Close button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleClose}
        className="absolute top-6 right-6 z-50 w-12 h-12 bg-white/90 backdrop-blur-md rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border border-gray-200/50"
      >
        <X className="w-5 h-5 text-gray-600" />
      </motion.button>

      {/* Main content */}
      <div className="h-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="h-full"
          >
            <CurrentStepComponent
              wizardData={wizardData}
              updateWizardData={updateWizardData}
              nextStep={nextStep}
              prevStep={prevStep}
              goToStep={goToStep}
              currentStep={currentStep}
              totalSteps={steps.length}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ModernWizard;
