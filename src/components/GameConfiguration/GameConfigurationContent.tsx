
import React from 'react';
import { motion } from 'framer-motion';
import BrandCustomization from './BrandCustomization';
import WheelConfiguration from './WheelConfiguration';
import CampaignGoals from './CampaignGoals';

interface GameConfigurationContentProps {
  activeStep: 'brand' | 'game' | 'goals';
  gameType: string;
  config: any;
  updateConfig: (section: string, data: any) => void;
}

const GameConfigurationContent: React.FC<GameConfigurationContentProps> = ({
  activeStep,
  gameType,
  config,
  updateConfig
}) => {
  return (
    <motion.div
      key={activeStep}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-xl p-8 mb-8"
    >
      {activeStep === 'brand' && (
        <BrandCustomization
          config={config.brand}
          onChange={(data) => updateConfig('brand', data)}
        />
      )}
      
      {activeStep === 'game' && (
        <WheelConfiguration
          gameType={gameType}
          config={config.game}
          onChange={(data) => updateConfig('game', data)}
        />
      )}
      
      {activeStep === 'goals' && (
        <CampaignGoals
          config={config.goals}
          onChange={(data) => updateConfig('goals', data)}
        />
      )}
    </motion.div>
  );
};

export default GameConfigurationContent;
