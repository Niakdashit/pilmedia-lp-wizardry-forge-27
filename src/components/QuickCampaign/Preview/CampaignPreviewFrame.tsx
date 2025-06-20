
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
  const { backgroundImageUrl } = useQuickCampaignStore();

  const getContainerStyle = () => {
    const baseStyle = {
      width: '100%',
      height: '100%',
      minHeight: selectedDevice === 'desktop' ? '460px' : '500px',
      backgroundColor: '#ffffff',
      position: 'relative' as const,
      overflow: 'hidden' as const
    };

    if (backgroundImageUrl) {
      return {
        ...baseStyle,
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: selectedDevice === 'desktop' ? 'cover' : 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      };
    }

    return baseStyle;
  };

  return (
    <div style={getContainerStyle()}>
      {/* Contenu sans masque blanc */}
      <div className="h-full relative">
        <div className="h-full flex items-center justify-center">
          <div className={`w-full ${selectedDevice === 'desktop' ? 'max-w-4xl' : 'max-w-full px-4'}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignPreviewFrame;
