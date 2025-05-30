
import React, { useRef, useEffect, useState } from 'react';
import WheelStyleSelector from '../configurators/WheelStyleSelector';

interface WheelProps {
  config: any;
  isPreview?: boolean;
  onComplete?: (prize: string) => void;
  onFinish?: (result: 'win' | 'lose') => void;
  previewMode?: 'mobile' | 'tablet' | 'desktop';
  style?: React.CSSProperties;
  className?: string;
}

const Wheel: React.FC<WheelProps> = ({
  config,
  isPreview,
  onComplete,
  onFinish,
  previewMode = 'desktop',
  style,
  className
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState('roulette_casino.svg');
  const [rotation, setRotation] = useState(0);

  // Récupération des données de configuration avec valeurs par défaut
  const segments = config?.segments || config?.prizes || [
    { label: 'Prix 1', color: '#ff6b6b' },
    { label: 'Prix 2', color: '#4ecdc4' },
    { label: 'Prix 3', color: '#45b7d1' },
    { label: 'Prix 4', color: '#96ceb4' }
  ];

  const colors = config?.colors || ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4'];

  console.log('Wheel config:', config);
  console.log('Wheel segments:', segments);

  const drawWheel = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = Math.min(canvas.width, canvas.height);
    const center = size / 2;
    const radius = center - 10;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (segments.length === 0) return;

    const anglePerSegment = (2 * Math.PI) / segments.length;

    // Draw segments
    segments.forEach((segment: any, index: number) => {
      const startAngle = index * anglePerSegment + (rotation * Math.PI / 180);
      const endAngle = startAngle + anglePerSegment;

      // Get segment data
      const segmentLabel = typeof segment === 'object' ? segment.label : segment;
      const segmentColor = typeof segment === 'object' ? segment.color : colors[index % colors.length];

      // Draw segment
      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(center, center, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = segmentColor;
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw text
      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(startAngle + anglePerSegment / 2);
      ctx.textAlign = 'left';
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 14px Arial';
      ctx.shadowColor = 'rgba(0,0,0,0.5)';
      ctx.shadowBlur = 2;
      ctx.fillText(segmentLabel, radius * 0.6, 5);
      ctx.restore();
    });

    // Draw center circle
    ctx.beginPath();
    ctx.arc(center, center, 20, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.strokeStyle = '#333333';
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  const spin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    const spinAmount = Math.random() * 360 + 1440; // Au moins 4 tours
    const finalRotation = rotation + spinAmount;

    // Animate rotation
    const startTime = Date.now();
    const duration = 3000;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentRotation = rotation + (spinAmount * easeOut);
      
      setRotation(currentRotation);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);
        
        // Calculate winning segment
        const normalizedRotation = (finalRotation % 360 + 360) % 360;
        const segmentAngle = 360 / segments.length;
        const winningIndex = Math.floor((360 - normalizedRotation) / segmentAngle) % segments.length;
        const winningSegment = segments[winningIndex];
        const prize = typeof winningSegment === 'object' ? winningSegment.label : winningSegment;
        
        onComplete?.(prize);
        
        if (onFinish) {
          const result = Math.random() > 0.5 ? 'win' : 'lose';
          onFinish(result);
        }
      }
    };

    animate();
  };

  useEffect(() => {
    drawWheel();
  }, [segments, rotation]);

  // Mode éditeur - afficher seulement le sélecteur de style
  if (!isPreview) {
    return (
      <div className="space-y-6">
        <WheelStyleSelector
          selectedStyle={selectedStyle}
          setSelectedStyle={setSelectedStyle}
        />
      </div>
    );
  }

  // Mode preview - toujours afficher la roue
  const containerSize = Math.min(
    (style?.width as number) || 300,
    (style?.height as number) || 300
  );

  return (
    <div
      className={`flex flex-col items-center justify-center w-full h-full ${className || ''}`}
      style={style}
    >
      {/* Container de la roue */}
      <div
        className="relative flex items-center justify-center"
        style={{
          width: containerSize,
          height: containerSize,
          maxWidth: '100%',
          maxHeight: '100%',
        }}
      >
        {/* Canvas pour la roue */}
        <canvas
          ref={canvasRef}
          width={containerSize}
          height={containerSize}
          className="rounded-full border-4 border-gray-800"
          style={{
            width: containerSize,
            height: containerSize,
          }}
        />
        
        {/* Curseur/flèche */}
        <div
          className="absolute z-30 pointer-events-none"
          style={{
            top: -2,
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <div 
            className="w-0 h-0 border-l-[12px] border-r-[12px] border-b-[20px] border-transparent border-b-gray-800"
            style={{
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
            }}
          ></div>
        </div>
      </div>

      {/* Bouton responsive */}
      <button
        onClick={spin}
        disabled={isSpinning}
        className="px-6 py-3 mt-6 bg-[#841b60] text-white font-bold rounded-xl hover:bg-[#6d164f] disabled:opacity-50 transition-colors duration-200 text-sm md:text-base shadow-lg"
        style={{
          width: previewMode === 'mobile' ? '80%' : previewMode === 'tablet' ? '70%' : '60%',
          maxWidth: '280px',
          minWidth: '120px',
        }}
      >
        {isSpinning ? 'Rotation...' : 'Faire tourner'}
      </button>
    </div>
  );
};

export default Wheel;
