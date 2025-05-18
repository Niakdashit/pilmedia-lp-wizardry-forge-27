
import React, { useState, useRef, useEffect } from 'react';
import { WheelOfFortuneProps } from '../../types';

const WheelOfFortune: React.FC<WheelOfFortuneProps> = ({ segments, colors, backgroundImage }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [spinButtonText, setSpinButtonText] = useState('Spin the Wheel');

  const drawWheel = () => {
    const canvas = canvasRef.current;
    if (!canvas || segments.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;
    const segmentAngle = (2 * Math.PI) / segments.length;

    // Add rotation to the wheel
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(rotation);
    ctx.translate(-centerX, -centerY);

    // Draw segments
    for (let i = 0; i < segments.length; i++) {
      const startAngle = i * segmentAngle;
      const endAngle = (i + 1) * segmentAngle;
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      
      // Use segment color or fallback to primary color
      ctx.fillStyle = segments[i].color || colors.primary;
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#FFFFFF';
      ctx.stroke();
      
      // Add text to each segment
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + segmentAngle / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = colors.text;
      ctx.font = 'bold 14px Arial';
      
      // Limit text length
      let text = segments[i].text;
      if (text.length > 10) {
        text = text.substring(0, 10) + '...';
      }
      
      ctx.fillText(text, radius - 15, 5);
      ctx.restore();
    }

    // Add center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 15, 0, 2 * Math.PI);
    ctx.fillStyle = colors.secondary;
    ctx.fill();
    
    ctx.restore();
  };

  const spinWheel = () => {
    if (spinning) return;
    
    setSpinning(true);
    setWinner(null);
    setSpinButtonText('Spinning...');
    
    // Generate random number of rotations (between 2 and 5 full rotations)
    const spinAmount = 2 * Math.PI * (2 + Math.random() * 3);
    const spinTime = 3000; // 3 seconds
    const startTime = Date.now();
    const startRotation = rotation;
    
    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      
      if (elapsed < spinTime) {
        // Easing function to slow down gradually
        const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
        const progress = easeOut(elapsed / spinTime);
        setRotation(startRotation + progress * spinAmount);
        requestAnimationFrame(animate);
      } else {
        // Spinning complete
        const finalRotation = startRotation + spinAmount;
        setRotation(finalRotation);
        
        // Determine winner
        const normalizedRotation = finalRotation % (2 * Math.PI);
        const segmentAngle = (2 * Math.PI) / segments.length;
        const winningSegment = Math.floor(segments.length - (normalizedRotation / segmentAngle)) % segments.length;
        setWinner(segments[winningSegment].text);
        setSpinning(false);
        setSpinButtonText('Spin Again');
      }
    };
    
    animate();
  };

  // Draw wheel whenever rotation changes
  useEffect(() => {
    drawWheel();
  }, [rotation, segments]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4">
      <div 
        className="relative w-full"
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="relative w-64 h-64 mx-auto">
          <canvas ref={canvasRef} width={320} height={320} className="w-full h-full" />
          {/* Pointer */}
          <div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/3 w-0 h-0"
            style={{
              borderLeft: '10px solid transparent',
              borderRight: '10px solid transparent',
              borderTop: `20px solid ${colors.secondary}`,
              zIndex: 10
            }}
          />
        </div>
      </div>
      
      <button
        className="mt-6 px-6 py-3 text-lg font-medium rounded-lg transition-colors"
        style={{ 
          backgroundColor: colors.secondary,
          color: colors.text
        }}
        onClick={spinWheel}
        disabled={spinning}
      >
        {spinButtonText}
      </button>
      
      {winner && (
        <div className="mt-6 text-center p-4 rounded-lg" style={{ backgroundColor: colors.primary, color: colors.text }}>
          <h3 className="text-xl font-bold">You won: {winner}!</h3>
          <p className="mt-2">Congratulations on your prize!</p>
        </div>
      )}
    </div>
  );
};

export default WheelOfFortune;
