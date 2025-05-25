
import React from 'react';

interface TabJackpotProps {
  config: any;
  onConfigChange: (config: any) => void;
}

const TabJackpot: React.FC<TabJackpotProps> = ({ config, onConfigChange }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Configuration du Jackpot</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Symboles
          </label>
          <input
            type="text"
            value={config?.symbols?.join(', ') || ''}
            onChange={(e) => onConfigChange({ ...config, symbols: e.target.value.split(', ') })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="🍒, 🍋, 🍊"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre de rouleaux
          </label>
          <input
            type="number"
            value={config?.reels || 3}
            onChange={(e) => onConfigChange({ ...config, reels: parseInt(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            min="1"
            max="5"
          />
        </div>
      </div>
    </div>
  );
};

export default TabJackpot;
