import React from 'react';
import Jackpot from '@/components/GameTypes/Jackpot';

interface GameCanvasPreviewProps {
  campaign: any;
  className?: string;
}

const GameCanvasPreview: React.FC<GameCanvasPreviewProps> = ({
  campaign,
  className = ""
}) => {
  const gameBackgroundImage =
    campaign.gameConfig?.[campaign.type]?.backgroundImage ||
    campaign.design.backgroundImage;

  const jackpotTemplateImage =
    campaign.gameConfig?.[campaign.type]?.templateImage;

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
            config={campaign.gameConfig?.jackpot}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 relative ${className}`}
      style={{ minHeight: '500px' }}
    >
      {/* Container centré de 680x400 */}
      <div
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{ width: '680px', height: '400px' }}
      >
        {/* Image de fond */}
        {gameBackgroundImage && (
          <div
            className="absolute inset-0 bg-no-repeat bg-center bg-contain"
            style={{ backgroundImage: `url(${gameBackgroundImage})`, zIndex: 0 }}
          />
        )}

        {/* Modèle de jackpot centré */}
        {jackpotTemplateImage && (
          <img
            src={jackpotTemplateImage}
            alt="Modèle de jackpot"
            className="absolute top-0 left-0 right-0 mx-auto z-0"
            style={{
              width: '680px',
              height: '400px',
              objectFit: 'contain',
            }}
          />
        )}

        {/* Jeu centré dans le template */}
        <div
          className="absolute z-10"
          style={{
            top: '160px',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          {renderGame() || (
            <div className="text-center text-white backdrop-blur-sm bg-black/30 p-4 rounded">
              <p className="text-sm font-semibold">Aperçu du jeu</p>
              <p className="text-xs mt-1">Sélectionnez un type de jeu pour voir l'aperçu</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameCanvasPreview;
