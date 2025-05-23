
import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';

interface ScratchProps {
  image?: string;
  revealPercentage?: number;
  onReveal?: () => void;
  onComplete?: () => void;
  onConfigChange?: (config: any) => void;
  config?: {
    image: string;
    revealPercentage: number;
    foregroundColor?: string;
    backgroundColor?: string;
    message?: string;
  };
}

const Scratch: React.FC<ScratchProps> = ({
  image = 'https://via.placeholder.com/400x300/FFB6C1/FFFFFF?text=Prix+Special',
  revealPercentage = 50,
  onReveal,
  onComplete,
  config
}) => {
  const [isScratching, setIsScratching] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [percentScratched, setPercentScratched] = useState(0);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const scratchStarted = useRef<boolean>(false);
  
  // Configuration
  const imageToShow = config?.image || image;
  const requiredPercentage = config?.revealPercentage || revealPercentage;
  const foregroundColor = config?.foregroundColor || '#C0C0C0';
  const backgroundColor = config?.backgroundColor || '#F5F5F5';
  const message = config?.message || 'Grattez pour révéler votre prix';
  
  // Initialisation du canvas et de l'image à révéler
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const context = canvas.getContext('2d', { willReadFrequently: true });
    if (!context) return;
    
    contextRef.current = context;
    
    // Définir la taille du canvas
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    context.scale(dpr, dpr);
    
    // Dessiner la couche de grattage
    context.fillStyle = foregroundColor;
    context.fillRect(0, 0, rect.width, rect.height);
    
    // Ajouter le texte
    context.font = 'bold 18px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillStyle = '#333';
    context.fillText(message, rect.width / 2, rect.height / 2);
    
    // Dessiner des motifs pour indiquer qu'il faut gratter
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * rect.width;
      const y = Math.random() * rect.height;
      context.beginPath();
      context.arc(x, y, 10, 0, Math.PI * 2);
      context.fillStyle = 'rgba(0, 0, 0, 0.1)';
      context.fill();
    }
    
    // Charger l'image
    const img = new Image();
    img.onload = () => {
      imageRef.current = img;
    };
    img.src = imageToShow;
    
  }, [imageToShow, foregroundColor, backgroundColor, message]);
  
  // Gestion des événements tactiles et souris
  const handleScratchStart = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context) return;
    
    setIsScratching(true);
    scratchStarted.current = true;
    
    const rect = canvas.getBoundingClientRect();
    const x = 
      'touches' in e
        ? e.touches[0].clientX - rect.left
        : e.clientX - rect.left;
    const y =
      'touches' in e
        ? e.touches[0].clientY - rect.top
        : e.clientY - rect.top;
    
    scratch(x, y);
  };
  
  const handleScratchMove = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!isScratching) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x =
      'touches' in e
        ? e.touches[0].clientX - rect.left
        : e.clientX - rect.left;
    const y =
      'touches' in e
        ? e.touches[0].clientY - rect.top
        : e.clientY - rect.top;
    
    scratch(x, y);
  };
  
  const handleScratchEnd = () => {
    setIsScratching(false);
    
    if (percentScratched >= requiredPercentage && !revealed) {
      setRevealed(true);
      
      if (onReveal) {
        onReveal();
      }
      
      if (onComplete) {
        onComplete();
      }
      
      // Animation de confettis
      const canvas = canvasRef.current;
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { 
            x: x / window.innerWidth, 
            y: y / window.innerHeight 
          }
        });
      }
    }
  };
  
  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    const img = imageRef.current;
    
    if (!canvas || !context || !img) return;
    
    // Définir le style de grattage
    context.globalCompositeOperation = 'destination-out';
    context.lineWidth = 40;
    context.lineCap = 'round';
    context.lineJoin = 'round';
    
    // Dessiner la zone grattée
    context.beginPath();
    context.arc(x, y, 20, 0, Math.PI * 2);
    context.fill();
    
    // Calculer le pourcentage gratté
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const pixelData = imageData.data;
    let transparentPixels = 0;
    
    for (let i = 0; i < pixelData.length; i += 4) {
      if (pixelData[i + 3] === 0) {
        transparentPixels++;
      }
    }
    
    const totalPixels = canvas.width * canvas.height;
    const newPercentScratched = Math.round((transparentPixels / totalPixels) * 100);
    setPercentScratched(newPercentScratched);
  };
  
  // Gratter complètement
  const handleRevealAll = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    
    if (!canvas || !context || revealed) return;
    
    // Effacer complètement
    context.globalCompositeOperation = 'destination-out';
    context.fillRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio);
    
    setRevealed(true);
    setPercentScratched(100);
    
    if (onReveal) {
      onReveal();
    }
    
    if (onComplete) {
      onComplete();
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative max-w-md w-full aspect-[4/3] rounded-lg overflow-hidden shadow-lg border-4 border-[#841b60]">
        {/* Image de fond à révéler */}
        <img
          src={imageToShow}
          alt="Prix à gratter"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Layer à gratter */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full cursor-pointer touch-none"
          onMouseDown={handleScratchStart}
          onMouseMove={handleScratchMove}
          onMouseUp={handleScratchEnd}
          onMouseLeave={handleScratchEnd}
          onTouchStart={handleScratchStart}
          onTouchMove={handleScratchMove}
          onTouchEnd={handleScratchEnd}
        />
        
        {/* Indicateur de progression */}
        {scratchStarted.current && !revealed && (
          <div className="absolute bottom-2 left-2 right-2 bg-white/80 rounded-full h-4 overflow-hidden">
            <div 
              className="h-full bg-[#841b60] transition-all duration-300"
              style={{ width: `${percentScratched}%` }}
            />
          </div>
        )}
      </div>
      
      <div className="mt-6 flex flex-col items-center">
        {!revealed && scratchStarted.current && (
          <p className="text-gray-600 mb-4">
            Gratté à {percentScratched}% (objectif: {requiredPercentage}%)
          </p>
        )}
        
        <button
          onClick={handleRevealAll}
          className={`px-6 py-3 rounded-lg font-medium ${
            revealed
              ? 'bg-gray-200 text-gray-500 cursor-default'
              : 'bg-[#841b60] text-white hover:bg-[#6d164f] transition-colors shadow-md'
          }`}
          disabled={revealed}
        >
          {revealed ? 'Prix révélé!' : 'Tout révéler'}
        </button>
      </div>
    </div>
  );
};

export default Scratch;
