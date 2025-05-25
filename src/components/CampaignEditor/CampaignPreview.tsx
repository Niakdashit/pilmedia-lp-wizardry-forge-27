
import React from 'react';
import GameFunnel from '../GameFunnel';

interface CampaignPreviewProps {
  campaign: any;
}

const CampaignPreview: React.FC<CampaignPreviewProps> = ({ campaign }) => {
  const { design } = campaign;

  // Container style with full height and width
  const containerStyle = {
    width: '100%',
    height: '600px', // Hauteur fixe pour la prévisualisation
    position: 'relative' as const,
    overflow: 'hidden',
    backgroundColor: design.background || '#ebf4f7',
  };

  // Background image wrapper with absolute positioning
  const backgroundStyle = design.backgroundImage ? {
    position: 'absolute' as const,
    inset: 0,
    backgroundImage: `url(${design.backgroundImage})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    zIndex: 0,
  } : {};

  // Content wrapper style to ensure content stays above background
  const contentWrapperStyle = {
    position: 'relative' as const,
    zIndex: 1,
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
  };

  // Inject custom CSS if provided
  const customStyles = design.customCSS ? (
    <style dangerouslySetInnerHTML={{ __html: design.customCSS }} />
  ) : null;

  // Inject custom HTML if provided
  const customHTML = design.customHTML ? (
    <div dangerouslySetInnerHTML={{ __html: design.customHTML }} />
  ) : null;

  return (
    <div style={containerStyle}>
      {customStyles}
      
      {/* Background image */}
      {design.backgroundImage && <div style={backgroundStyle} />}

      {/* Content wrapper */}
      <div style={contentWrapperStyle}>
        {/* Custom HTML */}
        {customHTML}

        {/* Game funnel - respecte les étapes start → form → game → end */}
        <div className="flex-1 flex items-center justify-center p-4">
          <GameFunnel campaign={campaign} />
        </div>
      </div>
    </div>
  );
};

export default CampaignPreview;
