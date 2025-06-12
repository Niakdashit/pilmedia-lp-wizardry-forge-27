
interface WheelBorderDrawerProps {
  ctx: CanvasRenderingContext2D;
  center: number;
  radius: number;
}

export const drawWheelBorders = ({
  ctx,
  center,
  radius
}: WheelBorderDrawerProps) => {
  ctx.save();

  // Ombre portée très réaliste et profonde
  ctx.beginPath();
  ctx.arc(center + 15, center + 20, radius + 40, 0, 2 * Math.PI);
  const shadowGradient = ctx.createRadialGradient(
    center + 8, center + 10, 0,
    center + 15, center + 20, radius + 40
  );
  shadowGradient.addColorStop(0, 'rgba(0,0,0,0.6)');
  shadowGradient.addColorStop(0.2, 'rgba(0,0,0,0.4)');
  shadowGradient.addColorStop(0.5, 'rgba(0,0,0,0.2)');
  shadowGradient.addColorStop(0.8, 'rgba(0,0,0,0.1)');
  shadowGradient.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = shadowGradient;
  ctx.fill();

  // Première bordure externe - la plus large et dorée
  ctx.beginPath();
  ctx.arc(center, center, radius + 35, 0, 2 * Math.PI);
  ctx.lineWidth = 20;
  
  const outerBorderGradient = ctx.createLinearGradient(
    center - radius - 35, center - radius - 35,
    center + radius + 35, center + radius + 35
  );
  outerBorderGradient.addColorStop(0, '#FFFACD');
  outerBorderGradient.addColorStop(0.1, '#FFD700');
  outerBorderGradient.addColorStop(0.3, '#FFA500');
  outerBorderGradient.addColorStop(0.5, '#FF8C00');
  outerBorderGradient.addColorStop(0.7, '#DAA520');
  outerBorderGradient.addColorStop(0.9, '#B8860B');
  outerBorderGradient.addColorStop(1, '#8B4513');
  
  ctx.strokeStyle = outerBorderGradient;
  ctx.shadowColor = 'rgba(0,0,0,0.6)';
  ctx.shadowBlur = 20;
  ctx.shadowOffsetX = 10;
  ctx.shadowOffsetY = 15;
  ctx.stroke();

  // Deuxième bordure - argent/gris métallique
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  
  ctx.beginPath();
  ctx.arc(center, center, radius + 28, 0, 2 * Math.PI);
  ctx.lineWidth = 12;
  
  const silverBorderGradient = ctx.createLinearGradient(
    center - radius - 28, center - radius - 28,
    center + radius + 28, center + radius + 28
  );
  silverBorderGradient.addColorStop(0, '#F8F8FF');
  silverBorderGradient.addColorStop(0.2, '#E6E6FA');
  silverBorderGradient.addColorStop(0.4, '#D3D3D3');
  silverBorderGradient.addColorStop(0.6, '#C0C0C0');
  silverBorderGradient.addColorStop(0.8, '#A9A9A9');
  silverBorderGradient.addColorStop(1, '#808080');
  
  ctx.strokeStyle = silverBorderGradient;
  ctx.stroke();

  // Troisième bordure - dorée fine
  ctx.beginPath();
  ctx.arc(center, center, radius + 22, 0, 2 * Math.PI);
  ctx.lineWidth = 6;
  
  const midGoldGradient = ctx.createLinearGradient(
    center - radius - 22, center - radius - 22,
    center + radius + 22, center + radius + 22
  );
  midGoldGradient.addColorStop(0, '#FFFACD');
  midGoldGradient.addColorStop(0.3, '#FFD700');
  midGoldGradient.addColorStop(0.5, '#FFA500');
  midGoldGradient.addColorStop(0.7, '#DAA520');
  midGoldGradient.addColorStop(1, '#B8860B');
  
  ctx.strokeStyle = midGoldGradient;
  ctx.stroke();

  // Quatrième bordure - très fine dorée
  ctx.beginPath();
  ctx.arc(center, center, radius + 18, 0, 2 * Math.PI);
  ctx.lineWidth = 3;
  
  const innerGoldGradient = ctx.createLinearGradient(
    center - radius - 18, center - radius - 18,
    center + radius + 18, center + radius + 18
  );
  innerGoldGradient.addColorStop(0, '#FFF8DC');
  innerGoldGradient.addColorStop(0.5, '#FFD700');
  innerGoldGradient.addColorStop(1, '#DAA520');
  
  ctx.strokeStyle = innerGoldGradient;
  ctx.stroke();

  // Bordure finale - contour net
  ctx.beginPath();
  ctx.arc(center, center, radius + 15, 0, 2 * Math.PI);
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#B8860B';
  ctx.stroke();

  // Effet de brillance supérieure très marqué
  ctx.beginPath();
  ctx.arc(center, center - radius * 0.3, radius + 30, Math.PI * 0.8, Math.PI * 1.2);
  ctx.lineWidth = 8;
  const topShineGradient = ctx.createLinearGradient(
    center, center - radius - 30,
    center, center - radius * 0.1
  );
  topShineGradient.addColorStop(0, 'rgba(255,255,255,0.9)');
  topShineGradient.addColorStop(0.3, 'rgba(255,255,255,0.6)');
  topShineGradient.addColorStop(0.7, 'rgba(255,255,255,0.3)');
  topShineGradient.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.strokeStyle = topShineGradient;
  ctx.stroke();

  // Reflets métalliques multiples
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    const reflectRadius = radius + 32 - i * 3;
    const startAngle = Math.PI * (0.7 + i * 0.1);
    const endAngle = Math.PI * (1.3 - i * 0.1);
    ctx.arc(center - radius * 0.2, center - radius * 0.2, reflectRadius, startAngle, endAngle);
    ctx.lineWidth = 3 - i * 0.4;
    ctx.strokeStyle = `rgba(255,255,255,${0.8 - i * 0.15})`;
    ctx.stroke();
  }

  // Reflets latéraux pour l'effet 3D
  ctx.beginPath();
  ctx.arc(center + radius * 0.6, center, radius + 25, Math.PI * 0.3, Math.PI * 0.7);
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'rgba(255,255,255,0.4)';
  ctx.stroke();

  ctx.restore();
};
