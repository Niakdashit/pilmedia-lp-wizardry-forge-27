
import React from 'react';
import FunnelUnlockedGame from '../../funnels/FunnelUnlockedGame';
import FunnelStandard from '../../funnels/FunnelStandard';

interface MobilePreviewProps {
  campaign: any;
  previewMode: 'mobile' | 'tablet';
}

const MobilePreview: React.FC<MobilePreviewProps> = ({
  campaign,
  previewMode
}) => {
  const mobileConfig = campaign.mobileConfig || {};

  const getDeviceStyle = () => {
    switch (previewMode) {
      case 'mobile':
        return {
          width: '280px',
          height: '600px',
          borderRadius: '20px',
          border: '6px solid #1f1f1f',
          boxShadow: '0 0 20px rgba(0,0,0,0.3)',
          backgroundColor: '#000',
          display: 'flex',
          flexDirection: 'column' as const,
          overflow: 'hidden',
          position: 'relative' as const // Ajout pour le positionnement de la modale
        };
      case 'tablet':
        return {
          width: '340px',
          height: '650px',
          borderRadius: '14px',
          border: '4px solid #333',
          boxShadow: '0 0 15px rgba(0,0,0,0.2)',
          backgroundColor: '#000',
          display: 'flex',
          flexDirection: 'column' as const,
          overflow: 'hidden',
          position: 'relative' as const // Ajout pour le positionnement de la modale
        };
    }
  };

  const getScreenStyle = () => {
    const backgroundStyle: any = {
      width: '100%',
      height: '100%',
      borderRadius: '14px',
      overflow: 'hidden', // Changé de 'auto' à 'hidden' pour contenir la modale
      position: 'relative',
      backgroundColor: mobileConfig.backgroundColor || '#ebf4f7',
      display: 'flex',
      flexDirection: 'column' as const,
      fontFamily: mobileConfig.fontFamily || 'Inter'
    };

    if (mobileConfig.backgroundImage) {
      backgroundStyle.backgroundImage = `url(${mobileConfig.backgroundImage})`;
      backgroundStyle.backgroundSize = mobileConfig.backgroundMode === 'contain' ? 'contain' : 'cover';
      backgroundStyle.backgroundPosition = 'center';
      backgroundStyle.backgroundRepeat = 'no-repeat';
    }

    return backgroundStyle;
  };

  const getFunnelComponent = () => {
    const sharedProps = {
      campaign,
      modalContained: true // Nouvelle prop pour indiquer que les modales doivent être contenues
    };

    if (['wheel', 'scratch', 'jackpot', 'dice'].includes(campaign.type)) {
      return <FunnelUnlockedGame {...sharedProps} />;
    }
    return <FunnelStandard {...sharedProps} />;
  };

  return (
    <div style={getDeviceStyle()}>
      <div style={getScreenStyle()}>
        {/* Logo Overlay */}
        {mobileConfig.logoOverlay && (
          <div 
            className={`absolute ${
              mobileConfig.logoPosition === 'top-left' ? 'top-4 left-4' :
              mobileConfig.logoPosition === 'top-center' ? 'top-4 left-1/2 transform -translate-x-1/2' :
              mobileConfig.logoPosition === 'top-right' ? 'top-4 right-4' :
              mobileConfig.logoPosition === 'center' ? 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' :
              mobileConfig.logoPosition === 'bottom-left' ? 'bottom-4 left-4' : 'bottom-4 right-4'
            }`}
            style={{ zIndex: 20 }}
          >
            <img src={mobileConfig.logoOverlay} alt="Logo" className="w-16 h-16 object-contain" />
          </div>
        )}

        {/* Decorative Overlay */}
        {mobileConfig.decorativeOverlay && (
          <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 2 }}>
            <img 
              src={mobileConfig.decorativeOverlay} 
              alt="Decorative overlay" 
              className="w-full h-full object-contain" 
            />
          </div>
        )}

        {/* Main Content with Funnel - Scrollable with proper overflow */}
        <div 
          style={{
            padding: `${mobileConfig.horizontalPadding || 16}px`,
            overflowY: 'auto',
            overflowX: 'hidden',
            height: '100%'
          }} 
          className="flex-1 relative z-1"
        >
          <div style={{
            minHeight: '100%',
            paddingBottom: '20px'
          }}>
            {getFunnelComponent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobilePreview;
