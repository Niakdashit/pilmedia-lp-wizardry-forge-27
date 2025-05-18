
import React, { useState, useEffect } from 'react';

interface DiceRollProps {
  sides: number;
  style: 'classic' | 'modern';
  colors: {
    primary: string;
    secondary: string;
    text: string;
  };
  onComplete?: () => void;
}

const DiceRoll: React.FC<DiceRollProps> = ({ sides = 6, style = 'classic', colors, onComplete }) => {
  const [currentValue, setCurrentValue] = useState(1);
  const [rolling, setRolling] = useState(false);
  const [rollCount, setRollCount] = useState(0);
  const maxRolls = 3;

  const rollDice = () => {
    if (rolling || rollCount >= maxRolls) return;
    
    setRolling(true);
    
    // Random dice rolling animation
    let rollDuration = 0;
    const intervalId = setInterval(() => {
      setCurrentValue(Math.floor(Math.random() * sides) + 1);
      rollDuration += 50;
      
      if (rollDuration >= 1000) {
        clearInterval(intervalId);
        setRolling(false);
        setRollCount(prev => prev + 1);
        
        if (rollCount + 1 >= maxRolls && onComplete) {
          setTimeout(() => {
            onComplete();
          }, 1500);
        }
      }
    }, 50);
  };

  // Create a lookup object for classic dice faces
  const diceFaces = {
    1: (
      <div className="dice-face">
        <span className="dot dot-center"></span>
      </div>
    ),
    2: (
      <div className="dice-face">
        <span className="dot dot-top-left"></span>
        <span className="dot dot-bottom-right"></span>
      </div>
    ),
    3: (
      <div className="dice-face">
        <span className="dot dot-top-left"></span>
        <span className="dot dot-center"></span>
        <span className="dot dot-bottom-right"></span>
      </div>
    ),
    4: (
      <div className="dice-face">
        <span className="dot dot-top-left"></span>
        <span className="dot dot-top-right"></span>
        <span className="dot dot-bottom-left"></span>
        <span className="dot dot-bottom-right"></span>
      </div>
    ),
    5: (
      <div className="dice-face">
        <span className="dot dot-top-left"></span>
        <span className="dot dot-top-right"></span>
        <span className="dot dot-center"></span>
        <span className="dot dot-bottom-left"></span>
        <span className="dot dot-bottom-right"></span>
      </div>
    ),
    6: (
      <div className="dice-face">
        <span className="dot dot-top-left"></span>
        <span className="dot dot-top-right"></span>
        <span className="dot dot-middle-left"></span>
        <span className="dot dot-middle-right"></span>
        <span className="dot dot-bottom-left"></span>
        <span className="dot dot-bottom-right"></span>
      </div>
    )
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6" style={{ color: colors.text }}>
        {rollCount < maxRolls ? "Roll the dice!" : "Game Over!"}
      </h2>
      
      <div 
        className={`mb-8 dice ${rolling ? 'rolling' : ''} ${style === 'modern' ? 'modern' : 'classic'}`}
        style={{ 
          backgroundColor: colors.primary,
          borderColor: colors.secondary,
        }}
        onClick={rollDice}
      >
        {style === 'classic' ? (
          // @ts-ignore - Type safety handled by ensuring currentValue is between 1 and 6
          diceFaces[currentValue]
        ) : (
          <div className="modern-face">
            <span style={{ color: colors.text }}>{currentValue}</span>
          </div>
        )}
      </div>

      <p className="mb-4" style={{ color: colors.text }}>
        Rolls remaining: {maxRolls - rollCount}
      </p>

      <button
        className="px-6 py-2 rounded-lg font-semibold transition-all"
        style={{ 
          backgroundColor: rollCount >= maxRolls ? '#888888' : colors.secondary,
          color: colors.text,
          opacity: rollCount >= maxRolls || rolling ? 0.6 : 1
        }}
        onClick={rollDice}
        disabled={rolling || rollCount >= maxRolls}
      >
        {rolling ? "Rolling..." : "Roll Dice"}
      </button>

      <style>
        {`
          .dice {
            width: 100px;
            height: 100px;
            border-radius: 12px;
            border: 2px solid;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: transform 0.3s ease;
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
          }
          
          .dice.rolling {
            animation: roll 0.5s infinite;
          }
          
          .dice.modern {
            border-radius: 16px;
          }
          
          .dice-face {
            width: 90%;
            height: 90%;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: repeat(3, 1fr);
          }
          
          .dot {
            width: 14px;
            height: 14px;
            background-color: #fff;
            border-radius: 50%;
          }
          
          .dot-center {
            grid-column: 2;
            grid-row: 2;
            justify-self: center;
            align-self: center;
          }
          
          .dot-top-left {
            grid-column: 1;
            grid-row: 1;
            justify-self: center;
            align-self: center;
          }
          
          .dot-top-right {
            grid-column: 3;
            grid-row: 1;
            justify-self: center;
            align-self: center;
          }
          
          .dot-middle-left {
            grid-column: 1;
            grid-row: 2;
            justify-self: center;
            align-self: center;
          }
          
          .dot-middle-right {
            grid-column: 3;
            grid-row: 2;
            justify-self: center;
            align-self: center;
          }
          
          .dot-bottom-left {
            grid-column: 1;
            grid-row: 3;
            justify-self: center;
            align-self: center;
          }
          
          .dot-bottom-right {
            grid-column: 3;
            grid-row: 3;
            justify-self: center;
            align-self: center;
          }
          
          .modern-face {
            font-size: 40px;
            font-weight: bold;
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
