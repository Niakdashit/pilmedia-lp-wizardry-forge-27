import React, { useState } from 'react';
import Color from 'color';
import { Quiz, Wheel, Scratch, Memory, Puzzle, Dice, Jackpot } from './GameTypes';

interface GameFunnelProps {
  campaign: any;
}

const GameFunnel: React.FC<GameFunnelProps> = ({ campaign }) => {
  const [step, setStep] = useState<'start' | 'form' | 'game' | 'end'>('start');
  const [formData, setFormData] = useState({
    civilite: '',
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    codePostal: ''
  });
  const [gameResult, setGameResult] = useState<'win' | 'lose' | null>(null);

  const handleStart = () => setStep('form');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('game');
  };

  const handleGameComplete = (result: 'win' | 'lose') => {
    setGameResult(result);
    setStep('end');
  };

  const getGameComponent = () => {
    switch (campaign.type) {
      case 'quiz':
        return (
          <Quiz 
            config={campaign.gameConfig.quiz}
          />
        );

      case 'wheel':
        return (
          <Wheel 
            config={campaign.gameConfig.wheel}
            isPreview={true}
            currentWinners={0}
            maxWinners={100}
            winRate={10}
          />
        );

      case 'scratch':
        return (
          <Scratch 
            config={campaign.gameConfig.scratch}
          />
        );

      case 'memory':
        return (
          <Memory 
            config={campaign.gameConfig.memory}
          />
        );

      case 'puzzle':
        return (
          <Puzzle 
            config={campaign.gameConfig.puzzle}
          />
        );

      case 'dice':
        return (
          <Dice 
            config={campaign.gameConfig.dice}
          />
        );

      case 'jackpot':
        return (
          <Jackpot
            isPreview={true}
            instantWinConfig={campaign.gameConfig?.jackpot?.instantWin}
            onFinish={(result) => handleGameComplete(result)}
          />
        );

      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Type de jeu non supporté</p>
          </div>
        );
    }
  };

  const getContrastColor = (bgColor: string) => {
    try {
      const color = Color(bgColor);
      return color.isLight() ? '#000000' : '#FFFFFF';
    } catch {
      return '#000000';
    }
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
            {campaign.screens[1].title || 'Bienvenue !'}
          </h2>
          <p 
            className="mb-6"
            style={{ 
              color: getContrastColor(campaign.design.blockColor),
              fontFamily: campaign.design.textFont
            }}
          >
            {campaign.screens[1].description || 'Participez à notre jeu et tentez de gagner !'}
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
            {campaign.screens[1].buttonText || 'Participer'}
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
            {campaign.screens[2].title || 'Vos coordonnées'}
          </h2>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Civilité
                </label>
                <select 
                  value={formData.civilite}
                  onChange={(e) => setFormData({ ...formData, civilite: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                  required={campaign.screens[2].requiredFields?.includes('civilite')}
                >
                  <option value="">Sélectionner</option>
                  <option value="M.">M.</option>
                  <option value="Mme">Mme</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prénom
                </label>
                <input 
                  type="text"
                  value={formData.prenom}
                  onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                  required={campaign.screens[2].requiredFields?.includes('prenom')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom
                </label>
                <input 
                  type="text"
                  value={formData.nom}
                  onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                  required={campaign.screens[2].requiredFields?.includes('nom')}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input 
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                required={campaign.screens[2].requiredFields?.includes('email')}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Téléphone
                </label>
                <input 
                  type="tel"
                  value={formData.telephone}
                  onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                  required={campaign.screens[2].requiredFields?.includes('telephone')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Code postal
                </label>
                <input 
                  type="text"
                  value={formData.codePostal}
                  onChange={(e) => setFormData({ ...formData, codePostal: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                  required={campaign.screens[2].requiredFields?.includes('codePostal')}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 font-medium transition-colors duration-200 mt-6"
              style={{
                backgroundColor: campaign.design.buttonColor,
                color: getContrastColor(campaign.design.buttonColor),
                borderRadius: campaign.design.borderRadius,
                fontFamily: campaign.design.textFont
              }}
            >
              {campaign.screens[2].buttonText || 'Continuer'}
            </button>
          </form>
        </div>
      )}

      {step === 'game' && (
        <div className="w-full p-6">
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
            {gameResult === 'win' 
              ? campaign.screens[4]?.winMessage || 'Félicitations !'
              : campaign.screens[4]?.loseMessage || 'Merci pour votre participation !'}
          </h2>
          <p 
            className="mb-8"
            style={{ 
              color: getContrastColor(campaign.design.blockColor),
              fontFamily: campaign.design.textFont
            }}
          >
            {campaign.screens[4]?.participationMessage || 'Merci d\'avoir participé !'}
          </p>
          <div className="flex justify-center space-x-4">
            {campaign.screens[4]?.shareButtonText && (
              <button
                className="px-6 py-3 font-medium transition-colors duration-200"
                style={{
                  backgroundColor: campaign.design.buttonColor,
                  color: getContrastColor(campaign.design.buttonColor),
                  borderRadius: campaign.design.borderRadius,
                  fontFamily: campaign.design.textFont
                }}
              >
                {campaign.screens[4].shareButtonText}
              </button>
            )}
            {campaign.screens[4]?.replayButtonText && (
              <button
                onClick={() => setStep('start')}
                className="px-6 py-3 font-medium transition-colors duration-200"
                style={{
                  backgroundColor: campaign.design.buttonColor,
                  color: getContrastColor(campaign.design.buttonColor),
                  borderRadius: campaign.design.borderRadius,
                  fontFamily: campaign.design.textFont
                }}
              >
                {campaign.screens[4].replayButtonText}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GameFunnel;
