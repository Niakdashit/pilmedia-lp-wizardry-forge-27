import React from 'react';
import Jackpot from '../GameTypes/Jackpot';
import { Quiz } from '../GameTypes';
import WheelPreview from '../GameTypes/WheelPreview';
import MemoryPreview from '../GameTypes/MemoryPreview';
import PuzzlePreview from '../GameTypes/PuzzlePreview';
import ScratchPreview from '../GameTypes/ScratchPreview';
import DicePreview from '../GameTypes/DicePreview';
import ResizableGameContainer from '../common/ResizableGameContainer';

interface GameCanvasPreviewProps {
  campaign: any;
  className?: string;
  setCampaign?: (campaign: any) => void;
}

const GameCanvasPreview: React.FC<GameCanvasPreviewProps> = ({
  campaign,
  className = "",
  setCampaign
}) => {
  // Correction pour récupérer l'image de fond
  const gameBackgroundImage = campaign.gameConfig?.[campaign.type]?.backgroundImage;
  const buttonLabel = campaign.gameConfig?.[campaign.type]?.buttonLabel || 'Lancer le Jackpot';
  const buttonColor = campaign.gameConfig?.[campaign.type]?.buttonColor || '#ec4899';
  const customTemplate = campaign.gameConfig?.[campaign.type]?.customTemplate;
  
  // Récupération du template sélectionné
  const selectedTemplateId = campaign?.design?.template || campaign?.gameConfig?.jackpot?.template;

  // Configuration du jeu redimensionnable - séparation des tailles
  const gameConfig = campaign.config?.[campaign.type] || campaign.gameConfig?.[campaign.type] || {};
  const gameSize = gameConfig.gameSize || { width: 400, height: 400 };
  const templateSize = gameConfig.templateSize || { width: 680, height: 400 };

  const handleGameSizeChange = (size: { width: number; height: number }) => {
    if (setCampaign) {
      setCampaign((prev: any) => ({
        ...prev,
        gameConfig: {
          ...prev.gameConfig,
          [campaign.type]: {
            ...prev.gameConfig?.[campaign.type],
            gameSize: size
          }
        }
      }));
    }
  };

  const handleTemplateSizeChange = (size: { width: number; height: number }) => {
    if (setCampaign) {
      setCampaign((prev: any) => ({
        ...prev,
        gameConfig: {
          ...prev.gameConfig,
          [campaign.type]: {
            ...prev.gameConfig?.[campaign.type],
            templateSize: size
          }
        }
      }));
    }
  };

  const renderGame = () => {
    const gameProps = {
      style: { 
        width: '100%', 
        height: '100%', 
        maxWidth: '100%', 
        maxHeight: '100%',
        overflow: 'hidden'
      }
    };

    switch (campaign.type) {
      case 'jackpot':
        return (
          <div style={gameProps.style}>
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
              selectedTemplate={selectedTemplateId}
              customTemplate={customTemplate}
              gameSize={gameSize}
              templateSize={templateSize}
            />
          </div>
        );
      case 'quiz':
        return (
          <div style={gameProps.style}>
            <Quiz 
              config={campaign.gameConfig?.quiz || {}} 
              campaign={campaign}
            />
          </div>
        );
      case 'wheel':
        return (
          <div style={gameProps.style}>
            <WheelPreview
              campaign={campaign}
              config={{
                mode: 'instant_winner' as const,
                winProbability: campaign.gameConfig?.wheel?.winProbability || 0.1,
                maxWinners: campaign.gameConfig?.wheel?.maxWinners,
                winnersCount: 0
              }}
              onFinish={() => {}}
            />
          </div>
        );
      case 'scratch':
        return (
          <div style={gameProps.style}>
            <ScratchPreview 
              config={campaign.gameConfig?.scratch || {}} 
            />
          </div>
        );
      case 'memory':
        return (
          <div style={gameProps.style}>
            <MemoryPreview 
              config={campaign.gameConfig?.memory || {}} 
            />
          </div>
        );
      case 'puzzle':
        return (
          <div style={gameProps.style}>
            <PuzzlePreview 
              config={campaign.gameConfig?.puzzle || {}} 
            />
          </div>
        );
      case 'dice':
        return (
          <div style={gameProps.style}>
            <DicePreview 
              config={campaign.gameConfig?.dice || {}} 
            />
          </div>
        );
      default:
        return (
          <div className="text-center text-gray-500 flex items-center justify-center h-full">
            <p className="text-sm">Type de jeu non pris en charge</p>
          </div>
        );
    }
  };

  // Fonction pour normaliser l'URL de l'image
  const getImageUrl = (imageData: any) => {
    if (!imageData) return null;
    if (typeof imageData === 'string') return imageData;
    if (imageData.value && imageData.value !== 'undefined') return imageData.value;
    return null;
  };

  const backgroundImageUrl = getImageUrl(gameBackgroundImage);

  return (
    <div className={`relative w-full h-full ${className} flex items-center justify-center`} style={{ minHeight: '400px' }}>
      {/* Image de fond corrigée */}
      {backgroundImageUrl && (
        <img
          src={backgroundImageUrl}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ pointerEvents: 'none' }}
        />
      )}

      {/* Deux conteneurs redimensionnables séparés */}
      <div className="relative z-20 w-full h-full flex items-center justify-center p-4 space-x-4">
        {/* Conteneur pour le jeu */}
        <div className="relative">
          <div className="absolute -top-8 left-0 text-xs text-gray-600 bg-white px-2 py-1 rounded">
            Jeu
          </div>
          <ResizableGameContainer
            initialSize={gameSize}
            onSizeChange={handleGameSizeChange}
            className="bg-white/20 backdrop-blur-sm border-blue-500"
          >
            {renderGame()}
          </ResizableGameContainer>
        </div>

        {/* Conteneur pour le template personnalisé (si jackpot) */}
        {campaign.type === 'jackpot' && customTemplate && (
          <div className="relative">
            <div className="absolute -top-8 left-0 text-xs text-gray-600 bg-white px-2 py-1 rounded">
              Template
            </div>
            <ResizableGameContainer
              initialSize={templateSize}
              onSizeChange={handleTemplateSizeChange}
              className="bg-white/20 backdrop-blur-sm border-green-500"
            >
              <img
                src={getImageUrl(customTemplate)}
                alt="Template personnalisé"
                className="w-full h-full object-contain"
              />
            </ResizableGameContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameCanvasPreview;
