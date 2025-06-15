
import React from 'react';
import SetupStep from './steps/SetupStep';
import ContentStep from './steps/ContentStep';
import GameStep from './steps/GameStep';
import WordingStep from './steps/WordingStep';
import PreviewStep from './steps/PreviewStep';
import PublishStep from './steps/PublishStep';

interface ModernEditorPanelProps {
  activeStep: string;
  campaign: any;
  setCampaign: (updater: (prev: any) => any) => void;
  onNextStep?: () => void;
  onPrevStep?: () => void;
}

const ModernEditorPanel: React.FC<ModernEditorPanelProps> = ({
  activeStep,
  campaign,
  setCampaign,
  onNextStep,
  onPrevStep
}) => {
  // Default handlers if not provided
  const handleNext = onNextStep || (() => console.log('Next step'));
  const handlePrev = onPrevStep || (() => console.log('Previous step'));

  // Ensure campaign has default structure to prevent undefined errors
  const safeSetCampaign = (updater: any) => {
    if (typeof updater === 'function') {
      setCampaign((prev: any) => {
        const currentCampaign = prev || { design: {}, type: 'wheel' };
        return updater(currentCampaign);
      });
    } else {
      setCampaign(() => updater || { design: {}, type: 'wheel' });
    }
  };

  const safeCampaign = campaign || { design: {}, type: 'wheel' };

  return (
    <>
      {activeStep === 'setup' && (
        <SetupStep 
          campaign={safeCampaign} 
          setCampaign={safeSetCampaign}
          onNext={handleNext}
        />
      )}
      {activeStep === 'content' && (
        <ContentStep 
          campaign={safeCampaign}
          setCampaign={safeSetCampaign}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
      {activeStep === 'game' && (
        <GameStep />
      )}
      {activeStep === 'wording' && (
        <WordingStep />
      )}
      {activeStep === 'preview' && (
        <PreviewStep />
      )}
      {activeStep === 'publish' && (
        <PublishStep />
      )}
    </>
  );
};

export default ModernEditorPanel;
