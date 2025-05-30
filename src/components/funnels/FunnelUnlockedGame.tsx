import React, { useState } from 'react';
import Modal from '../common/Modal';
import ValidationMessage from '../common/ValidationMessage';
import ContrastBackground from '../common/ContrastBackground';
import DynamicContactForm, { FieldConfig } from '../forms/DynamicContactForm';
import { Wheel, Jackpot } from '../GameTypes';
import ScratchPreview from '../GameTypes/ScratchPreview';
import DicePreview from '../GameTypes/DicePreview';
import { useParticipations } from '../../hooks/useParticipations';

const DEFAULT_FIELDS: FieldConfig[] = [{
  id: "civilite",
  label: "Civilité",
  type: "select",
  options: ["M.", "Mme"],
  required: false
}, {
  id: "prenom",
  label: "Prénom",
  required: true
}, {
  id: "nom",
  label: "Nom",
  required: true
}, {
  id: "email",
  label: "Email",
  type: "email",
  required: true
}];

interface GameFunnelProps {
  campaign: any;
  modalContained?: boolean;
  mobileConfig?: any;
  previewMode?: 'mobile' | 'tablet'; // <-- Ajout pour la preview
}

const FunnelUnlockedGame: React.FC<GameFunnelProps> = ({
  campaign,
  modalContained = false,
  mobileConfig,
  previewMode, // <-- Ajout
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

  const fields: FieldConfig[] = Array.isArray(campaign.formFields) && campaign.formFields.length > 0 ? campaign.formFields : DEFAULT_FIELDS;

  const handleFormSubmit = async (formData: Record<string, string>) => {
    if (campaign.id) {
      const participation = await createParticipation({
        campaign_id: campaign.id,
        form_data: formData,
        user_email: formData.email
      });
      if (participation) {
        // Optionnel : traiter la participation
      }
    }
    setShowFormModal(false);
    setFormValidated(true);
    setShowValidationMessage(true);
    setTimeout(() => {
      setShowValidationMessage(false);
    }, 1500);
  };

  const handleGameFinish = (result: 'win' | 'lose') => {
    setTimeout(() => {
      setGameResult(result);
      setGamePlayed(true);
    }, 1500);
  };

  const handleGameStart = () => {
    setGameStarted(true);
  };

  const handleGameButtonClick = () => {
    if (!formValidated) {
      setShowFormModal(true);
      return;
    }
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

  const renderGame = () => {
    // Pour éviter la duplication d'image, ne pas passer backgroundImage au jeu
    // L'image de fond est gérée par le conteneur parent
    const buttonLabel = campaign.gameConfig?.[campaign.type]?.buttonLabel;
    const buttonColor = campaign.gameConfig?.[campaign.type]?.buttonColor;
    const contrastBg = mobileConfig?.contrastBackground || campaign.screens?.[2]?.contrastBackground;

    const gameContainerStyle: any = {
      position: 'relative',
      width: '100%',
      height: mobileConfig ? 'auto' : '400px',
      minHeight: mobileConfig ? '200px' : '400px',
      maxHeight: mobileConfig ? '300px' : 'none'
    };

    const gameComponent = (() => {
      const commonProps = {
        disabled: !formValidated,
        onFinish: handleGameFinish,
        onStart: handleGameStart
      };

      switch (campaign.type) {
        case 'wheel':
          return <Wheel config={campaign.gameConfig.wheel} isPreview={true} {...commonProps} />;
        case 'scratch':
          return <ScratchPreview config={campaign.gameConfig.scratch} />;
        case 'jackpot':
          return <Jackpot 
            isPreview={true} 
            instantWinConfig={campaign.gameConfig?.jackpot?.instantWin} 
            buttonLabel={buttonLabel} 
            buttonColor={buttonColor} 
            selectedTemplate={selectedTemplateId}
            {...commonProps} 
          />;
        case 'dice':
          return <DicePreview config={campaign.gameConfig.dice} />;
        default:
          return <div className="text-center text-gray-500">Jeu non supporté</div>;
      }
    })();

    return (
      <div style={gameContainerStyle} className="rounded-lg overflow-hidden relative">
        <div className="relative z-20 h-full">
          <ContrastBackground
            enabled={contrastBg?.enabled && contrastBg?.applyToGame}
            config={contrastBg}
            className="h-full flex items-center justify-center"
          >
            {gameComponent}
          </ContrastBackground>
        </div>
        {!formValidated && (
          <div onClick={handleGameButtonClick} className="absolute inset-0 flex items-center justify-center z-30 rounded-lg cursor-pointer bg-black/0" />
        )}
        <ValidationMessage
          show={showValidationMessage}
          message="Formulaire validé ! Vous pouvez maintenant jouer."
          type="success"
        />
      </div>
    );
  };

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

  // ----------- AJOUT FOCUS : previewMode pour mobile/tablette --------------
  if (previewMode === 'mobile' || previewMode === 'tablet' || mobileConfig) {
    return (
      <div className="w-full flex flex-col items-center space-y-3">
        {renderGame()}
        {showFormModal && (
          <Modal 
            onClose={() => setShowFormModal(false)} 
            title={campaign.screens[1]?.title || 'Vos informations'}
            contained={modalContained}
            noOverlay
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
  // -------------------------------------------------------------------------

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
