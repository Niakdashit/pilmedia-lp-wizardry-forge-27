import React, { useRef, useEffect } from 'react';
import { drawWheelSegments } from './WheelSegmentDrawer';
import { drawWheelBorders } from './WheelBorderDrawer';
import { drawWheelCenter } from './WheelCenterDrawer';

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
  offset: string;
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
  offset
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawWheel = () => {
    const canvas = canvasRef.current;
    if (!canvas || segments.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = canvas.width;
    const center = size / 2;
    const radius = center - 25;

    ctx.clearRect(0, 0, size, size);

    // Segments (fond de roue)
    drawWheelSegments({
      ctx,
      segments,
      rotation,
      center,
      radius,
      size,
      theme,
      customColors,
      borderOutlineColor
    });

    // Bordures principales
    drawWheelBorders({
      ctx,
      center,
      radius,
      borderColor,
      borderOutlineColor
    });

    // Centre de la roue (image/logo)
    drawWheelCenter({
      ctx,
      center,
      size,
      centerImage,
      centerLogo,
      borderOutlineColor
    });
  };

  useEffect(() => {
    drawWheel();
    // Ajout de canvasSize pour re-render si la taille change
  }, [segments, rotation, centerImage, centerLogo, theme, customColors, borderColor, borderOutlineColor, canvasSize]);

  return (
    <canvas
      ref={canvasRef}
      width={canvasSize}
      height={canvasSize}
      style={{
        position: 'absolute',
        left: offset,
        top: 0,
        zIndex: 1,
        overflow: 'hidden',
      }}
      className="rounded-full"
    />
  );
};

export default WheelCanvas;
