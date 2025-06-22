
import React from 'react';
import { useModernCampaignEditor } from '../hooks/useModernCampaignEditor';
import { gameTypeLabels } from '../components/ModernEditor/constants/gameTypeLabels';
import ModernEditorLayout from '../components/ModernEditor/ModernEditorLayout';
import ModernPreviewModal from '../components/ModernEditor/ModernPreviewModal';
import { useAppContext } from '../context/AppContext';

const ModernCampaignEditor: React.FC = () => {
  const { sidebarCollapsed, dispatch } = useAppContext();
  const {
    campaign,
    setCampaign,
    activeTab,
    setActiveTab,
    showPreviewModal,
    setShowPreviewModal,
    previewDevice,
    setPreviewDevice,
    isLoading,
    campaignType,
    isNewCampaign,
    handleSave
  } = useModernCampaignEditor();

  // Force sidebar to be collapsed by default in modern editor
  React.useEffect(() => {
    if (!sidebarCollapsed) {
      dispatch({ type: 'SET_SIDEBAR_COLLAPSED', payload: true });
    }
  }, [sidebarCollapsed, dispatch]);

  return (
    <div className="flex-1 min-w-0">
      <ModernEditorLayout
        campaign={campaign}
        setCampaign={setCampaign}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        previewDevice={previewDevice}
        onDeviceChange={setPreviewDevice}
        onSave={() => handleSave(true)}
        onPreview={() => setShowPreviewModal(true)}
        isLoading={isLoading}
        campaignType={campaignType}
        isNewCampaign={isNewCampaign}
        gameTypeLabels={gameTypeLabels}
      />

      {/* Preview Modal */}
      {showPreviewModal && (
        <ModernPreviewModal
          isOpen={showPreviewModal}
          onClose={() => setShowPreviewModal(false)}
          campaign={campaign}
        />
      )}
    </div>
  );
};

export default ModernCampaignEditor;
