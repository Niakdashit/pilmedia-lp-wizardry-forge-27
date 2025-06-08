
import React, { useEffect, useState } from 'react';
import MobileWheelPreview from '../../GameTypes/MobileWheelPreview';
import MobileButton from './MobileButton';
import MobileContent from './MobileContent';
import MobileOverlays from './MobileOverlays';
import { getDeviceStyle, getScreenStyle, getContentLayoutStyle } from './styles';

interface MobilePreviewProps {
  campaign: any;
  previewMode: 'mobile' | 'tablet';
}

const MobilePreview: React.FC<MobilePreviewProps> = ({
  campaign,
  previewMode
}) => {
  const fallbackMobile = campaign.config?.mobileConfig || {};
  const mobileConfig = { ...fallbackMobile, ...(campaign.mobileConfig || {}) };
  const gamePosition = mobileConfig.gamePosition || 'left';
  const verticalOffset = mobileConfig.gameVerticalOffset || 0;
  const horizontalOffset = mobileConfig.gameHorizontalOffset || 0;

  const bgImage =
    mobileConfig.backgroundImage || campaign.design?.mobileBackgroundImage;
  const [imageDims, setImageDims] = useState({ width: 1080, height: 1920 });

  useEffect(() => {
    if (!bgImage) {
      setImageDims({ width: 1080, height: 1920 });
      return;
    }
    const img = new Image();
    img.onload = () => {
      setImageDims({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.src = bgImage;
  }, [bgImage]);

  const deviceStyle = getDeviceStyle(imageDims);
  const screenStyle = getScreenStyle(mobileConfig, imageDims);
  const contentLayoutStyle = getContentLayoutStyle(mobileConfig);

  // Get custom images and texts for mobile with proper fallback
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

  // Helper function to get mobile-specific config for elements
  const getElementMobileConfig = (element: any) => {
    const mobileConfig = element.deviceConfig?.mobile;
    return {
      x: mobileConfig?.x ?? element.x ?? 0,
      y: mobileConfig?.y ?? element.y ?? 0,
      width: mobileConfig?.width ?? element.width ?? 100,
      height: mobileConfig?.height ?? element.height ?? 100
    };
  };

  return (
    <div style={deviceStyle} key={`mobile-preview-${campaign.gameSize}-${JSON.stringify(mobileConfig)}-${JSON.stringify(customTexts)}-${JSON.stringify(customImages)}`}>
      <div style={screenStyle}>
        <MobileOverlays mobileConfig={mobileConfig} previewMode={previewMode} />

        {/* Game Container */}
        {campaign.type === 'wheel' && (
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 10,
              pointerEvents: 'none',
              overflow: 'visible'
            }}
          >
            <MobileWheelPreview
              campaign={campaign}
              gamePosition={gamePosition}
              verticalOffset={verticalOffset}
              horizontalOffset={horizontalOffset}
            />
          </div>
        )}

        {/* Custom Images Layer - render with exact same logic as desktop */}
        {customImages.map((customImage: any, idx: number) => {
          if (!customImage?.src || customImage.enabled === false) return null;
          
          const mobileConfig = getElementMobileConfig(customImage);
          
          return (
            <div
              key={`mobile-image-${customImage.id}-${previewMode}`}
              style={{
                position: 'absolute',
                transform: `translate3d(${mobileConfig.x}px, ${mobileConfig.y}px, 0) rotate(${customImage.rotation || 0}deg)`,
                width: mobileConfig.width,
                height: mobileConfig.height,
                zIndex: customImage.zIndex ?? 15 + idx,
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

        {/* Custom Texts Layer - render with exact same logic as desktop */}
        {customTexts.map((customText: any, idx: number) => {
          if (!customText?.enabled) return null;

          const mobileCfg = getElementMobileConfig(customText);

          return (
            <div
              key={`mobile-text-${customText.id}-${previewMode}`}
              style={{
                position: 'absolute',
                transform: `translate3d(${mobileCfg.x}px, ${mobileCfg.y}px, 0)`,
                color: customText.color || '#000000',
                fontFamily: customText.fontFamily || 'Inter, sans-serif',
                fontSize: sizeMap[customText.size || 'base'] || '14px',
                fontWeight: customText.bold ? 'bold' : 'normal',
                fontStyle: customText.italic ? 'italic' : 'normal',
                textDecoration: customText.underline ? 'underline' : 'none',
                zIndex: customText.zIndex ?? 15 + idx,
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

        {/* Content Layer */}
        <div style={contentLayoutStyle}>
          <MobileContent 
            mobileConfig={mobileConfig} 
            campaign={campaign} 
            previewMode={previewMode} 
          />
        </div>

        {/* Button Layer - only show if not hidden */}
        {!mobileConfig.hideLaunchButton && (
          <MobileButton mobileConfig={mobileConfig} campaign={campaign} />
        )}
      </div>
    </div>
  );
};

export default MobilePreview;
