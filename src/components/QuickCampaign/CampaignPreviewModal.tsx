
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Monitor, Tablet, Smartphone } from 'lucide-react';
import { useQuickCampaignStore } from '../../stores/quickCampaignStore';
import FunnelUnlockedGame from '../funnels/FunnelUnlockedGame';
import MobilePreview from '../CampaignEditor/Mobile/MobilePreview';

interface CampaignPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CampaignPreviewModal: React.FC<CampaignPreviewModalProps> = ({
  isOpen,
  onClose
}) => {
  const [selectedDevice, setSelectedDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  
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
    ],
    // Configuration mobile par défaut
    mobileConfig: {
      backgroundColor: '#ebf4f7',
      gamePosition: 'center',
      textPosition: 'top',
      verticalSpacing: 20,
      horizontalPadding: 16,
      showTitle: true,
      showDescription: true,
      title: 'Tentez votre chance !',
      description: 'Participez pour avoir une chance de gagner !',
      titleColor: '#000000',
      descriptionColor: '#666666',
      titleSize: 'text-2xl',
      descriptionSize: 'text-base',
      titleAlignment: 'text-center',
      descriptionAlignment: 'text-center',
      fontFamily: 'Inter',
      contrastBackground: {
        enabled: false
      }
    }
  };

  console.log('Preview campaign data:', mockCampaign);
  console.log('Selected theme in preview:', selectedTheme);

  const renderDesktopPreview = () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-50">
      <div className="max-w-lg mx-auto">
        <FunnelUnlockedGame
          campaign={mockCampaign}
          modalContained={true}
        />
      </div>
    </div>
  );

  const renderMobilePreview = () => (
    <div className="w-full h-full flex items-center justify-center p-4 bg-gray-50">
      <MobilePreview
        campaign={mockCampaign}
        previewMode={selectedDevice === 'tablet' ? 'tablet' : 'mobile'}
      />
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white w-full h-full flex flex-col relative overflow-hidden rounded-3xl shadow-2xl max-w-7xl max-h-[90vh]"
      >
        {/* Header avec sélecteur d'appareils */}
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-semibold text-gray-800">Aperçu de la campagne</h2>
            <span className="text-sm text-gray-500">{campaignName}</span>
            
            {/* Device Selector */}
            <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setSelectedDevice('desktop')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedDevice === 'desktop'
                    ? 'bg-white text-[#841b60] shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Monitor className="w-4 h-4" />
                <span>Desktop</span>
              </button>
              <button
                onClick={() => setSelectedDevice('tablet')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedDevice === 'tablet'
                    ? 'bg-white text-[#841b60] shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Tablet className="w-4 h-4" />
                <span>Tablette</span>
              </button>
              <button
                onClick={() => setSelectedDevice('mobile')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedDevice === 'mobile'
                    ? 'bg-white text-[#841b60] shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>Mobile</span>
              </button>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preview Content */}
        <div className="flex-1 pt-20 overflow-auto">
          {selectedDevice === 'desktop' ? renderDesktopPreview() : renderMobilePreview()}
        </div>
      </motion.div>
    </div>
  );
};

export default CampaignPreviewModal;
