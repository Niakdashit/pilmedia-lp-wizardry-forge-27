
import React, { useRef } from 'react';
import { getCanvasStyles } from '../../../utils/wheelPositioning';
import { useWheelDrawing } from '../../../hooks/useWheelDrawing';

interface Segment {
  label: string;
  color?: string;
  image?: string | null;
}

interface WheelCanvasProps {
  segments: Segment[];
  rotation: number;
  centerImage?: string;
  centerLogo?: string;
  theme: string;
  customColors?: {
    primary: string;
    secondary: string;
    accent?: string;
  };
  borderColor?: string;
  borderOutlineColor?: string;
  canvasSize: number;
  position?: 'gauche' | 'droite' | 'bas' | 'centre';
}

const WheelCanvas: React.FC<WheelCanvasProps> = ({
  segments,
  rotation,
  centerImage,
  centerLogo,
  theme,
  customColors,
  borderColor = '#841b60',
  borderOutlineColor = '#FFD700',
  canvasSize,
  position = 'centre'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useWheelDrawing({
    canvasRef,
    segments,
    rotation,
    centerImage,
    centerLogo,
    theme,
    customColors,
    borderColor,
    borderOutlineColor,
    canvasSize
  });

  return (
    <canvas
      ref={canvasRef}
      width={canvasSize}
      height={canvasSize}
      style={getCanvasStyles(position)}
      className="rounded-full"
    />
  );
};

export default WheelCanvas;
