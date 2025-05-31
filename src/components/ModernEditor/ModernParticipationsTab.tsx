
import React from 'react';
import ParticipationsViewer from '../campaign/ParticipationsViewer';

interface ModernParticipationsTabProps {
  campaignId: string;
  campaignName: string;
}

const ModernParticipationsTab: React.FC<ModernParticipationsTabProps> = ({ 
  campaignId, 
  campaignName 
}) => {
  return (
    <div className="p-6">
      <ParticipationsViewer 
        campaignId={campaignId} 
        campaignName={campaignName} 
      />
    </div>
  );
};

export default ModernParticipationsTab;
