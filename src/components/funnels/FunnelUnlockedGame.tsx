
import React, { useState } from 'react';
import Modal from '../common/Modal';
import ValidationMessage from '../common/ValidationMessage';
import ContrastBackground from '../common/ContrastBackground';
import DynamicContactForm, { FieldConfig } from '../forms/DynamicContactForm';
import WheelPreview from '../GameTypes/WheelPreview';
import { Jackpot } from '../GameTypes';
import ScratchPreview from '../GameTypes/ScratchPreview';
import DicePreview from '../GameTypes/DicePreview';
import { useParticipations } from '../../hooks/useParticipations';
import { GAME_SIZES, GameSize } from '../configurators/GameSizeSelector';

const DEFAULT_FIELDS: FieldConfig[] = [
  { id: "civilite", label: "Civilité", type: "select", options: ["M.", "Mme"], required: false },
  { id: "prenom", label: "Prénom", required: true },
  { id: "nom", label: "Nom", required: true },
  { id: "email", label: "Email", type: "email", required: true }
];

interface GameFunnelProps {
  campaign: any;
  modalContained?: boolean;
  mobileConfig?: any;
  previewMode?: 'mobile' | 'tablet' | 'desktop';
}

const FunnelUnlockedGame: React.FC<GameFunnelProps> = ({
  campaign,
  modalContained = false,
  mobileConfig,
  previewMode = 'desktop'
}) => {
  const [formValidated, setFormValidated] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [gamePlayed, setGamePlayed] = useState(false);
  const [gameResult, setGameResult] = useState<'win' | 'lose' | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [showValidationMessage, setShowValidationMessage] = useState(false);

  const {
    createParticipation,
    loading: participationLoading
  } = useParticipations();

  const fields: FieldConfig[] = Array.isArray(campaign.formFields) && campaign.formFields.length > 0
    ? campaign.formFields : DEFAULT_FIELDS;

  const handleFormSubmit = async (formData: Record<string, string>) => {
    if (campaign.id) {
      await createParticipation({
        campaign_id: campaign.id,
        form_data: formData,
        user_email: formData.email
      });
    }
    setShowFormModal(false);
    setFormValidated(true);
    setShowValidationMessage(true);
    setTimeout(() => setShowValidationMessage(false), 1500);
  };

  const handleGameFinish = (result: 'win' | 'lose') => {
    setTimeout(() => {
      setGameResult(result);
      setGamePlayed(true);
    }, 1500);
  };

  const handleGameStart = () => setGameStarted(true);

  const handleGameButtonClick = () => {
    if (!formValidated) setShowFormModal(true);
  };

  const reset = () => {
    setGamePlayed(false);
    setGameResult(null);
    setGameStarted(false);
    setFormValidated(false);
  };

  // Rendu du jeu avec dimensions responsive corrigées
  const renderGame = () => {
    const gameBackgroundImage = campaign.gameConfig?.[campaign.type]?.backgroundImage;
    const buttonLabel = campaign.gameConfig?.[campaign.type]?.buttonLabel || campaign.buttonConfig?.text;
    const buttonColor = campaign.buttonConfig?.color || campaign.gameConfig?.[campaign.type]?.buttonColor || '#841b60';
    const contrastBg = mobileConfig?.contrastBackground || campaign.screens?.[2]?.contrastBackground;

    // Récupérer la taille et position du jeu depuis la campagne
    const gameSize: GameSize = (campaign.gameSize && Object.keys(GAME_SIZES).includes(campaign.gameSize)) 
      ? campaign.gameSize as GameSize 
      : 'medium';
    const gamePosition = campaign.gamePosition || 'center';

    // Dimensions responsive selon le mode d'aperçu
    const getGameContainerStyle = (): React.CSSProperties => {
      const gameDimensions = GAME_SIZES[gameSize];
      let scaleFactor = 1;
      
      if (previewMode === 'mobile') {
        scaleFactor = 0.8;
      } else if (previewMode === 'tablet') {
        scaleFactor = 0.9;
      }

      return {
        width: `${gameDimensions.width * scaleFactor}px`,
        height: `${gameDimensions.height * scaleFactor}px`,
        maxWidth: `${gameDimensions.width * scaleFactor}px`,
        maxHeight: `${gameDimensions.height * scaleFactor}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px',
        margin: '0 auto',
        position: 'relative'
      };
    };

    const gameComponent = (() => {
      const commonProps = {
        disabled: !formValidated,
        onFinish: handleGameFinish,
        onStart: handleGameStart,
        previewMode: previewMode
      };

      // Utiliser le type de campagne pour rendre le bon jeu
      switch (campaign.type) {
        case 'wheel':
          return (
            <WheelPreview 
              campaign={campaign} 
              config={{
                mode: 'instant_winner' as const,
                winProbability: campaign.gameConfig?.wheel?.winProbability || 0.1,
                maxWinners: campaign.gameConfig?.wheel?.maxWinners,
                winnersCount: 0
              }}
              onFinish={handleGameFinish}
              gameSize={gameSize}
              gamePosition={gamePosition}
              previewDevice={previewMode}
            />
          );
        case 'scratch':
          return (
            <ScratchPreview 
              config={campaign.gameConfig?.scratch || {}}
              buttonLabel={buttonLabel}
              buttonColor={buttonColor}
              gameSize={gameSize}
              isPreview={true}
              instantWinConfig={campaign.gameConfig?.scratch?.instantWin || {
                mode: 'instant_winner' as const,
                winProbability: 0.1,
                maxWinners: 10,
                winnersCount: 0
              }}
              {...commonProps}
            />
          );
        case 'jackpot':
          return (
            <Jackpot
              isPreview={true}
              instantWinConfig={campaign.gameConfig?.jackpot?.instantWin}
              buttonLabel={buttonLabel}
              buttonColor={buttonColor}
              backgroundImage={gameBackgroundImage}
              containerBackgroundColor={campaign.gameConfig?.jackpot?.containerBackgroundColor}
              backgroundColor={campaign.gameConfig?.jackpot?.backgroundColor}
              borderColor={campaign.gameConfig?.jackpot?.borderColor}
              borderWidth={campaign.gameConfig?.jackpot?.borderWidth}
              slotBorderColor={campaign.gameConfig?.jackpot?.slotBorderColor}
              slotBorderWidth={campaign.gameConfig?.jackpot?.slotBorderWidth}
              slotBackgroundColor={campaign.gameConfig?.jackpot?.slotBackgroundColor}
              {...commonProps}
            />
          );
        case 'dice':
          return (
            <DicePreview 
              config={campaign.gameConfig?.dice || {}} 
              {...commonProps}
            />
          );
        default:
          return <div className="text-center text-gray-500">Jeu non supporté: {campaign.type}</div>;
      }
    })();

    return (
      <div style={getGameContainerStyle()} className="rounded-lg overflow-visible relative">
        {/* Jeu principal */}
        <div className="relative z-20 w-full h-full flex items-center justify-center">
          <ContrastBackground
            enabled={contrastBg?.enabled && contrastBg?.applyToGame}
            config={contrastBg}
            className="h-full w-full flex items-center justify-center"
          >
            {gameComponent}
          </ContrastBackground>
        </div>
        
        {/* Overlay clickable si formulaire non validé et jeu non commencé */}
        {!formValidated && !gameStarted && (
          <div 
            onClick={handleGameButtonClick}
            className="absolute inset-0 flex items-center justify-center z-30 rounded-lg cursor-pointer bg-black/0" 
          />
        )}

        <ValidationMessage
          show={showValidationMessage}
          message="Formulaire validé ! Vous pouvez maintenant jouer."
          type="success"
        />
      </div>
    );
  };

  // -- Rendu FIN (écran de sortie/victoire/défaite)
  if (gamePlayed) {
    const resultScreen = campaign.screens?.[3] || {};
    const contrastBg = mobileConfig?.contrastBackground || resultScreen.contrastBackground;

    return (
      <div className="w-full max-w-lg mx-auto p-4 flex flex-col items-center space-y-4">
        <ContrastBackground
          enabled={contrastBg?.enabled}
          config={contrastBg}
          className="text-center space-y-3 w-full"
        >
          <h3 className="text-xl font-semibold">
            {gameResult === 'win' ? resultScreen?.winMessage || 'Félicitations, vous avez gagné !' : resultScreen?.loseMessage || 'Dommage, réessayez !'}
          </h3>
          <p className="text-sm">{resultScreen?.ctaMessage || 'Découvrez nos offres ou partagez votre participation.'}</p>
          <div className="flex flex-col space-y-2">
            {resultScreen?.ctaLink && (
              <a href={resultScreen.ctaLink} target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-4 py-2 text-sm rounded hover:bg-blue-700 transition-colors">
                {resultScreen?.ctaText || "Découvrir l'offre"}
              </a>
            )}
            <button onClick={reset} className="bg-gray-800 text-white px-4 py-2 text-sm rounded hover:bg-gray-900 transition-colors">
              {resultScreen?.replayButtonText || 'Rejouer'}
            </button>
          </div>
        </ContrastBackground>
      </div>
    );
  }

  // -- Mode preview device (mobileConfig existe)
  if (mobileConfig) {
    return (
      <div className="w-full flex flex-col items-center space-y-3">
        {renderGame()}
        {showFormModal && (
          <Modal
            onClose={() => setShowFormModal(false)}
            title={campaign.screens[1]?.title || 'Vos informations'}
            contained={modalContained}
          >
            <DynamicContactForm
              fields={fields}
              submitLabel={participationLoading ? 'Chargement...' : campaign.screens[1]?.buttonText || "C'est parti !"}
              onSubmit={handleFormSubmit}
            />
          </Modal>
        )}
      </div>
    );
  }

  // -- Mode fallback classique (desktop)
  const entryScreen = campaign.screens?.[0] || {};
  const contrastBg = entryScreen.contrastBackground;
  const showTitle = entryScreen.showTitle !== false && !gameStarted;
  const showDescription = entryScreen.showDescription !== false && !gameStarted;

  return (
    <div className="w-full max-w-lg mx-auto p-4 flex flex-col items-center space-y-4">
      {(showTitle || showDescription) && (
        <ContrastBackground
          enabled={contrastBg?.enabled}
          config={contrastBg}
          className="text-center space-y-3 w-full"
        >
          {showTitle && (
            <h2 className="text-2xl font-bold">
              {entryScreen?.title || 'Tentez votre chance !'}
            </h2>
          )}
          {showDescription && (
            <p className="text-gray-600">
              {entryScreen?.description || 'Participez pour avoir une chance de gagner !'}
            </p>
          )}
        </ContrastBackground>
      )}
      {renderGame()}
      {showFormModal && (
        <Modal
          onClose={() => setShowFormModal(false)}
          title={campaign.screens[1]?.title || 'Vos informations'}
          contained={modalContained}
        >
          <DynamicContactForm
            fields={fields}
            submitLabel={participationLoading ? 'Chargement...' : campaign.screens[1]?.buttonText || "C'est parti !"}
            onSubmit={handleFormSubmit}
          />
        </Modal>
      )}
    </div>
  );
};

export default FunnelUnlockedGame;
