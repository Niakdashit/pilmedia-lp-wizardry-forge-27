
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { WizardData } from '../ModernWizard';
import { getDefaultGameConfig } from '../../../utils/campaignTypes';

interface AIGenerationProps {
  wizardData: WizardData;
  updateWizardData: (data: Partial<WizardData>) => void;
  nextStep: () => void;
}

const AIGeneration: React.FC<AIGenerationProps> = ({
  wizardData,
  updateWizardData,
  nextStep
}) => {
  const [stage, setStage] = useState(0);

  const stages = [
    'Analyse de vos éléments de marque...',
    'Génération de votre campagne...',
    'Optimisation pour mobile et desktop...',
    'Finalisation de votre expérience...'
  ];

  useEffect(() => {
    // Simulate AI generation process
    const generateCampaign = async () => {
      for (let i = 0; i < stages.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        setStage(i + 1);
      }

      // Generate campaign data
      const defaultConfig = getDefaultGameConfig(wizardData.gameType!);
      const generatedCampaign = {
        name: `Campagne ${wizardData.productName}`,
        gameType: wizardData.gameType,
        config: defaultConfig,
        design: {
          backgroundImage: wizardData.desktopVisual,
          mobileBackgroundImage: wizardData.mobileVisual || wizardData.desktopVisual,
          logo: wizardData.logo,
          primaryColor: '#841b60',
          secondaryColor: '#6554c0'
        },
        content: {
          title: `Gagnez avec ${wizardData.productName}`,
          description: `Participez à notre jeu interactif et tentez de remporter ${wizardData.productName} !`,
          cta: 'Jouer maintenant',
          instructions: 'Suivez les instructions à l\'écran pour participer'
        }
      };

      updateWizardData({ campaign: generatedCampaign });
      setTimeout(nextStep, 1000);
    };

    generateCampaign();
  }, []);

  return (
    <div className="h-full flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl"
      >
        {/* Logo animation */}
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-[#841b60] to-[#6554c0] rounded-2xl flex items-center justify-center shadow-xl"
        >
          <svg viewBox="0 0 24 24" className="w-12 h-12 text-white">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor"/>
          </svg>
        </motion.div>

        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#841b60] to-[#6554c0] bg-clip-text text-transparent mb-6">
          Création en cours...
        </h1>

        <p className="text-xl text-gray-600 mb-12">
          Notre IA conçoit votre expérience personnalisée
        </p>

        {/* Progress stages */}
        <div className="space-y-4">
          {stages.map((stageText, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: stage > index ? 1 : 0.3,
                x: 0 
              }}
              transition={{ delay: index * 0.2 }}
              className="flex items-center justify-center"
            >
              <div className={`
                w-3 h-3 rounded-full mr-4 transition-all duration-500
                ${stage > index ? 'bg-gradient-to-r from-[#841b60] to-[#6554c0]' : 'bg-gray-300'}
              `} />
              <span className={`
                text-lg transition-all duration-500
                ${stage > index ? 'text-gray-800 font-medium' : 'text-gray-400'}
              `}>
                {stageText}
              </span>
              {stage > index && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="ml-4 text-green-500"
                >
                  ✓
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mt-12 w-full max-w-md mx-auto">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(stage / stages.length) * 100}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-[#841b60] to-[#6554c0] rounded-full"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AIGeneration;
