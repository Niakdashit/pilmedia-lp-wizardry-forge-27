
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
  handleInputChange
}) => {
  // Image de fond générale (pour tout l'arrière-plan)
  const gameBackgroundImage = campaign.gameConfig?.[campaign.type]?.backgroundImage;

  // Template de jackpot spécifique (680x400)
  const jackpotTemplateImage = campaign.gameConfig?.[campaign.type]?.customTemplate;

  // Configuration du bouton pour le jackpot
  const buttonLabel = campaign.gameConfig?.[campaign.type]?.buttonLabel || 'Lancer le Jackpot';
  const buttonColor = campaign.gameConfig?.[campaign.type]?.buttonColor || '#ec4899';

  // Fonction pour gérer les changements d'input
  const handleChange = (key: string, value: string) => {
    if (handleInputChange) {
      handleInputChange(key, value);
    }
  };

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
              className="absolute inset-0 w-full h-full object-cover z-0"
              alt="Background"
            />
          )}

          {/* Modèle de jackpot - s'affiche uniquement si uploadé (680x400) */}
          {jackpotTemplateImage && (
            <img
              src={jackpotTemplateImage}
              className="absolute inset-0 w-full h-full object-cover z-1"
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
      {handleInputChange && (
        <div className="mt-6 space-y-4">
          {/* Modèle personnalisé du jackpot */}
          <div>
            <label className="block font-medium mb-1">Modèle personnalisé du jackpot (680x400)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    handleChange('customTemplate', reader.result as string);
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[#841b60] file:text-white hover:file:bg-[#6d164f]"
            />
            {jackpotTemplateImage && (
              <div className="mt-2">
                <img
                  src={jackpotTemplateImage}
                  alt="Jackpot Template Preview"
                  className="w-[170px] h-[100px] object-cover border rounded"
                />
              </div>
            )}
          </div>

          {/* Texte du bouton */}
          <div>
            <label className="block font-medium mb-1">Texte du bouton</label>
            <input
              type="text"
              value={buttonLabel}
              onChange={(e) => handleChange('buttonLabel', e.target.value)}
              className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#841b60]"
              placeholder="Ex: Lancer le Jackpot"
            />
          </div>

          {/* Couleur du bouton */}
          <div>
            <label className="block font-medium mb-1">Couleur du bouton</label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={buttonColor}
                onChange={(e) => handleChange('buttonColor', e.target.value)}
                className="h-10 w-20 p-0 border rounded cursor-pointer"
              />
              <input
                type="text"
                value={buttonColor}
                onChange={(e) => handleChange('buttonColor', e.target.value)}
                className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                placeholder="#ec4899"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameCanvasPreview;
