
import React from 'react';
import { motion } from 'framer-motion';
import { useModernCampaignStore } from '../../stores/modernCampaignStore';
import { GameRenderer } from '../GameTypes';

interface CampaignPreviewProps {
  campaign: any;
  previewDevice?: "desktop" | "mobile" | "tablet";
}

const CampaignPreview: React.FC<CampaignPreviewProps> = ({ 
  campaign, 
  previewDevice = "desktop" 
}) => {
  const { 
    selectedElements, 
    canvasBackground, 
    headerConfig, 
    footerConfig,
    gameConfig 
  } = useModernCampaignStore();

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
              <GameRenderer gameType={campaign.gameType} config={gameConfig} />
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`relative bg-white shadow-lg rounded-lg overflow-hidden ${
        isMobile ? 'w-80 h-[600px]' : 'w-full h-full'
      }`}
      style={{ backgroundColor: canvasBackground }}
    >
      {/* Header */}
      {headerConfig.show && (
        <div
          className="w-full p-4 text-center"
          style={{ backgroundColor: headerConfig.backgroundColor }}
        >
          <h1
            style={{
              color: headerConfig.textColor,
              fontSize: headerConfig.fontSize || '24px',
            }}
          >
            {headerConfig.title}
          </h1>
          {headerConfig.subtitle && (
            <p
              style={{
                color: headerConfig.textColor,
                fontSize: '14px',
              }}
            >
              {headerConfig.subtitle}
            </p>
          )}
        </div>
      )}

      {/* Canvas Elements */}
      <div className="relative flex-1">
        {selectedElements.map(renderElement)}
      </div>

      {/* Footer */}
      {footerConfig.show && (
        <div
          className="w-full p-4 text-center"
          style={{ backgroundColor: footerConfig.backgroundColor }}
        >
          <p
            style={{
              color: footerConfig.textColor,
              fontSize: footerConfig.fontSize || '14px',
            }}
          >
            {footerConfig.text}
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default CampaignPreview;
