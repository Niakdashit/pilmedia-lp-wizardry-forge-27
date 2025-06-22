
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
    textColor?: string;
    buttonStyle?: string;
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

  // Configuration cohérente des couleurs
  const enhancedCampaign = React.useMemo(() => {
    return {
      ...mockCampaign,
      design: {
        ...mockCampaign.design,
        customColors: customColors,
        buttonColor: customColors.primary,
        titleColor: customColors.textColor || '#000000',
        background: mockCampaign.design?.background || '#f8fafc',
        backgroundImage: backgroundImageUrl || mockCampaign.design?.backgroundImage,
        mobileBackgroundImage: backgroundImageUrl || mockCampaign.design?.mobileBackgroundImage,
        containerBackgroundColor: '#ffffff',
        borderColor: customColors.primary,
        borderRadius: '16px'
      },
      buttonConfig: {
        ...mockCampaign.buttonConfig,
        color: customColors.primary,
        borderColor: customColors.primary,
        textColor: customColors.textColor || '#ffffff',
        size: 'medium',
        borderRadius: 8
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
        gamePosition: gamePosition,
        buttonColor: customColors.primary,
        buttonTextColor: customColors.textColor || '#ffffff'
      },
      // Ajout de la configuration des couleurs spécifique à la roue
      config: {
        ...mockCampaign.config,
        roulette: {
          ...mockCampaign.config?.roulette,
          borderColor: customColors.primary,
          borderOutlineColor: customColors.accent || customColors.secondary,
          segmentColor1: customColors.primary,
          segmentColor2: customColors.secondary
        }
      }
    };
  }, [mockCampaign, selectedGameType, customColors, jackpotColors, backgroundImageUrl, gamePosition]);

  const getFunnelComponent = () => {
    const funnel = enhancedCampaign.funnel || (unlockedTypes.includes(selectedGameType) ? 'unlocked_game' : 'standard');
    
    if (funnel === 'unlocked_game') {
      return (
        <FunnelUnlockedGame
          campaign={enhancedCampaign}
          previewMode={selectedDevice === 'desktop' ? 'desktop' : selectedDevice}
          modalContained={false}
          key={`funnel-${JSON.stringify(customColors)}-${gamePosition}-${selectedDevice}`}
        />
      );
    }
    
    return (
      <FunnelStandard
        campaign={enhancedCampaign}
        key={`standard-${JSON.stringify(customColors)}-${gamePosition}-${selectedDevice}`}
      />
    );
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="w-full h-full flex items-center justify-center p-4">
        {selectedDevice === 'desktop' ? (
          <CampaignPreviewFrame selectedDevice={selectedDevice}>
            <div className="w-full h-full flex items-center justify-center">
              {getFunnelComponent()}
            </div>
          </CampaignPreviewFrame>
        ) : (
          <DeviceFrame device={selectedDevice}>
            <CampaignPreviewFrame selectedDevice={selectedDevice}>
              <div className="w-full h-full flex items-center justify-center">
                {getFunnelComponent()}
              </div>
            </CampaignPreviewFrame>
          </DeviceFrame>
        )}
      </div>
    </div>
  );
};

export default PreviewContent;
