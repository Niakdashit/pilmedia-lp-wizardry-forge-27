import React from 'react';
import FunnelUnlockedGame from '../../funnels/FunnelUnlockedGame';

interface MobilePreviewProps {
  campaign: any;
  previewMode: 'mobile' | 'tablet';
}

const DEVICE_SPECS = {
  mobile: { width: 375, height: 667 },
  tablet: { width: 768, height: 1024 }
};

const MobilePreview: React.FC<MobilePreviewProps> = ({ campaign, previewMode }) => {
  const specs = DEVICE_SPECS[previewMode] || DEVICE_SPECS.mobile;

  return (
    <div className="flex justify-center items-center w-full h-full bg-transparent">
      <div
        style={{
          width: specs.width,
          height: specs.height,
          borderRadius: 32,
          border: '8px solid #111',
          boxShadow: '0 6px 36px 0 rgba(10,10,40,0.10)',
          background: campaign.design?.background || '#ebf4f7',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Tout le contenu funnel/modal reste contenu dans ce device */}
        <div style={{ width: '100%', height: '100%', overflow: 'auto', position: 'relative' }}>
          <FunnelUnlockedGame campaign={campaign} previewMode={previewMode} />
        </div>
      </div>
    </div>
  );
};

export default MobilePreview;
