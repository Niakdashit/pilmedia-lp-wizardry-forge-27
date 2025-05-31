
import React from 'react';
import WheelPreview from '../GameTypes/WheelPreview';
import { getDefaultGameConfig } from '../../utils/campaignTypes';

interface ModernEditorCanvasProps {
  campaign: any;
  previewDevice: 'desktop' | 'tablet' | 'mobile';
  gameSize: 'small' | 'medium' | 'large' | 'xlarge';
  gamePosition: 'top' | 'center' | 'bottom' | 'left' | 'right';
}

const ModernEditorCanvas: React.FC<ModernEditorCanvasProps> = ({
  campaign,
  previewDevice,
  gameSize,
  gamePosition
}) => {
  const design = campaign.design || {};
  const gameConfig = campaign.gameConfig || getDefaultGameConfig(campaign.type || 'wheel');
  
  // Get text fields for each zone
  const headerTexts = design.headerTexts || [];
  const centerTexts = design.centerTexts || [];
  const footerTexts = design.footerTexts || [];

  const getDeviceDimensions = () => {
    switch (previewDevice) {
      case 'mobile':
        return { width: 375, height: 667 };
      case 'tablet':
        return { width: 768, height: 1024 };
      default:
        return { width: 1200, height: 800 };
    }
  };

  const dimensions = getDeviceDimensions();

  const renderTextFields = (textFields: any[], zone: string) => {
    return textFields.map((field: any) => {
      const sizeClasses = {
        small: 'text-sm',
        medium: 'text-base',
        large: 'text-xl'
      };

      const positionClasses = {
        top: 'items-start',
        center: 'items-center',
        bottom: 'items-end',
        left: 'justify-start',
        right: 'justify-end'
      };

      return (
        <div
          key={field.id}
          className={`absolute z-20 flex ${positionClasses[field.position]} pointer-events-none`}
          style={{
            ...(field.position === 'top' && { top: '10px', left: '10px', right: '10px' }),
            ...(field.position === 'bottom' && { bottom: '10px', left: '10px', right: '10px' }),
            ...(field.position === 'center' && { 
              top: '50%', 
              left: '10px', 
              right: '10px',
              transform: 'translateY(-50%)' 
            }),
            ...(field.position === 'left' && { 
              top: '10px', 
              bottom: '10px', 
              left: '10px',
              width: '200px'
            }),
            ...(field.position === 'right' && { 
              top: '10px', 
              bottom: '10px', 
              right: '10px',
              width: '200px'
            })
          }}
        >
          <div
            className={`${sizeClasses[field.size]} font-medium text-center break-words max-w-full`}
            style={{
              color: field.color,
              ...(field.showFrame && {
                backgroundColor: field.frameColor,
                border: `2px solid ${field.frameBorderColor}`,
                borderRadius: '8px',
                padding: '8px 12px'
              })
            }}
          >
            {field.text}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="h-full flex items-center justify-center p-8">
      <div className="relative border border-gray-300 rounded-lg shadow-lg bg-white overflow-hidden">
        {/* Device Frame */}
        <div
          className="relative overflow-hidden"
          style={{
            width: dimensions.width,
            height: dimensions.height,
            background: design.backgroundImage 
              ? `url(${design.backgroundImage}) center/cover` 
              : design.background || '#f8fafc'
          }}
        >
          {/* Header Text Fields */}
          {renderTextFields(headerTexts, 'header')}
          
          {/* Center Text Fields */}
          {renderTextFields(centerTexts, 'center')}
          
          {/* Footer Text Fields */}
          {renderTextFields(footerTexts, 'footer')}

          {/* Game Component */}
          {campaign.type === 'wheel' && (
            <WheelPreview
              campaign={campaign}
              config={gameConfig}
              gameSize={gameSize}
              gamePosition={gamePosition}
              previewDevice={previewDevice}
            />
          )}

          {/* Device indicator */}
          <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
            {previewDevice === 'desktop' ? 'Bureau' : previewDevice === 'tablet' ? 'Tablette' : 'Mobile'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernEditorCanvas;
