
import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { CampaignType, getDefaultGameConfig } from '../utils/campaignTypes';
import { useCampaigns } from '../hooks/useCampaigns';
import ModernEditorLayout from '../components/ModernEditor/ModernEditorLayout';
import ModernPreviewModal from '../components/ModernEditor/ModernPreviewModal';

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
      const campaignData = {
        ...campaign,
        form_fields: campaign.formFields
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

  return (
    <div className="relative">
      {/* Back button - floating */}
      <button
        onClick={() => navigate('/gamification')}
        className="fixed top-4 left-4 z-50 p-2 bg-white/90 backdrop-blur-md hover:bg-white rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-200/50"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      <ModernEditorLayout
        campaign={campaign}
        setCampaign={setCampaign}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        previewDevice={previewDevice}
        onDeviceChange={setPreviewDevice}
        onSave={() => handleSave(true)}
        onPreview={() => setShowPreviewModal(true)}
        isLoading={isLoading}
        campaignType={campaignType}
        isNewCampaign={isNewCampaign}
        gameTypeLabels={gameTypeLabels}
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

export default ModernCampaignEditor;
