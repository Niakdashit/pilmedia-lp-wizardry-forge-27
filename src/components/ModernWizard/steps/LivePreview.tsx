
import React from 'react';
import { motion } from 'framer-motion';
import { WizardData } from '../ModernWizard';

interface LivePreviewProps {
  wizardData: WizardData;
  updateWizardData: (data: Partial<WizardData>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const LivePreview: React.FC<LivePreviewProps> = ({
  wizardData,
  updateWizardData,
  nextStep,
  prevStep
}) => {
  const handleAdvancedMode = () => {
    updateWizardData({ isAdvanced: true });
    nextStep();
  };

  return (
    <div className="h-full flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-4xl"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#841b60] to-[#6554c0] bg-clip-text text-transparent mb-6">
          Votre expérience est prête !
        </h1>
        
        <p className="text-xl text-gray-600 mb-12">
          Découvrez votre campagne générée par IA
        </p>

        {/* Preview area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Desktop Preview */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Aperçu Desktop</h3>
            <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
              <span className="text-gray-500">Prévisualisation Desktop</span>
            </div>
          </motion.div>

          {/* Mobile Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Aperçu Mobile</h3>
            <div className="aspect-[9/16] max-h-80 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center mx-auto">
              <span className="text-gray-500">Prévisualisation Mobile</span>
            </div>
          </motion.div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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
            onClick={handleAdvancedMode}
            className="px-8 py-3 bg-white/20 backdrop-blur-md text-gray-800 rounded-xl font-semibold border border-white/30 hover:bg-white/30 transition-all duration-300"
          >
            + Avancé
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              // Skip advanced customization
              updateWizardData({ isAdvanced: false });
              nextStep();
              nextStep(); // Go directly to publish
            }}
            className="px-8 py-3 bg-gradient-to-r from-[#841b60] to-[#6554c0] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Publier maintenant
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default LivePreview;
