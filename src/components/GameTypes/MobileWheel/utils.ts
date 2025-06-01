
export const getContainerWidth = (canvasSize: number, shouldCropWheel: boolean): number => {
  if (!shouldCropWheel) return canvasSize;
  
  // Pour les grandes tailles, on augmente la portion visible
  if (canvasSize >= 500) {
    return canvasSize * 0.65; // 65% au lieu de 50% pour les grandes roues
  }
  return canvasSize * 0.5; // 50% pour les petites roues
};

export const getCanvasOffset = (
  shouldCropWheel: boolean, 
  gamePosition: 'left' | 'right' | 'center' | 'top' | 'bottom',
  canvasSize: number
): string => {
  if (!shouldCropWheel) return '0px';
  
  if (gamePosition === 'left') {
    return '0px';
  } else { // right
    // Pour les grandes tailles, on ajuste le décalage
    const offset = canvasSize >= 500 ? canvasSize * 0.35 : canvasSize * 0.5;
    return `-${offset}px`;
  }
};

export const getGameAbsoluteStyle = (
  gamePosition: 'left' | 'right' | 'center' | 'top' | 'bottom',
  containerWidth: number,
  canvasSize: number
): React.CSSProperties => {
  const baseStyle: React.CSSProperties = {
    position: 'absolute',
    zIndex: 10,
    pointerEvents: 'none' as const
  };

  switch (gamePosition) {
    case 'left':
      return {
        ...baseStyle,
        left: '0px',
        top: '50%',
        transform: 'translateY(-50%)',
        width: containerWidth,
        height: canvasSize,
        overflow: 'hidden'
      };
    case 'right':
      return {
        ...baseStyle,
        right: '0px',
        top: '50%',
        transform: 'translateY(-50%)',
        width: containerWidth,
        height: canvasSize,
        overflow: 'hidden'
      };
    case 'top':
      return {
        ...baseStyle,
        top: `-${canvasSize / 2}px`,
        left: '50%',
        transform: 'translateX(-50%)',
        width: canvasSize,
        height: canvasSize
      };
    case 'bottom':
      return {
        ...baseStyle,
        bottom: `-${canvasSize / 2}px`,
        left: '50%',
        transform: 'translateX(-50%)',
        width: canvasSize,
        height: canvasSize
      };
    case 'center':
    default:
      return {
        ...baseStyle,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: canvasSize,
        height: canvasSize
      };
  }
};
