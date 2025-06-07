
import React from 'react';
import CampaignPreview from '../CampaignEditor/CampaignPreview';

interface ModernEditorCanvasProps {
  campaign: any;
  previewDevice: 'desktop' | 'tablet' | 'mobile';
  gameSize: 'small' | 'medium' | 'large' | 'xlarge';
  gamePosition: 'top' | 'center' | 'bottom' | 'left' | 'right';
  onFreeTextZonesChange?: (zones: any[]) => void;
}

const ModernEditorCanvas: React.FC<ModernEditorCanvasProps> = ({
  campaign,
  previewDevice
}) => {
  const containerStyle: React.CSSProperties = previewDevice === 'mobile' 
    ? {
        maxWidth: '375px',
        maxHeight: '812px',
        margin: '0 auto',
        border: '1px solid #e5e7eb',
        borderRadius: '12px',
        overflow: 'hidden',
        backgroundImage: campaign.design?.backgroundImage ? `url(${campaign.design.backgroundImage})` : undefined,
        width: '100%',
        height: '100%',
        backgroundColor: campaign.design?.background || '#f8fafc',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'all 0.3s ease'
      }
    : {
        maxWidth: '1080px',
        maxHeight: '1920px',
        margin: '0 auto',
        overflow: 'hidden',
        position: 'relative' as const,
        backgroundImage: campaign.design?.backgroundImage ? `url(${campaign.design.backgroundImage})` : undefined,
        width: '100%',
        height: '100%',
        backgroundColor: campaign.design?.background || '#f8fafc',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'all 0.3s ease'
      };

  return (
    <div style={containerStyle}>
      <CampaignPreview campaign={campaign} previewDevice={previewDevice} />
    </div>
  );
};

export default ModernEditorCanvas;
