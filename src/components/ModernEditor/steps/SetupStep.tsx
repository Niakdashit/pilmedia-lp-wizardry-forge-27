
import React from 'react';
import { CampaignType } from '../../../utils/campaignTypes';
import { Zap, Brain, DollarSign, Layers, Grid3X3, Puzzle, Dice6, FileText, RotateCcw } from 'lucide-react';

interface SetupStepProps {
  campaign: any;
  setCampaign: (campaign: any) => void;
  onNext: () => void;
}

const iconComponents: Record<CampaignType, React.ReactElement> = {
  wheel: <RotateCcw className="w-6 h-6" />,
  quiz: <Brain className="w-6 h-6" />,
  jackpot: <DollarSign className="w-6 h-6" />,
  scratch: <Layers className="w-6 h-6" />,
  memory: <Grid3X3 className="w-6 h-6" />,
  puzzle: <Puzzle className="w-6 h-6" />,
  dice: <Dice6 className="w-6 h-6" />,
  form: <FileText className="w-6 h-6" />,
  swiper: <Zap className="w-6 h-6" />
};

const gameTypes: { type: CampaignType; name: string; description: string }[] = [
  { type: 'wheel', name: 'Roue de la Fortune', description: 'Faites tourner la roue pour gagner' },
  { type: 'quiz', name: 'Quiz Interactif', description: 'Testez vos connaissances' },
  { type: 'jackpot', name: 'Jackpot', description: 'Tentez de décrocher le jackpot' },
  { type: 'scratch', name: 'Carte à Gratter', description: 'Découvrez ce qui se cache dessous' },
  { type: 'memory', name: 'Jeu de Mémoire', description: 'Trouvez les paires correspondantes' },
  { type: 'puzzle', name: 'Puzzle', description: 'Reconstituez l\'image' },
  { type: 'dice', name: 'Dés Chanceux', description: 'Lancez les dés et tentez votre chance' },
  { type: 'form', name: 'Formulaire Dynamique', description: 'Créez des formulaires interactifs' }
];

const SetupStep: React.FC<SetupStepProps> = ({ campaign, setCampaign, onNext }) => {
  const handleGameSelect = (gameType: CampaignType) => {
    setCampaign({ ...campaign, type: gameType });
    setTimeout(() => {
      onNext();
    }, 300);
  };

  return (
    <div className="min-h-screen bg-white px-6 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-left mb-16 max-w-3xl">
          <div className="mb-8">
            <h1 className="text-5xl font-light text-gray-900 mb-6 leading-tight">
              Choisissez votre
              <span className="relative">
                <span className="bg-gradient-to-r from-[#841b60] to-[#a855f7] bg-clip-text text-transparent font-medium"> mécanique</span>
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#841b60] to-[#a855f7] opacity-30"></div>
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed font-light">
              Sélectionnez la mécanique de jeu qui captivera votre audience et 
              transformera vos visiteurs en participants engagés.
            </p>
          </div>
        </div>

        {/* Game Selection Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {gameTypes.map((game, index) => (
            <div
              key={game.type}
              className={`
                group relative cursor-pointer transition-all duration-500 transform hover:scale-105
                ${campaign.type === game.type ? 'scale-105' : ''}
              `}
              onClick={() => handleGameSelect(game.type)}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Main Card */}
              <div className={`
                relative p-8 rounded-3xl transition-all duration-300
                ${campaign.type === game.type
                  ? 'bg-white/90 backdrop-blur-xl shadow-xl shadow-[#841b60]/10 border border-[#841b60]/20' 
                  : 'bg-white/60 backdrop-blur-sm shadow-lg hover:shadow-xl hover:bg-white/80 border border-gray-100'
                }
              `}>
                {/* Icon Container */}
                <div className={`
                  w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300
                  ${campaign.type === game.type
                    ? 'bg-gradient-to-br from-[#841b60] to-[#6d164f] shadow-lg shadow-[#841b60]/25' 
                    : 'bg-gray-50 group-hover:bg-gray-100'
                  }
                `}>
                  <div className={`
                    transition-colors duration-300
                    ${campaign.type === game.type ? 'text-white' : 'text-gray-600 group-hover:text-gray-700'}
                  `}>
                    {iconComponents[game.type]}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className={`
                    font-semibold text-base leading-tight transition-colors duration-300
                    ${campaign.type === game.type ? 'text-[#841b60]' : 'text-gray-900 group-hover:text-gray-800'}
                  `}>
                    {game.name}
                  </h3>
                  
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {game.description}
                  </p>
                </div>

                {/* Selection Indicator */}
                {campaign.type === game.type && (
                  <div className="absolute -top-2 -right-2">
                    <div className="w-4 h-4 bg-[#841b60] rounded-full shadow-lg animate-pulse"></div>
                  </div>
                )}

                {/* Hover Border Glow */}
                <div className={`
                  absolute inset-0 rounded-3xl transition-opacity duration-300 pointer-events-none
                  ${campaign.type === game.type 
                    ? 'bg-gradient-to-r from-[#841b60]/5 to-[#a855f7]/5 opacity-100' 
                    : 'bg-gradient-to-r from-[#841b60]/5 to-[#a855f7]/5 opacity-0 group-hover:opacity-100'
                  }
                `}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Selection Confirmation */}
        {campaign.type && (
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-100 shadow-lg p-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-3 h-3 bg-[#841b60] rounded-full animate-pulse mr-3"></div>
              <span className="text-gray-600 font-medium">
                Mécanique sélectionnée: {gameTypes.find(g => g.type === campaign.type)?.name}
              </span>
            </div>
            
            <p className="text-gray-500 text-sm">
              Transition automatique vers l'étape suivante...
            </p>
          </div>
        )}

        {/* Instruction */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 text-sm font-light">
            Cliquez sur une mécanique pour commencer votre création
          </p>
        </div>
      </div>
    </div>
  );
};

export default SetupStep;
