
import React from 'react';
import { useQuickCampaignStore } from '../../stores/quickCampaignStore';

const gameTypes = [
  {
    id: 'jackpot',
    name: 'Jackpot',
    description: "Machine à sous virtuelle pour maximiser l'engagement",
    icon: '🎰',
    color: 'bg-purple-500'
  },
  {
    id: 'wheel',
    name: 'Roue de la Fortune',
    description: 'Roue interactive pour des tirages au sort captivants',
    icon: '🎡',
    color: 'bg-blue-500'
  },
  {
    id: 'quiz',
    name: 'Quiz Interactif',
    description: "Questions personnalisées pour engager votre audience",
    icon: '🧠',
    color: 'bg-green-500'
  },
  {
    id: 'memory',
    name: 'Jeu de Mémoire',
    description: 'Jeu de cartes pour stimuler la mémorisation de votre marque',
    icon: '🃏',
    color: 'bg-orange-500'
  },
  {
    id: 'scratch',
    name: 'Grattage',
    description: 'Carte à gratter virtuelle pour révéler des surprises',
    icon: '🎫',
    color: 'bg-yellow-500'
  },
  {
    id: 'dice',
    name: 'Lancer de Dés',
    description: 'Jeu de hasard simple et addictif',
    icon: '🎲',
    color: 'bg-indigo-500'
  }
];

const Step1GameSelection: React.FC = () => {
  const { selectedGameType, setGameType, setCurrentStep } = useQuickCampaignStore();

  const handleGameSelect = (gameId: string) => {
    setGameType(gameId);
    setCurrentStep(2);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-8 py-16">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-6xl font-light text-white mb-6 tracking-tight">
            Quel type d'expérience<br />voulez-vous créer ?
          </h1>
          <p className="text-xl text-white/80 font-light leading-relaxed">
            Vous êtes à 2 clics de lancer une campagne interactive.<br />
            Aucune compétence technique requise.
          </p>
        </div>

        {/* Game Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gameTypes.map((game) => (
            <button
              key={game.id}
              onClick={() => handleGameSelect(game.id)}
              className={`
                group relative bg-white/10 backdrop-blur-xl border border-white/20
                rounded-2xl p-8 text-left transition-all duration-300
                hover:bg-white/15 hover:border-white/30 hover:scale-[1.02]
                ${selectedGameType === game.id ? 'bg-white/20 border-white/40' : ''}
              `}
            >
              {/* Icon */}
              <div className="mb-6">
                <div className={`
                  w-16 h-16 rounded-xl ${game.color} 
                  flex items-center justify-center text-2xl
                  shadow-lg group-hover:shadow-xl transition-shadow
                `}>
                  {game.icon}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-white mb-3">
                {game.name}
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                {game.description}
              </p>

              {/* Arrow */}
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          ))}
        </div>

        {/* Progress */}
        <div className="text-center mt-20">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-1 bg-white rounded-full"></div>
            <div className="w-8 h-1 bg-white/30 rounded-full"></div>
            <div className="w-8 h-1 bg-white/30 rounded-full"></div>
          </div>
          <p className="text-white/60 font-light">Étape 1 sur 3</p>
        </div>
      </div>
    </div>
  );
};

export default Step1GameSelection;
