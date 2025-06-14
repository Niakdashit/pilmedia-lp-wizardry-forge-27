
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Trophy, Zap, ArrowRight } from 'lucide-react';

interface GameMechanic {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
}

interface GameMechanicSelectionProps {
  preSelectedType?: string;
  onSelect: (mechanicId: string) => void;
  className?: string;
}

const GameMechanicSelection: React.FC<GameMechanicSelectionProps> = ({
  preSelectedType,
  onSelect,
  className = ''
}) => {
  const [selectedMechanic, setSelectedMechanic] = useState<string | null>(preSelectedType || null);

  const mechanics: GameMechanic[] = [
    {
      id: 'wheel',
      name: 'Spin Wheel',
      description: 'Interactive spinning wheel with customizable segments',
      icon: (
        <div className="relative">
          <div className="w-8 h-8 rounded-full border-4 border-current opacity-20"></div>
          <div className="absolute inset-0 w-8 h-8 rounded-full border-4 border-current border-t-transparent animate-spin"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-current rounded-full"></div>
        </div>
      ),
      color: '#3B82F6',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      id: 'quiz',
      name: 'Interactive Quiz',
      description: 'Engaging quiz with multiple choice questions',
      icon: (
        <div className="relative">
          <div className="w-8 h-6 bg-current rounded opacity-20"></div>
          <div className="absolute top-1 left-1 w-6 h-1 bg-current rounded"></div>
          <div className="absolute top-3 left-1 w-4 h-1 bg-current rounded"></div>
          <div className="absolute bottom-1 right-1 w-3 h-3 bg-current rounded-full"></div>
        </div>
      ),
      color: '#10B981',
      gradient: 'from-emerald-500 to-emerald-600'
    },
    {
      id: 'jackpot',
      name: 'Instant Win',
      description: 'Jackpot-style instant win game',
      icon: (
        <div className="relative flex space-x-1">
          <div className="w-2 h-8 bg-current rounded opacity-60 animate-pulse"></div>
          <div className="w-2 h-8 bg-current rounded animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-8 bg-current rounded opacity-60 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      ),
      color: '#F59E0B',
      gradient: 'from-amber-500 to-amber-600'
    },
    {
      id: 'scratch',
      name: 'Scratch Card',
      description: 'Digital scratch-to-reveal experience',
      icon: (
        <div className="relative">
          <div className="w-8 h-6 bg-current rounded opacity-20"></div>
          <div className="absolute top-1 left-2 w-4 h-4 bg-current rounded-full opacity-60"></div>
          <div className="absolute bottom-0 right-1 w-2 h-2 bg-current rounded"></div>
        </div>
      ),
      color: '#8B5CF6',
      gradient: 'from-violet-500 to-violet-600'
    },
    {
      id: 'memory',
      name: 'Memory Game',
      description: 'Card matching memory challenge',
      icon: (
        <div className="grid grid-cols-2 gap-1">
          <div className="w-3 h-4 bg-current rounded opacity-40"></div>
          <div className="w-3 h-4 bg-current rounded"></div>
          <div className="w-3 h-4 bg-current rounded"></div>
          <div className="w-3 h-4 bg-current rounded opacity-40"></div>
        </div>
      ),
      color: '#EF4444',
      gradient: 'from-red-500 to-red-600'
    },
    {
      id: 'dice',
      name: 'Lucky Dice',
      description: 'Roll dice for instant rewards',
      icon: (
        <div className="relative">
          <div className="w-7 h-7 bg-current rounded-lg opacity-20"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="grid grid-cols-2 gap-1">
              <div className="w-1 h-1 bg-current rounded-full"></div>
              <div className="w-1 h-1 bg-current rounded-full opacity-0"></div>
              <div className="w-1 h-1 bg-current rounded-full opacity-0"></div>
              <div className="w-1 h-1 bg-current rounded-full"></div>
            </div>
          </div>
        </div>
      ),
      color: '#06B6D4',
      gradient: 'from-cyan-500 to-cyan-600'
    }
  ];

  const handleSelect = (mechanicId: string) => {
    setSelectedMechanic(mechanicId);
    onSelect(mechanicId);
  };

  return (
    <div className={`max-w-6xl mx-auto px-6 py-12 ${className}`}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Choose Your Game Mechanic
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Select the perfect interactive experience for your campaign
        </p>
      </motion.div>

      {/* Game Mechanics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {mechanics.map((mechanic, index) => (
          <motion.div
            key={mechanic.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            <motion.button
              onClick={() => handleSelect(mechanic.id)}
              className={`w-full p-6 rounded-2xl border-2 transition-all duration-300 ${
                selectedMechanic === mechanic.id
                  ? 'border-gray-900 shadow-2xl scale-105'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-lg hover:scale-102'
              }`}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              style={{
                background: selectedMechanic === mechanic.id 
                  ? `linear-gradient(135deg, ${mechanic.color}15, ${mechanic.color}05)`
                  : 'white'
              }}
            >
              {/* Icon Container */}
              <motion.div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${mechanic.gradient} text-white mb-4 shadow-lg`}
                whileHover={{ 
                  scale: 1.1,
                  rotate: [0, -5, 5, 0],
                  transition: { duration: 0.3 }
                }}
              >
                <div style={{ color: 'white' }}>
                  {mechanic.icon}
                </div>
              </motion.div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {mechanic.name}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {mechanic.description}
              </p>

              {/* Selection Indicator */}
              {selectedMechanic === mechanic.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-4 right-4 w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Sparkles className="w-3 h-3 text-white" />
                  </motion.div>
                </motion.div>
              )}
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* Continue Button */}
      {selectedMechanic && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center"
        >
          <motion.button
            onClick={() => onSelect(selectedMechanic)}
            className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-lg font-semibold">Continue to Configuration</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      )}

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 w-8 h-8 opacity-10"
        >
          <Trophy className="w-full h-full text-amber-500" />
        </motion.div>
        
        <motion.div
          animate={{
            y: [0, 10, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-20 right-10 w-6 h-6 opacity-10"
        >
          <Zap className="w-full h-full text-blue-500" />
        </motion.div>
      </div>
    </div>
  );
};

export default GameMechanicSelection;
