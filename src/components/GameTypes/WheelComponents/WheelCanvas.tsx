import React, { useRef, useEffect } from 'react';

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

const getClipPath = (position: string | undefined) => {
  switch (position) {
    case 'gauche':
      return 'inset(0 50% 0 0)'; // Coupe la moitié droite (garde la gauche)
    case 'droite':
      return 'inset(0 0 0 50%)'; // Coupe la moitié gauche (garde la droite)
    case 'bas':
      return 'inset(50% 0 0 0)'; // Coupe la moitié supérieure (garde le bas)
    case 'centre':
    default:
      return 'none';
  }
};

const getCanvasTransform = (position: string | undefined, canvasSize: number) => {
  switch (position) {
    case 'gauche':
      // Déplace la roue vers la droite pour montrer seulement la partie droite
      return `translateX(${canvasSize / 2}px)`;
    case 'droite':
      // Déplace la roue vers la gauche pour montrer seulement la partie gauche
      return `translateX(-${canvasSize / 2}px)`;
    case 'bas':
      // Déplace la roue vers le haut pour montrer seulement la partie supérieure
      return `translateY(-${canvasSize / 2}px)`;
    case 'centre':
    default:
      return 'none';
  }
};

const getThemeColors = (theme: string): string[] => {
  switch (theme) {
    case 'promo': return ['#FFD700', '#841b60', '#FF6F61'];
    case 'food': return ['#f4d35e', '#ee964b', '#e63946'];
    case 'casino': return ['#000000', '#FFD700', '#FF0000'];
    case 'child': return ['#fcd5ce', '#cdb4db', '#b5ead7'];
    case 'gaming': return ['#1f1f2e', '#841bff', '#13aae2'];
    case 'luxury': return ['#0d0d0d', '#d4af37', '#ffffff'];
    case 'halloween': return ['#ff7518', '#1b1b1b', '#fffacd'];
    case 'noel': return ['#e74c3c', '#27ae60', '#fff'];
    default: return ['#f9e5e5', '#dbeaff', '#e8f9e6', '#fff1e6', '#e6ffe6'];
  }
};

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

  const drawWheel = () => {
    const canvas = canvasRef.current;
    if (!canvas || segments.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = canvas.width;
    const center = size / 2;
    const radius = center - 25;
    const total = segments.length;
    const anglePerSlice = (2 * Math.PI) / total;
    
    // Use custom colors or fallback to theme colors
    const themeColors = customColors ? 
      [customColors.primary, customColors.secondary, customColors.accent || '#10b981'] :
      getThemeColors(theme);

    ctx.clearRect(0, 0, size, size);

    segments.forEach((seg: Segment, i: number) => {
      const startAngle = i * anglePerSlice + rotation;
      const endAngle = startAngle + anglePerSlice;

      // Draw segment
      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(center, center, radius + 15, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = seg.color || themeColors[i % themeColors.length];
      ctx.fill();

      // Draw golden separator lines
      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.lineTo(
        center + (radius + 15) * Math.cos(startAngle),
        center + (radius + 15) * Math.sin(startAngle)
      );
      ctx.strokeStyle = borderOutlineColor;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw text
      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(startAngle + anglePerSlice / 2);
      ctx.textAlign = 'center';
      ctx.fillStyle = 'white';
      ctx.font = `bold ${Math.max(12, size * 0.04)}px Arial`;
      ctx.strokeStyle = 'rgba(0,0,0,0.5)';
      ctx.lineWidth = 2;
      ctx.strokeText(seg.label, radius - 30, 5);
      ctx.fillText(seg.label, radius - 30, 5);
      ctx.restore();

      if (seg.image) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          const angle = startAngle + anglePerSlice / 2;
          const distance = radius - 20;
          const imgSize = Math.max(40, size * 0.15);
          const x = center + distance * Math.cos(angle) - imgSize / 2;
          const y = center + distance * Math.sin(angle) - imgSize / 2;

          ctx.save();
          ctx.beginPath();
          ctx.arc(x + imgSize / 2, y + imgSize / 2, imgSize / 2, 0, 2 * Math.PI);
          ctx.clip();
          ctx.drawImage(img, x, y, imgSize, imgSize);
          ctx.restore();
        };
        img.src = seg.image;
      }
    });

    // Draw outer border
    ctx.beginPath();
    ctx.arc(center, center, radius + 15, 0, 2 * Math.PI);
    ctx.lineWidth = 8;
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, borderOutlineColor);
    gradient.addColorStop(0.5, borderOutlineColor);
    gradient.addColorStop(1, borderOutlineColor);
    ctx.strokeStyle = gradient;
    ctx.stroke();

    // Draw inner border
    ctx.beginPath();
    ctx.arc(center, center, radius + 8, 0, 2 * Math.PI);
    ctx.lineWidth = 2;
    ctx.strokeStyle = borderColor;
    ctx.stroke();

    // Draw center circle
    const centerRadius = 25;
    const logoToDisplay = centerLogo || centerImage;
    
    // Center border
    ctx.beginPath();
    ctx.arc(center, center, centerRadius + 3, 0, 2 * Math.PI);
    const centerGradient = ctx.createLinearGradient(0, 0, size, size);
    centerGradient.addColorStop(0, borderOutlineColor);
    centerGradient.addColorStop(0.5, borderOutlineColor);
    centerGradient.addColorStop(1, borderOutlineColor);
    ctx.fillStyle = centerGradient;
    ctx.fill();
    
    if (logoToDisplay) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        ctx.save();
        ctx.beginPath();
        ctx.arc(center, center, centerRadius, 0, 2 * Math.PI);
        ctx.clip();
        ctx.drawImage(img, center - centerRadius, center - centerRadius, centerRadius * 2, centerRadius * 2);
        ctx.restore();
      };
      img.src = logoToDisplay;
    } else {
      ctx.beginPath();
      ctx.arc(center, center, centerRadius, 0, 2 * Math.PI);
      ctx.fillStyle = '#fff';
      ctx.fill();
      ctx.strokeStyle = borderOutlineColor;
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  };

  useEffect(() => {
    drawWheel();
  }, [segments, rotation, centerImage, centerLogo, theme, customColors, borderColor, borderOutlineColor, canvasSize, position]);

  return (
    <canvas
      ref={canvasRef}
      width={canvasSize}
      height={canvasSize}
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: `translate(-50%, -50%) ${getCanvasTransform(position, canvasSize)}`,
        zIndex: 1,
        clipPath: getClipPath(position),
        WebkitClipPath: getClipPath(position),
        transition: 'transform 0.3s ease, clip-path 0.3s ease',
      }}
      className="rounded-full"
    />
  );
};

export default WheelCanvas;
