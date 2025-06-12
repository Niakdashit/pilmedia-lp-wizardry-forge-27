
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

    // Dessiner le segment principal avec des dégradés très sophistiqués
    ctx.beginPath();
    ctx.moveTo(center, center);
    ctx.arc(center, center, radius, startAngle, endAngle);
    ctx.closePath();

    // Créer un dégradé radial complexe multi-étapes pour chaque segment
    const segmentGradient = ctx.createRadialGradient(
      center + radius * 0.1 * Math.cos(midAngle - anglePerSegment * 0.3),
      center + radius * 0.1 * Math.sin(midAngle - anglePerSegment * 0.3),
      0,
      center,
      center,
      radius
    );
    
    const baseColor = segment.color || '#8B4A8B';
    const lighterColor = lightenColor(baseColor, 0.6);
    const darkerColor = darkenColor(baseColor, 0.4);
    const veryDarkColor = darkenColor(baseColor, 0.7);
    
    segmentGradient.addColorStop(0, lighterColor);
    segmentGradient.addColorStop(0.1, lightenColor(baseColor, 0.4));
    segmentGradient.addColorStop(0.25, lightenColor(baseColor, 0.2));
    segmentGradient.addColorStop(0.4, baseColor);
    segmentGradient.addColorStop(0.6, darkenColor(baseColor, 0.1));
    segmentGradient.addColorStop(0.8, darkerColor);
    segmentGradient.addColorStop(0.95, veryDarkColor);
    segmentGradient.addColorStop(1, darkenColor(baseColor, 0.8));
    
    ctx.fillStyle = segmentGradient;
    ctx.fill();

    // Séparations dorées très marquées entre les segments
    ctx.beginPath();
    ctx.moveTo(center, center);
    ctx.lineTo(
      center + radius * Math.cos(startAngle),
      center + radius * Math.sin(startAngle)
    );
    ctx.lineWidth = 4;
    
    const separatorGradient = ctx.createLinearGradient(
      center, center,
      center + radius * Math.cos(startAngle),
      center + radius * Math.sin(startAngle)
    );
    separatorGradient.addColorStop(0, 'rgba(255,215,0,0.9)');
    separatorGradient.addColorStop(0.2, '#FFD700');
    separatorGradient.addColorStop(0.4, '#FFA500');
    separatorGradient.addColorStop(0.7, '#FF8C00');
    separatorGradient.addColorStop(0.9, '#DAA520');
    separatorGradient.addColorStop(1, '#B8860B');
    
    ctx.strokeStyle = separatorGradient;
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 3;
    ctx.stroke();

    // Réinitialiser les ombres
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    // Effet de brillance très marqué sur chaque segment
    ctx.beginPath();
    ctx.moveTo(center, center);
    ctx.arc(center, center, radius * 0.85, startAngle + anglePerSegment * 0.05, endAngle - anglePerSegment * 0.05);
    ctx.closePath();
    
    const shineGradient = ctx.createRadialGradient(
      center + radius * 0.3 * Math.cos(midAngle - anglePerSegment * 0.3),
      center + radius * 0.3 * Math.sin(midAngle - anglePerSegment * 0.3),
      0,
      center + radius * 0.3 * Math.cos(midAngle),
      center + radius * 0.3 * Math.sin(midAngle),
      radius * 0.6
    );
    shineGradient.addColorStop(0, 'rgba(255,255,255,0.6)');
    shineGradient.addColorStop(0.3, 'rgba(255,255,255,0.4)');
    shineGradient.addColorStop(0.6, 'rgba(255,255,255,0.2)');
    shineGradient.addColorStop(1, 'rgba(255,255,255,0)');
    
    ctx.fillStyle = shineGradient;
    ctx.fill();

    // Reflets métalliques sur les bords - multiples
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.arc(center, center, radius * (0.98 - i * 0.05), startAngle + anglePerSegment * 0.02, startAngle + anglePerSegment * (0.3 - i * 0.05));
      ctx.lineWidth = 2 - i * 0.5;
      ctx.strokeStyle = `rgba(255,255,255,${0.7 - i * 0.2})`;
      ctx.stroke();
    }

    // Ombrage interne pour la profondeur
    ctx.beginPath();
    ctx.moveTo(center, center);
    ctx.arc(center, center, radius * 0.3, startAngle, endAngle);
    ctx.closePath();
    
    const innerShadowGradient = ctx.createRadialGradient(
      center, center, 0,
      center, center, radius * 0.3
    );
    innerShadowGradient.addColorStop(0, 'rgba(0,0,0,0)');
    innerShadowGradient.addColorStop(0.7, 'rgba(0,0,0,0.1)');
    innerShadowGradient.addColorStop(1, 'rgba(0,0,0,0.3)');
    
    ctx.fillStyle = innerShadowGradient;
    ctx.fill();

    // Dessiner le texte avec des effets d'ombrage très sophistiqués
    if (segment.label) {
      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(midAngle);
      
      const fontSize = Math.max(16, radius / 8);
      ctx.font = `bold ${fontSize}px Arial, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      const textX = radius * 0.65;
      
      // Ombre portée du texte très marquée
      ctx.fillStyle = 'rgba(0,0,0,0.9)';
      ctx.fillText(segment.label, textX + 3, 3);
      
      // Deuxième ombre plus douce
      ctx.fillStyle = 'rgba(0,0,0,0.6)';
      ctx.fillText(segment.label, textX + 1, 1);
      
      // Contour doré épais du texte
      ctx.strokeStyle = '#FFD700';
      ctx.lineWidth = 4;
      ctx.strokeText(segment.label, textX, 0);
      
      // Contour doré fin
      ctx.strokeStyle = '#FFA500';
      ctx.lineWidth = 2;
      ctx.strokeText(segment.label, textX, 0);
      
      // Texte principal blanc avec léger reflet
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(segment.label, textX, 0);
      
      // Reflet sur le texte
      ctx.fillStyle = 'rgba(255,255,255,0.8)';
      ctx.fillText(segment.label, textX - 0.5, -0.5);
      
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
