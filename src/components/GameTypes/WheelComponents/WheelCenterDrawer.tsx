
interface WheelCenterDrawerProps {
  ctx: CanvasRenderingContext2D;
  center: number;
  size: number;
  centerImage?: string;
  centerLogo?: string;
  borderOutlineColor: string;
}

export const drawWheelCenter = ({
  ctx,
  center,
  size,
  centerImage,
  centerLogo,
  borderOutlineColor
}: WheelCenterDrawerProps) => {
  const centerRadius = 25;
  const logoToDisplay = centerLogo || centerImage;
  
  // Center border
  ctx.beginPath();
  ctx.arc(center, center, centerRadius + 3, 0, 2 * Math.PI);
  const centerGradient = ctx.createLinearGradient(0, 0, size, size);
  centerGradient.addColorStop(0, borderOutlineColor);
  centerGradient.addColorStop(0.5, borderOutlineColor);
  centerGradient.addColorStop(1, borderOutlineColor);
  ctx.fillStyle = centerGradient;
  ctx.fill();
  
  if (logoToDisplay) {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      ctx.save();
      ctx.beginPath();
      ctx.arc(center, center, centerRadius, 0, 2 * Math.PI);
      ctx.clip();
      ctx.drawImage(img, center - centerRadius, center - centerRadius, centerRadius * 2, centerRadius * 2);
      ctx.restore();
    };
    img.src = logoToDisplay;
  } else {
    ctx.beginPath();
    ctx.arc(center, center, centerRadius, 0, 2 * Math.PI);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.strokeStyle = borderOutlineColor;
    ctx.lineWidth = 2;
    ctx.stroke();
  }
};
