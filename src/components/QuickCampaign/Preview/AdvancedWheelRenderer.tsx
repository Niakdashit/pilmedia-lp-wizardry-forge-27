
import React from 'react';
import { useQuickCampaignStore } from '../../../stores/quickCampaignStore';

interface AdvancedWheelRendererProps {
  children: React.ReactNode;
}

const AdvancedWheelRenderer: React.FC<AdvancedWheelRendererProps> = ({ children }) => {
  const { wheelCustomization } = useQuickCampaignStore();

  const getContainerStyle = (): React.CSSProperties => {
    const style: React.CSSProperties = {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    };

    // Appliquer les effets 3D
    if (wheelCustomization.depth3D && wheelCustomization.depth3D > 0) {
      style.transform = `translateZ(${wheelCustomization.depth3D}px)`;
    }

    if (wheelCustomization.perspective && wheelCustomization.perspective > 0) {
      style.perspective = `${wheelCustomization.perspective}px`;
    }

    return style;
  };

  const getWheelStyle = (): React.CSSProperties => {
    const style: React.CSSProperties = {};

    // Effet de lueur
    if (wheelCustomization.glowEffect) {
      style.filter = `drop-shadow(0 0 20px ${wheelCustomization.glowColor || '#3B82F6'})`;
    }

    // Effet de biseau
    if (wheelCustomization.bevelEffect) {
      style.filter = (style.filter || '') + ' drop-shadow(2px 2px 4px rgba(0,0,0,0.3))';
    }

    // Animation pulsante
    if (wheelCustomization.pulseAnimation) {
      style.animation = 'pulse 2s infinite';
    }

    // Rotation continue
    if (wheelCustomization.continuousRotation) {
      style.animation = (style.animation ? style.animation + ', ' : '') + 'spin 10s linear infinite';
    }

    return style;
  };

  const getParticleStyle = (): React.CSSProperties => {
    return {
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: '100%',
      height: '100%',
      transform: 'translate(-50%, -50%)',
      pointerEvents: 'none',
      overflow: 'hidden'
    };
  };

  return (
    <div style={getContainerStyle()}>
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
          }
          
          @keyframes particles {
            0% { transform: translateY(100px) rotate(0deg); opacity: 1; }
            100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
          }
          
          .particle {
            position: absolute;
            width: 4px;
            height: 4px;
            background: ${wheelCustomization.glowColor || '#3B82F6'};
            border-radius: 50%;
            animation: particles 3s linear infinite;
          }
        `}
      </style>
      
      <div style={getWheelStyle()}>
        {children}
      </div>
      
      {/* Effet de particules */}
      {wheelCustomization.particleEffect && (
        <div style={getParticleStyle()}>
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdvancedWheelRenderer;
