import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, Save, Monitor, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CampaignType, getDefaultGameConfig } from '../utils/campaignTypes';
import { useCampaigns } from '../hooks/useCampaigns';
import ModernEditorSidebar from '../components/ModernEditor/ModernEditorSidebar';
import ModernEditorCanvas from '../components/ModernEditor/ModernEditorCanvas';
import ModernPreviewModal from '../components/ModernEditor/ModernPreviewModal';
import ModernGeneralTab from '../components/ModernEditor/ModernGeneralTab';
import ModernGameTab from '../components/ModernEditor/ModernGameTab';
import ModernDesignTab from '../components/ModernEditor/ModernDesignTab';
import ModernFormTab from '../components/ModernEditor/ModernFormTab';
import ModernGameConfigTab from '../components/ModernEditor/ModernGameConfigTab';
import ModernMobileTab from '../components/ModernEditor/ModernMobileTab';
const defaultFormFields = [{
  id: 'prenom',
  label: 'Prénom',
  type: 'text',
  required: true
}, {
  id: 'nom',
  label: 'Nom',
  type: 'text',
  required: true
}, {
  id: 'email',
  label: 'Email',
  type: 'email',
  required: true
}];
const ModernCampaignEditor: React.FC = () => {
  const {
    id
  } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isNewCampaign = id === 'new';
  const campaignType = searchParams.get('type') as CampaignType || 'wheel';
  const [activeTab, setActiveTab] = useState('general');
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isLoading, setIsLoading] = useState(false);
  const {
    saveCampaign,
    getCampaign
  } = useCampaigns();
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
    // Game layout configuration
    gameSize: 'medium' as 'small' | 'medium' | 'large' | 'xlarge',
    gamePosition: 'center' as 'top' | 'center' | 'bottom' | 'left' | 'right',
    // Button configuration
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
      // Custom text configuration
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
  const handleGameSizeChange = (size: 'small' | 'medium' | 'large' | 'xlarge') => {
    setCampaign((prev: any) => ({
      ...prev,
      gameSize: size
    }));
  };
  const handleGamePositionChange = (position: 'top' | 'center' | 'bottom' | 'left' | 'right') => {
    setCampaign((prev: any) => ({
      ...prev,
      gamePosition: position
    }));
  };
  const handleButtonConfigChange = (config: any) => {
    setCampaign((prev: any) => ({
      ...prev,
      buttonConfig: config
    }));
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
  return <div className="h-screen flex bg-gray-50">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-30 bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button onClick={() => navigate('/gamification')} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {isNewCampaign ? 'Nouvel Éditeur' : campaign.name}
              </h1>
              <p className="text-sm text-gray-500">
                {gameTypeLabels[campaignType]} • {isNewCampaign ? 'Brouillon' : campaign.status}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button onClick={() => setPreviewDevice('desktop')} className={`p-2 rounded-md transition-colors ${previewDevice === 'desktop' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}>
                <Monitor className="w-4 h-4" />
              </button>
              <button onClick={() => setPreviewDevice('mobile')} className={`p-2 rounded-md transition-colors ${previewDevice === 'mobile' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}>
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
            
            <button onClick={() => setShowPreviewModal(true)} className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
              <Eye className="w-4 h-4" />
              <span>Aperçu</span>
            </button>
            
            <button onClick={() => handleSave(true)} disabled={isLoading} className="flex items-center space-x-2 px-4 py-2 bg-[#841b60] hover:bg-[#6d164f] text-white rounded-lg transition-colors disabled:opacity-50">
              <Save className="w-4 h-4" />
              <span>{isLoading ? 'Sauvegarde...' : 'Sauvegarder'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex w-full pt-20">
        {/* Sidebar */}
        <ModernEditorSidebar activeTab={activeTab} onTabChange={setActiveTab} campaignType={campaignType} />

        {/* Content Area */}
        <div className="flex-1 flex">
          {/* Configuration Panel */}
          <div className="w-96 bg-white border-r border-gray-200 overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div key={activeTab} initial={{
              opacity: 0,
              x: -20
            }} animate={{
              opacity: 1,
              x: 0
            }} exit={{
              opacity: 0,
              x: 20
            }} transition={{
              duration: 0.2
            }} className="p-6 px-0">
                {activeTab === 'general' && <ModernGeneralTab campaign={campaign} setCampaign={setCampaign} />}
                {activeTab === 'game' && <ModernGameTab campaign={campaign} setCampaign={setCampaign} />}
                {activeTab === 'gameconfig' && <ModernGameConfigTab gameSize={campaign.gameSize} gamePosition={campaign.gamePosition} onGameSizeChange={handleGameSizeChange} onGamePositionChange={handleGamePositionChange} buttonConfig={campaign.buttonConfig} onButtonConfigChange={handleButtonConfigChange} />}
                {activeTab === 'design' && <ModernDesignTab campaign={campaign} setCampaign={setCampaign} />}
                {activeTab === 'form' && <ModernFormTab campaign={campaign} setCampaign={setCampaign} />}
                {activeTab === 'mobile' && <ModernMobileTab campaign={campaign} setCampaign={setCampaign} />}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Canvas Preview */}
          <div className="flex-1 bg-gray-100">
            <ModernEditorCanvas 
              campaign={campaign} 
              setCampaign={setCampaign}
              previewDevice={previewDevice} 
              gameSize={campaign.gameSize} 
              gamePosition={campaign.gamePosition} 
            />
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreviewModal && <ModernPreviewModal isOpen={showPreviewModal} onClose={() => setShowPreviewModal(false)} campaign={campaign} />}
    </div>;
};
export default ModernCampaignEditor;
