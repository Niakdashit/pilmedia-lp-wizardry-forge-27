
import React from 'react';
import { motion } from 'framer-motion';

interface ChipSelectorProps {
  label?: string;
  options: string[];
  selected: string;
  onChange: (value: string) => void;
}

const ChipSelector: React.FC<ChipSelectorProps> = ({
  label,
  options,
  selected,
  onChange
}) => {
  return (
    <div className="space-y-3">
      {label && (
        <label className="block text-sm font-medium text-gray-700">{label}</label>
      )}
      
      <div className="flex flex-wrap gap-2">
        {options.map((option, index) => {
          const isSelected = selected === option;
          
          return (
            <motion.button
              key={option}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onChange(option)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                isSelected
                  ? 'bg-gradient-to-r from-[#841b60] to-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
              }`}
            >
              {option}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default ChipSelector;
