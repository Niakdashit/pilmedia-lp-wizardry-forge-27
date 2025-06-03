
import React from 'react';
import GameCanvasPreview from '../CampaignEditor/GameCanvasPreview';

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
  const getCanvasStyle = () => {
    const baseStyle = {
      width: '100%',
      height: '100%',
      backgroundColor: campaign.design?.background || '#f8fafc',
      transition: 'all 0.3s ease',
    };

    switch (previewDevice) {
      case 'tablet':
        return {
          ...baseStyle,
          maxWidth: '768px',
          maxHeight: '1024px',
          margin: '0 auto',
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          overflow: 'hidden'
        };
      case 'mobile':
        return {
          ...baseStyle,
          maxWidth: '375px',
          maxHeight: '812px',
          margin: '0 auto',
          border: '1px solid #e5e7eb',
          borderRadius: '20px',
          overflow: 'hidden'
        };
      default:
        return baseStyle;
    }
  };

  // Créer une copie de la campagne avec les paramètres de taille et position
  const enhancedCampaign = {
    ...campaign,
    gameSize,
    gamePosition,
    // S'assurer que les couleurs personnalisées sont incluses
    gameConfig: {
      ...campaign.gameConfig,
      [campaign.type]: {
        ...campaign.gameConfig?.[campaign.type],
        // Garder les couleurs existantes si elles sont définies
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

  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 p-4">
      <div style={getCanvasStyle()}>
        <GameCanvasPreview 
          campaign={enhancedCampaign}
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default ModernEditorCanvas;
