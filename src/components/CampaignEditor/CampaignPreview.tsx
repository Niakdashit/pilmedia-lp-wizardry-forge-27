
import React from 'react';
import { motion } from 'framer-motion';
import GameRenderer from './GameRenderer';

interface CampaignPreviewProps {
  campaign: any;
  previewDevice?: "desktop" | "mobile" | "tablet";
}

const CampaignPreview: React.FC<CampaignPreviewProps> = ({ 
  campaign, 
  previewDevice = "desktop" 
}) => {
  const isMobile = previewDevice === "mobile";

  const renderElement = (element: any) => {
    switch (element.type) {
      case 'text':
        return (
          <div
            key={element.id}
            style={{
              position: 'absolute',
              left: element.x,
              top: element.y,
              width: element.width,
              height: element.height,
              fontSize: element.fontSize || '16px',
              color: element.color || '#000',
              fontWeight: element.fontWeight || 'normal',
            }}
          >
            {element.content}
          </div>
        );
      case 'image':
        return (
          <img
            key={element.id}
            src={element.src}
            alt=""
            style={{
              position: 'absolute',
              left: element.x,
              top: element.y,
              width: element.width,
              height: element.height,
              objectFit: 'cover',
            }}
          />
        );
      case 'game':
        return (
          <div
            key={element.id}
            style={{
              position: 'absolute',
              left: element.x,
              top: element.y,
              width: element.width,
              height: element.height,
            }}
          >
            {isMobile ? (
              <div className="text-center text-gray-500 text-sm">
                Aperçu du jeu non disponible en mobile
              </div>
            ) : (
              <GameRenderer 
                campaign={campaign}
                gameSize={campaign.gameSize || 'medium'}
                gamePosition={campaign.gamePosition || 'center'}
                previewDevice={previewDevice}
                gameContainerStyle={{}}
                buttonLabel={campaign.buttonConfig?.text || 'Jouer'}
                buttonColor={campaign.buttonConfig?.color || '#841b60'}
              />
            )}
          </div>
        );
      default:
        return null;
    }
  };

  // Use campaign elements if they exist, otherwise empty array
  const elements = campaign.elements || [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`relative bg-white shadow-lg rounded-lg overflow-hidden ${
        isMobile ? 'w-80 h-[600px]' : 'w-full h-full'
      }`}
      style={{ backgroundColor: campaign.design?.background || '#ebf4f7' }}
    >
      {/* Header */}
      {campaign.screens?.[1]?.showTitle && (
        <div
          className="w-full p-4 text-center"
          style={{ backgroundColor: campaign.design?.blockColor || '#ffffff' }}
        >
          <h1
            style={{
              color: campaign.design?.titleColor || '#000000',
              fontSize: '24px',
            }}
          >
            {campaign.screens?.[1]?.title || campaign.name}
          </h1>
          {campaign.screens?.[1]?.showDescription && campaign.screens?.[1]?.description && (
            <p
              style={{
                color: campaign.design?.titleColor || '#000000',
                fontSize: '14px',
              }}
            >
              {campaign.screens[1].description}
            </p>
          )}
        </div>
      )}

      {/* Canvas Elements */}
      <div className="relative flex-1">
        {elements.map(renderElement)}
      </div>

      {/* Footer */}
      {campaign.screens?.[3]?.showTitle && (
        <div
          className="w-full p-4 text-center"
          style={{ backgroundColor: campaign.design?.blockColor || '#ffffff' }}
        >
          <p
            style={{
              color: campaign.design?.titleColor || '#000000',
              fontSize: '14px',
            }}
          >
            {campaign.screens[3].title || 'Merci pour votre participation !'}
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default CampaignPreview;
