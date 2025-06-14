
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Eye, Save, Monitor, Tablet, Smartphone, Menu, X, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CampaignType } from '../../utils/campaignTypes';
import ModernEditorSidebar from './ModernEditorSidebar';
import ModernEditorCanvas from './ModernEditorCanvas';
import ModernEditorPanel from './ModernEditorPanel';

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
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 to-gray-100 overflow-x-hidden">
      {/* Header - Fixed top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
        <div className="flex items-center justify-between px-4 md:px-6 py-3">
          {/* Left section */}
          <div className="flex items-center space-x-4">
            {/* Exit button */}
            <button
              onClick={handleExit}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            
            {/* Mobile panel toggle */}
            <button
              onClick={toggleMobilePanel}
              className="md:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <h1 className="text-lg md:text-xl font-bold text-gray-900">
                {isNewCampaign ? 'Nouvel Éditeur' : campaign.name}
              </h1>
              <p className="text-xs md:text-sm text-gray-500">
                {gameTypeLabels[campaignType]} • {isNewCampaign ? 'Brouillon' : campaign.status}
              </p>
            </div>
          </div>

          {/* Center - Device selector */}
          <div className="hidden md:flex items-center bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => onDeviceChange('desktop')}
              className={`p-2 rounded-lg transition-colors ${
                previewDevice === 'desktop' ? 'bg-white shadow-sm text-[#841b60]' : 'hover:bg-gray-200'
              }`}
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDeviceChange('tablet')}
              className={`p-2 rounded-lg transition-colors ${
                previewDevice === 'tablet' ? 'bg-white shadow-sm text-[#841b60]' : 'hover:bg-gray-200'
              }`}
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDeviceChange('mobile')}
              className={`p-2 rounded-lg transition-colors ${
                previewDevice === 'mobile' ? 'bg-white shadow-sm text-[#841b60]' : 'hover:bg-gray-200'
              }`}
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-2 md:space-x-3">
            <button
              onClick={onPreview}
              className="flex items-center space-x-2 px-3 md:px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span className="hidden md:inline">Aperçu</span>
            </button>
            
            <button
              onClick={onSave}
              disabled={isLoading}
              className="flex items-center space-x-2 px-3 md:px-4 py-2 bg-gradient-to-r from-[#841b60] to-[#6d164f] hover:from-[#6d164f] hover:to-[#841b60] text-white rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span className="hidden md:inline">{isLoading ? 'Sauvegarde...' : 'Sauvegarder'}</span>
            </button>
          </div>
        </div>

        {/* Mobile device selector */}
        <div className="md:hidden flex justify-center py-2 border-t border-gray-100">
          <div className="flex items-center bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => onDeviceChange('desktop')}
              className={`p-2 rounded-lg transition-colors ${
                previewDevice === 'desktop' ? 'bg-white shadow-sm text-[#841b60]' : 'hover:bg-gray-200'
              }`}
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDeviceChange('tablet')}
              className={`p-2 rounded-lg transition-colors ${
                previewDevice === 'tablet' ? 'bg-white shadow-sm text-[#841b60]' : 'hover:bg-gray-200'
              }`}
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDeviceChange('mobile')}
              className={`p-2 rounded-lg transition-colors ${
                previewDevice === 'mobile' ? 'bg-white shadow-sm text-[#841b60]' : 'hover:bg-gray-200'
              }`}
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex w-full pt-16 md:pt-20">
        {/* Mobile overlay */}
        {isMobilePanelOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black/30 z-40"
            onClick={() => setIsMobilePanelOpen(false)}
          />
        )}

        {/* Side panel - Fixed width to prevent layout shifts */}
        <AnimatePresence mode="wait">
          {(isPanelOpen || isMobilePanelOpen) && (
            <motion.div
              initial={{ x: -400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -400, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`${
                isMobilePanelOpen ? 'fixed inset-0 w-full max-w-full sm:max-w-sm' : 'hidden md:flex'
              } bg-white/95 backdrop-blur-md border-r border-gray-200/50 shadow-xl z-40 h-full overflow-y-auto relative`}
              style={{
                width: isMobilePanelOpen ? 'auto' : '400px',
                flexShrink: 0
              }}
            >
              {/* Panel collapse button - desktop only */}
              <button
                onClick={togglePanel}
                className="hidden md:flex absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-xl transition-colors z-50"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Mobile close button */}
              <button
                onClick={() => setIsMobilePanelOpen(false)}
                className="md:hidden absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-xl z-50"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex h-full min-w-0">
                {/* Sidebar tabs */}
                <div className="w-20 flex-shrink-0 border-r border-gray-200/50">
                  <ModernEditorSidebar
                    activeTab={activeTab}
                    onTabChange={onTabChange}
                    campaignType={campaignType}
                  />
                </div>

                {/* Panel content */}
                <div className="flex-1 overflow-y-auto min-w-0">
                  <ModernEditorPanel
                    activeTab={activeTab}
                    campaign={campaign}
                    setCampaign={setCampaign}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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

        {/* Canvas area - Fixed to maintain consistent preview size */}
        <div 
          className="bg-gradient-to-br from-gray-50 to-white overflow-hidden"
          style={{
            width: isPanelOpen ? 'calc(100% - 400px)' : '100%',
            transition: 'width 0.3s ease-in-out',
            flexShrink: 0
          }}
        >
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
