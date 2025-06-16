
import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { CampaignType, getDefaultGameConfig } from '../utils/campaignTypes';
import { useCampaigns } from '../hooks/useCampaigns';
import ModernEditorSidebar from '../components/ModernEditor/ModernEditorSidebar';
import ModernEditorPanel from '../components/ModernEditor/ModernEditorPanel';
import ModernEditorCanvas from '../components/ModernEditor/ModernEditorCanvas';
import ModernPreviewModal from '../components/ModernEditor/ModernPreviewModal';
import EditorHeader from '../components/ModernEditor/components/EditorHeader';
import EditorDesktopPanel from '../components/ModernEditor/components/EditorDesktopPanel';
import EditorMobilePanel from '../components/ModernEditor/components/EditorMobilePanel';

const defaultFormFields = [
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
  const campaignType = searchParams.get('type') as CampaignType || 'wheel';
  
  const [activeTab, setActiveTab] = useState('general');
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isLoading, setIsLoading] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  
  const { saveCampaign, getCampaign } = useCampaigns();
  
  const [campaign, setCampaign] = useState<any>({
    id: undefined,
    name: isNewCampaign ? 'Nouvelle Campagne' : 'Ma Campagne',
    description: '',
    url: '',
    startDate: '',
    startTime: '09:00',
    endDate: '',
    endTime: '18:00',
    status: 'draft',
    type: campaignType,
    formFields: defaultFormFields,
    gameConfig: getDefaultGameConfig(campaignType),
    gameSize: 'medium' as 'small' | 'medium' | 'large' | 'xlarge',
    gamePosition: 'center' as 'top' | 'center' | 'bottom' | 'left' | 'right',
    buttonConfig: {
      color: '#841b60',
      borderColor: '#841b60',
      borderWidth: 1,
      borderRadius: 8,
      size: 'medium' as 'small' | 'medium' | 'large',
      link: '',
      visible: true,
      text: 'Remplir le formulaire'
    },
    design: {
      background: '#f8fafc',
      primaryColor: '#841b60',
      secondaryColor: '#ffffff',
      titleColor: '#000000',
      buttonColor: '#841b60',
      fontFamily: 'Inter',
      borderRadius: '0.5rem',
      textStyles: {
        title: {
          fontFamily: 'Inter',
          fontSize: '24px',
          fontWeight: 'bold',
          textAlign: 'center' as const,
          color: '#000000',
          lineHeight: '1.2'
        },
        description: {
          fontFamily: 'Inter',
          fontSize: '16px',
          fontWeight: 'normal',
          textAlign: 'left' as const,
          color: '#000000',
          lineHeight: '1.5'
        },
        label: {
          fontFamily: 'Inter',
          fontSize: '14px',
          fontWeight: 'normal',
          textAlign: 'left' as const,
          color: '#000000',
          lineHeight: '1.4'
        },
        button: {
          fontFamily: 'Inter',
          fontSize: '16px',
          fontWeight: 'bold',
          textAlign: 'center' as const,
          color: '#ffffff',
          lineHeight: '1.2'
        }
      },
      customText: {
        enabled: false,
        text: 'Texte personnalisé',
        position: 'top' as 'top' | 'bottom' | 'left' | 'right' | 'center',
        size: 'medium' as 'small' | 'medium' | 'large',
        color: '#000000',
        showFrame: false,
        frameColor: '#ffffff',
        frameBorderColor: '#e5e7eb'
      }
    },
    screens: {
      1: {
        title: 'Bienvenue !',
        description: 'Participez à notre jeu et tentez de gagner !',
        buttonText: 'Participer',
        showTitle: true,
        showDescription: true
      },
      3: {
        title: 'Félicitations !',
        description: 'Merci pour votre participation !',
        showTitle: true,
        showDescription: true
      }
    }
  });

  useEffect(() => {
    if (!isNewCampaign && id) {
      loadCampaign(id);
    }
  }, [id, isNewCampaign]);

  const loadCampaign = async (campaignId: string) => {
    setIsLoading(true);
    try {
      const existingCampaign = await getCampaign(campaignId);
      if (existingCampaign) {
        setCampaign({
          ...existingCampaign,
          formFields: existingCampaign.form_fields || defaultFormFields
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      {/* Header */}
      <EditorHeader
        campaign={campaign}
        isNewCampaign={isNewCampaign}
        isLoading={isLoading}
        previewDevice={previewDevice}
        onDeviceChange={setPreviewDevice}
        onSave={() => handleSave(true)}
        onPreview={() => setShowPreviewModal(true)}
        onTogglePanel={() => setIsPanelOpen(!isPanelOpen)}
        isPanelOpen={isPanelOpen}
        onBack={() => navigate('/campaigns')}
      />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Panel */}
        <EditorDesktopPanel
          isOpen={isPanelOpen}
          onToggle={() => setIsPanelOpen(!isPanelOpen)}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          campaign={campaign}
          setCampaign={setCampaign}
          campaignType={campaignType}
        />

        {/* Canvas */}
        <div className="flex-1 overflow-hidden">
          <ModernEditorCanvas
            campaign={campaign}
            setCampaign={setCampaign}
            previewDevice={previewDevice}
            activeTab={activeTab}
          />
        </div>

        {/* Mobile Panel */}
        <EditorMobilePanel
          activeTab={activeTab}
          onTabChange={setActiveTab}
          campaign={campaign}
          setCampaign={setCampaign}
          campaignType={campaignType}
        />
      </div>

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

export default ModernCampaignEditor;
