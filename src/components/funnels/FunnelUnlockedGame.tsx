import React, { useState } from 'react';
import Modal from '../common/Modal'; // crée ce composant simple si tu ne l’as pas
import { Wheel, Scratch, Jackpot, Dice } from '../GameTypes';

interface FunnelUnlockedGameProps {
  campaign: any;
}

const FunnelUnlockedGame: React.FC<FunnelUnlockedGameProps> = ({ campaign }) => {
  const [formValidated, setFormValidated] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [gamePlayed, setGamePlayed] = useState(false);
  const [gameResult, setGameResult] = useState<'win' | 'lose' | null>(null);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowFormModal(false);
    setTimeout(() => {
      setFormValidated(true);
    }, 400); // petit délai d'effet
  };

  const handleGameFinish = (result: 'win' | 'lose') => {
    setGamePlayed(true);
    setGameResult(result);
  };

  const reset = () => {
    setFormValidated(false);
    setGamePlayed(false);
    setGameResult(null);
  };

  const renderGame = () => {
    if (!formValidated) {
      return (
        <div className="w-full h-96 bg-gray-100 flex items-center justify-center rounded-lg text-gray-400 text-xl">
          Jeu verrouillé
        </div>
      );
    }

    switch (campaign.type) {
      case 'wheel':
        return <Wheel config={campaign.gameConfig.wheel} isPreview={true} onFinish={handleGameFinish} />;
      case 'scratch':
        return <Scratch config={campaign.gameConfig.scratch} onConfigChange={() => {}} />;
      case 'jackpot':
        return <Jackpot isPreview={true} instantWinConfig={campaign.gameConfig.jackpot?.instantWin} onFinish={handleGameFinish} />;
      case 'dice':
        return <Dice config={campaign.gameConfig.dice} onConfigChange={() => {}} />;
      default:
        return <div className="text-center text-gray-500">Jeu non supporté</div>;
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto p-6 flex flex-col items-center space-y-6">
      {/* Écran d’accueil */}
      {!formValidated && !gamePlayed && (
        <>
          <h2 className="text-2xl font-bold text-center">{campaign.screens[0]?.title || 'Tentez votre chance !'}</h2>
          <p className="text-center text-gray-600">{campaign.screens[0]?.description || 'Cliquez sur participer pour débloquer le jeu.'}</p>
          <button
            onClick={() => setShowFormModal(true)}
            className="px-6 py-3 bg-[#841b60] text-white rounded-lg shadow-md"
          >
            {campaign.screens[0]?.buttonText || 'Participer'}
          </button>
        </>
      )}

      {/* Jeu */}
      {renderGame()}

      {/* Résultat */}
      {gamePlayed && (
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
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                {campaign.screens[3]?.ctaText || 'Découvrir l’offre'}
              </a>
            )}
            <button
              onClick={reset}
              className="bg-gray-800 text-white px-4 py-2 rounded"
            >
              {campaign.screens[3]?.replayButtonText || 'Rejouer'}
            </button>
          </div>
        </div>
      )}

      {/* Modale formulaire */}
      {showFormModal && (
        <Modal onClose={() => setShowFormModal(false)} title={campaign.screens[1]?.title || 'Vos informations'}>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Prénom"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Nom"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
            <input
              type="email"
              placeholder="Email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
            <button
              type="submit"
              className="w-full bg-[#841b60] text-white py-2 rounded font-medium"
            >
              {campaign.screens[1]?.buttonText || 'C’est parti !'}
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default FunnelUnlockedGame;
