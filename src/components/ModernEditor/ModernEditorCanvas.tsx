import React, { useState, useRef, useCallback } from 'react';
import GameCanvasPreview from '../CampaignEditor/GameCanvasPreview';
import TextElement from './TextElement';
import ImageElement from './ImageElement';

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
  const [selectedElement, setSelectedElement] = useState<{type: 'text' | 'image', id: number} | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const getCanvasStyle = () => {
    const baseStyle = {
      width: '100%',
      height: '100%',
      backgroundColor: campaign.design?.background || '#f8fafc',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      transition: 'all 0.3s ease',
    };

    // Déterminer quelle image de fond utiliser
    let backgroundImage;
    if (previewDevice === 'mobile' && campaign.design?.mobileBackgroundImage) {
      backgroundImage = `url(${campaign.design.mobileBackgroundImage})`;
    } else if (previewDevice !== 'mobile' && campaign.design?.backgroundImage) {
      backgroundImage = `url(${campaign.design.backgroundImage})`;
    }

    const styleWithBackground = {
      ...baseStyle,
      backgroundImage,
    };

    switch (previewDevice) {
      case 'tablet':
        return {
          ...styleWithBackground,
          maxWidth: '768px',
          maxHeight: '1024px',
          margin: '0 auto',
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          overflow: 'hidden'
        };
      case 'mobile':
        return {
          ...styleWithBackground,
          maxWidth: '375px',
          maxHeight: '812px',
          margin: '0 auto',
          border: '1px solid #e5e7eb',
          borderRadius: '20px',
          overflow: 'hidden'
        };
      default:
        return styleWithBackground;
    }
  };

  // Enhanced campaign with proper settings propagation
  const enhancedCampaign = {
    ...campaign,
    gameSize,
    gamePosition,
    buttonConfig: {
      ...campaign.buttonConfig,
      text: campaign.buttonConfig?.text || campaign.gameConfig?.[campaign.type]?.buttonLabel || 'Jouer',
      color: campaign.buttonConfig?.color || campaign.gameConfig?.[campaign.type]?.buttonColor || '#841b60'
    },
    design: {
      ...campaign.design,
      buttonColor: campaign.buttonConfig?.color || campaign.design?.buttonColor || '#841b60',
      titleColor: campaign.design?.titleColor || '#000000',
      background: campaign.design?.background || '#f8fafc'
    },
    gameConfig: {
      ...campaign.gameConfig,
      [campaign.type]: {
        ...campaign.gameConfig?.[campaign.type],
        buttonLabel: campaign.buttonConfig?.text || campaign.gameConfig?.[campaign.type]?.buttonLabel || 'Jouer',
        buttonColor: campaign.buttonConfig?.color || campaign.gameConfig?.[campaign.type]?.buttonColor || '#841b60',
        containerBackgroundColor: campaign.gameConfig?.[campaign.type]?.containerBackgroundColor,
        backgroundColor: campaign.gameConfig?.[campaign.type]?.backgroundColor,
        borderColor: campaign.gameConfig?.[campaign.type]?.borderColor,
        borderWidth: campaign.gameConfig?.[campaign.type]?.borderWidth,
        slotBorderColor: campaign.gameConfig?.[campaign.type]?.slotBorderColor,
        slotBorderWidth: campaign.gameConfig?.[campaign.type]?.slotBorderWidth,
        slotBackgroundColor: campaign.gameConfig?.[campaign.type]?.slotBackgroundColor,
      }
    }
  };

  const headerBanner = campaign.design?.headerBanner;
  const footerBanner = campaign.design?.footerBanner;
  const headerText = campaign.design?.headerText;
  const footerText = campaign.design?.footerText;
  const customTexts = campaign.design?.customTexts || [];
  const customImages = campaign.design?.customImages || [];

  const sizeMap: Record<string, string> = {
    xs: '10px',
    sm: '12px',
    base: '14px',
    lg: '16px',
    xl: '18px',
    '2xl': '20px',
    '3xl': '24px',
    '4xl': '28px',
    '5xl': '32px',
    '6xl': '36px',
    '7xl': '48px',
    '8xl': '60px',
    '9xl': '72px'
  };

  const updateTextElement = useCallback((id: number, updates: any) => {
    const updatedCampaign = {
      ...campaign,
      design: {
        ...campaign.design,
        customTexts: customTexts.map((text: any) => 
          text.id === id ? { ...text, ...updates } : text
        )
      }
    };
    Object.assign(campaign, updatedCampaign);
  }, [campaign, customTexts]);

  const updateImageElement = useCallback((id: number, updates: any) => {
    const updatedCampaign = {
      ...campaign,
      design: {
        ...campaign.design,
        customImages: customImages.map((img: any) => 
          img.id === id ? { ...img, ...updates } : img
        )
      }
    };
    Object.assign(campaign, updatedCampaign);
  }, [campaign, customImages]);

  const deleteTextElement = useCallback((id: number) => {
    const updatedCampaign = {
      ...campaign,
      design: {
        ...campaign.design,
        customTexts: customTexts.filter((text: any) => text.id !== id)
      }
    };
    Object.assign(campaign, updatedCampaign);
    setSelectedElement(null);
  }, [campaign, customTexts]);

  const deleteImageElement = useCallback((id: number) => {
    const updatedCampaign = {
      ...campaign,
      design: {
        ...campaign.design,
        customImages: customImages.filter((img: any) => img.id !== id)
      }
    };
    Object.assign(campaign, updatedCampaign);
    setSelectedElement(null);
  }, [campaign, customImages]);

  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 p-4">
      <div 
        ref={canvasRef}
        style={getCanvasStyle()} 
        className="flex flex-col h-full w-full relative"
        onClick={() => setSelectedElement(null)}
      >
        {headerBanner?.enabled && (
          <div
            className="relative w-full"
            style={{
              backgroundImage: `url(${headerBanner.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: headerBanner.height || '120px'
            }}
          >
            {headerBanner.overlay && (
              <div className="absolute inset-0 bg-black opacity-40" />
            )}
            {headerText?.enabled && (
              <div
                className="relative w-full text-center flex items-center justify-center h-full"
                style={{
                  color: headerText.color,
                  fontSize: sizeMap[headerText.size] || '1rem',
                  ...(headerText.showFrame
                    ? {
                        backgroundColor: headerText.frameColor,
                        border: `1px solid ${headerText.frameBorderColor}`,
                        padding: '4px 8px',
                        borderRadius: '4px'
                      }
                    : {})
                }}
              >
                {headerText.text}
              </div>
            )}
          </div>
        )}

        <div className="flex-1 flex relative">
          <GameCanvasPreview
            campaign={enhancedCampaign}
            className="w-full h-full"
            key={`preview-${gameSize}-${gamePosition}-${campaign.buttonConfig?.color}-${JSON.stringify(campaign.gameConfig?.[campaign.type])}`}
            previewDevice={previewDevice}
          />
          
          {/* Custom Text Elements */}
          {customTexts.map((customText: any) => (
            customText?.enabled && (
              <TextElement
                key={customText.id}
                element={customText}
                isSelected={selectedElement?.type === 'text' && selectedElement?.id === customText.id}
                onSelect={() => setSelectedElement({ type: 'text', id: customText.id })}
                onUpdate={(updates) => updateTextElement(customText.id, updates)}
                onDelete={() => deleteTextElement(customText.id)}
                containerRef={canvasRef}
                sizeMap={sizeMap}
              />
            )
          ))}

          {/* Custom Image Elements */}
          {customImages.map((customImage: any) => (
            <ImageElement
              key={customImage.id}
              element={customImage}
              isSelected={selectedElement?.type === 'image' && selectedElement?.id === customImage.id}
              onSelect={() => setSelectedElement({ type: 'image', id: customImage.id })}
              onUpdate={(updates) => updateImageElement(customImage.id, updates)}
              onDelete={() => deleteImageElement(customImage.id)}
              containerRef={canvasRef}
            />
          ))}
        </div>

        {footerBanner?.enabled && (
          <div
            className="relative w-full"
            style={{
              backgroundImage: `url(${footerBanner.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: footerBanner.height || '120px'
            }}
          >
            {footerBanner.overlay && (
              <div className="absolute inset-0 bg-black opacity-40" />
            )}
            {footerText?.enabled && (
              <div
                className="relative w-full text-center flex items-center justify-center h-full"
                style={{
                  color: footerText.color,
                  fontSize: sizeMap[footerText.size] || '1rem',
                  ...(footerText.showFrame
                    ? {
                        backgroundColor: footerText.frameColor,
                        border: `1px solid ${footerText.frameBorderColor}`,
                        padding: '4px 8px',
                        borderRadius: '4px'
                      }
                    : {})
                }}
              >
                {footerText.text}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModernEditorCanvas;
