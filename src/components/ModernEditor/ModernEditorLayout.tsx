
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Eye, Save, Wand2, Settings, Gamepad2, FileText } from 'lucide-react';
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
                ←
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {isNewCampaign ? 'Ma Campagne' : campaign?.name || 'Ma Campagne'}
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

          {/* Step Navigation */}
          <div className="flex items-center space-x-3 mt-6 overflow-x-auto pb-2">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = activeTab === step.id;
              const isCompleted = steps.findIndex(s => s.id === activeTab) > index;
              
              return (
                <motion.button
                  key={step.id}
                  onClick={() => handleStepChange(step.id)}
                  className={`relative flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 whitespace-nowrap text-sm font-medium ${
                    isActive 
                      ? 'bg-[#841b60] text-white shadow-md' 
                      : isCompleted
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="w-4 h-4" />
                  <span>{step.label}</span>
                  
                  {isCompleted && !isActive && (
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  )}
                </motion.button>
              );
            })}
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
                className="w-80 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-6 h-fit sticky top-24"
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
