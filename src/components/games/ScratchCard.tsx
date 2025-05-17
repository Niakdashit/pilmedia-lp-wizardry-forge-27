import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ScratchCardProps {
  width?: number;
  height?: number;
  image?: string;
  brushSize?: number;
  revealPercent?: number;
  colors?: {
    primary: string;
    secondary: string;
    text: string;
  };
  style?: {
    width?: string;
    height?: string;
    fontSize?: string;
  };
  onComplete?: () => void;
  prize?: {
    text: string;
    image?: string;
  };
}

const ScratchCard: React.FC<ScratchCardProps> = ({
  width = 300,
  height = 300,
  brushSize = 40,
  revealPercent = 50,
  colors = {
    primary: '#841b60',
    secondary: '#6d1750',
    text: '#ffffff'
  },
  style = {
    width: '300px',
    height: '300px',
    fontSize: '24px'
  },
  onComplete,
  prize = {
    text: "Vous avez gagné !",
    image: "https://images.pexels.com/photos/1829191/pexels-photo-1829191.jpeg"
  }
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [lastPoint, setLastPoint] = useState<{ x: number; y: number } | null>(null);
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;

    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, colors.primary);
    gradient.addColorStop(1, colors.secondary);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.arc(
        Math.random() * width,
        Math.random() * height,
        Math.random() * 50 + 20,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }

    ctx.font = '20px Arial';
    ctx.fillStyle = colors.text;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Grattez ici !', width / 2, height / 2);
  }, [width, height, colors]);

  const getMousePos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ('touches' in e) {
      const touch = e.touches[0];
      return {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top) * scaleY
      };
    } else {
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
      };
    }
  };

  const scratch = (point: { x: number; y: number }) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !lastPoint) return;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(lastPoint.x, lastPoint.y);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparent = 0;
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparent++;
    }
    const percentRevealed = (transparent / (pixels.length / 4)) * 100;
    setRevealed(percentRevealed);

    if (percentRevealed > revealPercent && !isComplete) {
      setIsComplete(true);
      onComplete?.();
    }
  };

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const point = getMousePos(e);
    if (!point) return;

    setIsDrawing(true);
    setLastPoint(point);
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!isDrawing) return;

    const point = getMousePos(e);
    if (!point) return;

    scratch(point);
    setLastPoint(point);
  };

  const handleEnd = () => {
    setIsDrawing(false);
    setLastPoint(null);
  };

  return (
    <div
      className="relative rounded-lg overflow-hidden"
      style={{
        width: style.width,
        height: style.height
      }}
    >
      {/* Prize Content */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center bg-white"
        style={{
          backgroundImage: prize.image ? `url(${prize.image})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isComplete ? { opacity: 1, scale: 1 } : {}}
          className="bg-white bg-opacity-90 p-6 rounded-lg text-center"
        >
          <h2 className="text-2xl font-bold mb-2" style={{ color: colors.primary }}>
            {prize.text}
          </h2>
        </motion.div>
      </div>

      {/* Scratch Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 cursor-pointer touch-none"
        style={{
          width: '100%',
          height: '100%'
        }}
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
      />

      {/* Progress Indicator */}
      {!isComplete && (
        <div className="absolute bottom-4 left-4 right-4 h-2 bg-white bg-opacity-20 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${revealed}%`,
              backgroundColor: colors.text
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ScratchCard;
