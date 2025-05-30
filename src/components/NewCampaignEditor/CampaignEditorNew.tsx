
import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { CampaignType, getDefaultGameConfig } from '../../utils/campaignTypes';
import { useCampaigns } from '../../hooks/useCampaigns';
import EditorHeader from './components/EditorHeader';
import EditorSidebar from './components/EditorSidebar';
import EditorContent from './components/EditorContent';
import PreviewModal from './components/PreviewModal';
import { FormField } from '../campaign/FormEditor';

// Champs du formulaire par défaut
const defaultFormFields: FormField[] = [
  { id: 'prenom', label: 'Prénom', type: 'text', required: true },
  { id: 'nom', label: 'Nom', type: 'text', required: true },
  { id: 'email', label: 'Email', type: 'email', required: true }
];

const CampaignEditorNew: React.FC = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isNewCampaign = id === 'new';
  const campaignType = searchParams.get('type') as CampaignType || 'quiz';
  
  const [activeSection, setActiveSection] = useState('general');
  const [showPreview, setShowPreview] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [previewOrientation, setPreviewOrientation] = useState<'portrait' | 'landscape'>('portrait');
  
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
      logoUrl: '',
      backgroundImage: ''
    },
    screens: {
      0: { title: 'Bienvenue !', description: 'Participez à notre jeu et tentez de gagner !', showTitle: true, showDescription: true },
      1: { title: 'Vos informations', buttonText: 'Participer' },
      2: { title: 'Jeu', description: 'Bonne chance !' },
      3: { title: 'Félicitations !', description: 'Merci pour votre participation !', winMessage: 'Félicitations, vous avez gagné !', loseMessage: 'Dommage, réessayez !' }
    },
    layout: {
      blockPosition: 'center',
      gamePosition: 'center',
      spacing: 'normal'
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
      setCampaign((prev: any) => ({ ...prev, id: savedCampaign.id }));
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <EditorHeader
        campaign={campaign}
        onSave={handleSave}
        onPreview={() => setShowPreview(true)}
        previewDevice={previewDevice}
        setPreviewDevice={setPreviewDevice}
        previewOrientation={previewOrientation}
        setPreviewOrientation={setPreviewOrientation}
      />

      {/* Main Editor */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <EditorSidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          campaignType={campaign.type}
        />

        {/* Content */}
        <EditorContent
          activeSection={activeSection}
          campaign={campaign}
          setCampaign={setCampaign}
        />
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <PreviewModal
          campaign={campaign}
          device={previewDevice}
          orientation={previewOrientation}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  );
};

export default CampaignEditorNew;
