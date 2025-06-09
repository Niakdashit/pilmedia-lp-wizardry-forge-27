
import React from 'react';
import GameRenderer from './GameRenderer';

interface CampaignPreviewProps {
  campaign?: any;
  previewDevice?: 'desktop' | 'tablet' | 'mobile';
}

const CampaignPreview: React.FC<CampaignPreviewProps> = ({ 
  campaign, 
  previewDevice = 'desktop' 
}) => {
  const isMobile = previewDevice === 'mobile';
  const isTablet = previewDevice === 'tablet';

  // Calculate dimensions based on device type
  const getPreviewDimensions = () => {
    if (isMobile) {
      return { width: 375, height: 667 };
    } else if (isTablet) {
      return { width: 768, height: 1024 };
    }
    return { width: 1200, height: 800 };
  };

  const { width, height } = getPreviewDimensions();

  // Get background settings from campaign design
  const backgroundColor = campaign?.design?.background || '#ffffff';
  const backgroundImage = campaign?.design?.backgroundImage;

  const backgroundStyle = backgroundImage
    ? {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }
    : {
        backgroundColor
      };

  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 p-4">
      <div 
        className="relative overflow-hidden shadow-2xl"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          maxWidth: '100%',
          maxHeight: '100%',
          borderRadius: isMobile ? '20px' : '12px',
          border: isMobile ? '2px solid #000' : '1px solid #ddd',
          ...backgroundStyle
        }}
      >
        {/* Render game if configured */}
        {campaign && (
          <div className="absolute inset-0 flex items-center justify-center">
            <GameRenderer
              campaign={campaign}
              gameSize={campaign.gameSize || 'medium'}
              gamePosition={campaign.gamePosition || 'center'}
              previewDevice={previewDevice}
              gameContainerStyle={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              buttonLabel={campaign.buttonConfig?.text || 'Jouer'}
              buttonColor={campaign.buttonConfig?.color || '#841b60'}
              gameBackgroundImage={campaign.gameConfig?.[campaign.type]?.backgroundImage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CampaignPreview;
