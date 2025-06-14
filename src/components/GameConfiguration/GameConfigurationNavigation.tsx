
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface GameConfigurationNavigationProps {
  activeStep: 'brand' | 'game' | 'goals';
  canProceed: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

const GameConfigurationNavigation: React.FC<GameConfigurationNavigationProps> = ({
  activeStep,
  canProceed,
  onPrevious,
  onNext
}) => {
  return (
    <div className="flex justify-between items-center">
      <motion.button
        onClick={onPrevious}
        className="flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </motion.button>

      <motion.button
        onClick={onNext}
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
  );
};

export default GameConfigurationNavigation;
