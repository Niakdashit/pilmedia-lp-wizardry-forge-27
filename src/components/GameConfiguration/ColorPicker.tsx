
import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

const presetColors = [
  '#3B82F6', '#EF4444', '#10B981', '#F59E0B', 
  '#8B5CF6', '#06B6D4', '#EC4899', '#84CC16',
  '#F97316', '#6366F1', '#14B8A6', '#F43F5E',
  '#8B5A2B', '#1F2937', '#7C2D12', '#4C1D95'
];

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange }) => {
  const [customColor, setCustomColor] = useState(color);

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setCustomColor(newColor);
    onChange(newColor);
  };

  return (
    <div className="space-y-4">
      {/* Preset Colors */}
      <div className="grid grid-cols-8 gap-3">
        {presetColors.map((presetColor) => (
          <button
            key={presetColor}
            onClick={() => onChange(presetColor)}
            className={`w-12 h-12 rounded-lg border-2 transition-all duration-200 hover:scale-110 ${
              color === presetColor ? 'border-gray-900 shadow-lg' : 'border-gray-200'
            }`}
            style={{ backgroundColor: presetColor }}
          >
            {color === presetColor && (
              <Check className="w-6 h-6 text-white mx-auto" />
            )}
          </button>
        ))}
      </div>

      {/* Custom Color */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <input
            type="color"
            value={customColor}
            onChange={handleCustomColorChange}
            className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
          />
          <span className="text-gray-600">Custom Color</span>
        </div>
        <input
          type="text"
          value={customColor}
          onChange={(e) => handleCustomColorChange(e as any)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
          placeholder="#000000"
        />
      </div>

      {/* Color Preview */}
      <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
        <div
          className="w-16 h-16 rounded-lg border border-gray-200"
          style={{ backgroundColor: color }}
        ></div>
        <div>
          <p className="font-medium text-gray-900">Selected Color</p>
          <p className="text-sm text-gray-600 font-mono">{color}</p>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
