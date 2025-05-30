import React from 'react';
import WheelPreview from '../GameTypes/WheelPreview';
import ScratchPreview from '../GameTypes/ScratchPreview';
import MemoryPreview from '../GameTypes/MemoryPreview';
import PuzzlePreview from '../GameTypes/PuzzlePreview';
import DicePreview from '../GameTypes/DicePreview';

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

  const renderGamePreview = () => {
    const gameConfig = campaign.gameConfig || {};
    
    switch (campaign.type) {
      case 'wheel':
        return <WheelPreview campaign={campaign} config={gameConfig.wheel} />;
      case 'scratch':
        return <ScratchPreview config={gameConfig.scratch} />;
      case 'memory':
        return <MemoryPreview config={gameConfig.memory} />;
      case 'puzzle':
        return <PuzzlePreview config={gameConfig.puzzle} />;
      case 'dice':
        return <DicePreview config={gameConfig.dice} />;
      case 'jackpot':
        return (
          <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg">
            <div className="text-center text-gray-500">
              <div className="text-sm">Aperçu Jackpot</div>
              <div className="text-xs mt-1">🎰 Machine à sous</div>
            </div>
          </div>
        );
      default:
        return (
          <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg">
            <div className="text-center text-gray-500">
              <div className="text-sm">Aperçu du jeu : {campaign.type}</div>
              <div className="text-xs mt-1">Position : {campaign.gamePosition || 'center'}</div>
            </div>
          </div>
        );
    }
  };

  const deviceStyles = getDeviceStyles();
  const backgroundStyle = campaign.design?.backgroundImage 
    ? { 
        backgroundImage: `url(${campaign.design.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: campaign.design?.background || '#f8fafc'
      }
    : { backgroundColor: campaign.design?.background || '#f8fafc' };

  return (
    <div className="h-full flex items-center justify-center p-8">
      <div 
        className="bg-white rounded-lg shadow-lg overflow-hidden"
        style={deviceStyles}
      >
        <div 
          className="h-full p-6 flex flex-col items-center justify-center"
          style={{ 
            ...backgroundStyle,
            color: campaign.design?.titleColor || '#000000'
          }}
        >
          <div className="text-center space-y-4">
            <h1 
              className="text-2xl font-bold"
              style={{ 
                color: campaign.design?.titleColor || '#000000',
                fontFamily: campaign.design?.fontFamily || 'Inter'
              }}
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
          
          {/* Game preview */}
          <div className="mt-8 max-w-sm">
            {renderGamePreview()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernEditorCanvas;
