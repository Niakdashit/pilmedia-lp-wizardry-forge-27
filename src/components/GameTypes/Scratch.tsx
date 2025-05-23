
import React from 'react';
import { Laptop } from 'lucide-react';

interface ScratchProps {
  config: {
    image: string;
    revealPercentage: number;
  };
  onComplete: () => void;
  onConfigChange?: (config: {
    image: string;
    revealPercentage: number;
  }) => void;
}

const Scratch: React.FC<ScratchProps> = ({ config, onComplete, onConfigChange }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [isScratching, setIsScratching] = React.useState(false);
  const [revealedPercentage, setRevealedPercentage] = React.useState(0);
  
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Draw scratch layer
    ctx.fillStyle = '#CCCCCC';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw text
    ctx.fillStyle = '#888888';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Grattez ici pour révéler', canvas.width / 2, canvas.height / 2);
    
    // Load background image if provided
    if (config.image) {
      const img = new Image();
      img.onload = () => {
        // Store the clean version for later comparison
        const cleanCanvas = document.createElement('canvas');
        cleanCanvas.width = canvas.width;
        cleanCanvas.height = canvas.height;
        const cleanCtx = cleanCanvas.getContext('2d');
        if (cleanCtx) {
          cleanCtx.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
      };
      img.src = config.image;
    }
  }, [config.image]);
  
  const handleScratch = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !isScratching) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    let x, y;
    
    if ('touches' in e) {
      // Touch event
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      // Mouse event
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }
    
    // Clear a circle where the user scratched
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();
    
    // Calculate revealed percentage
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixelData = imageData.data;
    let transparentPixels = 0;
    
    for (let i = 3; i < pixelData.length; i += 4) {
      if (pixelData[i] === 0) {
        transparentPixels++;
      }
    }
    
    const totalPixels = canvas.width * canvas.height;
    const newRevealedPercentage = (transparentPixels / totalPixels) * 100;
    setRevealedPercentage(newRevealedPercentage);
    
    // Check if enough has been revealed
    if (newRevealedPercentage >= config.revealPercentage) {
      onComplete();
    }
  };
  
  return (
    <div className="flex flex-col items-center">
      <div className="relative mb-4 border-2 border-gray-300 rounded-lg overflow-hidden">
        {config.image && (
          <img 
            src={config.image} 
            alt="Prize" 
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <canvas
          ref={canvasRef}
          width={300}
          height={200}
          className="relative z-10 cursor-pointer"
          onMouseDown={() => setIsScratching(true)}
          onMouseUp={() => setIsScratching(false)}
          onMouseLeave={() => setIsScratching(false)}
          onMouseMove={handleScratch}
          onTouchStart={() => setIsScratching(true)}
          onTouchEnd={() => setIsScratching(false)}
          onTouchMove={handleScratch}
        />
      </div>
      
      <div className="text-center">
        <p className="text-sm text-gray-500 mb-2">
          Grattez la carte pour découvrir votre prix
        </p>
        <div className="flex items-center justify-center text-xs text-gray-400">
          <Laptop className="w-4 h-4 mr-1" />
          <span>Utilisez votre souris ou votre doigt pour gratter</span>
        </div>
      </div>
      
      <div className="w-full mt-4 bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-[#841b60] h-2.5 rounded-full" 
          style={{ width: `${revealedPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Scratch;
