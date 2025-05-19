
import React from 'react';

interface FontSelectorProps {
  value: string;
  onChange: (font: string) => void;
}

const FontSelector: React.FC<FontSelectorProps> = ({ value, onChange }) => {
  const fonts = [
    { name: 'Inter', family: '"Inter", sans-serif' },
    { name: 'Montserrat', family: '"Montserrat", sans-serif' },
    { name: 'Roboto', family: '"Roboto", sans-serif' },
    { name: 'Arial', family: 'Arial, sans-serif' },
    { name: 'Helvetica', family: 'Helvetica, sans-serif' },
    { name: 'Times New Roman', family: '"Times New Roman", serif' },
    { name: 'Georgia', family: 'Georgia, serif' },
    { name: 'Courier New', family: '"Courier New", monospace' },
  ];
  
  return (
    <div className="space-y-3">
      <select 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#841b60]"
      >
        {fonts.map((font) => (
          <option key={font.name} value={font.name} style={{ fontFamily: font.family }}>
            {font.name}
          </option>
        ))}
      </select>
      
      <div className="p-3 border border-gray-300 rounded-md">
        <p className="text-sm" style={{ fontFamily: value === 'Inter' ? '"Inter", sans-serif' : 
                                                 value === 'Montserrat' ? '"Montserrat", sans-serif' : 
                                                 value === 'Roboto' ? '"Roboto", sans-serif' : value }}>
          Voici un exemple de texte dans la police {value}.
        </p>
      </div>
    </div>
  );
};

export default FontSelector;
