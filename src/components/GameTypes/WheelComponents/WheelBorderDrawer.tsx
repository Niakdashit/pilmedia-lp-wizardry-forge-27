
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
  // Première bordure extérieure (la plus épaisse)
  ctx.beginPath();
  ctx.arc(center, center, radius + 20, 0, 2 * Math.PI);
  ctx.lineWidth = 12;
  ctx.strokeStyle = '#d4af37'; // Or solide
  ctx.shadowColor = 'rgba(0,0,0,0.4)';
  ctx.shadowBlur = 8;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  ctx.stroke();
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

  // Deuxième bordure (moyenne)
  ctx.beginPath();
  ctx.arc(center, center, radius + 14, 0, 2 * Math.PI);
  ctx.lineWidth = 6;
  ctx.strokeStyle = borderOutlineColor;
  ctx.stroke();

  // Bordure intérieure
  ctx.beginPath();
  ctx.arc(center, center, radius + 8, 0, 2 * Math.PI);
  ctx.lineWidth = 3;
  ctx.strokeStyle = borderColor;
  ctx.stroke();

  // Bordure finale (la plus fine)
  ctx.beginPath();
  ctx.arc(center, center, radius + 2, 0, 2 * Math.PI);
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#ffffff';
  ctx.stroke();
};
