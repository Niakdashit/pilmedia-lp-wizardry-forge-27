
interface WheelBorderDrawerParams {
  ctx: CanvasRenderingContext2D;
  center: number;
  radius: number;
  size: number;
  borderColor: string;
  borderOutlineColor: string;
}

export const drawWheelBorders = ({
  ctx,
  center,
  radius,
  size,
  borderColor,
  borderOutlineColor
}: WheelBorderDrawerParams) => {
  // Effet d'ombre 3D externe (plus large et diffuse)
  ctx.beginPath();
  ctx.arc(center, center, radius + 15, 0, 2 * Math.PI);
  const shadowGradient = ctx.createRadialGradient(
    center, center, radius,
    center, center, radius + 15
  );
  shadowGradient.addColorStop(0, 'rgba(0, 0, 0, 0.3)');
  shadowGradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.15)');
  shadowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = shadowGradient;
  ctx.fill();

  // Bordure principale avec effet 3D
  ctx.beginPath();
  ctx.arc(center, center, radius, 0, 2 * Math.PI);
  ctx.lineWidth = 8;
  
  // Gradient pour effet 3D sur la bordure principale
  const borderGradient = ctx.createLinearGradient(
    center - radius, center - radius,
    center + radius, center + radius
  );
  
  // Utilisation de la couleur de bordure avec des variations de luminosité pour l'effet 3D
  const borderColorRgb = hexToRgb(borderColor);
  const lighterBorder = `rgba(${borderColorRgb.r + 40}, ${borderColorRgb.g + 40}, ${borderColorRgb.b + 40}, 1)`;
  const darkerBorder = `rgba(${Math.max(borderColorRgb.r - 40, 0)}, ${Math.max(borderColorRgb.g - 40, 0)}, ${Math.max(borderColorRgb.b - 40, 0)}, 1)`;
  
  borderGradient.addColorStop(0, lighterBorder);
  borderGradient.addColorStop(0.3, borderColor);
  borderGradient.addColorStop(0.7, borderColor);
  borderGradient.addColorStop(1, darkerBorder);
  
  ctx.strokeStyle = borderGradient;
  ctx.stroke();

  // Bordure de contour avec effet brillant
  ctx.beginPath();
  ctx.arc(center, center, radius + 4, 0, 2 * Math.PI);
  ctx.lineWidth = 3;
  
  const outlineGradient = ctx.createLinearGradient(
    center - radius, center - radius,
    center + radius, center + radius
  );
  
  const outlineColorRgb = hexToRgb(borderOutlineColor);
  const lighterOutline = `rgba(${Math.min(outlineColorRgb.r + 60, 255)}, ${Math.min(outlineColorRgb.g + 60, 255)}, ${Math.min(outlineColorRgb.b + 60, 255)}, 1)`;
  const darkerOutline = `rgba(${Math.max(outlineColorRgb.r - 30, 0)}, ${Math.max(outlineColorRgb.g - 30, 0)}, ${Math.max(outlineColorRgb.b - 30, 0)}, 1)`;
  
  outlineGradient.addColorStop(0, lighterOutline);
  outlineGradient.addColorStop(0.5, borderOutlineColor);
  outlineGradient.addColorStop(1, darkerOutline);
  
  ctx.strokeStyle = outlineGradient;
  ctx.stroke();

  // Reflet lumineux sur le contour supérieur
  ctx.beginPath();
  ctx.arc(center, center, radius - 2, Math.PI * 1.2, Math.PI * 1.8);
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.stroke();

  // Ombre interne pour effet de profondeur
  ctx.beginPath();
  ctx.arc(center, center, radius - 8, 0, 2 * Math.PI);
  ctx.lineWidth = 3;
  const innerShadowGradient = ctx.createRadialGradient(
    center, center, radius - 15,
    center, center, radius - 5
  );
  innerShadowGradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
  innerShadowGradient.addColorStop(1, 'rgba(0, 0, 0, 0.2)');
  ctx.strokeStyle = innerShadowGradient;
  ctx.stroke();
};

// Fonction utilitaire pour convertir hex en RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 132, g: 27, b: 96 }; // Fallback color
}
