
import React from 'react';
import { motion } from 'framer-motion';

interface ToggleSwitchProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  description?: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  label,
  checked,
  onChange,
  description
}) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl">
      <div className="flex-1">
        <label className="text-sm font-medium text-gray-700 cursor-pointer">
          {label}
        </label>
        {description && (
          <p className="text-xs text-gray-500 mt-1">{description}</p>
        )}
      </div>
      
      <motion.button
        onClick={() => onChange(!checked)}
        className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
          checked ? 'bg-[#841b60]' : 'bg-gray-300'
        }`}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm"
          animate={{ x: checked ? 24 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </motion.button>
    </div>
  );
};

export default ToggleSwitch;
