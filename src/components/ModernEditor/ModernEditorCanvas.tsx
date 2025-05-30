
import React, { useState } from 'react';
import WheelPreview from '../GameTypes/WheelPreview';
import ScratchPreview from '../GameTypes/ScratchPreview';
import MemoryPreview from '../GameTypes/MemoryPreview';
import PuzzlePreview from '../GameTypes/PuzzlePreview';
import DicePreview from '../GameTypes/DicePreview';
import GameSizeSelector, { GameSize } from '../configurators/GameSizeSelector';
import GamePositionSelector, { GamePosition } from '../configurators/GamePositionSelector';

interface ModernEditorCanvasProps {
  campaign: any;
  previewDevice: 'desktop' | 'tablet' | 'mobile';
}

const ModernEditorCanvas: React.FC<ModernEditorCanvasProps> = ({
  campaign,
  previewDevice
}) => {
  const [gameSize, setGameSize] = useState<GameSize>('medium');
  const [gamePosition, setGamePosition] = useState<GamePosition>('center');

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
        return (
          <WheelPreview 
            campaign={campaign} 
            config={gameConfig.wheel} 
            gameSize={gameSize}
            gamePosition={gamePosition}
          />
        );
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
              <div className="text-xs mt-1">Position : {gamePosition}</div>
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
        backgroundRepeat: 'no-repeat'
      }
    : { backgroundColor: campaign.design?.background || '#f8fafc' };

  return (
    <div className="h-full flex flex-col">
      {/* Contrôles de configuration */}
      <div className="p-4 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between space-x-6">
          <GameSizeSelector
            selectedSize={gameSize}
            onSizeChange={setGameSize}
            className="flex-1"
          />
          <GamePositionSelector
            selectedPosition={gamePosition}
            onPositionChange={setGamePosition}
            className="flex-1"
          />
        </div>
      </div>

      {/* Zone d'aperçu */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-100">
        <div 
          className="bg-white rounded-lg shadow-lg overflow-hidden relative"
          style={deviceStyles}
        >
          {/* Conteneur avec image de fond complète */}
          <div 
            className="h-full w-full relative flex flex-col"
            style={backgroundStyle}
          >
            {/* Overlay pour améliorer la lisibilité si nécessaire */}
            {campaign.design?.backgroundImage && (
              <div className="absolute inset-0 bg-black/10"></div>
            )}
            
            {/* Contenu par défaut - titre et description */}
            <div className="relative z-10 p-6 text-center">
              <h1 
                className="text-2xl font-bold mb-2"
                style={{ 
                  color: campaign.design?.titleColor || '#000000',
                  fontFamily: campaign.design?.fontFamily || 'Inter'
                }}
              >
                {campaign.screens?.[1]?.title || 'Bienvenue !'}
              </h1>
              <p 
                className="text-gray-600 mb-4"
                style={{ color: campaign.design?.titleColor || '#666666' }}
              >
                {campaign.screens?.[1]?.description || 'Participez à notre jeu et tentez de gagner !'}
              </p>
              <button
                className="px-6 py-3 rounded-lg text-white font-medium"
                style={{ backgroundColor: campaign.design?.buttonColor || '#841b60' }}
              >
                {campaign.screens?.[1]?.buttonText || 'Participer'}
              </button>
            </div>
            
            {/* Zone de jeu repositionnable */}
            <div className="flex-1 relative">
              {renderGamePreview()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernEditorCanvas;
