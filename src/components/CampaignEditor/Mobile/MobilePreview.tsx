
import React from 'react';
import MobileWheelPreview from '../../GameTypes/MobileWheelPreview';
import MobileButton from './MobileButton';
import MobileOverlays from './MobileOverlays';
import TextZoneManager from './TextZoneManager';
import FreeTextManager from './FreeTextManager';
import { getDeviceStyle, getScreenStyle } from './styles';

interface MobilePreviewProps {
  campaign: any;
  previewMode: 'mobile' | 'tablet';
}

const MobilePreview: React.FC<MobilePreviewProps> = ({
  campaign,
  previewMode
}) => {
  const fallbackMobile = campaign.config?.mobileConfig || {};
  const mobileConfig = { ...fallbackMobile, ...(campaign.mobileConfig || {}) };
  const gamePosition = mobileConfig.gamePosition || 'left';
  const verticalOffset = mobileConfig.gameVerticalOffset || 0;
  const horizontalOffset = mobileConfig.gameHorizontalOffset || 0;

  const deviceStyle = getDeviceStyle();
  const screenStyle = getScreenStyle(mobileConfig);

  // Enforce strict 1080x1920 pixel limit
  const containerStyle = {
    ...deviceStyle,
    maxWidth: '1080px',
    maxHeight: '1920px',
    overflow: 'hidden',
    position: 'relative' as const
  };

  const screenStyleWithBounds = {
    ...screenStyle,
    width: '100%',
    height: '100%',
    maxWidth: '1080px',
    maxHeight: '1920px',
    overflow: 'hidden',
    position: 'relative' as const
  };

  // Calculate game area bounds for collision detection
  const getGameArea = () => {
    if (campaign.type !== 'wheel') return undefined;
    
    const canvasSize = 280; // Default wheel size
    const containerWidth = Math.min(deviceStyle.width - 16, 1080); // Account for device padding and max width
    const containerHeight = Math.min(deviceStyle.height - 16, 1920); // Account for device padding and max height
    
    let gameArea = { x: 0, y: 0, width: canvasSize, height: canvasSize };
    
    switch (gamePosition) {
      case 'left':
        gameArea = {
          x: horizontalOffset,
          y: (containerHeight - canvasSize) / 2 + verticalOffset,
          width: canvasSize,
          height: canvasSize
        };
        break;
      case 'right':
        gameArea = {
          x: containerWidth - canvasSize + horizontalOffset,
          y: (containerHeight - canvasSize) / 2 + verticalOffset,
          width: canvasSize,
          height: canvasSize
        };
        break;
      case 'center':
      default:
        gameArea = {
          x: (containerWidth - canvasSize) / 2 + horizontalOffset,
          y: (containerHeight - canvasSize) / 2 + verticalOffset,
          width: canvasSize,
          height: canvasSize
        };
        break;
    }
    
    return gameArea;
  };

  const containerBounds = {
    width: Math.min(deviceStyle.width - 16, 1080),
    height: Math.min(deviceStyle.height - 16, 1920)
  };

  return (
    <div style={containerStyle} key={`mobile-preview-${campaign.gameSize}-${JSON.stringify(mobileConfig)}`}>
      <div style={screenStyleWithBounds}>
        <MobileOverlays mobileConfig={mobileConfig} previewMode={previewMode} />

        {/* Game Container */}
        {campaign.type === 'wheel' && (
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 10,
              pointerEvents: 'none',
              overflow: 'hidden'
            }}
          >
            <MobileWheelPreview
              campaign={campaign}
              gamePosition={gamePosition}
              verticalOffset={verticalOffset}
              horizontalOffset={horizontalOffset}
            />
          </div>
        )}

        {/* Text Zone Manager - Replaces static content */}
        <TextZoneManager
          mobileConfig={mobileConfig}
          campaign={campaign}
          gameArea={getGameArea()}
          containerBounds={containerBounds}
        />

        {/* Free Text Manager - Enhanced with device-specific positioning */}
        <FreeTextManager 
          containerBounds={containerBounds} 
          previewMode={previewMode}
        />

        {/* Button Layer - only show if not hidden */}
        {!mobileConfig.hideLaunchButton && (
          <MobileButton mobileConfig={mobileConfig} campaign={campaign} />
        )}
      </div>
    </div>
  );
};

export default MobilePreview;
