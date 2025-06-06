
export const getClipPath = (position: string | undefined) => {
  switch (position) {
    case 'gauche':
      return 'inset(0 50% 0 0)'; // Coupe la moitié droite (garde la gauche)
    case 'droite':
      return 'inset(0 0 0 50%)'; // Coupe la moitié gauche (garde la droite)
    case 'bas':
      return 'inset(50% 0 0 0)'; // Coupe la moitié supérieure (garde le bas)
    case 'centre':
    default:
      return 'none';
  }
};

export const getCanvasStyles = (position: string | undefined): React.CSSProperties => {
  const baseStyles: React.CSSProperties = {
    position: 'absolute',
    zIndex: 1,
    clipPath: getClipPath(position),
    WebkitClipPath: getClipPath(position),
    transition: 'transform 0.3s ease, clip-path 0.3s ease',
  };

  switch (position) {
    case 'gauche':
      // Centre de la roue sur le bord gauche du conteneur (left: 50% de la roue)
      return {
        ...baseStyles,
        left: '50%', // Position le centre de la roue sur le bord gauche du conteneur
        top: '50%',
        transform: 'translate(-50%, -50%)',
      };
    case 'droite':
      // Centre de la roue sur le bord droit du conteneur
      return {
        ...baseStyles,
        right: '50%', // Position le centre de la roue sur le bord droit du conteneur
        top: '50%',
        transform: 'translate(50%, -50%)',
      };
    case 'bas':
      // Centre de la roue sur le bord bas du conteneur
      return {
        ...baseStyles,
        bottom: '50%', // Position le centre de la roue sur le bord bas du conteneur
        left: '50%',
        transform: 'translate(-50%, 50%)',
      };
    case 'centre':
    default:
      // Roue parfaitement centrée
      return {
        ...baseStyles,
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      };
  }
};
