
import { useState, useEffect, useCallback } from 'react';
import { TargetGameProps } from '../../types/componentInterfaces';

const TargetShoot: React.FC<TargetGameProps> = ({ 
  targets = 5, 
  speed = 1000, 
  colors = { primary: '#841b60', secondary: '#6d1750', text: '#ffffff' } 
}) => {
  const [activeTargets, setActiveTargets] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [misses, setMisses] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30); // 30 second game

  // Create an array of possible target positions
  const targetPositions = Array.from({ length: 9 }, (_, i) => i);

  const startGame = () => {
    setScore(0);
    setMisses(0);
    setGameActive(true);
    setGameOver(false);
    setTimeLeft(30);
  };

  // Show a random target
  const showRandomTarget = useCallback(() => {
    if (!gameActive) return;
    
    // Remove current targets
    setActiveTargets([]);
    
    // After a small delay, show new targets
    setTimeout(() => {
      if (!gameActive) return;
      
      // Select random positions for targets
      const newTargets = [];
      const availablePositions = [...targetPositions];
      
      for (let i = 0; i < Math.min(targets, availablePositions.length); i++) {
        const randomIndex = Math.floor(Math.random() * availablePositions.length);
        newTargets.push(availablePositions[randomIndex]);
        availablePositions.splice(randomIndex, 1);
      }
      
      setActiveTargets(newTargets);
    }, 300);
  }, [gameActive, targets]);

  // Handle target click
  const hitTarget = (targetIndex: number) => {
    if (activeTargets.includes(targetIndex)) {
      setScore(prev => prev + 1);
      setActiveTargets(prev => prev.filter(t => t !== targetIndex));
      
      // If all targets hit, show new ones
      if (activeTargets.length === 1) {
        showRandomTarget();
      }
    }
  };

  // Handle background click (miss)
  const handleBackgroundClick = (e: React.MouseEvent) => {
    // Only count as miss if we clicked the background directly
    if ((e.target as HTMLElement).classList.contains('target-game-area')) {
      setMisses(prev => prev + 1);
    }
  };

  // Show targets at regular intervals
  useEffect(() => {
    if (!gameActive) return;
    
    showRandomTarget();
    const interval = setInterval(showRandomTarget, speed);
    
    return () => clearInterval(interval);
  }, [gameActive, showRandomTarget, speed]);

  // Game timer
  useEffect(() => {
    if (!gameActive) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameActive(false);
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [gameActive]);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {!gameActive && !gameOver ? (
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: colors.text }}>
            Cible à abattre
          </h2>
          <p className="mb-6" style={{ color: colors.text }}>
            Cliquez sur les cibles aussi vite que possible!
          </p>
          <button 
            className="px-6 py-3 rounded-lg text-white font-bold transition-transform transform hover:scale-105"
            style={{ backgroundColor: colors.primary }}
            onClick={startGame}
          >
            Commencer le jeu
          </button>
        </div>
      ) : (
        <>
          <div className="flex justify-between w-full max-w-md mb-4">
            <div className="text-lg font-bold" style={{ color: colors.text }}>
              Score: {score}
            </div>
            <div className="text-lg font-bold" style={{ color: colors.text }}>
              Temps: {timeLeft}s
            </div>
            <div className="text-lg font-bold" style={{ color: colors.text }}>
              Manqués: {misses}
            </div>
          </div>
          
          <div 
            className="w-full max-w-md aspect-square grid grid-cols-3 grid-rows-3 gap-2 bg-black bg-opacity-30 rounded-lg p-2 target-game-area"
            onClick={handleBackgroundClick}
          >
            {targetPositions.map(pos => (
              <div 
                key={pos} 
                className="relative flex items-center justify-center"
              >
                {activeTargets.includes(pos) && (
                  <button
                    className="absolute w-4/5 h-4/5 rounded-full transition-transform transform hover:scale-95 active:scale-90 target"
                    style={{ 
                      background: `radial-gradient(circle, ${colors.primary}, ${colors.secondary})`,
                      boxShadow: `0 0 10px ${colors.secondary}`
                    }}
                    onClick={() => hitTarget(pos)}
                  >
                    <div className="absolute inset-1/4 rounded-full border-2 border-white opacity-80"></div>
                    <div className="absolute inset-2/5 rounded-full border-2 border-white opacity-60"></div>
                  </button>
                )}
              </div>
            ))}
          </div>
        </>
      )}
      
      {gameOver && (
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-bold mb-2" style={{ color: colors.text }}>
            Partie terminée!
          </h2>
          <p className="text-xl mb-4" style={{ color: colors.text }}>
            Score final: {score}
          </p>
          <button 
            className="px-6 py-3 rounded-lg text-white font-bold transition-transform transform hover:scale-105"
            style={{ backgroundColor: colors.primary }}
            onClick={startGame}
          >
            Rejouer
          </button>
        </div>
      )}
    </div>
  );
};

export default TargetShoot;
