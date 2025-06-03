
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Monitor, Tablet, Smartphone } from 'lucide-react';
import { useQuickCampaignStore } from '../../stores/quickCampaignStore';
import WheelPreview from '../GameTypes/WheelPreview';
import { Jackpot } from '../GameTypes';
import ScratchPreview from '../GameTypes/ScratchPreview';
import DicePreview from '../GameTypes/DicePreview';
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
  
  const { generatePreviewCampaign, campaignName, selectedGameType } = useQuickCampaignStore();

  if (!isOpen) return null;

  // Utiliser les données en temps réel du store
  const mockCampaign = generatePreviewCampaign();

  console.log('Preview campaign data:', mockCampaign);

  // Rendu du jeu selon le type sélectionné
  const renderGameComponent = () => {
    const gameType = selectedGameType || 'wheel';

    switch (gameType) {
      case 'wheel':
        return (
          <WheelPreview
            campaign={mockCampaign}
            config={mockCampaign.gameConfig?.wheel || {
              mode: "instant_winner" as const,
              winProbability: 0.1,
              maxWinners: 10,
              winnersCount: 0
            }}
            gameSize="large"
            gamePosition="center"
            previewDevice="desktop"
          />
        );

      case 'jackpot':
        return (
          <Jackpot
            isPreview={true}
            instantWinConfig={mockCampaign.gameConfig?.jackpot?.instantWin || {
              mode: "instant_winner" as const,
              winProbability: 0.1,
              maxWinners: 10,
              winnersCount: 0
            }}
            buttonLabel={mockCampaign.gameConfig?.jackpot?.buttonLabel || 'Lancer le Jackpot'}
            buttonColor={mockCampaign.gameConfig?.jackpot?.buttonColor || '#841b60'}
            selectedTemplate={mockCampaign.gameConfig?.jackpot?.template}
            backgroundImage={mockCampaign.gameConfig?.jackpot?.backgroundImage}
          />
        );

      case 'scratch':
        return (
          <ScratchPreview 
            config={mockCampaign.gameConfig?.scratch || {}}
          />
        );

      case 'dice':
        return (
          <DicePreview 
            config={mockCampaign.gameConfig?.dice || {}}
          />
        );

      default:
        return (
          <div className="text-center text-gray-500">
            <p>Type de jeu non supporté: {gameType}</p>
          </div>
        );
    }
  };

  const renderDesktopPreview = () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-50 relative overflow-hidden">
      {/* Background image if available */}
      {mockCampaign.design?.backgroundImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage: `url(${mockCampaign.design.backgroundImage})`
          }}
        />
      )}
      
      {/* Content container */}
      <div className="relative z-10 max-w-2xl mx-auto p-8 text-center">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {mockCampaign.screens?.[0]?.title || 'Tentez votre chance !'}
          </h1>
          <p className="text-lg text-gray-600">
            {mockCampaign.screens?.[0]?.description || 'Participez pour avoir une chance de gagner !'}
          </p>
        </div>
        
        {/* Game Component */}
        <div className="flex justify-center">
          {renderGameComponent()}
        </div>
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
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
              {selectedGameType || 'wheel'}
            </span>
            
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
