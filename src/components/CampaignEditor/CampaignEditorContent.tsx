
import React from 'react';
import CampaignGeneral from './CampaignGeneral';
import CampaignContent from './CampaignContent';
import CampaignScreens from './CampaignScreens';
import CampaignDesign from './CampaignDesign';
import CampaignSettings from './CampaignSettings';
import TabJackpot from '../configurators/TabJackpot';

interface CampaignEditorContentProps {
  activeTab: string;
  campaign: any;
  setCampaign: React.Dispatch<React.SetStateAction<any>>;
}

const CampaignEditorContent: React.FC<CampaignEditorContentProps> = ({
  activeTab,
  campaign,
  setCampaign
}) => {
  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return <CampaignGeneral campaign={campaign} setCampaign={setCampaign} />;
        
      case 'content':
        return <CampaignContent campaign={campaign} setCampaign={setCampaign} />;

      case 'screens':
        return <CampaignScreens campaign={campaign} setCampaign={setCampaign} />;
        
      case 'design':
        return <CampaignDesign campaign={campaign} setCampaign={setCampaign} />;

      case 'settings':
        return (
          <div>
            <CampaignSettings />
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-3 text-[#841b60]">Configuration du Jackpot</h2>
              <TabJackpot
                config={campaign.gameConfig?.jackpot}
                onConfigChange={(newJackpotConfig: any) =>
                  setCampaign((prev: any) => ({
                    ...prev,
                    gameConfig: {
                      ...prev.gameConfig,
                      jackpot: newJackpotConfig
                    }
                  }))
                }
              />
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-6">
      {renderTabContent()}
    </div>
  );
};

export default CampaignEditorContent;
