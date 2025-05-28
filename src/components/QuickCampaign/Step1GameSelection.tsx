
import React from 'react';
import { motion } from 'framer-motion';
import { useQuickCampaignStore } from '../../stores/quickCampaignStore';

const gameTypes = [
  {
    id: 'jackpot',
    name: 'Jackpot',
    description: 'Machine à sous virtuelle pour maximiser l\'engagement',
    icon: '🎰',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    id: 'wheel',
    name: 'Roue de la Fortune',
    description: 'Roue interactive pour des tirages au sort captivants',
    icon: '🎡',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'quiz',
    name: 'Quiz Interactif',
    description: 'Questions personnalisées pour engager votre audience',
    icon: '🧠',
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    id: 'memory',
    name: 'Jeu de Mémoire',
    description: 'Jeu de cartes pour stimuler la mémorisation de votre marque',
    icon: '🃏',
    gradient: 'from-orange-500 to-red-500'
  },
  {
    id: 'scratch',
    name: 'Grattage',
    description: 'Carte à gratter virtuelle pour révéler des surprises',
    icon: '🎫',
    gradient: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'dice',
    name: 'Lancer de Dés',
    description: 'Jeu de hasard simple et addictif',
    icon: '🎲',
    gradient: 'from-indigo-500 to-purple-500'
  }
];

const Step1GameSelection: React.FC = () => {
  const { selectedGameType, setGameType, setCurrentStep } = useQuickCampaignStore();

  const handleGameSelect = (gameId: string) => {
    setGameType(gameId);
    setTimeout(() => {
      setCurrentStep(2);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-6">
      <div className="max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Quel type d'expérience voulez-vous créer ?
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Vous êtes à 2 clics de lancer une campagne interactive.
          </p>
          <p className="text-lg text-gray-500">
            Aucune compétence technique requise.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {gameTypes.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleGameSelect(game.id)}
              className={`relative p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 ${
                selectedGameType === game.id ? 'border-blue-500' : 'border-transparent'
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${game.gradient} opacity-5 rounded-2xl`} />
              
              <div className="relative z-10">
                <div className="text-4xl mb-4">{game.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{game.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">{game.description}</p>
                
                <button className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
                  selectedGameType === game.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}>
                  Choisir
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-12"
        >
          <div className="flex items-center justify-center space-x-2 text-gray-400">
            <div className="w-8 h-1 bg-blue-500 rounded-full"></div>
            <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
            <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
          </div>
          <p className="mt-2 text-sm text-gray-500">Étape 1 sur 3</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Step1GameSelection;
