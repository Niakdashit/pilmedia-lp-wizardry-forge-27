import React, { useState, useRef } from 'react';
import { Plus } from 'lucide-react';
import GameCanvasPreview from '../CampaignEditor/GameCanvasPreview';
import TextElement from './TextElement';
import ImageElement from './ImageElement';
import CanvasHeader from './components/CanvasHeader';
import CanvasFooter from './components/CanvasFooter';
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
  const [showAddMenu, setShowAddMenu] = useState(false);
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
    getElementDeviceConfig,
    addTextElement,
    addImageElement
  } = useCanvasElements(campaign, setCampaign, previewDevice);

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
    if (e.target === e.currentTarget) {
      setSelectedElement(null);
      setShowAddMenu(false);
    }
  };

  const handleAddText = () => {
    console.log('Ajout de texte déclenché');
    addTextElement();
    setShowAddMenu(false);
  };

  const handleAddImage = () => {
    console.log('Ajout d\'image déclenché');
    addImageElement();
    setShowAddMenu(false);
  };

  const toggleAddMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Toggle menu:', !showAddMenu);
    setShowAddMenu(!showAddMenu);
  };

  // Fixed dimensions for consistent preview size across all tabs
  const FIXED_CANVAS_WIDTH = 900;
  const FIXED_CANVAS_HEIGHT = 700;

  return (
    <div className="w-full h-full flex items-center justify-center p-4 md:p-6 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      {/* Canvas container with fixed dimensions */}
      <div 
        className="bg-white rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden relative"
        style={{
          width: `${FIXED_CANVAS_WIDTH}px`,
          height: `${FIXED_CANVAS_HEIGHT}px`,
          minWidth: `${FIXED_CANVAS_WIDTH}px`,
          minHeight: `${FIXED_CANVAS_HEIGHT}px`,
          maxWidth: `${FIXED_CANVAS_WIDTH}px`,
          maxHeight: `${FIXED_CANVAS_HEIGHT}px`
        }}
      >
        {/* Canvas background */}
        <div
          ref={canvasRef}
          onClick={handleCanvasClick}
          className="relative w-full h-full overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${campaign.design?.background || '#f8fafc'} 0%, ${campaign.design?.background || '#f8fafc'}88 100%)`,
            backgroundImage: showGridLines ? 
              'radial-gradient(circle, rgba(147, 197, 253, 0.2) 1px, transparent 1px)' : 'none',
            backgroundSize: showGridLines ? '20px 20px' : 'auto'
          }}
        >
          <CanvasHeader
            headerBanner={headerBanner}
            headerText={headerText}
            sizeMap={sizeMap}
          />

          <div className="flex-1 flex relative h-full">
            <GameCanvasPreview
              campaign={{
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
              }}
              gameSize={gameSize}
              className="w-full h-full"
              key={`preview-${gameSize}-${gamePosition}-${campaign.buttonConfig?.color}-${JSON.stringify(campaign.gameConfig?.[campaign.type])}`}
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
        </div>

        {/* Floating action button - Canva style */}
        <div className="absolute bottom-8 right-8" style={{ zIndex: 50 }}>
          <div className="relative">
            {/* Add menu */}
            {showAddMenu && (
              <div
                className="absolute bottom-16 right-0 bg-white rounded-2xl shadow-2xl border border-gray-200/50 p-2 min-w-48"
                style={{ zIndex: 60 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={handleAddText}
                  className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">T</span>
                  </div>
                  <span className="font-medium text-gray-900">Ajouter du texte</span>
                </button>
                <button
                  onClick={handleAddImage}
                  className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-600 font-semibold text-sm">📷</span>
                  </div>
                  <span className="font-medium text-gray-900">Ajouter une image</span>
                </button>
              </div>
            )}

            {/* Main add button */}
            <button
              onClick={toggleAddMenu}
              className="w-14 h-14 bg-gradient-to-r from-[#841b60] to-[#6d164f] hover:from-[#6d164f] hover:to-[#841b60] text-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center transform hover:scale-105"
              type="button"
            >
              <Plus className={`w-6 h-6 transition-transform duration-300 ${showAddMenu ? 'rotate-45' : ''}`} />
            </button>
          </div>
        </div>

        {/* Grid toggle */}
        <div className="absolute top-6 right-6" style={{ zIndex: 20 }}>
          <GridToggle
            showGridLines={showGridLines}
            onToggle={() => setShowGridLines(!showGridLines)}
          />
        </div>
      </div>
    </div>
  );
};

export default ModernEditorCanvas;
