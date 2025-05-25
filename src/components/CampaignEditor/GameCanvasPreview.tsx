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
    <div className={`bg-gray-100 rounded-lg p-6 border-2 border-dashed border-gray-300 ${className}`}>
      <div className="relative mx-auto rounded-lg shadow-lg overflow-hidden" style={{ width: '680px', height: '400px' }}>
        {/* ✅ Image de fond */}
        {gameBackgroundImage && (
          <div
            className="absolute inset-0 bg-no-repeat bg-center bg-contain"
            style={{ backgroundImage: `url(${gameBackgroundImage})` }}
          />
        )}

        {/* ✅ Image du modèle visuel */}
        {jackpotTemplateImage && (
          <img
            src={jackpotTemplateImage}
            alt="Modèle de jackpot"
            className="absolute top-0 left-0 z-0 w-[680px] h-auto"
          />
        )}

        {/* ✅ Jeu positionné exactement au centre des emplacements */}
        <div className="absolute z-10 top-[140px] left-1/2 -translate-x-1/2">
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
