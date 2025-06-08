
import React, { useEffect, useState } from 'react';
import { X, Monitor, Smartphone, Tablet } from 'lucide-react';
import CampaignPreview from '../CampaignEditor/CampaignPreview';

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
  const [imageDims, setImageDims] = useState({ width: 1080, height: 1920 });

  useEffect(() => {
    let imgSrc = campaign.design?.backgroundImage;
    if (device === 'mobile') {
      imgSrc = campaign.design?.mobileBackgroundImage || imgSrc;
    }
    const img = new Image();
    if (!imgSrc) {
      setImageDims({ width: 1080, height: 1920 });
      return;
    }
    img.onload = () => {
      setImageDims({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.src = imgSrc;
  }, [campaign.design?.backgroundImage, campaign.design?.mobileBackgroundImage, device]);

  if (!isOpen) return null;

  const getDeviceStyles = () => {
    if (device === 'mobile' || device === 'tablet') {
      return {
        width: `${imageDims.width}px`,
        height: `${imageDims.height}px`,
        backgroundColor: '#1f2937',
        borderRadius: '16px',
        padding: '8px',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
        position: 'relative',
        overflow: 'hidden',
        // Ensure consistent box model
        boxSizing: 'border-box',
        margin: 0
      } as React.CSSProperties;
    }
    // Desktop: full space with no additional containers or constraints
    return { 
      width: '100%', 
      height: '100%', 
      backgroundColor: '#fff',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box'
    } as React.CSSProperties;
  };

  const getContainerStyle = () => ({
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    // Remove any potential padding/margin that could affect positioning
    margin: 0,
    padding: 0,
    boxSizing: 'border-box'
  } as React.CSSProperties);

  // Enhanced campaign with identical configuration as editor
  const enhancedCampaign = {
    ...campaign,
    design: {
      ...campaign.design,
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
