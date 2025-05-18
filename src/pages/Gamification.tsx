
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Gamepad2, 
  Dices, 
  Target, 
  CircleDot, 
  PuzzleIcon, 
  ScanLine,
  SlidersHorizontal
} from 'lucide-react';

const Gamification = () => {
  const [games] = useState([
    {
      id: '1',
      name: 'Quiz',
      icon: Gamepad2,
      description: 'Engage your audience with a trivia game.',
      type: 'quiz'
    },
    {
      id: '2',
      name: 'Dice Roll',
      icon: Dices,
      description: 'Add excitement with a simple dice rolling game.',
      type: 'dice'
    },
    {
      id: '3',
      name: 'Target Shoot',
      icon: Target,
      description: 'Test accuracy with a target shooting game.',
      type: 'target'
    },
    {
      id: '4',
      name: 'Wheel of Fortune',
      icon: CircleDot,
      description: 'Let fate decide with a spinning wheel game.',
      type: 'wheel'
    },
    {
      id: '5',
      name: 'Puzzle',
      icon: PuzzleIcon,
      description: 'Challenge minds with a classic puzzle game.',
      type: 'puzzle'
    },
    {
      id: '6',
      name: 'Scratch Card',
      icon: ScanLine,
      description: 'Offer instant wins with a scratch card game.',
      type: 'scratch'
    },
    {
      id: '7',
      name: 'Memory Game',
      icon: SlidersHorizontal,
      description: 'Improve memory with a card matching game.',
      type: 'memory'
    },
  ]);

  return (
    <div className="p-6">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Gamification</h1>
        <p className="text-gray-600">Add interactive games to your campaigns.</p>
      </header>

      <section className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Available Games</h2>
          <Link
            to="/dashboard/gamification/editor"
            className="text-sm text-[#841b60] hover:text-[#6d1750] font-medium"
          >
            Create New
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {games.map((game) => (
            <div key={game.id} className="bg-white p-6 rounded-lg shadow-sm hover:shadow transition-shadow">
              <div className="text-gray-900 font-medium mb-2 flex items-center space-x-2">
                <game.icon className="w-5 h-5" />
                <span>{game.name}</span>
              </div>
              <p className="text-gray-600 text-sm">{game.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Gamification;
