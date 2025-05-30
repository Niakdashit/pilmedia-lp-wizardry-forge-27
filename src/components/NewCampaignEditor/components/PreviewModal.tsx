
import React, { useState } from 'react';
import { X, Monitor, Smartphone, Tablet, RotateCcw } from 'lucide-react';
import GameFunnel from '../../GameFunnel';

interface PreviewModalProps {
  campaign: any;
  device: 'mobile' | 'tablet' | 'desktop';
  orientation: 'portrait' | 'landscape';
  onClose: () => void;
}

const PreviewModal: React.FC<PreviewModalProps> = ({
  campaign,
  device,
  orientation,
  onClose
}) => {
  const [currentDevice, setCurrentDevice] = useState(device);
  const [currentOrientation, setCurrentOrientation] = useState(orientation);

  const getDeviceClasses = () => {
    const isLandscape = currentOrientation === 'landscape';
    
    switch (currentDevice) {
      case 'mobile':
        return isLandscape 
          ? 'w-[812px] h-[375px]' // iPhone landscape
          : 'w-[375px] h-[812px]'; // iPhone portrait
      case 'tablet':
        return isLandscape 
          ? 'w-[1024px] h-[768px]' // iPad landscape
          : 'w-[768px] h-[1024px]'; // iPad portrait
      case 'desktop':
        return 'w-[1200px] h-[800px]';
      default:
        return 'w-[375px] h-[812px]';
    }
  };

  const toggleOrientation = () => {
    if (currentDevice !== 'desktop') {
      setCurrentOrientation(currentOrientation === 'portrait' ? 'landscape' : 'portrait');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-[95vw] max-h-[95vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <h3 className="text-lg font-semibold text-gray-900">Aperçu de la campagne</h3>
            
            {/* Device selector */}
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setCurrentDevice('mobile')}
                className={`p-2 rounded-md transition-colors ${
                  currentDevice === 'mobile' 
                    ? 'bg-white text-purple-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Smartphone className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentDevice('tablet')}
                className={`p-2 rounded-md transition-colors ${
                  currentDevice === 'tablet' 
                    ? 'bg-white text-purple-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentDevice('desktop')}
                className={`p-2 rounded-md transition-colors ${
                  currentDevice === 'desktop' 
                    ? 'bg-white text-purple-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Monitor className="w-4 h-4" />
              </button>
              
              {currentDevice !== 'desktop' && (
                <>
                  <div className="h-6 w-px bg-gray-300 mx-1" />
                  <button
                    onClick={toggleOrientation}
                    className="p-2 rounded-md text-gray-600 hover:text-gray-900 transition-colors"
                    title="Changer l'orientation"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preview Content */}
        <div className="p-8 bg-gray-100 overflow-auto">
          <div className="flex items-center justify-center">
            <div 
              className={`bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 ${getDeviceClasses()}`}
              style={{
                maxWidth: '100%',
                maxHeight: 'calc(95vh - 200px)'
              }}
            >
              <div className="w-full h-full overflow-auto">
                <GameFunnel 
                  campaign={campaign} 
                  mobileConfig={currentDevice === 'mobile' ? campaign.mobileConfig : undefined}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
