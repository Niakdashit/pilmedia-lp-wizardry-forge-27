
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
  onSelect: (gameType: CampaignType) => void;
}

const GameBubble: React.FC<GameBubbleProps> = ({ game, index, isSelected, onSelect }) => {
  const iconComponents: Record<CampaignType, JSX.Element> = {
    wheel: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="currentColor">
        <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" strokeWidth="2"/>
        <path d="M24 4 L24 12 M24 36 L24 44 M4 24 L12 24 M36 24 L44 24 M9.86 9.86 L15.76 15.76 M32.24 32.24 L38.14 38.14 M9.86 38.14 L15.76 32.24 M32.24 15.76 L38.14 9.86"/>
      </svg>
    ),
    quiz: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="currentColor">
        <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" strokeWidth="2"/>
        <path d="M20 18c0-2.2 1.8-4 4-4s4 1.8 4 4c0 2.2-1.8 4-4 4h0v4"/>
        <circle cx="24" cy="34" r="1"/>
      </svg>
    ),
    jackpot: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="currentColor">
        <rect x="12" y="8" width="24" height="32" rx="4" fill="none" stroke="currentColor" strokeWidth="2"/>
        <circle cx="18" cy="18" r="2"/>
        <circle cx="24" cy="18" r="2"/>
        <circle cx="30" cy="18" r="2"/>
        <path d="M16 30h16"/>
      </svg>
    ),
    scratch: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="currentColor">
        <rect x="8" y="12" width="32" height="24" rx="4" fill="none" stroke="currentColor" strokeWidth="2"/>
        <path d="M16 20l4 4 8-8"/>
      </svg>
    ),
    memory: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="currentColor">
        <rect x="10" y="10" width="12" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>
        <rect x="26" y="10" width="12" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>
        <rect x="10" y="26" width="12" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>
        <rect x="26" y="26" width="12" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    puzzle: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="currentColor">
        <path d="M12 12h8v4c2 0 4 2 4 4s-2 4-4 4v4h8v-8c2 0 4-2 4-4s-2-4-4-4v-8h-8v4c-2 0-4 2-4 4s2 4 4 4v4h-8v-8z" fill="none" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    dice: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="currentColor">
        <rect x="8" y="8" width="16" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>
        <circle cx="12" cy="12" r="1"/>
        <circle cx="20" cy="20" r="1"/>
        <rect x="24" y="24" width="16" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>
        <circle cx="28" cy="28" r="1"/>
        <circle cx="32" cy="32" r="1"/>
        <circle cx="36" cy="36" r="1"/>
      </svg>
    ),
    swiper: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="currentColor">
        <rect x="8" y="16" width="32" height="16" rx="4" fill="none" stroke="currentColor" strokeWidth="2"/>
        <path d="M16 24h16M28 20l4 4-4 4"/>
      </svg>
    ),
    form: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="currentColor">
        <rect x="12" y="8" width="24" height="32" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>
        <path d="M18 16h12M18 22h12M18 28h8"/>
      </svg>
    )
  };

  const IconComponent = iconComponents[game.type] || iconComponents.wheel;

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        y: isSelected ? -8 : 0
      }}
      transition={{ 
        delay: index * 0.1,
        duration: 0.6,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        scale: 1.1,
        y: -12,
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onSelect(game.type)}
      className={`
        relative group w-32 h-32 rounded-3xl
        backdrop-blur-md border border-white/20
        flex flex-col items-center justify-center
        transition-all duration-500 ease-out
        ${isSelected 
          ? 'bg-white/30 shadow-2xl ring-2 ring-white/40' 
          : 'bg-white/10 hover:bg-white/20 shadow-lg hover:shadow-xl'
        }
      `}
      style={{
        background: isSelected 
          ? `linear-gradient(135deg, ${game.color}20, white)`
          : undefined
      }}
    >
      {/* Glow effect */}
      <div 
        className={`
          absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500
          ${isSelected ? 'opacity-50' : ''}
        `}
        style={{
          background: `linear-gradient(135deg, ${game.color}30, transparent)`,
          filter: 'blur(20px)',
          transform: 'scale(1.1)'
        }}
      />
      
      {/* Icon */}
      <div 
        className="relative z-10 mb-3 transition-colors duration-300"
        style={{ color: isSelected ? game.color : '#64748b' }}
      >
        {IconComponent}
      </div>
      
      {/* Title */}
      <span className={`
        relative z-10 text-sm font-semibold text-center leading-tight transition-colors duration-300
        ${isSelected ? 'text-gray-800' : 'text-gray-600 group-hover:text-gray-800'}
      `}>
        {game.name}
      </span>

      {/* Selection indicator */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-r from-[#841b60] to-[#6554c0] flex items-center justify-center shadow-lg"
        >
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </motion.div>
      )}
    </motion.button>
  );
};

export default GameBubble;
