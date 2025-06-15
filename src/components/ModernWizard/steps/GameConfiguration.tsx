
import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Palette, Users, Target, MessageSquare } from 'lucide-react';
import { CampaignData } from '../../../pages/ModernCampaignWizard';
import BrandAssetUpload from '../components/BrandAssetUpload';
import ConfigSlider from '../components/ConfigSlider';
import ChipSelector from '../components/ChipSelector';
import ToggleSwitch from '../components/ToggleSwitch';

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
  const gameConfig = campaignData.gameConfig || {};

  const updateGameConfig = (updates: any) => {
    updateCampaignData({
      gameConfig: { ...gameConfig, ...updates }
    });
  };

  const audienceOptions = [
    'Young Adults (18-25)', 'Professionals (25-40)', 'Families', 
    'Seniors (50+)', 'Students', 'Entrepreneurs'
  ];

  const goalOptions = [
    'Lead Generation', 'Brand Awareness', 'Product Launch', 
    'Customer Engagement', 'Event Promotion', 'Newsletter Signup'
  ];

  const renderGameSpecificConfig = () => {
    switch (campaignData.gameType) {
      case 'quiz':
        return (
          <div className="space-y-6">
            <ConfigSlider
              label="Number of Questions"
              value={gameConfig.questionCount || 5}
              min={3}
              max={15}
              onChange={(value) => updateGameConfig({ questionCount: value })}
            />
            
            <ChipSelector
              label="Quiz Theme"
              options={['General Knowledge', 'Brand Trivia', 'Industry Facts', 'Fun & Entertainment']}
              selected={gameConfig.theme || 'Brand Trivia'}
              onChange={(theme) => updateGameConfig({ theme })}
            />

            <ConfigSlider
              label="Difficulty Level"
              value={gameConfig.difficulty || 2}
              min={1}
              max={5}
              labels={['Very Easy', 'Easy', 'Medium', 'Hard', 'Expert']}
              onChange={(value) => updateGameConfig({ difficulty: value })}
            />
          </div>
        );

      case 'wheel':
        return (
          <div className="space-y-6">
            <ConfigSlider
              label="Number of Segments"
              value={gameConfig.segments || 8}
              min={4}
              max={16}
              onChange={(value) => updateGameConfig({ segments: value })}
            />
            
            <ToggleSwitch
              label="Include Images on Segments"
              checked={gameConfig.includeImages || false}
              onChange={(checked) => updateGameConfig({ includeImages: checked })}
            />

            <ConfigSlider
              label="Win Probability"
              value={gameConfig.winProbability || 30}
              min={10}
              max={80}
              suffix="%"
              onChange={(value) => updateGameConfig({ winProbability: value })}
            />
          </div>
        );

      case 'jackpot':
        return (
          <div className="space-y-6">
            <ConfigSlider
              label="Number of Prizes"
              value={gameConfig.prizeCount || 3}
              min={1}
              max={10}
              onChange={(value) => updateGameConfig({ prizeCount: value })}
            />
            
            <ChipSelector
              label="Prize Type"
              options={['Discounts', 'Free Products', 'Exclusive Access', 'Gift Cards']}
              selected={gameConfig.prizeType || 'Discounts'}
              onChange={(prizeType) => updateGameConfig({ prizeType })}
            />

            <ConfigSlider
              label="Campaign Duration (days)"
              value={gameConfig.duration || 30}
              min={7}
              max={90}
              onChange={(value) => updateGameConfig({ duration: value })}
            />
          </div>
        );

      default:
        return (
          <div className="text-center py-8 text-gray-500">
            Default configuration for {campaignData.gameType}
          </div>
        );
    }
  };

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
        {/* Brand Assets */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Upload className="w-5 h-5 mr-2 text-[#841b60]" />
            Brand Assets
          </h3>
          
          <BrandAssetUpload
            logo={campaignData.logo}
            onLogoChange={(logo) => updateCampaignData({ logo })}
          />
        </motion.div>

        {/* Campaign Basics */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <MessageSquare className="w-5 h-5 mr-2 text-[#841b60]" />
            Campaign Basics
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brand Slogan or Message
              </label>
              <input
                type="text"
                value={campaignData.slogan}
                onChange={(e) => updateCampaignData({ slogan: e.target.value })}
                placeholder="Your brand message..."
                className="w-full px-4 py-3 bg-gray-50/50 border-0 rounded-xl focus:ring-2 focus:ring-[#841b60] transition-all"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Campaign Goals & Audience */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2 text-[#841b60]" />
              Campaign Goal
            </h3>
            <ChipSelector
              options={goalOptions}
              selected={campaignData.campaignGoal}
              onChange={(goal) => updateCampaignData({ campaignGoal: goal })}
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2 text-[#841b60]" />
              Target Audience
            </h3>
            <ChipSelector
              options={audienceOptions}
              selected={campaignData.targetAudience}
              onChange={(audience) => updateCampaignData({ targetAudience: audience })}
            />
          </div>
        </div>
      </motion.div>

      {/* Game Specific Configuration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Palette className="w-5 h-5 mr-2 text-[#841b60]" />
          Game Settings
        </h3>
        
        {renderGameSpecificConfig()}
      </motion.div>

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
