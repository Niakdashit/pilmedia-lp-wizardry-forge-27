import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import Color from 'color';
import PreviewContent from './PreviewContent';

interface DroppableCanvasProps {
  components: any[];
  selectedComponent: any;
  onComponentSelect: (component: any) => void;
  onComponentUpdate: (id: string, updates: any) => void;
  backgroundImage?: string;
  campaign: any;
}

export const DroppableCanvas: React.FC<DroppableCanvasProps> = ({
  components,
  selectedComponent,
  onComponentSelect,
  onComponentUpdate,
  backgroundImage,
  campaign
}) => {
  const [currentScreen, setCurrentScreen] = useState<'start' | 'game' | 'end'>('start');

  const getContrastColor = (bgColor: string) => {
    try {
      const color = Color(bgColor);
      return color.isLight() ? '#000000' : '#FFFFFF';
    } catch {
      return '#000000';
    }
  };

  const getPositionStyles = (position: string) => {
    const styles: React.CSSProperties = {
      position: 'absolute',
      maxWidth: '100%',
      padding: '1rem',
    };

    switch (position) {
      case 'top-left':
        return { ...styles, top: '1rem', left: '1rem' };
      case 'top-center':
        return { ...styles, top: '1rem', left: '50%', transform: 'translateX(-50%)' };
      case 'top-right':
        return { ...styles, top: '1rem', right: '1rem' };
      case 'center-left':
        return { ...styles, top: '50%', left: '1rem', transform: 'translateY(-50%)' };
      case 'center-center':
        return { ...styles, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
      case 'center-right':
        return { ...styles, top: '50%', right: '1rem', transform: 'translateY(-50%)' };
      case 'bottom-left':
        return { ...styles, bottom: '1rem', left: '1rem' };
      case 'bottom-center':
        return { ...styles, bottom: '1rem', left: '50%', transform: 'translateX(-50%)' };
      case 'bottom-right':
        return { ...styles, bottom: '1rem', right: '1rem' };
      default:
        return { ...styles, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
    }
  };

  const getFrameStyle = (screenNumber: number) => {
    const screenConfig = campaign.screens?.[screenNumber];
    const frameConfig = screenConfig?.frame;
    
    if (frameConfig?.show === false) {
      return {};
    }

    return {
      maxWidth: `${frameConfig?.maxWidth || campaign.design.frame?.maxWidth || 800}px`,
      maxHeight: `${frameConfig?.maxHeight || campaign.design.frame?.maxHeight || 90}%`,
      padding: `${frameConfig?.padding || campaign.design.frame?.padding || 24}px`,
      backgroundColor: Color(campaign.design.blockColor || '#FFFFFF').alpha(0.9).toString(),
      backdropFilter: 'blur(8px)',
      borderRadius: campaign.design.borderRadius || '0.5rem',
      boxShadow: campaign.design.shadow === 'shadow-xl' 
        ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
        : campaign.design.shadow === 'shadow-md'
        ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        : 'none',
      border: `1px solid ${campaign.design.borderColor || '#E5E7EB'}`,
      ...getPositionStyles(frameConfig?.position || 'center-center')
    };
  };

  return (
    <div
      className="relative bg-gray-100 border border-gray-200 rounded-lg h-full overflow-hidden"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0">
        <div style={getFrameStyle(1)} className="relative">
          {/* Content */}
        </div>
      </div>

      {/* Draggable Components */}
      {components.map(component => (
        <div
          key={component.id}
          style={{
            position: 'absolute',
            left: component.position.x,
            top: component.position.y,
            width: component.size.width,
            height: component.size.height,
            zIndex: 10
          }}
          className={`bg-white/90 backdrop-blur border-2 rounded-lg ${
            selectedComponent?.id === component.id
              ? 'border-[#841b60]'
              : 'border-transparent hover:border-gray-300'
          }`}
          onClick={() => onComponentSelect(component)}
        >
          {/* Component content */}
        </div>
      ))}
    </div>
  );
};