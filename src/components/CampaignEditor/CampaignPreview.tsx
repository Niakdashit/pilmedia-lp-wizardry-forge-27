
import React from 'react';
import FunnelUnlockedGame from '../funnels/FunnelUnlockedGame';
import FunnelStandard from '../funnels/FunnelStandard';

interface CampaignPreviewProps {
  campaign: any;
}

const CampaignPreview: React.FC<CampaignPreviewProps> = ({ campaign }) => {
  const { design } = campaign;

  // Prioriser l'image de fond du design général
  const backgroundImage = design?.backgroundImage || campaign.gameConfig?.[campaign.type]?.backgroundImage;

  const containerStyle = {
    width: '100%',
    height: '100%',
    position: 'relative' as const,
    overflow: 'hidden',
    backgroundColor: design?.background || '#f8fafc',
  };

  const backgroundStyle = backgroundImage ? {
    position: 'absolute' as const,
    inset: 0,
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    opacity: 0.3,
    zIndex: 0,
  } : {};

  const contentWrapperStyle = {
    position: 'relative' as const,
    zIndex: 1,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  };

  const customStyles = design?.customCSS ? (
    <style dangerouslySetInnerHTML={{ __html: design.customCSS }} />
  ) : null;

  const customHTML = design?.customHTML ? (
    <div dangerouslySetInnerHTML={{ __html: design.customHTML }} />
  ) : null;

  const getFunnelComponent = () => {
    const funnel = campaign.funnel || (['wheel', 'scratch', 'jackpot', 'dice'].includes(campaign.type) ? 'unlocked_game' : 'standard');
    if (funnel === 'unlocked_game') {
      return (
        <FunnelUnlockedGame
          campaign={campaign}
          previewMode="desktop"
          modalContained={false}
        />
      );
    }
    return (
      <FunnelStandard
        campaign={campaign}
        key={`${campaign.id}-${JSON.stringify({
          gameConfig: campaign.gameConfig,
          design: campaign.design,
          screens: campaign.screens,
        })}`}
      />
    );
  };

  return (
    <div style={containerStyle}>
      {customStyles}

      {/* Image de fond avec affichage dynamique */}
      {backgroundImage && <div style={backgroundStyle} />}

      {/* Contenu */}
      <div style={contentWrapperStyle}>
        {customHTML}
        {getFunnelComponent()}
      </div>
    </div>
  );
};

export default CampaignPreview;
