
import React, { useState } from 'react';
import MobileWheelPreview from '../../GameTypes/MobileWheelPreview';

interface MobilePreviewProps {
  campaign: any;
  previewMode: 'mobile' | 'tablet';
}

const MobilePreview: React.FC<MobilePreviewProps> = ({ campaign, previewMode }) => {
  const [gameResult, setGameResult] = useState<'win' | 'lose' | null>(null);
  
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

  const contentStyle = {
    padding: `${mobileConfig.verticalSpacing || 20}px ${mobileConfig.horizontalPadding || 16}px`,
    height: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: mobileConfig.gameVerticalAlign === 'top' ? 'flex-start' 
                  : mobileConfig.gameVerticalAlign === 'bottom' ? 'flex-end' 
                  : 'center',
    gap: `${mobileConfig.verticalSpacing || 20}px`,
    position: 'relative' as const,
    zIndex: 2,
  };

  const titleStyle = {
    color: mobileConfig.titleColor || '#000000',
    fontSize: mobileConfig.titleSize === 'text-3xl' ? '1.875rem' : 
              mobileConfig.titleSize === 'text-2xl' ? '1.5rem' : '1.25rem',
    fontWeight: mobileConfig.titleWeight === 'font-bold' ? 'bold' : 'normal',
    textAlign: mobileConfig.titleAlignment === 'text-center' ? 'center' as const :
               mobileConfig.titleAlignment === 'text-left' ? 'left' as const : 'right' as const,
    margin: 0,
    lineHeight: 1.2,
  };

  const descriptionStyle = {
    color: mobileConfig.descriptionColor || '#666666',
    fontSize: mobileConfig.descriptionSize === 'text-lg' ? '1.125rem' : 
              mobileConfig.descriptionSize === 'text-base' ? '1rem' : '0.875rem',
    textAlign: mobileConfig.descriptionAlignment === 'text-center' ? 'center' as const :
               mobileConfig.descriptionAlignment === 'text-left' ? 'left' as const : 'right' as const,
    margin: 0,
    lineHeight: 1.4,
    maxWidth: '90%',
  };

  const gameContainerStyle = {
    width: `${mobileConfig.gameMaxWidth || 90}%`,
    maxHeight: `${mobileConfig.gameMaxHeight || 60}%`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: `${mobileConfig.gamePaddingY || 16}px ${mobileConfig.gamePaddingX || 16}px`,
  };

  const buttonStyle = {
    backgroundColor: mobileConfig.buttonColor || '#841b60',
    color: mobileConfig.buttonTextColor || '#ffffff',
    padding: mobileConfig.buttonSize === 'large' ? '16px 32px' : 
             mobileConfig.buttonSize === 'small' ? '8px 16px' : '12px 24px',
    borderRadius: mobileConfig.buttonShape === 'rounded-full' ? '9999px' : 
                  mobileConfig.buttonShape === 'rounded-lg' ? '8px' : '4px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    boxShadow: mobileConfig.buttonShadow === 'shadow-lg' ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' :
               mobileConfig.buttonShadow === 'shadow-md' ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none',
    width: `${mobileConfig.buttonWidth || 80}%`,
    margin: `${mobileConfig.buttonMargin || 16}px 0`,
  };

  const renderGame = () => {
    switch (campaign.type) {
      case 'wheel':
        return (
          <MobileWheelPreview
            campaign={campaign}
            onFinish={setGameResult}
          />
        );
      default:
        return (
          <div className="text-center text-gray-500 p-8">
            <p className="text-sm">Aperçu du jeu {campaign.type}</p>
          </div>
        );
    }
  };

  const handleGameAction = () => {
    // Simuler une action de jeu
    setGameResult(Math.random() > 0.5 ? 'win' : 'lose');
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

        {/* Contenu principal */}
        <div style={contentStyle}>
          {/* Titre */}
          {(mobileConfig.showTitle !== false) && (
            <h1 style={titleStyle}>
              {mobileConfig.title || campaign.screens?.[1]?.title || campaign.name || 'Tentez votre chance !'}
            </h1>
          )}

          {/* Description */}
          {(mobileConfig.showDescription !== false) && (
            <p style={descriptionStyle}>
              {mobileConfig.description || campaign.screens?.[1]?.description || 'Participez pour avoir une chance de gagner !'}
            </p>
          )}

          {/* Zone de jeu */}
          <div style={gameContainerStyle}>
            {renderGame()}
          </div>

          {/* Bouton d'action */}
          {mobileConfig.buttonPlacement !== 'hidden' && (
            <button
              style={buttonStyle}
              onClick={handleGameAction}
              onMouseEnter={(e) => {
                if (mobileConfig.buttonHoverEffect) {
                  e.currentTarget.style.transform = 'scale(1.05)';
                }
              }}
              onMouseLeave={(e) => {
                if (mobileConfig.buttonHoverEffect) {
                  e.currentTarget.style.transform = 'scale(1)';
                }
              }}
            >
              {mobileConfig.buttonText || campaign.screens?.[1]?.buttonText || 'Participer'}
            </button>
          )}

          {/* Résultat du jeu */}
          {gameResult && (
            <div className="text-center mt-4">
              <p className={`text-lg font-bold ${gameResult === 'win' ? 'text-green-600' : 'text-red-600'}`}>
                {gameResult === 'win' ? '🎉 Félicitations !' : '😔 Dommage, réessayez !'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobilePreview;
