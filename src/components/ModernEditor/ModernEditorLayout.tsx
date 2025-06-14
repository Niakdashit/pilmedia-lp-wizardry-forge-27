
import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CampaignType } from '../../utils/campaignTypes';
import ModernEditorCanvas from './ModernEditorCanvas';
import EditorHeader from './components/EditorHeader';
import EditorMobilePanel from './components/EditorMobilePanel';
import EditorDesktopPanel from './components/EditorDesktopPanel';

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
  campaignType: CampaignType;
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
  campaignType,
  isNewCampaign,
  gameTypeLabels
}) => {
  const [isPanelOpen, setIsPanelOpen] = useState(
    typeof window !== 'undefined' && window.innerWidth >= 768
  );
  const [isMobilePanelOpen, setIsMobilePanelOpen] = useState(false);
  const navigate = useNavigate();

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  const toggleMobilePanel = () => {
    setIsMobilePanelOpen(!isMobilePanelOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsPanelOpen(false);
      } else {
        setIsPanelOpen(true);
        setIsMobilePanelOpen(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleExit = () => {
    navigate('/gamification');
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      {/* Header - Fixed top bar */}
      <EditorHeader
        campaign={campaign}
        isNewCampaign={isNewCampaign}
        campaignType={campaignType}
        gameTypeLabels={gameTypeLabels}
        previewDevice={previewDevice}
        onDeviceChange={onDeviceChange}
        onExit={handleExit}
        onMobilePanelToggle={toggleMobilePanel}
        onPreview={onPreview}
        onSave={onSave}
        isLoading={isLoading}
      />

      {/* Main content area */}
      <div className="flex w-full pt-16 md:pt-20 h-screen">
        {/* Mobile panel */}
        <EditorMobilePanel
          isOpen={isMobilePanelOpen}
          onClose={() => setIsMobilePanelOpen(false)}
          activeTab={activeTab}
          onTabChange={onTabChange}
          campaign={campaign}
          setCampaign={setCampaign}
          campaignType={campaignType}
        />

        {/* Desktop side panel */}
        <EditorDesktopPanel
          isOpen={isPanelOpen}
          onToggle={togglePanel}
          activeTab={activeTab}
          onTabChange={onTabChange}
          campaign={campaign}
          setCampaign={setCampaign}
          campaignType={campaignType}
        />

        {/* Panel toggle button when panel is closed */}
        {!isPanelOpen && !isMobilePanelOpen && (
          <div className="hidden md:flex fixed left-4 top-1/2 transform -translate-y-1/2 z-40">
            <button
              onClick={togglePanel}
              className="p-3 bg-white/95 backdrop-blur-md hover:bg-white rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-200/50"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Canvas area - Fixed container to prevent layout shifts */}
        <div className="flex-1 h-full overflow-hidden bg-gradient-to-br from-gray-50 to-white">
          <ModernEditorCanvas
            campaign={campaign}
            setCampaign={setCampaign}
            previewDevice={previewDevice}
            gameSize={campaign.gameSize}
            gamePosition={campaign.gamePosition}
          />
        </div>
      </div>
    </div>
  );
};

export default ModernEditorLayout;
