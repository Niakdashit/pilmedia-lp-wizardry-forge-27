import React from 'react';
import { motion } from 'framer-motion';
import { useQuickCampaignStore } from '../../stores/quickCampaignStore';
const gameTypes = [{
  id: 'jackpot',
  name: 'Jackpot',
  description: "Machine à sous virtuelle pour maximiser l'engagement",
  icon: '🎰',
  gradient: 'from-purple-500 to-pink-500',
  borderColor: 'border-purple-400',
  glowColor: 'shadow-purple-500/30'
}, {
  id: 'wheel',
  name: 'Roue de la Fortune',
  description: 'Roue interactive pour des tirages au sort captivants',
  icon: '🎡',
  gradient: 'from-blue-500 to-cyan-500',
  borderColor: 'border-blue-400',
  glowColor: 'shadow-blue-500/30'
}, {
  id: 'quiz',
  name: 'Quiz Interactif',
  description: "Questions personnalisées pour engager votre audience",
  icon: '🧠',
  gradient: 'from-green-500 to-emerald-500',
  borderColor: 'border-green-400',
  glowColor: 'shadow-green-500/30'
}, {
  id: 'memory',
  name: 'Jeu de Mémoire',
  description: 'Jeu de cartes pour stimuler la mémorisation de votre marque',
  icon: '🃏',
  gradient: 'from-orange-500 to-red-500',
  borderColor: 'border-orange-400',
  glowColor: 'shadow-orange-500/30'
}, {
  id: 'scratch',
  name: 'Grattage',
  description: 'Carte à gratter virtuelle pour révéler des surprises',
  icon: '🎫',
  gradient: 'from-yellow-500 to-orange-500',
  borderColor: 'border-yellow-400',
  glowColor: 'shadow-yellow-500/30'
}, {
  id: 'dice',
  name: 'Lancer de Dés',
  description: 'Jeu de hasard simple et addictif',
  icon: '🎲',
  gradient: 'from-indigo-500 to-purple-500',
  borderColor: 'border-indigo-400',
  glowColor: 'shadow-indigo-500/30'
}];
const Step1GameSelection: React.FC = () => {
  const {
    selectedGameType,
    setGameType,
    setCurrentStep
  } = useQuickCampaignStore();
  const handleGameSelect = (gameId: string) => {
    setGameType(gameId);
    setTimeout(() => {
      setCurrentStep(2);
    }, 300);
  };
  return <div className="min-h-screen w-full flex items-center justify-center p-6">
      <div className="max-w-7xl w-full">
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6
      }} className="text-center mb-16 bg-white/0">
          <h1 className="text-6xl font-bold mb-6 text-white">
            Quel type d'expérience voulez-vous créer ?
          </h1>
          <p className="text-2xl mb-3 text-white">
            Vous êtes à 2 clics de lancer une campagne interactive.
          </p>
          <p className="text-xl text-white">
            Aucune compétence technique requise.
          </p>
        </motion.div>

        <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        duration: 0.8,
        delay: 0.2
      }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gameTypes.map((game, index) => <motion.div key={game.id} initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: index * 0.1
        }} whileHover={{
          scale: 1.05,
          y: -8,
          transition: {
            duration: 0.2
          }
        }} whileTap={{
          scale: 0.98
        }} onClick={() => handleGameSelect(game.id)} className={`
                relative group cursor-pointer
                bg-white/60 backdrop-blur-lg 
                rounded-[32px] border-2 ${game.borderColor}
                shadow-2xl hover:${game.glowColor} hover:shadow-3xl
                p-8 transition-all duration-300
                ${selectedGameType === game.id ? `${game.borderColor} border-4` : ''}
              `}>
              {/* Gradient background overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${game.gradient} opacity-5 rounded-[30px] group-hover:opacity-10 transition-opacity duration-300`} />
              
              {/* Animated border pulse */}
              <div className={`absolute inset-0 rounded-[32px] border-2 ${game.borderColor} opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300`} />
              
              <div className="relative z-10 flex flex-col items-center text-center">
                {/* Icon with glow effect */}
                <motion.div whileHover={{
              scale: 1.1
            }} className={`
                    text-7xl mb-6 p-4 rounded-full 
                    bg-white/80 backdrop-blur-sm
                    shadow-lg group-hover:${game.glowColor}
                    transition-all duration-300
                  `}>
                  <motion.span animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 2, -2, 0]
              }} transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }} className="block">
                    {game.icon}
                  </motion.span>
                </motion.div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {game.name}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-base leading-relaxed mb-8 px-2">
                  {game.description}
                </p>

                {/* Button */}
                <motion.button whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }} className={`
                    w-full py-4 px-6 rounded-2xl font-bold text-lg
                    bg-gradient-to-r ${game.gradient}
                    text-white shadow-lg hover:shadow-xl
                    transition-all duration-200
                    relative overflow-hidden
                  `}>
                  <span className="relative z-10">Choisir</span>
                  <motion.div className="absolute inset-0 bg-white/20 rounded-2xl" initial={{
                scale: 0,
                opacity: 0
              }} whileHover={{
                scale: 1,
                opacity: 1
              }} transition={{
                duration: 0.3
              }} />
                </motion.button>
              </div>
            </motion.div>)}
        </motion.div>

        {/* Progress indicator */}
        <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        delay: 1
      }} className="text-center mt-16">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-2 bg-gradient-to-r from-[#841b60] to-pink-500 rounded-full"></div>
            <div className="w-12 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-12 h-2 bg-gray-300 rounded-full"></div>
          </div>
          <p className="text-lg text-gray-500 font-medium">Étape 1 sur 3</p>
        </motion.div>
      </div>
    </div>;
};
export default Step1GameSelection;