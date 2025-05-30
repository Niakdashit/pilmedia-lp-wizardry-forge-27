import React, { useState, useRef, useEffect } from 'react';
import Modal from '../common/Modal';
import ValidationMessage from '../common/ValidationMessage';
import DynamicContactForm, { FieldConfig } from '../forms/DynamicContactForm';
import { useParticipations } from '../../hooks/useParticipations';
import { useGameSize } from '../../hooks/useGameSize';

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
  disabled?: boolean;
  onStart?: () => void;
  gameSize?: 'small' | 'medium' | 'large' | 'xlarge';
  gamePosition?: 'top' | 'center' | 'bottom' | 'left' | 'right';
}

const DEFAULT_FIELDS: FieldConfig[] = [
  { id: "civilite", label: "Civilité", type: "select", options: ["M.", "Mme"], required: false },
  { id: "prenom", label: "Prénom", required: true },
  { id: "nom", label: "Nom", required: true },
  { id: "email", label: "Email", type: "email", required: true }
];

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
  onFinish,
  disabled = false,
  onStart,
  gameSize = 'small',
  gamePosition = 'center'
}) => {
  const segments = campaign?.config?.roulette?.segments || [];
  const centerImage = campaign?.config?.roulette?.centerImage;
  const theme = campaign?.config?.roulette?.theme || 'default';
  const borderColor = campaign?.config?.roulette?.borderColor || '#841b60';
  const pointerColor = campaign?.config?.roulette?.pointerColor || '#841b60';
  
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [formValidated, setFormValidated] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showValidationMessage, setShowValidationMessage] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { getGameDimensions } = useGameSize(gameSize);
  const gameDimensions = getGameDimensions();
  
  // Calculer la taille du canvas en fonction de la plus petite dimension
  const canvasSize = Math.min(gameDimensions.width, gameDimensions.height) - 60;

  const {
    createParticipation,
    loading: participationLoading
  } = useParticipations();

  const fields: FieldConfig[] = Array.isArray(campaign.formFields) && campaign.formFields.length > 0
    ? campaign.formFields : DEFAULT_FIELDS;

  // Get absolute position styles based on gamePosition
  const getAbsolutePositionStyles = () => {
    const containerStyle: React.CSSProperties = {
      position: 'absolute',
      width: `${gameDimensions.width}px`,
      height: `${gameDimensions.height}px`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px'
    };

    switch (gamePosition) {
      case 'top':
        return { ...containerStyle, top: '20px', left: '50%', transform: 'translateX(-50%)' };
      case 'bottom':
        return { ...containerStyle, bottom: '20px', left: '50%', transform: 'translateX(-50%)' };
      case 'left':
        return { ...containerStyle, left: '20px', top: '50%', transform: 'translateY(-50%)' };
      case 'right':
        return { ...containerStyle, right: '20px', top: '50%', transform: 'translateY(-50%)' };
      default: // center
        return { ...containerStyle, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
    }
  };

  const handleFormSubmit = async (formData: Record<string, string>) => {
    if (campaign.id) {
      await createParticipation({
        campaign_id: campaign.id,
        form_data: formData,
        user_email: formData.email
      });
    }
    setShowFormModal(false);
    setFormValidated(true);
    setShowValidationMessage(true);
    setTimeout(() => setShowValidationMessage(false), 1500);
  };

  const handleWheelClick = () => {
    if (!formValidated) {
      setShowFormModal(true);
      return;
    }
    spinWheel();
  };

  const drawWheel = () => {
    const canvas = canvasRef.current;
    if (!canvas || segments.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = canvas.width;
    const center = size / 2;
    const radius = center - 30; // Marge fixe de 30px
    const total = segments.length;
    const anglePerSlice = (2 * Math.PI) / total;
    const themeColors = getThemeColors(theme);

    ctx.clearRect(0, 0, size, size);

    // Bordure externe avec largeur fixe
    if (theme === 'default') {
      ctx.beginPath();
      ctx.arc(center, center, radius + 8, 0, 2 * Math.PI);
      ctx.lineWidth = 10; // Largeur fixe comme demandé
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
          const imgSize = Math.max(40, size * 0.15); // Taille d'image proportionnelle
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
      ctx.font = `bold ${Math.max(10, size * 0.035)}px Arial`; // Taille de police proportionnelle
      ctx.fillText(seg.label, radius - 20, 5);
      ctx.restore();
    });

    // Cercle central avec taille fixe
    const centerRadius = 25; // Taille fixe
    if (centerImage) {
      const img = new Image();
      img.onload = () => {
        ctx.save();
        ctx.beginPath();
        ctx.arc(center, center, centerRadius, 0, 2 * Math.PI);
        ctx.clip();
        ctx.drawImage(img, center - centerRadius, center - centerRadius, centerRadius * 2, centerRadius * 2);
        ctx.restore();
      };
      img.src = URL.createObjectURL(centerImage);
    } else {
      ctx.beginPath();
      ctx.arc(center, center, centerRadius, 0, 2 * Math.PI);
      ctx.fillStyle = '#fff';
      ctx.fill();
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 2; // Largeur fixe comme demandé
      ctx.stroke();
    }
  };

  const spinWheel = () => {
    if (spinning || segments.length === 0 || disabled) return;
    setSpinning(true);

    if (onStart) onStart();

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
  }, [segments, rotation, centerImage, theme, borderColor, pointerColor, canvasSize]);

  if (segments.length === 0) {
    return (
      <div style={getAbsolutePositionStyles()}>
        <p>Aucun segment configuré pour la roue</p>
      </div>
    );
  }

  // Taille du pointeur proportionnelle
  const pointerSize = Math.max(30, canvasSize * 0.08);

  return (
    <div style={getAbsolutePositionStyles()}>
      <div style={{ position: 'relative', width: canvasSize, height: canvasSize }}>
        {/* Conteneur pour l'ombre */}
        <div 
          style={{
            position: 'absolute',
            width: canvasSize,
            height: canvasSize,
            borderRadius: '50%',
            boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
            zIndex: 0
          }}
        />
        
        <canvas
          ref={canvasRef}
          width={canvasSize}
          height={canvasSize}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            zIndex: 1
          }}
          className="rounded-full"
        />
        
        {theme !== 'default' && wheelDecorByTheme[theme] && (
          <img
            src={wheelDecorByTheme[theme]}
            alt={`Décor roue ${theme}`}
            style={{
              position: 'absolute',
              left: 0,
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
            left: canvasSize / 2 - pointerSize / 2,
            top: -pointerSize * 0.6,
            width: pointerSize,
            height: pointerSize * 1.5,
            zIndex: 3,
            pointerEvents: 'none',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          <svg width={pointerSize} height={pointerSize * 1.5}>
            <polygon
              points={`${pointerSize/2},${pointerSize*1.5} ${pointerSize*0.9},${pointerSize*0.5} ${pointerSize*0.1},${pointerSize*0.5}`}
              fill={pointerColor}
              stroke="#fff"
              strokeWidth="2"
              style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.10))' }}
            />
          </svg>
        </div>

        {/* Overlay clickable si formulaire non validé */}
        {!formValidated && (
          <div 
            onClick={handleWheelClick}
            className="absolute inset-0 flex items-center justify-center z-30 rounded-full cursor-pointer bg-black/0" 
          />
        )}

        <ValidationMessage
          show={showValidationMessage}
          message="Formulaire validé ! Vous pouvez maintenant jouer."
          type="success"
        />
      </div>

      <button
        onClick={handleWheelClick}
        disabled={spinning || disabled}
        className="px-6 py-3 bg-[#841b60] text-white rounded-lg disabled:opacity-50 hover:bg-[#6d164f] transition-colors shadow-lg"
        style={{
          fontSize: Math.max(14, canvasSize * 0.04) + 'px',
          padding: `${Math.max(8, canvasSize * 0.02)}px ${Math.max(16, canvasSize * 0.04)}px`
        }}
      >
        {spinning ? 'Tourne...' : formValidated ? 'Lancer la roue' : 'Remplir le formulaire'}
      </button>

      {showFormModal && (
        <Modal
          onClose={() => setShowFormModal(false)}
          title={campaign.screens?.[1]?.title || 'Vos informations'}
          contained={true}
        >
          <DynamicContactForm
            fields={fields}
            submitLabel={participationLoading ? 'Chargement...' : campaign.screens?.[1]?.buttonText || "C'est parti !"}
            onSubmit={handleFormSubmit}
          />
        </Modal>
      )}
    </div>
  );
};

export default WheelPreview;
