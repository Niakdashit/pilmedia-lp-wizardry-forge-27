
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Copy, ExternalLink, Download } from 'lucide-react';
import { WizardData } from '../ModernWizard';

interface FinalizePublishProps {
  wizardData: WizardData;
  prevStep: () => void;
}

const FinalizePublish: React.FC<FinalizePublishProps> = ({
  wizardData,
  prevStep
}) => {
  const [isPublished, setIsPublished] = useState(false);
  const [publishUrl] = useState('https://leadya.app/c/your-campaign-id');

  const handlePublish = () => {
    // Simulate publish process
    setTimeout(() => {
      setIsPublished(true);
    }, 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(publishUrl);
  };

  if (isPublished) {
    return (
      <div className="h-full flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl"
        >
          {/* Success animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-xl"
          >
            <Check className="w-12 h-12 text-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-5xl font-bold bg-gradient-to-r from-[#841b60] to-[#6554c0] bg-clip-text text-transparent mb-6"
          >
            Félicitations !
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-xl text-gray-600 mb-12"
          >
            Votre expérience interactive est maintenant en ligne et prête à captiver vos visiteurs !
          </motion.p>

          {/* Campaign summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-white/70 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/50 shadow-lg"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Votre campagne</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {wizardData.campaign?.design?.logo && (
                  <img
                    src={wizardData.campaign.design.logo}
                    alt="Logo"
                    className="w-12 h-12 object-contain mr-4 rounded-lg bg-white p-2"
                  />
                )}
                <div className="text-left">
                  <p className="font-medium text-gray-800">{wizardData.campaign?.name}</p>
                  <p className="text-sm text-gray-600">{wizardData.productName}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="space-y-4"
          >
            <div className="flex items-center bg-gray-100 rounded-xl p-4 mb-4">
              <input
                type="text"
                value={publishUrl}
                readOnly
                className="flex-1 bg-transparent border-none outline-none text-gray-700"
              />
              <button
                onClick={handleCopyLink}
                className="ml-4 p-2 hover:bg-gray-200 rounded-lg transition-colors duration-300"
              >
                <Copy className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#841b60] to-[#6554c0] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                Voir en ligne
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors duration-300"
              >
                <Download className="w-5 h-5 mr-2" />
                Exporter
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl"
      >
        <h1 className="text-5xl font-bold bg-gradient-to-r from-[#841b60] to-[#6554c0] bg-clip-text text-transparent mb-6">
          Prêt à publier ?
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          Votre expérience interactive va être mise en ligne et accessible à vos visiteurs
        </p>

        {/* Final preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white/70 backdrop-blur-md rounded-2xl p-6 mb-12 border border-white/50 shadow-lg"
        >
          <div className="flex items-center justify-center mb-4">
            {wizardData.campaign?.design?.logo && (
              <img
                src={wizardData.campaign.design.logo}
                alt="Logo"
                className="w-16 h-16 object-contain mr-4"
              />
            )}
            <div className="text-left">
              <h3 className="text-xl font-bold text-gray-800">{wizardData.campaign?.name}</h3>
              <p className="text-gray-600">{wizardData.productName}</p>
            </div>
          </div>
          <p className="text-sm text-gray-500 italic">
            "{wizardData.campaign?.content?.description}"
          </p>
        </motion.div>

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
            onClick={handlePublish}
            className="px-12 py-4 bg-gradient-to-r from-[#841b60] to-[#6554c0] text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            🚀 Publier maintenant
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default FinalizePublish;
