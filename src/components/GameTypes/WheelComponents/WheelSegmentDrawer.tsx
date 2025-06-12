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
  
  // Appliquer la même transformation perspective que les bordures
  ctx.transform(1, 0, -0.05, 0.95, center * 0.05, center * 0.05);

  segments.forEach((segment, index) => {
    const startAngle = index * anglePerSegment + rotation;
    const endAngle = startAngle + anglePerSegment;
    const midAngle = startAngle + anglePerSegment / 2;

    // Dessiner le segment principal
    ctx.beginPath();
    ctx.moveTo(center, center);
    ctx.arc(center, center, radius, startAngle, endAngle);
    ctx.closePath();

    // Créer un gradient radial pour l'effet 3D des segments
    const segmentGradient = ctx.createRadialGradient(
      center, center, radius * 0.2,
      center, center, radius
    );
    
    const baseColor = segment.color || '#ff6b6b';
    
    // Effet de volume sur chaque segment
    segmentGradient.addColorStop(0, lightenColor(baseColor, 0.3));
    segmentGradient.addColorStop(0.4, baseColor);
    segmentGradient.addColorStop(0.8, darkenColor(baseColor, 0.2));
    segmentGradient.addColorStop(1, darkenColor(baseColor, 0.4));
    
    ctx.fillStyle = segmentGradient;
    ctx.fill();

    // Ajouter des lignes de séparation subtiles avec effet 3D
    ctx.beginPath();
    ctx.moveTo(center, center);
    ctx.lineTo(
      center + radius * Math.cos(startAngle),
      center + radius * Math.sin(startAngle)
    );
    ctx.lineWidth = 2;
    
    const separatorGradient = ctx.createLinearGradient(
      center, center,
      center + radius * Math.cos(startAngle),
      center + radius * Math.sin(startAngle)
    );
    separatorGradient.addColorStop(0, '#ffffff66');
    separatorGradient.addColorStop(0.3, '#00000033');
    separatorGradient.addColorStop(1, '#00000066');
    
    ctx.strokeStyle = separatorGradient;
    ctx.stroke();

    // Effet de brillance sur chaque segment
    if (index % 2 === 0) {
      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(center, center, radius * 0.85, startAngle + anglePerSegment * 0.1, endAngle - anglePerSegment * 0.1);
      ctx.closePath();
      
      const shineGradient = ctx.createRadialGradient(
        center + radius * 0.3 * Math.cos(midAngle),
        center + radius * 0.3 * Math.sin(midAngle),
        0,
        center + radius * 0.3 * Math.cos(midAngle),
        center + radius * 0.3 * Math.sin(midAngle),
        radius * 0.4
      );
      shineGradient.addColorStop(0, '#ffffff22');
      shineGradient.addColorStop(1, '#ffffff00');
      
      ctx.fillStyle = shineGradient;
      ctx.fill();
    }

    // Dessiner le texte avec ombre
    if (segment.label) {
      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(midAngle);
      
      const fontSize = Math.max(12, radius / 12);
      ctx.font = `bold ${fontSize}px Inter, Arial, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      const textX = radius * 0.7;
      
      // Ombre du texte pour effet 3D
      ctx.fillStyle = '#00000066';
      ctx.fillText(segment.label, textX + 1, 1);
      
      // Texte principal
      ctx.fillStyle = '#ffffff';
      ctx.fillText(segment.label, textX, 0);
      
      ctx.restore();
    }
  });

  ctx.restore();
};

// Fonctions utilitaires pour les effets de couleur
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
