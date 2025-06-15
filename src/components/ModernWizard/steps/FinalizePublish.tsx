
import React from 'react';
import { motion } from 'framer-motion';
import { CampaignData } from '../../../pages/ModernCampaignWizard';

interface FinalizePublishProps {
  campaignData: CampaignData;
  updateCampaignData: (updates: Partial<CampaignData>) => void;
  onNext: () => void;
  onBack: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const FinalizePublish: React.FC<FinalizePublishProps> = ({
  campaignData,
  updateCampaignData,
  onNext,
  onBack
}) => {
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Finalize & Publish
        </h1>
        <p className="text-lg text-gray-600">
          Your campaign is ready to go live!
        </p>
      </motion.div>

      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
        <p className="text-gray-600 text-center">
          Finalize & publish step coming soon...
        </p>
      </div>

      <div className="flex justify-between items-center mt-8">
        <button
          onClick={onBack}
          className="px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors"
        >
          ← Back
        </button>
        
        <button
          className="px-8 py-3 rounded-xl font-medium bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:shadow-lg hover:scale-105 transition-all"
        >
          🎉 Publish Campaign
        </button>
      </div>
    </div>
  );
};

export default FinalizePublish;
