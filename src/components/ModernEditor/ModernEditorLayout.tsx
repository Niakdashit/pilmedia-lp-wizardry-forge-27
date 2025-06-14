
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import EditorHeader from './components/EditorHeader';
import EditorDesktopPanel from './components/EditorDesktopPanel';
import EditorMobilePanel from './components/EditorMobilePanel';
import ModernEditorCanvas from './ModernEditorCanvas';
import { CampaignType } from '../../utils/campaignTypes';

interface ModernEditorLayoutProps {
  campaign: any;
  setCampaign: React.Dispatch<React.SetStateAction<any>>;
  activeTab: string;
  onTabChange: (tab: string) => void;
  previewDevice: 'desktop' | 'tablet' | 'mobile';
  onSave: () => void;
  onPreview: () => void;
  isLoading: boolean;
  campaignType: CampaignType;
  gameTypeLabels: Record<CampaignType, string>;
  aiGenerated?: boolean;
  onBackToAI?: () => void;
}

const ModernEditorLayout: React.FC<ModernEditorLayoutProps> = ({
  campaign,
  setCampaign,
  activeTab,
  onTabChange,
  previewDevice,
  onSave,
  onPreview,
  isLoading,
  campaignType,
  aiGenerated = false,
  onBackToAI
}) => {
  const navigate = useNavigate();
  const [isPanelOpen, setIsPanelOpen] = useState(true);

  const handleBack = () => {
    if (aiGenerated && onBackToAI) {
      onBackToAI();
    } else {
      navigate('/gamification');
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
    <div className="h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 bg-white/95 backdrop-blur-sm border-b border-gray-200/50 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBack}
                className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">
                  {aiGenerated ? 'Retour à l\'IA' : 'Retour'}
                </span>
              </button>
              
              <div className="flex items-center space-x-3">
                <h1 className="text-xl font-bold text-gray-900">
                  {campaign.name || 'Nouvelle Campagne'}
                </h1>
                
                {aiGenerated && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center space-x-2 px-3 py-1 bg-gradient-to-r from-purple-100 to-purple-50 text-purple-700 rounded-full text-sm font-medium"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Généré par IA</span>
                  </motion.div>
                )}
              </div>
            </div>

            <EditorHeader
              campaign={campaign}
              isNewCampaign={!campaign.id}
              campaignType={campaignType}
              gameTypeLabels={gameTypeLabels}
              previewDevice={previewDevice}
              onDeviceChange={() => {}}
              onExit={handleBack}
              onMobilePanelToggle={() => setIsPanelOpen(!isPanelOpen)}
              onSave={onSave}
              onPreview={onPreview}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Panel */}
        <EditorDesktopPanel
          isOpen={isPanelOpen}
          onToggle={() => setIsPanelOpen(!isPanelOpen)}
          activeTab={activeTab}
          onTabChange={onTabChange}
          campaign={campaign}
          setCampaign={setCampaign}
          campaignType={campaignType}
        />

        {/* Mobile Panel */}
        <EditorMobilePanel
          isOpen={isPanelOpen}
          onClose={() => setIsPanelOpen(false)}
          activeTab={activeTab}
          onTabChange={onTabChange}
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
            gameSize={campaign.gameSize || 'medium'}
            gamePosition={campaign.gamePosition || 'center'}
          />
        </div>
      </div>
    </div>
  );
};

export default ModernEditorLayout;
