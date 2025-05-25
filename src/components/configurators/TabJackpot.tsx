import React from 'react';
import { Type } from 'lucide-react';

const EMOJI_LIST = ['🍒', '🍋', '🍊', '🍀', '7️⃣', '💎', '⭐', '🎲', '🍫', '🔔'];

interface JackpotConfig {
  symbols: string[];
  reels: number;
  winMessage: string;
  loseMessage: string;
  instantWin?: {
    enabled: boolean;
    winProbability: number; // 0.05 pour 5%
    maxWinners?: number;
  };
}

interface TabJackpotProps {
  config: JackpotConfig;
  onConfigChange: (c: JackpotConfig) => void;
}

const TabJackpot: React.FC<TabJackpotProps> = ({ config, onConfigChange }) => {
  // Helper pour maj de champ
  const update = (field: keyof JackpotConfig, value: any) =>
    onConfigChange({ ...config, [field]: value });

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Émojis / symboles (cliquez pour sélectionner)
        </label>
        <div className="flex flex-wrap gap-2">
          {EMOJI_LIST.map(emoji => (
            <button
              key={emoji}
              type="button"
              className={`text-2xl p-2 border rounded-lg bg-white ${config.symbols?.includes(emoji) ? 'border-[#841b60] ring-2 ring-[#841b60]' : 'border-gray-300'}`}
              onClick={() =>
                update(
                  'symbols',
                  config.symbols?.includes(emoji)
                    ? config.symbols.filter(e => e !== emoji)
                    : [...(config.symbols || []), emoji]
                )
              }
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre de rouleaux
        </label>
        <input
          type="number"
          min={2}
          max={5}
          value={config.reels || 3}
          onChange={e => update('reels', parseInt(e.target.value))}
          className="w-20 border rounded p-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Message de victoire
        </label>
        <input
          type="text"
          value={config.winMessage || 'JACKPOT ! Vous avez gagné !'}
          onChange={e => update('winMessage', e.target.value)}
          className="w-full border rounded p-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Message de défaite
        </label>
        <input
          type="text"
          value={config.loseMessage || 'Dommage, pas de jackpot !'}
          onChange={e => update('loseMessage', e.target.value)}
          className="w-full border rounded p-2"
        />
      </div>
      <div className="pt-4 border-t">
        <label className="block font-semibold mb-1">Mode instant gagnant</label>
        <div className="flex items-center gap-4">
          <input
            type="checkbox"
            checked={!!config.instantWin?.enabled}
            onChange={e => update('instantWin', {
              ...config.instantWin,
              enabled: e.target.checked,
              winProbability: config.instantWin?.winProbability || 0.05,
              maxWinners: config.instantWin?.maxWinners,
            })}
          />
          <span>Activer l'instant gagnant</span>
        </div>
        {config.instantWin?.enabled && (
          <div className="mt-3 space-y-2">
            <div>
              <label className="block text-sm">Probabilité de gain (%)</label>
              <input
                type="number"
                min={1}
                max={100}
                value={config.instantWin.winProbability ? Math.round(config.instantWin.winProbability * 100) : 5}
                onChange={e =>
                  update('instantWin', {
                    ...config.instantWin,
                    winProbability: parseInt(e.target.value) / 100
                  })
                }
                className="w-20 border rounded p-2"
              />%
            </div>
            <div>
              <label className="block text-sm">Nombre max de gagnants (optionnel)</label>
              <input
                type="number"
                min={1}
                value={config.instantWin.maxWinners || ''}
                onChange={e =>
                  update('instantWin', {
                    ...config.instantWin,
                    maxWinners: e.target.value ? parseInt(e.target.value) : undefined
                  })
                }
                className="w-20 border rounded p-2"
              />
            </div>
          </div>
        )}
      </div>
      {/* Résumé config en live */}
      <div className="mt-6 p-4 bg-gray-50 border rounded-lg">
        <h3 className="font-semibold text-[#841b60] mb-2">Résumé de la configuration</h3>
        <ul className="text-sm">
          <li>
            <span className="font-medium">Symboles sélectionnés :</span> {config.symbols?.length ? config.symbols.join(' ') : '—'}
          </li>
          <li>
            <span className="font-medium">Nombre de rouleaux :</span> {config.reels || 3}
          </li>
          <li>
            <span className="font-medium">Message victoire :</span> {config.winMessage || 'JACKPOT ! Vous avez gagné !'}
          </li>
          <li>
            <span className="font-medium">Message défaite :</span> {config.loseMessage || 'Dommage, pas de jackpot !'}
          </li>
          <li>
            <span className="font-medium">Instant gagnant :</span> {config.instantWin?.enabled ? `Oui (${config.instantWin.winProbability * 100 || 5}% proba${config.instantWin.maxWinners ? `, max ${config.instantWin.maxWinners} gagnants` : ''})` : 'Non'}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TabJackpot;