
import React from 'react';
import GameCanvasPreview from '../GameCanvasPreview';

interface MobilePreviewProps {
  campaign: any;
  previewMode: 'mobile' | 'tablet';
}

const MobilePreview: React.FC<MobilePreviewProps> = ({ campaign, previewMode }) => {
  const mobileConfig = campaign.mobileConfig || {};

  const getDeviceStyle = () => {
    switch (previewMode) {
      case 'mobile':
        return {
          width: '240px',
          height: '420px',
          borderRadius: '20px',
          border: '4px solid #1f1f1f',
          boxShadow: '0 0 15px rgba(0,0,0,0.3)',
          backgroundColor: '#000'
        };
      case 'tablet':
        return {
          width: '280px',
          height: '380px',
          borderRadius: '14px',
          border: '3px solid #333',
          boxShadow: '0 0 12px rgba(0,0,0,0.2)',
          backgroundColor: '#000'
        };
    }
  };

  const getScreenStyle = () => {
    const baseStyle = {
      width: '100%',
      height: '100%',
      borderRadius: previewMode === 'mobile' ? '16px' : '11px',
      overflow: 'hidden',
      position: 'relative' as const,
    };

    if (mobileConfig.backgroundImage) {
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

  const getGamePositionStyles = () => {
    const gamePosition = mobileConfig.gamePosition || 'center';
    
    switch (gamePosition) {
      case 'top':
        return {
          justifyContent: 'flex-start',
          paddingTop: '8%'
        };
      case 'bottom':
        return {
          justifyContent: 'flex-end',
          paddingBottom: '12%'
        };
      default:
        return {
          justifyContent: 'center'
        };
    }
  };

  const getGameContainerStyle = () => {
    const maxWidth = mobileConfig.fullscreenGame ? '100%' : `${mobileConfig.gameMaxWidth || 85}%`;
    const maxHeight = mobileConfig.fullscreenGame ? '100%' : `${Math.min(mobileConfig.gameMaxHeight || 50, 60)}%`;
    
    return {
      maxWidth,
      maxHeight,
      width: '100%',
      minHeight: '120px',
      padding: `${Math.min(mobileConfig.gamePaddingY || 4, 8)}px ${Math.min(mobileConfig.gamePaddingX || 4, 8)}px`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };
  };

  const showTitle = mobileConfig.showTitle !== false && (mobileConfig.title || campaign.name);
  const showDescription = mobileConfig.showDescription !== false && (mobileConfig.description || campaign.description);

  return (
    <div className="flex flex-col items-center space-y-3">
      <div className="text-xs font-medium text-gray-600 capitalize">
        {previewMode} Preview
      </div>
      
      <div style={getDeviceStyle()}>
        <div style={getScreenStyle()}>
          {/* Logo Overlay */}
          {mobileConfig.logoOverlay && (
            <div 
              className={`absolute z-10 w-8 h-8 ${
                mobileConfig.logoPosition === 'top-left' ? 'top-2 left-2' :
                mobileConfig.logoPosition === 'top-center' ? 'top-2 left-1/2 transform -translate-x-1/2' :
                mobileConfig.logoPosition === 'top-right' ? 'top-2 right-2' :
                mobileConfig.logoPosition === 'center' ? 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' :
                mobileConfig.logoPosition === 'bottom-left' ? 'bottom-2 left-2' :
                'bottom-2 right-2'
              }`}
            >
              <img 
                src={mobileConfig.logoOverlay} 
                alt="Logo" 
                className="w-full h-full object-contain"
              />
            </div>
          )}

          {/* Decorative Overlay */}
          {mobileConfig.decorativeOverlay && (
            <div className="absolute inset-0 z-5 pointer-events-none">
              <img 
                src={mobileConfig.decorativeOverlay} 
                alt="Decorative overlay" 
                className="w-full h-full object-cover opacity-80"
              />
            </div>
          )}

          {/* Main Content Container */}
          <div 
            className="flex flex-col h-full relative z-20"
            style={{
              ...getGamePositionStyles(),
              padding: `${Math.min(mobileConfig.verticalSpacing || 12, 16)}px ${Math.min(mobileConfig.horizontalPadding || 8, 12)}px`,
              gap: `${Math.min(mobileConfig.verticalSpacing || 12, 16)}px`
            }}
          >
            {/* Title & Description Block */}
            {(showTitle || showDescription) && (
              <div className="text-center space-y-1 flex-shrink-0">
                {showTitle && (
                  <h2 
                    className={`text-sm font-bold text-center`}
                    style={{ 
                      color: mobileConfig.titleColor || '#000000',
                      fontFamily: mobileConfig.fontFamily || 'Inter',
                      fontSize: 'clamp(12px, 3vw, 14px)'
                    }}
                  >
                    {mobileConfig.title || campaign.name}
                  </h2>
                )}
                {showDescription && (
                  <p 
                    className={`text-xs text-center`}
                    style={{ 
                      color: mobileConfig.descriptionColor || '#666666',
                      fontFamily: mobileConfig.fontFamily || 'Inter',
                      fontSize: 'clamp(10px, 2.5vw, 12px)'
                    }}
                  >
                    {mobileConfig.description || campaign.description}
                  </p>
                )}
              </div>
            )}

            {/* Game Container */}
            <div style={getGameContainerStyle()} className="flex-grow flex items-center justify-center">
              <div className="w-full h-full max-w-full max-h-full overflow-hidden">
                <GameCanvasPreview campaign={campaign} className="w-full h-full" />
              </div>
            </div>

            {/* Mobile Button */}
            {mobileConfig.buttonText && (
              <button
                className={`${mobileConfig.buttonShape || 'rounded-lg'} ${mobileConfig.buttonShadow || 'shadow-md'} transition-colors px-3 py-2 text-white font-medium flex-shrink-0`}
                style={{
                  backgroundColor: mobileConfig.buttonColor || '#841b60',
                  color: mobileConfig.buttonTextColor || '#ffffff',
                  width: `${Math.min(mobileConfig.buttonWidth || 80, 90)}%`,
                  margin: '0 auto',
                  fontSize: 'clamp(10px, 2.5vw, 12px)'
                }}
              >
                {mobileConfig.buttonText}
              </button>
            )}
          </div>

          {/* Custom Mobile Template Overlay */}
          {mobileConfig.customTemplate && (
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
