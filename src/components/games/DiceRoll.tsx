import React, { useState } from 'react';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from 'lucide-react';

const DiceRoll: React.FC = () => {
  const [currentDice, setCurrentDice] = useState(1);
  const [isRolling, setIsRolling] = useState(false);

  const diceIcons = {
    1: <Dice1 className="w-24 h-24" />,
    2: <Dice2 className="w-24 h-24" />,
    3: <Dice3 className="w-24 h-24" />,
    4: <Dice4 className="w-24 h-24" />,
    5: <Dice5 className="w-24 h-24" />,
    6: <Dice6 className="w-24 h-24" />
  };

  const rollDice = () => {
    if (isRolling) return;
    
    setIsRolling(true);
    
    // Animate the dice roll
    let rolls = 0;
    const maxRolls = 10;
    const rollInterval = setInterval(() => {
      setCurrentDice(Math.floor(Math.random() * 6) + 1);
      rolls++;
      
      if (rolls >= maxRolls) {
        clearInterval(rollInterval);
        setIsRolling(false);
      }
    }, 100);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-lg">
      <div className={`mb-6 transition-transform ${isRolling ? 'animate-bounce' : ''}`}>
        {diceIcons[currentDice]}
      </div>
      <button
        onClick={rollDice}
        disabled={isRolling}
        className={`px-6 py-2 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 transition-colors
          ${isRolling ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isRolling ? 'Rolling...' : 'Roll Dice'}
      </button>
    </div>
  );
};

export default DiceRoll;

export { DiceRoll }