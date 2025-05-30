
import React, { useState } from 'react';
import { X, Monitor, Tablet, Smartphone, RotateCcw, Maximize2 } from 'lucide-react';
import FunnelUnlockedGame from '../funnels/FunnelUnlockedGame';
import FunnelStandard from '../funnels/FunnelStandard';
import MobilePreview from './Mobile/MobilePreview';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: any;
}

const PreviewModal: React.FC<PreviewModalProps> = ({ isOpen, onClose, campaign }) => {
  const [selectedDevice, setSelectedDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!isOpen) return null;

  const getPreviewFunnel = () => {
    if (['wheel', 'scratch', 'jackpot', 'dice'].includes(campaign.type)) {
      return <FunnelUnlockedGame campaign={campaign} modalContained={true} />;
    }
    return <FunnelStandard campaign={campaign} modalContained={true} />;
  };

  const backgroundImage = campaign.design?.backgroundImage;

  const getBackgroundStyle = () => {
    const style: any = {
      position: 'relative',
      width: '100%',
      height: '100%',
      backgroundColor: campaign.design?.background || '#ebf4f7',
      transition: 'all 0.3s ease-in-out'
    };

    if (backgroundImage && selectedDevice === 'desktop') {
      style.backgroundImage = `url(${backgroundImage})`;
      style.backgroundSize = 'cover';
      style.backgroundPosition = 'center';
      style.backgroundRepeat = 'no-repeat';
    }

    return style;
  };

  const getDeviceContainerStyle = () => {
    if (isFullscreen) {
      return "w-screen h-screen";
    }
    
    switch (selectedDevice) {
      case 'desktop':
        return "w-full h-full";
      case 'tablet':
        return "w-full h-full max-w-4xl mx-auto";
      case 'mobile':
        return "w-full h-full max-w-md mx-auto";
      default:
        return "w-full h-full";
    }
  };

  const renderDesktopPreview = () => (
    <div className={getDeviceContainerStyle()}>
      <div 
        style={getBackgroundStyle()}
        className="relative overflow-hidden rounded-lg shadow-2xl border border-gray-200"
      >
        <div className="relative z-20 w-full h-full flex items-center justify-center p-6">
          {getPreviewFunnel()}
        </div>
        
        {/* Indicateur de responsive design */}
        {!isFullscreen && (
          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 text-xs text-gray-600 shadow-md">
            <div className="flex items-center space-x-2">
              <Monitor className="w-3 h-3" />
              <span>Mode Bureau</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderMobilePreview = () => (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="relative">
        <MobilePreview
          campaign={campaign}
          previewMode={selectedDevice === 'tablet' ? 'tablet' : 'mobile'}
        />
        
        {/* Indicateur de device */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 text-xs text-gray-600 shadow-md">
          <div className="flex items-center space-x-2">
            {selectedDevice === 'tablet' ? <Tablet className="w-3 h-3" /> : <Smartphone className="w-3 h-3" />}
            <span>{selectedDevice === 'tablet' ? 'Mode Tablette' : 'Mode Mobile'}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${isFullscreen ? 'bg-white' : 'bg-black/70 backdrop-blur-sm'}`}>
      <div className={`bg-white flex flex-col relative overflow-hidden transition-all duration-300 ${
        isFullscreen ? 'w-screen h-screen' : 'w-full h-full max-w-7xl max-h-[95vh] rounded-xl shadow-2xl'
      }`}>
        
        {/* Header amélioré */}
        <div className={`absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-4 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm ${
          isFullscreen ? 'bg-white' : ''
        }`}>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            
            <h2 className="text-lg font-semibold text-gray-800">
              Aperçu - {campaign.name}
            </h2>
            
            {/* Device Selector avec design amélioré */}
            <div className="flex items-center space-x-1 bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setSelectedDevice('desktop')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedDevice === 'desktop'
                    ? 'bg-white text-[#841b60] shadow-sm transform scale-105'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Monitor className="w-4 h-4" />
                <span>Desktop</span>
              </button>
              <button
                onClick={() => setSelectedDevice('tablet')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedDevice === 'tablet'
                    ? 'bg-white text-[#841b60] shadow-sm transform scale-105'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Tablet className="w-4 h-4" />
                <span>Tablette</span>
              </button>
              <button
                onClick={() => setSelectedDevice('mobile')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedDevice === 'mobile'
                    ? 'bg-white text-[#841b60] shadow-sm transform scale-105'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>Mobile</span>
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Bouton plein écran */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 group"
              title={isFullscreen ? "Quitter le plein écran" : "Mode plein écran"}
            >
              {isFullscreen ? (
                <Minimize2 className="w-5 h-5 text-gray-600 group-hover:text-[#841b60]" />
              ) : (
                <Maximize2 className="w-5 h-5 text-gray-600 group-hover:text-[#841b60]" />
              )}
            </button>

            {/* Bouton de fermeture */}
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 group"
              title="Fermer l'aperçu"
            >
              <X className="w-5 h-5 text-gray-600 group-hover:text-red-500" />
            </button>
          </div>
        </div>

        {/* Contenu principal avec animations */}
        <div className={`flex-1 overflow-auto transition-all duration-300 ${isFullscreen ? 'pt-16' : 'pt-20'}`}>
          <div className="w-full h-full animate-fade-in">
            {selectedDevice === 'desktop' ? renderDesktopPreview() : renderMobilePreview()}
          </div>
        </div>

        {/* Footer informatif */}
        {!isFullscreen && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/10 to-transparent h-12 pointer-events-none"></div>
        )}
      </div>
    </div>
  );
};

export default PreviewModal;
