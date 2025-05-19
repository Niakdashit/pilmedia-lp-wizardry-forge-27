
import React from 'react';

interface ShadowControlsProps {
  shadow: string;
  onChange: (shadow: string) => void;
  label: string;
}

const ShadowControls: React.FC<ShadowControlsProps> = ({ shadow, onChange, label }) => {
  // Préréglages d'ombre
  const shadowPresets = [
    { name: 'Aucune', value: 'none' },
    { name: 'Légère', value: '0 2px 5px rgba(0, 0, 0, 0.1)' },
    { name: 'Moyenne', value: '0 4px 10px rgba(0, 0, 0, 0.15)' },
    { name: 'Forte', value: '0 8px 20px rgba(0, 0, 0, 0.2)' },
    { name: 'Diffuse', value: '0 0 15px rgba(0, 0, 0, 0.1)' },
    { name: 'Intérieure', value: 'inset 0 0 10px rgba(0, 0, 0, 0.2)' }
  ];

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {shadowPresets.map((preset) => (
          <button
            key={preset.name}
            onClick={() => onChange(preset.value)}
            className={`px-3 py-2 border rounded-md text-sm ${
              shadow === preset.value 
                ? 'border-[#841b60] bg-[#841b60] bg-opacity-10' 
                : 'border-gray-300'
            }`}
            style={{ boxShadow: preset.value }}
          >
            {preset.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ShadowControls;
