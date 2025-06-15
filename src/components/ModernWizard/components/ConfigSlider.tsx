
import React from 'react';
import { motion } from 'framer-motion';

interface ConfigSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  suffix?: string;
  labels?: string[];
}

const ConfigSlider: React.FC<ConfigSliderProps> = ({
  label,
  value,
  min,
  max,
  onChange,
  suffix = '',
  labels
}) => {
  const percentage = ((value - min) / (max - min)) * 100;
  const getLabel = (val: number) => {
    if (labels) {
      return labels[val - 1] || `${val}${suffix}`;
    }
    return `${val}${suffix}`;
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <span className="text-sm font-semibold text-[#841b60] bg-[#841b60]/10 px-2 py-1 rounded-lg">
          {getLabel(value)}
        </span>
      </div>
      
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #841b60 0%, #841b60 ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`
          }}
        />
        
        <motion.div
          className="absolute w-5 h-5 bg-white border-2 border-[#841b60] rounded-full shadow-lg top-1/2 transform -translate-y-1/2"
          style={{ left: `calc(${percentage}% - 10px)` }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        />
      </div>
      
      <div className="flex justify-between text-xs text-gray-500">
        <span>{getLabel(min)}</span>
        <span>{getLabel(max)}</span>
      </div>
    </div>
  );
};

export default ConfigSlider;
