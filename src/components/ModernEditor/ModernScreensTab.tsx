
import React from 'react';
import CampaignScreens from '../CampaignEditor/CampaignScreens';

interface ModernScreensTabProps {
  campaign: any;
  setCampaign: React.Dispatch<React.SetStateAction<any>>;
}

const ModernScreensTab: React.FC<ModernScreensTabProps> = ({ 
  campaign, 
  setCampaign 
}) => {
  return (
    <div className="p-6">
      <CampaignScreens campaign={campaign} setCampaign={setCampaign} />
    </div>
  );
};

export default ModernScreensTab;
