
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ModernEditorSidebar from './ModernEditorSidebar';
import ModernEditorPanel from './ModernEditorPanel';
import AIAssistantSidebar from './AIAssistantSidebar';
import EditorHeader from './components/EditorHeader';
import GameCanvasPreview from '../CampaignEditor/GameCanvasPreview';

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
        {/* Sidebar - aligné parfaitement avec le header */}
        <div className="w-80 bg-white/95 backdrop-blur-sm border-r border-gray-200/50 shadow-xl flex-shrink-0">
          <div className="flex h-full">
            {/* Navigation tabs - alignés à gauche */}
            <div className="w-20 border-r border-gray-200/50 flex-shrink-0">
              <ModernEditorSidebar
                activeTab={activeTab}
                onTabChange={onTabChange}
                campaignType={campaignType as any}
              />
            </div>

            {/* Panel content - prend le reste de l'espace du sidebar */}
            <div className="flex-1 overflow-y-auto">
              <ModernEditorPanel
                activeStep={activeTab}
                campaign={campaign}
                setCampaign={setCampaign}
              />
            </div>
          </div>
        </div>

        {/* Zone centrale - 100% de l'espace disponible */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Barre d'outils centrée */}
          <div className="bg-white/50 border-b border-gray-200/50 px-6 py-3 flex-shrink-0">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">
                Aperçu en temps réel
              </h2>
            </div>
          </div>

          {/* Zone de prévisualisation - prend tout l'espace disponible */}
          <div className="flex-1 relative bg-gray-50/50 overflow-hidden">
            <div className="absolute inset-0 p-6">
              <GameCanvasPreview
                campaign={campaign}
                gameSize={campaign.gameSize || 'medium'}
                previewDevice={previewDevice}
                className="w-full h-full"
                key={`preview-${activeTab}-${JSON.stringify(campaign.gameConfig)}-${previewDevice}`}
              />
            </div>

            {/* AI Assistant Sidebar - positionné absolument */}
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
    </div>
  );
};

export default ModernEditorLayout;
