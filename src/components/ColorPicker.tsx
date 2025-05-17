import React, { useState, useCallback } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Pipette } from 'lucide-react';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  label?: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange, label }) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^#[0-9A-Fa-f]{0,6}$/.test(value)) {
      onChange(value);
    }
  };

  const handlePickerChange = useCallback((newColor: string) => {
    onChange(newColor);
  }, [onChange]);

  const handleEyeDropper = async () => {
    try {
      // @ts-ignore - EyeDropper API is not yet in TypeScript
      const eyeDropper = new EyeDropper();
      const result = await eyeDropper.open();
      onChange(result.sRGBHex);
    } catch (e) {
      console.error('EyeDropper not supported');
    }
  };

  return (
    <div className="relative">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="flex items-center space-x-2">
        <div
          className="w-10 h-10 rounded-md cursor-pointer border border-gray-300"
          style={{ backgroundColor: color }}
          onClick={() => setShowPicker(!showPicker)}
        />
        <input
          type="text"
          value={color}
          onChange={handleHexChange}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
          placeholder="#000000"
        />
        <button
          onClick={handleEyeDropper}
          className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
          title="Pipette"
        >
          <Pipette className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      {showPicker && (
        <div className="absolute z-10 mt-2">
          <div
            className="fixed inset-0"
            onClick={() => setShowPicker(false)}
          />
          <div className="relative">
            <HexColorPicker color={color} onChange={handlePickerChange} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;