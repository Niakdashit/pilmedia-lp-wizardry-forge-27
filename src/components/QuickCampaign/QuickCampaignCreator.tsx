
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuickCampaignStore } from '../../stores/quickCampaignStore';
import Step1GameSelection from './Step1GameSelection';
import Step2BasicSettings from './Step2BasicSettings';
import Step3VisualStyle from './Step3VisualStyle';

const QuickCampaignCreator: React.FC = () => {
  const { currentStep } = useQuickCampaignStore();

  const slideVariants = {
    enter: {
      y: '100vh',
      opacity: 0,
      scale: 0.8
    },
    center: {
      y: 0,
      opacity: 1,
      scale: 1
    },
    exit: {
      y: '-100vh',
      opacity: 0,
      scale: 1.1
    }
  };

  const transition = {
    type: "spring",
    stiffness: 260,
    damping: 20,
    duration: 0.8
  };

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
    <div className="w-full h-full overflow-hidden relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={transition}
          className="w-full h-full absolute inset-0"
          style={{ willChange: 'transform, opacity' }}
        >
          {renderCurrentStep()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default QuickCampaignCreator;
