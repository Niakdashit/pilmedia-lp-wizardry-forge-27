
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
  // Draw outer border with a simple 3D effect
  ctx.beginPath();
  ctx.arc(center, center, radius + 15, 0, 2 * Math.PI);
  ctx.lineWidth = 8;
  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, '#ffffffaa');
  gradient.addColorStop(0.5, borderOutlineColor);
  gradient.addColorStop(1, '#00000055');
  ctx.strokeStyle = gradient;
  ctx.shadowColor = 'rgba(0,0,0,0.3)';
  ctx.shadowBlur = 6;
  ctx.stroke();
  ctx.shadowBlur = 0;

  // Draw inner border
  ctx.beginPath();
  ctx.arc(center, center, radius + 8, 0, 2 * Math.PI);
  ctx.lineWidth = 2;
  ctx.strokeStyle = borderColor;
  ctx.stroke();
};
