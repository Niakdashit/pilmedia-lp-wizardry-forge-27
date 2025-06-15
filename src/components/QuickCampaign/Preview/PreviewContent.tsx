
import React from 'react';
import FunnelUnlockedGame from '../../funnels/FunnelUnlockedGame';
import FunnelStandard from '../../funnels/FunnelStandard';
import DeviceFrame from './DeviceFrame';

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
          customColors: customColors
        })}
      />
    );
  };

  const getContainerStyle = () => {
    const baseStyle = {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: enhancedCampaign.design?.background || '#f9fafb',
      position: 'relative' as const,
      overflow: 'hidden' as const
    };

    const mobileBg = enhancedCampaign.design?.mobileBackgroundImage;
    const bgImage = selectedDevice === 'mobile' && mobileBg
      ? mobileBg
      : enhancedCampaign.design?.backgroundImage;

    if (bgImage) {
      return {
        ...baseStyle,
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      };
    }

    return baseStyle;
  };

  return (
    <div className="flex-1 pt-20 overflow-auto">
      <div className="w-full h-full flex items-center justify-center p-4">
        <DeviceFrame device={selectedDevice}>
          <div
            style={{
              ...getContainerStyle(),
              width: '100%',
              height: '100%',
              minHeight: 0,      // Pour éviter le débordement vertical
              minWidth: 0,       // Pour éviter le débordement horizontal
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'stretch',
              justifyContent: 'stretch'
            }}
          >
            {/* Background overlay for better contrast if background image exists */}
            {(selectedDevice === 'mobile'
              ? enhancedCampaign.design?.mobileBackgroundImage
              : enhancedCampaign.design?.backgroundImage) && (
              <div
                className="absolute inset-0 bg-black opacity-20"
                style={{ zIndex: 1 }}
              />
            )}
            
            {/* Content container */}
            <div 
              className="relative z-10 w-full h-full flex items-center justify-center"
              style={{ 
                minHeight: selectedDevice === 'desktop' ? '600px' : '100%',
                padding: selectedDevice === 'mobile' ? '32px 16px 16px' : selectedDevice === 'tablet' ? '24px 16px' : '16px',
                overflowY: 'auto', // Ajoute le scroll pour le funnel/formulaire à l'intérieur du device !
                width: '100%',
                height: '100%'
              }}
            >
              {getFunnelComponent()}
            </div>
          </div>
        </DeviceFrame>
      </div>
    </div>
  );
};

export default PreviewContent;

