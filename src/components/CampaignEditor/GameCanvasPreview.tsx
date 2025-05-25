
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
        {gameBackgroundImage && (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${gameBackgroundImage})` }}
          />
        )}

        <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
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
