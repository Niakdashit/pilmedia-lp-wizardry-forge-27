
import React from 'react';
import MobileWheelPreview from '../../GameTypes/MobileWheelPreview';
import { Quiz, Scratch, Memory, Puzzle, Dice, Jackpot } from '../../GameTypes';

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
    return {
      width: '100%',
      height: '100%',
      borderRadius: '14px',
      overflow: 'hidden',
      position: 'relative' as const,
      backgroundColor: mobileConfig.backgroundColor || '#ebf4f7',
      display: 'flex',
      flexDirection: 'column' as const,
      justifyContent: 'center'
    };
  };

  const renderGameComponent = () => {
    switch (campaign.type) {
      case 'wheel':
        return (
          <MobileWheelPreview
            campaign={campaign}
            onFinish={() => {}}
          />
        );
      case 'scratch':
        return (
          <Scratch
            config={campaign.gameConfig?.scratch}
            onConfigChange={() => {}}
          />
        );
      case 'memory':
        return (
          <Memory
            config={campaign.gameConfig?.memory}
            onConfigChange={() => {}}
          />
        );
      case 'puzzle':
        return (
          <Puzzle
            config={campaign.gameConfig?.puzzle}
            onConfigChange={() => {}}
          />
        );
      case 'dice':
        return (
          <Dice
            config={campaign.gameConfig?.dice}
            onConfigChange={() => {}}
          />
        );
      case 'jackpot':
        return (
          <Jackpot
            isPreview={true}
            instantWinConfig={campaign.gameConfig?.jackpot?.instantWin}
            onFinish={() => {}}
          />
        );
      case 'quiz':
        return (
          <Quiz
            config={campaign.gameConfig?.quiz}
            onConfigChange={() => {}}
          />
        );
      default:
        return (
          <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Jeu non configuré</span>
          </div>
        );
    }
  };

  return (
    <div style={getDeviceStyle()}>
      <div style={getScreenStyle()}>
        {/* Background Image */}
        {mobileConfig.backgroundImage && (
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${mobileConfig.backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              zIndex: 1
            }}
          />
        )}

        {/* Decorative Overlay */}
        {mobileConfig.decorativeOverlay && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ zIndex: 2 }}
          >
            <img
              src={mobileConfig.decorativeOverlay}
              alt="Decorative overlay"
              className="w-full h-full object-contain"
            />
          </div>
        )}

        {/* Content Layer */}
        <div className="relative z-10 flex flex-col h-full p-4">
          {/* Title */}
          {mobileConfig.showTitle && (mobileConfig.title || campaign.screens?.[1]?.title) && (
            <h1
              className={`${mobileConfig.titleSize || 'text-2xl'} ${mobileConfig.titleWeight || 'font-bold'} ${mobileConfig.titleAlignment || 'text-center'} mb-4`}
              style={{ color: mobileConfig.titleColor || '#000000' }}
            >
              {mobileConfig.title || campaign.screens?.[1]?.title}
            </h1>
          )}

          {/* Description */}
          {mobileConfig.showDescription && (mobileConfig.description || campaign.screens?.[1]?.description) && (
            <p
              className={`${mobileConfig.descriptionSize || 'text-base'} ${mobileConfig.descriptionAlignment || 'text-center'} mb-6`}
              style={{ color: mobileConfig.descriptionColor || '#666666' }}
            >
              {mobileConfig.description || campaign.screens?.[1]?.description}
            </p>
          )}

          {/* Game Container */}
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-xs">
              {renderGameComponent()}
            </div>
          </div>

          {/* Button */}
          {mobileConfig.buttonText && (
            <div className="mt-4 flex justify-center">
              <button
                className={`px-6 py-3 ${mobileConfig.buttonShape || 'rounded-lg'} ${mobileConfig.buttonShadow || 'shadow-md'}`}
                style={{
                  backgroundColor: mobileConfig.buttonColor || '#841b60',
                  color: mobileConfig.buttonTextColor || '#ffffff',
                  width: `${mobileConfig.buttonWidth || 80}%`
                }}
              >
                {mobileConfig.buttonText}
              </button>
            </div>
          )}
        </div>

        {/* Logo Overlay */}
        {mobileConfig.logoOverlay && (
          <div
            className={`absolute ${
              mobileConfig.logoPosition === 'top-left' ? 'top-4 left-4' :
              mobileConfig.logoPosition === 'top-right' ? 'top-4 right-4' :
              mobileConfig.logoPosition === 'bottom-left' ? 'bottom-4 left-4' :
              'bottom-4 right-4'
            }`}
            style={{ zIndex: 20 }}
          >
            <img
              src={mobileConfig.logoOverlay}
              alt="Logo"
              className="w-16 h-16 object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MobilePreview;
