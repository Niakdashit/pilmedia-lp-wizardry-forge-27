
import React from 'react';

interface DeviceFrameProps {
  device: 'desktop' | 'tablet' | 'mobile';
  children: React.ReactNode;
}

const FRAME_PADDING = 24;

const DEVICE_DIMENSIONS = {
  mobile: { width: 375, height: 667, aspect: 375 / 667 },
  tablet: { width: 768, height: 1024, aspect: 768 / 1024 },
};

const DeviceFrame: React.FC<DeviceFrameProps> = ({ device, children }) => {
  if (device === 'desktop') {
    return (
      <div className="flex items-center justify-center w-full h-full">
        {children}
      </div>
    );
  }

  const { aspect } = DEVICE_DIMENSIONS[device];

  const getDeviceFrameStyles = () => {
    if (device === 'mobile') {
      return {
        frame: "bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl",
        inner: "bg-black rounded-[2rem] p-1",
        screen: "bg-white rounded-[1.75rem] overflow-hidden relative"
      };
    }
    
    return {
      frame: "bg-gray-800 rounded-2xl p-4 shadow-2xl",
      inner: "bg-black rounded-xl p-2",
      screen: "bg-white rounded-lg overflow-hidden relative"
    };
  };

  const styles = getDeviceFrameStyles();

  return (
    <div
      className="relative w-full h-full flex items-center justify-center"
      style={{
        padding: FRAME_PADDING,
        boxSizing: 'border-box',
      }}
    >
      <div
        className={`${styles.frame} flex items-center justify-center`}
        style={{
          maxWidth: '90%',
          maxHeight: '90%',
          aspectRatio: aspect.toString(),
        }}
      >
        <div className={`${styles.inner} flex items-center justify-center w-full h-full`}>
          <div className={`${styles.screen} w-full h-full flex flex-col`}>
            {/* Éléments spécifiques à chaque device */}
            {device === 'mobile' && (
              <>
                {/* Notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-28 h-5 bg-black rounded-b-xl z-20"></div>
                
                {/* Status bar */}
                <div className="absolute top-1 left-3 right-3 flex justify-between items-center text-xs font-medium z-20">
                  <span className="text-black">9:41</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-1.5 border border-black rounded-sm">
                      <div className="w-2 h-1 bg-black rounded-sm"></div>
                    </div>
                    <div className="w-5 h-2.5 border border-black rounded-sm relative">
                      <div className="w-3.5 h-1.5 bg-green-500 rounded-sm absolute top-0.5 left-0.5"></div>
                      <div className="w-0.5 h-0.5 bg-black rounded-sm absolute top-1 -right-0.5"></div>
                    </div>
                  </div>
                </div>
                
                {/* Home indicator */}
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gray-400 rounded-full z-20"></div>
              </>
            )}
            
            {device === 'tablet' && (
              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gray-400 rounded-full z-20"></div>
            )}

            {/* Contenu avec scroll */}
            <div className="flex-1 w-full h-full overflow-auto relative z-10">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceFrame;
