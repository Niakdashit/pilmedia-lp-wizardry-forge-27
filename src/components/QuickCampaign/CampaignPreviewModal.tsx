
import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useQuickCampaignStore } from '../../stores/quickCampaignStore';
import FunnelUnlockedGame from '../funnels/FunnelUnlockedGame';

interface CampaignPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CampaignPreviewModal: React.FC<CampaignPreviewModalProps> = ({
  isOpen,
  onClose
}) => {
  const {
    selectedGameType,
    campaignName,
    selectedTheme,
    backgroundImage
  } = useQuickCampaignStore();

  if (!isOpen) return null;

  // Create mock campaign data with proper template structure
  const mockCampaign = {
    id: 'preview',
    name: campaignName || 'Aperçu de la campagne',
    type: selectedGameType || 'jackpot',
    gameConfig: {
      [selectedGameType || 'jackpot']: {
        template: selectedTheme,
        backgroundImage: backgroundImage ? URL.createObjectURL(backgroundImage) : undefined,
        buttonLabel: 'Lancer le Jackpot',
        buttonColor: '#ec4899'
      },
      jackpot: {
        template: selectedTheme,
        instantWin: {
          mode: 'instant_winner' as const,
          winProbability: 0.1,
          maxWinners: 10,
          winnersCount: 0
        }
      }
    },
    design: {
      template: selectedTheme,
      theme: selectedTheme
    },
    screens: [
      {
        title: 'Tentez votre chance !',
        description: 'Participez pour avoir une chance de gagner !',
        showTitle: true,
        showDescription: true
      },
      {
        title: 'Vos informations',
        buttonText: "C'est parti !"
      },
      {},
      {
        winMessage: 'Félicitations, vous avez gagné !',
        loseMessage: 'Dommage, réessayez !',
        replayButtonText: 'Rejouer'
      }
    ],
    formFields: [
      {
        id: "prenom",
        label: "Prénom",
        required: true
      },
      {
        id: "nom", 
        label: "Nom",
        required: true
      },
      {
        id: "email",
        label: "Email",
        type: "email",
        required: true
      }
    ]
  };

  console.log('Preview campaign data:', mockCampaign);
  console.log('Selected theme in preview:', selectedTheme);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#841b60] to-pink-500 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white hover:text-gray-200 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold">Aperçu de la campagne</h2>
          <p className="text-pink-100 mt-2">{campaignName}</p>
        </div>

        {/* Preview Content */}
        <div className="p-8 overflow-y-auto max-h-[70vh]">
          <div className="max-w-lg mx-auto">
            <FunnelUnlockedGame
              campaign={mockCampaign}
              modalContained={true}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CampaignPreviewModal;
