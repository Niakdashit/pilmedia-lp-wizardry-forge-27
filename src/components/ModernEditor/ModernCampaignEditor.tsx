import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useCampaigns } from '../../hooks/useCampaigns';
import { CampaignType, getDefaultGameConfig } from '../../utils/campaignTypes';
import { FormField } from '../campaign/FormEditor';
import ModernEditorHeader from './ModernEditorHeader';
import ModernEditorTabs from './ModernEditorTabs';
import ModernEditorCanvas from './ModernEditorCanvas';
import ModernDesignTab from './ModernDesignTab';
import ModernGameTab from './ModernGameTab';
import ModernScreensTab from './ModernScreensTab';
import ModernFormTab from './ModernFormTab';
import ModernParticipationsTab from './ModernParticipationsTab';
import ModernMobileTab from './ModernMobileTab';
import ModernPreviewModal from './ModernPreviewModal';

const defaultFormFields: FormField[] = [
  {
    id: 'prenom',
    label: 'Prénom',
    type: 'text',
    required: true
  },
  {
    id: 'nom',
    label: 'Nom',
    type: 'text',
    required: true
  },
  {
    id: 'email',
    label: 'Email',
    type: 'email',
    required: true
  }
];

const ModernCampaignEditor: React.FC = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isNewCampaign = id === 'new';
  const campaignType = searchParams.get('type') as CampaignType || 'quiz';
  const [activeTab, setActiveTab] = useState('design');
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const { saveCampaign, getCampaign } = useCampaigns();

  const [campaign, setCampaign] = useState<any>({
    id: undefined,
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
    formFields: defaultFormFields,
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
    }
  });

  useEffect(() => {
    if (isNewCampaign && !searchParams.get('type')) {
      navigate('/campaigns');
    }
  }, [isNewCampaign, searchParams, navigate]);

  useEffect(() => {
    if (!isNewCampaign && id) {
      loadCampaign(id);
    }
  }, [id, isNewCampaign]);

  const loadCampaign = async (campaignId: string) => {
    const existingCampaign = await getCampaign(campaignId);
    if (existingCampaign) {
      setCampaign({
        ...existingCampaign,
        formFields: existingCampaign.form_fields || defaultFormFields
      });
    }
  };

  const handleSave = async (continueEditing = false) => {
    const campaignData = {
      ...campaign,
      form_fields: campaign.formFields
    };
    const savedCampaign = await saveCampaign(campaignData);
    if (savedCampaign && !continueEditing) {
      navigate('/campaigns');
    } else if (savedCampaign && isNewCampaign) {
      setCampaign((prev: any) => ({
        ...prev,
        id: savedCampaign.id
      }));
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'design':
        return <ModernDesignTab campaign={campaign} setCampaign={setCampaign} />;
      case 'game':
        return <ModernGameTab campaign={campaign} setCampaign={setCampaign} />;
      case 'screens':
        return <ModernScreensTab campaign={campaign} setCampaign={setCampaign} />;
      case 'form':
        return <ModernFormTab campaign={campaign} setCampaign={setCampaign} />;
      case 'mobile':
        return <ModernMobileTab campaign={campaign} setCampaign={setCampaign} />;
      case 'participations':
        return <ModernParticipationsTab campaignId={campaign.id || ''} campaignName={campaign.name} />;
      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <ModernEditorHeader
        isNewCampaign={isNewCampaign}
        campaignName={campaign.name}
        onPreview={() => setShowPreviewModal(true)}
        onSave={handleSave}
      />
      
      <div className="flex-1 flex overflow-hidden">
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          <ModernEditorTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
          <div className="flex-1 overflow-y-auto">
            {renderTabContent()}
          </div>
        </div>
        
        <div className="flex-1 bg-gray-100">
          <ModernEditorCanvas
            campaign={campaign}
          />
        </div>
      </div>

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

export default ModernCampaignEditor;
