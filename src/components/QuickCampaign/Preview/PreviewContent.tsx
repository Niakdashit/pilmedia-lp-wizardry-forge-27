import React from 'react';
import FunnelUnlockedGame from '../../funnels/FunnelUnlockedGame';
import FunnelStandard from '../../funnels/FunnelStandard';

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

  // Enhance mockCampaign with custom colors
  const enhancedCampaign = {
    ...mockCampaign,
    design: {
      ...mockCampaign.design,
      customColors: customColors
    },
    gameConfig: {
      ...mockCampaign.gameConfig,
      jackpot: {
        ...mockCampaign.gameConfig?.jackpot,
        ...jackpotColors
      }
    }
  };

  const getFunnelComponent = () => {
    if (unlockedTypes.includes(selectedGameType)) {
      return (
        <FunnelUnlockedGame
          campaign={enhancedCampaign}
          previewMode={selectedDevice === 'desktop' ? 'desktop' : selectedDevice}
          modalContained={false}
        />
      );
    }
    return <FunnelStandard campaign={enhancedCampaign} />;
  };

  const getContainerStyle = () => {
    const baseStyle = {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f9fafb',
      position: 'relative' as const,
      overflow: 'hidden' as const
    };

    // Background image if available
    if (mockCampaign.design?.backgroundImage) {
      return {
        ...baseStyle,
        backgroundImage: `url(${mockCampaign.design.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      };
    }

    return baseStyle;
  };

  const getDeviceContainerStyle = () => {
    switch (selectedDevice) {
      case 'tablet':
        return {
          maxWidth: '768px',
          maxHeight: '1024px',
          margin: '0 auto',
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          overflow: 'hidden' as const,
          backgroundColor: '#ffffff'
        };
      case 'mobile':
        return {
          maxWidth: '375px',
          maxHeight: '812px',
          margin: '0 auto',
          border: '1px solid #e5e7eb',
          borderRadius: '20px',
          overflow: 'hidden' as const,
          backgroundColor: '#ffffff'
        };
      default:
        return {
          width: '100%',
          height: '100%'
        };
    }
  };

  return (
    <div className="flex-1 pt-20 overflow-auto">
      <div className="w-full h-full flex items-center justify-center p-4">
        <div style={getDeviceContainerStyle()}>
          <div style={getContainerStyle()}>
            {/* Background overlay for better contrast if background image exists */}
            {mockCampaign.design?.backgroundImage && (
              <div 
                className="absolute inset-0 bg-black opacity-20"
                style={{ zIndex: 1 }}
              />
            )}
            
            {/* Content container */}
            <div 
              className="relative z-10 w-full h-full flex items-center justify-center p-4"
              style={{ minHeight: selectedDevice === 'desktop' ? '600px' : '100%' }}
            >
              {getFunnelComponent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewContent;
