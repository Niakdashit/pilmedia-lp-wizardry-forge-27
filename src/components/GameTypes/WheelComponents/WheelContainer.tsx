
import React from 'react';
import { calculateConstrainedSize } from '../../QuickCampaign/Preview/utils/previewConstraints';

interface WheelContainerProps {
  children: React.ReactNode;
  gamePosition: 'top' | 'center' | 'bottom' | 'left' | 'right';
  gameDimensions: { width: number; height: number };
  previewDevice: 'desktop' | 'tablet' | 'mobile';
}

const WheelContainer: React.FC<WheelContainerProps> = ({
  children,
  gamePosition,
  gameDimensions,
  previewDevice
}) => {
  // Calculer les dimensions contraintes pour la roue
  const constrainedSize = calculateConstrainedSize(
    gameDimensions.width,
    gameDimensions.height,
    'wheel',
    40
  );

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
    height: '100%',
    maxWidth: `${constrainedSize.width + 40}px`,
    maxHeight: `${constrainedSize.height + 40}px`,
    overflow: 'hidden',
    padding: '20px',
    boxSizing: 'border-box',
  };

  // Ajustements pour mobile avec crop
  const isMobile = previewDevice === 'mobile';
  const shouldCrop = isMobile && ['left', 'right', 'bottom'].includes(gamePosition);

  if (shouldCrop) {
    switch (gamePosition) {
      case 'left':
      case 'right':
        containerStyle.maxWidth = `${constrainedSize.width / 2 + 20}px`;
        break;
      case 'bottom':
        containerStyle.maxHeight = `${constrainedSize.height / 2 + 20}px`;
        break;
    }
  }

  return (
    <div style={containerStyle}>
      <div 
        className="w-full h-full overflow-hidden flex items-center justify-center"
        style={{
          maxWidth: `${constrainedSize.width}px`,
          maxHeight: `${constrainedSize.height}px`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default WheelContainer;
