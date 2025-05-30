
import React from 'react';
import { TabType } from '../NewCampaignEditor';
import GeneralTab from './tabs/GeneralTab';
import DesignTab from './tabs/DesignTab';
import ContentTab from './tabs/ContentTab';
import PreviewTab from './tabs/PreviewTab';

interface EditorContentProps {
  activeTab: TabType;
  campaign: any;
  setCampaign: React.Dispatch<React.SetStateAction<any>>;
}

const EditorContent: React.FC<EditorContentProps> = ({
  activeTab,
  campaign,
  setCampaign
}) => {
  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return <GeneralTab campaign={campaign} setCampaign={setCampaign} />;
      case 'design':
        return <DesignTab campaign={campaign} setCampaign={setCampaign} />;
      case 'content':
        return <ContentTab campaign={campaign} setCampaign={setCampaign} />;
      case 'preview':
        return <PreviewTab campaign={campaign} />;
      default:
        return <GeneralTab campaign={campaign} setCampaign={setCampaign} />;
    }
  };

  return (
    <div className="p-6">
      {renderTabContent()}
    </div>
  );
};

export default EditorContent;
