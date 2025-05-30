
import React, { useState } from 'react';
import { X, Monitor, Tablet, Smartphone } from 'lucide-react';
import FunnelUnlockedGame from '../funnels/FunnelUnlockedGame';
import WheelPreview from '../GameTypes/WheelPreview';
import MobilePreview from './Mobile/MobilePreview';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: any;
}

const PreviewModal: React.FC<PreviewModalProps> = ({ isOpen, onClose, campaign }) => {
  const [selectedDevice, setSelectedDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  if (!isOpen) return null;

  const getPreviewFunnel = () => {
    // En mode desktop pour les campagnes "wheel", utiliser directement WheelPreview
    if (selectedDevice === 'desktop' && campaign.type === 'wheel') {
      return (
        <WheelPreview
          campaign={campaign}
          config={{
            mode: 'instant_winner' as const,
            winProbability: campaign.gameConfig?.wheel?.winProbability || 0.1,
            maxWinners: campaign.gameConfig?.wheel?.maxWinners,
            winnersCount: 0
          }}
          onFinish={() => {}}
        />
      );
    }
    
    // Pour les autres cas, utiliser FunnelUnlockedGame
    return <FunnelUnlockedGame campaign={campaign} />;
  };

  // Récupérer l'image de fond générale (sans duplication avec le jeu)
  const backgroundImage = campaign.design?.backgroundImage;

  const getBackgroundStyle = () => {
    const style: any = {
      position: 'relative',
      width: '100%',
      height: '100%',
      backgroundColor: campaign.design?.background || '#ebf4f7'
    };

    // Appliquer l'image de fond seulement en mode desktop et pour les types compatibles
    if (backgroundImage && selectedDevice === 'desktop') {
      style.backgroundImage = `url(${backgroundImage})`;
      style.backgroundSize = 'cover';
      style.backgroundPosition = 'center';
      style.backgroundRepeat = 'no-repeat';
    }

    return style;
  };

  const renderDesktopPreview = () => (
    <div style={getBackgroundStyle()}>
      {/* Contenu du funnel avec z-index élevé pour être au-dessus du background */}
      <div className="relative z-20 w-full h-full flex items-center justify-center">
        {getPreviewFunnel()}
      </div>
    </div>
  );

  const renderMobilePreview = () => (
    <div className="w-full h-full flex items-center justify-center p-4">
      <MobilePreview
        campaign={campaign}
        previewMode={selectedDevice === 'tablet' ? 'tablet' : 'mobile'}
      />
    </div>
  );

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
