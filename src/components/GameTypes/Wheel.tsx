
import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';

interface WheelProps {
  segments?: string[];
  colors?: string[];
  onSpinComplete?: (segment: string) => void;
  onSpinEnd?: (segment: string) => void;
  onConfigChange?: (config: { segments: string[]; colors: string[] }) => void;
  config?: {
    segments: string[];
    colors: string[];
  };
}

const Wheel: React.FC<WheelProps> = ({
  segments = ['Prix 1', 'Prix 2', 'Prix 3', 'Réessayez'],
  colors = ['#E57373', '#81C784', '#64B5F6', '#FFD54F', '#BA68C8', '#4FC3F7', '#FFB74D', '#AED581'],
  onSpinComplete,
  onSpinEnd,
  config,
  onConfigChange
}) => {
  const wheelSegments = config?.segments || segments;
  const wheelColors = config?.colors || colors;
  
  // Effect to notify parent component of any configuration changes
  useEffect(() => {
    // Only call onConfigChange if the configuration has been updated and onConfigChange exists
    if (config === undefined && onConfigChange) {
      onConfigChange({ segments: wheelSegments, colors: wheelColors });
    }
  }, [config, onConfigChange, wheelSegments, wheelColors]);
  
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  
  const spinDuration = 5000; // 5 secondes de rotation
  const spinRevolutions = 5; // Nombre de tours complets
  
  // Animation de rotation avec easing
  useEffect(() => {
    if (!spinning) return;
    
    const startTime = Date.now();
    const startRotation = rotation;
    
    // Calculer à l'avance le segment gagnant
    const segmentIndex = Math.floor(Math.random() * wheelSegments.length);
    const segmentSize = 360 / wheelSegments.length;
    
    // Calculer l'angle final pour que le segment gagnant s'arrête en bas
    const segmentOffset = segmentSize * segmentIndex;
    const endPosition = 360 * spinRevolutions + segmentOffset;
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / spinDuration, 1);
      
      // Easing function: cubique pour ralentir à la fin
      const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
      const currentRotation = startRotation + easeOut(progress) * endPosition;
      
      setRotation(currentRotation);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setSpinning(false);
        const winner = wheelSegments[segmentIndex];
        setSelectedSegment(winner);
        
        // Lancer les confettis pour une récompense
        if (winner && winner !== 'Réessayez' && wheelRef.current) {
          const rect = wheelRef.current.getBoundingClientRect();
          const x = (rect.left + rect.right) / 2 / window.innerWidth;
          const y = (rect.top + rect.bottom) / 2 / window.innerHeight;
          
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { x, y: y - 0.1 }
          });
        }
        
        if (onSpinComplete) {
          onSpinComplete(winner);
        }
        
        if (onSpinEnd) {
          onSpinEnd(winner);
        }
      }
    };
    
    requestAnimationFrame(animate);
  }, [spinning, rotation, wheelSegments, onSpinComplete, onSpinEnd, spinRevolutions]);
  
  const handleSpin = () => {
    if (!spinning) {
      setSpinning(true);
      setSelectedSegment(null);
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div 
        ref={wheelRef}
        className="relative w-72 h-72 md:w-96 md:h-96 my-8"
      >
        {/* Centre de la roue avec flèche */}
        <div className="absolute left-1/2 -top-6 transform -translate-x-1/2 z-10">
          <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[30px] border-t-[#841b60] filter drop-shadow-md"></div>
        </div>
        
        {/* Roue */}
        <div 
          className="absolute inset-0 rounded-full border-8 border-[#841b60] shadow-xl overflow-hidden bg-gradient-to-br from-white to-gray-50"
          style={{ 
            transform: `rotate(${rotation}deg)`,
            transition: spinning ? 'none' : 'transform 0.5s ease-out',
            boxShadow: "0 10px 25px -5px rgba(0,0,0,0.2), 0 10px 10px -5px rgba(0,0,0,0.1), inset 0 -5px 15px rgba(0,0,0,0.1)"
          }}
        >
          {wheelSegments.map((segment, index) => {
            const angle = 360 / wheelSegments.length;
            const rotate = angle * index;
            const skew = 90 - angle;
            
            return (
              <div
                key={index}
                className="absolute top-0 right-0 w-1/2 h-1/2 origin-top-left overflow-hidden"
                style={{ 
                  transform: `rotate(${rotate}deg) skew(${skew}deg)`,
                }}
              >
                <div 
                  className="w-[200%] h-[200%] overflow-hidden flex items-center justify-center"
                  style={{ 
                    backgroundColor: wheelColors[index % wheelColors.length],
                    transform: `skew(${-skew}deg) rotate(${angle / 2}deg)`,
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                  }}
                >
                  <span 
                    className="font-bold text-white text-center block transform rotate-90 whitespace-nowrap px-2 py-1"
                    style={{ 
                      textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                      transform: `translate(-25%, 0) rotate(${90 - angle * index - angle/2}deg)`,
                      filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))'
                    }}
                  >
                    {segment}
                  </span>
                </div>
              </div>
            );
          })}
          
          {/* Centre de la roue */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 bg-white rounded-full shadow-inner border-4 border-[#841b60] z-10 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#841b60] to-[#a02475]"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bouton et résultat */}
      <div className="text-center mt-6">
        <button
          onClick={handleSpin}
          disabled={spinning}
          className="px-8 py-4 bg-[#841b60] text-white font-semibold rounded-full disabled:bg-gray-400 hover:bg-[#6d164f] transition-all duration-300 shadow-lg transform hover:scale-105 disabled:transform-none text-lg"
        >
          {spinning ? 'La roue tourne...' : 'Faire tourner la roue'}
        </button>
        
        {selectedSegment && (
          <div className="mt-6 py-4 px-6 bg-white shadow-lg rounded-lg border border-gray-100 animate-fade-in">
            <p className="text-xl font-medium">
              Résultat : <span className="text-[#841b60] font-bold">{selectedSegment}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wheel;
