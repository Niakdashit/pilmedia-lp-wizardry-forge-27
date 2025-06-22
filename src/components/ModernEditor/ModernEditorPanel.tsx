
import React from 'react';
import ModernGeneralTab from './ModernGeneralTab';
import ModernGameTab from './ModernGameTab';
import ModernGameConfigTab from './ModernGameConfigTab';
import ModernDesignTab from './ModernDesignTab';
import ModernFormTab from './ModernFormTab';
import ModernMobileTab from './ModernMobileTab';

interface ModernEditorPanelProps {
  activeStep: string;
  campaign: any;
  setCampaign: (updater: (prev: any) => any) => void;
}

const ModernEditorPanel: React.FC<ModernEditorPanelProps> = ({
  activeStep,
  campaign,
  setCampaign
}) => {
  // Ensure campaign has default structure to prevent undefined errors
  const safeSetCampaign = (updater: any) => {
    if (typeof updater === 'function') {
      setCampaign((prev: any) => {
        const currentCampaign = prev || {
          design: {},
          type: 'wheel',
          screens: {},
          buttonConfig: {},
          gameConfig: {}
        };
        return updater(currentCampaign);
      });
    } else {
      setCampaign(() => updater || {
        design: {},
        type: 'wheel',
        screens: {},
        buttonConfig: {},
        gameConfig: {}
      });
    }
  };

  const safeCampaign = campaign || {
    design: {},
    type: 'wheel',
    screens: {},
    buttonConfig: {},
    gameConfig: {}
  };

  const renderContent = () => {
    switch (activeStep) {
      case 'general':
        return <ModernGeneralTab campaign={safeCampaign} setCampaign={safeSetCampaign} />;
      case 'game':
        return <ModernGameTab campaign={safeCampaign} setCampaign={safeSetCampaign} />;
      case 'gameconfig':
        return (
          <ModernGameConfigTab 
            gameSize={safeCampaign.gameSize || 'medium'} 
            gamePosition={safeCampaign.gamePosition || 'center'} 
            onGameSizeChange={size => safeSetCampaign((prev: any) => ({
              ...prev,
              gameSize: size
            }))} 
            onGamePositionChange={position => safeSetCampaign((prev: any) => ({
              ...prev,
              gamePosition: position
            }))} 
            buttonConfig={safeCampaign.buttonConfig || {}} 
            onButtonConfigChange={config => safeSetCampaign((prev: any) => ({
              ...prev,
              buttonConfig: config
            }))} 
          />
        );
      case 'design':
        return <ModernDesignTab campaign={safeCampaign} setCampaign={safeSetCampaign} />;
      case 'form':
        return <ModernFormTab campaign={safeCampaign} setCampaign={safeSetCampaign} />;
      case 'mobile':
        return <ModernMobileTab campaign={safeCampaign} setCampaign={safeSetCampaign} />;
      default:
        return (
          <div className="flex items-center justify-center h-64 text-gray-500 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
            <div className="text-center">
              <p className="text-lg font-medium mb-2">Sélectionnez un onglet</p>
              <p className="text-sm">Choisissez une section pour commencer la configuration</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="h-full bg-white border-r border-gray-200/60 shadow-sm">
      <div className="h-full overflow-y-auto">
        <div className="p-6 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200/60 shadow-sm p-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernEditorPanel;
