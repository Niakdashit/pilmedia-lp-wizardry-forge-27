
import React, { useState } from 'react';
import { DiceGameProps } from '../../types/componentInterfaces';

// Type guard function
function isValidDiceFace(face: number): face is 1 | 2 | 3 | 4 | 5 | 6 {
  return face >= 1 && face <= 6;
}

const DiceRoll: React.FC<DiceGameProps> = ({ sides = 6, style = 'classic', colors }) => {
  const [result, setResult] = useState(1);
  const [rolling, setRolling] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const rollDice = () => {
    if (rolling) return;
    
    setRolling(true);
    setShowResult(false);
    
    // Animate the dice roll
    let rollCount = 0;
    const maxRolls = 10;
    const rollInterval = setInterval(() => {
      const randomFace = Math.floor(Math.random() * sides) + 1;
      setResult(randomFace);
      
      rollCount++;
      
      if (rollCount >= maxRolls) {
        clearInterval(rollInterval);
        setRolling(false);
        setShowResult(true);
      }
    }, 100);
  };

  // Define the dice faces
  const diceFaces: Record<1 | 2 | 3 | 4 | 5 | 6, JSX.Element> = {
    1: <div className="dice-dot center"></div>,
    2: (
      <>
        <div className="dice-dot top-left"></div>
        <div className="dice-dot bottom-right"></div>
      </>
    ),
    3: (
      <>
        <div className="dice-dot top-left"></div>
        <div className="dice-dot center"></div>
        <div className="dice-dot bottom-right"></div>
      </>
    ),
    4: (
      <>
        <div className="dice-dot top-left"></div>
        <div className="dice-dot top-right"></div>
        <div className="dice-dot bottom-left"></div>
        <div className="dice-dot bottom-right"></div>
      </>
    ),
    5: (
      <>
        <div className="dice-dot top-left"></div>
        <div className="dice-dot top-right"></div>
        <div className="dice-dot center"></div>
        <div className="dice-dot bottom-left"></div>
        <div className="dice-dot bottom-right"></div>
      </>
    ),
    6: (
      <>
        <div className="dice-dot top-left"></div>
        <div className="dice-dot top-right"></div>
        <div className="dice-dot middle-left"></div>
        <div className="dice-dot middle-right"></div>
        <div className="dice-dot bottom-left"></div>
        <div className="dice-dot bottom-right"></div>
      </>
    )
  };

  const safeFace = isValidDiceFace(result) ? result : 1;

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="mb-8">
        <div 
          className={`dice ${rolling ? 'rolling' : ''} ${style}`}
          style={{ 
            backgroundColor: colors.primary,
            color: colors.text,
            boxShadow: `0 0 10px ${colors.secondary}`
          }}
        >
          {diceFaces[safeFace]}
        </div>
      </div>
      
      <button 
        onClick={rollDice}
        disabled={rolling}
        className="px-6 py-3 rounded-lg text-white font-bold transition-transform transform hover:scale-105 disabled:opacity-50"
        style={{ backgroundColor: colors.secondary }}
      >
        {rolling ? 'Lancer en cours...' : 'Lancer le dé'}
      </button>
      
      {showResult && (
        <div className="mt-4 text-center">
          <p className="text-xl font-bold">Résultat: {result}</p>
        </div>
      )}

      <style jsx>{`
        .dice {
          width: 100px;
          height: 100px;
          border-radius: 10px;
          display: grid;
          grid-template: repeat(3, 1fr) / repeat(3, 1fr);
          padding: 8px;
          transform-style: preserve-3d;
        }
        
        .dice.rolling {
          animation: roll 0.5s infinite;
        }
        
        @keyframes roll {
          0% { transform: rotateX(0deg) rotateY(0deg); }
          25% { transform: rotateX(90deg) rotateY(45deg); }
          50% { transform: rotateX(180deg) rotateY(90deg); }
          75% { transform: rotateX(270deg) rotateY(135deg); }
          100% { transform: rotateX(360deg) rotateY(180deg); }
        }
        
        .dice-dot {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background-color: white;
          place-self: center;
        }
        
        .top-left { grid-area: 1 / 1; }
        .top-right { grid-area: 1 / 3; }
        .middle-left { grid-area: 2 / 1; }
        .center { grid-area: 2 / 2; }
        .middle-right { grid-area: 2 / 3; }
        .bottom-left { grid-area: 3 / 1; }
        .bottom-right { grid-area: 3 / 3; }
        
        .classic {
          background-color: white;
          border: 2px solid #333;
        }
        
        .modern {
          background: linear-gradient(135deg, #6e8efb, #a777e3);
          box-shadow: 0 8px 16px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
};

export default DiceRoll;
