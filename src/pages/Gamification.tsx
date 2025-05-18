import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CircleDot, 
  Dice1, 
  Gift, 
  Brain, 
  Target, 
  Puzzle, 
  Gamepad2,
  Search,
  Plus,
  Trash2,
  PenSquare,
  Copy,
  Eye,
  List,
  Grid
} from 'lucide-react';
import { supabase } from '../lib/supabase';

interface GameMechanic {
  id: string;
  type: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'quiz' | 'chance' | 'skill' | 'collection';
}

const mechanics: GameMechanic[] = [
  {
    id: 'wheel-of-fortune',
    type: 'wheel',
    name: 'Roue de la Fortune',
    description: 'Une roue interactive avec des prix à gagner. Parfait pour les tirages au sort et récompenses aléatoires.',
    icon: <CircleDot className="w-8 h-8" />,
    difficulty: 'easy',
    category: 'chance'
  },
  {
    id: 'memory-game',
    type: 'memory',
    name: 'Jeu de Mémoire',
    description: 'Un jeu de cartes mémoire classique. Idéal pour l\'engagement et la mémorisation de produits.',
    icon: <Brain className="w-8 h-8" />,
    difficulty: 'medium',
    category: 'skill'
  },
  {
    id: 'scratch-card',
    type: 'scratch',
    name: 'Carte à Gratter',
    description: 'Cartes virtuelles à gratter pour révéler des prix ou des codes promotionnels.',
    icon: <Gift className="w-8 h-8" />,
    difficulty: 'easy',
    category: 'chance'
  },
  {
    id: 'puzzle-game',
    type: 'puzzle',
    name: 'Puzzle',
    description: 'Puzzles personnalisables avec vos images. Parfait pour les campagnes créatives.',
    icon: <Puzzle className="w-8 h-8" />,
    difficulty: 'hard',
    category: 'skill'
  },
  {
    id: 'dice-roll',
    type: 'dice',
    name: 'Lancer de Dés',
    description: 'Animation de dés en 3D pour des tirages au sort ludiques.',
    icon: <Dice1 className="w-8 h-8" />,
    difficulty: 'easy',
    category: 'chance'
  },
  {
    id: 'target-shoot',
    type: 'target',
    name: 'Tir sur Cible',
    description: 'Jeu de tir sur cible pour tester la précision des utilisateurs.',
    icon: <Target className="w-8 h-8" />,
    difficulty: 'medium',
    category: 'skill'
  }
];

const Gamification: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const filteredMechanics = mechanics.filter(mechanic => {
    const matchesSearch = mechanic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mechanic.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || mechanic.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || mechanic.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const handleMechanicClick = (type: string) => {
    navigate(`/dashboard/gamification/${type}/new`);
  };

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mécaniques de Gamification</h1>
          <p className="text-gray-600 mt-1">Créez des expériences interactives engageantes</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <div className="relative flex-grow md:flex-grow-0">
            <input
              type="text"
              className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
              placeholder="Rechercher une mécanique..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>

          <div className="flex gap-4">
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">Toutes les catégories</option>
              <option value="quiz">Quiz</option>
              <option value="chance">Chance</option>
              <option value="skill">Habileté</option>
              <option value="collection">Collection</option>
            </select>

            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
            >
              <option value="all">Toutes les difficultés</option>
              <option value="easy">Facile</option>
              <option value="medium">Moyen</option>
              <option value="hard">Difficile</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMechanics.map((mechanic) => (
          <motion.div
            key={mechanic.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer transition-all hover:shadow-md"
            onClick={() => handleMechanicClick(mechanic.type)}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-[#841b60] bg-opacity-10 rounded-full flex items-center justify-center text-[#841b60]">
                  {mechanic.icon}
                </div>
                <span className={`text-sm px-3 py-1 rounded-full ${
                  mechanic.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                  mechanic.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {mechanic.difficulty === 'easy' ? 'Facile' :
                   mechanic.difficulty === 'medium' ? 'Moyen' : 'Difficile'}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{mechanic.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{mechanic.description}</p>
              
              <div className="flex items-center justify-between">
                <span className={`text-sm px-3 py-1 rounded-full ${
                  mechanic.category === 'quiz' ? 'bg-blue-100 text-blue-800' :
                  mechanic.category === 'chance' ? 'bg-purple-100 text-purple-800' :
                  mechanic.category === 'skill' ? 'bg-orange-100 text-orange-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {mechanic.category.charAt(0).toUpperCase() + mechanic.category.slice(1)}
                </span>
                <Gamepad2 className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Gamification;
