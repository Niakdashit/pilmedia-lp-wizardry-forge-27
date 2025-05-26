import React from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Jackpot } from '../GameTypes';

interface Funnel1StepsProps {
  campaign: any;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  formData: any;
  setFormData: (data: any) => void;
  onReset: () => void;
  viewMode: 'modal' | 'mobile' | 'tablet';
}

const Funnel1Steps: React.FC<Funnel1StepsProps> = ({
  campaign,
  currentStep,
  setCurrentStep,
  formData,
  setFormData,
  onReset
}) => {
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(2);
  };

  const startGame = () => {
    setCurrentStep(3);
    setTimeout(() => {
      setCurrentStep(4);
      // Simulate random result
      const isWin = Math.random() > 0.5;
      if (isWin) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }, 3000);
  };

  const getGamePreview = () => {
    switch (campaign.type) {
      case 'wheel':
        return (
          <div className="w-32 h-32 border-4 border-[#841b60] rounded-full flex items-center justify-center bg-gradient-to-br from-yellow-400 to-red-500">
            <div className="text-white font-bold text-lg">🎯</div>
          </div>
        );
      case 'scratch':
        return (
          <div className="w-32 h-20 bg-gradient-to-r from-silver to-gray-400 rounded-lg flex items-center justify-center border-2 border-gray-500">
            <div className="text-white font-bold">SCRATCH</div>
          </div>
        );
      case 'jackpot':
        return (
          <div className="w-40 h-24 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center border-2 border-yellow-700">
            <div className="text-2xl">🍒 🍋 🍊</div>
          </div>
        );
      case 'dice':
        return (
          <div className="flex space-x-2">
            <div className="w-12 h-12 bg-white border-2 border-gray-800 rounded-lg flex items-center justify-center">
              <div className="text-xl">⚀</div>
            </div>
            <div className="w-12 h-12 bg-white border-2 border-gray-800 rounded-lg flex items-center justify-center">
              <div className="text-xl">⚁</div>
            </div>
          </div>
        );
      default:
        return <div className="w-32 h-32 bg-gray-300 rounded-lg flex items-center justify-center">Game</div>;
    }
  };

  const getBackgroundStyle = () => ({
    backgroundImage: campaign.mobileConfig?.backgroundImage ? `url(${campaign.mobileConfig.backgroundImage})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  });

  return (
    <motion.div
      key={currentStep}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full flex flex-col"
      style={getBackgroundStyle()}
    >
      {/* Step 1 - Landing Page */}
      {currentStep === 1 && (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6 relative">
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative z-10">
            <h1 className="text-3xl font-bold text-white mb-4">
              {campaign.mobileConfig?.title || "Tentez votre chance !"}
            </h1>
            
            <div className="mb-8 opacity-60">
              {getGamePreview()}
            </div>

            <button
              onClick={() => setCurrentStep(1.5)}
              className="px-8 py-4 bg-[#841b60] text-white font-bold rounded-lg shadow-lg hover:bg-[#6d1550] transition-colors"
            >
              Participer
            </button>
          </div>
        </div>
      )}

      {/* Step 1.5 - Contact Form Modal */}
      {currentStep === 1.5 && (
        <div className="flex-1 flex items-center justify-center p-6" style={getBackgroundStyle()}>
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-center">Vos coordonnées</h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Civilité</label>
                  <select 
                    value={formData.civilite}
                    onChange={(e) => setFormData({ ...formData, civilite: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                  >
                    <option value="">Sélectionner</option>
                    <option value="M.">M.</option>
                    <option value="Mme">Mme</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                  <input 
                    type="text"
                    value={formData.prenom}
                    onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                  <input 
                    type="text"
                    value={formData.nom}
                    onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-3 bg-[#841b60] text-white font-medium rounded-lg hover:bg-[#6d1550] transition-colors"
              >
                Continuer
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Step 2 - Transition Message */}
      {currentStep === 2 && (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6 relative">
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative z-10">
            <motion.h2 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="text-4xl font-bold text-white mb-8"
            >
              C'est parti !
            </motion.h2>
            <button
              onClick={startGame}
              className="px-8 py-4 bg-green-600 text-white font-bold rounded-lg shadow-lg hover:bg-green-700 transition-colors"
            >
              Commencer le jeu
            </button>
          </div>
        </div>
      )}

      {/* Step 3 - Game Animation */}
      {currentStep === 3 && (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6 relative">
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-white mb-8">Bonne chance !</h3>
            <motion.div
              animate={{ 
                rotate: campaign.type === 'wheel' ? 360 : 0,
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                scale: { duration: 1, repeat: Infinity }
              }}
              className="flex justify-center"
            >
              {campaign.type === 'jackpot' ? (
                <Jackpot 
                  isPreview={true}
                  instantWinConfig={campaign.gameConfig?.jackpot?.instantWin}
                  onFinish={() => {}}
                />
              ) : (
                getGamePreview()
              )}
            </motion.div>
          </div>
        </div>
      )}

      {/* Step 4 - Result */}
      {currentStep === 4 && (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6 relative">
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative z-10">
            <motion.h2 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-3xl font-bold text-white mb-4"
            >
              {Math.random() > 0.5 ? "Félicitations, vous avez gagné !" : "Dommage, tentez de nouveau !"}
            </motion.h2>
            
            <div className="space-y-4 mt-8">
              <button className="block w-full px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                Découvrir notre offre
              </button>
              <button className="block w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Partager
              </button>
              <button
                onClick={onReset}
                className="block w-full px-6 py-3 bg-[#841b60] text-white font-bold rounded-lg hover:bg-[#6d1550] transition-colors"
              >
                Rejouer
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Funnel1Steps;
