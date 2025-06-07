import React from 'react';
import FunnelUnlockedGame from '../funnels/FunnelUnlockedGame';
import FunnelStandard from '../funnels/FunnelStandard';
import MobilePreview from './Mobile/MobilePreview';

interface CampaignPreviewProps {
  campaign: any;
  previewDevice?: 'desktop' | 'tablet' | 'mobile';
}

const CampaignPreview: React.FC<CampaignPreviewProps> = ({ campaign, previewDevice = 'desktop' }) => {
  const { design } = campaign;

  // If mobile preview, use the dedicated MobilePreview component
  if (previewDevice === 'mobile') {
    return <MobilePreview campaign={campaign} previewMode="mobile" />;
  }

  // Get background image depending on device
  const baseBackground = design?.backgroundImage || campaign.gameConfig?.[campaign.type]?.backgroundImage;
  const mobileBackground = design?.mobileBackgroundImage;
  const backgroundImage = previewDevice === 'mobile' && mobileBackground ? mobileBackground : baseBackground;

  const containerStyle = {
    width: '100%',
    height: '100%',
    position: 'relative' as const,
    overflow: 'hidden',
    backgroundColor: design?.background || '#f8fafc',
  };

  const backgroundStyle = backgroundImage ? {
    position: 'absolute' as const,
    inset: 0,
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    opacity: 0.3,
    zIndex: 0,
  } : {};

  const contentWrapperStyle = {
    position: 'relative' as const,
    zIndex: 1,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  };

  const customStyles = design?.customCSS ? (
    <style dangerouslySetInnerHTML={{ __html: design.customCSS }} />
  ) : null;

  const customHTML = design?.customHTML ? (
    <div dangerouslySetInnerHTML={{ __html: design.customHTML }} />
  ) : null;

  // Get custom images for desktop/tablet
  const customImages = campaign.design?.customImages || [];

  // Helper function to get device-specific config for elements
  const getElementDeviceConfig = (element: any) => {
    const deviceKey = previewDevice === 'mobile' ? 'mobile' : 'desktop';
    const deviceConfig = element.deviceConfig?.[deviceKey];
    return {
      x: deviceConfig?.x ?? element.x ?? 0,
      y: deviceConfig?.y ?? element.y ?? 0,
      width: deviceConfig?.width ?? element.width ?? 100,
      height: deviceConfig?.height ?? element.height ?? 100
    };
  };

  const getFunnelComponent = () => {
    const funnel = campaign.funnel || (['wheel', 'scratch', 'jackpot', 'dice'].includes(campaign.type) ? 'unlocked_game' : 'standard');
    
    // Enhanced campaign with proper settings propagation
    const enhancedCampaign = {
      ...campaign,
      design: {
        ...campaign.design,
        // Ensure colors are properly set
        buttonColor: campaign.buttonConfig?.color || campaign.design?.buttonColor || '#841b60',
        titleColor: campaign.design?.titleColor || '#000000',
        background: campaign.design?.background || '#f8fafc'
      },
      gameConfig: {
        ...campaign.gameConfig,
        [campaign.type]: {
          ...campaign.gameConfig?.[campaign.type],
          // Ensure button configuration is propagated
          buttonLabel: campaign.buttonConfig?.text || campaign.gameConfig?.[campaign.type]?.buttonLabel || 'Jouer',
          buttonColor: campaign.buttonConfig?.color || campaign.gameConfig?.[campaign.type]?.buttonColor || '#841b60'
        }
      }
    };
    
    if (funnel === 'unlocked_game') {
      return (
        <FunnelUnlockedGame
          campaign={enhancedCampaign}
          previewMode={previewDevice}
          modalContained={false}
        />
      );
    }
    return (
      <FunnelStandard
        campaign={enhancedCampaign}
        key={`${campaign.id}-${JSON.stringify({
          gameConfig: enhancedCampaign.gameConfig,
          design: enhancedCampaign.design,
          screens: enhancedCampaign.screens,
          buttonConfig: enhancedCampaign.buttonConfig
        })}`}
      />
    );
  };

  return (
    <div style={containerStyle}>
      {customStyles}

      {/* Background image with proper display */}
      {backgroundImage && <div style={backgroundStyle} />}

      {/* Content */}
      <div style={contentWrapperStyle}>
        {customHTML}
        {getFunnelComponent()}
        
        {/* Custom Images for desktop/tablet */}
        {customImages.map((customImage: any) => {
          if (!customImage?.src) return null;
          
          const deviceConfig = getElementDeviceConfig(customImage);
          
          return (
            <div
              key={`preview-image-${customImage.id}`}
              style={{
                position: 'absolute',
                transform: `translate3d(${deviceConfig.x}px, ${deviceConfig.y}px, 0) rotate(${customImage.rotation || 0}deg)`,
                width: deviceConfig.width,
                height: deviceConfig.height,
                zIndex: 20,
                pointerEvents: 'none'
              }}
            >
              <img
                src={customImage.src}
                alt="Custom element"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '4px'
                }}
                draggable={false}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CampaignPreview;
