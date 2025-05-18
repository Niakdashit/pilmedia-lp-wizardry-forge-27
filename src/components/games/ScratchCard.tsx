
import React, { useRef, useState, useEffect } from 'react';

interface ScratchCardProps {
  prize: {
    text: string;
    image?: string;
  };
  revealPercent: number;
}

const ScratchCard: React.FC<ScratchCardProps> = ({ prize, revealPercent = 50 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [percentRevealed, setPercentRevealed] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);

  // Track the last position for smoother drawing
  const lastPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const containerRect = canvas.parentElement?.getBoundingClientRect();
      if (containerRect) {
        canvas.width = containerRect.width;
        canvas.height = containerRect.height;
        
        // Fill with gray scratch-off layer
        context.fillStyle = '#AAAAAA';
        context.fillRect(0, 0, canvas.width, canvas.height);
      }
    };

    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);

    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
    };
  }, []);

  // Calculate the percentage of the canvas that has been scratched
  const calculateRevealPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return 0;

    const context = canvas.getContext('2d');
    if (!context) return 0;

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    
    let transparentPixels = 0;
    let totalPixels = pixels.length / 4;
    
    // Check every 4th value (alpha channel)
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] < 50) { // If pixel is mostly transparent
        transparentPixels++;
      }
    }
    
    const percent = (transparentPixels / totalPixels) * 100;
    return percent;
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    
    // Get position
    const position = getEventPosition(e);
    if (position) {
      lastPosition.current = position;
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;
    
    const position = getEventPosition(e);
    if (!position) return;
    
    // Draw a line between last position and current position
    context.globalCompositeOperation = 'destination-out';
    context.lineWidth = 40;
    context.lineCap = 'round';
    context.beginPath();
    context.moveTo(lastPosition.current.x, lastPosition.current.y);
    context.lineTo(position.x, position.y);
    context.stroke();
    
    // Update last position
    lastPosition.current = position;
    
    // Check if enough has been revealed
    const percent = calculateRevealPercentage();
    setPercentRevealed(percent);
    
    if (percent > revealPercent && !isRevealed) {
      setIsRevealed(true);
      
      // If more than threshold is revealed, clear the rest after a slight delay
      setTimeout(() => {
        if (canvas && context) {
          context.clearRect(0, 0, canvas.width, canvas.height);
        }
      }, 500);
    }
  };

  const endDrawing = () => {
    setIsDrawing(false);
  };

  // Helper to get position from either mouse or touch event
  const getEventPosition = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    
    let clientX, clientY;
    
    // Check if it's a touch event
    if ('touches' in e) {
      if (e.touches.length === 0) return null;
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    // Get canvas position
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    return { x, y };
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div 
        className="relative w-full max-w-md aspect-video bg-gradient-to-b from-purple-600 to-indigo-700 rounded-lg overflow-hidden"
        style={{ boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}
      >
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <div className="text-center p-6">
            {prize.image && (
              <img 
                src={prize.image} 
                alt="Prize" 
                className="mx-auto mb-4 max-h-24 object-contain"
              />
            )}
            <h2 className="text-3xl font-bold mb-2">{prize.text}</h2>
            <p className="text-lg opacity-90">Grattez pour découvrir</p>
          </div>
        </div>
        
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full cursor-pointer"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={endDrawing}
          onMouseLeave={endDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={endDrawing}
        ></canvas>

        {isRevealed && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center">
            <div className="bg-white bg-opacity-80 px-4 py-2 rounded-full text-purple-600 font-semibold">
              Félicitations!
            </div>
          </div>
        )}
      </div>

      {!isRevealed && (
        <div className="mt-4 text-center text-gray-600">
          <p>Grattez la carte avec votre doigt ou la souris</p>
          <div className="mt-2 w-full bg-gray-200 h-2 rounded-full">
            <div 
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${percentRevealed}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScratchCard;
