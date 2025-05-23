import React from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';

interface WheelProps {
  segments: string[];
  colors: string[];
  onSpinEnd: (segment: string) => void;
  config?: {
    segments: WheelSegment[];
    colors: string[];
  };
  onConfigChange?: (config: any) => void;
}

interface WheelSegment {
  text: string;
  isWinning: boolean;
}

const Wheel: React.FC<WheelProps> = ({ segments, colors, onSpinEnd, config, onConfigChange }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [spinning, setSpinning] = React.useState(false);
  const [result, setResult] = React.useState<string | null>(null);
  const spinDuration = 5000;
  const [spinSpeed, setSpinSpeed] = React.useState(1);

  React.useEffect(() => {
    if (!canvasRef.current || segments.length === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) * 0.9;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw wheel segments
    const segmentAngle = (2 * Math.PI) / segments.length;
    
    segments.forEach((segment, i) => {
      const startAngle = i * segmentAngle;
      const endAngle = (i + 1) * segmentAngle;
      
      // Draw segment
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      
      // Fill segment with color
      ctx.fillStyle = colors[i % colors.length] || '#841b60';
      ctx.fill();
      
      // Add segment text
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + segmentAngle / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 14px Arial';
      ctx.fillText(segment, radius * 0.85, 5);
      ctx.restore();
    });
    
    // Draw center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.strokeStyle = '#333333';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw pointer
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - radius - 10);
    ctx.lineTo(centerX - 10, centerY - radius + 10);
    ctx.lineTo(centerX + 10, centerY - radius + 10);
    ctx.closePath();
    ctx.fillStyle = '#ff0000';
    ctx.fill();
    
  }, [segments, colors]);
  
  const spinWheel = () => {
    if (spinning || segments.length === 0) return;
    
    setSpinning(true);
    setResult(null);
    
    // Random number of rotations (3-6 full rotations)
    const rotations = 3 + Math.random() * 3;
    
    // Random segment to land on
    const segmentIndex = Math.floor(Math.random() * segments.length);
    const segmentAngle = (2 * Math.PI) / segments.length;
    const targetAngle = rotations * 2 * Math.PI + segmentIndex * segmentAngle;
    
    // Animation variables
    let startTime: number | null = null;
    const duration = spinDuration * spinSpeed;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for slowing down
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentAngle = targetAngle * easeOut;
      
      // Rotate canvas
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(currentAngle);
      ctx.translate(-canvas.width / 2, -canvas.height / 2);
      
      // Redraw wheel
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(centerX, centerY) * 0.9;
      
      const segmentAngle = (2 * Math.PI) / segments.length;
      
      segments.forEach((segment, i) => {
        const startAngle = i * segmentAngle;
        const endAngle = (i + 1) * segmentAngle;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();
        
        ctx.fillStyle = colors[i % colors.length] || '#841b60';
        ctx.fill();
        
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(startAngle + segmentAngle / 2);
        ctx.textAlign = 'right';
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 14px Arial';
        ctx.fillText(segment, radius * 0.85, 5);
        ctx.restore();
      });
      
      ctx.restore();
      
      // Draw center and pointer (not rotated)
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 0.1, 0, 2 * Math.PI);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.strokeStyle = '#333333';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY - radius - 10);
      ctx.lineTo(centerX - 10, centerY - radius + 10);
      ctx.lineTo(centerX + 10, centerY - radius + 10);
      ctx.closePath();
      ctx.fillStyle = '#ff0000';
      ctx.fill();
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setSpinning(false);
        const winningSegment = segments[segmentIndex];
        setResult(winningSegment);
        onSpinEnd(winningSegment);
      }
    };
    
    requestAnimationFrame(animate);
  };
  
  const handleSpeedChange = (direction: 'up' | 'down') => {
    if (direction === 'up') {
      setSpinSpeed(Math.min(spinSpeed + 0.25, 2));
    } else {
      setSpinSpeed(Math.max(spinSpeed - 0.25, 0.5));
    }
  };
  
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <canvas 
          ref={canvasRef} 
          width={300} 
          height={300} 
          className="border border-gray-200 rounded-full shadow-lg"
        />
        {result && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-lg border border-gray-200">
            <p className="text-lg font-bold text-center">{result}</p>
          </div>
        )}
      </div>
      
      <div className="mt-6 flex items-center space-x-4">
        <div className="flex flex-col items-center">
          <p className="text-sm text-gray-500 mb-1">Vitesse</p>
          <div className="flex space-x-2">
            <button
              onClick={() => handleSpeedChange('down')}
              disabled={spinSpeed <= 0.5}
              className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              <ArrowDown className="w-4 h-4" />
            </button>
            <span className="w-10 text-center">{spinSpeed.toFixed(2)}x</span>
            <button
              onClick={() => handleSpeedChange('up')}
              disabled={spinSpeed >= 2}
              className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <button
          onClick={spinWheel}
          disabled={spinning || segments.length === 0}
          className="px-6 py-2 bg-[#841b60] text-white rounded-lg hover:bg-[#6d164f] disabled:opacity-50"
        >
          {spinning ? 'Spinning...' : 'Spin'}
        </button>
      </div>
    </div>
  );
};

export default Wheel;
