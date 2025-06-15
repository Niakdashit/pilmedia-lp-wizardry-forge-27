
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const CampaignEditorLoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-6"
      >
        <div className="flex items-center justify-center mb-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-12 h-12 text-purple-600" />
          </motion.div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          Configuration de votre jeu IA
        </h2>
        <p className="text-gray-600 max-w-md">
          Nous appliquons les optimisations générées par notre IA pour créer votre expérience personnalisée...
        </p>
        <div className="w-64 h-2 bg-gray-200 rounded-full mx-auto overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-600 to-purple-700 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default CampaignEditorLoadingScreen;
