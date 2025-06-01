
import React, { useRef, useEffect, useState } from 'react';

interface ContrastBackgroundProps {
  enabled?: boolean;
  config?: {
    color?: string;
    opacity?: number;
    padding?: number;
    borderRadius?: number;
  };
  children: React.ReactNode;
  className?: string;
}

const ContrastBackground: React.FC<ContrastBackgroundProps> = ({
  enabled = false,
  config = {},
  children,
  className = ""
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentDimensions, setContentDimensions] = useState({ width: 0, height: 0 });

  const {
    color = 'rgba(255, 255, 255, 0.9)',
    opacity = 90,
    padding = 16,
    borderRadius = 8
  } = config;

  useEffect(() => {
    if (enabled && contentRef.current) {
      const updateDimensions = () => {
        const rect = contentRef.current?.getBoundingClientRect();
        if (rect) {
          setContentDimensions({ 
            width: rect.width, 
            height: rect.height 
          });
        }
      };

      // Observer pour détecter les changements de taille du contenu
      const resizeObserver = new ResizeObserver(updateDimensions);
      resizeObserver.observe(contentRef.current);

      // Mise à jour initiale
      updateDimensions();

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [enabled, children]);

  if (!enabled) {
    return <>{children}</>;
  }

  const backgroundStyle = {
    backgroundColor: color.includes('rgba') ? color : `${color}${Math.round(opacity * 2.55).toString(16).padStart(2, '0')}`,
    padding: `${padding}px`,
    borderRadius: `${borderRadius}px`,
    backdropFilter: 'blur(8px)',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    display: 'inline-block',
    // Adaptation exacte au contenu
    width: 'auto',
    height: 'auto',
    minWidth: 'auto',
    maxWidth: 'none'
  };

  return (
    <div style={backgroundStyle} className={`${className}`}>
      <div ref={contentRef}>
        {children}
      </div>
    </div>
  );
};

export default ContrastBackground;
