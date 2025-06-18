
import React from 'react';
import { useQuickCampaignStore } from '../../../stores/quickCampaignStore';

interface CampaignPreviewFrameProps {
  children: React.ReactNode;
  selectedDevice: 'desktop' | 'tablet' | 'mobile';
}

const CampaignPreviewFrame: React.FC<CampaignPreviewFrameProps> = ({
  children,
  selectedDevice
}) => {
  const { campaignName, backgroundImageUrl } = useQuickCampaignStore();

  const getContainerStyle = () => {
    const baseStyle = {
      width: '100%',
      height: '100%',
      minHeight: selectedDevice === 'desktop' ? '600px' : selectedDevice === 'tablet' ? '500px' : '400px',
      backgroundColor: '#f8fafc',
      position: 'relative' as const,
      overflow: 'hidden' as const,
      borderRadius: selectedDevice === 'mobile' ? '20px' : '8px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
    };

    if (backgroundImageUrl) {
      return {
        ...baseStyle,
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      };
    }

    return baseStyle;
  };

  return (
    <div style={getContainerStyle()}>
      {/* Header simulation */}
      <div className="absolute top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 p-4 z-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
            <h1 className="text-lg font-semibold text-gray-800 truncate">
              {campaignName || 'Ma Campagne'}
            </h1>
          </div>
          
          {selectedDevice === 'desktop' && (
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content area */}
      <div className="pt-16 h-full relative">
        {backgroundImageUrl && (
          <div className="absolute inset-0 bg-black/20 z-10" />
        )}
        
        {/* Game content */}
        <div className="relative z-20 h-full flex items-center justify-center p-6">
          <div className="w-full max-w-2xl">
            {children}
          </div>
        </div>
      </div>

      {/* Footer simulation */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 p-3 z-20">
        <div className="flex items-center justify-center">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>🎮 Jeu interactif</span>
            <span>•</span>
            <span>🎯 {campaignName || 'Campaign'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignPreviewFrame;
