import React from 'react';

interface GamePreviewProps {
  gamePosition: 'top' | 'center' | 'bottom' | 'left' | 'right';
  // Ajoute ici les autres props dont tu as besoin, ex: style, data, etc.
}

const GamePreview: React.FC<GamePreviewProps> = ({ gamePosition }) => {
  // Remplace par tes vrais composants si besoin
  const WheelComponent = (
    <div className="bg-pink-100 w-40 h-40 rounded-full flex items-center justify-center shadow">
      {/* Place ici ta roue réelle */}
      🎡
    </div>
  );
  const PlayButtonComponent = (
    <button className="bg-[#841b60] text-white px-6 py-3 rounded shadow">
      Jouer
    </button>
  );

  // Affichage horizontal si 'left' ou 'right', vertical sinon
  if (gamePosition === 'left') {
    return (
      <div className="flex flex-row items-center justify-center h-full space-x-4">
        {PlayButtonComponent}
        {WheelComponent}
      </div>
    );
  }

  if (gamePosition === 'right') {
    return (
      <div className="flex flex-row items-center justify-center h-full space-x-4">
        {WheelComponent}
        {PlayButtonComponent}
      </div>
    );
  }

  if (gamePosition === 'top') {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        {WheelComponent}
        {PlayButtonComponent}
      </div>
    );
  }

  if (gamePosition === 'bottom') {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        {PlayButtonComponent}
        {WheelComponent}
      </div>
    );
  }

  // Position 'center' ou par défaut
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4">
      {WheelComponent}
      {PlayButtonComponent}
    </div>
  );
};

export default GamePreview;
