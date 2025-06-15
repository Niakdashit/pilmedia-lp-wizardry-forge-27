
import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface Step {
  id: number;
  name: string;
  component: any;
}

interface WizardProgressProps {
  currentStep: number;
  steps: Step[];
}

const WizardProgress: React.FC<WizardProgressProps> = ({ 
  currentStep, 
  steps 
}) => {
  return (
    <div className="flex items-center space-x-2">
      {steps.map((step, index) => {
        const isCompleted = step.id < currentStep;
        const isCurrent = step.id === currentStep;

        return (
          <div key={step.id} className="flex items-center">
            {/* Step Circle */}
            <motion.div
              className={`relative w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                isCompleted
                  ? 'bg-gradient-to-r from-[#841b60] to-purple-600 text-white'
                  : isCurrent
                  ? 'bg-white border-2 border-[#841b60] text-[#841b60] shadow-lg'
                  : 'bg-gray-100 text-gray-400 border border-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isCompleted ? (
                <Check className="w-4 h-4" />
              ) : (
                <span>{step.id}</span>
              )}
              
              {isCurrent && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-[#841b60] opacity-50"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.div>

            {/* Step Name (hidden on mobile) */}
            <span 
              className={`hidden md:block ml-2 text-xs font-medium ${
                isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-400'
              }`}
            >
              {step.name}
            </span>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div 
                className={`w-8 h-px mx-2 transition-colors duration-300 ${
                  isCompleted ? 'bg-[#841b60]' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default WizardProgress;
