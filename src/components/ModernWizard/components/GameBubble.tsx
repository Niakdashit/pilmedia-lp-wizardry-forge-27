
import React from 'react';
import { motion } from 'framer-motion';
import { CampaignType } from '../../../utils/campaignTypes';

interface GameBubbleProps {
  game: {
    type: CampaignType;
    name: string;
    color: string;
  };
  index: number;
  isSelected: boolean;
  onSelect: (type: CampaignType) => void;
}

const GameBubble: React.FC<GameBubbleProps> = ({ game, index, isSelected, onSelect }) => {
  const getGameIcon = (type: CampaignType) => {
    const icons = {
      wheel: (
        <svg viewBox="0 0 24 24" className="w-8 h-8">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M12 2 L12 12 L22 12" stroke="currentColor" strokeWidth="2"/>
          <circle cx="12" cy="12" r="2" fill="currentColor"/>
        </svg>
      ),
      quiz: (
        <svg viewBox="0 0 24 24" className="w-8 h-8">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 .97-.5 1.8-1.5 2.3l-.5.7" stroke="currentColor" strokeWidth="2" fill="none"/>
          <circle cx="12" cy="17" r="1" fill="currentColor"/>
        </svg>
      ),
      jackpot: (
        <svg viewBox="0 0 24 24" className="w-8 h-8">
          <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M7 10h2M15 10h2M7 14h2M15 14h2" stroke="currentColor" strokeWidth="2"/>
          <circle cx="12" cy="12" r="2" fill="currentColor"/>
        </svg>
      ),
      scratch: (
        <svg viewBox="0 0 24 24" className="w-8 h-8">
          <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M8 8l8 8M16 8l-8 8" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      memory: (
        <svg viewBox="0 0 24 24" className="w-8 h-8">
          <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M21 12c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2s.9-2 2-2h14c1.1 0 2 .9 2 2z" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M19 10V8c0-1.1-.9-2-2-2H7c-1.1 0-2 .9-2 2v2" stroke="currentColor" strokeWidth="2" fill="none"/>
        </svg>
      ),
      puzzle: (
        <svg viewBox="0 0 24 24" className="w-8 h-8">
          <path d="M3 7V5c0-1.1.9-2 2-2h2M17 3h2c1.1 0 2 .9 2 2v2M21 17v2c0 1.1-.9 2-2 2h-2M7 21H5c-1.1 0-2-.9-2-2v-2" stroke="currentColor" strokeWidth="2" fill="none"/>
          <rect x="8" y="8" width="8" height="8" stroke="currentColor" strokeWidth="2" fill="none"/>
        </svg>
      ),
      dice: (
        <svg viewBox="0 0 24 24" className="w-8 h-8">
          <rect x="3" y="3" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="2" fill="none"/>
          <circle cx="5.5" cy="5.5" r="0.5" fill="currentColor"/>
          <circle cx="9.5" cy="9.5" r="0.5" fill="currentColor"/>
          <rect x="13" y="13" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="2" fill="none"/>
          <circle cx="15.5" cy="15.5" r="0.5" fill="currentColor"/>
          <circle cx="19.5" cy="19.5" r="0.5" fill="currentColor"/>
        </svg>
      ),
      form: (
        <svg viewBox="0 0 24 24" className="w-8 h-8">
          <rect x="4" y="2" width="16" height="20" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M8 6h8M8 10h8M8 14h5" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    };
    return icons[type] || icons.wheel;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        delay: index * 0.1,
        duration: 0.6,
        ease: "easeOut"
      }}
      whileHover={{ 
        scale: 1.1,
        y: -10,
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onSelect(game.type)}
      className="relative group cursor-pointer"
    >
      {/* Glow effect */}
      <div 
        className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-all duration-500"
        style={{ backgroundColor: game.color }}
      />
      
      {/* Main bubble */}
      <div 
        className={`
          relative w-32 h-32 rounded-full backdrop-blur-md border transition-all duration-500
          ${isSelected 
            ? 'bg-white/90 border-white shadow-2xl scale-110' 
            : 'bg-white/70 border-white/50 shadow-lg hover:bg-white/80 hover:shadow-xl'
          }
        `}
        style={{
          background: isSelected 
            ? `linear-gradient(135deg, ${game.color}20, white)`
            : undefined
        }}
      >
        {/* Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="transition-all duration-300"
            style={{ color: game.color }}
          >
            {getGameIcon(game.type)}
          </div>
        </div>

        {/* Selection indicator */}
        {isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-r from-[#841b60] to-[#6554c0] shadow-lg flex items-center justify-center"
          >
            <svg viewBox="0 0 24 24" className="w-3 h-3 text-white">
              <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" fill="none"/>
            </svg>
          </motion.div>
        )}
      </div>

      {/* Label */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: (index * 0.1) + 0.3, duration: 0.5 }}
        className="mt-4 text-center"
      >
        <p className="text-sm font-semibold text-gray-800">{game.name}</p>
      </motion.div>
    </motion.div>
  );
};

export default GameBubble;
