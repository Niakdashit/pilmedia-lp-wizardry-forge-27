import React from 'react';
import FunnelUnlockedGame from '../../funnels/FunnelUnlockedGame';

interface MobilePreviewProps {
  campaign: any;
  previewMode: 'mobile' | 'tablet';
}

const MobilePreview: React.FC<MobilePreviewProps> = ({ campaign, previewMode }) => {
  const mobileConfig = campaign.mobileConfig || {};

  // Configuration responsive
  const deviceWidth = previewMode === 'mobile' ? 375 : 768;
  const deviceHeight = previewMode === 'mobile' ? 667 : 1024;

  // Styles de base pour le device
  const deviceStyle = {
    width: `${Math.min(deviceWidth * 0.5, 300)}px`,
    height: `${Math.min(deviceHeight * 0.5, 500)}px`,
    backgroundColor: mobileConfig.backgroundColor || campaign.design?.background || '#ebf4f7',
    backgroundImage: mobileConfig.backgroundImage ? `url(${mobileConfig.backgroundImage})` : 'none',
    backgroundSize: mobileConfig.backgroundMode === 'cover' ? 'cover' : 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    borderRadius: '24px',
    border: '8px solid #000',
    overflow: 'hidden',
    position: 'relative' as const,
    fontFamily: mobileConfig.fontFamily || 'Inter',
  };

  return (
    <div className="flex justify-center">
      <div style={deviceStyle}>
        {/* Logo overlay */}
        {mobileConfig.logoOverlay && (
          <img
            src={mobileConfig.logoOverlay}
            alt="Logo"
            style={{
              position: 'absolute',
              top: mobileConfig.logoPosition === 'top-left' ? '16px' :
                   mobileConfig.logoPosition === 'top-right' ? '16px' : '16px',
              left: mobileConfig.logoPosition === 'top-left' ? '16px' : 'auto',
              right: mobileConfig.logoPosition === 'top-right' ? '16px' : 'auto',
              width: '60px',
              height: 'auto',
              zIndex: 10,
            }}
          />
        )}

        {/* Decorative overlay */}
        {mobileConfig.decorativeOverlay && (
          <img
            src={mobileConfig.decorativeOverlay}
            alt="Decoration"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 1,
              pointerEvents: 'none',
            }}
          />
        )}

        {/* Funnel principal */}
        <div
          style={{
            height: '100%',
            width: '100%',
            zIndex: 2,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <FunnelUnlockedGame campaign={campaign} previewMode={previewMode} />
        </div>
      </div>
    </div>
  );
};

export default MobilePreview;
