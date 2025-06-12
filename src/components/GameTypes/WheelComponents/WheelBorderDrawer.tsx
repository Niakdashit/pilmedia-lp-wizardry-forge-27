
interface WheelBorderDrawerProps {
  ctx: CanvasRenderingContext2D;
  center: number;
  radius: number;
  borderColor: string;
  borderOutlineColor: string;
}

export const drawWheelBorders = ({
  ctx,
  center,
  radius,
  borderColor,
  borderOutlineColor
}: WheelBorderDrawerProps) => {
  ctx.save();

  // Ombre portée très marquée et réaliste
  ctx.beginPath();
  ctx.arc(center + 12, center + 18, radius + 35, 0, 2 * Math.PI);
  const shadowGradient = ctx.createRadialGradient(
    center + 5, center + 8, 0,
    center + 12, center + 18, radius + 35
  );
  shadowGradient.addColorStop(0, 'rgba(0,0,0,0.4)');
  shadowGradient.addColorStop(0.3, 'rgba(0,0,0,0.3)');
  shadowGradient.addColorStop(0.7, 'rgba(0,0,0,0.2)');
  shadowGradient.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = shadowGradient;
  ctx.fill();

  // Bordure externe principale - effet doré complexe
  ctx.beginPath();
  ctx.arc(center, center, radius + 28, 0, 2 * Math.PI);
  ctx.lineWidth = 16;
  
  const outerGoldGradient = ctx.createLinearGradient(
    center - radius - 28, center - radius - 28,
    center + radius + 28, center + radius + 28
  );
  outerGoldGradient.addColorStop(0, '#FFF8DC');
  outerGoldGradient.addColorStop(0.1, '#FFD700');
  outerGoldGradient.addColorStop(0.2, '#FFA500');
  outerGoldGradient.addColorStop(0.4, '#FF8C00');
  outerGoldGradient.addColorStop(0.6, '#DAA520');
  outerGoldGradient.addColorStop(0.8, '#B8860B');
  outerGoldGradient.addColorStop(1, '#8B4513');
  
  ctx.strokeStyle = outerGoldGradient;
  ctx.shadowColor = 'rgba(0,0,0,0.5)';
  ctx.shadowBlur = 15;
  ctx.shadowOffsetX = 8;
  ctx.shadowOffsetY = 12;
  ctx.stroke();

  // Deuxième bordure dorée
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  
  ctx.beginPath();
  ctx.arc(center, center, radius + 22, 0, 2 * Math.PI);
  ctx.lineWidth = 8;
  
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

  // Troisième bordure dorée fine
  ctx.beginPath();
  ctx.arc(center, center, radius + 18, 0, 2 * Math.PI);
  ctx.lineWidth = 4;
  
  const innerGoldGradient = ctx.createLinearGradient(
    center - radius - 18, center - radius - 18,
    center + radius + 18, center + radius + 18
  );
  innerGoldGradient.addColorStop(0, '#FFF8DC');
  innerGoldGradient.addColorStop(0.5, '#FFD700');
  innerGoldGradient.addColorStop(1, '#DAA520');
  
  ctx.strokeStyle = innerGoldGradient;
  ctx.stroke();

  // Bordure intérieure finale
  ctx.beginPath();
  ctx.arc(center, center, radius + 12, 0, 2 * Math.PI);
  ctx.lineWidth = 3;
  
  const finalBorderGradient = ctx.createLinearGradient(
    center - radius - 12, center - radius - 12,
    center + radius + 12, center + radius + 12
  );
  finalBorderGradient.addColorStop(0, '#FFFACD');
  finalBorderGradient.addColorStop(0.3, '#FFD700');
  finalBorderGradient.addColorStop(0.7, '#FFA500');
  finalBorderGradient.addColorStop(1, '#B8860B');
  
  ctx.strokeStyle = finalBorderGradient;
  ctx.stroke();

  // Effet de brillance sur le dessus
  ctx.beginPath();
  ctx.arc(center, center - radius * 0.4, radius + 25, 0, Math.PI, true);
  ctx.lineWidth = 6;
  const topShineGradient = ctx.createLinearGradient(
    center, center - radius - 25,
    center, center - radius * 0.2
  );
  topShineGradient.addColorStop(0, 'rgba(255,255,255,0.8)');
  topShineGradient.addColorStop(0.5, 'rgba(255,255,255,0.4)');
  topShineGradient.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.strokeStyle = topShineGradient;
  ctx.stroke();

  // Reflets métalliques
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    const reflectRadius = radius + 26 - i * 4;
    ctx.arc(center - radius * 0.3, center - radius * 0.3, reflectRadius, Math.PI * 0.8, Math.PI * 1.2);
    ctx.lineWidth = 2 - i * 0.5;
    ctx.strokeStyle = `rgba(255,255,255,${0.6 - i * 0.2})`;
    ctx.stroke();
  }

  ctx.restore();
};
