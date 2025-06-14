
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Settings, Target, ArrowRight, ArrowLeft } from 'lucide-react';
import BrandCustomization from './BrandCustomization';
import WheelConfiguration from './WheelConfiguration';
import CampaignGoals from './CampaignGoals';

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
    { id: 'brand', label: 'Brand Setup', icon: Palette },
    { id: 'game', label: 'Game Settings', icon: Settings },
    { id: 'goals', label: 'Campaign Goals', icon: Target }
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

  const isStepComplete = (stepId: string) => {
    switch (stepId) {
      case 'brand':
        return config.brand.mainColor && config.brand.companyName;
      case 'game':
        return Object.keys(config.game).length > 0;
      case 'goals':
        return config.goals.campaignGoal && config.goals.targetAudience;
      default:
        return false;
    }
  };

  const canProceed = isStepComplete(activeStep);

  return (
    <div className={`max-w-6xl mx-auto px-6 py-12 ${className}`}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Configure Your {gameType.charAt(0).toUpperCase() + gameType.slice(1)} Campaign
        </h1>
        <p className="text-xl text-gray-600">
          Set up your brand, customize your game, and define your goals
        </p>
      </motion.div>

      {/* Progress Steps */}
      <div className="flex justify-center mb-12">
        <div className="flex items-center space-x-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = activeStep === step.id;
            const isCompleted = isStepComplete(step.id);
            const isPast = steps.findIndex(s => s.id === activeStep) > index;

            return (
              <motion.div
                key={step.id}
                className="flex items-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <button
                  onClick={() => setActiveStep(step.id as 'brand' | 'game' | 'goals')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-gray-900 text-white shadow-lg'
                      : isCompleted || isPast
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{step.label}</span>
                  {(isCompleted || isPast) && !isActive && (
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  )}
                </button>
                {index < steps.length - 1 && (
                  <div className="w-8 h-0.5 bg-gray-200 mx-4"></div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <motion.div
        key={activeStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl shadow-xl p-8 mb-8"
      >
        {activeStep === 'brand' && (
          <BrandCustomization
            config={config.brand}
            onChange={(data) => updateConfig('brand', data)}
          />
        )}
        
        {activeStep === 'game' && (
          <WheelConfiguration
            gameType={gameType}
            config={config.game}
            onChange={(data) => updateConfig('game', data)}
          />
        )}
        
        {activeStep === 'goals' && (
          <CampaignGoals
            config={config.goals}
            onChange={(data) => updateConfig('goals', data)}
          />
        )}
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <motion.button
          onClick={handlePrevious}
          className="flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </motion.button>

        <motion.button
          onClick={handleNext}
          disabled={!canProceed}
          className={`flex items-center space-x-2 px-8 py-3 rounded-full transition-all duration-300 ${
            canProceed
              ? 'bg-gradient-to-r from-gray-900 to-gray-800 text-white hover:shadow-lg'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
          whileHover={canProceed ? { scale: 1.05 } : {}}
          whileTap={canProceed ? { scale: 0.95 } : {}}
        >
          <span>{activeStep === 'goals' ? 'Continue to Preview' : 'Next Step'}</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
};

export default GameConfiguration;
