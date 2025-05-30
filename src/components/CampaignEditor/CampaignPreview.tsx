import React from 'react';
import FunnelUnlockedGame from '../funnels/FunnelUnlockedGame';
import FunnelStandard from '../funnels/FunnelStandard';

interface CampaignPreviewProps {
  campaign: any;
}

const CampaignPreview: React.FC<CampaignPreviewProps> = ({ campaign }) => {
  const { design } = campaign;

  // UNIQUEMENT les images de fond du mode desktop/contenu - pas les images mobiles
  const gameBackgroundImage = campaign.gameConfig?.[campaign.type]?.backgroundImage || design.backgroundImage;

  const containerStyle = {
    width: '100%',
    height: '100%',
    position: 'relative' as const,
    overflow: 'hidden',
    backgroundColor: design.background || '#ebf4f7', // Configuration desktop uniquement
  };

  const backgroundStyle = gameBackgroundImage ? {
    position: 'absolute' as const,
    inset: 0,
    backgroundImage: `url(${gameBackgroundImage})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
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

  const customStyles = design.customCSS ? (
    <style dangerouslySetInnerHTML={{ __html: design.customCSS }} />
  ) : null;

  const customHTML = design.customHTML ? (
    <div dangerouslySetInnerHTML={{ __html: design.customHTML }} />
  ) : null;

  // Choisir le bon funnel selon le type de campagne
  const getFunnelComponent = () => {
    if (['wheel', 'scratch', 'jackpot', 'dice'].includes(campaign.type)) {
      return <FunnelUnlockedGame campaign={campaign} previewMode="desktop" />;
    }
    return <FunnelStandard campaign={campaign} />;
  };

  return (
    <div style={containerStyle}>
      {customStyles}

      {/* Fond DESKTOP uniquement */}
      {gameBackgroundImage && <div style={backgroundStyle} />}

      {/* Contenu DESKTOP */}
      <div style={contentWrapperStyle}>
        {customHTML}

        {/* Jeu centré DESKTOP avec le bon funnel */}
        <div style={centeredGameStyle}>
          {getFunnelComponent()}
        </div>
      </div>
    </div>
  );
};

export default CampaignPreview;
