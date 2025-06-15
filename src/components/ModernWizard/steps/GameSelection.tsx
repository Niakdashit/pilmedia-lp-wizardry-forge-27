
import React from 'react';
import { motion } from 'framer-motion';
import { WizardData } from '../ModernWizard';
import { CampaignType } from '../../../utils/campaignTypes';
import GameBubble from '../components/GameBubble';

interface GameSelectionProps {
  wizardData: WizardData;
  updateWizardData: (data: Partial<WizardData>) => void;
  nextStep: () => void;
}

const GameSelection: React.FC<GameSelectionProps> = ({
  wizardData,
  updateWizardData,
  nextStep
}) => {
  const gameTypes = [
    { type: 'wheel' as CampaignType, name: 'Roue de la fortune', color: '#841b60' },
    { type: 'quiz' as CampaignType, name: 'Quiz interactif', color: '#f5803e' },
    { type: 'jackpot' as CampaignType, name: 'Jackpot', color: '#ffd700' },
    { type: 'scratch' as CampaignType, name: 'Carte à gratter', color: '#2c7be5' },
    { type: 'memory' as CampaignType, name: 'Jeu de mémoire', color: '#00b8d9' },
    { type: 'puzzle' as CampaignType, name: 'Puzzle', color: '#6554c0' },
    { type: 'dice' as CampaignType, name: 'Dés chanceux', color: '#ff5630' },
    { type: 'form' as CampaignType, name: 'Formulaire', color: '#36b37e' }
  ];

  const handleGameSelect = (gameType: CampaignType) => {
    updateWizardData({ gameType });
    setTimeout(nextStep, 800); // Delay for animation
  };

  return (
    <div className="h-full flex flex-col items-center justify-center px-6">
      {/* Hero section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-16 max-w-4xl"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-6xl font-bold bg-gradient-to-r from-[#841b60] via-[#6554c0] to-[#2c7be5] bg-clip-text text-transparent mb-6"
        >
          Créez votre expérience
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl text-gray-600 font-medium leading-relaxed"
        >
          Choisissez la mécanique de jeu qui captivera votre audience<br/>
          et transformera vos visiteurs en clients fidèles
        </motion.p>
      </motion.div>

      {/* Game bubbles dock */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
        className="flex flex-wrap justify-center gap-8 max-w-6xl"
      >
        {gameTypes.map((game, index) => (
          <GameBubble
            key={game.type}
            game={game}
            index={index}
            isSelected={wizardData.gameType === game.type}
            onSelect={handleGameSelect}
          />
        ))}
      </motion.div>

      {/* Floating hint */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="mt-16 text-center"
      >
        <p className="text-sm text-gray-400 font-medium">
          Sélectionnez une mécanique pour continuer
        </p>
      </motion.div>
    </div>
  );
};

export default GameSelection;
