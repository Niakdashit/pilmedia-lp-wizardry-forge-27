
import React from 'react';
import { motion } from 'framer-motion';
import { CampaignData } from '../../../pages/ModernCampaignWizard';
import BrandAssetsCard from '../GameConfiguration/BrandAssetsCard';
import CampaignBasicsCard from '../GameConfiguration/CampaignBasicsCard';
import CampaignGoalsSection from '../GameConfiguration/CampaignGoalsSection';
import GameSpecificConfig from '../GameConfiguration/GameSpecificConfig';

interface GameConfigurationProps {
  campaignData: CampaignData;
  updateCampaignData: (updates: Partial<CampaignData>) => void;
  onNext: () => void;
  onBack: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const GameConfiguration: React.FC<GameConfigurationProps> = ({
  campaignData,
  updateCampaignData,
  onNext,
  onBack
}) => {
  const isValid = campaignData.slogan && campaignData.campaignGoal && campaignData.targetAudience;

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Configure Your {campaignData.gameType} Game
        </h1>
        <p className="text-lg text-gray-600">
          Let's gather the essentials to create your branded experience
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <BrandAssetsCard
          campaignData={campaignData}
          updateCampaignData={updateCampaignData}
        />

        <CampaignBasicsCard
          campaignData={campaignData}
          updateCampaignData={updateCampaignData}
        />
      </div>

      <CampaignGoalsSection
        campaignData={campaignData}
        updateCampaignData={updateCampaignData}
      />

      <GameSpecificConfig
        campaignData={campaignData}
        updateCampaignData={updateCampaignData}
      />

      {/* Navigation */}
      <div className="flex justify-between items-center mt-8">
        <button
          onClick={onBack}
          className="px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors"
        >
          ← Back
        </button>
        
        <button
          onClick={onNext}
          disabled={!isValid}
          className={`px-8 py-3 rounded-xl font-medium transition-all ${
            isValid
              ? 'bg-gradient-to-r from-[#841b60] to-purple-600 text-white hover:shadow-lg hover:scale-105'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Continue to Brand Identity →
        </button>
      </div>
    </div>
  );
};

export default GameConfiguration;
