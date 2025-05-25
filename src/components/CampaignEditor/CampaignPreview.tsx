import React from 'react';
import Color from 'color';
import GameFunnel from '../GameFunnel';

interface CampaignPreviewProps {
  campaign: any;
}

const CampaignPreview: React.FC<CampaignPreviewProps> = ({ campaign }) => {
  const { design } = campaign;

  // Image de fond spécifique au jeu ou fallback design
  const gameBackgroundImage = campaign.gameConfig?.[campaign.type]?.backgroundImage || design.backgroundImage;

  const containerStyle = {
    width: '100%',
    height: '100%',
    position: 'relative' as const,
    overflow: 'hidden',
    backgroundColor: design.background || '#ebf4f7',
  };

  const backgroundStyle = gameBackgroundImage ? {
    position: 'absolute' as const,
    inset: 0,
    backgroundImage: `url(${gameBackgroundImage})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover', // plein écran ✅
    zIndex: 0,
  } : {};

  const contentWrapperStyle = {
    position: 'relative' as const,
    zIndex: 1,
    width: '100%',
    height: '100%',
  };

  const centeredGameStyle = {
    position: 'absolute' as const,
    width: '680px',
    height: '400px',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 2,
  };

  const messageStyle = {
    backgroundColor: Color(campaign.design.blockColor || '#FFFFFF').alpha(0.9).toString(),
    backdropFilter: 'blur(8px)',
    borderRadius: campaign.design.borderRadius || '0.5rem',
    padding: '1rem 1.5rem',
    maxWidth: '90%',
    margin: '2rem auto 0',
    boxShadow: campaign.design.shadow === 'shadow-xl' 
      ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      : campaign.design.shadow === 'shadow-md'
      ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      : 'none',
    border: `1px solid ${campaign.design.borderColor || '#E5E7EB'}`,
    zIndex: 3,
    position: 'relative' as const,
  };

  const customStyles = design.customCSS ? (
    <style dangerouslySetInnerHTML={{ __html: design.customCSS }} />
  ) : null;

  const customHTML = design.customHTML ? (
    <div dangerouslySetInnerHTML={{ __html: design.customHTML }} />
  ) : null;

  return (
    <div style={containerStyle}>
      {customStyles}

      {/* Fond */}
      {gameBackgroundImage && <div style={backgroundStyle} />}

      {/* Contenu */}
      <div style={contentWrapperStyle}>
        {customHTML}

        {/* Texte de titre/description */}
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

        {/* Jeu centré */}
        <div style={centeredGameStyle}>
          <GameFunnel campaign={campaign} />
        </div>
      </div>
    </div>
  );
};

export default CampaignPreview;
