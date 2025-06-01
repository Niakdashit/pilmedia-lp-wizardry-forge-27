
import React from 'react';
import ContrastBackground from '../../common/ContrastBackground';
import MobileWheelPreview from '../../GameTypes/MobileWheelPreview';

interface MobilePreviewProps {
  campaign: any;
  previewMode: 'mobile' | 'tablet';
}

const DEVICE_SPECS = {
  mobile: { width: 320, height: 640, borderRadius: 24, border: '8px solid #1f1f1f', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' },
  tablet: { width: 380, height: 740, borderRadius: 20, border: '6px solid #333', boxShadow: '0 6px 24px rgba(0,0,0,0.25)' }
};

const MobilePreview: React.FC<MobilePreviewProps> = ({
  campaign,
  previewMode
}) => {
  const mobileConfig = campaign.mobileConfig || {};
  const specs = DEVICE_SPECS[previewMode];

  // Configuration du jeu mobile
  const mobileRouletteConfig = mobileConfig.roulette || {};
  const gameCanvasSize = mobileRouletteConfig.size || mobileRouletteConfig.width || 280;
  const gamePosition = mobileConfig.gamePosition || 'left';

  // Calcul de la largeur minimale du device en fonction de la position du jeu
  const getMinDeviceWidth = () => {
    if (gamePosition === 'left' || gamePosition === 'right') {
      // Pour gauche/droite, on garde la largeur normale car le jeu dépasse
      return specs.width;
    }
    // Pour les autres positions, on s'assure que le jeu rentre
    return Math.max(specs.width, gameCanvasSize + 40);
  };

  const deviceWidth = getMinDeviceWidth();

  // Style du device mockup
  const deviceStyle = {
    width: deviceWidth,
    height: specs.height,
    borderRadius: specs.borderRadius,
    border: specs.border,
    boxShadow: specs.boxShadow,
    backgroundColor: '#000',
    overflow: 'hidden',
    position: 'relative' as const,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    margin: '0 auto'
  };

  // Style de l'écran interne
  const screenStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    borderRadius: (previewMode === 'mobile' ? 16 : 16),
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: mobileConfig.backgroundColor || '#ebf4f7',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: mobileConfig.fontFamily || 'Inter'
  };

  if (mobileConfig.backgroundImage) {
    screenStyle.backgroundImage = `url(${mobileConfig.backgroundImage})`;
    screenStyle.backgroundSize = mobileConfig.backgroundMode === 'contain' ? 'contain' : 'cover';
    screenStyle.backgroundPosition = 'center';
    screenStyle.backgroundRepeat = 'no-repeat';
  }

  // Style du contenu adaptatif (sans le bouton)
  const getContentLayoutStyle = () => {
    const verticalSpacing = mobileConfig.verticalSpacing ?? 20;
    const horizontalPadding = Math.max(12, mobileConfig.horizontalPadding ?? 16);

    // Ajustement du padding selon la position du jeu
    let adjustedPadding = horizontalPadding;
    if (gamePosition === 'left') {
      adjustedPadding = Math.max(horizontalPadding, gameCanvasSize / 2 + 20);
    } else if (gamePosition === 'right') {
      adjustedPadding = Math.max(horizontalPadding, gameCanvasSize / 2 + 20);
    }

    return {
      display: 'flex',
      flexDirection: 'column' as const,
      justifyContent: gamePosition === 'top' ? 'flex-end' : 
                      gamePosition === 'bottom' ? 'flex-start' : 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
      gap: verticalSpacing,
      padding: gamePosition === 'left' ? `${verticalSpacing}px ${horizontalPadding}px ${verticalSpacing}px ${adjustedPadding}px` :
               gamePosition === 'right' ? `${verticalSpacing}px ${adjustedPadding}px ${verticalSpacing}px ${horizontalPadding}px` :
               gamePosition === 'top' ? `${Math.max(verticalSpacing, gameCanvasSize / 2 + 20)}px ${horizontalPadding}px ${verticalSpacing}px ${horizontalPadding}px` :
               gamePosition === 'bottom' ? `${verticalSpacing}px ${horizontalPadding}px ${Math.max(verticalSpacing, gameCanvasSize / 2 + 20)}px ${horizontalPadding}px` :
               `${verticalSpacing}px ${horizontalPadding}px`,
      overflowY: 'auto' as const,
      position: 'relative' as const,
      zIndex: 5,
      // Réserver de l'espace pour le bouton selon sa position
      paddingBottom: mobileConfig.buttonPlacement === 'bottom' ? '80px' : `${verticalSpacing}px`
    };
  };

  const getTextBlockStyle = () => ({
    textAlign: 'center' as const,
    width: '100%',
    maxWidth: '100%',
    flexShrink: 0,
    overflowWrap: 'break-word' as const
  });

  // Style du bouton avec positionnement absolu
  const getButtonAbsoluteStyle = () => {
    const buttonPlacement = mobileConfig.buttonPlacement || 'bottom';
    const horizontalPadding = Math.max(12, mobileConfig.horizontalPadding ?? 16);
    
    const baseStyle: React.CSSProperties = {
      position: 'absolute',
      zIndex: 50,
      left: horizontalPadding,
      right: horizontalPadding,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    };

    switch (buttonPlacement) {
      case 'top':
        return {
          ...baseStyle,
          top: '20px'
        };
      case 'center':
        return {
          ...baseStyle,
          top: '50%',
          transform: 'translateY(-50%)'
        };
      case 'bottom':
      default:
        return {
          ...baseStyle,
          bottom: '20px'
        };
    }
  };

  const renderContent = () => {
    const contrastBg = mobileConfig.contrastBackground || {};
    
    const textBlock = (mobileConfig.showTitle !== false || mobileConfig.showDescription !== false) ? (
      <div style={getTextBlockStyle()}>
        <ContrastBackground
          enabled={contrastBg.enabled}
          config={contrastBg}
          className="w-full"
        >
          {mobileConfig.showTitle !== false && (
            <h2
              className={`font-bold mb-3 ${mobileConfig.titleAlignment || 'text-center'}`}
              style={{
                color: mobileConfig.titleColor || '#000',
                fontSize: previewMode === 'mobile' ? '1.20rem' : '1.35rem',
                fontWeight: mobileConfig.titleWeight === 'font-normal' ? 'normal' :
                  mobileConfig.titleWeight === 'font-medium' ? '500' :
                  mobileConfig.titleWeight === 'font-semibold' ? '600' :
                  mobileConfig.titleWeight === 'font-extrabold' ? '800' : 'bold',
                lineHeight: 1.3
              }}
            >
              {mobileConfig.title || campaign.screens?.[1]?.title || 'Tentez votre chance !'}
            </h2>
          )}
          {mobileConfig.showDescription !== false && (
            <p
              className={mobileConfig.descriptionAlignment || 'text-center'}
              style={{
                color: mobileConfig.descriptionColor || '#666',
                fontSize: previewMode === 'mobile' ? '0.95rem' : '1.05rem',
                lineHeight: 1.45
              }}
            >
              {mobileConfig.description || campaign.screens?.[1]?.description || 'Participez pour avoir une chance de gagner !'}
            </p>
          )}
        </ContrastBackground>
      </div>
    ) : null;

    return [textBlock];
  };

  return (
    <div style={deviceStyle}>
      <div style={screenStyle}>
        {/* Logo Overlay */}
        {mobileConfig.logoOverlay && (
          <div
            className={`absolute ${mobileConfig.logoPosition === 'top-left' ? 'top-4 left-4' :
              mobileConfig.logoPosition === 'top-center' ? 'top-4 left-1/2 transform -translate-x-1/2' :
                mobileConfig.logoPosition === 'top-right' ? 'top-4 right-4' :
                  mobileConfig.logoPosition === 'center' ? 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' :
                    mobileConfig.logoPosition === 'bottom-left' ? 'bottom-4 left-4' : 'bottom-4 right-4'
              }`}
            style={{ zIndex: 20 }}
          >
            <img
              src={mobileConfig.logoOverlay}
              alt="Logo"
              className="object-contain"
              style={{
                width: previewMode === 'mobile' ? '42px' : '56px',
                height: previewMode === 'mobile' ? '42px' : '56px'
              }}
            />
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

        {/* Layer du jeu - Position absolue indépendante */}
        {campaign.type === 'wheel' && (
          <MobileWheelPreview
            campaign={campaign}
            gamePosition={gamePosition}
          />
        )}

        {/* Layer du contenu adaptatif - Flex layout sans bouton */}
        <div style={getContentLayoutStyle()}>
          {renderContent().map((element, idx) =>
            element ? <React.Fragment key={idx}>{element}</React.Fragment> : null
          )}
        </div>

        {/* Layer du bouton - Position absolue indépendante */}
        <div style={getButtonAbsoluteStyle()}>
          <button
            className="px-4 py-2 bg-[#841b60] text-white rounded-lg hover:bg-[#6d164f] transition-colors shadow-md text-sm max-w-full"
            style={{
              backgroundColor: mobileConfig.buttonColor || '#841b60',
              color: mobileConfig.buttonTextColor || '#ffffff',
              borderRadius: mobileConfig.buttonShape === 'rounded-full' ? '9999px' : 
                           mobileConfig.buttonShape === 'rounded-md' ? '6px' : '8px',
              padding: mobileConfig.buttonSize === 'small' ? '8px 16px' :
                      mobileConfig.buttonSize === 'large' ? '16px 32px' : '12px 24px',
              fontSize: mobileConfig.buttonSize === 'small' ? '0.875rem' :
                       mobileConfig.buttonSize === 'large' ? '1.125rem' : '1rem',
              boxShadow: mobileConfig.buttonShadow === 'none' ? 'none' :
                        mobileConfig.buttonShadow === 'shadow-lg' ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' :
                        '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              width: `${mobileConfig.buttonWidth || 80}%`,
              whiteSpace: 'normal' as const,
              wordWrap: 'break-word' as const,
              lineHeight: 1.4,
              textAlign: 'center' as const
            }}
          >
            {mobileConfig.buttonText || campaign.gameConfig?.[campaign.type]?.buttonLabel || 'Lancer'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobilePreview;
