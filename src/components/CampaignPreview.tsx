
import React, { useState } from 'react';
import { Campaign } from '../types';

interface PreviewPageProps {
  campaign: Campaign;
  currentStep?: 'welcome' | 'questions' | 'end' | 'form' | 'game';
  onParticipate?: () => Promise<void>;
  onFormSubmit?: (formData: Record<string, string>) => Promise<void>;
  onGameComplete?: () => Promise<void>;
}

const PreviewPage: React.FC<PreviewPageProps> = ({ 
  campaign, 
  currentStep: initialStep = 'welcome',
  onParticipate
}) => {
  const [currentStep, setCurrentStep] = useState<'welcome' | 'questions' | 'end' | 'form' | 'game'>(initialStep);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleStart = () => {
    if (onParticipate) {
      onParticipate();
    } else {
      setCurrentStep('questions');
    }
  };

  const handleNext = () => {
    if (campaign.questions && currentQuestion < campaign.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCurrentStep('end');
    }
  };

  const handleRestart = () => {
    setCurrentStep('welcome');
    setCurrentQuestion(0);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundColor: campaign.colors?.background || '#ffffff',
        color: campaign.colors?.text || '#333333',
        backgroundImage: campaign.background_image ? `url(${campaign.background_image})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="w-full max-w-lg">
        {currentStep === 'welcome' && (
          <div className="text-center fade-in">
            <h1 className="text-3xl font-bold mb-6">{campaign.name}</h1>
            {(campaign.game_content?.description || campaign.description) && (
              <p className="mb-8">{campaign.game_content?.description || campaign.description}</p>
            )}
            <button
              className="px-8 py-3 rounded-lg text-white font-semibold transition-all"
              style={{ backgroundColor: campaign.colors?.button || '#841b60' }}
              onClick={handleStart}
            >
              Commencer
            </button>
          </div>
        )}

        {currentStep === 'questions' && campaign.questions && (
          <div className="fade-in">
            <div className="mb-6 bg-white bg-opacity-20 h-2 rounded-full">
              <div 
                className="h-full rounded-full transition-all duration-300"
                style={{ 
                  width: `${((currentQuestion + 1) / campaign.questions.length) * 100}%`,
                  backgroundColor: campaign.colors?.button || '#841b60'
                }}
              />
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-6">
                {campaign.questions[currentQuestion].question}
              </h2>
              <div className="space-y-3">
                {campaign.questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    className="w-full p-4 text-left rounded-lg border transition-all hover:bg-opacity-10"
                    style={{ 
                      borderColor: campaign.colors?.border || '#e5e7eb',
                      backgroundColor: 'transparent',
                      color: campaign.colors?.text || '#333333'
                    }}
                    onClick={handleNext}
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentStep === 'end' && (
          <div className="text-center bg-white rounded-lg p-8 shadow-lg fade-in">
            <h2 className="text-2xl font-bold mb-4">Merci pour votre participation !</h2>
            <p className="mb-8">Vos réponses ont été enregistrées avec succès.</p>
            <button
              className="px-6 py-2 rounded-lg text-white font-semibold transition-all"
              style={{ backgroundColor: campaign.colors?.button || '#841b60' }}
              onClick={handleRestart}
            >
              Recommencer
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewPage;
