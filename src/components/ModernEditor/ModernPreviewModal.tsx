
import React, { useState } from 'react';
import { X, Monitor, Tablet, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';
import FunnelUnlockedGame from '../funnels/FunnelUnlockedGame';
import MobilePreview from '../CampaignEditor/Mobile/MobilePreview';

interface ModernPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: any;
}

const ModernPreviewModal: React.FC<ModernPreviewModalProps> = ({
  isOpen,
  onClose,
  campaign
}) => {
  const [selectedDevice, setSelectedDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  if (!isOpen) return null;

  const getPreviewFunnel = () => {
    if (['wheel', 'scratch', 'jackpot', 'dice'].includes(campaign.type)) {
      return (
        <FunnelUnlockedGame 
          campaign={campaign} 
          previewMode={selectedDevice} 
          modalContained={true}
          key={`${selectedDevice}-${campaign.id}-${JSON.stringify({
            gameConfig: campaign.gameConfig,
            design: campaign.design,
            screens: campaign.screens
          })}`}
        />
      );
    }
    return <div className="flex items-center justify-center h-full text-gray-500">Aperçu non disponible</div>;
  };

  const renderDesktopPreview = () => (
    <div className="w-full h-full flex items-center justify-center p-8 bg-gray-100">
      <div className="w-full max-w-4xl h-full bg-white rounded-xl shadow-2xl overflow-hidden">
        {getPreviewFunnel()}
      </div>
    </div>
  );

  const renderMobilePreview = () => (
    <div className="w-full h-full flex items-center justify-center p-4 bg-gray-100">
      <MobilePreview
        campaign={campaign}
        previewMode={selectedDevice === 'tablet' ? 'tablet' : 'mobile'}
        key={`mobile-${campaign.id}-${JSON.stringify({
          mobileConfig: campaign.mobileConfig,
          gameConfig: campaign.gameConfig,
          design: campaign.design
        })}`}
      />
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-white w-[95vw] h-[95vh] flex flex-col relative overflow-hidden rounded-2xl shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-bold text-gray-900">Aperçu de la campagne</h2>
            <span className="text-sm text-gray-500">{campaign.name}</span>
            
            {/* Device Selector */}
            <div className="flex items-center bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setSelectedDevice('desktop')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedDevice === 'desktop'
                    ? 'bg-white text-[#841b60] shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Monitor className="w-4 h-4" />
                <span>Bureau</span>
              </button>
              <button
                onClick={() => setSelectedDevice('tablet')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
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
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
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
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Preview Content */}
        <div className="flex-1 overflow-hidden">
          {selectedDevice === 'desktop' ? renderDesktopPreview() : renderMobilePreview()}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ModernPreviewModal;
