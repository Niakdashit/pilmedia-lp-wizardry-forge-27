
import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useCampaigns } from '../../hooks/useCampaigns';
import { CampaignType, getDefaultGameConfig } from '../../utils/campaignTypes';
import EditorHeader from './components/EditorHeader';
import EditorTabs from './components/EditorTabs';
import EditorContent from './components/EditorContent';
import EditorPreview from './components/EditorPreview';
import { toast } from '../../hooks/use-toast';

// Types d'onglets
export type TabType = 'general' | 'design' | 'content' | 'preview';

// Configuration par défaut
const defaultCampaign = {
  id: undefined,
  name: 'Nouvelle Campagne',
  description: '',
  url: '',
  startDate: '',
  startTime: '09:00',
  endDate: '',
  endTime: '18:00',
  status: 'draft',
  type: 'wheel' as CampaignType,
  design: {
    template: 'modern',
    background: '#f8fafc',
    primaryColor: '#6366f1',
    secondaryColor: '#ffffff',
    fontFamily: 'Inter',
    fontSize: 'normal',
    blockRadius: 'rounded-xl',
    shadow: 'shadow-lg',
    backgroundImage: null,
    logoUrl: null
  },
  gameConfig: {},
  formFields: [
    { id: 'email', label: 'Email', type: 'email', required: true },
    { id: 'prenom', label: 'Prénom', type: 'text', required: true },
    { id: 'nom', label: 'Nom', type: 'text', required: true }
  ],
  screens: {
    0: { title: 'Tentez votre chance !', description: 'Participez pour gagner !', showTitle: true, showDescription: true },
    1: { title: 'Vos informations', buttonText: 'Participer' },
    2: { title: 'Félicitations !', description: 'Merci pour votre participation !', replayButtonText: 'Rejouer' }
  },
  mobileConfig: {
    gamePosition: 'center',
    customTemplate: null,
    gameVerticalAlign: 'center'
  }
};

const NewCampaignEditor: React.FC = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const isNewCampaign = id === 'new';
  const campaignType = searchParams.get('type') as CampaignType || 'wheel';
  
  const [activeTab, setActiveTab] = useState<TabType>('general');
  const [campaign, setCampaign] = useState(() => ({
    ...defaultCampaign,
    type: campaignType,
    gameConfig: getDefaultGameConfig(campaignType)
  }));
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  const { saveCampaign, getCampaign } = useCampaigns();

  useEffect(() => {
    if (!isNewCampaign && id) {
      loadCampaign(id);
    }
  }, [id, isNewCampaign]);

  const loadCampaign = async (campaignId: string) => {
    try {
      const existingCampaign = await getCampaign(campaignId);
      if (existingCampaign) {
        setCampaign({
          ...defaultCampaign,
          ...existingCampaign,
          formFields: existingCampaign.form_fields || defaultCampaign.formFields
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger la campagne",
        variant: "destructive"
      });
    }
  };

  const handleSave = async (continueEditing = false) => {
    try {
      const campaignData = {
        ...campaign,
        form_fields: campaign.formFields
      };
      
      const savedCampaign = await saveCampaign(campaignData);
      
      if (savedCampaign) {
        toast({
          title: "Succès",
          description: "Campagne sauvegardée avec succès"
        });
        
        if (isNewCampaign) {
          setCampaign(prev => ({ ...prev, id: savedCampaign.id }));
        }
        
        if (!continueEditing) {
          navigate('/campaigns');
        }
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur lors de la sauvegarde",
        variant: "destructive"
      });
    }
  };

  const handlePreview = () => {
    setIsPreviewOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <EditorHeader
        campaignName={campaign.name}
        isNewCampaign={isNewCampaign}
        onSave={handleSave}
        onPreview={handlePreview}
        onBack={() => navigate('/campaigns')}
      />

      {/* Main Layout */}
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Left Panel - Tabs & Content */}
        <div className="flex-1 flex flex-col bg-white border-r border-gray-200">
          <EditorTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            campaignType={campaign.type}
          />
          
          <div className="flex-1 overflow-y-auto">
            <EditorContent
              activeTab={activeTab}
              campaign={campaign}
              setCampaign={setCampaign}
            />
          </div>
        </div>

        {/* Right Panel - Preview */}
        <div className="w-96 bg-gray-50 border-l border-gray-200">
          <EditorPreview
            campaign={campaign}
            device={previewDevice}
            onDeviceChange={setPreviewDevice}
            isFullscreen={isPreviewOpen}
            onFullscreenToggle={() => setIsPreviewOpen(!isPreviewOpen)}
          />
        </div>
      </div>
    </div>
  );
};

export default NewCampaignEditor;
