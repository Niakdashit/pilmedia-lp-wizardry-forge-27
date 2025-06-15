
import React from 'react';
import { motion } from 'framer-motion';
import { WizardData } from '../ModernWizard';

interface AdvancedCustomizationProps {
  wizardData: WizardData;
  updateWizardData: (data: Partial<WizardData>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const AdvancedCustomization: React.FC<AdvancedCustomizationProps> = ({
  wizardData,
  updateWizardData,
  nextStep,
  prevStep
}) => {
  return (
    <div className="h-full flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#841b60] to-[#6554c0] bg-clip-text text-transparent mb-6">
          Personnalisation avancée
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Ajustez tous les détails de votre expérience
        </p>
        <p className="text-gray-500 mb-8">
          Cette section sera complètement implémentée dans la prochaine version
        </p>

        <div className="flex justify-between items-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={prevStep}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors duration-300"
          >
            Retour
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextStep}
            className="px-8 py-3 bg-gradient-to-r from-[#841b60] to-[#6554c0] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Continuer
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default AdvancedCustomization;
