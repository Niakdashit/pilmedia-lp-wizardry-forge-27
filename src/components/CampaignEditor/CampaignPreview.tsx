
import React from 'react';
import { useModernCampaignStore } from '../../stores/modernCampaignStore';
import { GameRenderer } from '../GameTypes';

interface CampaignPreviewProps {
  campaign?: any;
}

const CampaignPreview: React.FC<CampaignPreviewProps> = ({ campaign }) => {
  const { 
    elements, 
    gameConfig, 
    selectedGameType, 
    deviceType: storeDeviceType,
    canvasSettings 
  } = useModernCampaignStore();

  // Use campaign deviceType if provided, otherwise fall back to store
  const deviceType: 'desktop' | 'mobile' | 'tablet' = campaign?.deviceType || storeDeviceType || 'desktop';
  const isMobile = deviceType === 'mobile';
  const isTablet = deviceType === 'tablet';
  const isDesktop = deviceType === 'desktop';

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

  // Get background settings
  const backgroundColor = canvasSettings?.backgroundColor || '#ffffff';
  const backgroundImage = canvasSettings?.backgroundImage;

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
        {/* Render canvas elements */}
        {elements.map((element) => (
          <div
            key={element.id}
            style={{
              position: 'absolute',
              left: `${element.x}px`,
              top: `${element.y}px`,
              width: `${element.width}px`,
              height: `${element.height}px`,
              zIndex: element.zIndex || 1
            }}
          >
            {element.type === 'text' && (
              <div
                style={{
                  fontSize: `${element.fontSize}px`,
                  color: element.color,
                  fontWeight: element.fontWeight,
                  textAlign: element.textAlign as any
                }}
              >
                {element.content}
              </div>
            )}
            {element.type === 'image' && (
              <img
                src={element.src}
                alt={element.alt || ''}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            )}
          </div>
        ))}

        {/* Render game if configured */}
        {selectedGameType && gameConfig && (
          <div className="absolute inset-0 flex items-center justify-center">
            <GameRenderer
              gameType={selectedGameType}
              config={gameConfig}
              isPreview={true}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CampaignPreview;
