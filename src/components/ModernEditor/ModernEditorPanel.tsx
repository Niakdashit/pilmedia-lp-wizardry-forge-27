
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ModernGeneralTab from './ModernGeneralTab';
import ModernGameTab from './ModernGameTab';
import ModernDesignTab from './ModernDesignTab';
import ModernFormTab from './ModernFormTab';
import ModernGameConfigTab from './ModernGameConfigTab';
import ModernMobileTab from './ModernMobileTab';

interface ModernEditorPanelProps {
  activeTab: string;
  campaign: any;
  setCampaign: (updater: (prev: any) => any) => void;
}

const ModernEditorPanel: React.FC<ModernEditorPanelProps> = ({
  activeTab,
  campaign,
  setCampaign
}) => {
  const handleGameSizeChange = (size: 'small' | 'medium' | 'large' | 'xlarge') => {
    setCampaign((prev: any) => ({
      ...prev,
      gameSize: size
    }));
  };

  const handleGamePositionChange = (position: 'top' | 'center' | 'bottom' | 'left' | 'right') => {
    setCampaign((prev: any) => ({
      ...prev,
      gamePosition: position
    }));
  };

  const handleButtonConfigChange = (config: any) => {
    setCampaign((prev: any) => ({
      ...prev,
      buttonConfig: config
    }));
  };

  return (
    <div className="h-full bg-white/50 backdrop-blur-sm">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="h-full overflow-y-auto"
        >
          <div className="p-6">
            {activeTab === 'general' && (
              <ModernGeneralTab campaign={campaign} setCampaign={setCampaign} />
            )}
            {activeTab === 'game' && (
              <ModernGameTab campaign={campaign} setCampaign={setCampaign} />
            )}
            {activeTab === 'gameconfig' && (
              <ModernGameConfigTab
                gameSize={campaign.gameSize}
                gamePosition={campaign.gamePosition}
                onGameSizeChange={handleGameSizeChange}
                onGamePositionChange={handleGamePositionChange}
                buttonConfig={campaign.buttonConfig}
                onButtonConfigChange={handleButtonConfigChange}
              />
            )}
            {activeTab === 'design' && (
              <ModernDesignTab campaign={campaign} setCampaign={setCampaign} />
            )}
            {activeTab === 'form' && (
              <ModernFormTab campaign={campaign} setCampaign={setCampaign} />
            )}
            {activeTab === 'mobile' && (
              <ModernMobileTab campaign={campaign} setCampaign={setCampaign} />
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ModernEditorPanel;
