import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import CampaignEditorHeader from '../components/CampaignEditor/CampaignEditorHeader';
import CampaignEditorTabs from '../components/CampaignEditor/CampaignEditorTabs';
import CampaignEditorContent from '../components/CampaignEditor/CampaignEditorContent';
import PreviewModal from '../components/CampaignEditor/PreviewModal';
import JackpotAppearance from '../components/configurators/JackpotAppearance'; // ✅ Ajout ici
import { CampaignType, getDefaultGameConfig } from '../utils/campaignTypes';

const defaultJackpotConfig = {
  symbols: ['🍒', '🍋', '🍊'],
  reels: 3,
  winMessage: 'JACKPOT ! Vous avez gagné !',
  loseMessage: 'Dommage, pas de jackpot !',
  instantWin: {
    enabled: false,
    winProbability: 0.05,
    maxWinners: undefined,
  }
};

const CampaignEditor: React.FC = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isNewCampaign = id === 'new';
  const campaignType = searchParams.get('type') as CampaignType || 'quiz';

  const [activeTab, setActiveTab] = useState('general');
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const [campaign, setCampaign] = useState({
    name: isNewCampaign ? 'Nouvelle Campagne' : 'Quiz Marketing Digital',
    description: isNewCampaign ? '' : 'Quiz pour évaluer les connaissances en marketing digital',
    url: isNewCampaign ? '' : 'quiz-marketing-digital',
    startDate: isNewCampaign ? '' : '2025-03-15',
    startTime: isNewCampaign ? '' : '09:00',
    endDate: isNewCampaign ? '' : '2025-04-15',
    endTime: isNewCampaign ? '' : '18:00',
    status: isNewCampaign ? 'draft' : 'active',
    type: campaignType,
    screens: {
      1: {
        title: 'Bienvenue !',
        description: 'Participez à notre jeu et tentez de gagner !',
        buttonText: 'Participer',
        buttonLink: '',
        showTitle: true,
        showDescription: true
      },
      2: {},
      3: {
        title: 'Félicitations !',
        description: 'Merci pour votre participation !',
        buttonText: 'Rejouer',
        buttonLink: '',
        showTitle: true,
        showDescription: true,
        showReplayButton: true
      }
    },
    gameConfig: getDefaultGameConfig(campaignType),
    design: {
      background: '#ebf4f7',
      fontFamily: 'Inter',
      primaryColor: '#841b60',
      secondaryColor: '#ffffff',
      titleColor: '#000000',
      buttonColor: '#841b60',
      blockColor: '#ffffff',
      borderColor: '#E5E7EB',
      borderRadius: '0.5rem',
      shadow: 'shadow-md',
      titleFont: 'Inter, sans-serif',
      textFont: 'Inter, sans-serif',
      fontSize: 'normal',
      fontWeight: 'normal',
      logoUrl: '',
      backgroundImage: ''
    },
    rewards: {
      mode: 'probability',
      quantity: 10,
      probability: 10,
      timeSlots: []
    },
    config: {
      jackpot: defaultJackpotConfig
    }
  });

  useEffect(() => {
    if (isNewCampaign && !searchParams.get('type')) {
      navigate('/campaigns');
    }
  }, [isNewCampaign, searchParams, navigate]);

  const handleSave = (continueEditing = false) => {
    console.log('Saving campaign:', campaign);
    if (!continueEditing) {
      navigate('/campaigns');
    }
  };

  return (
    <div className="h-[calc(100vh-3rem)] flex flex-col">
      <CampaignEditorHeader
        isNewCampaign={isNewCampaign}
        campaignName={campaign.name}
        onPreview={() => setShowPreviewModal(true)}
        onSave={handleSave}
      />

      <div className="flex flex-1 overflow-hidden bg-white rounded-xl shadow-sm">
        <div className="flex flex-col w-full">
          <CampaignEditorTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {activeTab === 'appearance' ? (
            <div className="p-6 overflow-y-auto">
              <JackpotAppearance
                campaign={campaign}
                setCampaign={setCampaign}
              />
            </div>
          ) : (
            <CampaignEditorContent
              activeTab={activeTab}
              campaign={campaign}
              setCampaign={setCampaign}
            />
          )}
        </div>
      </div>

      {showPreviewModal && (
        <PreviewModal
          isOpen={showPreviewModal}
          onClose={() => setShowPreviewModal(false)}
          campaign={campaign}
        />
      )}
    </div>
  );
};

export default CampaignEditor;
