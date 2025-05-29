import React, { useState } from 'react';
import Color from 'color';
import DynamicContactForm from '../forms/DynamicContactForm';
import { Quiz, Memory, Puzzle } from '../GameTypes';
import { useParticipations } from '../../hooks/useParticipations';

const DEFAULT_FIELDS = [
  { id: "civilite", label: "Civilité", type: "select", options: ["M.", "Mme"], required: false },
  { id: "prenom", label: "Prénom", required: true },
  { id: "nom", label: "Nom", required: true },
  { id: "email", label: "Email", type: "email", required: true }
];

interface GameFunnelProps {
  campaign: any;
}

const FunnelStandard: React.FC<GameFunnelProps> = ({ campaign }) => {
  const [step, setStep] = useState<'start' | 'form' | 'game' | 'end'>('start');
  const [gameScore, setGameScore] = useState<{ score: number; total: number } | null>(null);
  const { createParticipation, loading: participationLoading } = useParticipations();

  const fields = Array.isArray(campaign.formFields) && campaign.formFields.length > 0 
    ? campaign.formFields 
    : DEFAULT_FIELDS;

  const getContrastColor = (bgColor: string) => {
    try {
      const color = Color(bgColor);
      return color.isLight() ? '#000000' : '#FFFFFF';
    } catch {
      return '#000000';
    }
  };

  const handleStart = () => setStep('form');
  
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
    
    setStep('game');
  };
  
  const handleGameComplete = (score?: number, total?: number) => {
    if (score !== undefined && total !== undefined) {
      setGameScore({ score, total });
    }
    setStep('end');
  };

  const getGameComponent = () => {
    const commonProps = {
      campaign,
      onComplete: handleGameComplete,
      onStart: () => console.log('Game started')
    };

    switch (campaign.type) {
      case 'quiz':
        return <Quiz 
          config={campaign.gameConfig?.quiz || {}} 
          {...commonProps}
        />;
      case 'memory':
        return <Memory config={campaign.gameConfig?.memory || {}} onConfigChange={() => {}} />;
      case 'puzzle':
        return <Puzzle config={campaign.gameConfig?.puzzle || {}} onConfigChange={() => {}} />;
      case 'form':
        return <div className="text-center text-gray-500">Formulaire dynamique</div>;
      default:
        return <div className="text-center text-gray-400">Non compatible avec ce funnel</div>;
    }
  };

  const getResultMessage = () => {
    if (gameScore && campaign.type === 'quiz') {
      const percentage = (gameScore.score / gameScore.total) * 100;
      if (percentage >= 80) return 'Excellent résultat !';
      if (percentage >= 60) return 'Bon travail !';
      if (percentage >= 40) return 'Résultat correct !';
      return 'Continuez vos efforts !';
    }
    return campaign.screens[3]?.confirmationMessage || 'Votre participation a été enregistrée.';
  };

  return (
    <div className="w-full flex flex-col items-center">
      {step === 'start' && (
        <div className="text-center p-6">
          <h2
            className="text-2xl font-bold mb-4"
            style={{
              color: campaign.design.titleColor,
              fontFamily: campaign.design.titleFont
            }}
          >
            {campaign.screens[0]?.title || 'Prêt à jouer ?'}
          </h2>
          <p
            className="mb-6"
            style={{
              color: getContrastColor(campaign.design.blockColor),
              fontFamily: campaign.design.textFont
            }}
          >
            {campaign.screens[0]?.description || 'Cliquez ci-dessous pour participer'}
          </p>
          <button
            onClick={handleStart}
            className="px-8 py-3 font-medium transition-colors duration-200 hover:opacity-90"
            style={{
              backgroundColor: campaign.design.buttonColor,
              color: getContrastColor(campaign.design.buttonColor),
              borderRadius: campaign.design.borderRadius,
              fontFamily: campaign.design.textFont
            }}
          >
            {campaign.screens[0]?.buttonText || 'Participer'}
          </button>
        </div>
      )}

      {step === 'form' && (
        <div className="w-full max-w-md p-6">
          <h2
            className="text-2xl font-bold mb-4"
            style={{
              color: campaign.design.titleColor,
              fontFamily: campaign.design.titleFont
            }}
          >
            {campaign.screens[1]?.title || 'Vos informations'}
          </h2>
          <DynamicContactForm
            fields={fields}
            submitLabel={participationLoading ? "Chargement..." : (campaign.screens[1]?.buttonText || "Continuer")}
            onSubmit={handleFormSubmit}
          />
        </div>
      )}

      {step === 'game' && (
        <div className="w-full p-6">
          <div className="mb-6">
            <h2
              className="text-2xl font-bold mb-2 text-center"
              style={{
                color: campaign.design.titleColor,
                fontFamily: campaign.design.titleFont
              }}
            >
              {campaign.screens[2]?.title || 'À vous de jouer !'}
            </h2>
            {campaign.screens[2]?.description && (
              <p
                className="text-center"
                style={{
                  color: getContrastColor(campaign.design.blockColor),
                  fontFamily: campaign.design.textFont
                }}
              >
                {campaign.screens[2].description}
              </p>
            )}
          </div>
          {getGameComponent()}
        </div>
      )}

      {step === 'end' && (
        <div className="text-center p-6">
          <h2
            className="text-3xl font-bold mb-4"
            style={{
              color: campaign.design.titleColor,
              fontFamily: campaign.design.titleFont
            }}
          >
            {campaign.screens[3]?.confirmationTitle || 'Merci !'}
          </h2>
          
          {gameScore && (
            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <div 
                className="text-2xl font-bold mb-2"
                style={{ color: campaign.design.primaryColor }}
              >
                Score: {gameScore.score}/{gameScore.total}
              </div>
              <div className="text-lg text-gray-600">
                {Math.round((gameScore.score / gameScore.total) * 100)}%
              </div>
            </div>
          )}
          
          <p
            className="mb-6"
            style={{
              color: getContrastColor(campaign.design.blockColor),
              fontFamily: campaign.design.textFont
            }}
          >
            {getResultMessage()}
          </p>
          <button
            onClick={() => setStep('start')}
            className="px-6 py-3 font-medium transition-colors duration-200 hover:opacity-90"
            style={{
              backgroundColor: campaign.design.buttonColor,
              color: getContrastColor(campaign.design.buttonColor),
              borderRadius: campaign.design.borderRadius
            }}
          >
            {campaign.screens[3]?.replayButtonText || 'Rejouer'}
          </button>
        </div>
      )}
    </div>
  );
};

export default FunnelStandard;
