
import React from 'react';

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
  if (!enabled) {
    return <>{children}</>;
  }

  const {
    color = 'rgba(255, 255, 255, 0.9)',
    opacity = 90,
    padding = 16,
    borderRadius = 8
  } = config;

  const backgroundStyle = {
    backgroundColor: color.includes('rgba') ? color : `${color}${Math.round(opacity * 2.55).toString(16).padStart(2, '0')}`,
    padding: `${padding}px`,
    borderRadius: `${borderRadius}px`,
    backdropFilter: 'blur(8px)',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    display: 'inline-block',
    maxWidth: 'fit-content'
  };

  return (
    <div style={backgroundStyle} className={`${className} mx-auto`}>
      {children}
    </div>
  );
};

export default ContrastBackground;
