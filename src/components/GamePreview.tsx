
import React, { useState } from 'react';
import { WheelOfFortune, MemoryGame, ScratchCard, Puzzle, DiceRoll, TargetShoot } from './games';
import { supabase } from '../lib/supabase';
import { FormField } from '../types/type';

interface GamePreviewProps {
  type?: string;
  settings?: any;
}

const GamePreview: React.FC<GamePreviewProps> = ({ type, settings }) => {
  const [currentStep, setCurrentStep] = useState<'welcome' | 'form' | 'quiz' | 'game'>('welcome');
  const [formData, setFormData] = useState<Record<string, string | boolean>>({
    civilite: 'M.',
  });
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleStart = () => {
    setCurrentStep('form');
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const participationData = {
        campaign_id: settings?.id,
        civilite: formData.civilite || 'M.',
        nom: formData.nom,
        prenom: formData.prenom,
        reglement_accepte: true,
        ...formData
      };

      const { error } = await supabase
        .from('participations')
        .insert(participationData);

      if (error) throw error;

      // Check if there are questions to display
      if (settings?.questions && settings.questions.length > 0) {
        setCurrentStep('quiz');
      } else {
        setCurrentStep('game');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleQuestionAnswer = () => {
    if (settings?.questions && currentQuestion < settings.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setCurrentStep('game');
    }
  };

  const renderGame = () => {
    const gameProps = {
      colors: {
        primary: settings?.colors?.primary || '#841b60',
        secondary: settings?.colors?.secondary || '#6d1750',
        text: settings?.colors?.text || '#ffffff'
      },
      // Remove backgroundImage from props, it's not expected in these components
    };

    switch (type) {
      case 'wheel':
        return (
          <WheelOfFortune
            segments={settings?.game_settings?.wheel?.segments || [
              { text: "10% OFF", color: "#FF6B6B" },
              { text: "20% OFF", color: "#4ECDC4" },
              { text: "30% OFF", color: "#45B7D1" },
              { text: "40% OFF", color: "#96CEB4" },
              { text: "50% OFF", color: "#FFEEAD" },
              { text: "FREE GIFT", color: "#D4A5A5" }
            ]}
            colors={gameProps.colors}
          />
        );
      case 'memory':
        return (
          <MemoryGame
            cards={settings?.game_settings?.memory?.cards || []}
            colors={{
              primary: gameProps.colors.primary,
              secondary: gameProps.colors.secondary,
              text: gameProps.colors.text
            }}
          />
        );
      case 'scratch':
        return (
          <ScratchCard
            prize={{ 
              text: settings?.game_settings?.scratch?.prize?.text || "Vous avez gagné !",
              image: settings?.game_settings?.scratch?.prize?.image || ""
            }}
            revealPercent={settings?.game_settings?.scratch?.revealPercent || 50}
          />
        );
      case 'puzzle':
        return (
          <Puzzle
            imageUrl={settings?.game_settings?.puzzle?.imageUrl || settings?.background_image || ''}
            gridSize={settings?.game_settings?.puzzle?.gridSize || 3}
          />
        );
      case 'dice':
        return (
          <DiceRoll
            sides={settings?.game_settings?.dice?.sides || 6}
            style={settings?.game_settings?.dice?.style || 'classic'}
            colors={{
              primary: gameProps.colors.primary,
              secondary: gameProps.colors.secondary,
              text: gameProps.colors.text
            }}
          />
        );
      case 'target':
        return (
          <TargetShoot
            targets={settings?.game_settings?.target?.targets || 5}
            speed={settings?.game_settings?.target?.speed || 1000}
            colors={{
              primary: gameProps.colors.primary,
              secondary: gameProps.colors.secondary,
              text: gameProps.colors.text
            }}
          />
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center text-gray-500">
            <div className="text-6xl mb-4">🎮</div>
            <p className="text-xl">Sélectionnez un type de jeu</p>
          </div>
        );
    }
  };

  return (
    <div 
      className="relative w-full h-full bg-cover bg-center flex items-center justify-center"
      style={{ 
        backgroundImage: settings?.background_image ? `url(${settings.background_image})` : undefined,
        backgroundColor: settings?.colors?.background || '#ffffff'
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg" />
      <div className="relative z-10 w-full max-w-md p-6">
        {currentStep === 'welcome' && (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              {settings?.game_content?.title || "Jouez et Gagnez !"}
            </h2>
            <p className="text-lg text-white mb-8">
              {settings?.game_content?.description || "Participez à notre jeu et tentez de gagner des prix exceptionnels !"}
            </p>
            <button
              onClick={handleStart}
              className="px-8 py-3 bg-white text-[#841b60] rounded-lg font-semibold hover:bg-opacity-90 transition-all transform hover:scale-105"
            >
              Je participe !
            </button>
          </div>
        )}

        {/* Form Step */}
        {currentStep === 'form' && (
          <div className="bg-white rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Vos informations</h3>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Civilité<span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={formData.civilite as string}
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
                  placeholder="Votre nom"
                  className="w-full px-3 py-2 border rounded-md"
                  onChange={(e) => setFormData(prev => ({ ...prev, nom: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prénom<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Votre prénom"
                  className="w-full px-3 py-2 border rounded-md"
                  onChange={(e) => setFormData(prev => ({ ...prev, prenom: e.target.value }))}
                />
              </div>
              {settings?.fields?.map((field: FormField) => (
                <div key={field.id}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label}
                    {field.required && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type={field.type}
                    required={field.required}
                    placeholder={field.placeholder}
                    className="w-full px-3 py-2 border rounded-md"
                    onChange={(e) => setFormData(prev => ({ ...prev, [field.id]: e.target.value }))}
                  />
                </div>
              ))}
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    required
                    className="rounded border-gray-300"
                    onChange={(e) => setFormData(prev => ({ ...prev, reglement_accepte: e.target.checked }))}
                  />
                  <span className="text-sm text-gray-700">J'accepte le règlement du jeu</span>
                </label>
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-[#841b60] text-white rounded-lg hover:bg-[#6d1750] transition-colors"
              >
                Continuer
              </button>
            </form>
          </div>
        )}

        {/* Quiz Step */}
        {currentStep === 'quiz' && settings?.questions && (
          <div className="bg-white rounded-lg p-6">
            <div className="mb-6 bg-gray-100 h-2 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#841b60] transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / settings.questions.length) * 100}%` }}
              />
            </div>
            <h3 className="text-xl font-semibold mb-4">
              Question {currentQuestion + 1} sur {settings.questions.length}
            </h3>
            <p className="mb-4">{settings.questions[currentQuestion].text}</p>
            <div className="space-y-2">
              {settings.questions[currentQuestion].options?.map((option: string, index: number) => (
                <button
                  key={index}
                  className="w-full px-4 py-2 text-left border rounded-md hover:bg-gray-50"
                  onClick={() => handleQuestionAnswer()}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Game Step */}
        {currentStep === 'game' && (
          <div className="w-full h-full">
            {renderGame()}
          </div>
        )}
      </div>
    </div>
  );
};

export default GamePreview;
