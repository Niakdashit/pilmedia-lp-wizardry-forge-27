
import React from 'react';
import { CampaignType } from '../../../utils/campaignTypes';
import { RotateCcw, Brain, DollarSign, Layers, Grid3X3, Puzzle, Dice6, FileText } from 'lucide-react';

interface GameBubbleProps {
  gameType: CampaignType;
  name: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
  delay?: number;
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
  swiper: <RotateCcw className="w-8 h-8" />
};

const GameBubble: React.FC<GameBubbleProps> = ({
  gameType,
  name,
  description,
  isSelected,
  onClick,
  delay = 0
}) => {
  return (
    <div
      className="relative group cursor-pointer"
      onClick={onClick}
      style={{ 
        animation: `fadeInUp 0.6s ease-out ${delay}ms both`,
      }}
    >
      {/* Main bubble */}
      <div className={`
        w-24 h-24 rounded-2xl flex items-center justify-center transition-all duration-300 backdrop-blur-sm border shadow-sm
        group-hover:scale-110 group-hover:shadow-lg
        ${isSelected 
          ? 'bg-[#951b6d] text-white border-[#951b6d] shadow-lg scale-110' 
          : 'bg-white/80 text-gray-600 border-white/50 group-hover:bg-[#951b6d]/10 group-hover:text-[#951b6d] group-hover:border-[#951b6d]/30'
        }
      `}>
        {iconComponents[gameType]}
      </div>

      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center animate-pulse">
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
      )}

      {/* Tooltip */}
      <div className="absolute top-full mt-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-20">
        <div className="bg-[#141e29] text-white rounded-xl px-4 py-3 min-w-48 text-center shadow-lg">
          <div className="font-semibold text-sm mb-1">{name}</div>
          <div className="text-gray-300 text-xs">{description}</div>
        </div>
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-[#141e29]"></div>
      </div>
    </div>
  );
};

export default GameBubble;
