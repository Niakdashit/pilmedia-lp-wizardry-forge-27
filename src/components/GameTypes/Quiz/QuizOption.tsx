
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Circle } from 'lucide-react';

interface QuizOptionProps {
  option: any;
  isSelected: boolean;
  isMultiple: boolean;
  onSelect: () => void;
  design?: any;
  index: number;
}

const QuizOption: React.FC<QuizOptionProps> = ({
  option,
  isSelected,
  isMultiple,
  onSelect,
  design = {},
  index
}) => {
  const optionStyle = {
    backgroundColor: isSelected 
      ? `${design.primaryColor || '#841b60'}15` 
      : design.optionBackgroundColor || '#ffffff',
    borderColor: isSelected 
      ? design.primaryColor || '#841b60' 
      : design.optionBorderColor || '#e5e7eb',
    color: design.textColor || '#374151',
    borderRadius: design.borderRadius || '12px'
  };

  const iconColor = isSelected ? design.primaryColor || '#841b60' : '#9ca3af';

  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className="w-full p-4 text-left border-2 transition-all duration-200 hover:shadow-lg group"
      style={optionStyle}
    >
      <div className="flex items-center space-x-4">
        {/* Selection indicator */}
        <div className="flex-shrink-0">
          {isMultiple ? (
            <div className="relative">
              {isSelected ? (
                <CheckCircle className="w-6 h-6" style={{ color: iconColor }} />
              ) : (
                <div 
                  className="w-6 h-6 border-2 rounded"
                  style={{ borderColor: iconColor }}
                />
              )}
            </div>
          ) : (
            <div className="relative">
              {isSelected ? (
                <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center" style={{ borderColor: iconColor }}>
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: iconColor }} />
                </div>
              ) : (
                <Circle className="w-6 h-6" style={{ color: iconColor }} />
              )}
            </div>
          )}
        </div>

        {/* Option text */}
        <span className="flex-1 font-medium group-hover:translate-x-1 transition-transform duration-200">
          {option.text}
        </span>

        {/* Option number */}
        <div 
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold opacity-60"
          style={{ backgroundColor: `${design.primaryColor || '#841b60'}20` }}
        >
          {String.fromCharCode(65 + index)}
        </div>
      </div>
    </motion.button>
  );
};

export default QuizOption;
