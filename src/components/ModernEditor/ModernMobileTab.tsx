import React from 'react';
import CampaignMobile from '../CampaignEditor/CampaignMobile';

interface ModernMobileTabProps {
  campaign: any;
  setCampaign: React.Dispatch<React.SetStateAction<any>>;
}

const ModernMobileTab: React.FC<ModernMobileTabProps> = ({ campaign, setCampaign }) => {
  return <CampaignMobile campaign={campaign} setCampaign={setCampaign} />;
};

export default ModernMobileTab;
