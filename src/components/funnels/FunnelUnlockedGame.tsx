import React, { useState } from 'react';
import Modal from '../common/Modal';
import DynamicContactForm, { FieldConfig } from '../forms/DynamicContactForm';
import { Wheel, Scratch, Jackpot, Dice } from '../GameTypes';
import { useParticipations } from '../../hooks/useParticipations';

interface GameFunnelProps {
  campaign: any;
  modalContained?: boolean; // Nouvelle prop pour les modales contenues
  mobileConfig?: any; // Configuration mobile pour personnaliser l'affichage
}

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

const FunnelUnlockedGame: React.FC<GameFunnelProps> = ({
  campaign,
  modalContained = false,
  mobileConfig
}) => {
  const [formValidated, setFormValidated] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [gamePlayed, setGamePlayed] = useState(false);
  const [gameResult, setGameResult] = useState<'win' | 'lose' | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  
  const {
    createParticipation,
    loading: participationLoading
  } = useParticipations();
  
  const fields: FieldConfig[] = Array.isArray(campaign.formFields) && campaign.formFields.length > 0 ? campaign.formFields : DEFAULT_FIELDS;
  
  const handleFormSubmit = async (formData: Record<string, string>) => {
    console.log('Form data submitted:', formData);
    if (campaign.id) {
      const participation = await createParticipation({
        campaign_id: campaign.id,
        form_data: formData,
        user_email: formData.email
      });
      if (participation) {
        console.log('Participation sauvegardée:', participation);
      }
    }
    setShowFormModal(false);
    setTimeout(() => {
      setFormValidated(true);
    }, 400);
  };
  
  const handleGameFinish = (result: 'win' | 'lose') => {
    // Délai de 1.5 secondes avant d'afficher le résultat pour laisser voir l'animation
    setTimeout(() => {
      setGameResult(result);
      setGamePlayed(true);
    }, 1500);
  };

  const handleGameStart = () => {
    setGameStarted(true);
  };
  
  const handleGameButtonClick = () => {
    // Si le formulaire n'est pas validé, ouvrir la modale
    if (!formValidated) {
      setShowFormModal(true);
      return;
    }
    // Si validé, le jeu se lance (géré par le composant de jeu lui-même)
  };
  
  const reset = () => {
    setGamePlayed(false);
    setGameResult(null);
    setGameStarted(false);
    // On garde formValidated à true pour ne pas redemander le formulaire
  };
  
  const renderGame = () => {
    const gameBackgroundImage = campaign.gameConfig?.[campaign.type]?.backgroundImage;
    const customTemplate = campaign.gameConfig?.[campaign.type]?.customTemplate;
    const buttonLabel = campaign.gameConfig?.[campaign.type]?.buttonLabel;
    const buttonColor = campaign.gameConfig?.[campaign.type]?.buttonColor;
    const gameContainerStyle: any = {
      position: 'relative',
      width: '100%',
      height: '400px',
      minHeight: '400px'
    };
    if (gameBackgroundImage) {
      gameContainerStyle.backgroundImage = `url(${gameBackgroundImage})`;
      gameContainerStyle.backgroundSize = 'cover';
      gameContainerStyle.backgroundPosition = 'center';
      gameContainerStyle.backgroundRepeat = 'no-repeat';
    }
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
          return <Scratch config={campaign.gameConfig.scratch} onConfigChange={() => {}} {...commonProps} />;
        case 'jackpot':
          return <Jackpot isPreview={true} instantWinConfig={campaign.gameConfig?.jackpot?.instantWin} buttonLabel={buttonLabel} buttonColor={buttonColor} backgroundImage={gameBackgroundImage} customTemplate={customTemplate} {...commonProps} />;
        case 'dice':
          return <Dice config={campaign.gameConfig.dice} onConfigChange={() => {}} {...commonProps} />;
        default:
          return <div className="text-center text-gray-500">Jeu non supporté</div>;
      }
    })();
    return <div style={gameContainerStyle} className="rounded-lg overflow-hidden">
        {customTemplate && <img src={customTemplate} alt="Game template" className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10" />}
        
        <div className="relative z-20 h-full">
          {gameComponent}
        </div>

        {/* Overlay si formulaire pas validé avec intercept du clic */}
        {!formValidated && <div onClick={handleGameButtonClick} className="absolute inset-0 flex items-center justify-center z-30 rounded-lg cursor-pointer bg-black/0">
            
          </div>}
      </div>;
  };
  
  if (gamePlayed) {
    return <div className="w-full max-w-lg mx-auto p-6 flex flex-col items-center space-y-6">
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-semibold">
            {gameResult === 'win' ? campaign.screens[3]?.winMessage || 'Félicitations, vous avez gagné !' : campaign.screens[3]?.loseMessage || 'Dommage, réessayez !'}
          </h3>
          <p>{campaign.screens[3]?.ctaMessage || 'Découvrez nos offres ou partagez votre participation.'}</p>
          <div className="flex flex-col space-y-3">
            {campaign.screens[3]?.ctaLink && <a href={campaign.screens[3].ctaLink} target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                {campaign.screens[3]?.ctaText || "Découvrir l'offre"}
              </a>}
            <button onClick={reset} className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 transition-colors">
              {campaign.screens[3]?.replayButtonText || 'Rejouer'}
            </button>
          </div>
        </div>
      </div>;
  }
  
  // Mode mobile : affichage simplifié sans répéter le texte
  if (mobileConfig) {
    return (
      <div className="w-full flex flex-col items-center space-y-4">
        {/* Jeu avec overlay si non validé */}
        {renderGame()}

        {/* Message de confirmation après validation - disparaît après le début du jeu */}
        {formValidated && !gamePlayed && !gameStarted && (
          <div className="text-center">
            <p className="text-green-600 font-medium text-sm">
              ✅ Formulaire validé ! Vous pouvez maintenant jouer.
            </p>
          </div>
        )}

        {/* Modale du formulaire */}
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
  
  // Mode desktop : affichage complet
  return (
    <div className="w-full max-w-lg mx-auto p-6 flex flex-col items-center space-y-6 px-0 py-[23px]">
      {/* Titre et description */}
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold">
          {campaign.screens[0]?.title || 'Tentez votre chance !'}
        </h2>
        <p className="text-gray-600">
          {campaign.screens[0]?.description || 'Participez pour avoir une chance de gagner !'}
        </p>
      </div>

      {/* Jeu avec overlay si non validé */}
      {renderGame()}

      {/* Message de confirmation après validation - disparaît après le début du jeu */}
      {formValidated && !gamePlayed && !gameStarted && (
        <div className="text-center">
          <p className="text-green-600 font-medium">
            ✅ Formulaire validé ! Vous pouvez maintenant jouer.
          </p>
        </div>
      )}

      {/* Modale du formulaire */}
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
