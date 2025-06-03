
import React from 'react';
import { useQuickCampaignStore } from '../../stores/quickCampaignStore';
import Step1GameSelection from './Step1GameSelection';
import Step2BasicSettings from './Step2BasicSettings';
import Step3VisualStyle from './Step3VisualStyle';

const QuickCampaignCreator: React.FC = () => {
  const { currentStep } = useQuickCampaignStore();

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1GameSelection />;
      case 2:
        return <Step2BasicSettings />;
      case 3:
        return <Step3VisualStyle />;
      default:
        return <Step1GameSelection />;
    }
  };

  return (
    <div className="w-full min-h-screen bg-white">
      {renderCurrentStep()}
    </div>
  );
};

export default QuickCampaignCreator;
