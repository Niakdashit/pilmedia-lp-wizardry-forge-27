
import React, { useState } from 'react';
import { useParticipations } from '../../hooks/useParticipations';
import GameRenderer from './components/GameRenderer';
import ResultScreen from './components/ResultScreen';
import FormHandler from './components/FormHandler';

interface FunnelUnlockedGameProps {
  campaign: any;
  previewMode?: 'mobile' | 'tablet' | 'desktop';
  mobileConfig?: any;
  modalContained?: boolean;
}

export interface FieldConfig {
  id: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox' | 'radio';
  required?: boolean;
  options?: string[];
}

const FunnelUnlockedGame: React.FC<FunnelUnlockedGameProps> = ({
  campaign,
  previewMode = 'desktop',
  mobileConfig,
  modalContained = true
}) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [formValidated, setFormValidated] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showValidationMessage, setShowValidationMessage] = useState(false);
  const [gameResult, setGameResult] = useState<'win' | 'lose' | null>(null);
  const [participationLoading, setParticipationLoading] = useState(false);

  const { createParticipation } = useParticipations();

  console.log('FunnelUnlockedGame - Current state:', {
    gameStarted,
    formValidated,
    gameResult,
    showFormModal,
    showValidationMessage
  });

  const fields: FieldConfig[] = campaign.formFields || [
    { id: 'prenom', label: 'Prénom', type: 'text', required: true },
    { id: 'nom', label: 'Nom', type: 'text', required: true },
    { id: 'email', label: 'Email', type: 'email', required: true }
  ];

  const handleGameButtonClick = () => {
    console.log('FunnelUnlockedGame - Game button clicked, formValidated:', formValidated);
    if (!formValidated) {
      setShowFormModal(true);
    }
  };

  const handleFormSubmit = async (formData: Record<string, string>) => {
    console.log('FunnelUnlockedGame - Form submitted with data:', formData);
    setParticipationLoading(true);
    
    try {
      if (campaign.id) {
        console.log('Creating participation for campaign:', campaign.id);
        await createParticipation({
          campaign_id: campaign.id,
          form_data: formData,
          user_email: formData.email
        });
        console.log('Participation created successfully');
      }

      setFormValidated(true);
      setShowFormModal(false);
      setShowValidationMessage(true);
      
      setTimeout(() => {
        setShowValidationMessage(false);
      }, 2000);

    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      alert('Erreur lors de la soumission du formulaire');
    } finally {
      setParticipationLoading(false);
    }
  };

  const handleGameStart = () => {
    console.log('FunnelUnlockedGame - Game started');
    setGameStarted(true);
  };

  const handleGameFinish = async (result: 'win' | 'lose') => {
    console.log('FunnelUnlockedGame - Game finished with result:', result);
    
    try {
      if (campaign.id) {
        console.log('Saving game result to participation');
        await createParticipation({
          campaign_id: campaign.id,
          form_data: { game_result: result },
          user_email: ''
        });
        console.log('Game result saved successfully');
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du résultat:', error);
    }
    
    setGameResult(result);
  };

  const handleReset = () => {
    console.log('FunnelUnlockedGame - Resetting game to initial state');
    setGameStarted(false);
    setGameResult(null);
    setFormValidated(false);
    setShowFormModal(false);
    setShowValidationMessage(false);
  };

  // Si on a un résultat de jeu, afficher l'écran de résultat
  if (gameResult) {
    console.log('FunnelUnlockedGame - Rendering result screen with result:', gameResult);
    return (
      <ResultScreen
        gameResult={gameResult}
        campaign={campaign}
        mobileConfig={mobileConfig}
        onReset={handleReset}
      />
    );
  }

  // Sinon, afficher le jeu
  console.log('FunnelUnlockedGame - Rendering game interface');
  return (
    <div className="w-full h-full flex flex-col items-center justify-center space-y-6 p-4">
      {/* Titre et description */}
      <div className="text-center space-y-3 max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          {campaign.screens?.[0]?.title || campaign.screens?.[1]?.title || 'Tentez votre chance !'}
        </h1>
        <p className="text-lg text-gray-600">
          {campaign.screens?.[0]?.description || campaign.screens?.[1]?.description || 'Participez pour avoir une chance de gagner !'}
        </p>
      </div>

      {/* Jeu */}
      <GameRenderer
        campaign={campaign}
        formValidated={formValidated}
        gameStarted={gameStarted}
        showValidationMessage={showValidationMessage}
        previewMode={previewMode}
        mobileConfig={mobileConfig}
        onGameFinish={handleGameFinish}
        onGameStart={handleGameStart}
        onGameButtonClick={handleGameButtonClick}
      />

      {/* Modal de formulaire */}
      <FormHandler
        showFormModal={showFormModal}
        campaign={campaign}
        fields={fields}
        participationLoading={participationLoading}
        modalContained={modalContained}
        onClose={() => {
          console.log('FunnelUnlockedGame - Closing form modal');
          setShowFormModal(false);
        }}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default FunnelUnlockedGame;
