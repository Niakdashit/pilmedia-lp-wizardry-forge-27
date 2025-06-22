
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ModernEditorSidebar from './ModernEditorSidebar';
import ModernEditorPanel from './ModernEditorPanel';
import AIAssistantSidebar from './AIAssistantSidebar';
import EditorHeader from './components/EditorHeader';
import GameCanvasPreview from '../CampaignEditor/GameCanvasPreview';
import Layout from '../Layout/Layout';

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
  const [showAIAssistant] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAIGenerate = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGenerating(false);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-white flex flex-col overflow-hidden">
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
          {/* Left Sidebar - Configuration Panel */}
          <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
            {/* Navigation tabs */}
            <div className="w-20 border-r border-gray-200 flex-shrink-0">
              <ModernEditorSidebar
                activeTab={activeTab}
                onTabChange={onTabChange}
                campaignType={campaignType as any}
              />
            </div>

            {/* Panel content */}
            <div className="flex-1 overflow-hidden">
              <ModernEditorPanel
                activeStep={activeTab}
                campaign={campaign}
                setCampaign={setCampaign}
              />
            </div>
          </div>

          {/* Right Side - Preview Area */}
          <div className="flex-1 flex flex-col min-w-0 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
            {/* Fixed size preview container */}
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="w-full max-w-4xl h-full max-h-[600px] bg-white rounded-2xl shadow-2xl overflow-hidden">
                <GameCanvasPreview
                  campaign={campaign}
                  gameSize={campaign.gameSize || 'medium'}
                  previewDevice={previewDevice}
                  className="w-full h-full"
                  key={`preview-${activeTab}-${JSON.stringify(campaign.gameConfig)}-${previewDevice}`}
                />
              </div>
            </div>

            {/* AI Assistant Sidebar - positioned absolutely */}
            <AnimatePresence>
              {showAIAssistant && (
                <motion.div
                  initial={{ opacity: 0, x: 300 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 300 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-4 right-4 w-80 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-6 z-10"
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
    </Layout>
  );
};

export default ModernEditorLayout;
