
import React from 'react';
import CampaignPreview from '../../CampaignEditor/CampaignPreview';

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
  // Enhanced campaign with custom colors and proper configuration
  const enhancedCampaign = {
    ...mockCampaign,
    design: {
      ...mockCampaign.design,
      customColors: customColors,
      buttonColor: customColors.primary,
      titleColor: mockCampaign.design?.titleColor || '#000000',
      background: mockCampaign.design?.background || '#f8fafc'
    },
    buttonConfig: {
      ...mockCampaign.buttonConfig,
      color: customColors.primary,
      borderColor: customColors.primary
    },
    gameConfig: {
      ...mockCampaign.gameConfig,
      jackpot: {
        ...mockCampaign.gameConfig?.jackpot,
        ...jackpotColors,
        buttonColor: customColors.primary
      },
      [selectedGameType]: {
        ...mockCampaign.gameConfig?.[selectedGameType],
        buttonColor: customColors.primary,
        buttonLabel: mockCampaign.gameConfig?.[selectedGameType]?.buttonLabel || 'Jouer'
      }
    }
  };


  const getContainerStyle = () => {
    return {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ffffff'
    } as React.CSSProperties;
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
            <CampaignPreview
              campaign={enhancedCampaign}
              previewDevice={selectedDevice}
              key={`${selectedDevice}-${JSON.stringify({
                gameConfig: enhancedCampaign.gameConfig,
                design: enhancedCampaign.design,
                screens: enhancedCampaign.screens
              })}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewContent;
