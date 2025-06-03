
import React from 'react';
import GameRenderer from './GameRenderer';
import MobilePreview from '../../CampaignEditor/Mobile/MobilePreview';

interface PreviewContentProps {
  selectedDevice: 'desktop' | 'tablet' | 'mobile';
  mockCampaign: any;
  selectedGameType: string;
  customColors: {
    primary: string;
    secondary: string;
    accent?: string;
  };
  jackpotColors: {
    containerBackgroundColor: string;
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
    slotBorderColor: string;
    slotBorderWidth: number;
    slotBackgroundColor: string;
  };
}

const PreviewContent: React.FC<PreviewContentProps> = ({
  selectedDevice,
  mockCampaign,
  selectedGameType,
  customColors,
  jackpotColors
}) => {
  const renderDesktopPreview = () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-50 relative overflow-hidden">
      {/* Background image if available */}
      {mockCampaign.design?.backgroundImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage: `url(${mockCampaign.design.backgroundImage})`
          }}
        />
      )}
      
      {/* Content container */}
      <div className="relative z-10 max-w-2xl mx-auto p-8 text-center">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {mockCampaign.screens?.[0]?.title || 'Tentez votre chance !'}
          </h1>
          <p className="text-lg text-gray-600">
            {mockCampaign.screens?.[0]?.description || 'Participez pour avoir une chance de gagner !'}
          </p>
        </div>
        
        {/* Game Component */}
        <div className="flex justify-center">
          <GameRenderer
            gameType={selectedGameType || 'wheel'}
            mockCampaign={mockCampaign}
            customColors={customColors}
            jackpotColors={jackpotColors}
          />
        </div>
      </div>
    </div>
  );

  const renderMobilePreview = () => (
    <div className="w-full h-full flex items-center justify-center p-4 bg-gray-50">
      <MobilePreview
        campaign={mockCampaign}
        previewMode={selectedDevice === 'tablet' ? 'tablet' : 'mobile'}
      />
    </div>
  );

  return (
    <div className="flex-1 pt-20 overflow-auto">
      {selectedDevice === 'desktop' ? renderDesktopPreview() : renderMobilePreview()}
    </div>
  );
};

export default PreviewContent;
