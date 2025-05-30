
import React, { useState } from 'react';
import Color from 'color';
import { Quiz, Memory, Puzzle } from './GameTypes';

interface GameFunnelProps {
  campaign: any;
}

const FunnelStandard: React.FC<GameFunnelProps> = ({ campaign }) => {
  const [step, setStep] = useState<'start' | 'form' | 'game' | 'end'>('start');
  const [formData, setFormData] = useState({
    civilite: '',
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    codePostal: ''
  });

  const getContrastColor = (bgColor: string) => {
    try {
      const color = Color(bgColor);
      return color.isLight() ? '#000000' : '#FFFFFF';
    } catch {
      return '#000000';
    }
  };

  const handleStart = () => setStep('form');
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('game');
  };
  const handleEnd = () => setStep('end');

  const getGameComponent = () => {
    switch (campaign.type) {
      case 'quiz':
        return <Quiz config={campaign.gameConfig.quiz} campaign={campaign} />;
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

  return (
    <div className="w-full flex flex-col items-center min-h-screen px-4 py-6 sm:px-6 sm:py-8">
      {step === 'start' && (
        <div className="text-center p-4 sm:p-6 max-w-md w-full">
          <h2
            className="text-xl sm:text-2xl font-bold mb-4 leading-tight"
            style={{
              color: campaign.design.titleColor,
              fontFamily: campaign.design.titleFont
            }}
          >
            {campaign.screens[0]?.title || 'Prêt à jouer ?'}
          </h2>
          <p
            className="mb-6 text-sm sm:text-base leading-relaxed"
            style={{
              color: getContrastColor(campaign.design.blockColor),
              fontFamily: campaign.design.textFont
            }}
          >
            {campaign.screens[0]?.description || 'Cliquez ci-dessous pour participer'}
          </p>
          <button
            onClick={handleStart}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 font-medium transition-all duration-200 hover:scale-105 rounded-lg text-sm sm:text-base"
            style={{
              backgroundColor: campaign.design.buttonColor,
              color: getContrastColor(campaign.design.buttonColor),
              borderRadius: campaign.design.borderRadius,
              fontFamily: campaign.design.textFont,
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}
          >
            {campaign.screens[0]?.buttonText || 'Participer'}
          </button>
        </div>
      )}

      {step === 'form' && (
        <div className="w-full max-w-md p-4 sm:p-6">
          <h2
            className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center leading-tight"
            style={{
              color: campaign.design.titleColor,
              fontFamily: campaign.design.titleFont
            }}
          >
            {campaign.screens[1]?.title || 'Vos informations'}
          </h2>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Civilité</label>
                <select
                  value={formData.civilite}
                  onChange={(e) => setFormData({ ...formData, civilite: e.target.value })}
                  required={campaign.screens[1]?.requiredFields?.includes('civilite')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                >
                  <option value="">Sélectionner</option>
                  <option value="M.">M.</option>
                  <option value="Mme">Mme</option>
                </select>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Prénom"
                  value={formData.prenom}
                  onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Nom"
                  value={formData.nom}
                  onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                />
              </div>
            </div>
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
            />
            <button
              type="submit"
              className="w-full px-6 py-3 font-medium transition-all duration-200 hover:scale-105 mt-6 rounded-lg text-sm sm:text-base"
              style={{
                backgroundColor: campaign.design.buttonColor,
                color: getContrastColor(campaign.design.buttonColor),
                borderRadius: campaign.design.borderRadius,
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}
            >
              {campaign.screens[1]?.buttonText || 'Continuer'}
            </button>
          </form>
        </div>
      )}

      {step === 'game' && (
        <div className="w-full p-4 sm:p-6 max-w-4xl">
          <div className="mb-6 text-center">
            <h2
              className="text-xl sm:text-2xl font-bold mb-2 leading-tight"
              style={{
                color: campaign.design.titleColor,
                fontFamily: campaign.design.titleFont
              }}
            >
              {campaign.screens[2]?.title || 'À vous de jouer !'}
            </h2>
            {campaign.screens[2]?.description && (
              <p
                className="text-sm sm:text-base text-center leading-relaxed"
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
          <div className="mt-6 text-center">
            <button
              onClick={handleEnd}
              className="w-full sm:w-auto px-6 py-3 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: campaign.design.buttonColor,
                color: getContrastColor(campaign.design.buttonColor),
                borderRadius: campaign.design.borderRadius,
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}
            >
              {campaign.screens[2]?.buttonText || 'Valider'}
            </button>
          </div>
        </div>
      )}

      {step === 'end' && (
        <div className="text-center p-4 sm:p-6 max-w-md w-full">
          <h2
            className="text-2xl sm:text-3xl font-bold mb-4 leading-tight"
            style={{
              color: campaign.design.titleColor,
              fontFamily: campaign.design.titleFont
            }}
          >
            {campaign.screens[3]?.confirmationTitle || 'Merci !'}
          </h2>
          <p
            className="mb-6 text-sm sm:text-base leading-relaxed"
            style={{
              color: getContrastColor(campaign.design.blockColor),
              fontFamily: campaign.design.textFont
            }}
          >
            {campaign.screens[3]?.confirmationMessage || 'Votre participation a été enregistrée.'}
          </p>
          <button
            onClick={() => setStep('start')}
            className="w-full sm:w-auto px-6 py-3 font-medium transition-all duration-200 hover:scale-105 rounded-lg text-sm sm:text-base"
            style={{
              backgroundColor: campaign.design.buttonColor,
              color: getContrastColor(campaign.design.buttonColor),
              borderRadius: campaign.design.borderRadius,
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
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
