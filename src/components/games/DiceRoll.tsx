
import React, { useState, useCallback } from 'react';
import { DiceRollProps } from '../../types';

const DiceRoll: React.FC<DiceRollProps> = ({ sides, style, colors }) => {
  const [currentValue, setCurrentValue] = useState(Math.floor(Math.random() * sides) + 1);
  const [rolling, setRolling] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);

  const rollDice = useCallback(() => {
    if (rolling) return;
    
    setRolling(true);
    setShowCongrats(false);

    // Simulate rolling animation by changing numbers rapidly
    let iterations = 0;
    const maxIterations = 10; // Number of "rolls" before stopping
    
    const roll = () => {
      setCurrentValue(Math.floor(Math.random() * sides) + 1);
      iterations++;
      
      if (iterations < maxIterations) {
        setTimeout(roll, 100);
      } else {
        const finalValue = Math.floor(Math.random() * sides) + 1;
        setCurrentValue(finalValue);
        setRolling(false);
        setShowCongrats(true);
      }
    };
    
    roll();
  }, [rolling, sides]);

  let diceStyle = {};
  
  switch (style) {
    case 'classic':
      diceStyle = {
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
      };
      break;
    case 'round':
      diceStyle = {
        borderRadius: '50%',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
      };
      break;
    case 'flat':
      diceStyle = {
        borderRadius: '4px',
        boxShadow: 'none',
        border: '1px solid rgba(0, 0, 0, 0.1)'
      };
      break;
    default:
      diceStyle = {
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
      };
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold mb-2" style={{ color: colors.text }}>
          Roll the Dice
        </h2>
        <p className="text-lg" style={{ color: colors.text }}>
          Click the dice to try your luck!
        </p>
      </div>
      
      <div 
        className={`w-32 h-32 flex items-center justify-center text-4xl font-bold mb-6 cursor-pointer transition-all duration-300 ${rolling ? 'animate-bounce' : ''}`}
        style={{ 
          backgroundColor: colors.primary,
          color: colors.text,
          ...diceStyle
        }}
        onClick={rollDice}
      >
        {currentValue}
      </div>
      
      <button
        className="px-6 py-3 text-lg font-medium rounded-lg transition-colors"
        style={{ 
          backgroundColor: colors.secondary,
          color: colors.text
        }}
        onClick={rollDice}
        disabled={rolling}
      >
        {rolling ? 'Rolling...' : 'Roll Dice'}
      </button>
      
      {showCongrats && (
        <div className="mt-6 text-center">
          <h3 className="text-xl font-bold" style={{ color: colors.text }}>
            You rolled a {currentValue}!
          </h3>
          <p className="mt-2" style={{ color: colors.text }}>
            {currentValue > sides / 2 ? 'Great roll!' : 'Better luck next time!'}
          </p>
        </div>
      )}

      <style>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        .animate-bounce {
          animation: bounce 0.5s infinite;
        }
      `}</style>
    </div>
  );
};

export default DiceRoll;
