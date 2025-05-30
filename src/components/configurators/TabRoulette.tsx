import React, { useState, useRef, useEffect } from 'react';
import ResizableGameContainer from '../common/ResizableGameContainer';

interface Segment {
  label: string;
  chance: number;
  color?: string;
  image?: File | null;
}

interface TabRouletteProps {
  campaign: any;
  setCampaign: React.Dispatch<React.SetStateAction<any>>;
}

const getThemeColors = (theme: string): string[] => {
  switch (theme) {
    case 'promo':
      return ['#FFD700', '#841b60', '#FF6F61'];
    case 'food':
      return ['#f4d35e', '#ee964b', '#e63946'];
    case 'casino':
      return ['#000000', '#FFD700', '#FF0000'];
    case 'child':
      return ['#fcd5ce', '#cdb4db', '#b5ead7'];
    case 'gaming':
      return ['#1f1f2e', '#841bff', '#13aae2'];
    case 'luxury':
      return ['#0d0d0d', '#d4af37', '#ffffff'];
    case 'halloween':
      return ['#ff7518', '#1b1b1b', '#fffacd'];
    case 'noel':
      return ['#e74c3c', '#27ae60', '#fff'];
    default:
      return ['#f9e5e5', '#dbeaff', '#e8f9e6', '#fff1e6', '#e6ffe6'];
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

const TabRoulette: React.FC<TabRouletteProps> = ({
  campaign,
  setCampaign
}) => {
  const [segments, setSegments] = useState<Segment[]>(campaign?.config?.roulette?.segments || []);
  const [centerImage, setCenterImage] = useState<File | null>(null);
  const [rotation] = useState(0);
  const [desiredCount, setDesiredCount] = useState<number>(segments.length);
  const [theme, setTheme] = useState<'default' | 'promo' | 'food' | 'casino' | 'child' | 'gaming' | 'luxury' | 'halloween' | 'noel'>(
    campaign?.config?.roulette?.theme || 'default'
  );
  const [borderColor, setBorderColor] = useState<string>(campaign?.config?.roulette?.borderColor || '#841b60');
  const [pointerColor, setPointerColor] = useState<string>(campaign?.config?.roulette?.pointerColor || '#841b60');
  const [gameSize, setGameSize] = useState({ width: 400, height: 400 });
  const [gamePosition, setGamePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const updateCampaign = (newSegments: Segment[], center: File | null, newTheme?: string, newBorderColor?: string, newPointerColor?: string) => {
    setSegments(newSegments);
    setCenterImage(center);
    
    setCampaign((prev: any) => ({
      ...prev,
      config: {
        ...prev.config,
        roulette: {
          ...prev.config?.roulette,
          segments: newSegments,
          centerImage: center || null,
          theme: newTheme || theme,
          borderColor: newBorderColor || borderColor,
          pointerColor: newPointerColor || pointerColor,
          gameSize,
          gamePosition
        }
      }
    }));
  };

  const handleSegmentChange = (index: number, field: keyof Segment, value: string | number) => {
    const updated = [...segments];
    if (field === 'chance') {
      (updated[index] as any)[field] = value as number;
    } else if (field === 'label' || field === 'color') {
      (updated[index] as any)[field] = value as string;
    }
    updateCampaign(updated, centerImage);
  };

  const handleImageUpload = (index: number, file: File | null) => {
    const updated = [...segments];
    updated[index].image = file;
    updateCampaign(updated, centerImage);
  };

  const addSegment = () => {
    const themeColors = getThemeColors(theme);
    const newSegment: Segment = {
      label: '',
      chance: 0,
      color: themeColors[segments.length % themeColors.length],
      image: null
    };
    const newSegments = [...segments, newSegment];
    updateCampaign(newSegments, centerImage);
    setDesiredCount(newSegments.length);
  };

  const removeSegment = (index: number) => {
    const newSegments = segments.filter((_, i) => i !== index);
    updateCampaign(newSegments, centerImage);
    setDesiredCount(newSegments.length);
  };

  const setSegmentCount = (count: number) => {
    const newSegments: Segment[] = [];
    const themeColors = getThemeColors(theme);
    
    for (let i = 0; i < count; i++) {
      newSegments.push(segments[i] || {
        label: '',
        chance: 0,
        color: themeColors[i % themeColors.length],
        image: null
      });
    }
    updateCampaign(newSegments, centerImage);
    setDesiredCount(count);
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme as any);
    updateCampaign(segments, centerImage, newTheme);
  };

  const handleBorderColorChange = (newBorderColor: string) => {
    setBorderColor(newBorderColor);
    updateCampaign(segments, centerImage, theme, newBorderColor);
  };

  const handlePointerColorChange = (newPointerColor: string) => {
    setPointerColor(newPointerColor);
    updateCampaign(segments, centerImage, theme, borderColor, newPointerColor);
  };

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
    const anglePerSlice = 2 * Math.PI / total;
    const themeColors = getThemeColors(theme);

    ctx.clearRect(0, 0, size, size);

    if (theme === 'default') {
      ctx.beginPath();
      ctx.arc(center, center, radius + 8, 0, 2 * Math.PI);
      ctx.lineWidth = 10;
      ctx.strokeStyle = borderColor;
      ctx.stroke();
    }

    segments.forEach((seg, i) => {
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
      ctx.font = 'bold 16px Arial';
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

  useEffect(() => {
    drawWheel();
  }, [segments, rotation, centerImage, theme, borderColor, pointerColor, gameSize]);

  return (
    <div className="space-y-8">
      {/* Configuration Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Couleur de la bordure</label>
          <input
            type="color"
            value={borderColor}
            onChange={(e) => handleBorderColorChange(e.target.value)}
            className="w-full h-10 rounded border"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Couleur du curseur</label>
          <input
            type="color"
            value={pointerColor}
            onChange={(e) => handlePointerColorChange(e.target.value)}
            className="w-full h-10 rounded border"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Thème visuel de la roue</label>
        <select
          value={theme}
          onChange={(e) => handleThemeChange(e.target.value)}
          className="border p-2 rounded w-full md:w-1/2"
        >
          <option value="default">Classique pâle</option>
          <option value="promo">Promo & Cadeaux</option>
          <option value="food">Restauration</option>
          <option value="casino">Casino</option>
          <option value="child">Enfant</option>
          <option value="gaming">Gaming</option>
          <option value="luxury">Luxe</option>
          <option value="halloween">Halloween</option>
          <option value="noel">Noël</option>
        </select>
      </div>

      {/* Aperçu redimensionnable de la roue */}
      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Aperçu et positionnement de la roue</h3>
        <div className="bg-gray-50 p-8 rounded-lg">
          <ResizableGameContainer
            initialSize={gameSize}
            onSizeChange={(size) => {
              setGameSize(size);
              updateCampaign(segments, centerImage, theme, borderColor, pointerColor);
            }}
            onPositionChange={(position) => {
              setGamePosition(position);
              updateCampaign(segments, centerImage, theme, borderColor, pointerColor);
            }}
            lockAspectRatio={true}
            className="mx-auto"
          >
            <div className="relative w-full h-full">
              <canvas
                ref={canvasRef}
                className="w-full h-full rounded-full shadow-lg"
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
              />
              {theme !== 'default' && wheelDecorByTheme[theme] && (
                <img
                  src={wheelDecorByTheme[theme]}
                  alt={`Décor roue ${theme}`}
                  className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                  style={{ zIndex: 2 }}
                />
              )}
              {/* Pointer */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2" style={{ zIndex: 3 }}>
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
          </ResizableGameContainer>
        </div>
      </div>

      {/* Segment Configuration */}
      <h2 className="text-lg font-semibold">Paramètres des segments</h2>

      <div className="flex items-center gap-4">
        <label className="text-sm font-medium">Nombre de segments :</label>
        <input
          type="number"
          value={desiredCount}
          onChange={(e) => setSegmentCount(Number(e.target.value))}
          className="border p-2 rounded w-24"
          min={1}
          max={30}
        />
        <button
          onClick={addSegment}
          className="bg-[#841b60] text-white px-4 py-2 rounded shadow hover:bg-[#6d164f] transition-colors"
        >
          + Ajouter un segment
        </button>
      </div>

      {segments.map((seg, index) => (
        <div key={index} className="flex flex-col md:flex-row items-start md:items-center gap-3 border p-4 rounded-lg bg-white shadow-sm">
          <input
            type="text"
            placeholder="Nom du segment"
            value={seg.label}
            onChange={(e) => handleSegmentChange(index, 'label', e.target.value)}
            className="border p-2 rounded w-full md:w-1/4"
          />
          <input
            type="number"
            placeholder="Chance (%)"
            value={seg.chance}
            onChange={(e) => handleSegmentChange(index, 'chance', Number(e.target.value))}
            className="border p-2 rounded w-full md:w-1/6"
          />
          <input
            type="color"
            value={seg.color || '#841b60'}
            onChange={(e) => handleSegmentChange(index, 'color', e.target.value)}
            className="w-10 h-10 border rounded"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(index, e.target.files?.[0] || null)}
            className="border p-2 rounded w-full md:w-1/4"
          />
          <button
            onClick={() => removeSegment(index)}
            className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 transition-colors"
          >
            Supprimer
          </button>
        </div>
      ))}
    </div>
  );
};

export default TabRoulette;
