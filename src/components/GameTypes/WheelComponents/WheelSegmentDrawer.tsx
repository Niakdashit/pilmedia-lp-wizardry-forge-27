
interface WheelSegmentDrawerProps {
  ctx: CanvasRenderingContext2D;
  segments: any[];
  center: number;
  radius: number;
  rotation: number;
}

export const drawWheelSegments = ({
  ctx,
  segments,
  center,
  radius,
  rotation
}: WheelSegmentDrawerProps) => {
  if (segments.length === 0) return;

  const anglePerSegment = (2 * Math.PI) / segments.length;
  
  ctx.save();

  segments.forEach((segment, index) => {
    const startAngle = index * anglePerSegment + rotation;
    const endAngle = startAngle + anglePerSegment;
    const midAngle = startAngle + anglePerSegment / 2;

    // Dessiner le segment principal avec des dégradés sophistiqués
    ctx.beginPath();
    ctx.moveTo(center, center);
    ctx.arc(center, center, radius, startAngle, endAngle);
    ctx.closePath();

    // Créer un dégradé radial complexe pour chaque segment
    const segmentGradient = ctx.createRadialGradient(
      center + radius * 0.2 * Math.cos(midAngle),
      center + radius * 0.2 * Math.sin(midAngle),
      0,
      center,
      center,
      radius
    );
    
    const baseColor = segment.color || '#B8860B';
    const lighterColor = lightenColor(baseColor, 0.4);
    const darkerColor = darkenColor(baseColor, 0.3);
    
    segmentGradient.addColorStop(0, lighterColor);
    segmentGradient.addColorStop(0.2, lightenColor(baseColor, 0.2));
    segmentGradient.addColorStop(0.4, baseColor);
    segmentGradient.addColorStop(0.7, darkerColor);
    segmentGradient.addColorStop(1, darkenColor(baseColor, 0.5));
    
    ctx.fillStyle = segmentGradient;
    ctx.fill();

    // Séparations dorées entre les segments
    ctx.beginPath();
    ctx.moveTo(center, center);
    ctx.lineTo(
      center + radius * Math.cos(startAngle),
      center + radius * Math.sin(startAngle)
    );
    ctx.lineWidth = 3;
    
    const separatorGradient = ctx.createLinearGradient(
      center, center,
      center + radius * Math.cos(startAngle),
      center + radius * Math.sin(startAngle)
    );
    separatorGradient.addColorStop(0, 'rgba(255,215,0,0.8)');
    separatorGradient.addColorStop(0.3, '#FFD700');
    separatorGradient.addColorStop(0.7, '#FFA500');
    separatorGradient.addColorStop(1, '#DAA520');
    
    ctx.strokeStyle = separatorGradient;
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 3;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 2;
    ctx.stroke();

    // Réinitialiser les ombres
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    // Effet de brillance sur chaque segment
    ctx.beginPath();
    ctx.moveTo(center, center);
    ctx.arc(center, center, radius * 0.8, startAngle + anglePerSegment * 0.1, endAngle - anglePerSegment * 0.1);
    ctx.closePath();
    
    const shineGradient = ctx.createRadialGradient(
      center + radius * 0.4 * Math.cos(midAngle - anglePerSegment * 0.2),
      center + radius * 0.4 * Math.sin(midAngle - anglePerSegment * 0.2),
      0,
      center + radius * 0.4 * Math.cos(midAngle),
      center + radius * 0.4 * Math.sin(midAngle),
      radius * 0.5
    );
    shineGradient.addColorStop(0, 'rgba(255,255,255,0.4)');
    shineGradient.addColorStop(0.5, 'rgba(255,255,255,0.2)');
    shineGradient.addColorStop(1, 'rgba(255,255,255,0)');
    
    ctx.fillStyle = shineGradient;
    ctx.fill();

    // Reflets métalliques sur les bords
    ctx.beginPath();
    ctx.arc(center, center, radius * 0.95, startAngle + anglePerSegment * 0.05, startAngle + anglePerSegment * 0.25);
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(255,255,255,0.6)';
    ctx.stroke();

    // Dessiner le texte avec des effets d'ombrage sophistiqués
    if (segment.label) {
      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(midAngle);
      
      const fontSize = Math.max(14, radius / 10);
      ctx.font = `bold ${fontSize}px Arial, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      const textX = radius * 0.65;
      
      // Ombre portée du texte
      ctx.fillStyle = 'rgba(0,0,0,0.8)';
      ctx.fillText(segment.label, textX + 2, 2);
      
      // Contour doré du texte
      ctx.strokeStyle = '#FFD700';
      ctx.lineWidth = 3;
      ctx.strokeText(segment.label, textX, 0);
      
      // Texte principal blanc
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(segment.label, textX, 0);
      
      ctx.restore();
    }
  });

  ctx.restore();
};

// Fonctions utilitaires améliorées pour les effets de couleur
function lightenColor(color: string, amount: number): string {
  const hex = color.replace('#', '');
  const r = Math.min(255, parseInt(hex.substr(0, 2), 16) + Math.round(255 * amount));
  const g = Math.min(255, parseInt(hex.substr(2, 2), 16) + Math.round(255 * amount));
  const b = Math.min(255, parseInt(hex.substr(4, 2), 16) + Math.round(255 * amount));
  return `rgb(${r}, ${g}, ${b})`;
}

function darkenColor(color: string, amount: number): string {
  const hex = color.replace('#', '');
  const r = Math.max(0, parseInt(hex.substr(0, 2), 16) - Math.round(255 * amount));
  const g = Math.max(0, parseInt(hex.substr(2, 2), 16) - Math.round(255 * amount));
  const b = Math.max(0, parseInt(hex.substr(4, 2), 16) - Math.round(255 * amount));
  return `rgb(${r}, ${g}, ${b})`;
}
