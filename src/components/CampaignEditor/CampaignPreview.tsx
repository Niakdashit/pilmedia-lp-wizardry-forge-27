
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
      zIndex: 0,
    } : {};

  const contentWrapperStyle = {
    position: 'relative' as const,
    zIndex: 1,
    width: '100%',
    height: '100%',
    display: 'flex',
  };

  const customStyles = design?.customCSS ? (
    <style dangerouslySetInnerHTML={{ __html: design.customCSS }} />
  ) : null;

  const customHTML = design?.customHTML ? (
    <div dangerouslySetInnerHTML={{ __html: design.customHTML }} />
  ) : null;

  // Get custom images and texts for desktop/tablet with proper fallback
  const customImages = campaign.design?.customImages || [];
  const customTexts = campaign.design?.customTexts || [];

  const sizeMap: Record<string, string> = {
    xs: '10px',
    sm: '12px',
    base: '14px',
    lg: '16px',
    xl: '18px',
    '2xl': '20px',
    '3xl': '24px',
    '4xl': '28px',
    '5xl': '32px',
    '6xl': '36px',
    '7xl': '48px',
    '8xl': '60px',
    '9xl': '72px'
  };

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
    
    // Enhanced campaign with proper settings propagation and custom elements
    const enhancedCampaign = {
      ...campaign,
      design: {
        ...campaign.design,
        // Ensure custom elements are included for funnel rendering
        customImages: customImages,
        customTexts: customTexts,
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
          buttonConfig: enhancedCampaign.buttonConfig,
          customImages: customImages,
          customTexts: customTexts
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
        
        {/* Custom Images for desktop/tablet - render with exact same logic as editor */}
        {customImages.map((customImage: any, idx: number) => {
          if (!customImage?.src) return null;

          const deviceConfig = getElementDeviceConfig(customImage);

          return (
            <div
              key={`preview-image-${customImage.id}-${previewDevice}`}
              style={{
                position: 'absolute',
                transform: `translate3d(${deviceConfig.x}px, ${deviceConfig.y}px, 0) rotate(${customImage.rotation || 0}deg)`,
                width: deviceConfig.width,
                height: deviceConfig.height,
                zIndex: customImage.zIndex ?? 20 + idx,
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

        {/* Custom Texts for desktop/tablet - render with exact same logic as editor */}
        {customTexts.map((customText: any, idx: number) => {
          if (!customText?.enabled) return null;

          const deviceConfig = getElementDeviceConfig(customText);

          return (
            <div
              key={`preview-text-${customText.id}-${previewDevice}`}
              style={{
                position: 'absolute',
                transform: `translate3d(${deviceConfig.x}px, ${deviceConfig.y}px, 0)`,
                color: customText.color || '#000000',
                fontFamily: customText.fontFamily || 'Inter, sans-serif',
                fontSize: sizeMap[customText.size || 'base'] || '14px',
                fontWeight: customText.bold ? 'bold' : 'normal',
                fontStyle: customText.italic ? 'italic' : 'normal',
                textDecoration: customText.underline ? 'underline' : 'none',
                zIndex: customText.zIndex ?? 20 + idx,
                pointerEvents: 'none',
                ...(customText.showFrame
                  ? {
                      backgroundColor: customText.frameColor || '#ffffff',
                      border: `1px solid ${customText.frameBorderColor || '#e5e7eb'}`,
                      padding: '4px 8px',
                      borderRadius: '4px'
                    }
                  : {})
              }}
            >
              {customText.text}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CampaignPreview;
