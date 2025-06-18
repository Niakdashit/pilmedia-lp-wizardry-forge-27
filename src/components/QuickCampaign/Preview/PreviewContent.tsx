
import React from 'react';
import FunnelUnlockedGame from '../../funnels/FunnelUnlockedGame';
import FunnelStandard from '../../funnels/FunnelStandard';
import DeviceFrame from './DeviceFrame';
import CampaignPreviewFrame from './CampaignPreviewFrame';
import { useQuickCampaignStore } from '../../../stores/quickCampaignStore';

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
  const { backgroundImageUrl, gamePosition } = useQuickCampaignStore();
  const unlockedTypes = ['wheel', 'scratch', 'jackpot', 'dice'];

  // Enhanced campaign with custom colors and proper configuration
  const enhancedCampaign = {
    ...mockCampaign,
    design: {
      ...mockCampaign.design,
      customColors: customColors,
      buttonColor: customColors.primary,
      titleColor: mockCampaign.design?.titleColor || '#000000',
      background: mockCampaign.design?.background || '#f8fafc',
      backgroundImage: backgroundImageUrl || mockCampaign.design?.backgroundImage,
      mobileBackgroundImage: backgroundImageUrl || mockCampaign.design?.mobileBackgroundImage
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
    },
    mobileConfig: {
      ...mockCampaign.mobileConfig,
      gamePosition: gamePosition
    }
  };

  const getFunnelComponent = () => {
    const funnel = enhancedCampaign.funnel || (unlockedTypes.includes(selectedGameType) ? 'unlocked_game' : 'standard');
    if (funnel === 'unlocked_game') {
      return (
        <FunnelUnlockedGame
          campaign={enhancedCampaign}
          previewMode={selectedDevice === 'desktop' ? 'desktop' : selectedDevice}
          modalContained={false}
        />
      );
    }
    return (
      <FunnelStandard
        campaign={enhancedCampaign}
        key={JSON.stringify({
          gameConfig: enhancedCampaign.gameConfig,
          design: enhancedCampaign.design,
          screens: enhancedCampaign.screens,
          customColors: customColors,
          backgroundImageUrl: backgroundImageUrl,
          gamePosition: gamePosition
        })}
      />
    );
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="w-full h-full flex items-center justify-center p-4">
        <DeviceFrame device={selectedDevice}>
          <CampaignPreviewFrame selectedDevice={selectedDevice}>
            <div className="w-full h-full flex items-center justify-center">
              {getFunnelComponent()}
            </div>
          </CampaignPreviewFrame>
        </DeviceFrame>
      </div>
    </div>
  );
};

export default PreviewContent;
