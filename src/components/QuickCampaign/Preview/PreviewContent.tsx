
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
    const base = {
      margin: '0 auto',
      backgroundColor: '#ffffff',
      overflow: 'auto' as const,
      width: 'fit-content',
      height: 'fit-content'
    };

    switch (selectedDevice) {
      case 'tablet':
        return { ...base, border: '1px solid #e5e7eb', borderRadius: '12px' };
      case 'mobile':
        return { ...base, border: '1px solid #e5e7eb', borderRadius: '20px' };
      default:
        return { ...base, width: '100%', height: '100%' };
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
