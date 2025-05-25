
import React from 'react';
import ImageUpload from '../common/ImageUpload';

interface TabJackpotProps {
  config: any;
  onConfigChange: (config: any) => void;
}

const TabJackpot: React.FC<TabJackpotProps> = ({ config = {}, onConfigChange }) => {
  // Provide default values if config is undefined or missing properties
  const safeConfig = {
    symbols: ['🍒', '🍋', '🍊'],
    reels: 3,
    winMessage: 'JACKPOT ! Vous avez gagné !',
    loseMessage: 'Dommage, pas de jackpot !',
    customTemplate: '',
    ...config
  };

  const handleChange = (field: string, value: any) => {
    onConfigChange({
      ...safeConfig,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Modèle de jackpot</h3>
        <ImageUpload
          value={safeConfig.customTemplate}
          onChange={(value) => handleChange('customTemplate', value)}
          label="Uploadez votre modèle personnalisé de jackpot"
          className="w-full"
        />
        <p className="text-sm text-gray-500 mt-2">
          Si aucun modèle n'est uploadé, le modèle par défaut sera utilisé.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Symboles du jackpot
        </label>
        <input
          type="text"
          value={safeConfig.symbols?.join(', ') || '🍒, 🍋, 🍊'}
          onChange={(e) => handleChange('symbols', e.target.value.split(', '))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
          placeholder="🍒, 🍋, 🍊"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nombre de rouleaux
        </label>
        <input
          type="number"
          value={safeConfig.reels || 3}
          onChange={(e) => handleChange('reels', parseInt(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
          min="3"
          max="5"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Message de victoire
        </label>
        <input
          type="text"
          value={safeConfig.winMessage || 'JACKPOT ! Vous avez gagné !'}
          onChange={(e) => handleChange('winMessage', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Message de défaite
        </label>
        <input
          type="text"
          value={safeConfig.loseMessage || 'Dommage, pas de jackpot !'}
          onChange={(e) => handleChange('loseMessage', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
        />
      </div>
    </div>
  );
};

export default TabJackpot;
