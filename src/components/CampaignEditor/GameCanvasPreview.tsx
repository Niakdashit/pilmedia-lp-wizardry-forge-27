
import React from 'react';
import Jackpot from '@/components/GameTypes/Jackpot';

interface GameCanvasPreviewProps {
  campaign: any;
  className?: string;
}

const GameCanvasPreview: React.FC<GameCanvasPreviewProps> = ({
  campaign,
  className = ''
}) => {
  const gameBackgroundImage =
    campaign.gameConfig?.[campaign.type]?.backgroundImage ||
    campaign.design.backgroundImage;

  const jackpotTemplateImage =
    campaign.gameConfig?.[campaign.type]?.customTemplate;

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
      {/* Image de fond générale (remplit toute la zone grise) */}
      {gameBackgroundImage && (
        <div
          className="absolute inset-0 bg-no-repeat bg-center bg-cover rounded-lg"
          style={{ 
            backgroundImage: `url(${gameBackgroundImage})`,
            zIndex: 0 
          }}
        />
      )}

      {/* Conteneur principal du jeu - absolument centré */}
      <div
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{ 
          width: '680px', 
          height: '400px',
          zIndex: 1
        }}
      >
        {/* Template de jackpot - remplit exactement le conteneur 680x400 */}
        {jackpotTemplateImage ? (
          <img
            src={jackpotTemplateImage}
            alt="Modèle de jackpot"
            className="absolute inset-0 w-full h-full object-contain"
            style={{ zIndex: 0 }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
            <div className="text-center text-white backdrop-blur-sm bg-black/40 p-4 rounded">
              <p className="text-sm font-semibold">Aucun modèle de jackpot</p>
              <p className="text-xs mt-1">Uploadez un modèle dans l'onglet "Apparence visuelle"</p>
            </div>
          </div>
        )}

        {/* Jeu (rouleaux + bouton) - centré au-dessus du template */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2"
          style={{ 
            top: '150px',
            zIndex: 10
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
