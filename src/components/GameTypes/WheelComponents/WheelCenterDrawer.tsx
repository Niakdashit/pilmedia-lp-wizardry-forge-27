
interface WheelCenterDrawerProps {
  ctx: CanvasRenderingContext2D;
  center: number;
  centerImage?: string;
  centerLogo?: string;
}

export const drawWheelCenter = ({
  ctx,
  center,
  centerImage,
  centerLogo
}: WheelCenterDrawerProps) => {
  const centerRadius = 35;
  const logoToDisplay = centerLogo || centerImage;
  
  ctx.save();

  // Ombre portée du centre très marquée
  ctx.beginPath();
  ctx.arc(center + 4, center + 6, centerRadius + 12, 0, 2 * Math.PI);
  ctx.fillStyle = 'rgba(0,0,0,0.6)';
  ctx.fill();

  // Bordure dorée externe du centre - très épaisse
  ctx.beginPath();
  ctx.arc(center, center, centerRadius + 10, 0, 2 * Math.PI);
  const outerCenterGradient = ctx.createRadialGradient(
    center - centerRadius * 0.4, center - centerRadius * 0.4, 0,
    center, center, centerRadius + 10
  );
  outerCenterGradient.addColorStop(0, '#FFFACD');
  outerCenterGradient.addColorStop(0.2, '#FFD700');
  outerCenterGradient.addColorStop(0.4, '#FFA500');
  outerCenterGradient.addColorStop(0.6, '#FF8C00');
  outerCenterGradient.addColorStop(0.8, '#DAA520');
  outerCenterGradient.addColorStop(1, '#B8860B');
  ctx.fillStyle = outerCenterGradient;
  ctx.fill();

  // Bordure argentée intermédiaire
  ctx.beginPath();
  ctx.arc(center, center, centerRadius + 6, 0, 2 * Math.PI);
  const silverCenterGradient = ctx.createRadialGradient(
    center - centerRadius * 0.3, center - centerRadius * 0.3, 0,
    center, center, centerRadius + 6
  );
  silverCenterGradient.addColorStop(0, '#F8F8FF');
  silverCenterGradient.addColorStop(0.3, '#E6E6FA');
  silverCenterGradient.addColorStop(0.6, '#D3D3D3');
  silverCenterGradient.addColorStop(1, '#C0C0C0');
  ctx.fillStyle = silverCenterGradient;
  ctx.fill();

  // Bordure dorée fine
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
      
      // Reflet sur le logo très marqué
      ctx.beginPath();
      ctx.arc(center, center, centerRadius, 0, 2 * Math.PI);
      const logoShineGradient = ctx.createRadialGradient(
        center - centerRadius * 0.5, center - centerRadius * 0.5, 0,
        center, center, centerRadius
      );
      logoShineGradient.addColorStop(0, 'rgba(255,255,255,0.5)');
      logoShineGradient.addColorStop(0.4, 'rgba(255,255,255,0.3)');
      logoShineGradient.addColorStop(0.7, 'rgba(255,255,255,0.1)');
      logoShineGradient.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = logoShineGradient;
      ctx.fill();
    };
    img.src = logoToDisplay;
  } else {
    // Centre blanc avec effet de profondeur très marqué
    ctx.beginPath();
    ctx.arc(center, center, centerRadius, 0, 2 * Math.PI);
    const whiteCenterGradient = ctx.createRadialGradient(
      center - centerRadius * 0.4, center - centerRadius * 0.4, 0,
      center, center, centerRadius
    );
    whiteCenterGradient.addColorStop(0, '#FFFFFF');
    whiteCenterGradient.addColorStop(0.3, '#FAFAFA');
    whiteCenterGradient.addColorStop(0.6, '#F0F0F0');
    whiteCenterGradient.addColorStop(0.8, '#E8E8E8');
    whiteCenterGradient.addColorStop(1, '#D0D0D0');
    ctx.fillStyle = whiteCenterGradient;
    ctx.fill();
  }

  // Bordure finale dorée
  ctx.beginPath();
  ctx.arc(center, center, centerRadius, 0, 2 * Math.PI);
  ctx.strokeStyle = '#FFD700';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Reflet final sur le centre - très marqué
  ctx.beginPath();
  ctx.arc(center - centerRadius * 0.4, center - centerRadius * 0.4, centerRadius * 0.5, 0, 2 * Math.PI);
  ctx.fillStyle = 'rgba(255,255,255,0.7)';
  ctx.fill();

  // Reflet secondaire
  ctx.beginPath();
  ctx.arc(center - centerRadius * 0.2, center - centerRadius * 0.2, centerRadius * 0.3, 0, 2 * Math.PI);
  ctx.fillStyle = 'rgba(255,255,255,0.4)';
  ctx.fill();

  ctx.restore();
};
