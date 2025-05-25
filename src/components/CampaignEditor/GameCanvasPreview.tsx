
import React from 'react';

interface GameCanvasPreviewProps {
  campaign: any;
}

const GameCanvasPreview: React.FC<GameCanvasPreviewProps> = ({ campaign }) => {
  // Get game-specific background image or fallback to design background image
  const gameBackgroundImage = campaign.gameConfig?.[campaign.type]?.backgroundImage || campaign.design?.backgroundImage;

  return (
    <div className="relative w-full max-w-3xl mx-auto rounded-lg shadow-lg overflow-hidden" style={{ aspectRatio: '16/9', minHeight: '400px' }}>
      {/* Background image */}
      {gameBackgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${gameBackgroundImage})` }}
        />
      )}

      {/* Game content overlay */}
      <div className="relative z-10 w-full h-full p-6 flex items-center justify-center">
        {gameBackgroundImage ? (
          <div className="text-center text-white bg-black bg-opacity-50 p-4 rounded-lg">
            <p className="text-lg font-medium">Aperçu du jeu {campaign.type}</p>
            <p className="text-sm mt-1">
              Le jeu sera affiché ici avec votre image de fond
            </p>
          </div>
        ) : (
          <div className="text-center text-gray-500">
            <p className="text-sm">Aucune image de fond</p>
            <p className="text-xs mt-1">
              Ajoutez une image dans l'onglet "Apparence visuelle"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameCanvasPreview;
