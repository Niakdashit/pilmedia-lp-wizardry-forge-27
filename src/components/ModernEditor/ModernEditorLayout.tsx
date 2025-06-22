
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Eye, Save, Wand2, Settings, Gamepad2, FileText, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
  isNewCampaign
}) => {
  const navigate = useNavigate();
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const steps = [
    { id: 'setup', label: 'Configuration', icon: Settings },
    { id: 'content', label: 'Contenu', icon: Wand2 },
    { id: 'game', label: 'Jeu', icon: Gamepad2 },
    { id: 'wording', label: 'Textes', icon: FileText },
    { id: 'preview', label: 'Aperçu', icon: Eye },
    { id: 'publish', label: 'Publication', icon: Sparkles }
  ];

  const handleStepChange = (stepId: string) => {
    onTabChange(stepId);
  };

  const handleAIGenerate = async () => {
    setIsGenerating(true);
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-white border-b border-[#EDF3F7] sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/gamification')}
                className="p-2 hover:bg-[#F3F6F9] rounded-xl transition-colors text-[#64748B] hover:text-[#951B6D]"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-[#141E29]">
                  {isNewCampaign ? 'Nouvelle Campagne' : campaign?.name || 'Ma Campagne'}
                </h1>
                <p className="text-sm text-[#64748B] font-medium">
                  Créez une expérience unique pour vos utilisateurs
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowAIAssistant(!showAIAssistant)}
                className="flex items-center space-x-2 px-4 py-2 bg-[#F3F6F9] text-[#64748B] rounded-xl hover:bg-[#EDF3F7] hover:text-[#951B6D] transition-all duration-300 border border-[#EDF3F7]"
              >
                <Sparkles className="w-4 h-4" />
                <span className="font-semibold">Assistant IA</span>
              </button>
              
              <button 
                onClick={onPreview}
                className="flex items-center space-x-2 px-4 py-2 bg-[#F3F6F9] hover:bg-[#EDF3F7] text-[#64748B] hover:text-[#951B6D] rounded-xl transition-all border border-[#EDF3F7] font-semibold"
              >
                <Eye className="w-4 h-4" />
                <span>Aperçu</span>
              </button>
              
              <button 
                onClick={onSave}
                disabled={isLoading}
                className="flex items-center space-x-2 px-6 py-2 bg-[#951B6D] hover:bg-[#A020F0] text-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 disabled:opacity-50 font-bold"
              >
                <Save className="w-4 h-4" />
                <span>{isLoading ? 'Sauvegarde...' : 'Sauvegarder'}</span>
              </button>
            </div>
          </div>

          {/* Step Navigation */}
          <div className="flex items-center justify-center mt-8 mb-2">
            <div className="flex items-center space-x-2 bg-[#F8FAFC] p-2 rounded-xl border border-[#EDF3F7]">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = activeTab === step.id;
                const isCompleted = steps.findIndex(s => s.id === activeTab) > index;
                
                return (
                  <motion.button
                    key={step.id}
                    onClick={() => handleStepChange(step.id)}
                    className={`relative flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 whitespace-nowrap text-sm font-bold ${
                      isActive 
                        ? 'bg-[#951B6D] text-white shadow-md' 
                        : isCompleted
                        ? 'bg-white text-[#16A34A] hover:bg-[#F0FDF4] shadow-sm border border-[#EDF3F7]'
                        : 'bg-transparent hover:bg-white text-[#64748B] hover:text-[#951B6D] hover:shadow-sm'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{step.label}</span>
                    
                    {isCompleted && !isActive && (
                      <div className="w-2 h-2 bg-[#16A34A] rounded-full"></div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Editor Content */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ModernEditorPanel
                  activeStep={activeTab}
                  campaign={campaign}
                  setCampaign={setCampaign}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* AI Assistant Sidebar */}
          <AnimatePresence>
            {showAIAssistant && (
              <motion.div
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 300 }}
                transition={{ duration: 0.3 }}
                className="w-80 bg-white rounded-xl shadow-sm border border-[#EDF3F7] p-6 h-fit sticky top-24"
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
    </div>
  );
};

export default ModernEditorLayout;
