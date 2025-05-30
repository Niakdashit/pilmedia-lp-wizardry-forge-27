
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

const CANVAS_SIZE = 400;

const WheelPreview: React.FC<WheelPreviewProps> = ({
  campaign,
  config,
  onFinish
}) => {
  const segments = campaign?.config?.roulette?.segments || [];
  const centerImage = campaign?.config?.roulette?.centerImage;
  const theme = campaign?.config?.roulette?.theme || 'default';
  const borderColor = campaign?.config?.roulette?.borderColor || '#841b60';
  const pointerColor = campaign?.config?.roulette?.pointerColor || '#841b60';
  
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawWheel = () => {
    const canvas = canvasRef.current;
    if (!canvas || segments.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = canvas.width;
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
          const imgSize = 60;
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
      ctx.font = 'bold 14px Arial';
      ctx.fillText(seg.label, radius - 20, 5);
      ctx.restore();
    });

    // Centre image
    if (centerImage) {
      const img = new Image();
      img.onload = () => {
        ctx.save();
        ctx.beginPath();
        ctx.arc(center, center, 40, 0, 2 * Math.PI);
        ctx.clip();
        ctx.drawImage(img, center - 40, center - 40, 80, 80);
        ctx.restore();
      };
      img.src = URL.createObjectURL(centerImage);
    } else {
      ctx.beginPath();
      ctx.arc(center, center, 40, 0, 2 * Math.PI);
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
  }, [segments, rotation, centerImage, theme, borderColor, pointerColor]);

  if (segments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-gray-500">
        <p>Aucun segment configuré pour la roue</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div style={{ position: 'relative', width: CANVAS_SIZE, height: CANVAS_SIZE }}>
        <canvas
          ref={canvasRef}
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          style={{
            position: 'absolute',
            left: 0,
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
              left: 0,
              top: 0,
              width: CANVAS_SIZE,
              height: CANVAS_SIZE,
              zIndex: 2,
              pointerEvents: 'none',
            }}
            draggable={false}
          />
        )}
        <div
          style={{
            position: 'absolute',
            left: CANVAS_SIZE / 2 - 20,
            top: -25,
            width: 40,
            height: 60,
            zIndex: 3,
            pointerEvents: 'none',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          <svg width="40" height="60">
            <polygon
              points="20,60 36,20 4,20"
              fill={pointerColor}
              stroke="#fff"
              strokeWidth="2"
              style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.10))' }}
            />
          </svg>
        </div>
      </div>
      <button
        onClick={spinWheel}
        disabled={spinning}
        className="px-6 py-3 bg-[#841b60] text-white rounded-lg disabled:opacity-50 hover:bg-[#6d164f] transition-colors shadow-lg"
      >
        {spinning ? 'Tourne...' : 'Lancer la roue'}
      </button>
    </div>
  );
};

export default WheelPreview;
