import React from 'react';
import Jackpot from '../GameTypes/Jackpot';

interface GameCanvasPreviewProps {
  campaign: any;
  className?: string;
  handleInputChange?: (key: string, value: string) => void;
}

const GameCanvasPreview: React.FC<GameCanvasPreviewProps> = ({
  campaign,
  className = "",
  handleInputChange
}) => {
  const gameBackgroundImage = campaign.gameConfig?.[campaign.type]?.backgroundImage;
  const jackpotTemplateImage = campaign.gameConfig?.[campaign.type]?.customTemplate;
  const buttonLabel = campaign.gameConfig?.[campaign.type]?.buttonLabel || 'Lancer le Jackpot';
  const buttonColor = campaign.gameConfig?.[campaign.type]?.buttonColor || '#ec4899';

  const renderGame = () => {
    switch (campaign.type) {
      case 'jackpot':
        return (
          <Jackpot
            isPreview={true}
            instantWinConfig={{
              mode: 'instant_winner' as const,
              winProbability: campaign.gameConfig?.jackpot?.instantWin?.winProbability || 0.05,
              maxWinners: campaign.gameConfig?.jackpot?.instantWin?.maxWinners,
              winnersCount: 0
            }}
            buttonLabel={buttonLabel}
            buttonColor={buttonColor}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Image de fond étendue sur tout le container */}
      {gameBackgroundImage && (
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${gameBackgroundImage})` }}
        />
      )}

      {/* Template jackpot s’il existe */}
      {jackpotTemplateImage && (
        <img
          src={jackpotTemplateImage}
          className="absolute inset-0 w-full h-full object-contain z-10"
          alt="Jackpot Template"
        />
      )}

      {/* Contenu centré au-dessus */}
      <div className="relative z-20 flex items-center justify-center w-full h-full px-4">
        {renderGame() || (
          <div className="text-center text-gray-500">
            <p className="text-sm">Aperçu du jeu Jackpot</p>
            <p className="text-xs mt-1">Le jeu apparaîtra ici</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameCanvasPreview;
