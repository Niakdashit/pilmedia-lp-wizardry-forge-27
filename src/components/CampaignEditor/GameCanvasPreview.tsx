
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
      className={`bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 relative overflow-hidden ${className}`}
      style={{ minHeight: '500px' }}
    >
      {/* Image de fond générale - remplit tout l'arrière-plan */}
      {gameBackgroundImage && (
        <div
          className="absolute inset-0 rounded-lg"
          style={{ 
            backgroundImage: `url(${gameBackgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            zIndex: 1
          }}
        />
      )}

      {/* Conteneur principal du jeu - parfaitement centré */}
      <div
        className="absolute"
        style={{ 
          width: '680px', 
          height: '400px',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 2
        }}
      >
        {/* Template de jackpot - remplit exactement le conteneur 680x400 */}
        {jackpotTemplateImage ? (
          <div
            className="absolute inset-0 rounded-lg"
            style={{
              backgroundImage: `url(${jackpotTemplateImage})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              zIndex: 1
            }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded-lg border-2 border-dashed border-gray-400">
            <div className="text-center text-gray-600 bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-sm">
              <p className="text-sm font-medium mb-1">Aucun modèle de jackpot</p>
              <p className="text-xs text-gray-500">Uploadez un modèle dans "Apparence visuelle"</p>
            </div>
          </div>
        )}

        {/* Jeu (rouleaux + bouton) - absolument centré au-dessus du template */}
        <div
          className="absolute flex flex-col items-center justify-center"
          style={{ 
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
            width: '100%'
          }}
        >
          {renderGame() || (
            <div className="text-center text-gray-700 bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-sm">
              <p className="text-sm font-medium mb-1">Aperçu du jeu</p>
              <p className="text-xs text-gray-500">Le jeu apparaîtra ici</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameCanvasPreview;
