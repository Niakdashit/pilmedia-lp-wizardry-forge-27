
import React, { useRef, useState, useEffect } from 'react';
import { WheelOfFortuneProps } from '../../types/componentInterfaces';

const WheelOfFortune: React.FC<WheelOfFortuneProps> = ({
  segments,
  colors,
  backgroundImage,
  onComplete
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null);
  const animationRef = useRef<number | null>(null);
  const currentRotationRef = useRef(0);
  const totalRotation = 360 * 5 + Math.random() * 360; // 5 full rotations + random angle
  const duration = 5000; // 5 seconds
  const startTime = useRef<number>(0);

  useEffect(() => {
    drawWheel();
  }, [segments]);

  const drawWheel = () => {
    const canvas = canvasRef.current;
    if (!canvas || !segments || segments.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) * 0.9;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const arcAngle = (2 * Math.PI) / segments.length;

    segments.forEach((segment, i) => {
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(
        centerX,
        centerY,
        radius,
        i * arcAngle,
        (i + 1) * arcAngle
      );
      ctx.closePath();
      ctx.fillStyle = segment.color;
      ctx.fill();
      ctx.stroke();

      // Add text
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(i * arcAngle + arcAngle / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = colors.text || '#000000';
      ctx.font = '12px Arial';
      ctx.fillText(segment.text, radius * 0.85, 5);
      ctx.restore();
    });

    // Draw center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 15, 0, 2 * Math.PI);
    ctx.fillStyle = colors.primary || '#ffffff';
    ctx.fill();
    ctx.stroke();
  };

  const spinWheel = () => {
    if (isSpinning || !segments || segments.length === 0) return;

    setIsSpinning(true);
    setResult(null);
    startTime.current = performance.now();
    currentRotationRef.current = 0;

    const animate = (timestamp: number) => {
      const progress = (timestamp - startTime.current) / duration;
      
      if (progress < 1) {
        // Ease-out function to slow down towards the end
        const easeOutProgress = 1 - Math.pow(1 - progress, 3);
        currentRotationRef.current = easeOutProgress * totalRotation;
        
        const canvas = canvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate((currentRotationRef.current * Math.PI) / 180);
            ctx.translate(-canvas.width / 2, -canvas.height / 2);
            drawWheel();
            ctx.restore();
          }
        }
        
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Animation complete
        const finalRotation = totalRotation % 360;
        const segmentAngle = 360 / segments.length;
        const segmentIndex = Math.floor((360 - (finalRotation % 360)) / segmentAngle);
        const winningSegment = segments[segmentIndex % segments.length];
        
        setResult(winningSegment.text);
        setSelectedSegment(winningSegment.text);
        setIsSpinning(false);
        
        if (onComplete) {
          onComplete();
        }
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '100%',
        padding: '20px',
        borderRadius: '10px'
      }}
    >
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold" style={{ color: colors.text || '#000' }}>
          Wheel of Fortune
        </h2>
        <p className="text-sm" style={{ color: colors.text || '#000' }}>
          Spin the wheel to win a prize!
        </p>
      </div>
      
      <div className="relative">
        <canvas 
          ref={canvasRef} 
          width={300} 
          height={300} 
          className="border rounded-full"
        />
        <div 
          className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0 h-0"
          style={{ 
            borderLeft: '10px solid transparent',
            borderRight: '10px solid transparent',
            borderTop: `20px solid ${colors.primary || '#000'}`,
            marginTop: '-5px'
          }}
        />
      </div>
      
      <button
        onClick={spinWheel}
        disabled={isSpinning}
        className="mt-4 px-6 py-2 rounded-full shadow-lg transition-transform transform hover:scale-105"
        style={{ 
          backgroundColor: colors.primary || '#841b60',
          color: '#fff',
          opacity: isSpinning ? 0.7 : 1
        }}
      >
        {isSpinning ? 'Spinning...' : 'Spin'}
      </button>
      
      {result && (
        <div className="mt-4 p-3 rounded text-center" style={{ backgroundColor: colors.secondary || '#f0f0f0', color: colors.text || '#000' }}>
          <p className="font-bold">Congratulations!</p>
          <p>You won: {result}</p>
        </div>
      )}
    </div>
  );
};

export default WheelOfFortune;
