
import React, { useState } from 'react';
import ContrastBackground from '../common/ContrastBackground';
import { useParticipations } from '../../hooks/useParticipations';
import GameRenderer from './components/GameRenderer';
import ResultScreen from './components/ResultScreen';
import FormHandler from './components/FormHandler';
import { FieldConfig } from '../forms/DynamicContactForm';

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

  const { createParticipation, loading: participationLoading } = useParticipations();

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

  // Show result screen if game is played
  if (gamePlayed && gameResult) {
    return (
      <ResultScreen
        gameResult={gameResult}
        campaign={campaign}
        mobileConfig={mobileConfig}
        onReset={reset}
      />
    );
  }

  // Mobile config mode
  if (mobileConfig) {
    return (
      <div className="w-full flex flex-col items-center space-y-3">
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
        <FormHandler
          showFormModal={showFormModal}
          campaign={campaign}
          fields={fields}
          participationLoading={participationLoading}
          modalContained={modalContained}
          onClose={() => setShowFormModal(false)}
          onSubmit={handleFormSubmit}
        />
      </div>
    );
  }

  // Default desktop mode
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
      
      <FormHandler
        showFormModal={showFormModal}
        campaign={campaign}
        fields={fields}
        participationLoading={participationLoading}
        modalContained={modalContained}
        onClose={() => setShowFormModal(false)}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default FunnelUnlockedGame;
