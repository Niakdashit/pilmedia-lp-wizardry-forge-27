
import React, { useState } from 'react';
import { X, Monitor, Smartphone, Tablet } from 'lucide-react';
import CampaignPreview from '../CampaignEditor/CampaignPreview';
import { PREVIEW_CONTAINER_SPECS } from '../CampaignEditor/Mobile/constants';

interface ModernPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: any;
}

const ModernPreviewModal: React.FC<ModernPreviewModalProps> = ({
  isOpen,
  onClose,
  campaign
}) => {
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  if (!isOpen) return null;

  const getDeviceStyles = () => {
    switch (device) {
      case 'mobile':
        return {
          width: `${PREVIEW_CONTAINER_SPECS.mobile.width}px`,
          height: `${PREVIEW_CONTAINER_SPECS.mobile.height}px`,
          backgroundColor: '#1f2937',
          borderRadius: '24px',
          padding: '8px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          position: 'relative',
          overflow: 'hidden'
        } as React.CSSProperties;
      case 'tablet':
        return {
          width: `${PREVIEW_CONTAINER_SPECS.tablet.width}px`,
          height: `${PREVIEW_CONTAINER_SPECS.tablet.height}px`,
          backgroundColor: '#1f2937',
          borderRadius: '24px',
          padding: '8px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          position: 'relative',
          overflow: 'hidden'
        } as React.CSSProperties;
      default:
        return { width: '100%', height: '100%' };
    }
  };

  const getContainerStyle = () => {
    return {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ffffff'
    } as React.CSSProperties;
  };

  // Enhanced campaign with proper custom elements inclusion
  const enhancedCampaign = {
    ...campaign,
    design: {
      ...campaign.design,
      // Ensure custom elements are properly passed to preview
      customImages: campaign.design?.customImages || [],
      customTexts: campaign.design?.customTexts || [],
      buttonColor:
        campaign.buttonConfig?.color || campaign.design?.buttonColor || '#841b60',
      titleColor: campaign.design?.titleColor || '#000000',
      background: campaign.design?.background || '#f8fafc'
    },
    gameConfig: {
      ...campaign.gameConfig,
      [campaign.type]: {
        ...campaign.gameConfig?.[campaign.type],
        buttonLabel:
          campaign.buttonConfig?.text ||
          campaign.gameConfig?.[campaign.type]?.buttonLabel ||
          'Jouer',
        buttonColor:
          campaign.buttonConfig?.color ||
          campaign.gameConfig?.[campaign.type]?.buttonColor ||
          '#841b60'
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full h-full flex flex-col relative overflow-hidden rounded-3xl shadow-2xl max-w-7xl max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-white">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-semibold">Aperçu - {campaign.name}</h2>
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setDevice('desktop')}
                className={`p-2 rounded-md transition-colors ${
                  device === 'desktop' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                }`}
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDevice('tablet')}
                className={`p-2 rounded-md transition-colors ${
                  device === 'tablet' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                }`}
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDevice('mobile')}
                className={`p-2 rounded-md transition-colors ${
                  device === 'mobile' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                }`}
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preview Content */}
        <div className="flex-1 overflow-hidden bg-gray-100">
          <div className="w-full h-full flex items-center justify-center">
            <div
              className="shadow-2xl overflow-hidden"
              style={getDeviceStyles()}
            >
              <div style={getContainerStyle()}>
                <CampaignPreview
                  campaign={enhancedCampaign}
                  previewDevice={device}
                  key={`${device}-${campaign.id}-${JSON.stringify({
                    gameConfig: enhancedCampaign.gameConfig,
                    design: enhancedCampaign.design,
                    screens: enhancedCampaign.screens,
                    customImages: enhancedCampaign.design?.customImages,
                    customTexts: enhancedCampaign.design?.customTexts
                  })}`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernPreviewModal;
