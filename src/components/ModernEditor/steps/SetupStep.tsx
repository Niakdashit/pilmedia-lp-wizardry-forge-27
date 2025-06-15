
import React from 'react';
import { CampaignType } from '../../../utils/campaignTypes';
import { Zap, Brain, DollarSign, Layers, Grid3X3, Puzzle, Dice6, FileText, RotateCcw } from 'lucide-react';

interface SetupStepProps {
  campaign: any;
  setCampaign: (campaign: any) => void;
  onNext: () => void;
}

const iconComponents: Record<CampaignType, React.ReactElement> = {
  wheel: <RotateCcw className="w-8 h-8" />,
  quiz: <Brain className="w-8 h-8" />,
  jackpot: <DollarSign className="w-8 h-8" />,
  scratch: <Layers className="w-8 h-8" />,
  memory: <Grid3X3 className="w-8 h-8" />,
  puzzle: <Puzzle className="w-8 h-8" />,
  dice: <Dice6 className="w-8 h-8" />,
  form: <FileText className="w-8 h-8" />,
  swiper: <Zap className="w-8 h-8" />
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
    }, 800);
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center px-6 bg-gradient-to-br from-[#161B33] to-[#24123B] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 bg-blue-400/25 rounded-full blur-3xl animate-pulse" style={{animationDuration: '2.5s'}}></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-[#841b60]/30 rounded-full blur-2xl animate-ping" style={{animationDuration: '3.5s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-48 h-48 bg-indigo-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s', animationDuration: '4s'}}></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <div className="inline-block mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-[#841b60] to-[#6d164f] rounded-3xl flex items-center justify-center mb-6 mx-auto shadow-2xl">
              <div className="w-8 h-8 bg-white rounded-lg"></div>
            </div>
          </div>
          
          <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
            Créez votre
            <span className="bg-gradient-to-r from-[#841b60] to-[#a855f7] bg-clip-text text-transparent"> expérience </span>
            interactive
          </h1>
          
          <p className="text-xl text-gray-300 mb-12 leading-relaxed max-w-2xl mx-auto">
            Sélectionnez la mécanique de jeu qui captivera votre audience et 
            transformera vos visiteurs en participants engagés.
          </p>
        </div>

        {/* Game Selection Dock */}
        <div className="relative">
          <div className="flex items-center justify-center space-x-6 p-8 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl">
            {gameTypes.map((game, index) => (
              <div
                key={game.type}
                className={`
                  relative group cursor-pointer transition-all duration-500 transform hover:scale-110
                  ${campaign.type === game.type ? 'scale-110' : ''}
                `}
                onClick={() => handleGameSelect(game.type)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Main bubble */}
                <div className={`
                  w-24 h-24 rounded-3xl flex items-center justify-center
                  transition-all duration-300 group-hover:shadow-2xl
                  ${campaign.type === game.type
                    ? 'bg-gradient-to-br from-[#841b60] to-[#6d164f] shadow-2xl shadow-[#841b60]/50' 
                    : 'bg-white/20 backdrop-blur-xl border border-white/30 group-hover:bg-white/30'
                  }
                `}>
                  <div className={`
                    transition-colors duration-300
                    ${campaign.type === game.type ? 'text-white' : 'text-gray-300 group-hover:text-white'}
                  `}>
                    {iconComponents[game.type]}
                  </div>
                </div>

                {/* Selection ring */}
                {campaign.type === game.type && (
                  <div className="absolute inset-0 rounded-3xl border-2 border-[#841b60] animate-pulse"></div>
                )}

                {/* Tooltip */}
                <div className="absolute top-full mt-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="bg-black/80 backdrop-blur-sm rounded-2xl px-4 py-3 min-w-48 text-center">
                    <div className="text-white font-semibold text-sm mb-1">{game.name}</div>
                    <div className="text-gray-300 text-xs">{game.description}</div>
                  </div>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-black/80"></div>
                </div>

                {/* Floating particles */}
                {campaign.type === game.type && (
                  <>
                    <div className="absolute -top-2 -right-2 w-3 h-3 bg-[#841b60] rounded-full animate-ping"></div>
                    <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-violet-400 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
                  </>
                )}
              </div>
            ))}
          </div>
          
          {/* Floating elements */}
          <div className="absolute -top-4 -left-4 w-8 h-8 bg-[#841b60]/50 rounded-full blur-sm animate-pulse"></div>
          <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-violet-400/50 rounded-full blur-sm animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        {/* Instruction */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 text-sm">
            Cliquez sur une mécanique pour commencer votre création
          </p>
        </div>
      </div>
    </div>
  );
};

export default SetupStep;
