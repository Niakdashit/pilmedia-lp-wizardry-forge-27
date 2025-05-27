
import React from 'react';
import { X } from 'lucide-react';
import FunnelUnlockedGame from '../funnels/FunnelUnlockedGame';
import FunnelStandard from '../funnels/FunnelStandard';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: any;
}

const PreviewModal: React.FC<PreviewModalProps> = ({ isOpen, onClose, campaign }) => {
  if (!isOpen) return null;

  const getPreviewFunnel = () => {
    if (['wheel', 'scratch', 'jackpot', 'dice'].includes(campaign.type)) {
      return <FunnelUnlockedGame campaign={campaign} />;
    }
    return <FunnelStandard campaign={campaign} />;
  };

  // Récupérer l'image de fond du jeu
  const gameBackgroundImage = campaign.gameConfig?.[campaign.type]?.backgroundImage || 
                              campaign.design?.backgroundImage;
  
  // Récupérer le template personnalisé (notamment pour jackpot)
  const customTemplate = campaign.gameConfig?.[campaign.type]?.customTemplate ||
                         campaign.gameConfig?.[campaign.type]?.jackpotTemplate;

  const getBackgroundStyle = () => {
    const style: any = {
      position: 'relative',
      width: '100%',
      height: '100%',
      backgroundColor: campaign.design?.background || '#ebf4f7'
    };

    if (gameBackgroundImage) {
      style.backgroundImage = `url(${gameBackgroundImage})`;
      style.backgroundSize = 'cover';
      style.backgroundPosition = 'center';
      style.backgroundRepeat = 'no-repeat';
    }

    return style;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white w-full h-full flex flex-col relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800">Aperçu de la campagne</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 pt-20 overflow-auto">
          <div style={getBackgroundStyle()}>
            {/* Template personnalisé overlay (pour jackpot, etc.) */}
            {customTemplate && (
              <div className="absolute inset-0 z-10 pointer-events-none">
                <img
                  src={customTemplate}
                  alt="Custom template"
                  className="w-full h-full object-contain"
                />
              </div>
            )}

            {/* Contenu du funnel avec z-index plus élevé */}
            <div className="relative z-20 w-full h-full flex items-center justify-center">
              {getPreviewFunnel()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
