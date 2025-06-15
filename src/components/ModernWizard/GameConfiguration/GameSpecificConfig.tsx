
import React from 'react';
import { motion } from 'framer-motion';
import { Palette } from 'lucide-react';
import { CampaignData } from '../../../pages/ModernCampaignWizard';
import ConfigSlider from '../components/ConfigSlider';
import ChipSelector from '../components/ChipSelector';
import ToggleSwitch from '../components/ToggleSwitch';

interface GameSpecificConfigProps {
  campaignData: CampaignData;
  updateCampaignData: (updates: Partial<CampaignData>) => void;
}

const GameSpecificConfig: React.FC<GameSpecificConfigProps> = ({
  campaignData,
  updateCampaignData
}) => {
  const gameConfig = campaignData.gameConfig || {};

  const updateGameConfig = (updates: any) => {
    updateCampaignData({
      gameConfig: { ...gameConfig, ...updates }
    });
  };

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

  return (
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
  );
};

export default GameSpecificConfig;
