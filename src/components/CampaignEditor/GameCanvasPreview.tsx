
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
  // Image de fond générale (pour tout l'arrière-plan)
  const gameBackgroundImage =
    campaign.gameConfig?.[campaign.type]?.backgroundImage ||
    campaign.design.backgroundImage;

  // Template de jackpot spécifique (différent de l'image de fond)
  const jackpotTemplateImage = campaign.gameConfig?.jackpot?.customTemplate;

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
      style={{ 
        minHeight: '500px',
        height: gameBackgroundImage ? 'auto' : '500px'
      }}
    >
      {/* Image de fond générale - s'adapte à sa taille sans être coupée */}
      {gameBackgroundImage && (
        <div className="w-full h-auto">
          <img
            src={gameBackgroundImage}
            alt="Image de fond du jeu"
            className="w-full h-auto object-contain rounded-lg"
          />
        </div>
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
        {/* Template de jackpot - s'affiche seulement si uploadé */}
        {jackpotTemplateImage && (
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
        )}

        {/* Jeu (rouleaux + bouton) - absolument centré AU-DESSUS du template */}
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
