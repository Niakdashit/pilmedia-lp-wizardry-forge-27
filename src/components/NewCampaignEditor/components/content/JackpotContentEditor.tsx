
import React from 'react';
import { Dices, Settings } from 'lucide-react';

interface JackpotContentEditorProps {
  campaign: any;
  setCampaign: React.Dispatch<React.SetStateAction<any>>;
}

const JackpotContentEditor: React.FC<JackpotContentEditorProps> = ({ campaign, setCampaign }) => {
  const config = campaign.gameConfig?.jackpot || {};

  const handleConfigChange = (field: string, value: any) => {
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

  const symbolOptions = ['🍒', '🍋', '🍊', '🍀', '7️⃣', '💎', '⭐', '🔔', '💰', '🎰'];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        {/* Configuration des symboles */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Dices className="w-5 h-5 mr-2" />
            Symboles
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Symboles disponibles
              </label>
              <div className="grid grid-cols-5 gap-2">
                {symbolOptions.map((symbol) => (
                  <button
                    key={symbol}
                    onClick={() => {
                      const currentSymbols = config.symbols || ['🍒', '🍋', '🍊'];
                      const newSymbols = currentSymbols.includes(symbol)
                        ? currentSymbols.filter((s: string) => s !== symbol)
                        : [...currentSymbols, symbol];
                      handleConfigChange('symbols', newSymbols);
                    }}
                    className={`p-3 text-2xl border-2 rounded-lg transition-all ${
                      (config.symbols || ['🍒', '🍋', '🍊']).includes(symbol)
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {symbol}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre de rouleaux
              </label>
              <input
                type="number"
                min="3"
                max="5"
                value={config.reels || 3}
                onChange={(e) => handleConfigChange('reels', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Configuration des gains */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Settings className="w-5 h-5 mr-2" />
            Configuration des gains
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mode de gain instantané
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={config.instantWin?.enabled || false}
                  onChange={(e) => handleConfigChange('instantWin', {
                    ...config.instantWin,
                    enabled: e.target.checked
                  })}
                  className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">Activer le gain instantané</span>
              </div>
            </div>
            
            {config.instantWin?.enabled && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Probabilité de gain (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={(config.instantWin?.winProbability || 0.05) * 100}
                    onChange={(e) => handleConfigChange('instantWin', {
                      ...config.instantWin,
                      winProbability: parseFloat(e.target.value) / 100
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre maximum de gagnants
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={config.instantWin?.maxWinners || ''}
                    onChange={(e) => handleConfigChange('instantWin', {
                      ...config.instantWin,
                      maxWinners: e.target.value ? parseInt(e.target.value) : undefined
                    })}
                    placeholder="Illimité"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Messages de jeu</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message de victoire
            </label>
            <input
              type="text"
              value={config.winMessage || 'JACKPOT ! Vous avez gagné !'}
              onChange={(e) => handleConfigChange('winMessage', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message de défaite
            </label>
            <input
              type="text"
              value={config.loseMessage || 'Dommage, pas de jackpot !'}
              onChange={(e) => handleConfigChange('loseMessage', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JackpotContentEditor;
