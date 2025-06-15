
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
}

const ModernEditorPanel: React.FC<ModernEditorPanelProps> = ({
  activeStep,
  campaign,
  setCampaign
}) => {
  return (
    <>
      {activeStep === 'setup' && (
        <SetupStep campaign={campaign} setCampaign={setCampaign} />
      )}
      {activeStep === 'content' && (
        <ContentStep />
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
