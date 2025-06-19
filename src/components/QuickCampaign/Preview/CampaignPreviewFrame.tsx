
import React from 'react';
import { useQuickCampaignStore } from '../../../stores/quickCampaignStore';
import { Globe, Lock, Star } from 'lucide-react';

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
      minHeight: selectedDevice === 'desktop' ? '500px' : selectedDevice === 'tablet' ? '450px' : '400px',
      backgroundColor: '#ffffff',
      position: 'relative' as const,
      overflow: 'hidden' as const,
      borderRadius: '12px',
      border: '1px solid #e5e7eb'
    };

    if (backgroundImageUrl) {
      return {
        ...baseStyle,
        backgroundImage: `linear-gradient(rgba(255,255,255,0.85), rgba(255,255,255,0.85)), url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      };
    }

    return baseStyle;
  };

  return (
    <div style={getContainerStyle()}>
      {/* Modern Browser Header */}
      <div className="absolute top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-20">
        {/* Browser Controls */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <div className="flex space-x-1.5">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            </div>
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-1.5">
              <Lock className="w-3 h-3 text-green-600" />
              <Globe className="w-3 h-3 text-gray-500" />
              <span className="text-xs text-gray-600 font-medium">campaign.leadya.com</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="text-xs text-gray-600">Sécurisé</span>
          </div>
        </div>
        
        {/* Page Title */}
        <div className="px-4 pb-3">
          <h1 className="text-lg font-semibold text-gray-800 truncate flex items-center">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-md mr-3 flex items-center justify-center">
              <span className="text-white text-xs font-bold">L</span>
            </div>
            {campaignName || 'Ma Campagne Interactive'}
          </h1>
        </div>
      </div>

      {/* Content Area */}
      <div className="pt-20 pb-12 h-full relative">
        <div className="h-full flex items-center justify-center p-6">
          <div className="w-full max-w-4xl">
            {children}
          </div>
        </div>
      </div>

      {/* Modern Footer */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 z-20">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-600 font-medium">Campagne active</span>
            </div>
            <div className="text-xs text-gray-500">•</div>
            <span className="text-xs text-gray-600">Powered by Leadya</span>
          </div>
          <div className="flex items-center space-x-3 text-xs text-gray-500">
            <span>🎮 Jeu interactif</span>
            <span>🎯 Marketing</span>
            <span>✨ Engagement</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignPreviewFrame;
