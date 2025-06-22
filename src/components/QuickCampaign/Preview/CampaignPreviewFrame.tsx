
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
      minHeight: selectedDevice === 'desktop' ? '500px' : '400px',
      backgroundColor: '#ffffff',
      position: 'relative' as const,
      overflow: 'hidden' as const,
      display: 'flex',
      flexDirection: 'column' as const
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
      <div className="flex-1 relative">
        <div className="w-full h-full flex items-center justify-center p-4">
          <div className={`w-full ${selectedDevice === 'desktop' ? 'max-w-6xl' : 'max-w-full'}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignPreviewFrame;
