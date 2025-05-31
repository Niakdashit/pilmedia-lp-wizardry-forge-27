
import React from 'react';
import CampaignPreview from '../CampaignEditor/CampaignPreview';

interface ModernEditorCanvasProps {
  campaign: any;
}

const ModernEditorCanvas: React.FC<ModernEditorCanvasProps> = ({
  campaign
}) => {
  return (
    <div className="h-full bg-gray-100 p-6">
      <div className="h-full bg-white rounded-lg shadow-sm overflow-hidden">
        <CampaignPreview campaign={campaign} />
      </div>
    </div>
  );
};

export default ModernEditorCanvas;
