
import React from 'react';
import { Monitor, Smartphone, Tablet } from 'lucide-react';

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
      case 'mobile':
        return {
          width: '375px',
          height: '667px',
          maxWidth: '100%'
        };
      case 'tablet':
        return {
          width: '768px',
          height: '1024px',
          maxWidth: '100%'
        };
      default:
        return {
          width: '100%',
          height: '600px'
        };
    }
  };

  const deviceStyles = getDeviceStyles();

  return (
    <div className="h-full flex items-center justify-center p-8">
      <div 
        className="bg-white rounded-lg shadow-lg overflow-hidden"
        style={deviceStyles}
      >
        <div 
          className="h-full p-6 flex flex-col items-center justify-center"
          style={{ 
            backgroundColor: campaign.design?.background || '#f8fafc',
            color: campaign.design?.titleColor || '#000000'
          }}
        >
          <div className="text-center space-y-4">
            <h1 
              className="text-2xl font-bold"
              style={{ color: campaign.design?.titleColor || '#000000' }}
            >
              {campaign.screens?.[1]?.title || 'Bienvenue !'}
            </h1>
            <p className="text-gray-600">
              {campaign.screens?.[1]?.description || 'Aperçu de votre campagne'}
            </p>
            <div 
              className="inline-block px-6 py-3 rounded-lg text-white font-medium"
              style={{ backgroundColor: campaign.design?.buttonColor || '#841b60' }}
            >
              {campaign.screens?.[1]?.buttonText || 'Participer'}
            </div>
          </div>
          
          {/* Game placeholder */}
          <div className="mt-8 p-4 border-2 border-dashed border-gray-300 rounded-lg">
            <div className="text-center text-gray-500">
              <div className="text-sm">Aperçu du jeu : {campaign.type}</div>
              <div className="text-xs mt-1">Position : {campaign.gamePosition || 'center'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernEditorCanvas;
