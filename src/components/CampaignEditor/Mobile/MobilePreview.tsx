
import React from 'react';
import MobileWheelPreview from '../../GameTypes/MobileWheelPreview';
import MobileButton from './MobileButton';
import MobileContent from './MobileContent';
import MobileOverlays from './MobileOverlays';
import { DEVICE_SPECS } from './constants';
import { getDeviceStyle, getScreenStyle, getContentLayoutStyle } from './styles';

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
  const specs = DEVICE_SPECS[previewMode];
  const gamePosition = mobileConfig.gamePosition || 'left';
  const verticalOffset = mobileConfig.gameVerticalOffset || 0;
  const horizontalOffset = mobileConfig.gameHorizontalOffset || 0;
  const deviceWidth = specs.width;

  const deviceStyle = getDeviceStyle(specs, deviceWidth);
  const screenStyle = getScreenStyle(mobileConfig, previewMode);
  const contentLayoutStyle = getContentLayoutStyle(mobileConfig);

  return (
    <div style={deviceStyle}>
      <div style={screenStyle}>
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
              overflow: 'visible'
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

        {/* Content Layer */}
        <div style={contentLayoutStyle}>
          <MobileContent 
            mobileConfig={mobileConfig} 
            campaign={campaign} 
            previewMode={previewMode} 
          />
        </div>

        {/* Button Layer */}
        <MobileButton mobileConfig={mobileConfig} campaign={campaign} />
      </div>
    </div>
  );
};

export default MobilePreview;
