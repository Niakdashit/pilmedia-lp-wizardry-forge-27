import React, { useRef, useEffect } from 'react';

interface Segment {
  label: string;
  chance: number;
  color?: string;
  image?: File | null;
}

interface MobileWheelPreviewProps {
  campaign: any;
  gamePosition?: 'left' | 'right' | 'center' | 'top' | 'bottom';
}

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

const wheelDecorByTheme: Record<string, string> = {
  casino: '/wheel-styles/roulette_casino.svg',
  luxury: '/wheel-styles/roulette_luxe.svg',
  noel: '/wheel-styles/roulette_noel.svg',
  halloween: '/wheel-styles/roulette_halloween.svg',
  promo: '/wheel-styles/roulette_promo.svg',
  food: '/wheel-styles/roulette_food.svg',
  child: '/wheel-styles/roulette_child.svg',
  gaming: '/wheel-styles/roulette_gaming.svg',
};

const CANVAS_SIZE = 280;

const MobileWheelPreview: React.FC<MobileWheelPreviewProps> = ({
  campaign,
  gamePosition = 'center'
}) => {
  const mobileRouletteConfig = campaign?.mobileConfig?.roulette || {};
  const segments = mobileRouletteConfig.segments || [];
  const centerImage = mobileRouletteConfig.centerImage;
  const theme = mobileRouletteConfig.theme || 'default';
  const borderColor = mobileRouletteConfig.borderColor || '#841b60';
  const pointerColor = mobileRouletteConfig.pointerColor || '#841b60';

  const canvasSize = mobileRouletteConfig.size || mobileRouletteConfig.width || CANVAS_SIZE;

  const rotation = 0;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Déterminer si on doit afficher la roue à 50% (positions left/right)
  const shouldCropWheel = gamePosition === 'left' || gamePosition === 'right';
  
  // Calcul de la largeur du conteneur visible - ajustement pour les grandes tailles
  const getContainerWidth = () => {
    if (!shouldCropWheel) return canvasSize;
    
    // Pour les grandes tailles, on augmente la portion visible
    if (canvasSize >= 500) {
      return canvasSize * 0.65; // 65% au lieu de 50% pour les grandes roues
    }
    return canvasSize * 0.5; // 50% pour les petites roues
  };
  
  const containerWidth = getContainerWidth();

  // Calcul de la position absolue du jeu selon gamePosition
  const getGameAbsoluteStyle = () => {
    const baseStyle: React.CSSProperties = {
      position: 'absolute',
      zIndex: 10,
      pointerEvents: 'none' as const
    };

    switch (gamePosition) {
      case 'left':
        return {
          ...baseStyle,
          left: '0px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: containerWidth,
          height: canvasSize,
          overflow: 'hidden'
        };
      case 'right':
        return {
          ...baseStyle,
          right: '0px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: containerWidth,
          height: canvasSize,
          overflow: 'hidden'
        };
      case 'top':
        return {
          ...baseStyle,
          top: `-${canvasSize / 2}px`,
          left: '50%',
          transform: 'translateX(-50%)',
          width: canvasSize,
          height: canvasSize
        };
      case 'bottom':
        return {
          ...baseStyle,
          bottom: `-${canvasSize / 2}px`,
          left: '50%',
          transform: 'translateX(-50%)',
          width: canvasSize,
          height: canvasSize
        };
      case 'center':
      default:
        return {
          ...baseStyle,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: canvasSize,
          height: canvasSize
        };
    }
  };

  const drawWheel = () => {
    const canvas = canvasRef.current;
    if (!canvas || segments.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = canvas.width;
    const center = size / 2;
    const radius = center - 15;
    const total = segments.length;
    const anglePerSlice = (2 * Math.PI) / total;
    const themeColors = getThemeColors(theme);

    ctx.clearRect(0, 0, size, size);

    if (theme === 'default') {
      ctx.beginPath();
      ctx.arc(center, center, radius + 6, 0, 2 * Math.PI);
      ctx.lineWidth = 8;
      ctx.strokeStyle = borderColor;
      ctx.stroke();
    }

    segments.forEach((seg: Segment, i: number) => {
      const startAngle = i * anglePerSlice + rotation;
      const endAngle = startAngle + anglePerSlice;

      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(center, center, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = seg.color || themeColors[i % themeColors.length];
      ctx.fill();

      if (seg.image) {
        const img = new Image();
        img.onload = () => {
          const angle = startAngle + anglePerSlice / 2;
          const distance = radius - 30;
          const imgSize = 40;
          const x = center + distance * Math.cos(angle) - imgSize / 2;
          const y = center + distance * Math.sin(angle) - imgSize / 2;

          ctx.save();
          ctx.beginPath();
          ctx.arc(x + imgSize / 2, y + imgSize / 2, imgSize / 2, 0, 2 * Math.PI);
          ctx.clip();
          ctx.drawImage(img, x, y, imgSize, imgSize);
          ctx.restore();
        };
        img.src = URL.createObjectURL(seg.image);
      }

      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(startAngle + anglePerSlice / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = 'white';
      ctx.font = 'bold 12px Arial';
      ctx.fillText(seg.label, radius - 15, 3);
      ctx.restore();
    });

    if (centerImage) {
      const img = new Image();
      img.onload = () => {
        ctx.save();
        ctx.beginPath();
        ctx.arc(center, center, 30, 0, 2 * Math.PI);
        ctx.clip();
        ctx.drawImage(img, center - 30, center - 30, 60, 60);
        ctx.restore();
      };
      img.src = URL.createObjectURL(centerImage);
    } else {
      ctx.beginPath();
      ctx.arc(center, center, 30, 0, 2 * Math.PI);
      ctx.fillStyle = '#fff';
      ctx.fill();
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  };

  useEffect(() => {
    drawWheel();
  }, [segments, rotation, centerImage, theme, borderColor, pointerColor, canvasSize]);

  if (segments.length === 0) {
    return null;
  }

  // Calcul de la position de décalage du canvas pour les positions left/right
  const getCanvasOffset = () => {
    if (!shouldCropWheel) return '0px';
    
    if (gamePosition === 'left') {
      return '0px';
    } else { // right
      // Pour les grandes tailles, on ajuste le décalage
      const offset = canvasSize >= 500 ? canvasSize * 0.35 : canvasSize * 0.5;
      return `-${offset}px`;
    }
  };

  const renderWheelContainer = () => (
    <div style={{ position: 'relative', width: canvasSize, height: canvasSize }}>
      <canvas
        ref={canvasRef}
        width={canvasSize}
        height={canvasSize}
        style={{
          position: 'absolute',
          left: getCanvasOffset(),
          top: 0,
          zIndex: 1,
        }}
        className="rounded-full shadow-lg"
      />
      {theme !== 'default' && wheelDecorByTheme[theme] && (
        <img
          src={wheelDecorByTheme[theme]}
          alt={`Décor roue ${theme}`}
          style={{
            position: 'absolute',
            left: getCanvasOffset(),
            top: 0,
            width: canvasSize,
            height: canvasSize,
            zIndex: 2,
            pointerEvents: 'none',
          }}
          draggable={false}
        />
      )}
      <div
        style={{
          position: 'absolute',
          left: shouldCropWheel ? 
            (gamePosition === 'left' ? 
              containerWidth - 15 : // Pour left, pointeur au bord droit du conteneur visible
              -15 // Pour right, pointeur au bord gauche du conteneur visible
            ) : 
            canvasSize / 2 - 15, // Position normale au centre
          top: -20,
          width: 30,
          height: 50,
          zIndex: 3,
          pointerEvents: 'none',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        <svg width="30" height="50">
          <polygon
            points="15,50 27,15 3,15"
            fill={pointerColor}
            stroke="#fff"
            strokeWidth="2"
            style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.10))' }}
          />
        </svg>
      </div>
    </div>
  );

  return (
    <div style={getGameAbsoluteStyle()}>
      {renderWheelContainer()}
    </div>
  );
};

export default MobileWheelPreview;
