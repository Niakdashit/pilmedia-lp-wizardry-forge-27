
import React from 'react';
import GameCanvasPreview from '../GameCanvasPreview';

interface MobilePreviewProps {
  campaign: any;
  previewMode: 'mobile' | 'tablet' | 'desktop';
}

const MobilePreview: React.FC<MobilePreviewProps> = ({ campaign, previewMode }) => {
  const mobileConfig = campaign.mobileConfig || {};

  const getDeviceStyle = () => {
    switch (previewMode) {
      case 'mobile':
        return {
          width: '320px',
          height: '568px',
          borderRadius: '24px',
          border: '8px solid #1f1f1f',
          boxShadow: '0 0 20px rgba(0,0,0,0.3)',
          backgroundColor: '#000'
        };
      case 'tablet':
        return {
          width: '400px',
          height: '600px',
          borderRadius: '16px',
          border: '4px solid #333',
          boxShadow: '0 0 15px rgba(0,0,0,0.2)',
          backgroundColor: '#000'
        };
      case 'desktop':
        return {
          width: '100%',
          height: '500px',
          borderRadius: '8px',
          border: '2px solid #ddd',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          backgroundColor: '#fff'
        };
    }
  };

  const getScreenStyle = () => {
    const baseStyle = {
      width: '100%',
      height: '100%',
      borderRadius: previewMode === 'mobile' ? '16px' : previewMode === 'tablet' ? '12px' : '6px',
      overflow: 'hidden',
      position: 'relative' as const,
    };

    // Apply mobile-specific background
    if (previewMode === 'mobile' && mobileConfig.backgroundImage) {
      return {
        ...baseStyle,
        backgroundImage: `url(${mobileConfig.backgroundImage})`,
        backgroundSize: mobileConfig.backgroundMode === 'contain' ? 'contain' : 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: mobileConfig.backgroundColor || '#ebf4f7',
      };
    }

    return {
      ...baseStyle,
      backgroundColor: mobileConfig.backgroundColor || campaign.design?.background || '#ebf4f7',
    };
  };

  const getContentLayout = () => {
    if (previewMode !== 'mobile') {
      return 'flex flex-col justify-center items-center h-full p-4';
    }

    // Mobile-specific layout based on configuration
    const gamePosition = mobileConfig.gamePosition || 'center';
    const textPosition = mobileConfig.textPosition || 'top';
    const buttonPosition = mobileConfig.buttonPosition || 'below';

    let flexDirection = 'flex-col';
    let justifyContent = 'center';
    let alignItems = 'center';

    switch (gamePosition) {
      case 'top':
        justifyContent = 'flex-start';
        break;
      case 'bottom':
        justifyContent = 'flex-end';
        break;
      default:
        justifyContent = 'center';
    }

    return `flex ${flexDirection} justify-${justifyContent} items-${alignItems} h-full p-${mobileConfig.horizontalPadding || 4} gap-${mobileConfig.verticalSpacing || 4}`;
  };

  const getMobileTextStyle = () => {
    if (previewMode !== 'mobile') return {};

    return {
      fontFamily: mobileConfig.fontFamily || 'Inter',
      color: mobileConfig.titleColor || '#000000',
      fontSize: mobileConfig.titleSize || 'text-2xl',
      fontWeight: mobileConfig.titleWeight || 'font-bold',
      textAlign: mobileConfig.titleAlignment || 'text-center',
    };
  };

  const getGameContainerStyle = () => {
    if (previewMode !== 'mobile') return {};

    return {
      maxWidth: mobileConfig.fullscreenGame ? '100%' : `${mobileConfig.gameMaxWidth || 90}%`,
      maxHeight: mobileConfig.fullscreenGame ? '100%' : `${mobileConfig.gameMaxHeight || 60}vh`,
      padding: `${mobileConfig.gamePaddingY || 16}px ${mobileConfig.gamePaddingX || 16}px`,
    };
  };

  // Create enhanced campaign object with mobile config
  const enhancedCampaign = {
    ...campaign,
    name: previewMode === 'mobile' && mobileConfig.title ? mobileConfig.title : campaign.name,
    description: previewMode === 'mobile' && mobileConfig.description ? mobileConfig.description : campaign.description,
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-sm font-medium text-gray-600 capitalize">
        {previewMode} Preview
      </div>
      
      <div style={getDeviceStyle()}>
        <div style={getScreenStyle()}>
          {/* Logo Overlay (Mobile only) */}
          {previewMode === 'mobile' && mobileConfig.logoOverlay && (
            <div 
              className={`absolute z-10 w-16 h-16 ${
                mobileConfig.logoPosition === 'top-left' ? 'top-4 left-4' :
                mobileConfig.logoPosition === 'top-center' ? 'top-4 left-1/2 transform -translate-x-1/2' :
                mobileConfig.logoPosition === 'top-right' ? 'top-4 right-4' :
                mobileConfig.logoPosition === 'center' ? 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' :
                mobileConfig.logoPosition === 'bottom-left' ? 'bottom-4 left-4' :
                'bottom-4 right-4'
              }`}
            >
              <img 
                src={mobileConfig.logoOverlay} 
                alt="Logo" 
                className="w-full h-full object-contain"
              />
            </div>
          )}

          {/* Decorative Overlay (Mobile only) */}
          {previewMode === 'mobile' && mobileConfig.decorativeOverlay && (
            <div className="absolute inset-0 z-5 pointer-events-none">
              <img 
                src={mobileConfig.decorativeOverlay} 
                alt="Decorative overlay" 
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Main Content */}
          <div className={getContentLayout()}>
            {/* Title & Description */}
            {(enhancedCampaign.name || enhancedCampaign.description) && (
              <div className="text-center space-y-2 z-20 relative">
                {enhancedCampaign.name && (
                  <h2 
                    className={`${mobileConfig.titleSize || 'text-lg'} ${mobileConfig.titleWeight || 'font-bold'} ${mobileConfig.titleAlignment || 'text-center'}`}
                    style={{ 
                      color: mobileConfig.titleColor || '#000000',
                      fontFamily: mobileConfig.fontFamily || 'Inter'
                    }}
                  >
                    {enhancedCampaign.name}
                  </h2>
                )}
                {enhancedCampaign.description && (
                  <p 
                    className={`${mobileConfig.descriptionSize || 'text-sm'} ${mobileConfig.descriptionAlignment || 'text-center'}`}
                    style={{ 
                      color: mobileConfig.descriptionColor || '#666666',
                      fontFamily: mobileConfig.fontFamily || 'Inter'
                    }}
                  >
                    {enhancedCampaign.description}
                  </p>
                )}
              </div>
            )}

            {/* Game Container */}
            <div style={getGameContainerStyle()} className="z-20 relative">
              <GameCanvasPreview campaign={enhancedCampaign} className="w-full h-full" />
            </div>

            {/* Mobile Button (if configured) */}
            {previewMode === 'mobile' && mobileConfig.buttonText && (
              <button
                className={`${mobileConfig.buttonShape || 'rounded-lg'} ${mobileConfig.buttonShadow || 'shadow-md'} transition-colors px-6 py-3 text-white font-medium z-20 relative`}
                style={{
                  backgroundColor: mobileConfig.buttonColor || '#841b60',
                  color: mobileConfig.buttonTextColor || '#ffffff',
                  width: `${mobileConfig.buttonWidth || 80}%`,
                  margin: `${mobileConfig.buttonMargin || 16}px 0`,
                }}
              >
                {mobileConfig.buttonText}
              </button>
            )}
          </div>

          {/* Custom Mobile Template Overlay */}
          {previewMode === 'mobile' && mobileConfig.customTemplate && (
            <div className="absolute inset-0 z-30 pointer-events-none">
              <img 
                src={mobileConfig.customTemplate} 
                alt="Mobile template" 
                className="w-full h-full object-contain"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobilePreview;
