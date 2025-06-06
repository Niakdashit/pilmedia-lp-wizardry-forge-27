
import React from 'react';
import FunnelUnlockedGame from '../../funnels/FunnelUnlockedGame';
import FunnelStandard from '../../funnels/FunnelStandard';
import MobilePreview from '../../CampaignEditor/Mobile/MobilePreview';

interface PreviewContentProps {
  selectedDevice: 'desktop' | 'tablet' | 'mobile';
  mockCampaign: any;
  selectedGameType: string;
  customColors: {
    primary: string;
    secondary: string;
    accent?: string;
  };
  jackpotColors: {
    containerBackgroundColor: string;
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
    slotBorderColor: string;
    slotBorderWidth: number;
    slotBackgroundColor: string;
  };
}

const PreviewContent: React.FC<PreviewContentProps> = ({
  selectedDevice,
  mockCampaign,
  selectedGameType,
  customColors,
  jackpotColors
}) => {
  const unlockedTypes = ['wheel', 'scratch', 'jackpot', 'dice'];

  const getFunnelComponent = () => {
    if (unlockedTypes.includes(selectedGameType)) {
      return (
        <FunnelUnlockedGame
          campaign={mockCampaign}
          previewMode={selectedDevice === 'desktop' ? 'desktop' : selectedDevice}
          modalContained={false}
        />
      );
    }
    return <FunnelStandard campaign={mockCampaign} />;
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
      <div className="relative z-10 max-w-2xl mx-auto p-8">
        {getFunnelComponent()}
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
    <div className="flex-1 pt-20 overflow-auto">
      {selectedDevice === 'desktop' ? renderDesktopPreview() : renderMobilePreview()}
    </div>
  );
};

export default PreviewContent;
