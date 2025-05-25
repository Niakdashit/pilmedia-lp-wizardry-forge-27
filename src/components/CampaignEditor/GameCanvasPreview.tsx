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
      <div className="relative w-full max-w-3xl mx-auto rounded-lg shadow-lg overflow-hidden min-h-[300px]">
        {/* ✅ Image de fond */}
        {gameBackgroundImage && (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${gameBackgroundImage})` }}
          />
        )}

        {/* ✅ Ton composant de jeu ici */}
        <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
          {campaign.gameComponent ? (
            <campaign.gameComponent config={campaign.gameConfig} />
          ) : (
            <div className="text-center text-white backdrop-blur-sm bg-black/30 p-4 rounded">
              <p className="text-sm">Aperçu du jeu</p>
              <p className="text-xs mt-1">
                Ajoutez un composant de jeu dans votre configuration
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameCanvasPreview;
