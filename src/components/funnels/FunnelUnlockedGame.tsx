
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
    console.log('Game finished with result:', result);
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

  const selectedTemplateId =
    campaign?.design?.template ||
    campaign?.gameConfig?.jackpot?.template ||
    campaign?.gameConfig?.[campaign.type]?.template ||
    campaign?.selectedTemplate;

  // Styles fixes pour la position du jeu
  const getFixedGameContainerStyle = (): React.CSSProperties => {
    const gameSize = campaign.gameSize || 'medium';
    const gamePosition = campaign.gamePosition || 'center';
    
    let maxSize = 280; // desktop par défaut
    if (previewMode === 'mobile') {
      maxSize = 240;
    } else if (previewMode === 'tablet') {
      maxSize = 260;
    }

    // Ajustement de taille selon gameSize
    if (gameSize === 'small') maxSize *= 0.8;
    else if (gameSize === 'large') maxSize *= 1.2;
    else if (gameSize === 'xlarge') maxSize *= 1.5;

    const baseStyle: React.CSSProperties = {
      width: `${maxSize}px`,
      height: `${maxSize}px`,
      flexShrink: 0,
      flexGrow: 0,
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    };

    // Position absolue pour éviter les influences d'autres éléments
    if (gamePosition === 'center') {
      return {
        ...baseStyle,
        margin: '0 auto'
      };
    } else if (gamePosition === 'left') {
      return {
        ...baseStyle,
        alignSelf: 'flex-start'
      };
    } else if (gamePosition === 'right') {
      return {
        ...baseStyle,
        alignSelf: 'flex-end'
      };
    }

    return baseStyle;
  };

  // Rendu du jeu avec dimensions fixes
  const renderGame = () => {
    const gameBackgroundImage = campaign.gameConfig?.[campaign.type]?.backgroundImage;
    const customTemplate = campaign.gameConfig?.[campaign.type]?.customTemplate;
    const buttonLabel = campaign.gameConfig?.[campaign.type]?.buttonLabel;
    const buttonColor = campaign.gameConfig?.[campaign.type]?.buttonColor;
    const contrastBg = mobileConfig?.contrastBackground || campaign.screens?.[2]?.contrastBackground;

    const gameComponent = (() => {
      const commonProps = {
        disabled: !formValidated,
        onFinish: handleGameFinish,
        onStart: handleGameStart,
        previewMode: previewMode
      };

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
              gameSize={campaign.gameSize || 'medium'}
              gamePosition={campaign.gamePosition || 'center'}
            />
          );
        case 'scratch':
          return (
            <ScratchPreview config={campaign.gameConfig?.scratch || {}} />
          );
        case 'jackpot':
          return (
            <Jackpot
              isPreview={true}
              instantWinConfig={campaign.gameConfig?.jackpot?.instantWin}
              buttonLabel={buttonLabel}
              buttonColor={buttonColor}
              backgroundImage={gameBackgroundImage}
              customTemplate={customTemplate}
              selectedTemplate={selectedTemplateId}
              {...commonProps}
            />
          );
        case 'dice':
          return (
            <DicePreview config={campaign.gameConfig?.dice || {}} />
          );
        default:
          return <div className="text-center text-gray-500">Jeu non supporté</div>;
      }
    })();

    return (
      <div style={getFixedGameContainerStyle()} className="rounded-lg overflow-visible relative">
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
        
        {/* Overlay clickable si formulaire non validé */}
        {!formValidated && (
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
          className="text-center space-y-3 w-full inline-block max-w-max mx-auto"
        >
          <h3 className="text-xl font-semibold">
            {gameResult === 'win' ? 
              (resultScreen?.winMessage || 'Félicitations, vous avez gagné !') : 
              (resultScreen?.loseMessage || 'Dommage, réessayez !')}
          </h3>
          <p className="text-sm">
            {resultScreen?.ctaMessage || 'Découvrez nos offres ou partagez votre participation.'}
          </p>
          <div className="flex flex-col space-y-2">
            {resultScreen?.ctaLink && (
              <a 
                href={resultScreen.ctaLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-blue-600 text-white px-4 py-2 text-sm rounded hover:bg-blue-700 transition-colors"
              >
                {resultScreen?.ctaText || "Découvrir l'offre"}
              </a>
            )}
            <button 
              onClick={reset} 
              className="bg-gray-800 text-white px-4 py-2 text-sm rounded hover:bg-gray-900 transition-colors"
            >
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
            width="max-w-sm"
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
          className="text-center space-y-3 inline-block max-w-max mx-auto"
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
          width="max-w-sm"
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
