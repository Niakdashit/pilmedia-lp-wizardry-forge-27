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
  return <div className={`bg-gray-100 rounded-lg p-6 min-h-[300px] border-2 border-dashed border-gray-300 ${className}`}>
      <div style={{
      backgroundImage: gameBackgroundImage ? `url(${gameBackgroundImage})` : undefined,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }} className="relative bg-white rounded-lg shadow-lg p-6 min-h-[350px] max-w-md mx-auto flex items-center justify-center">
        {!gameBackgroundImage && <div className="text-center text-gray-500">
            <p className="text-sm">Aucune image de fond</p>
            <p className="text-xs mt-1">Ajoutez une image dans l'onglet "Apparence visuelle"</p>
          </div>}
        
        
      </div>
    </div>;
};
export default GameCanvasPreview;