import React, { useState } from 'react';
import Color from 'color';
import DynamicContactForm, { FieldConfig } from '../forms/DynamicContactForm';
import { Quiz, Wheel, Scratch, Memory, Puzzle, Dice, Jackpot } from './GameTypes';

interface GameFunnelProps {
  campaign: any;
}

const FunnelStandard: React.FC<GameFunnelProps> = ({ campaign }) => {
  const [step, setStep] = useState<'start' | 'form' | 'game' | 'end'>('start');

  const getContrastColor = (bgColor: string) => {
    try {
      const color = Color(bgColor);
      return color.isLight() ? '#000000' : '#FFFFFF';
    } catch {
      return '#000000';
    }
  };

  const handleStart = () => setStep('form');
  const handleFormSubmit = (formData: Record<string, string>) => {
    setStep('game');
  };
  const handleEnd = () => setStep('end');

  const getGameComponent = () => {
    switch (campaign.type) {
      case 'quiz':
        return <Quiz config={campaign.gameConfig.quiz} onConfigChange={() => {}} />;
      case 'memory':
        return <Memory config={campaign.gameConfig.memory} onConfigChange={() => {}} />;
      case 'puzzle':
        return <Puzzle config={campaign.gameConfig.puzzle} onConfigChange={() => {}} />;
      case 'form':
        return <div className="text-center text-gray-500">Formulaire dynamique</div>;
      default:
        return <div className="text-center text-gray-400">Non compatible avec ce funnel</div>;
    }
  };

  // Exemple de champs dynamiques : à rendre dynamique depuis ta config campagne si besoin !
  const fields: FieldConfig[] = [
    { name: "civilite", label: "Civilité", type: "select", options: ["M.", "Mme"], required: false },
    { name: "prenom", label: "Prénom", required: true },
    { name: "nom", label: "Nom", required: true },
    { name: "email", label: "Email", type: "email", required: true }
    // Ajoute d'autres champs selon ta config
  ];

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
            {campaign.screens[0]?.title || 'Ready to Play?'}
          </h2>
          <p
            className="mb-6"
            style={{
              color: getContrastColor(campaign.design.blockColor),
              fontFamily: campaign.design.textFont
            }}
          >
            {campaign.screens[0]?.description || 'Click below to participate'}
          </p>
          <button
            onClick={handleStart}
            className="px-8 py-3 font-medium transition-colors duration-200"
            style={{
              backgroundColor: campaign.design.buttonColor,
              color: getContrastColor(campaign.design.buttonColor),
              borderRadius: campaign.design.borderRadius,
              fontFamily: campaign.design.textFont
            }}
          >
            {campaign.screens[0]?.buttonText || 'Participate'}
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
            {campaign.screens[1]?.title || 'Your Information'}
          </h2>
          <DynamicContactForm
            fields={fields}
            submitLabel={campaign.screens[1]?.buttonText || 'Continuer'}
            onSubmit={handleFormSubmit}
          />
        </div>
      )}

      {step === 'game' && (
        <div className="w-full p-6">
          {getGameComponent()}
          <div className="mt-6 text-center">
            <button
              onClick={handleEnd}
              className="px-6 py-3"
              style={{
                backgroundColor: campaign.design.buttonColor,
                color: getContrastColor(campaign.design.buttonColor),
                borderRadius: campaign.design.borderRadius
              }}
            >
              {campaign.screens[2]?.buttonText || 'Submit'}
            </button>
          </div>
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
            {campaign.screens[3]?.confirmationTitle || 'Thank you!'}
          </h2>
          <p
            className="mb-6"
            style={{
              color: getContrastColor(campaign.design.blockColor),
              fontFamily: campaign.design.textFont
            }}
          >
            {campaign.screens[3]?.confirmationMessage || 'Your participation has been recorded.'}
          </p>
          <button
            onClick={() => setStep('start')}
            className="px-6 py-3 font-medium"
            style={{
              backgroundColor: campaign.design.buttonColor,
              color: getContrastColor(campaign.design.buttonColor),
              borderRadius: campaign.design.borderRadius
            }}
          >
            {campaign.screens[3]?.replayButtonText || 'Play Again'}
          </button>
        </div>
      )}
    </div>
  );
};

export default FunnelStandard;
