
import React, { useState, useRef, useEffect } from 'react';
import Modal from '../common/Modal';
import ValidationMessage from '../common/ValidationMessage';
import DynamicContactForm, { FieldConfig } from '../forms/DynamicContactForm';
import { useParticipations } from '../../hooks/useParticipations';
import { useGameSize } from '../../hooks/useGameSize';

interface Segment {
  label: string;
  color?: string;
  image?: string | null;
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
  previewDevice?: 'desktop' | 'tablet' | 'mobile';
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
  gamePosition = 'center',
  previewDevice = 'desktop'
}) => {
  const segments = campaign?.config?.roulette?.segments || [];
  const centerImage = campaign?.config?.roulette?.centerImage;
  const centerLogo = campaign?.design?.centerLogo;
  const theme = campaign?.config?.roulette?.theme || 'default';
  
  // Utiliser les couleurs personnalisées du store QuickCampaign ou valeurs par défaut
  const customColors = campaign?.design?.customColors;
  const borderColor = campaign?.config?.roulette?.borderColor || customColors?.primary || '#841b60';
  const pointerColor = campaign?.config?.roulette?.pointerColor || customColors?.primary || '#841b60';
  
  // Get button configuration from campaign with custom colors
  const buttonConfig = campaign?.buttonConfig || {
    color: customColors?.primary || '#841b60',
    borderColor: customColors?.primary || '#841b60',
    borderWidth: 1,
    borderRadius: 8,
    size: 'medium',
    link: '',
    visible: true,
    text: 'Remplir le formulaire'
  };
  
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [formValidated, setFormValidated] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showValidationMessage, setShowValidationMessage] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { getGameDimensions } = useGameSize(gameSize);
  const gameDimensions = getGameDimensions();
  
  // Check if we're on mobile/tablet and position is left/right for 50% cropping
  const isMobileTablet = previewDevice === 'mobile' || previewDevice === 'tablet';
  const isLeftRightPosition = gamePosition === 'left' || gamePosition === 'right';
  const shouldCropWheel = isMobileTablet && isLeftRightPosition;
  
  // Adjust canvas and container sizes for cropping
  const baseCanvasSize = Math.min(gameDimensions.width, gameDimensions.height) - 60;
  const canvasSize = baseCanvasSize;
  const containerWidth = shouldCropWheel ? baseCanvasSize * 0.5 : baseCanvasSize;
  
  // Taille du pointeur proportionnelle
  const pointerSize = Math.max(30, canvasSize * 0.08);

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
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px',
      zIndex: 10
    };

    const safeMargin = 20;

    switch (gamePosition) {
      case 'top':
        return { 
          ...containerStyle, 
          flexDirection: 'column-reverse' as const,
          top: `${safeMargin}px`, 
          left: '50%', 
          transform: 'translateX(-50%)',
          width: `${gameDimensions.width}px`,
          height: `${gameDimensions.height}px`
        };
      case 'bottom':
        return { 
          ...containerStyle, 
          flexDirection: 'column' as const,
          bottom: `${safeMargin}px`, 
          left: '50%', 
          transform: 'translateX(-50%)',
          width: `${gameDimensions.width}px`,
          height: `${gameDimensions.height}px`
        };
      case 'left':
        return { 
          ...containerStyle, 
          flexDirection: shouldCropWheel ? 'row-reverse' as const : 'row' as const,
          left: shouldCropWheel ? '0px' : `${safeMargin}px`, 
          top: '50%', 
          transform: 'translateY(-50%)',
          width: `${gameDimensions.width}px`,
          height: `${gameDimensions.height}px`
        };
      case 'right':
        return { 
          ...containerStyle, 
          flexDirection: shouldCropWheel ? 'row' as const : 'row-reverse' as const,
          right: shouldCropWheel ? '0px' : `${safeMargin}px`, 
          top: '50%', 
          transform: 'translateY(-50%)',
          width: `${gameDimensions.width}px`,
          height: `${gameDimensions.height}px`
        };
      default: // center
        return { 
          ...containerStyle, 
          flexDirection: 'column' as const,
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)',
          width: `${gameDimensions.width}px`,
          height: `${gameDimensions.height}px`
        };
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
    if (buttonConfig.link && !formValidated) {
      window.open(buttonConfig.link, '_blank');
      return;
    }

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
    const radius = center - 40;
    const total = segments.length;
    const anglePerSlice = (2 * Math.PI) / total;
    
    // Use custom colors or fallback to theme colors
    const themeColors = customColors ? 
      [customColors.primary, customColors.secondary, customColors.accent || '#10b981'] :
      getThemeColors(theme);

    ctx.clearRect(0, 0, size, size);

    // Draw outer golden border
    ctx.beginPath();
    ctx.arc(center, center, radius + 15, 0, 2 * Math.PI);
    ctx.lineWidth = 8;
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, '#FFD700');
    gradient.addColorStop(0.5, '#FFA500');
    gradient.addColorStop(1, '#B8860B');
    ctx.strokeStyle = gradient;
    ctx.stroke();

    // Draw inner border
    ctx.beginPath();
    ctx.arc(center, center, radius + 8, 0, 2 * Math.PI);
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#8B4513';
    ctx.stroke();

    segments.forEach((seg: Segment, i: number) => {
      const startAngle = i * anglePerSlice + rotation;
      const endAngle = startAngle + anglePerSlice;

      // Draw segment
      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(center, center, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = seg.color || themeColors[i % themeColors.length];
      ctx.fill();

      // Draw golden separator lines
      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.lineTo(
        center + radius * Math.cos(startAngle),
        center + radius * Math.sin(startAngle)
      );
      ctx.strokeStyle = '#FFD700';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw text with better styling
      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(startAngle + anglePerSlice / 2);
      ctx.textAlign = 'center';
      ctx.fillStyle = 'white';
      ctx.font = `bold ${Math.max(12, size * 0.04)}px Arial`;
      ctx.strokeStyle = 'rgba(0,0,0,0.5)';
      ctx.lineWidth = 2;
      ctx.strokeText(seg.label, radius - 50, 5);
      ctx.fillText(seg.label, radius - 50, 5);
      ctx.restore();

      if (seg.image) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          const angle = startAngle + anglePerSlice / 2;
          const distance = radius - 40;
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

    // Draw center circle with golden border
    const centerRadius = 35;
    const logoToDisplay = centerLogo || centerImage;
    
    // Golden center border
    ctx.beginPath();
    ctx.arc(center, center, centerRadius + 5, 0, 2 * Math.PI);
    ctx.fillStyle = gradient;
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
      ctx.strokeStyle = '#FFD700';
      ctx.lineWidth = 3;
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
  }, [segments, rotation, centerImage, centerLogo, theme, borderColor, pointerColor, canvasSize, customColors]);

  if (segments.length === 0) {
    return (
      <div style={getAbsolutePositionStyles()}>
        <p>Aucun segment configuré pour la roue</p>
      </div>
    );
  }

  const getButtonSizeClasses = () => {
    switch (buttonConfig.size) {
      case 'small':
        return 'px-3 py-1 text-sm';
      case 'large':
        return 'px-8 py-4 text-lg';
      default:
        return 'px-6 py-3 text-base';
    }
  };

  return (
    <div style={getAbsolutePositionStyles()}>
      <div style={{ 
        position: 'relative', 
        width: containerWidth, 
        height: canvasSize,
        overflow: shouldCropWheel ? 'hidden' : 'visible'
      }}>
        {/* Enhanced shadow with golden glow */}
        <div 
          style={{
            position: 'absolute',
            width: canvasSize - 10,
            height: canvasSize - 10,
            left: shouldCropWheel ? (gamePosition === 'left' ? '5px' : `-${canvasSize * 0.5 + 5}px`) : '5px',
            top: '10px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,215,0,0.3) 0%, rgba(255,215,0,0.1) 50%, rgba(0,0,0,0.2) 100%)',
            filter: 'blur(15px)',
            zIndex: 0
          }}
        />
        
        {/* Canvas */}
        <canvas
          ref={canvasRef}
          width={canvasSize}
          height={canvasSize}
          style={{
            position: 'absolute',
            left: shouldCropWheel ? (gamePosition === 'left' ? '0px' : `-${canvasSize * 0.5}px`) : '0px',
            top: 0,
            zIndex: 1
          }}
          className="rounded-full"
        />
        
        {/* Theme decoration */}
        {theme !== 'default' && wheelDecorByTheme[theme] && (
          <img
            src={wheelDecorByTheme[theme]}
            alt={`Décor roue ${theme}`}
            style={{
              position: 'absolute',
              left: shouldCropWheel ? (gamePosition === 'left' ? '0px' : `-${canvasSize * 0.5}px`) : '0px',
              top: 0,
              width: canvasSize,
              height: canvasSize,
              zIndex: 2,
              pointerEvents: 'none',
            }}
            draggable={false}
          />
        )}
        
        {/* Enhanced Pointer with golden styling */}
        <div
          style={{
            position: 'absolute',
            left: (shouldCropWheel ? (gamePosition === 'left' ? 0 : -canvasSize * 0.5) : canvasSize / 2) + canvasSize / 2 - pointerSize / 2,
            top: -pointerSize * 0.7,
            width: pointerSize,
            height: pointerSize * 1.6,
            zIndex: 3,
            pointerEvents: 'none',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          <svg width={pointerSize} height={pointerSize * 1.6}>
            <defs>
              <linearGradient id="pointerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFD700" />
                <stop offset="50%" stopColor="#FFA500" />
                <stop offset="100%" stopColor="#B8860B" />
              </linearGradient>
            </defs>
            <polygon
              points={`${pointerSize/2},${pointerSize*1.6} ${pointerSize*0.85},${pointerSize*0.4} ${pointerSize*0.15},${pointerSize*0.4}`}
              fill="url(#pointerGradient)"
              stroke="#8B4513"
              strokeWidth="2"
              style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }}
            />
          </svg>
        </div>

        {/* Click overlay for non-validated form */}
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

      {/* Enhanced button with golden styling */}
      {buttonConfig.visible && (
        <button
          onClick={handleWheelClick}
          disabled={spinning || disabled}
          style={{
            background: `linear-gradient(45deg, ${buttonConfig.color}, ${buttonConfig.color}dd)`,
            borderColor: '#FFD700',
            borderWidth: '2px',
            borderRadius: `${buttonConfig.borderRadius}px`,
            borderStyle: 'solid',
            boxShadow: '0 4px 15px rgba(255, 215, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
          }}
          className={`${getButtonSizeClasses()} text-white font-bold disabled:opacity-50 hover:opacity-90 transition-all duration-200 relative overflow-hidden`}
        >
          <span className="relative z-10">
            {spinning ? 'Tourne...' : formValidated ? 'Lancer la roue' : (buttonConfig.text || 'Remplir le formulaire')}
          </span>
          <div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"
            style={{ transform: 'skewX(-15deg)' }}
          />
        </button>
      )}

      {/* Form modal */}
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
