
import React, { useState } from 'react';
import Modal from '../common/Modal';
import DynamicContactForm, { FieldConfig } from '../forms/DynamicContactForm';
import { Wheel, Scratch, Jackpot, Dice } from '../GameTypes';
import { useParticipations } from '../../hooks/useParticipations';

interface GameFunnelProps {
  campaign: any;
}

const DEFAULT_FIELDS: FieldConfig[] = [
  { id: "civilite", label: "Civilité", type: "select", options: ["M.", "Mme"], required: false },
  { id: "prenom", label: "Prénom", required: true },
  { id: "nom", label: "Nom", required: true },
  { id: "email", label: "Email", type: "email", required: true }
];

const FunnelUnlockedGame: React.FC<GameFunnelProps> = ({ campaign }) => {
  const [formValidated, setFormValidated] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [gamePlayed, setGamePlayed] = useState(false);
  const [gameResult, setGameResult] = useState<'win' | 'lose' | null>(null);
  
  const { createParticipation, loading: participationLoading } = useParticipations();

  const fields: FieldConfig[] =
    Array.isArray(campaign.formFields) && campaign.formFields.length > 0
      ? campaign.formFields
      : DEFAULT_FIELDS;

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
    setGameResult(result);
    setGamePlayed(true);
  };

  const reset = () => {
    setFormValidated(false);
    setGamePlayed(false);
    setGameResult(null);
    setShowFormModal(false);
  };

  const renderGame = () => {
    // Récupérer les props visuelles pour chaque type de jeu
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
        disabled: !formValidated
      };

      switch (campaign.type) {
        case 'wheel':
          return (
            <Wheel 
              config={campaign.gameConfig.wheel} 
              isPreview={true}
              onFinish={handleGameFinish}
              {...commonProps}
            />
          );
        case 'scratch':
          return (
            <Scratch 
              config={campaign.gameConfig.scratch} 
              onConfigChange={() => {}}
              onFinish={handleGameFinish}
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
              customTemplate={customTemplate}
              onFinish={handleGameFinish}
              {...commonProps}
            />
          );
        case 'dice':
          return (
            <Dice 
              config={campaign.gameConfig.dice} 
              onConfigChange={() => {}}
              onFinish={handleGameFinish}
              {...commonProps}
            />
          );
        default:
          return <div className="text-center text-gray-500">Jeu non supporté</div>;
      }
    })();

    return (
      <div style={gameContainerStyle} className="rounded-lg overflow-hidden">
        {customTemplate && (
          <img
            src={customTemplate}
            alt="Game template"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10"
          />
        )}
        
        <div className="relative z-20 h-full">
          {gameComponent}
        </div>

        {/* Overlay de verrouillage */}
        {!formValidated && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center z-30 rounded-lg">
            <div className="text-center text-white p-6">
              <div className="text-6xl mb-4">🔒</div>
              <h3 className="text-xl font-bold mb-2">Jeu verrouillé</h3>
              <p className="text-sm opacity-90">
                Veuillez remplir le formulaire pour jouer
              </p>
            </div>
          </div>
        )}
      </div>
    );
  };

  if (gamePlayed) {
    return (
      <div className="w-full max-w-lg mx-auto p-6 flex flex-col items-center space-y-6">
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-semibold">
            {gameResult === 'win'
              ? campaign.screens[3]?.winMessage || 'Félicitations, vous avez gagné !'
              : campaign.screens[3]?.loseMessage || 'Dommage, réessayez !'}
          </h3>
          <p>{campaign.screens[3]?.ctaMessage || 'Découvrez nos offres ou partagez votre participation.'}</p>
          <div className="flex flex-col space-y-3">
            {campaign.screens[3]?.ctaLink && (
              <a
                href={campaign.screens[3].ctaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                {campaign.screens[3]?.ctaText || "Découvrir l'offre"}
              </a>
            )}
            <button
              onClick={reset}
              className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 transition-colors"
            >
              {campaign.screens[3]?.replayButtonText || 'Rejouer'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto p-6 flex flex-col items-center space-y-6">
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

      {/* Bouton Participer */}
      {!formValidated && (
        <button
          onClick={() => setShowFormModal(true)}
          className="px-8 py-3 bg-[#841b60] text-white rounded-lg shadow-md hover:bg-[#6d1550] transition-colors font-medium"
        >
          {campaign.screens[0]?.buttonText || 'Participer'}
        </button>
      )}

      {/* Message de confirmation après validation */}
      {formValidated && !gamePlayed && (
        <div className="text-center">
          <p className="text-green-600 font-medium">
            ✅ Formulaire validé ! Vous pouvez maintenant jouer.
          </p>
        </div>
      )}

      {/* Modale du formulaire */}
      {showFormModal && (
        <Modal onClose={() => setShowFormModal(false)} title={campaign.screens[1]?.title || 'Vos informations'}>
          <DynamicContactForm
            fields={fields}
            submitLabel={participationLoading ? 'Chargement...' : (campaign.screens[1]?.buttonText || "C'est parti !")}
            onSubmit={handleFormSubmit}
          />
        </Modal>
      )}
    </div>
  );
};

export default FunnelUnlockedGame;
