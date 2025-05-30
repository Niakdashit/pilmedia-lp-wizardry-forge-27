
import React, { useState, useRef, useEffect } from 'react';

interface Segment {
  label: string;
  chance: number;
  color?: string;
  image?: File | null;
}

interface InstantWinConfig {
  mode: "instant_winner";
  winProbability: number;
  maxWinners?: number;
  winnersCount?: number;
}

interface WheelPreviewProps {
  campaign: any;
  config: InstantWinConfig;
  onFinish?: (result: 'win' | 'lose') => void;
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

const WheelPreview: React.FC<WheelPreviewProps> = ({
  campaign,
  config,
  onFinish
}) => {
  // Utiliser la configuration synchronisée depuis campaign.config.roulette
  const rouletteConfig = campaign?.config?.roulette || {};
  const segments = rouletteConfig.segments || [];
  const centerImage = rouletteConfig.centerImage;
  const theme = rouletteConfig.theme || 'default';
  const borderColor = rouletteConfig.borderColor || '#841b60';
  const pointerColor = rouletteConfig.pointerColor || '#841b60';
  const gameSize = rouletteConfig.gameSize || { width: 400, height: 400 };
  const gamePosition = rouletteConfig.gamePosition || { x: 0, y: 0 };
  
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawWheel = () => {
    const canvas = canvasRef.current;
    if (!canvas || segments.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = Math.min(gameSize.width, gameSize.height);
    canvas.width = size;
    canvas.height = size;
    
    const center = size / 2;
    const radius = center - 20;
    const total = segments.length;
    const anglePerSlice = (2 * Math.PI) / total;
    const themeColors = getThemeColors(theme);

    ctx.clearRect(0, 0, size, size);

    if (theme === 'default') {
      ctx.beginPath();
      ctx.arc(center, center, radius + 8, 0, 2 * Math.PI);
      ctx.lineWidth = 10;
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
          const distance = radius - 40;
          const imgSize = Math.min(60, radius / 4);
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
      ctx.font = `bold ${Math.max(12, size / 30)}px Arial`;
      ctx.shadowColor = 'rgba(0,0,0,0.5)';
      ctx.shadowBlur = 2;
      ctx.fillText(seg.label, radius - 20, 5);
      ctx.restore();
    });

    // Centre image
    if (centerImage) {
      const img = new Image();
      img.onload = () => {
        const centerSize = Math.min(40, radius / 5);
        ctx.save();
        ctx.beginPath();
        ctx.arc(center, center, centerSize, 0, 2 * Math.PI);
        ctx.clip();
        ctx.drawImage(img, center - centerSize, center - centerSize, centerSize * 2, centerSize * 2);
        ctx.restore();
      };
      img.src = URL.createObjectURL(centerImage);
    } else {
      const centerSize = Math.min(40, radius / 5);
      ctx.beginPath();
      ctx.arc(center, center, centerSize, 0, 2 * Math.PI);
      ctx.fillStyle = '#fff';
      ctx.fill();
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  };

  const spinWheel = () => {
    if (spinning || segments.length === 0) return;
    setSpinning(true);

    const totalSpins = 5;
    const randomOffset = Math.random() * 360;
    const finalRotationDeg = totalSpins * 360 + randomOffset;
    const finalRotation = (finalRotationDeg * Math.PI) / 180;

    const duration = 4500;
    const start = Date.now();
    const initialRotation = rotation;

    function easeOutCubic(t: number) {
      return 1 - Math.pow(1 - t, 3);
    }

    const animate = () => {
      const now = Date.now();
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      const easedT = easeOutCubic(t);
      const current = initialRotation + easedT * (finalRotation - initialRotation);
      setRotation(current);

      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        setSpinning(false);
        setRotation(current % (2 * Math.PI));
        let result: 'win' | 'lose' = 'lose';
        if (
          config.mode === 'instant_winner' &&
          (!config.maxWinners || (config.winnersCount ?? 0) < config.maxWinners)
        ) {
          result = Math.random() < (config.winProbability ?? 0) ? 'win' : 'lose';
        }
        if (typeof onFinish === 'function') onFinish(result);
      }
    };
    animate();
  };

  useEffect(() => {
    drawWheel();
  }, [segments, rotation, centerImage, theme, borderColor, pointerColor, gameSize]);

  if (segments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <p className="text-lg font-medium">Configuration de la roue requise</p>
        <p className="text-sm text-gray-400 mt-1">Ajoutez des segments dans l'onglet "Contenu et apparence"</p>
      </div>
    );
  }

  const containerSize = Math.min(gameSize.width, gameSize.height);

  return (
    <div 
      className="flex flex-col items-center gap-6 p-4"
      style={{
        transform: `translate(${gamePosition.x}px, ${gamePosition.y}px)`,
        maxWidth: '100%',
        overflow: 'visible'
      }}
    >
      <div 
        style={{ 
          position: 'relative', 
          width: containerSize, 
          height: containerSize,
          maxWidth: '100%',
          maxHeight: '100%'
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            zIndex: 1,
            width: '100%',
            height: '100%',
            objectFit: 'contain'
          }}
          className="rounded-full shadow-lg"
        />
        {theme !== 'default' && wheelDecorByTheme[theme] && (
          <img
            src={wheelDecorByTheme[theme]}
            alt={`Décor roue ${theme}`}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: '100%',
              height: '100%',
              zIndex: 2,
              pointerEvents: 'none',
              objectFit: 'contain'
            }}
            draggable={false}
          />
        )}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '-12px',
            width: Math.max(20, containerSize / 20),
            height: Math.max(30, containerSize / 15),
            zIndex: 3,
            pointerEvents: 'none',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            transform: 'translateX(-50%)'
          }}
        >
          <svg width={Math.max(20, containerSize / 20)} height={Math.max(30, containerSize / 15)}>
            <polygon
              points={`${Math.max(10, containerSize / 40)},${Math.max(30, containerSize / 15)} ${Math.max(18, containerSize / 22)},${Math.max(10, containerSize / 40)} ${Math.max(2, containerSize / 200)},${Math.max(10, containerSize / 40)}`}
              fill={pointerColor}
              stroke="#fff"
              strokeWidth="2"
              style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.20))' }}
            />
          </svg>
        </div>
      </div>
      <button
        onClick={spinWheel}
        disabled={spinning}
        className="px-8 py-3 bg-[#841b60] text-white rounded-lg disabled:opacity-50 hover:bg-[#6d164f] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none font-medium"
        style={{
          fontSize: Math.max(14, containerSize / 30),
          minWidth: Math.max(120, containerSize / 4)
        }}
      >
        {spinning ? 'Tourne...' : 'Lancer la roue'}
      </button>
    </div>
  );
};

export default WheelPreview;
