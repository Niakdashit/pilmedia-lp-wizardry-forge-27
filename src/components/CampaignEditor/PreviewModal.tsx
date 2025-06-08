import React, { useState } from 'react';
import { X, Monitor, Tablet, Smartphone } from 'lucide-react';
import FunnelUnlockedGame from '../funnels/FunnelUnlockedGame';
import FunnelStandard from '../funnels/FunnelStandard';
import CampaignPreview from './CampaignPreview';
import { PREVIEW_CONTAINER_SPECS } from './Mobile/constants';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: any;
}

const PreviewModal: React.FC<PreviewModalProps> = ({ isOpen, onClose, campaign }) => {
  const [selectedDevice, setSelectedDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  if (!isOpen) return null;

  const getPreviewFunnel = () => {
    const funnel = campaign.funnel || (['wheel', 'scratch', 'jackpot', 'dice'].includes(campaign.type) ? 'unlocked_game' : 'standard');
    if (funnel === 'unlocked_game') {
      return (
        <FunnelUnlockedGame
          campaign={campaign}
          previewMode={selectedDevice}
          modalContained={true}
          key={`${selectedDevice}-${campaign.id}-${JSON.stringify({
            gameConfig: campaign.gameConfig,
            design: campaign.design,
            screens: campaign.screens
          })}`} // Force re-render with comprehensive dependencies
        />
      );
    }
    return (
      <FunnelStandard
        campaign={campaign}
        key={`${campaign.id}-${JSON.stringify({
          gameConfig: campaign.gameConfig,
          design: campaign.design,
          screens: campaign.screens,
        })}`}
      />
    );
  };

  // Récupérer l'image de fond du jeu
  const gameBackgroundImage = campaign.gameConfig?.[campaign.type]?.backgroundImage ||
    campaign.design?.backgroundImage;

  const getBackgroundStyle = () => {
    const style: any = {
      position: 'relative',
      width: '100%',
      height: '100%',
      backgroundColor: campaign.design?.background || '#ebf4f7'
    };
    if (gameBackgroundImage) {
      style.backgroundImage = `url(${gameBackgroundImage})`;
      style.backgroundSize = 'cover';
      style.backgroundPosition = 'center';
      style.backgroundRepeat = 'no-repeat';
    }
    return style;
  };

  const renderDesktopPreview = () => (
    <div style={getBackgroundStyle()}>
      {getPreviewFunnel()}
    </div>
  );

  const renderMobilePreview = () => {
    // Synchronisé avec PREVIEW_CONTAINER_SPECS
    const specs = selectedDevice === 'tablet'
      ? PREVIEW_CONTAINER_SPECS.tablet
      : PREVIEW_CONTAINER_SPECS.mobile;

    const deviceStyle: React.CSSProperties = {
      width: specs.width,
      height: specs.height,
      backgroundColor: '#1f2937',
      borderRadius: specs.borderRadius,
      padding: '8px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      position: 'relative',
      overflow: 'hidden'
    };

    return (
      <div className="w-full h-full flex items-center justify-center">
        <div style={deviceStyle}>
          <CampaignPreview
            campaign={campaign}
            previewDevice={selectedDevice}
            key={`mobile-${campaign.id}-${JSON.stringify({
              gameConfig: campaign.gameConfig,
              design: campaign.design,
              screens: campaign.screens
            })}`}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white w-full h-full flex flex-col relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-semibold text-gray-800">Aperçu de la campagne</h2>

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

        <div className="flex-1 pt-20 overflow-auto">
          {selectedDevice === 'desktop' ? renderDesktopPreview() : renderMobilePreview()}
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
