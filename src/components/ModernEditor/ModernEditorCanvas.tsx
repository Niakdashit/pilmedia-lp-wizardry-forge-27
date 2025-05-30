
import React from 'react';
import WheelPreview from '../GameTypes/WheelPreview';

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

  const renderGamePreview = () => {
    if (campaign.type === 'wheel') {
      const config = {
        mode: 'instant_winner' as const,
        winProbability: 0.3,
        maxWinners: 100,
        winnersCount: 0
      };
      
      return (
        <WheelPreview
          campaign={campaign}
          config={config}
          gameSize="medium"
          gamePosition={campaign.gamePosition || 'center'}
          disabled={false}
        />
      );
    }
    
    // Placeholder pour les autres types de jeu
    return (
      <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg">
        <div className="text-center text-gray-500">
          <div className="text-sm">Aperçu du jeu : {campaign.type}</div>
          <div className="text-xs mt-1">Position : {campaign.gamePosition || 'center'}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex items-center justify-center p-8">
      <div 
        className="bg-white rounded-lg shadow-lg overflow-hidden relative"
        style={deviceStyles}
      >
        {/* Image de fond si définie */}
        {campaign.design?.backgroundImage && (
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: `url(${campaign.design.backgroundImage})`,
              opacity: 0.3
            }}
          />
        )}
        
        <div 
          className="h-full p-6 flex flex-col items-center justify-center relative z-10"
          style={{ 
            backgroundColor: campaign.design?.backgroundImage ? 'transparent' : (campaign.design?.background || '#f8fafc'),
            color: campaign.design?.titleColor || '#000000',
            fontFamily: campaign.design?.fontFamily || 'Inter'
          }}
        >
          <div className="text-center space-y-4 mb-8">
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
          
          {/* Aperçu du jeu réel */}
          <div className="relative w-full h-full flex items-center justify-center">
            {renderGamePreview()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernEditorCanvas;
