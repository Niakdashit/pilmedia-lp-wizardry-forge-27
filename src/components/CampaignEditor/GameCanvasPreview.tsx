
import React from 'react';

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

  return (
    <div
      className={`bg-gray-100 rounded-lg p-6 border-2 border-dashed border-gray-300 ${className}`}
    >
      <div className="w-full max-w-3xl mx-auto">
        {gameBackgroundImage ? (
          <img
            src={gameBackgroundImage}
            alt="Aperçu du jeu"
            className="w-full h-auto rounded-lg shadow-lg"
            style={{ backgroundSize: 'cover' }}
          />
        ) : (
          <div className="rounded-lg shadow-lg h-[300px] flex items-center justify-center text-center text-gray-500 bg-white">
            <div>
              <p className="text-sm">Aucune image de fond</p>
              <p className="text-xs mt-1">
                Ajoutez une image dans l'onglet "Apparence visuelle"
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameCanvasPreview;
