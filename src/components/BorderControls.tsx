
import React from 'react';

interface BorderControlsProps {
  border: string;
  onChange: (border: string) => void;
  label: string;
}

const BorderControls: React.FC<BorderControlsProps> = ({ border, onChange, label }) => {
  // Préréglages de bordure
  const borderPresets = [
    { name: 'Aucune', value: 'none' },
    { name: 'Fine', value: '1px solid rgba(0, 0, 0, 0.1)' },
    { name: 'Moyenne', value: '2px solid rgba(0, 0, 0, 0.15)' },
    { name: 'Pointillée', value: '1px dashed rgba(0, 0, 0, 0.2)' },
    { name: 'Double', value: '4px double rgba(0, 0, 0, 0.1)' },
    { name: 'Colorée', value: '2px solid #841b60' }
  ];

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {borderPresets.map((preset) => (
          <button
            key={preset.name}
            onClick={() => onChange(preset.value)}
            className={`px-3 py-2 rounded-md text-sm ${
              border === preset.value 
                ? 'bg-[#841b60] bg-opacity-10' 
                : 'bg-white'
            }`}
            style={{ border: preset.value }}
          >
            {preset.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BorderControls;
