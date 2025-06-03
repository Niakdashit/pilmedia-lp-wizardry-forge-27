
import React, { useEffect, useRef } from 'react';

interface Segment {
  label: string;
  color: string;
  image?: string | null;
}

interface WheelCanvasProps {
  segments: Segment[];
  rotation: number;
  centerImage?: string | File | null;
  centerLogo?: string | File | null;
  theme?: string;
  customColors?: {
    primary: string;
    secondary: string;
    accent?: string;
  };
  borderColor?: string;
  borderOutlineColor?: string;
  canvasSize: number;
  offset?: string;
}

const WheelCanvas: React.FC<WheelCanvasProps> = ({
  segments,
  rotation,
  centerImage,
  centerLogo,
  theme = 'default',
  customColors,
  borderColor = '#841b60',
  borderOutlineColor = '#FFD700',
  canvasSize,
  offset = '0px'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Fonction pour obtenir l'URL d'une image (File ou string)
  const getImageUrl = (image: string | File | null | undefined): string | null => {
    if (!image) return null;
    if (typeof image === 'string') return image;
    if (image instanceof File) return URL.createObjectURL(image);
    return null;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvasSize / 2;
    const centerY = canvasSize / 2;
    const radius = (canvasSize / 2) - 30;

    // Clear canvas
    ctx.clearRect(0, 0, canvasSize, canvasSize);

    // Draw segments
    if (segments.length > 0) {
      const anglePerSegment = (2 * Math.PI) / segments.length;

      segments.forEach((segment, index) => {
        const startAngle = index * anglePerSegment + rotation;
        const endAngle = (index + 1) * anglePerSegment + rotation;

        // Draw segment
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = segment.color;
        ctx.fill();

        // Draw segment border
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw text
        if (segment.label) {
          ctx.save();
          ctx.translate(centerX, centerY);
          ctx.rotate(startAngle + anglePerSegment / 2);
          
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 16px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          
          // Add text shadow for better readability
          ctx.shadowColor = 'rgba(0,0,0,0.5)';
          ctx.shadowBlur = 3;
          ctx.shadowOffsetX = 1;
          ctx.shadowOffsetY = 1;
          
          ctx.fillText(segment.label, radius * 0.7, 0);
          ctx.restore();
        }
      });
    }

    // Draw outer border
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = borderOutlineColor;
    ctx.lineWidth = 8;
    ctx.stroke();

    // Draw inner border
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 4;
    ctx.stroke();

    // Draw center circle
    const centerRadius = 50;
    ctx.beginPath();
    ctx.arc(centerX, centerY, centerRadius, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw center image/logo
    const logoUrl = getImageUrl(centerLogo || centerImage);
    if (logoUrl) {
      const img = new Image();
      img.onload = () => {
        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, centerY, centerRadius - 5, 0, 2 * Math.PI);
        ctx.clip();
        
        const imgSize = (centerRadius - 5) * 2;
        ctx.drawImage(
          img,
          centerX - imgSize / 2,
          centerY - imgSize / 2,
          imgSize,
          imgSize
        );
        ctx.restore();
      };
      img.src = logoUrl;
    }
  }, [segments, rotation, centerImage, centerLogo, borderColor, borderOutlineColor, canvasSize]);

  return (
    <canvas
      ref={canvasRef}
      width={canvasSize}
      height={canvasSize}
      style={{
        position: 'absolute',
        left: offset,
        top: '0px',
        zIndex: 2,
        filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.3))'
      }}
    />
  );
};

export default WheelCanvas;
