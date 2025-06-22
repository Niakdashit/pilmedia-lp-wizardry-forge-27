
import React, { useState } from 'react';
import GameConfigurationHeader from './GameConfigurationHeader';
import GameConfigurationSteps from './GameConfigurationSteps';
import GameConfigurationContent from './GameConfigurationContent';
import GameConfigurationNavigation from './GameConfigurationNavigation';

interface GameConfigurationProps {
  gameType: string;
  onNext: (config: any) => void;
  onBack: () => void;
  className?: string;
}

const GameConfiguration: React.FC<GameConfigurationProps> = ({
  gameType,
  onNext,
  onBack,
  className = ''
}) => {
  const [activeStep, setActiveStep] = useState<'brand' | 'game' | 'goals'>('brand');
  const [config, setConfig] = useState({
    brand: {
      logo: '',
      mainColor: '#3B82F6',
      slogan: '',
      companyName: ''
    },
    game: {},
    goals: {
      campaignGoal: '',
      targetAudience: ''
    }
  });

  const steps = [
    { id: 'brand', label: 'Brand Setup' },
    { id: 'game', label: 'Game Settings' },
    { id: 'goals', label: 'Campaign Goals' }
  ];

  const updateConfig = (section: string, data: any) => {
    setConfig(prev => ({
      ...prev,
      [section]: { ...prev[section as keyof typeof prev], ...data }
    }));
  };

  const handleNext = () => {
    const stepIndex = steps.findIndex(step => step.id === activeStep);
    if (stepIndex < steps.length - 1) {
      setActiveStep(steps[stepIndex + 1].id as 'brand' | 'game' | 'goals');
    } else {
      onNext(config);
    }
  };

  const handlePrevious = () => {
    const stepIndex = steps.findIndex(step => step.id === activeStep);
    if (stepIndex > 0) {
      setActiveStep(steps[stepIndex - 1].id as 'brand' | 'game' | 'goals');
    } else {
      onBack();
    }
  };

  const isStepComplete = (stepId: string): boolean => {
    switch (stepId) {
      case 'brand':
        return !!(config.brand.mainColor && config.brand.companyName);
      case 'game':
        return Object.keys(config.game).length > 0;
      case 'goals':
        return !!(config.goals.campaignGoal && config.goals.targetAudience);
      default:
        return false;
    }
  };

  const canProceed = isStepComplete(activeStep);

  return (
    <div className={`max-w-6xl mx-auto px-6 py-12 ${className}`}>
      <GameConfigurationHeader gameType={gameType} />
      
      <GameConfigurationSteps
        activeStep={activeStep}
        isStepComplete={isStepComplete}
        onStepChange={setActiveStep}
      />
      
      <GameConfigurationContent
        activeStep={activeStep}
        gameType={gameType}
        config={config}
        updateConfig={updateConfig}
      />
      
      <GameConfigurationNavigation
        activeStep={activeStep}
        canProceed={canProceed}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </div>
  );
};

export default GameConfiguration;
