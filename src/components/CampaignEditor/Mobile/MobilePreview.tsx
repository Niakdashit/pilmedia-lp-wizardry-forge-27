
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
          position: 'relative' as const
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
          position: 'relative' as const
        };
    }
  };

  const getScreenStyle = () => {
    const backgroundStyle: any = {
      width: '100%',
      height: '100%',
      borderRadius: '14px',
      overflow: 'hidden',
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

  const getContentLayoutStyle = () => {
    const gamePosition = mobileConfig.gamePosition || 'center';
    const textPosition = mobileConfig.textPosition || 'top';
    const verticalSpacing = mobileConfig.verticalSpacing || 20;

    // Configuration de l'ordre et justification selon les positions
    let flexDirection: 'column' | 'column-reverse' = 'column';
    let justifyContent = 'flex-start';

    if (gamePosition === 'top' && textPosition === 'bottom') {
      flexDirection = 'column';
      justifyContent = 'flex-start';
    } else if (gamePosition === 'bottom' && textPosition === 'top') {
      flexDirection = 'column-reverse';
      justifyContent = 'flex-start';
    } else if (gamePosition === 'center') {
      justifyContent = 'center';
    }

    return {
      display: 'flex',
      flexDirection,
      justifyContent,
      alignItems: 'center',
      height: '100%',
      gap: `${verticalSpacing}px`,
      padding: `${mobileConfig.horizontalPadding || 16}px`,
      overflowY: 'auto' as const,
      position: 'relative' as const,
      zIndex: 10
    };
  };

  const getTextBlockStyle = () => {
    const contrastBg = mobileConfig.contrastBackground || {};
    
    const baseStyle: any = {
      textAlign: 'center',
      maxWidth: '100%'
    };

    if (contrastBg.enabled) {
      baseStyle.backgroundColor = contrastBg.color || 'rgba(255, 255, 255, 0.9)';
      baseStyle.padding = `${contrastBg.padding || 16}px`;
      baseStyle.borderRadius = `${contrastBg.borderRadius || 8}px`;
      baseStyle.backdropFilter = 'blur(8px)';
      baseStyle.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    }

    return baseStyle;
  };

  const getGameContainerStyle = () => {
    const contrastBg = mobileConfig.contrastBackground || {};
    
    const baseStyle: any = {
      width: '100%',
      maxWidth: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    };

    if (contrastBg.enabled && contrastBg.applyToGame) {
      baseStyle.backgroundColor = contrastBg.color || 'rgba(255, 255, 255, 0.9)';
      baseStyle.padding = `${contrastBg.padding || 16}px`;
      baseStyle.borderRadius = `${contrastBg.borderRadius || 8}px`;
      baseStyle.backdropFilter = 'blur(8px)';
      baseStyle.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    }

    return baseStyle;
  };

  const getFunnelComponent = () => {
    const sharedProps = {
      campaign,
      modalContained: true,
      mobileConfig
    };

    if (['wheel', 'scratch', 'jackpot', 'dice'].includes(campaign.type)) {
      return <FunnelUnlockedGame {...sharedProps} />;
    }
    return <FunnelStandard {...sharedProps} />;
  };

  // Déterminer l'ordre des éléments selon les positions configurées
  const renderOrderedContent = () => {
    const gamePosition = mobileConfig.gamePosition || 'center';
    const textPosition = mobileConfig.textPosition || 'top';
    
    const textBlock = (
      <div style={getTextBlockStyle()}>
        <h2 
          className="text-2xl font-bold mb-4"
          style={{ 
            color: mobileConfig.titleColor || '#000000',
            fontSize: mobileConfig.titleSize === 'text-xl' ? '1.25rem' : 
                     mobileConfig.titleSize === 'text-3xl' ? '1.875rem' : '1.5rem'
          }}
        >
          {mobileConfig.title || campaign.screens[0]?.title || 'Tentez votre chance !'}
        </h2>
        <p 
          style={{ 
            color: mobileConfig.descriptionColor || '#666666',
            fontSize: mobileConfig.descriptionSize === 'text-sm' ? '0.875rem' : 
                     mobileConfig.descriptionSize === 'text-lg' ? '1.125rem' : '1rem'
          }}
        >
          {mobileConfig.description || campaign.screens[0]?.description || 'Participez pour avoir une chance de gagner !'}
        </p>
      </div>
    );

    const gameBlock = (
      <div style={getGameContainerStyle()}>
        {getFunnelComponent()}
      </div>
    );

    // Retourner les éléments dans l'ordre selon la configuration
    if (textPosition === 'top' && gamePosition !== 'top') {
      return [textBlock, gameBlock];
    } else if (textPosition === 'bottom' && gamePosition !== 'bottom') {
      return [gameBlock, textBlock];
    } else if (gamePosition === 'top') {
      return [gameBlock, textBlock];
    } else {
      return [textBlock, gameBlock];
    }
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

        {/* Main Content with Dynamic Layout */}
        <div style={getContentLayoutStyle()}>
          {renderOrderedContent().map((element, index) => (
            <React.Fragment key={index}>{element}</React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobilePreview;
