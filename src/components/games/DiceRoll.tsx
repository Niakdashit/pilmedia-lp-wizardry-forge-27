
import React, { useState } from 'react';
import { DiceGameProps } from '../../types/componentInterfaces';

const DiceRoll: React.FC<DiceGameProps> = ({ sides = 6, style = 'classic', colors, onComplete }) => {
  const [currentValue, setCurrentValue] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const [rolls, setRolls] = useState(0);
  const maxRolls = 5;

  const rollDice = () => {
    if (isRolling || rolls >= maxRolls) return;
    
    setIsRolling(true);
    
    // Animate the dice roll
    let rollCount = 0;
    const maxRollCount = 10;
    const rollInterval = setInterval(() => {
      setCurrentValue(Math.floor(Math.random() * sides) + 1);
      rollCount++;
      
      if (rollCount >= maxRollCount) {
        clearInterval(rollInterval);
        setIsRolling(false);
        setRolls(prevRolls => {
          const newRolls = prevRolls + 1;
          if (newRolls >= maxRolls && onComplete) {
            onComplete();
          }
          return newRolls;
        });
      }
    }, 100);
  };

  const renderDiceFace = (value: number) => {
    if (style === 'modern') {
      return (
        <div className="flex items-center justify-center h-full w-full text-3xl font-bold">
          {value}
        </div>
      );
    }
    
    // Classic dice style with dots
    const dotPositions: Record<number, JSX.Element> = {
      1: (
        <div className="flex items-center justify-center h-full">
          <div className="h-3 w-3 bg-black rounded-full" />
        </div>
      ),
      2: (
        <div className="grid grid-cols-2 h-full">
          <div className="flex items-start justify-start p-2">
            <div className="h-3 w-3 bg-black rounded-full" />
          </div>
          <div className="flex items-end justify-end p-2">
            <div className="h-3 w-3 bg-black rounded-full" />
          </div>
        </div>
      ),
      3: (
        <div className="grid grid-cols-3 grid-rows-3 h-full">
          <div className="flex items-start justify-start p-2">
            <div className="h-3 w-3 bg-black rounded-full" />
          </div>
          <div className="flex items-center justify-center">
            <div className="h-3 w-3 bg-black rounded-full" />
          </div>
          <div className="flex items-end justify-end p-2">
            <div className="h-3 w-3 bg-black rounded-full" />
          </div>
        </div>
      ),
      4: (
        <div className="grid grid-cols-2 grid-rows-2 h-full">
          <div className="flex items-start justify-start p-2">
            <div className="h-3 w-3 bg-black rounded-full" />
          </div>
          <div className="flex items-start justify-end p-2">
            <div className="h-3 w-3 bg-black rounded-full" />
          </div>
          <div className="flex items-end justify-start p-2">
            <div className="h-3 w-3 bg-black rounded-full" />
          </div>
          <div className="flex items-end justify-end p-2">
            <div className="h-3 w-3 bg-black rounded-full" />
          </div>
        </div>
      ),
      5: (
        <div className="grid grid-cols-3 grid-rows-3 h-full">
          <div className="flex items-start justify-start p-2">
            <div className="h-3 w-3 bg-black rounded-full" />
          </div>
          <div></div>
          <div className="flex items-start justify-end p-2">
            <div className="h-3 w-3 bg-black rounded-full" />
          </div>
          <div></div>
          <div className="flex items-center justify-center">
            <div className="h-3 w-3 bg-black rounded-full" />
          </div>
          <div></div>
          <div className="flex items-end justify-start p-2">
            <div className="h-3 w-3 bg-black rounded-full" />
          </div>
          <div></div>
          <div className="flex items-end justify-end p-2">
            <div className="h-3 w-3 bg-black rounded-full" />
          </div>
        </div>
      ),
      6: (
        <div className="grid grid-cols-3 grid-rows-3 h-full">
          <div className="flex items-start justify-start p-2">
            <div className="h-3 w-3 bg-black rounded-full" />
          </div>
          <div></div>
          <div className="flex items-start justify-end p-2">
            <div className="h-3 w-3 bg-black rounded-full" />
          </div>
          <div className="flex items-center justify-start p-2">
            <div className="h-3 w-3 bg-black rounded-full" />
          </div>
          <div></div>
          <div className="flex items-center justify-end p-2">
            <div className="h-3 w-3 bg-black rounded-full" />
          </div>
          <div className="flex items-end justify-start p-2">
            <div className="h-3 w-3 bg-black rounded-full" />
          </div>
          <div></div>
          <div className="flex items-end justify-end p-2">
            <div className="h-3 w-3 bg-black rounded-full" />
          </div>
        </div>
      ),
    };
    
    return value <= 6 ? dotPositions[value] : (
      <div className="flex items-center justify-center h-full w-full text-3xl font-bold">
        {value}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2" style={{ color: colors.text || '#000' }}>
          Roll the Dice
        </h2>
        <p className="text-sm" style={{ color: colors.text || '#000' }}>
          Click the button to roll! You have {maxRolls - rolls} rolls left.
        </p>
      </div>
      
      <div 
        className={`dice ${isRolling ? 'rolling' : ''} mb-6`}
        style={{ 
          backgroundColor: colors.secondary || '#f8f8f8',
          borderColor: colors.primary || '#333',
          width: '100px',
          height: '100px',
          perspective: '1000px',
          borderRadius: '10px',
          overflow: 'hidden',
          boxShadow: '0 0 10px rgba(0,0,0,0.2)'
        }}
      >
        {renderDiceFace(currentValue)}
      </div>
      
      <button
        onClick={rollDice}
        disabled={isRolling || rolls >= maxRolls}
        className="px-6 py-2 rounded-lg transition-transform transform hover:scale-105 disabled:opacity-50"
        style={{ backgroundColor: colors.primary || '#841b60', color: '#fff' }}
      >
        {isRolling ? 'Rolling...' : rolls >= maxRolls ? 'No more rolls' : 'Roll Dice'}
      </button>
      
      {rolls >= maxRolls && (
        <div className="mt-4 p-3 rounded text-center" style={{ backgroundColor: colors.secondary || '#f0f0f0', color: colors.text || '#000' }}>
          <p>Game completed! Thanks for playing.</p>
        </div>
      )}
      
      <style jsx>
        {`
          .dice {
            transition: transform 0.5s ease;
          }
          .rolling {
            animation: roll 0.5s ease;
          }
          @keyframes roll {
            0% { transform: rotateX(0deg) rotateY(0deg); }
            25% { transform: rotateX(90deg) rotateY(45deg); }
            50% { transform: rotateX(180deg) rotateY(90deg); }
            75% { transform: rotateX(270deg) rotateY(135deg); }
            100% { transform: rotateX(360deg) rotateY(180deg); }
          }
        `}
      </style>
    </div>
  );
};

export default DiceRoll;
