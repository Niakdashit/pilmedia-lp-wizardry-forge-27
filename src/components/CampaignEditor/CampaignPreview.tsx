
import React from 'react';
import Color from 'color';
// FIXED: Update import path to use relative path instead of alias
import GameFunnel from '../GameFunnel';

interface CampaignPreviewProps {
  campaign: any;
}

const CampaignPreview: React.FC<CampaignPreviewProps> = ({ campaign }) => {
  const { design } = campaign;

  // Container style with full height and width
  const containerStyle = {
    width: '100%',
    height: '100%',
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

  const messageStyle = {
    backgroundColor: Color(campaign.design.blockColor || '#FFFFFF').alpha(0.9).toString(),
    backdropFilter: 'blur(8px)',
    borderRadius: campaign.design.borderRadius || '0.5rem',
    padding: '1rem 1.5rem',
    maxWidth: '90%',
    margin: '0 auto',
    boxShadow: campaign.design.shadow === 'shadow-xl' 
      ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      : campaign.design.shadow === 'shadow-md'
      ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      : 'none',
    border: `1px solid ${campaign.design.borderColor || '#E5E7EB'}`,
  };

  // Game container style
  const gameContainerStyle = {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
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

        {/* Campaign content */}
        <div style={messageStyle}>
          <h2 
            className="text-2xl font-bold"
            style={{ color: design.titleColor }}
          >
            {campaign.name}
          </h2>
          {campaign.description && (
            <p className="mt-2" style={{ color: design.textColor }}>
              {campaign.description}
            </p>
          )}
        </div>

        {/* Game container */}
        <div style={gameContainerStyle}>
          {/* FIXED: Ensure GameFunnel is properly rendered with explicit JSX */}
          <GameFunnel campaign={campaign} />
        </div>
      </div>
    </div>
  );
};

export default CampaignPreview;
