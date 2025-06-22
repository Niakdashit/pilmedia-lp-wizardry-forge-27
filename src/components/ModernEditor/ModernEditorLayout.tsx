
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Eye, Save, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ModernEditorSidebar from './ModernEditorSidebar';
import ModernEditorPanel from './ModernEditorPanel';
import AIAssistantSidebar from './AIAssistantSidebar';

interface ModernEditorLayoutProps {
  campaign: any;
  setCampaign: (updater: (prev: any) => any) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  previewDevice: 'desktop' | 'tablet' | 'mobile';
  onDeviceChange: (device: 'desktop' | 'tablet' | 'mobile') => void;
  onSave: () => void;
  onPreview: () => void;
  isLoading: boolean;
  campaignType: string;
  isNewCampaign: boolean;
  gameTypeLabels: Record<string, string>;
}

const ModernEditorLayout: React.FC<ModernEditorLayoutProps> = ({ 
  campaign,
  setCampaign,
  activeTab,
  onTabChange,
  onSave,
  onPreview,
  isLoading,
  isNewCampaign,
  campaignType
}) => {
  const navigate = useNavigate();
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAIGenerate = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#ebf4f7] to-[#f1f5f9]">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/gamification')}
                className="p-2 hover:bg-gray-50 rounded-xl transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {isNewCampaign ? 'Nouvel Éditeur' : campaign.name || 'Campagne'}
                </h1>
                <p className="text-sm text-gray-500">Créez une expérience unique pour vos utilisateurs</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowAIAssistant(!showAIAssistant)}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#841b60] to-[#6d164f] text-white rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <Sparkles className="w-4 h-4" />
                <span>Assistant IA</span>
              </button>
              
              <button 
                onClick={onPreview}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-all"
              >
                <Eye className="w-4 h-4" />
                <span>Aperçu</span>
              </button>
              
              <button 
                onClick={onSave}
                disabled={isLoading}
                className="flex items-center space-x-2 px-6 py-2 bg-[#841b60] hover:bg-[#6d164f] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{isLoading ? 'Sauvegarde...' : 'Sauvegarder'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto flex">
        {/* Sidebar */}
        <div className="w-80 bg-white/95 backdrop-blur-sm border-r border-gray-200/50 shadow-xl h-[calc(100vh-80px)] overflow-y-auto sticky top-20">
          <div className="flex h-full">
            {/* Navigation tabs */}
            <div className="w-20 border-r border-gray-200/50">
              <ModernEditorSidebar
                activeTab={activeTab}
                onTabChange={onTabChange}
                campaignType={campaignType as any}
              />
            </div>

            {/* Panel content */}
            <div className="flex-1 overflow-y-auto">
              <ModernEditorPanel
                activeStep={activeTab}
                campaign={campaign}
                setCampaign={setCampaign}
              />
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 h-[calc(100vh-120px)] overflow-hidden">
            <div className="h-full flex items-center justify-center p-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#841b60] to-[#6d164f] rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Aperçu de votre campagne</h3>
                <p className="text-gray-600 mb-4">Configurez votre campagne dans le panneau de gauche</p>
                <button
                  onClick={onPreview}
                  className="px-6 py-3 bg-gradient-to-r from-[#841b60] to-[#6d164f] text-white rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  Voir l'aperçu
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* AI Assistant Sidebar */}
        <AnimatePresence>
          {showAIAssistant && (
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              transition={{ duration: 0.3 }}
              className="w-80 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-6 h-fit sticky top-24 mr-6"
            >
              <AIAssistantSidebar 
                campaign={campaign}
                setCampaign={setCampaign}
                isGenerating={isGenerating}
                onGenerate={handleAIGenerate}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ModernEditorLayout;
