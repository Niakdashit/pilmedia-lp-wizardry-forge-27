
import React, { useState, useRef } from 'react';
import GameCanvasPreview from '../CampaignEditor/GameCanvasPreview';
import TextElement from './TextElement';
import ImageElement from './ImageElement';
import CanvasHeader from './components/CanvasHeader';
import CanvasFooter from './components/CanvasFooter';
import CanvasBackground from './components/CanvasBackground';
import GridToggle from './components/GridToggle';
import { useCanvasElements } from './hooks/useCanvasElements';

interface ModernEditorCanvasProps {
  campaign: any;
  setCampaign: (updater: (prev: any) => any) => void;
  previewDevice: 'desktop' | 'tablet' | 'mobile';
  gameSize: 'small' | 'medium' | 'large' | 'xlarge';
  gamePosition: 'top' | 'center' | 'bottom' | 'left' | 'right';
}

const ModernEditorCanvas: React.FC<ModernEditorCanvasProps> = ({
  campaign,
  setCampaign,
  previewDevice,
  gameSize,
  gamePosition
}) => {
  const [showGridLines, setShowGridLines] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const {
    selectedElement,
    setSelectedElement,
    customTexts,
    customImages,
    updateTextElement,
    updateImageElement,
    deleteTextElement,
    deleteImageElement,
    getElementDeviceConfig
  } = useCanvasElements(campaign, setCampaign, previewDevice);

  // Enhanced campaign with proper settings propagation and real-time updates
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
      // Ensure custom elements are properly included
      customTexts: customTexts,
      customImages: customImages,
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

  const handleCanvasClick = (e: React.MouseEvent) => {
    // Only deselect if clicking directly on the canvas, not on child elements
    if (e.target === e.currentTarget) {
      setSelectedElement(null);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 p-4">
      <CanvasBackground
        campaign={campaign}
        previewDevice={previewDevice}
        showGridLines={showGridLines}
        onCanvasClick={handleCanvasClick}
        canvasRef={canvasRef}
      >
        <CanvasHeader
          headerBanner={headerBanner}
          headerText={headerText}
          sizeMap={sizeMap}
        />

        <div className="flex-1 flex relative">
          <GameCanvasPreview
            campaign={enhancedCampaign}
            className="w-full h-full"
            key={`preview-${gameSize}-${gamePosition}-${campaign.buttonConfig?.color}-${JSON.stringify(campaign.gameConfig?.[campaign.type])}-${JSON.stringify(customTexts)}-${JSON.stringify(customImages)}`}
            previewDevice={previewDevice}
          />
          
          {/* Custom Text Elements */}
          {customTexts.map((customText: any) => (
            customText?.enabled && (
              <TextElement
                key={`text-${customText.id}-${previewDevice}`}
                element={customText}
                isSelected={selectedElement?.type === 'text' && selectedElement?.id === customText.id}
                onSelect={() => setSelectedElement({ type: 'text', id: customText.id })}
                onUpdate={(updates) => updateTextElement(customText.id, updates)}
                onDelete={() => deleteTextElement(customText.id)}
                containerRef={canvasRef}
                sizeMap={sizeMap}
                getElementDeviceConfig={getElementDeviceConfig}
              />
            )
          ))}

          {/* Custom Image Elements */}
          {customImages.map((customImage: any) => (
            <ImageElement
              key={`image-${customImage.id}-${previewDevice}`}
              element={customImage}
              isSelected={selectedElement?.type === 'image' && selectedElement?.id === customImage.id}
              onSelect={() => setSelectedElement({ type: 'image', id: customImage.id })}
              onUpdate={(updates) => updateImageElement(customImage.id, updates)}
              onDelete={() => deleteImageElement(customImage.id)}
              containerRef={canvasRef}
              getElementDeviceConfig={getElementDeviceConfig}
            />
          ))}
        </div>

        <CanvasFooter
          footerBanner={footerBanner}
          footerText={footerText}
          sizeMap={sizeMap}
        />

        <GridToggle
          showGridLines={showGridLines}
          onToggle={() => setShowGridLines(!showGridLines)}
        />
      </CanvasBackground>
    </div>
  );
};

export default ModernEditorCanvas;
