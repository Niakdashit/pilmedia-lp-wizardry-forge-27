
import React from 'react';

interface ScratchCanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  canScratch: boolean;
  isRevealed: boolean;
  width: number;
  height: number;
}

const ScratchCanvas: React.FC<ScratchCanvasProps> = ({
  canvasRef,
  canScratch,
  isRevealed,
  width,
  height
}) => {
  if (!canScratch || isRevealed) {
    return null;
  }

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full cursor-crosshair" 
      style={{ touchAction: 'none' }} 
    />
  );
};

export default ScratchCanvas;
