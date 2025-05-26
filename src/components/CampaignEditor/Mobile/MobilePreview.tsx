import React from 'react';
import MobileWheelPreview from '../../GameTypes/MobileWheelPreview';
import { Quiz, Scratch, Memory, Puzzle, Dice, Jackpot } from '../../GameTypes';
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
          minHeight: '500px',
          height: 'auto',
          maxHeight: '100%',
          borderRadius: '20px',
          border: '6px solid #1f1f1f',
          boxShadow: '0 0 20px rgba(0,0,0,0.3)',
          backgroundColor: '#000',
          display: 'flex',
          flexDirection: 'column' as const,
          justifyContent: 'center'
        };
      case 'tablet':
        return {
          width: '340px',
          minHeight: '520px',
          height: 'auto',
          maxHeight: '100%',
          borderRadius: '14px',
          border: '4px solid #333',
          boxShadow: '0 0 15px rgba(0,0,0,0.2)',
          backgroundColor: '#000',
          display: 'flex',
          flexDirection: 'column' as const,
          justifyContent: 'center'
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
      padding: `${mobileConfig.horizontalPadding || 16}px`,
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
  const renderGameComponent = () => {
    const gameStyles: any = {
      width: mobileConfig.fullscreenGame ? '100%' : `${mobileConfig.gameMaxWidth || 90}%`,
      maxHeight: mobileConfig.fullscreenGame ? '100vh' : `${mobileConfig.gameMaxHeight || 60}vh`,
      padding: `${mobileConfig.gamePaddingY || 16}px ${mobileConfig.gamePaddingX || 16}px`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    };
    if (!mobileConfig.autoResize) {
      gameStyles.transform = 'scale(0.8)';
      gameStyles.transformOrigin = 'center';
    }
    const gameContent = (() => {
      switch (campaign.type) {
        case 'wheel':
          return <MobileWheelPreview campaign={campaign} onFinish={() => {}} />;
        case 'scratch':
          return <Scratch config={campaign.gameConfig?.scratch} onConfigChange={() => {}} />;
        case 'memory':
          return <Memory config={campaign.gameConfig?.memory} onConfigChange={() => {}} />;
        case 'puzzle':
          return <Puzzle config={campaign.gameConfig?.puzzle} onConfigChange={() => {}} />;
        case 'dice':
          return <Dice config={campaign.gameConfig?.dice} onConfigChange={() => {}} />;
        case 'jackpot':
          return <Jackpot isPreview={true} instantWinConfig={campaign.gameConfig?.jackpot?.instantWin} onFinish={() => {}} />;
        case 'quiz':
          return <Quiz config={campaign.gameConfig?.quiz} onConfigChange={() => {}} />;
        default:
          return <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Jeu non configuré</span>
            </div>;
      }
    })();
    return <div style={gameStyles}>
        {gameContent}
        {mobileConfig.customTemplate && <div className="absolute inset-0 pointer-events-none">
            <img src={mobileConfig.customTemplate} alt="Template personnalisé" className="w-full h-full object-contain" />
          </div>}
      </div>;
  };
  const getButtonStyles = () => {
    const buttonSize = mobileConfig.buttonSize || 'medium';
    let sizeClasses = '';
    switch (buttonSize) {
      case 'small':
        sizeClasses = 'px-4 py-2 text-sm';
        break;
      case 'large':
        sizeClasses = 'px-8 py-4 text-lg';
        break;
      default:
        sizeClasses = 'px-6 py-3 text-base';
    }
    return {
      className: `${sizeClasses} ${mobileConfig.buttonShape || 'rounded-lg'} ${mobileConfig.buttonShadow || 'shadow-md'} transition-all duration-200 ${mobileConfig.buttonHoverEffect !== false ? 'hover:opacity-90' : ''}`,
      style: {
        backgroundColor: mobileConfig.buttonColor || '#841b60',
        color: mobileConfig.buttonTextColor || '#ffffff',
        width: `${mobileConfig.buttonWidth || 80}%`,
        margin: `${mobileConfig.buttonMargin || 16}px auto`
      }
    };
  };
  const renderButton = () => {
    if (!mobileConfig.buttonText) return null;
    const buttonStyles = getButtonStyles();
    return <div className="flex justify-center">
        <button className={buttonStyles.className} style={buttonStyles.style}>
          {mobileConfig.buttonText}
        </button>
      </div>;
  };
  const renderTextContent = () => {
    const titleToShow = mobileConfig.title || campaign.screens?.[1]?.title || campaign.name;
    const descriptionToShow = mobileConfig.description || campaign.screens?.[1]?.description || campaign.description;
    return <div className="text-content" style={{
      marginBottom: `${mobileConfig.verticalSpacing || 20}px`
    }}>
        {mobileConfig.showTitle !== false && titleToShow && <h1 className={`${mobileConfig.titleSize || 'text-2xl'} ${mobileConfig.titleWeight || 'font-bold'} ${mobileConfig.titleAlignment || 'text-center'} mb-4`} style={{
        color: mobileConfig.titleColor || '#000000'
      }}>
            {titleToShow}
          </h1>}
        {mobileConfig.showDescription !== false && descriptionToShow && <p className={`${mobileConfig.descriptionSize || 'text-base'} ${mobileConfig.descriptionAlignment || 'text-center'}`} style={{
        color: mobileConfig.descriptionColor || '#666666'
      }}>
            {descriptionToShow}
          </p>}
      </div>;
  };
  const getLayoutStyle = () => {
    const gamePosition = mobileConfig.gamePosition || 'center';
    const textPosition = mobileConfig.textPosition || 'top';
    let flexDirection: 'column' | 'column-reverse' = 'column';
    let justifyContent = 'center';
    let alignItems = 'center';

    // Gérer la position du jeu et du texte
    if (gamePosition === 'top') {
      justifyContent = 'flex-start';
    } else if (gamePosition === 'bottom') {
      justifyContent = 'flex-end';
    }
    if (textPosition === 'bottom') {
      flexDirection = 'column-reverse';
    }
    return {
      display: 'flex',
      flexDirection,
      justifyContent,
      alignItems,
      height: '100%',
      gap: `${mobileConfig.verticalSpacing || 20}px`
    };
  };
  return <div style={getDeviceStyle()}>
      <div style={getScreenStyle()}>
        {/* Background Image appliqué via getScreenStyle */}
        
        {/* Decorative Overlay */}
        {mobileConfig.decorativeOverlay && <div className="absolute inset-0 flex items-center justify-center" style={{
        zIndex: 2
      }}>
            <img src={mobileConfig.decorativeOverlay} alt="Decorative overlay" className="w-full h-full object-contain" />
          </div>}

        {/* Content Layer avec layout dynamique */}
        <div style={getLayoutStyle()} className="relative z-10">
          {/* Bouton en haut si configuré */}
          {mobileConfig.buttonPlacement === 'top' && renderButton()}
          
          {/* Contenu texte */}
          {renderTextContent()}
          
          {/* Game Component */}
          <div style={{
          display: 'flex',
          alignItems: mobileConfig.gameVerticalAlign || 'center',
          justifyContent: 'center',
          flex: mobileConfig.gamePosition === 'center' ? '1' : 'none'
        }} className="center">
            {renderGameComponent()}
          </div>

          {/* Bouton en bas par défaut */}
          {mobileConfig.buttonPlacement !== 'top' && renderButton()}
        </div>

        {/* Logo Overlay */}
        {mobileConfig.logoOverlay && <div className={`absolute ${mobileConfig.logoPosition === 'top-left' ? 'top-4 left-4' : mobileConfig.logoPosition === 'top-center' ? 'top-4 left-1/2 transform -translate-x-1/2' : mobileConfig.logoPosition === 'top-right' ? 'top-4 right-4' : mobileConfig.logoPosition === 'center' ? 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' : mobileConfig.logoPosition === 'bottom-left' ? 'bottom-4 left-4' : 'bottom-4 right-4'}`} style={{
        zIndex: 20
      }}>
            <img src={mobileConfig.logoOverlay} alt="Logo" className="w-16 h-16 object-contain" />
          </div>}
      </div>
    </div>;
};
export default MobilePreview;