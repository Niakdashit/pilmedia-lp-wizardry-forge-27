
import React from 'react';
import { Monitor, Tablet, Smartphone, Maximize2, Minimize2 } from 'lucide-react';
import FunnelUnlockedGame from '../../funnels/FunnelUnlockedGame';
import FunnelStandard from '../../funnels/FunnelStandard';

interface EditorPreviewProps {
  campaign: any;
  device: 'mobile' | 'tablet' | 'desktop';
  onDeviceChange: (device: 'mobile' | 'tablet' | 'desktop') => void;
  isFullscreen: boolean;
  onFullscreenToggle: () => void;
}

const EditorPreview: React.FC<EditorPreviewProps> = ({
  campaign,
  device,
  onDeviceChange,
  isFullscreen,
  onFullscreenToggle
}) => {
  const deviceConfig = {
    mobile: { width: '320px', height: '568px', icon: Smartphone },
    tablet: { width: '768px', height: '1024px', icon: Tablet },
    desktop: { width: '100%', height: '100%', icon: Monitor }
  };

  const renderPreview = () => {
    const mobileConfig = device !== 'desktop' ? campaign.mobileConfig : undefined;
    
    if (['wheel', 'scratch', 'jackpot', 'dice'].includes(campaign.type)) {
      return (
        <FunnelUnlockedGame
          campaign={campaign}
          modalContained={true}
          mobileConfig={mobileConfig}
        />
      );
    }
    
    return <FunnelStandard campaign={campaign} />;
  };

  const getPreviewStyle = () => {
    if (device === 'desktop') {
      return { width: '100%', height: '100%' };
    }
    
    const config = deviceConfig[device];
    return {
      width: config.width,
      height: config.height,
      maxWidth: '100%',
      maxHeight: '70vh'
    };
  };

  return (
    <div className="h-full flex flex-col">
      {/* Preview Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-900">Aperçu en temps réel</h3>
          <button
            onClick={onFullscreenToggle}
            className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
            title={isFullscreen ? "Réduire" : "Plein écran"}
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4 text-gray-500" />
            ) : (
              <Maximize2 className="w-4 h-4 text-gray-500" />
            )}
          </button>
        </div>
        
        {/* Device Selector */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          {Object.entries(deviceConfig).map(([deviceType, config]) => {
            const Icon = config.icon;
            return (
              <button
                key={deviceType}
                onClick={() => onDeviceChange(deviceType as any)}
                className={`flex-1 flex items-center justify-center py-2 px-3 rounded-md text-xs font-medium transition-all ${
                  device === deviceType
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5 mr-1.5" />
                {deviceType.charAt(0).toUpperCase() + deviceType.slice(1)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 p-4 bg-gray-100 overflow-auto">
        <div className="flex items-center justify-center h-full">
          <div
            style={getPreviewStyle()}
            className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
          >
            <div className="w-full h-full relative">
              {renderPreview()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorPreview;
