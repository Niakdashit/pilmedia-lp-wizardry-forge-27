
import React from 'react';
import GameCanvasPreview from '../GameCanvasPreview';
import MobileWheelPreview from '../../GameTypes/MobileWheelPreview';

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
          width: '280px',
          height: '500px',
          borderRadius: '20px',
          border: '6px solid #1f1f1f',
          boxShadow: '0 0 20px rgba(0,0,0,0.3)',
          backgroundColor: '#000'
        };
      case 'tablet':
        return {
          width: '340px',
          height: '480px',
          borderRadius: '14px',
          border: '4px solid #333',
          boxShadow: '0 0 15px rgba(0,0,0,0.2)',
          backgroundColor: '#000'
        };
    }
  };

  const getScreenStyle = () => {
    const baseStyle = {
      width: '100%',
      height: '100%',
      borderRadius: previewMode === 'mobile' ? '14px' : '10px',
      overflow: 'hidden',
      position: 'relative' as const,
    };

    // UNIQUEMENT les images mobiles - pas les images du contenu/desktop
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
      backgroundColor: mobileConfig.backgroundColor || '#ebf4f7', // Couleur mobile spécifique
    };
  };

  const getGamePositionStyles = () => {
    const gamePosition = mobileConfig.gamePosition || 'center';
    
    switch (gamePosition) {
      case 'top':
        return {
          justifyContent: 'flex-start',
          paddingTop: '10%'
        };
      case 'bottom':
        return {
          justifyContent: 'flex-end',
          paddingBottom: '15%'
        };
      default:
        return {
          justifyContent: 'center'
        };
    }
  };

  const getGameContainerStyle = () => {
    const maxWidth = mobileConfig.fullscreenGame ? '100%' : `${mobileConfig.gameMaxWidth || 85}%`;
    const maxHeight = mobileConfig.fullscreenGame ? '100%' : `${mobileConfig.gameMaxHeight || 50}vh`;
    
    return {
      maxWidth,
      maxHeight,
      width: '100%',
      minHeight: '200px',
      padding: `${mobileConfig.gamePaddingY || 8}px ${mobileConfig.gamePaddingX || 8}px`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };
  };

  const showTitle = mobileConfig.showTitle !== false && (mobileConfig.title || campaign.name);
  const showDescription = mobileConfig.showDescription !== false && (mobileConfig.description || campaign.description);

  // Fonction pour rendre le bon composant de jeu - MOBILE UNIQUEMENT
  const renderGameComponent = () => {
    if (campaign.type === 'wheel') {
      // Utilise UNIQUEMENT la configuration mobile de la roue
      const hasMobileRouletteConfig = mobileConfig.roulette && mobileConfig.roulette.segments && mobileConfig.roulette.segments.length > 0;
      
      if (hasMobileRouletteConfig) {
        return <MobileWheelPreview campaign={campaign} />;
      } else {
        // Si pas de config mobile de roue, afficher un placeholder
        return (
          <div className="flex items-center justify-center h-full w-full bg-gray-100 rounded-lg">
            <p className="text-gray-500 text-sm text-center px-4">
              Configurez la roue dans l'onglet "Game Placement" pour voir l'aperçu mobile
            </p>
          </div>
        );
      }
    }
    
    // Pour les autres jeux, créer un aperçu mobile simplifié sans les images du contenu
    return (
      <div className="flex items-center justify-center h-full w-full bg-white rounded-lg border-2 border-gray-200">
        <div className="text-center p-4">
          <div className="w-16 h-16 bg-[#841b60] rounded-lg mx-auto mb-3 flex items-center justify-center">
            <span className="text-white text-2xl">🎮</span>
          </div>
          <p className="text-gray-600 text-sm">
            Aperçu {campaign.type} mobile
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-sm font-medium text-gray-600 capitalize">
        {previewMode} Preview
      </div>
      
      <div style={getDeviceStyle()}>
        <div style={getScreenStyle()}>
          {/* Logo Overlay MOBILE */}
          {mobileConfig.logoOverlay && (
            <div 
              className={`absolute z-10 w-12 h-12 ${
                mobileConfig.logoPosition === 'top-left' ? 'top-3 left-3' :
                mobileConfig.logoPosition === 'top-center' ? 'top-3 left-1/2 transform -translate-x-1/2' :
                mobileConfig.logoPosition === 'top-right' ? 'top-3 right-3' :
                mobileConfig.logoPosition === 'center' ? 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' :
                mobileConfig.logoPosition === 'bottom-left' ? 'bottom-3 left-3' :
                'bottom-3 right-3'
              }`}
            >
              <img 
                src={mobileConfig.logoOverlay} 
                alt="Logo" 
                className="w-full h-full object-contain"
              />
            </div>
          )}

          {/* Decorative Overlay MOBILE */}
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
              padding: `${mobileConfig.verticalSpacing || 16}px ${mobileConfig.horizontalPadding || 12}px`,
              gap: `${mobileConfig.verticalSpacing || 16}px`
            }}
          >
            {/* Title & Description Block */}
            {(showTitle || showDescription) && (
              <div className="text-center space-y-2 flex-shrink-0">
                {showTitle && (
                  <h2 
                    className={`${mobileConfig.titleSize || 'text-lg'} ${mobileConfig.titleWeight || 'font-bold'} ${mobileConfig.titleAlignment || 'text-center'}`}
                    style={{ 
                      color: mobileConfig.titleColor || '#000000',
                      fontFamily: mobileConfig.fontFamily || 'Inter'
                    }}
                  >
                    {mobileConfig.title || campaign.name}
                  </h2>
                )}
                {showDescription && (
                  <p 
                    className={`${mobileConfig.descriptionSize || 'text-sm'} ${mobileConfig.descriptionAlignment || 'text-center'}`}
                    style={{ 
                      color: mobileConfig.descriptionColor || '#666666',
                      fontFamily: mobileConfig.fontFamily || 'Inter'
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
                {renderGameComponent()}
              </div>
            </div>

            {/* Mobile Button */}
            {mobileConfig.buttonText && (
              <button
                className={`${mobileConfig.buttonShape || 'rounded-lg'} ${mobileConfig.buttonShadow || 'shadow-md'} transition-colors px-4 py-2 text-white font-medium flex-shrink-0`}
                style={{
                  backgroundColor: mobileConfig.buttonColor || '#841b60',
                  color: mobileConfig.buttonTextColor || '#ffffff',
                  width: `${mobileConfig.buttonWidth || 80}%`,
                  margin: '0 auto',
                  fontSize: '14px'
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
