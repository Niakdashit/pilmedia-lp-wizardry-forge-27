import React from 'react';
import Jackpot from '../GameTypes/Jackpot';

interface GameCanvasPreviewProps {
  campaign: any;
  className?: string;
  handleInputChange?: (key: string, value: string) => void;
}

const GameCanvasPreview: React.FC<GameCanvasPreviewProps> = ({
  campaign,
  className = "",
  handleInputChange = () => {}
}) => {
  // Image de fond générale (pour tout l'arrière-plan)
  const gameBackgroundImage = campaign.gameConfig?.[campaign.type]?.backgroundImage;

  // Template de jackpot spécifique (680x400)
  const jackpotTemplateImage = campaign.gameConfig?.[campaign.type]?.customTemplate;

  // Configuration du bouton pour le jackpot
  const buttonLabel = campaign.gameConfig?.[campaign.type]?.buttonLabel || 'Lancer le Jackpot';
  const buttonColor = campaign.gameConfig?.[campaign.type]?.buttonColor || '#ec4899';

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
            buttonLabel={buttonLabel}
            buttonColor={buttonColor}
            hideDefaultTemplate={true}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={`bg-gray-100 rounded-lg p-6 border-2 border-dashed border-gray-300 ${className}`}>
      <div className="w-full max-w-3xl mx-auto relative" style={{ minHeight: '500px' }}>
        {/* Container principal du jeu - dimensions fixes 680x400px, centré */}
        <div
          className="absolute bg-white rounded-lg shadow-lg overflow-hidden"
          style={{
            width: '680px',
            height: '400px',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          {/* Image de fond - s'affiche uniquement si uploadée */}
          {gameBackgroundImage && (
            <img
              src={gameBackgroundImage}
              className="absolute inset-0 w-full h-full object-contain z-0"
              alt="Background"
            />
          )}

          {/* Modèle de jackpot - s'affiche uniquement si uploadé (680x400) */}
          {jackpotTemplateImage && (
            <img
              src={jackpotTemplateImage}
              className="absolute inset-0 w-full h-full object-contain z-1"
              alt="Jackpot Template"
            />
          )}

          {/* Jeu Jackpot - centré au-dessus de tous les visuels */}
          <div
            className="absolute flex items-center justify-center"
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 10,
              width: '100%',
              height: '100%'
            }}
          >
            {renderGame() || (
              <div className="text-center text-gray-500">
                <p className="text-sm">Aperçu du jeu Jackpot</p>
                <p className="text-xs mt-1">Le jeu apparaîtra ici</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CONFIGURATEUR "Apparence visuelle" */}
      <div className="mt-6 space-y-4">
        {/* Modèle personnalisé du jackpot */}
        <div>
          <label className="block font-medium mb-1">Modèle personnalisé du jackpot (680x400)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleInputChange('customTemplate', URL.createObjectURL(file));
            }}
          />
        </div>

        {/* Texte du bouton */}
        <div>
          <label className="block font-medium mb-1">Texte du bouton</label>
          <input
            type="text"
            value={campaign.gameConfig?.[campaign.type]?.buttonLabel || ''}
            onChange={(e) => handleInputChange('buttonLabel', e.target.value)}
            className="border rounded px-3 py-2 w-full"
          />
        </div>

        {/* Couleur du bouton */}
        <div>
          <label className="block font-medium mb-1">Couleur du bouton</label>
          <input
            type="color"
            value={campaign.gameConfig?.[campaign.type]?.buttonColor || '#ec4899'}
            onChange={(e) => handleInputChange('buttonColor', e.target.value)}
            className="h-10 w-20 p-0 border rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default GameCanvasPreview;
