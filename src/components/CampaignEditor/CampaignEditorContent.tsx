
import React from 'react';
import CampaignGeneral from './CampaignGeneral';
import CampaignContent from './CampaignContent';
import CampaignScreens from './CampaignScreens';
import CampaignMobile from './CampaignMobile';
import CampaignSettings from './CampaignSettings';
import TabJackpot from '../configurators/TabJackpot';
import QuizEditor from '../Quiz/QuizEditor';
import QuizDesigner from '../Quiz/QuizDesigner';
import ModernQuiz from '../Quiz/ModernQuiz';

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
  const updateQuestions = (questions: any[]) => {
    setCampaign((prev: any) => ({
      ...prev,
      gameConfig: {
        ...prev.gameConfig,
        quiz: {
          ...prev.gameConfig?.quiz,
          questions
        }
      }
    }));
  };

  const updateQuizDesign = (design: any) => {
    setCampaign((prev: any) => ({
      ...prev,
      gameConfig: {
        ...prev.gameConfig,
        quiz: {
          ...prev.gameConfig?.quiz,
          design
        }
      }
    }));
  };

  const getDefaultQuizDesign = () => ({
    template: 'instagram',
    primaryColor: '#8b5cf6',
    secondaryColor: '#a78bfa',
    backgroundColor: '#ffffff',
    textColor: '#2d3748',
    fontFamily: 'Inter',
    borderRadius: '16px',
    animations: true,
    layout: 'card' as const
  });

  const renderTabContent = () => {
    // Gestion spéciale pour les quiz
    if (campaign.type === 'quiz') {
      switch (activeTab) {
        case 'general':
          return <CampaignGeneral campaign={campaign} setCampaign={setCampaign} />;
          
        case 'questions':
          return (
            <div className="p-6">
              <QuizEditor
                questions={campaign.gameConfig?.quiz?.questions || []}
                onQuestionsChange={updateQuestions}
              />
            </div>
          );

        case 'design':
          return (
            <div className="p-6">
              <QuizDesigner
                design={campaign.gameConfig?.quiz?.design || getDefaultQuizDesign()}
                onDesignChange={updateQuizDesign}
              />
            </div>
          );

        case 'preview':
          return (
            <div className="h-full bg-gray-100">
              <div className="p-6">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden" style={{ height: '600px' }}>
                  <ModernQuiz
                    questions={campaign.gameConfig?.quiz?.questions || []}
                    design={campaign.gameConfig?.quiz?.design || getDefaultQuizDesign()}
                    showTimer={campaign.gameConfig?.quiz?.showTimer !== false}
                    showScore={campaign.gameConfig?.quiz?.showScore !== false}
                  />
                </div>
              </div>
            </div>
          );

        case 'mobile':
          return <CampaignMobile campaign={campaign} setCampaign={setCampaign} />;

        default:
          return null;
      }
    }

    // Gestion pour les autres types de campagnes
    switch (activeTab) {
      case 'general':
        return <CampaignGeneral campaign={campaign} setCampaign={setCampaign} />;
        
      case 'content':
        return (
          <div className="space-y-8">
            <CampaignContent campaign={campaign} setCampaign={setCampaign} />
          </div>
        );

      case 'screens':
        return <CampaignScreens campaign={campaign} setCampaign={setCampaign} />;
        
      case 'mobile':
        return <CampaignMobile campaign={campaign} setCampaign={setCampaign} />;

      case 'settings':
        return (
          <div className="space-y-8">
            <CampaignSettings campaign={campaign} setCampaign={setCampaign} />
            
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
    <div className="flex-1 overflow-y-auto">
      {renderTabContent()}
    </div>
  );
};

export default CampaignEditorContent;
