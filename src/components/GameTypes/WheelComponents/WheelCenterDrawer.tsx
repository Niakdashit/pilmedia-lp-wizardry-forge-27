
interface WheelCenterDrawerProps {
  ctx: CanvasRenderingContext2D;
  center: number;
  size: number;
  centerImage?: string;
  centerLogo?: string;
  borderOutlineColor: string;
}

export const drawWheelCenter = ({
  ctx,
  center,
  size,
  centerImage,
  centerLogo,
  borderOutlineColor
}: WheelCenterDrawerProps) => {
  const centerRadius = 30;
  const logoToDisplay = centerLogo || centerImage;
  
  ctx.save();

  // Ombre portée du centre
  ctx.beginPath();
  ctx.arc(center + 3, center + 5, centerRadius + 8, 0, 2 * Math.PI);
  ctx.fillStyle = 'rgba(0,0,0,0.4)';
  ctx.fill();

  // Bordure dorée externe du centre
  ctx.beginPath();
  ctx.arc(center, center, centerRadius + 6, 0, 2 * Math.PI);
  const outerCenterGradient = ctx.createRadialGradient(
    center - centerRadius * 0.3, center - centerRadius * 0.3, 0,
    center, center, centerRadius + 6
  );
  outerCenterGradient.addColorStop(0, '#FFF8DC');
  outerCenterGradient.addColorStop(0.3, '#FFD700');
  outerCenterGradient.addColorStop(0.7, '#FFA500');
  outerCenterGradient.addColorStop(1, '#B8860B');
  ctx.fillStyle = outerCenterGradient;
  ctx.fill();

  // Bordure dorée intermédiaire
  ctx.beginPath();
  ctx.arc(center, center, centerRadius + 3, 0, 2 * Math.PI);
  const midCenterGradient = ctx.createRadialGradient(
    center - centerRadius * 0.2, center - centerRadius * 0.2, 0,
    center, center, centerRadius + 3
  );
  midCenterGradient.addColorStop(0, '#FFFACD');
  midCenterGradient.addColorStop(0.5, '#FFD700');
  midCenterGradient.addColorStop(1, '#DAA520');
  ctx.fillStyle = midCenterGradient;
  ctx.fill();
  
  // Centre principal
  if (logoToDisplay) {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      ctx.save();
      ctx.beginPath();
      ctx.arc(center, center, centerRadius, 0, 2 * Math.PI);
      ctx.clip();
      
      // Fond blanc pour le logo
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();
      
      ctx.drawImage(img, center - centerRadius, center - centerRadius, centerRadius * 2, centerRadius * 2);
      ctx.restore();
      
      // Reflet sur le logo
      ctx.beginPath();
      ctx.arc(center, center, centerRadius, 0, 2 * Math.PI);
      const logoShineGradient = ctx.createRadialGradient(
        center - centerRadius * 0.4, center - centerRadius * 0.4, 0,
        center, center, centerRadius
      );
      logoShineGradient.addColorStop(0, 'rgba(255,255,255,0.3)');
      logoShineGradient.addColorStop(0.6, 'rgba(255,255,255,0.1)');
      logoShineGradient.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = logoShineGradient;
      ctx.fill();
    };
    img.src = logoToDisplay;
  } else {
    // Centre blanc avec effet de profondeur
    ctx.beginPath();
    ctx.arc(center, center, centerRadius, 0, 2 * Math.PI);
    const whiteCenterGradient = ctx.createRadialGradient(
      center - centerRadius * 0.3, center - centerRadius * 0.3, 0,
      center, center, centerRadius
    );
    whiteCenterGradient.addColorStop(0, '#FFFFFF');
    whiteCenterGradient.addColorStop(0.7, '#F8F8F8');
    whiteCenterGradient.addColorStop(1, '#E0E0E0');
    ctx.fillStyle = whiteCenterGradient;
    ctx.fill();
  }

  // Bordure finale dorée
  ctx.beginPath();
  ctx.arc(center, center, centerRadius, 0, 2 * Math.PI);
  ctx.strokeStyle = '#FFD700';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Reflet final sur le centre
  ctx.beginPath();
  ctx.arc(center - centerRadius * 0.3, center - centerRadius * 0.3, centerRadius * 0.4, 0, 2 * Math.PI);
  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.fill();

  ctx.restore();
};
