
import React from 'react';
import CampaignGeneral from './CampaignGeneral';
import CampaignContent from './CampaignContent';
import CampaignScreens from './CampaignScreens';
import CampaignMobile from './CampaignMobile';
import CampaignSettings from './CampaignSettings';
import TabJackpot from '../configurators/TabJackpot';
import QuizConfiguration from './QuizConfiguration';

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
        
      case 'mobile':
        return <CampaignMobile campaign={campaign} setCampaign={setCampaign} />;

      case 'settings':
        return (
          <div className="space-y-8">
            <CampaignSettings campaign={campaign} setCampaign={setCampaign} />
            
            {campaign.type === 'quiz' && (
              <div>
                <h2 className="text-xl font-bold mb-4 text-[#841b60]">Configuration du Quiz</h2>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <h3 className="font-medium text-blue-800 mb-2">Personnalisation des Questions</h3>
                  <p className="text-blue-700 text-sm">
                    Ici vous pouvez ajouter, modifier et personnaliser toutes vos questions de quiz. 
                    Définissez le nombre de questions, les options de réponse, les explications et les temps limites.
                  </p>
                </div>
                <QuizConfiguration
                  campaign={campaign}
                  setCampaign={setCampaign}
                />
              </div>
            )}
            
            {campaign.type === 'jackpot' && (
              <div>
                <h2 className="text-xl font-bold mb-4 text-[#841b60]">Configuration du Jackpot</h2>
                <TabJackpot
                  campaign={campaign}
                  setCampaign={setCampaign}
                />
              </div>
            )}
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6">
      {renderTabContent()}
    </div>
  );
};

export default CampaignEditorContent;
