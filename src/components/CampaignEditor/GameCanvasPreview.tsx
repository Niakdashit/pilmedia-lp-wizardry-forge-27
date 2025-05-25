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

  // Choix du jeu en fonction du type
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
      className={`bg-gray-100 rounded-lg p-6 border-2 border-dashed border-gray-300 ${className}`}
    >
      <div className="relative w-full max-w-3xl mx-auto rounded-lg shadow-lg overflow-hidden min-h-[300px]">
        {/* ✅ Image de fond */}
        {gameBackgroundImage && (
          <div
            className="absolute inset-0 bg-no-repeat bg-center bg-contain"
            style={{ backgroundImage: `url(${gameBackgroundImage})` }}
          />
        )}

        {/* ✅ Modèle de jackpot sous les rouleaux */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-4">
          {jackpotTemplateImage && (
            <img
              src={jackpotTemplateImage}
              alt="Modèle de jackpot"
              className="w-full max-w-[700px] h-auto object-contain mb-[-80px] z-0"
            />
          )}

          {/* ✅ Composant de jeu par-dessus */}
          <div className="relative z-10">
            {renderGame() || (
              <div className="text-center text-white backdrop-blur-sm bg-black/30 p-4 rounded">
                <p className="text-sm font-semibold">Aperçu du jeu</p>
                <p className="text-xs mt-1">Sélectionnez un type de jeu pour voir l'aperçu</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCanvasPreview;
