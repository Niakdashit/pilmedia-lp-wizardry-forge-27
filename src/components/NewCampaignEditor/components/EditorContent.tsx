
import React from 'react';
import GeneralSection from './sections/GeneralSection';
import GameSection from './sections/GameSection';
import DesignSection from './sections/DesignSection';
import LayoutSection from './sections/LayoutSection';
import MobileSection from './sections/MobileSection';
import FormSection from './sections/FormSection';
import AnalyticsSection from './sections/AnalyticsSection';

interface EditorContentProps {
  activeSection: string;
  campaign: any;
  setCampaign: React.Dispatch<React.SetStateAction<any>>;
}

const EditorContent: React.FC<EditorContentProps> = ({
  activeSection,
  campaign,
  setCampaign
}) => {
  const renderContent = () => {
    switch (activeSection) {
      case 'general':
        return <GeneralSection campaign={campaign} setCampaign={setCampaign} />;
      case 'game':
        return <GameSection campaign={campaign} setCampaign={setCampaign} />;
      case 'design':
        return <DesignSection campaign={campaign} setCampaign={setCampaign} />;
      case 'layout':
        return <LayoutSection campaign={campaign} setCampaign={setCampaign} />;
      case 'mobile':
        return <MobileSection campaign={campaign} setCampaign={setCampaign} />;
      case 'form':
        return <FormSection campaign={campaign} setCampaign={setCampaign} />;
      case 'analytics':
        return <AnalyticsSection campaign={campaign} setCampaign={setCampaign} />;
      default:
        return <GeneralSection campaign={campaign} setCampaign={setCampaign} />;
    }
  };

  return (
    <main className="flex-1 overflow-y-auto bg-gray-50">
      <div className="max-w-4xl mx-auto p-8">
        {renderContent()}
      </div>
    </main>
  );
};

export default EditorContent;
