
import React, { useState, useRef, useEffect } from 'react';
import { WheelOfFortuneProps } from '../../types';

const WheelOfFortune: React.FC<WheelOfFortuneProps> = ({ 
  segments = [],
  colors = { primary: '#841b60', secondary: '#6d1750', text: '#ffffff' },
  backgroundImage
}) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  
  // Normalize segments to ensure they have all required properties
  const normalizedSegments = segments.map(segment => ({
    text: segment.text || '',
    color: segment.color || colors.primary,
    probability: segment.probability || 1
  }));
  
  // Draw the wheel
  useEffect(() => {
    if (!canvasRef.current || normalizedSegments.length === 0) return;
    
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    
    const canvas = canvasRef.current;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) * 0.9;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw segments
    const totalSegments = normalizedSegments.length;
    let startAngle = 0;
    const arcSize = (2 * Math.PI) / totalSegments;
    
    normalizedSegments.forEach((segment, index) => {
      const endAngle = startAngle + arcSize;
      
      // Draw segment
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle, false);
      ctx.closePath();
      ctx.fillStyle = index % 2 === 0 ? segment.color : colors.secondary;
      ctx.fill();
      ctx.stroke();
      
      // Draw text
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + arcSize / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = colors.text;
      ctx.font = 'bold 16px Arial';
      ctx.fillText(segment.text, radius * 0.85, 5);
      ctx.restore();
      
      startAngle = endAngle;
    });
    
    // Draw center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.1, 0, 2 * Math.PI, false);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.stroke();
    
  }, [normalizedSegments, colors]);
  
  const spinWheel = () => {
    if (isSpinning || normalizedSegments.length === 0) return;
    
    setIsSpinning(true);
    setWinner(null);
    
    // Calculate a winner based on probabilities
    const totalProbability = normalizedSegments.reduce(
      (sum, segment) => sum + (segment.probability || 1), 0
    );
    
    let random = Math.random() * totalProbability;
    let winnerIndex = 0;
    
    for (let i = 0; i < normalizedSegments.length; i++) {
      random -= (normalizedSegments[i].probability || 1);
      if (random <= 0) {
        winnerIndex = i;
        break;
      }
    }
    
    // Calculate rotation angle
    const segmentAngle = 360 / normalizedSegments.length;
    const extraSpins = 3; // Number of full rotations
    const destinationAngle = -(winnerIndex * segmentAngle + 
      segmentAngle / 2 + // Point to middle of segment
      360 * extraSpins + // Add extra spins
      Math.random() * 20 - 10); // Add some randomness
    
    // Apply animation
    if (wheelRef.current) {
      wheelRef.current.style.transition = 'transform 4s cubic-bezier(0.1, 0.3, 0.1, 1)';
      wheelRef.current.style.transform = `rotate(${destinationAngle}deg)`;
      
      // After animation completes
      setTimeout(() => {
        setIsSpinning(false);
        setWinner(normalizedSegments[winnerIndex].text);
      }, 4000);
    }
  };
  
  return (
    <div 
      className="flex flex-col items-center justify-center p-4 rounded-lg bg-white shadow"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="relative w-80 h-80 mb-6">
        {/* Wheel */}
        <div 
          ref={wheelRef} 
          className="absolute inset-0 w-full h-full"
        >
          <canvas ref={canvasRef} width={320} height={320} className="w-full h-full" />
        </div>
        
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -mt-2 z-10">
          <div
            className="w-6 h-10 bg-red-600"
            style={{
              clipPath: 'polygon(50% 100%, 0 0, 100% 0)'
            }}
          ></div>
        </div>
      </div>
      
      <button
        className="px-6 py-2 rounded text-white font-medium transition-all disabled:opacity-50"
        style={{ backgroundColor: isSpinning ? '#999' : colors.primary }}
        onClick={spinWheel}
        disabled={isSpinning}
      >
        {isSpinning ? 'Spinning...' : 'Spin the Wheel'}
      </button>
      
      {winner && (
        <div className="mt-4 text-center">
          <p className="text-lg font-bold">Winner: <span className="text-primary">{winner}</span></p>
        </div>
      )}
    </div>
  );
};

export default WheelOfFortune;
