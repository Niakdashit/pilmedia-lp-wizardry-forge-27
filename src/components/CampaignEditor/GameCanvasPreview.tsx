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
      backgroundPosition: 'center'
    }} className="relative bg-white rounded-lg shadow-lg p-6 min-h-[350px]max-w-md mx-auto">
        {gameBackgroundImage}
        
        <div className="relative z-10 text-center">
          <h5 className="font-bold text-lg mb-2" style={{
          color: campaign.design.titleColor
        }}>
            {campaign.type.charAt(0).toUpperCase() + campaign.type.slice(1)}
          </h5>
          <p className="text-sm opacity-75">
            Zone de jeu interactive
          </p>
        </div>
      </div>
    </div>;
};
export default GameCanvasPreview;
