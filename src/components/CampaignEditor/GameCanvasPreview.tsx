
import React from 'react';

interface GameCanvasPreviewProps {
  campaign: any;
  className?: string;
}

const GameCanvasPreview: React.FC<GameCanvasPreviewProps> = ({
  campaign,
  className = ""
}) => {
  const gameBackgroundImage = campaign.gameConfig?.[campaign.type]?.backgroundImage || campaign.design.backgroundImage;
  
  return (
    <div className={`bg-gray-100 rounded-lg p-6 min-h-[300px] border-2 border-dashed border-gray-300 ${className}`}>
      <div 
        style={{
          backgroundImage: gameBackgroundImage ? `url(${gameBackgroundImage})` : undefined,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }} 
        className="relative bg-white rounded-lg shadow-lg p-6 min-h-[350px] max-w-md mx-auto flex items-center justify-center"
      >
        {!gameBackgroundImage && (
          <div className="text-center text-gray-500">
            <p className="text-sm">Aucune image de fond</p>
            <p className="text-xs mt-1">Ajoutez une image dans l'onglet "Apparence visuelle"</p>
          </div>
        )}
        
        <div className="absolute bottom-4 left-4 right-4 text-center bg-black bg-opacity-50 rounded p-2">
          <h5 
            className="font-bold text-lg mb-1 text-white"
            style={{
              fontFamily: campaign.design.titleFont
            }}
          >
            {campaign.type.charAt(0).toUpperCase() + campaign.type.slice(1)}
          </h5>
          <p className="text-sm text-white opacity-75">
            Zone de jeu interactive
          </p>
        </div>
      </div>
    </div>
  );
};

export default GameCanvasPreview;
