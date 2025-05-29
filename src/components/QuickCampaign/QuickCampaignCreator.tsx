
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuickCampaignStore } from '../../stores/quickCampaignStore';
import Step1GameSelection from './Step1GameSelection';
import Step2BasicSettings from './Step2BasicSettings';
import Step3VisualStyle from './Step3VisualStyle';

const QuickCampaignCreator: React.FC = () => {
  const { currentStep } = useQuickCampaignStore();

  const slideVariants = {
    enter: (direction: number) => ({
      y: direction > 0 ? '100vh' : '-100vh',
      opacity: 0,
      scale: 0.95
    }),
    center: {
      y: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      y: direction < 0 ? '100vh' : '-100vh',
      opacity: 0,
      scale: 1.05
    })
  };

  const transition = {
    type: "spring",
    stiffness: 300,
    damping: 30,
    duration: 0.6
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
    <div className="w-full h-full overflow-hidden">
      <AnimatePresence mode="wait" custom={1}>
        <motion.div
          key={currentStep}
          custom={1}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={transition}
          className="w-full h-full"
        >
          {renderCurrentStep()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default QuickCampaignCreator;
