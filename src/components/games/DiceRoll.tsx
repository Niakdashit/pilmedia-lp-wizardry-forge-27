
import React, { useState, useRef } from 'react';
import { DiceRollProps } from '../../types';

const DiceRoll: React.FC<DiceRollProps> = ({ sides = 6, style = 'classic', colors }) => {
  const [result, setResult] = useState<number | null>(null);
  const [rolling, setRolling] = useState(false);
  const diceRef = useRef<HTMLDivElement>(null);
  
  const rollDice = () => {
    if (rolling) return;
    
    setRolling(true);
    
    // Animate the dice
    if (diceRef.current) {
      diceRef.current.classList.add('animate-spin');
    }
    
    // Random roll between 10-20 iterations
    let iterations = 10 + Math.floor(Math.random() * 10);
    let currentIteration = 0;
    
    const rollInterval = setInterval(() => {
      const randomResult = Math.floor(Math.random() * sides) + 1;
      setResult(randomResult);
      
      currentIteration++;
      if (currentIteration >= iterations) {
        clearInterval(rollInterval);
        
        // Stop animation
        if (diceRef.current) {
          diceRef.current.classList.remove('animate-spin');
        }
        
        setRolling(false);
      }
    }, 100);
  };
  
  const renderDiceFace = () => {
    if (!result) return null;
    
    switch (style) {
      case 'classic':
        return <ClassicDiceFace value={result} sides={sides} />;
      case 'modern':
        return <ModernDiceFace value={result} />;
      default:
        return <NumberDiceFace value={result} />;
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center p-8 rounded-lg bg-white shadow">
      <div 
        ref={diceRef}
        className={`
          w-24 h-24 rounded-lg shadow-lg flex items-center justify-center mb-6
          ${rolling ? 'animate-bounce' : ''}
        `}
        style={{ 
          backgroundColor: colors?.primary || '#841b60',
          color: colors?.text || 'white'
        }}
      >
        {renderDiceFace()}
      </div>
      
      <button
        className="px-6 py-2 rounded text-white font-medium transition-all"
        style={{ backgroundColor: colors?.secondary || '#6d1750' }}
        onClick={rollDice}
        disabled={rolling}
      >
        {rolling ? 'Rolling...' : 'Roll Dice'}
      </button>

      <style>{`
        .animate-spin {
          animation: spin 0.75s ease-in-out;
        }
        
        @keyframes spin {
          0% { transform: rotateZ(0deg); }
          25% { transform: rotateZ(90deg); }
          50% { transform: rotateZ(180deg); }
          75% { transform: rotateZ(270deg); }
          100% { transform: rotateZ(360deg); }
        }
      `}</style>
    </div>
  );
};

// Dice face components
const ClassicDiceFace: React.FC<{value: number, sides: number}> = ({value, sides}) => {
  // For standard 6-sided dice
  if (sides === 6) {
    const diceFaces: Record<number, JSX.Element> = {
      1: (
        <div className="grid place-items-center h-full w-full">
          <span className="w-4 h-4 bg-white rounded-full"></span>
        </div>
      ),
      2: (
        <div className="grid grid-cols-2 p-2 h-full w-full">
          <span className="w-3 h-3 bg-white rounded-full justify-self-end"></span>
          <span className="w-3 h-3 bg-white rounded-full justify-self-start self-end"></span>
        </div>
      ),
      3: (
        <div className="grid grid-cols-3 grid-rows-3 h-full w-full p-2">
          <span className="w-2 h-2 bg-white rounded-full col-start-3 row-start-1"></span>
          <span className="w-2 h-2 bg-white rounded-full col-start-2 row-start-2"></span>
          <span className="w-2 h-2 bg-white rounded-full col-start-1 row-start-3"></span>
        </div>
      ),
      4: (
        <div className="grid grid-cols-2 grid-rows-2 gap-2 p-3 h-full w-full">
          <span className="w-3 h-3 bg-white rounded-full"></span>
          <span className="w-3 h-3 bg-white rounded-full"></span>
          <span className="w-3 h-3 bg-white rounded-full"></span>
          <span className="w-3 h-3 bg-white rounded-full"></span>
        </div>
      ),
      5: (
        <div className="grid grid-cols-3 grid-rows-3 h-full w-full p-2">
          <span className="w-2 h-2 bg-white rounded-full col-start-1 row-start-1"></span>
          <span className="w-2 h-2 bg-white rounded-full col-start-3 row-start-1"></span>
          <span className="w-2 h-2 bg-white rounded-full col-start-2 row-start-2"></span>
          <span className="w-2 h-2 bg-white rounded-full col-start-1 row-start-3"></span>
          <span className="w-2 h-2 bg-white rounded-full col-start-3 row-start-3"></span>
        </div>
      ),
      6: (
        <div className="grid grid-cols-2 grid-rows-3 gap-1 p-3 h-full w-full">
          <span className="w-2 h-2 bg-white rounded-full"></span>
          <span className="w-2 h-2 bg-white rounded-full"></span>
          <span className="w-2 h-2 bg-white rounded-full"></span>
          <span className="w-2 h-2 bg-white rounded-full"></span>
          <span className="w-2 h-2 bg-white rounded-full"></span>
          <span className="w-2 h-2 bg-white rounded-full"></span>
        </div>
      )
    };
    // Type assertion to fix the index signature issue
    return diceFaces[value as keyof typeof diceFaces] || <NumberDiceFace value={value} />;
  }
  
  // For other sided dice, use numbers
  return <NumberDiceFace value={value} />;
};

const ModernDiceFace: React.FC<{value: number}> = ({value}) => {
  return (
    <div className="grid place-items-center h-full w-full text-3xl font-extrabold">
      {value}
    </div>
  );
};

const NumberDiceFace: React.FC<{value: number}> = ({value}) => {
  return (
    <div className="grid place-items-center h-full w-full text-2xl font-bold">
      {value}
    </div>
  );
};

export default DiceRoll;
