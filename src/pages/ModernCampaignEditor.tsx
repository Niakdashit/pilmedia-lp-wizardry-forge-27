import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
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
  const [previewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAIData, setIsLoadingAIData] = useState(false);
  const [aiGenerated, setAiGenerated] = useState(false);
  
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
    } else if (isNewCampaign) {
      loadAIGeneratedData();
    }
  }, [id, isNewCampaign]);

  const loadAIGeneratedData = async () => {
    setIsLoadingAIData(true);
    
    try {
      const gameConfig = JSON.parse(localStorage.getItem('gameConfig') || '{}');
      const aiGeneration = gameConfig.aiGeneration;
      
      if (aiGeneration && aiGeneration.content) {
        console.log('Loading AI-generated data:', aiGeneration);
        
        // Apply AI-generated content and styling
        const aiContent = aiGeneration.content;
        const brandCustomization = gameConfig.brandCustomization || {};
        
        setCampaign((prev: any) => ({
          ...prev,
          name: aiContent.title || prev.name,
          description: aiContent.subtitle || prev.description,
          type: aiGeneration.gameConfig?.type || campaignType,
          design: {
            ...prev.design,
            primaryColor: brandCustomization.extractedColors?.primary || '#841b60',
            secondaryColor: brandCustomization.extractedColors?.secondary || '#ffffff',
            background: brandCustomization.selectedBackground || prev.design.background,
            fontFamily: brandCustomization.selectedFont || 'Inter',
            textStyles: {
              ...prev.design.textStyles,
              title: {
                ...prev.design.textStyles.title,
                color: brandCustomization.extractedColors?.primary || '#000000'
              }
            }
          },
          gameConfig: {
            ...prev.gameConfig,
            ...aiGeneration.gameConfig,
            [campaignType]: {
              ...prev.gameConfig[campaignType],
              title: aiContent.title,
              subtitle: aiContent.subtitle,
              callToAction: aiContent.callToAction,
              prizes: aiContent.prizes,
              winMessage: aiContent.winMessage,
              loseMessage: aiContent.loseMessage
            }
          },
          screens: {
            ...prev.screens,
            1: {
              ...prev.screens[1],
              title: aiContent.title || prev.screens[1].title,
              description: aiContent.subtitle || prev.screens[1].description,
              buttonText: aiContent.callToAction || prev.screens[1].buttonText
            },
            3: {
              ...prev.screens[3],
              title: aiContent.winMessage || prev.screens[3].title
            }
          }
        }));
        
        setAiGenerated(true);
        
        // Clear the stored data after loading
        localStorage.removeItem('gameConfig');
      }
    } catch (error) {
      console.error('Error loading AI-generated data:', error);
    }
    
    setIsLoadingAIData(false);
  };

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
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6"
        >
          <div className="flex items-center justify-center mb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-12 h-12 text-purple-600" />
            </motion.div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Configuration de votre jeu IA
          </h2>
          <p className="text-gray-600 max-w-md">
            Nous appliquons les optimisations générées par notre IA pour créer votre expérience personnalisée...
          </p>
          <div className="w-64 h-2 bg-gray-200 rounded-full mx-auto overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-600 to-purple-700 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>
    );
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

export default ModernCampaignEditor;
