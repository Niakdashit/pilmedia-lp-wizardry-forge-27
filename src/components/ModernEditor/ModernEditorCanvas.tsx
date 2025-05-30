
import React, { useEffect, useRef } from 'react';
import WheelPreview from '../GameTypes/WheelPreview';
import ScratchPreview from '../GameTypes/ScratchPreview';
import MemoryPreview from '../GameTypes/MemoryPreview';
import PuzzlePreview from '../GameTypes/PuzzlePreview';
import DicePreview from '../GameTypes/DicePreview';
import { GameSize } from '../configurators/GameSizeSelector';
import { GamePosition } from '../configurators/GamePositionSelector';

interface ModernEditorCanvasProps {
  campaign: any;
  previewDevice: 'desktop' | 'tablet' | 'mobile';
  gameSize: GameSize;
  gamePosition: GamePosition;
}

const ModernEditorCanvas: React.FC<ModernEditorCanvasProps> = ({
  campaign,
  previewDevice,
  gameSize,
  gamePosition
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  // Force re-render when game size or position changes
  useEffect(() => {
    if (canvasRef.current) {
      // Trigger a reflow to ensure changes are applied
      canvasRef.current.style.display = 'none';
      canvasRef.current.offsetHeight; // Trigger reflow
      canvasRef.current.style.display = '';
    }
  }, [gameSize, gamePosition]);

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
    const key = `${campaign.type}-${gameSize}-${gamePosition}-${Date.now()}`;
    
    switch (campaign.type) {
      case 'wheel':
        return (
          <WheelPreview
            key={key}
            campaign={campaign}
            config={gameConfig.wheel}
            gameSize={gameSize}
            gamePosition={gamePosition}
          />
        );
      case 'scratch':
        return <ScratchPreview key={key} config={gameConfig.scratch} />;
      case 'memory':
        return <MemoryPreview key={key} config={gameConfig.memory} />;
      case 'puzzle':
        return <PuzzlePreview key={key} config={gameConfig.puzzle} />;
      case 'dice':
        return <DicePreview key={key} config={gameConfig.dice} />;
      case 'jackpot':
        return (
          <div key={key} className="p-4 border-2 border-dashed border-gray-300 rounded-lg">
            <div className="text-center text-gray-500">
              <div className="text-sm">Aperçu Jackpot</div>
              <div className="text-xs mt-1">🎰 Machine à sous</div>
            </div>
          </div>
        );
      default:
        return (
          <div key={key} className="p-4 border-2 border-dashed border-gray-300 rounded-lg">
            <div className="text-center text-gray-500">
              <div className="text-sm">Aperçu du jeu : {campaign.type}</div>
              <div className="text-xs mt-1">Position : {gamePosition}</div>
            </div>
          </div>
        );
    }
  };

  const renderCustomText = () => {
    const customText = campaign.design?.customText;
    if (!customText?.enabled || !customText?.text) {
      return null;
    }

    const getTextSize = () => {
      switch (customText.size) {
        case 'small':
          return 'text-sm';
        case 'large':
          return 'text-2xl';
        default:
          return 'text-lg';
      }
    };

    const getPositionStyles = () => {
      const baseStyles = 'absolute z-20 max-w-md';
      switch (customText.position) {
        case 'top':
          return `${baseStyles} top-4 left-1/2 transform -translate-x-1/2`;
        case 'bottom':
          return `${baseStyles} bottom-4 left-1/2 transform -translate-x-1/2`;
        case 'left':
          return `${baseStyles} left-4 top-1/2 transform -translate-y-1/2`;
        case 'right':
          return `${baseStyles} right-4 top-1/2 transform -translate-y-1/2`;
        default:
          // center
          return `${baseStyles} top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`;
      }
    };

    const frameStyles = customText.showFrame ? {
      backgroundColor: customText.frameColor || '#ffffff',
      border: `1px solid ${customText.frameBorderColor || '#e5e7eb'}`,
      borderRadius: '8px',
      padding: '12px 16px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    } : {};

    return (
      <div className={getPositionStyles()} style={frameStyles}>
        <p
          className={`${getTextSize()} font-medium text-center`}
          style={{
            color: customText.color || '#000000',
            fontFamily: campaign.design?.fontFamily || 'Inter'
          }}
        >
          {customText.text}
        </p>
      </div>
    );
  };

  const deviceStyles = getDeviceStyles();
  const backgroundStyle = campaign.design?.backgroundImage ? {
    backgroundImage: `url(${campaign.design.backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  } : {
    backgroundColor: campaign.design?.background || '#f8fafc'
  };

  return (
    <div className="h-full flex flex-col">
      {/* Zone d'aperçu */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-100">
        <div 
          ref={canvasRef}
          className="bg-white rounded-lg shadow-lg overflow-hidden relative" 
          style={deviceStyles}
        >
          {/* Conteneur avec image de fond complète */}
          <div className="h-full w-full relative flex flex-col" style={backgroundStyle}>
            {/* Overlay pour améliorer la lisibilité si nécessaire */}
            {campaign.design?.backgroundImage && (
              <div className="absolute inset-0 bg-black/10"></div>
            )}
            
            {/* Texte personnalisé */}
            {renderCustomText()}
            
            {/* Contenu par défaut - titre et description */}
            <div className="relative z-10 p-6 text-center">
              
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
