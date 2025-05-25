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
      className={`bg-gray-100 rounded-lg p-6 min-h-[300px] border-2 border-dashed border-gray-300 ${className}`}
    >
      <div className="relative rounded-lg shadow-lg min-h-[350px] max-w-md mx-auto overflow-hidden">
        {/* ✅ Image de fond */}
        {gameBackgroundImage && (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${gameBackgroundImage})` }}
          />
        )}

        {/* ✅ Contenu */}
        <div className="relative z-10 flex items-center justify-center w-full h-full p-6">
          {!gameBackgroundImage && (
            <div className="text-center text-gray-500">
              <p className="text-sm">Aucune image de fond</p>
              <p className="text-xs mt-1">
                Ajoutez une image dans l'onglet "Apparence visuelle"
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameCanvasPreview;
