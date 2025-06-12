
interface WheelBorderDrawerProps {
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
}: WheelBorderDrawerProps) => {
  // Sauvegarder l'état du contexte
  ctx.save();

  // Créer un effet de perspective subtile (légère inclinaison)
  ctx.transform(1, 0, -0.05, 0.95, center * 0.05, center * 0.05);

  // Effet d'ombre portée principale (plus douce et réaliste)
  ctx.beginPath();
  ctx.arc(center + 8, center + 12, radius + 25, 0, 2 * Math.PI);
  const shadowGradient = ctx.createRadialGradient(
    center, center, radius * 0.3,
    center, center, radius + 25
  );
  shadowGradient.addColorStop(0, 'rgba(0,0,0,0)');
  shadowGradient.addColorStop(0.7, 'rgba(0,0,0,0.15)');
  shadowGradient.addColorStop(1, 'rgba(0,0,0,0.25)');
  ctx.fillStyle = shadowGradient;
  ctx.fill();

  // Bordure externe avec effet de volume sophistiqué
  ctx.beginPath();
  ctx.arc(center, center, radius + 20, 0, 2 * Math.PI);
  ctx.lineWidth = 12;
  
  // Gradient complexe pour l'effet 3D de la bordure externe
  const outerBorderGradient = ctx.createLinearGradient(
    center - radius - 20, center - radius - 20,
    center + radius + 20, center + radius + 20
  );
  outerBorderGradient.addColorStop(0, '#ffffff66');
  outerBorderGradient.addColorStop(0.15, borderOutlineColor + 'dd');
  outerBorderGradient.addColorStop(0.35, borderOutlineColor);
  outerBorderGradient.addColorStop(0.65, borderOutlineColor + 'cc');
  outerBorderGradient.addColorStop(0.85, '#00000044');
  outerBorderGradient.addColorStop(1, '#00000066');
  
  ctx.strokeStyle = outerBorderGradient;
  ctx.shadowColor = 'rgba(0,0,0,0.3)';
  ctx.shadowBlur = 8;
  ctx.shadowOffsetX = 3;
  ctx.shadowOffsetY = 5;
  ctx.stroke();

  // Réinitialiser les ombres
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

  // Bordure intermédiaire pour plus de profondeur
  ctx.beginPath();
  ctx.arc(center, center, radius + 15, 0, 2 * Math.PI);
  ctx.lineWidth = 6;
  
  const midBorderGradient = ctx.createLinearGradient(
    center - radius - 15, center - radius - 15,
    center + radius + 15, center + radius + 15
  );
  midBorderGradient.addColorStop(0, '#ffffff88');
  midBorderGradient.addColorStop(0.3, borderColor + 'ee');
  midBorderGradient.addColorStop(0.7, borderColor);
  midBorderGradient.addColorStop(1, '#00000055');
  
  ctx.strokeStyle = midBorderGradient;
  ctx.stroke();

  // Bordure interne avec finition raffinée
  ctx.beginPath();
  ctx.arc(center, center, radius + 8, 0, 2 * Math.PI);
  ctx.lineWidth = 3;
  
  const innerBorderGradient = ctx.createLinearGradient(
    center - radius - 8, center - radius - 8,
    center + radius + 8, center + radius + 8
  );
  innerBorderGradient.addColorStop(0, '#ffffff99');
  innerBorderGradient.addColorStop(0.5, borderColor);
  innerBorderGradient.addColorStop(1, '#000000aa');
  
  ctx.strokeStyle = innerBorderGradient;
  ctx.stroke();

  // Effet de brillance subtile sur le dessus
  ctx.beginPath();
  ctx.arc(center, center - radius * 0.3, radius + 18, 0, Math.PI, true);
  ctx.lineWidth = 4;
  const shineGradient = ctx.createLinearGradient(
    center, center - radius - 18,
    center, center - radius * 0.3
  );
  shineGradient.addColorStop(0, '#ffffff44');
  shineGradient.addColorStop(0.5, '#ffffff22');
  shineGradient.addColorStop(1, '#ffffff00');
  ctx.strokeStyle = shineGradient;
  ctx.stroke();

  // Restaurer l'état du contexte
  ctx.restore();
};
