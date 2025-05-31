
import React from 'react';
import { Coins, Target } from 'lucide-react';

interface JackpotGameConfigProps {
  campaign: any;
  setCampaign: React.Dispatch<React.SetStateAction<any>>;
}

const JackpotGameConfig: React.FC<JackpotGameConfigProps> = ({
  campaign,
  setCampaign
}) => {
  const handleJackpotChange = (field: string, value: any) => {
    setCampaign((prev: any) => ({
      ...prev,
      gameConfig: {
        ...prev.gameConfig,
        jackpot: {
          ...prev.gameConfig?.jackpot,
          [field]: value
        }
      }
    }));
  };

  const handleInstantWinChange = (field: string, value: any) => {
    setCampaign((prev: any) => ({
      ...prev,
      gameConfig: {
        ...prev.gameConfig,
        jackpot: {
          ...prev.gameConfig?.jackpot,
          instantWin: {
            ...prev.gameConfig?.jackpot?.instantWin,
            [field]: value
          }
        }
      }
    }));
  };

  const symbols = ['🍒', '🍋', '🍊', '⭐', '💎', '🎰', '🔔', '🍀'];

  return (
    <div className="space-y-6">
      {/* Symboles */}
      <div className="space-y-3">
        <label className="flex items-center text-sm font-medium text-gray-700">
          <Coins className="w-4 h-4 mr-2" />
          Symboles du jackpot
        </label>
        <div className="grid grid-cols-4 gap-2">
          {symbols.map((symbol) => (
            <button
              key={symbol}
              onClick={() => {
                const currentSymbols = campaign.gameConfig?.jackpot?.symbols || ['🍒', '🍋', '🍊'];
                if (currentSymbols.includes(symbol)) {
                  handleJackpotChange('symbols', currentSymbols.filter((s: string) => s !== symbol));
                } else {
                  handleJackpotChange('symbols', [...currentSymbols, symbol]);
                }
              }}
              className={`p-3 text-2xl rounded-lg border-2 transition-all ${
                (campaign.gameConfig?.jackpot?.symbols || ['🍒', '🍋', '🍊']).includes(symbol)
                  ? 'border-[#841b60] bg-[#841b60]/10'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              {symbol}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-500">
          Sélectionnez les symboles qui apparaîtront sur les rouleaux
        </p>
      </div>

      {/* Nombre de rouleaux */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Nombre de rouleaux</label>
        <select
          value={campaign.gameConfig?.jackpot?.reels || 3}
          onChange={(e) => handleJackpotChange('reels', parseInt(e.target.value))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
        >
          <option value={3}>3 rouleaux</option>
          <option value={4}>4 rouleaux</option>
          <option value={5}>5 rouleaux</option>
        </select>
      </div>

      {/* Messages */}
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Message de victoire</label>
          <input
            type="text"
            value={campaign.gameConfig?.jackpot?.winMessage || 'JACKPOT ! Vous avez gagné !'}
            onChange={(e) => handleJackpotChange('winMessage', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Message de défaite</label>
          <input
            type="text"
            value={campaign.gameConfig?.jackpot?.loseMessage || 'Dommage, pas de jackpot !'}
            onChange={(e) => handleJackpotChange('loseMessage', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
          />
        </div>
      </div>

      {/* Gain instantané */}
      <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="instantWin"
            checked={campaign.gameConfig?.jackpot?.instantWin?.enabled || false}
            onChange={(e) => handleInstantWinChange('enabled', e.target.checked)}
            className="rounded border-gray-300 text-[#841b60] focus:ring-[#841b60]"
          />
          <label htmlFor="instantWin" className="flex items-center text-sm font-medium text-gray-700">
            <Target className="w-4 h-4 mr-1" />
            Activer le gain instantané
          </label>
        </div>

        {campaign.gameConfig?.jackpot?.instantWin?.enabled && (
          <div className="space-y-3">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Probabilité de gain ({(campaign.gameConfig?.jackpot?.instantWin?.winProbability || 0.05) * 100}%)
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={campaign.gameConfig?.jackpot?.instantWin?.winProbability || 0.05}
                onChange={(e) => handleInstantWinChange('winProbability', parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Nombre maximum de gagnants (optionnel)</label>
              <input
                type="number"
                value={campaign.gameConfig?.jackpot?.instantWin?.maxWinners || ''}
                onChange={(e) => handleInstantWinChange('maxWinners', e.target.value ? parseInt(e.target.value) : undefined)}
                placeholder="Illimité"
                min="1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JackpotGameConfig;
