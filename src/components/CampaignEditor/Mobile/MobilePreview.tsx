
import React from 'react';
import FunnelUnlockedGame from '../../funnels/FunnelUnlockedGame';
import FunnelStandard from '../../funnels/FunnelStandard';
import ContrastBackground from '../../common/ContrastBackground';

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

  // Style du device "mockup"
  const deviceStyle = {
    width: specs.width,
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

  // Style du background écran
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

  // Layout dynamique du contenu (titre/jeu)
  const getContentLayoutStyle = () => {
    const verticalSpacing = mobileConfig.verticalSpacing ?? 20;
    const horizontalPadding = Math.max(12, mobileConfig.horizontalPadding ?? 16);

    return {
      display: 'flex',
      flexDirection: 'column' as const,
      justifyContent: 'flex-start',
      alignItems: 'center',
      height: '100%',
      width: '100%',
      gap: verticalSpacing,
      padding: `${verticalSpacing}px ${horizontalPadding}px`,
      overflowY: 'auto' as const,
      position: 'relative' as const,
      zIndex: 10
    };
  };

  // Bloc texte (jamais débordant)
  const getTextBlockStyle = () => ({
    textAlign: 'center' as const,
    width: '100%',
    maxWidth: '100%',
    flexShrink: 0,
    overflowWrap: 'break-word' as const
  });

  // Conteneur jeu centré et responsive
  const getGameContainerStyle = () => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    minHeight: previewMode === 'mobile' ? 160 : 220,
    maxHeight: previewMode === 'mobile' ? 240 : 340,
    padding: '0',
    position: 'relative' as const
  });

  // Choix du funnel (unlocked/game standard)
  const getFunnelComponent = () => {
    const sharedProps = { campaign, modalContained: true, mobileConfig, previewMode };
    if (['wheel', 'scratch', 'jackpot', 'dice'].includes(campaign.type)) {
      return <FunnelUnlockedGame {...sharedProps} />;
    }
    return <FunnelStandard {...sharedProps} />;
  };

  // Contenus texte + jeu en ordre dynamique
  const renderOrderedContent = () => {
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

    const gameBlock = (
      <div style={getGameContainerStyle()}>
        {getFunnelComponent()}
      </div>
    );

    // Texte au top, jeu en dessous (toujours le pattern optimal pour device mobile/tablette)
    return [textBlock, gameBlock];
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

        {/* Main Content with Layout */}
        <div style={getContentLayoutStyle()}>
          {renderOrderedContent().map((element, idx) =>
            element ? <React.Fragment key={idx}>{element}</React.Fragment> : null
          )}
        </div>
      </div>
    </div>
  );
};

export default MobilePreview;
