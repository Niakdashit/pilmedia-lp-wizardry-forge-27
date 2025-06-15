
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CampaignType } from '../../utils/campaignTypes';
import { useCampaignData } from '../../pages/hooks/useCampaignData';
import { useAIGeneration } from '../../pages/hooks/useAIGeneration';
import ModernEditorLayout from './ModernEditorLayout';
import ModernPreviewModal from './ModernPreviewModal';
import CampaignEditorLoadingScreen from './CampaignEditorLoadingScreen';

const CampaignEditorContainer: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('general');
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  
  const {
    campaign,
    setCampaign,
    isNewCampaign,
    campaignType,
    isLoading,
    setIsLoading,
    saveCampaign
  } = useCampaignData();

  const { isLoadingAIData, aiGenerated, setAiGenerated } = useAIGeneration(
    isNewCampaign,
    campaignType,
    setCampaign
  );

  const handleSave = async (continueEditing = false) => {
    setIsLoading(true);
    try {
      if (campaign.type === 'quiz') {
        const questions = campaign.gameConfig?.quiz?.questions || [];
        const valid = questions.every((q: any) =>
          Array.isArray(q.options) && q.options.length >= 2 && q.options.some((o: any) => o.isCorrect)
        );
        if (!valid) {
          alert('Chaque question doit comporter au moins deux options et une réponse correcte.');
          setIsLoading(false);
          return;
        }
      }
      const campaignData = {
        ...campaign,
        form_fields: campaign.formFields,
        aiGenerated: aiGenerated // Store AI generation metadata
      };
      const savedCampaign = await saveCampaign(campaignData);
      if (savedCampaign && !continueEditing) {
        navigate('/gamification');
      } else if (savedCampaign && isNewCampaign) {
        setCampaign((prev: any) => ({
          ...prev,
          id: savedCampaign.id
        }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToAI = () => {
    navigate(`/gamification/ai-generation?type=${campaignType}`);
  };

  const gameTypeLabels: Record<CampaignType, string> = {
    wheel: 'Roue de la Fortune',
    jackpot: 'Jackpot',
    memory: 'Jeu de Mémoire',
    puzzle: 'Puzzle',
    quiz: 'Quiz Interactif',
    dice: 'Dés Magiques',
    scratch: 'Carte à Gratter',
    swiper: 'Swiper',
    form: 'Formulaire Dynamique'
  };

  // Show loading screen for AI data
  if (isLoadingAIData) {
    return <CampaignEditorLoadingScreen />;
  }

  return (
    <div className="relative">
      <ModernEditorLayout
        campaign={campaign}
        setCampaign={setCampaign}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        previewDevice={previewDevice}
        onSave={() => handleSave(true)}
        onPreview={() => setShowPreviewModal(true)}
        isLoading={isLoading}
        campaignType={campaignType}
        gameTypeLabels={gameTypeLabels}
        aiGenerated={aiGenerated}
        onBackToAI={aiGenerated ? handleBackToAI : undefined}
      />

      {/* Preview Modal */}
      {showPreviewModal && (
        <ModernPreviewModal
          isOpen={showPreviewModal}
          onClose={() => setShowPreviewModal(false)}
          campaign={campaign}
        />
      )}
    </div>
  );
};

export default CampaignEditorContainer;
