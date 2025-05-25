import React from 'react';

interface AppearanceTabProps {
  gameConfig: any;
  onChange: (key: string, value: string) => void;
}

const AppearanceTab: React.FC<AppearanceTabProps> = ({ gameConfig, onChange }) => {
  return (
    <div className="space-y-4 mt-6">
      {/* Modèle personnalisé du jackpot */}
      <div>
        <label className="block font-medium mb-1">Modèle personnalisé du jackpot (680x400)</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onChange('customTemplate', URL.createObjectURL(file));
          }}
        />
      </div>

      {/* Texte du bouton */}
      <div>
        <label className="block font-medium mb-1">Texte du bouton</label>
        <input
          type="text"
          value={gameConfig.buttonLabel || ''}
          onChange={(e) => onChange('buttonLabel', e.target.value)}
          className="border rounded px-3 py-2 w-full"
        />
      </div>

      {/* Couleur du bouton */}
      <div>
        <label className="block font-medium mb-1">Couleur du bouton</label>
        <input
          type="color"
          value={gameConfig.buttonColor || '#ec4899'}
          onChange={(e) => onChange('buttonColor', e.target.value)}
          className="h-10 w-20 p-0 border rounded"
        />
      </div>
    </div>
  );
};

export default AppearanceTab;
