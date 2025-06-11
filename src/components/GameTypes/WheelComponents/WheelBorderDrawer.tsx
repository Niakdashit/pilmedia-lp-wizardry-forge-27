
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
  // Draw outer border
  ctx.beginPath();
  ctx.arc(center, center, radius + 15, 0, 2 * Math.PI);
  ctx.lineWidth = 8;
  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, borderOutlineColor);
  gradient.addColorStop(0.5, borderOutlineColor);
  gradient.addColorStop(1, borderOutlineColor);
  ctx.strokeStyle = gradient;
  ctx.stroke();

  // Draw inner border
  ctx.beginPath();
  ctx.arc(center, center, radius + 8, 0, 2 * Math.PI);
  ctx.lineWidth = 2;
  ctx.strokeStyle = borderColor;
  ctx.stroke();
};
