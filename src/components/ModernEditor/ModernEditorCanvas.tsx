
import React from 'react';
import { motion } from 'framer-motion';
import GameCanvasPreview from '../CampaignEditor/GameCanvasPreview';

interface ModernEditorCanvasProps {
  campaign: any;
  previewDevice: 'desktop' | 'tablet' | 'mobile';
}

const ModernEditorCanvas: React.FC<ModernEditorCanvasProps> = ({
  campaign,
  previewDevice
}) => {
  const getDeviceStyles = () => {
    switch (previewDevice) {
      case 'tablet':
        return {
          width: '768px',
          height: '1024px',
          borderRadius: '24px'
        };
      case 'mobile':
        return {
          width: '375px',
          height: '812px',
          borderRadius: '24px'
        };
      default:
        return {
          width: '100%',
          height: '100%',
          borderRadius: '12px'
        };
    }
  };

  const deviceStyles = getDeviceStyles();
  const isDevice = previewDevice !== 'desktop';

  return (
    <div className="w-full h-full flex items-center justify-center p-8 bg-gradient-to-br from-gray-50 to-gray-100">
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`relative bg-white shadow-2xl overflow-hidden ${
          isDevice ? 'border-8 border-gray-800' : ''
        }`}
        style={deviceStyles}
      >
        {/* Device notch for mobile */}
        {previewDevice === 'mobile' && (
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-2xl z-10"></div>
        )}
        
        {/* Device home indicator for mobile */}
        {previewDevice === 'mobile' && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-400 rounded-full z-10"></div>
        )}
        
        {/* Canvas Content */}
        <div className="w-full h-full relative overflow-hidden">
          <GameCanvasPreview
            campaign={campaign}
            className="w-full h-full"
          />
        </div>
        
        {/* Device label */}
        <div className="absolute top-4 right-4 px-3 py-1 bg-black/20 backdrop-blur-sm text-white text-sm rounded-full">
          {previewDevice === 'desktop' ? 'Bureau' : previewDevice === 'tablet' ? 'Tablette' : 'Mobile'}
        </div>
      </motion.div>
      
      {/* Grid background for desktop */}
      {previewDevice === 'desktop' && (
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(132, 27, 96, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(132, 27, 96, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '24px 24px'
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ModernEditorCanvas;
