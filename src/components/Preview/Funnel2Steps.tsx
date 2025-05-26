import React from 'react';
import { motion } from 'framer-motion';

interface Funnel2StepsProps {
  campaign: any;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  formData: any;
  setFormData: (data: any) => void;
  onReset: () => void;
  viewMode: 'modal' | 'mobile' | 'tablet';
}

const Funnel2Steps: React.FC<Funnel2StepsProps> = ({
  campaign,
  currentStep,
  setCurrentStep,
  formData,
  setFormData,
  onReset,
  viewMode
}) => {
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(3);
  };

  const finishGame = () => {
    setCurrentStep(4);
  };

  const getGamePlaceholder = () => {
    switch (campaign.type) {
      case 'quiz':
        return (
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Question 1/5</h3>
            <p className="mb-4">Quelle est la capitale de la France ?</p>
            <div className="space-y-2">
              <button className="w-full p-3 text-left bg-gray-100 rounded-lg hover:bg-gray-200">A. Lyon</button>
              <button className="w-full p-3 text-left bg-gray-100 rounded-lg hover:bg-gray-200">B. Paris</button>
              <button className="w-full p-3 text-left bg-gray-100 rounded-lg hover:bg-gray-200">C. Marseille</button>
            </div>
          </div>
        );
      case 'memory':
        return (
          <div className="bg-white rounded-lg p-6">
            <h3 className="text-lg font-bold mb-4 text-center">Jeu de mémoire</h3>
            <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
                  ?
                </div>
              ))}
            </div>
          </div>
        );
      case 'puzzle':
        return (
          <div className="bg-white rounded-lg p-6">
            <h3 className="text-lg font-bold mb-4 text-center">Puzzle</h3>
            <div className="grid grid-cols-3 gap-1 max-w-xs mx-auto">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded border-2 border-white">
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Formulaire dynamique</h3>
            <div className="space-y-4">
              <input type="text" placeholder="Votre réponse..." className="w-full p-3 border rounded-lg" />
              <textarea placeholder="Commentaires..." className="w-full p-3 border rounded-lg h-20"></textarea>
            </div>
          </div>
        );
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
      {/* Step 1 - Intro Page */}
      {currentStep === 1 && (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6 relative">
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative z-10">
            {campaign.mobileConfig?.showTitle !== false && (
              <h1 className="text-3xl font-bold text-white mb-4">
                {campaign.mobileConfig?.title || campaign.screens?.[1]?.title || "Participez à notre jeu !"}
              </h1>
            )}
            
            {campaign.mobileConfig?.showDescription !== false && (
              <p className="text-lg text-white/90 mb-8 max-w-md">
                {campaign.mobileConfig?.description || campaign.screens?.[1]?.description || "Testez vos connaissances et tentez de gagner !"}
              </p>
            )}

            <button
              onClick={() => setCurrentStep(2)}
              className="px-8 py-4 bg-[#841b60] text-white font-bold rounded-lg shadow-lg hover:bg-[#6d1550] transition-colors"
            >
              Participer
            </button>
          </div>
        </div>
      )}

      {/* Step 2 - Contact Form */}
      {currentStep === 2 && (
        <div className="flex-1 flex items-center justify-center p-6" style={getBackgroundStyle()}>
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-center">Vos coordonnées</h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Civilité (optionnel)</label>
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

      {/* Step 3 - Game Placeholder */}
      {currentStep === 3 && (
        <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 w-full flex flex-col items-center">
            {getGamePlaceholder()}
            <button
              onClick={finishGame}
              className="mt-8 px-8 py-4 bg-green-600 text-white font-bold rounded-lg shadow-lg hover:bg-green-700 transition-colors"
            >
              Terminer
            </button>
          </div>
        </div>
      )}

      {/* Step 4 - Final Message */}
      {currentStep === 4 && (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6 relative">
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative z-10">
            <motion.h2 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="text-2xl font-bold text-white mb-6 max-w-md"
            >
              Votre participation a été enregistrée avec succès pour le tirage au sort.
            </motion.h2>
            
            <button
              onClick={onReset}
              className="px-8 py-4 bg-[#841b60] text-white font-bold rounded-lg shadow-lg hover:bg-[#6d1550] transition-colors"
            >
              Rejouer
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Funnel2Steps;
