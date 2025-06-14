
import React from 'react';
import { motion } from 'framer-motion';

interface GameConfigurationHeaderProps {
  gameType: string;
}

const GameConfigurationHeader: React.FC<GameConfigurationHeaderProps> = ({ gameType }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-8"
    >
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Configure Your {gameType.charAt(0).toUpperCase() + gameType.slice(1)} Campaign
      </h1>
      <p className="text-xl text-gray-600">
        Set up your brand, customize your game, and define your goals
      </p>
    </motion.div>
  );
};

export default GameConfigurationHeader;
