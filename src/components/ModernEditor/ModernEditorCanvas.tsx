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
        return <WheelPreview key={key} campaign={campaign} config={gameConfig.wheel} gameSize={gameSize} gamePosition={gamePosition} previewDevice={previewDevice} />;
      case 'scratch':
        return <ScratchPreview key={key} config={gameConfig.scratch} />;
      case 'memory':
        return <MemoryPreview key={key} config={gameConfig.memory} />;
      case 'puzzle':
        return <PuzzlePreview key={key} config={gameConfig.puzzle} />;
      case 'dice':
        return <DicePreview key={key} config={gameConfig.dice} />;
      case 'jackpot':
        return <div key={key} className="p-4 border-2 border-dashed border-gray-300 rounded-lg">
            <div className="text-center text-gray-500">
              <div className="text-sm">Aperçu Jackpot</div>
              <div className="text-xs mt-1">🎰 Machine à sous</div>
            </div>
          </div>;
      default:
        return <div key={key} className="p-4 border-2 border-dashed border-gray-300 rounded-lg">
            <div className="text-center text-gray-500">
              <div className="text-sm">Aperçu du jeu : {campaign.type}</div>
              <div className="text-xs mt-1">Position : {gamePosition}</div>
            </div>
          </div>;
    }
  };
  const renderHeaderBanner = () => {
    const headerBanner = campaign.design?.headerBanner;
    if (!headerBanner?.enabled || !headerBanner?.image) {
      return null;
    }
    return <div className="w-full bg-cover bg-center bg-no-repeat" style={{
      backgroundImage: `url(${headerBanner.image})`,
      height: headerBanner.height || '120px'
    }}>
        {headerBanner.overlay && <div className="w-full h-full bg-black/20"></div>}
      </div>;
  };
  const renderFooterBanner = () => {
    const footerBanner = campaign.design?.footerBanner;
    if (!footerBanner?.enabled || !footerBanner?.image) {
      return null;
    }
    return <div className="w-full bg-cover bg-center bg-no-repeat" style={{
      backgroundImage: `url(${footerBanner.image})`,
      height: footerBanner.height || '120px'
    }}>
        {footerBanner.overlay && <div className="w-full h-full bg-black/20"></div>}
      </div>;
  };
  const renderHeaderCustomText = () => {
    const headerText = campaign.design?.headerText;
    if (!headerText?.enabled || !headerText?.text) {
      return null;
    }
    const getTextSize = () => {
      switch (headerText.size) {
        case 'small':
          return 'text-sm';
        case 'large':
          return 'text-2xl';
        default:
          return 'text-lg';
      }
    };
    const frameStyles = headerText.showFrame ? {
      backgroundColor: headerText.frameColor || '#ffffff',
      border: `1px solid ${headerText.frameBorderColor || '#e5e7eb'}`,
      borderRadius: '8px',
      padding: '12px 16px',
      margin: '0 16px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    } : {
      padding: '12px 16px'
    };
    return <div className="w-full flex justify-center" style={frameStyles}>
        <p style={{
        color: headerText.color || '#000000',
        fontFamily: campaign.design?.fontFamily || 'Inter'
      }} className="my-[20px] px-[42px] text-center text-xl">
          {headerText.text}
        </p>
      </div>;
  };
  const renderFooterCustomText = () => {
    const footerText = campaign.design?.footerText;
    if (!footerText?.enabled || !footerText?.text) {
      return null;
    }
    const getTextSize = () => {
      switch (footerText.size) {
        case 'small':
          return 'text-sm';
        case 'large':
          return 'text-2xl';
        default:
          return 'text-lg';
      }
    };
    const frameStyles = footerText.showFrame ? {
      backgroundColor: footerText.frameColor || '#ffffff',
      border: `1px solid ${footerText.frameBorderColor || '#e5e7eb'}`,
      borderRadius: '8px',
      padding: '12px 16px',
      margin: '0 16px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    } : {
      padding: '12px 16px'
    };
    return <div className="w-full flex justify-center" style={frameStyles}>
        <p className={`${getTextSize()} font-medium text-center`} style={{
        color: footerText.color || '#000000',
        fontFamily: campaign.design?.fontFamily || 'Inter'
      }}>
          {footerText.text}
        </p>
      </div>;
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
    return <div className={getPositionStyles()} style={frameStyles}>
        <p className={`${getTextSize()} font-medium text-center`} style={{
        color: customText.color || '#000000',
        fontFamily: campaign.design?.fontFamily || 'Inter'
      }}>
          {customText.text}
        </p>
      </div>;
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
  return <div className="h-full flex flex-col">
      {/* Zone d'aperçu */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-100">
        <div ref={canvasRef} className="bg-white rounded-lg shadow-lg overflow-hidden relative" style={deviceStyles}>
          {/* Conteneur avec image de fond complète */}
          <div className="h-full w-full relative flex flex-col" style={backgroundStyle}>
            {/* Overlay pour améliorer la lisibilité si nécessaire */}
            {campaign.design?.backgroundImage && <div className="absolute inset-0 bg-black/10"></div>}
            
            {/* Header Section */}
            <div className="relative z-10 w-full">
              {renderHeaderBanner()}
              {renderHeaderCustomText()}
            </div>
            
            {/* Texte personnalisé (legacy positioning) */}
            {renderCustomText()}
            
            {/* Zone de jeu repositionnable */}
            <div className="flex-1 relative">
              {renderGamePreview()}
            </div>

            {/* Footer Section */}
            <div className="relative z-10 w-full">
              {renderFooterCustomText()}
              {renderFooterBanner()}
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default ModernEditorCanvas;