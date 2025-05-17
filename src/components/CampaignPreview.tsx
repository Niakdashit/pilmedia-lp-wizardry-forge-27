import React, { useState } from 'react';
import { Campaign } from '../types';
import { WheelOfFortune } from './games/WheelOfFortune';
import { MemoryGame } from './games/MemoryGame';
import ScratchCard from './games/ScratchCard';
import Puzzle from './games/Puzzle';
import { DiceRoll } from './games/DiceRoll';
import { TargetShoot } from './games/TargetShoot';

interface CampaignPreviewProps {
  campaign: Campaign;
  currentStep?: 'welcome' | 'form' | 'quiz' | 'game';
  onParticipate?: () => void;
  onFormSubmit?: (formData: Record<string, string>) => void;
  onGameComplete?: () => void;
}

const CampaignPreview: React.FC<CampaignPreviewProps> = ({
  campaign,
  currentStep = 'welcome',
  onParticipate,
  onFormSubmit,
  onGameComplete
}) => {
  const [formData, setFormData] = useState<Record<string, string>>({
    civilite: 'M.',
    nom: '',
    prenom: '',
    email: '',
  });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [internalStep, setInternalStep] = useState(currentStep);

  // Update internal step when prop changes
  React.useEffect(() => {
    setInternalStep(currentStep);
  }, [currentStep]);

  const handleStart = () => {
    onParticipate?.();
    setInternalStep('form');
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (onFormSubmit) {
      await onFormSubmit(formData);
    }
    // If there are questions, go to quiz, otherwise go to game
    setInternalStep(campaign.questions?.length ? 'quiz' : 'game');
  };

  const handleQuestionAnswer = () => {
    if (currentQuestion < (campaign.questions?.length || 0) - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setInternalStep('game');
    }
  };

  const renderGame = () => {
    const gameProps = {
      colors: {
        primary: campaign.colors?.button || '#841b60',
        secondary: campaign.colors?.buttonText || '#ffffff',
        text: campaign.colors?.text || '#333333'
      },
      onComplete: onGameComplete
    };

    switch (campaign.type) {
      case 'wheel':
        return (
          <WheelOfFortune
            {...gameProps}
            segments={campaign.game_settings?.wheel?.segments || [
              { text: "10% OFF", color: "#FF6B6B" },
              { text: "20% OFF", color: "#4ECDC4" },
              { text: "30% OFF", color: "#45B7D1" },
              { text: "40% OFF", color: "#96CEB4" },
              { text: "50% OFF", color: "#FFEEAD" },
              { text: "FREE GIFT", color: "#D4A5A5" }
            ]}
          />
        );
      case 'memory':
        return (
          <MemoryGame
            {...gameProps}
            pairs={campaign.game_settings?.memory?.pairs || 6}
            cards={campaign.game_settings?.memory?.cards}
          />
        );
      case 'scratch':
        return (
          <ScratchCard
            {...gameProps}
            prize={campaign.game_settings?.scratch?.prize || {
              text: "Vous avez gagné !",
              image: campaign.background_image
            }}
            revealPercent={campaign.game_settings?.scratch?.revealPercent || 50}
          />
        );
      case 'puzzle':
        return (
          <Puzzle
            {...gameProps}
            imageUrl={campaign.game_settings?.puzzle?.imageUrl || campaign.background_image}
            gridSize={campaign.game_settings?.puzzle?.gridSize || 3}
          />
        );
      case 'dice':
        return (
          <DiceRoll
            {...gameProps}
            sides={campaign.game_settings?.dice?.sides || 6}
            style={campaign.game_settings?.dice?.style || 'classic'}
          />
        );
      case 'target':
        return (
          <TargetShoot
            {...gameProps}
            targets={campaign.game_settings?.target?.targets || 5}
            speed={campaign.game_settings?.target?.speed || 1000}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white bg-opacity-90 rounded-lg p-8 shadow-lg max-w-md mx-auto">
      {internalStep === 'welcome' && (
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">{campaign.name}</h2>
          <p className="text-gray-600 mb-8">Participez à notre jeu et tentez de gagner !</p>
          <button
            onClick={handleStart}
            className="px-8 py-3 bg-[#841b60] text-white rounded-lg font-semibold hover:bg-[#6d1750] transition-all"
          >
            Je participe !
          </button>
        </div>
      )}

      {internalStep === 'form' && (
        <div>
          <h3 className="text-2xl font-bold mb-6">Vos informations</h3>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Civilité<span className="text-red-500">*</span>
              </label>
              <select
                required
                value={formData.civilite}
                onChange={(e) => setFormData(prev => ({ ...prev, civilite: e.target.value }))}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="M.">M.</option>
                <option value="Mme">Mme</option>
                <option value="Mlle">Mlle</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.nom}
                onChange={(e) => setFormData(prev => ({ ...prev, nom: e.target.value }))}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prénom<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.prenom}
                onChange={(e) => setFormData(prev => ({ ...prev, prenom: e.target.value }))}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            {campaign.fields?.map((field) => (
              <div key={field.id}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label}
                  {field.required && <span className="text-red-500">*</span>}
                </label>
                <input
                  type={field.type}
                  required={field.required}
                  placeholder={field.placeholder}
                  onChange={(e) => setFormData(prev => ({ ...prev, [field.id]: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
            ))}

            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                required
                id="reglement"
                className="rounded border-gray-300"
              />
              <label htmlFor="reglement" className="ml-2 text-sm text-gray-600">
                J'accepte le règlement du jeu<span className="text-red-500">*</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-[#841b60] text-white rounded-lg hover:bg-[#6d1750] transition-colors mt-6"
            >
              Continuer
            </button>
          </form>
        </div>
      )}

      {internalStep === 'quiz' && campaign.questions && campaign.questions[currentQuestion] && (
        <div className="space-y-6">
          <div className="mb-6 bg-gray-100 h-2 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#841b60] transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / campaign.questions.length) * 100}%` }}
            />
          </div>
          
          <h3 className="text-xl font-semibold">
            Question {currentQuestion + 1} sur {campaign.questions.length}
          </h3>
          
          <p className="text-gray-700">{campaign.questions[currentQuestion].text}</p>
          
          <div className="space-y-3">
            {campaign.questions[currentQuestion].options?.map((option, index) => (
              <button
                key={index}
                onClick={handleQuestionAnswer}
                className="w-full px-4 py-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      {internalStep === 'game' && (
        <div className="w-full">
          {renderGame()}
        </div>
      )}
    </div>
  );
};

export default CampaignPreview;