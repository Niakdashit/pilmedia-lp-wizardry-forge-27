
import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Settings, Target } from 'lucide-react';

interface GameConfigurationStepsProps {
  activeStep: 'brand' | 'game' | 'goals';
  isStepComplete: (stepId: string) => boolean;
  onStepChange: (step: 'brand' | 'game' | 'goals') => void;
}

const GameConfigurationSteps: React.FC<GameConfigurationStepsProps> = ({
  activeStep,
  isStepComplete,
  onStepChange
}) => {
  const steps = [
    { id: 'brand', label: 'Brand Setup', icon: Palette },
    { id: 'game', label: 'Game Settings', icon: Settings },
    { id: 'goals', label: 'Campaign Goals', icon: Target }
  ];

  return (
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
                onClick={() => onStepChange(step.id as 'brand' | 'game' | 'goals')}
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
  );
};

export default GameConfigurationSteps;
