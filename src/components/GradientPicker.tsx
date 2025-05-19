
import React, { useState } from 'react';
import { Pipette } from 'lucide-react';

interface GradientPickerProps {
  gradient: string;
  onChange: (gradient: string) => void;
}

// Liste des dégradés prédéfinis
const presetGradients = [
  'linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)',
  'linear-gradient(180deg, rgb(254,100,121) 0%, rgb(251,221,186) 100%)',
  'linear-gradient(to right, #243949 0%, #517fa4 100%)',
  'linear-gradient(to top, #accbee 0%, #e7f0fd 100%)',
  'linear-gradient(to right, #ffc3a0 0%, #ffafbd 100%)',
  'linear-gradient(225deg, #FFE29F 0%, #FFA99F 48%, #FF719A 100%)',
  'linear-gradient(90deg, hsla(277, 75%, 84%, 1) 0%, hsla(297, 50%, 51%, 1) 100%)',
  'linear-gradient(90deg, hsla(186, 33%, 94%, 1) 0%, hsla(216, 41%, 79%, 1) 100%)',
  'linear-gradient(90deg, hsla(22, 100%, 78%, 1) 0%, hsla(2, 78%, 62%, 1) 100%)',
  'linear-gradient(90deg, hsla(139, 70%, 75%, 1) 0%, hsla(63, 90%, 76%, 1) 100%)',
  'linear-gradient(60deg, #abecd6 0%, #fbed96 100%)',
  'linear-gradient(to right, #e6e9f0 0%, #eef1f5 100%)',
];

const GradientPicker: React.FC<GradientPickerProps> = ({ gradient, onChange }) => {
  const [customGradient, setCustomGradient] = useState(gradient);
  
  const handleCustomGradientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomGradient(value);
  };

  const handleSubmitCustomGradient = (e: React.FormEvent) => {
    e.preventDefault();
    onChange(customGradient);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        {presetGradients.map((presetGradient, index) => (
          <button
            key={index}
            onClick={() => onChange(presetGradient)}
            className={`w-full h-16 rounded-md border-2 transition-all ${presetGradient === gradient ? 'border-[#841b60]' : 'border-transparent'}`}
            style={{ background: presetGradient }}
          />
        ))}
      </div>
      
      <div>
        <form onSubmit={handleSubmitCustomGradient} className="flex items-center space-x-2">
          <input
            type="text"
            value={customGradient}
            onChange={handleCustomGradientChange}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
            placeholder="linear-gradient(..."
          />
          <button
            type="submit"
            className="p-2 bg-[#841b60] text-white rounded-md hover:bg-[#6d1750] transition-colors"
          >
            Appliquer
          </button>
        </form>
      </div>
      
      <div className="h-16 rounded-md border border-gray-300" style={{ background: gradient }}>
        <div className="h-full flex items-center justify-center">
          <span className="text-sm bg-white bg-opacity-70 px-2 py-1 rounded">
            Aperçu
          </span>
        </div>
      </div>
    </div>
  );
};

export default GradientPicker;
