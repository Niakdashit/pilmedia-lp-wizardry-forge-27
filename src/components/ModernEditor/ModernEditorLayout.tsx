
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import ModernEditorSidebar from './ModernEditorSidebar';
import ModernEditorPanel from './ModernEditorPanel';
import AIAssistantSidebar from './AIAssistantSidebar';
import EditorHeader from './components/EditorHeader';
import PreviewCanvas from './components/PreviewCanvas';
import { useAppContext } from '../../context/AppContext';

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
  previewDevice,
  onDeviceChange,
  onSave,
  onPreview,
  isLoading,
  isNewCampaign,
  campaignType
}) => {
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const { dispatch } = useAppContext();

  // Force collapse the main sidebar when entering this page
  useEffect(() => {
    dispatch({ type: 'SET_SIDEBAR_COLLAPSED', payload: true });
  }, [dispatch]);

  const handleAIGenerate = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#ebf4f7] to-[#f1f5f9] flex flex-col">
      {/* Header */}
      <EditorHeader
        campaign={campaign}
        onSave={onSave}
        onPreview={onPreview}
        isLoading={isLoading}
        isNewCampaign={isNewCampaign}
        selectedDevice={previewDevice}
        onDeviceChange={onDeviceChange}
      />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Editor Sidebar - Fixed width */}
        <div className="w-80 bg-white/95 backdrop-blur-sm border-r border-gray-200/50 shadow-xl h-full overflow-y-auto">
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

        {/* Main Content Area - Preview Canvas with fixed dimensions */}
        <div className="flex-1 flex flex-col">
          {/* AI Assistant Toggle */}
          <div className="p-4 bg-white/50 border-b border-gray-200/50">
            <div className="flex justify-end">
              <button
                onClick={() => setShowAIAssistant(!showAIAssistant)}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#841b60] to-[#6d164f] text-white rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <Sparkles className="w-4 h-4" />
                <span>Assistant IA</span>
              </button>
            </div>
          </div>

          {/* Preview Area with fixed dimensions */}
          <div className="flex-1 relative overflow-hidden">
            <div className="w-full h-full flex items-center justify-center p-8 bg-gray-50">
              <div 
                className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
                style={{ 
                  width: '1200px', 
                  height: '800px',
                  minWidth: '1200px',
                  minHeight: '800px',
                  maxWidth: '1200px',
                  maxHeight: '800px'
                }}
              >
                <PreviewCanvas
                  campaign={campaign}
                  selectedDevice={previewDevice}
                />
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
                  className="absolute top-4 right-4 w-80 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-6"
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
    </div>
  );
};

export default ModernEditorLayout;
