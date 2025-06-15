
import React from 'react';
import { motion } from 'framer-motion';
import { Target, HelpCircle, DollarSign, Brain, Puzzle, Dice6, Cookie, Zap } from 'lucide-react';
import { GameType, CampaignData } from '../../../pages/ModernCampaignWizard';

interface GameMechanicSelectionProps {
  updateCampaignData: (updates: Partial<CampaignData>) => void;
  onNext: () => void;
}

const gameTypes = [
  {
    id: 'wheel' as GameType,
    name: 'Spin Wheel',
    description: 'Classic spinning wheel with customizable rewards',
    icon: Target,
    color: 'from-pink-500 to-rose-500',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-200'
  },
  {
    id: 'quiz' as GameType,
    name: 'Interactive Quiz',
    description: 'Engage with branded questions and instant results',
    icon: HelpCircle,
    color: 'from-blue-500 to-indigo-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  {
    id: 'jackpot' as GameType,
    name: 'Instant Win',
    description: 'Digital scratch cards and instant prizes',
    icon: DollarSign,
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200'
  },
  {
    id: 'memory' as GameType,
    name: 'Memory Game',
    description: 'Card matching with your brand elements',
    icon: Brain,
    color: 'from-purple-500 to-violet-500',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200'
  },
  {
    id: 'puzzle' as GameType,
    name: 'Puzzle Challenge',
    description: 'Interactive puzzles with branded imagery',
    icon: Puzzle,
    color: 'from-orange-500 to-amber-500',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200'
  },
  {
    id: 'dice' as GameType,
    name: 'Lucky Dice',
    description: 'Roll the dice for instant rewards',
    icon: Dice6,
    color: 'from-red-500 to-pink-500',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200'
  },
  {
    id: 'scratch' as GameType,
    name: 'Scratch & Win',
    description: 'Digital scratch cards with hidden prizes',
    icon: Cookie,
    color: 'from-yellow-500 to-orange-500',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200'
  }
];

const GameMechanicSelection: React.FC<GameMechanicSelectionProps> = ({
  updateCampaignData,
  onNext
}) => {
  const handleGameSelect = (gameType: GameType) => {
    updateCampaignData({ gameType });
    setTimeout(onNext, 300); // Small delay for animation
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Choose Your Game Mechanic
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Select the perfect interactive experience for your brand campaign
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gameTypes.map((game, index) => {
          const Icon = game.icon;
          
          return (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className={`relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-xl border ${game.borderColor} group`}
              onClick={() => handleGameSelect(game.id)}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${game.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              
              {/* Icon */}
              <div className={`w-16 h-16 rounded-xl ${game.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className={`w-8 h-8 bg-gradient-to-r ${game.color} bg-clip-text text-transparent`} />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {game.name}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {game.description}
              </p>

              {/* Selection Indicator */}
              <motion.div
                className="absolute top-4 right-4 w-6 h-6 rounded-full border-2 border-gray-300 group-hover:border-[#841b60] transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
              >
                <motion.div
                  className="w-full h-full rounded-full bg-gradient-to-r from-[#841b60] to-purple-600 scale-0 group-hover:scale-50 transition-transform duration-300"
                />
              </motion.div>

              {/* Hover Accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#841b60] to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl" />
            </motion.div>
          );
        })}
      </div>

      {/* Magic Wand */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center mt-12"
      >
        <div className="inline-flex items-center space-x-2 text-[#841b60] bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
          <Zap className="w-5 h-5" />
          <span className="font-medium">AI will customize everything for your brand</span>
        </div>
      </motion.div>
    </div>
  );
};

export default GameMechanicSelection;
