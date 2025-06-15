
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Settings, Palette, Trophy } from 'lucide-react';

const GameStep: React.FC = () => {
  const [gameSettings, setGameSettings] = useState({
    type: 'wheel',
    difficulty: 'medium',
    prizes: ['Prix 1', 'Prix 2', 'Prix 3'],
    winProbability: 30,
    maxAttempts: 3
  });

  const gameTypes = [
    { id: 'wheel', name: 'Roue de la fortune', icon: '🎯' },
    { id: 'quiz', name: 'Quiz', icon: '❓' },
    { id: 'scratch', name: 'Carte à gratter', icon: '🎫' },
    { id: 'jackpot', name: 'Jackpot', icon: '🎰' }
  ];

  const difficulties = [
    { id: 'easy', name: 'Facile', description: 'Taux de victoire élevé' },
    { id: 'medium', name: 'Moyen', description: 'Taux de victoire modéré' },
    { id: 'hard', name: 'Difficile', description: 'Taux de victoire faible' }
  ];

  const updateSetting = (key: string, value: any) => {
    setGameSettings(prev => ({ ...prev, [key]: value }));
  };

  const addPrize = () => {
    const newPrize = `Nouveau prix ${gameSettings.prizes.length + 1}`;
    updateSetting('prizes', [...gameSettings.prizes, newPrize]);
  };

  const removePrize = (index: number) => {
    const newPrizes = gameSettings.prizes.filter((_, i) => i !== index);
    updateSetting('prizes', newPrizes);
  };

  const updatePrize = (index: number, value: string) => {
    const newPrizes = gameSettings.prizes.map((prize, i) => 
      i === index ? value : prize
    );
    updateSetting('prizes', newPrizes);
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-[#841b60]/20 pb-2 flex items-center">
          <Gamepad2 className="w-6 h-6 mr-2 text-[#841b60]" />
          Configuration du jeu
        </h2>

        <div className="space-y-8">
          {/* Type de jeu */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Settings className="w-5 h-5 mr-2 text-[#841b60]" />
              Type de jeu
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {gameTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => updateSetting('type', type.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    gameSettings.type === type.id
                      ? 'border-[#841b60] bg-[#841b60]/10'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-2">{type.icon}</div>
                  <div className="text-sm font-medium">{type.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Difficulté */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Difficulté</h3>
            <div className="space-y-3">
              {difficulties.map((diff) => (
                <label key={diff.id} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="difficulty"
                    value={diff.id}
                    checked={gameSettings.difficulty === diff.id}
                    onChange={(e) => updateSetting('difficulty', e.target.value)}
                    className="text-[#841b60] focus:ring-[#841b60]"
                  />
                  <div>
                    <div className="font-medium">{diff.name}</div>
                    <div className="text-sm text-gray-600">{diff.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Prix */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-[#841b60]" />
              Prix disponibles
            </h3>
            <div className="space-y-3">
              {gameSettings.prizes.map((prize, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={prize}
                    onChange={(e) => updatePrize(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
                  />
                  <button
                    onClick={() => removePrize(index)}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    Supprimer
                  </button>
                </div>
              ))}
              <button
                onClick={addPrize}
                className="px-4 py-2 bg-[#841b60] text-white rounded-lg hover:bg-[#6d164f] transition-colors"
              >
                Ajouter un prix
              </button>
            </div>
          </div>

          {/* Paramètres avancés */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Paramètres avancés</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Probabilité de victoire (%)
                </label>
                <input
                  type="range"
                  min="10"
                  max="90"
                  value={gameSettings.winProbability}
                  onChange={(e) => updateSetting('winProbability', parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="text-sm text-gray-600 mt-1">{gameSettings.winProbability}%</div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre d'essais maximum
                </label>
                <select
                  value={gameSettings.maxAttempts}
                  onChange={(e) => updateSetting('maxAttempts', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
                >
                  <option value={1}>1 essai</option>
                  <option value={3}>3 essais</option>
                  <option value={5}>5 essais</option>
                  <option value={-1}>Illimité</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default GameStep;
