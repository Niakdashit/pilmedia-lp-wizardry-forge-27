import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Save, ChevronRight, Link as LinkIcon, Copy, Eye } from 'lucide-react';
import CampaignGeneral from '../components/CampaignEditor/CampaignGeneral';
import CampaignContent from '../components/CampaignEditor/CampaignContent';
import CampaignScreens from '../components/CampaignEditor/CampaignScreens';
import CampaignDesign from '../components/CampaignEditor/CampaignDesign';
import CampaignSettings from '../components/CampaignEditor/CampaignSettings';
import CampaignPreview from '../components/CampaignEditor/CampaignPreview';
import PreviewModal from '../components/CampaignEditor/PreviewModal';
import TabJackpot from "../components/configurators/TabJackpot";
import { CampaignType, getDefaultGameConfig } from '../utils/campaignTypes';

// Config de base pour jackpot (tu peux déplacer ailleurs si tu veux)
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
  const [showPreview, setShowPreview] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  // ----------- STATE CAMPAGNE AVEC CONFIG.JACKPOT -----------
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
      2: {
        // Game screen configuration is handled in gameConfig
      },
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
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {isNewCampaign ? 'Nouvelle Campagne' : campaign.name}
          </h1>
          <p className="text-gray-500">{isNewCampaign ? 'Création' : 'Modification'}</p>
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={() => setShowPreviewModal(true)}
            className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-lg bg-white hover:bg-gray-50 transition-colors duration-200"
          >
            <Eye className="w-4 h-4 mr-2" />
            Aperçu
          </button>
          
          <button
            onClick={() => handleSave(true)}
            className="inline-flex items-center px-3 py-2 border border-[#841b60] text-sm font-medium rounded-lg text-[#841b60] bg-white hover:bg-[#f8f0f5] transition-colors duration-200"
          >
            <Save className="w-4 h-4 mr-2" />
            Enregistrer
          </button>
          
          <button
            onClick={() => handleSave(false)}
            className="inline-flex items-center px-3 py-2 bg-[#841b60] text-white text-sm font-medium rounded-lg hover:bg-[#6d164f] transition-colors duration-200"
          >
            Publier
            <ChevronRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
      
      <div className="flex flex-1 overflow-hidden bg-white rounded-xl shadow-sm">
        <div className={`flex flex-col ${showPreview ? 'w-1/2' : 'w-full'}`}>
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('general')}
                className={`py-4 px-1 font-medium text-sm border-b-2 transition-colors duration-200 ${
                  activeTab === 'general' 
                    ? 'border-[#841b60] text-[#841b60]' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Général
              </button>
              
              <button
                onClick={() => setActiveTab('content')}
                className={`py-4 px-1 font-medium text-sm border-b-2 transition-colors duration-200 ${
                  activeTab === 'content' 
                    ? 'border-[#841b60] text-[#841b60]' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Contenu
              </button>

              <button
                onClick={() => setActiveTab('screens')}
                className={`py-4 px-1 font-medium text-sm border-b-2 transition-colors duration-200 ${
                  activeTab === 'screens' 
                    ? 'border-[#841b60] text-[#841b60]' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Écrans
              </button>
              
              <button
                onClick={() => setActiveTab('design')}
                className={`py-4 px-1 font-medium text-sm border-b-2 transition-colors duration-200 ${
                  activeTab === 'design' 
                    ? 'border-[#841b60] text-[#841b60]' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Design
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`py-4 px-1 font-medium text-sm border-b-2 transition-colors duration-200 ${
                  activeTab === 'settings' 
                    ? 'border-[#841b60] text-[#841b60]' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Paramétrage
              </button>
            </nav>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === 'general' && (
              <CampaignGeneral campaign={campaign} setCampaign={setCampaign} />
            )}
            
            {activeTab === 'content' && (
              <CampaignContent campaign={campaign} setCampaign={setCampaign} />
            )}

            {activeTab === 'screens' && (
              <CampaignScreens campaign={campaign} setCampaign={setCampaign} />
            )}
            
            {activeTab === 'design' && (
              <CampaignDesign campaign={campaign} setCampaign={setCampaign} />
            )}

            {/* ------------ ONGLET PARAMÉTRAGE AVEC JACKPOT ------------ */}
            {activeTab === 'settings' && (
              <div>
                <CampaignSettings campaign={campaign} setCampaign={setCampaign} />
                {/* Ajoute l'éditeur TabJackpot, branche-le sur config.jackpot */}
                <div className="mt-8">
                  <h2 className="text-xl font-bold mb-3 text-[#841b60]">Configuration du Jackpot</h2>
                  <TabJackpot
                    config={campaign.config?.jackpot}
                    onConfigChange={(newJackpotConfig) =>
                      setCampaign((prev: any) => ({
                        ...prev,
                        config: {
                          ...prev.config,
                          jackpot: newJackpotConfig
                        }
                      }))
                    }
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        
        {showPreview && (
          <div className="w-1/2 border-l border-gray-200">
            <div className="h-16 bg-gray-50 border-b border-gray-200 flex items-center justify-between px-6">
              <div className="flex items-center space-x-2">
                <span className="text-gray-500 text-sm">URL Publique:</span>
                <div className="flex items-center space-x-1 bg-white border border-gray-300 rounded-lg px-3 py-1.5">
                  <LinkIcon className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-800">
                    leadya.com/c/{campaign.url || 'your-campaign-url'}
                  </span>
                  <button 
                    className="text-[#841b60] hover:text-[#6d164f] ml-2"
                    title="Copier l'URL"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="text-sm px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  Mobile
                </button>
                <button className="text-sm px-3 py-1.5 bg-[#841b60] text-white rounded-lg hover:bg-[#6d164f] transition-colors duration-200">
                  Desktop
                </button>
              </div>
            </div>
            
            <div className="h-[calc(100%-4rem)] bg-gray-100 p-6 overflow-y-auto">
              <CampaignPreview campaign={campaign} />
            </div>
          </div>
        )}
      </div>

      <PreviewModal
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        campaign={campaign}
      />
    </div>
  );
};

export default CampaignEditor;
