
import React from 'react';

interface DeviceFrameProps {
  device: 'desktop' | 'tablet' | 'mobile';
  children: React.ReactNode;
}

// Padding minimal autour du device
const FRAME_PADDING = 32;

const DEVICE_DIMENSIONS = {
  mobile: { aspect: 375 / 812 },
  tablet: { aspect: 768 / 1024 },
};

const DeviceFrame: React.FC<DeviceFrameProps> = ({ device, children }) => {
  if (device === 'desktop') {
    // Pas de frame : on centre juste le contenu dans le container
    return (
      <div className="flex items-center justify-center w-full h-full">
        {children}
      </div>
    );
  }

  // Gère automatiquement la taille max en fonction du container parent (100% - padding)
  // Utilise aspect-ratio natif pour éviter toute déformation, et padding pour ne jamais coller les bords
  const { aspect } = DEVICE_DIMENSIONS[device];

  return (
    <div
      className="relative w-full h-full flex items-center justify-center"
      style={{
        padding: FRAME_PADDING,
        boxSizing: 'border-box',
      }}
    >
      <div
        className={device === 'mobile'
          ? "bg-gray-900 rounded-[3rem] p-2 shadow-2xl flex items-center justify-center"
          : "bg-gray-800 rounded-3xl p-6 shadow-2xl flex items-center justify-center"}
        style={{
          // Calcul dynamique : 80% du parent max, sinon dim. réelle, ratio respecté
          maxWidth: 'min(80vw, 100%)',
          maxHeight: 'min(80vh, 100%)',
          width: device === 'mobile' ? 375 : 768,
          aspectRatio: aspect.toString(),
        }}
      >
        <div
          className={device === 'mobile'
            ? "bg-black rounded-[2.5rem] p-1 flex items-center justify-center"
            : "bg-black rounded-2xl p-2 flex items-center justify-center"}
          style={{ width: '100%', height: '100%' }}
        >
          <div
            className={device === 'mobile'
              ? "bg-white rounded-[2rem] overflow-hidden relative flex flex-col w-full h-full"
              : "bg-white rounded-xl overflow-hidden relative flex flex-col w-full h-full"}
            style={{ aspectRatio: aspect.toString() }}
          >
            {/* Elements spécifiques à chaque device */}
            {device === 'mobile' && (
              <>
                {/* Notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10"></div>
                {/* Status bar icons */}
                <div className="absolute top-2 left-4 right-4 flex justify-between items-center text-xs font-medium z-10">
                  <span className="text-black">9:41</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-4 h-2 border border-black rounded-sm">
                      <div className="w-3 h-1 bg-black rounded-sm"></div>
                    </div>
                    <div className="w-6 h-3 border border-black rounded-sm relative">
                      <div className="w-4 h-2 bg-green-500 rounded-sm absolute top-0.5 left-0.5"></div>
                      <div className="w-1 h-1 bg-black rounded-sm absolute top-1 -right-0.5"></div>
                    </div>
                  </div>
                </div>
                {/* Home indicator */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-400 rounded-full z-10"></div>
              </>
            )}
            {device === 'tablet' && (
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-400 rounded-full"></div>
            )}

            {/* Scroll interne pour contenu */}
            <div
              style={{
                width: '100%',
                height: '100%',
                overflowY: 'auto',
                WebkitOverflowScrolling: 'touch',
                position: 'relative',
                zIndex: 1
              }}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceFrame;
