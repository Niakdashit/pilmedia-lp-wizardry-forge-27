
import React, { useState } from 'react';
import FreeTextZone from './FreeTextZone';
import { Plus, Type } from 'lucide-react';

interface FreeTextZone {
  id: string;
  content: string;
  style: {
    fontSize: number;
    fontWeight: string;
    color: string;
    textAlign: 'left' | 'center' | 'right';
    fontFamily: string;
    lineHeight: number;
    letterSpacing: number;
  };
  // Device-specific positioning and sizing
  mobile: {
    position: { x: number; y: number };
    size: { width: number; height: number };
  };
  tablet: {
    position: { x: number; y: number };
    size: { width: number; height: number };
  };
  desktop: {
    position: { x: number; y: number };
    size: { width: number; height: number };
  };
}

interface FreeTextManagerProps {
  containerBounds: { width: number; height: number };
  previewMode: 'mobile' | 'tablet' | 'desktop';
}

const FreeTextManager: React.FC<FreeTextManagerProps> = ({ 
  containerBounds, 
  previewMode
}) => {
  const [freeTextZones, setFreeTextZones] = useState<FreeTextZone[]>([]);
  const [editingZone, setEditingZone] = useState<string>('');
  const [isPlacementMode, setIsPlacementMode] = useState(false);

  const addFreeText = (event: React.MouseEvent) => {
    if (!isPlacementMode) return;
    
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Ensure position is within strict container bounds
    const clampedX = Math.max(0, Math.min(x, containerBounds.width - 100));
    const clampedY = Math.max(0, Math.min(y, containerBounds.height - 30));

    // Default positioning and sizing for all devices
    const defaultPosition = { x: clampedX, y: clampedY };
    const defaultSize = { width: 120, height: 40 };

    const newZone: FreeTextZone = {
      id: `free-text-${Date.now()}`,
      content: '',
      style: {
        fontSize: 16,
        fontWeight: 'normal',
        color: '#000000',
        textAlign: 'left',
        fontFamily: 'Inter, sans-serif',
        lineHeight: 1.2,
        letterSpacing: 0
      },
      mobile: {
        position: { ...defaultPosition },
        size: { ...defaultSize }
      },
      tablet: {
        position: { ...defaultPosition },
        size: { width: defaultSize.width * 1.2, height: defaultSize.height * 1.2 }
      },
      desktop: {
        position: { ...defaultPosition },
        size: { width: defaultSize.width * 1.5, height: defaultSize.height * 1.5 }
      }
    };

    setFreeTextZones(prev => [...prev, newZone]);
    setEditingZone(newZone.id);
    setIsPlacementMode(false);
  };

  const updateZonePosition = (id: string, position: { x: number; y: number }) => {
    setFreeTextZones(prev =>
      prev.map(zone =>
        zone.id === id 
          ? { 
              ...zone, 
              [previewMode]: { 
                ...zone[previewMode], 
                position: {
                  x: Math.max(0, Math.min(position.x, containerBounds.width - zone[previewMode].size.width)),
                  y: Math.max(0, Math.min(position.y, containerBounds.height - zone[previewMode].size.height))
                }
              }
            } 
          : zone
      )
    );
  };

  const updateZoneSize = (id: string, size: { width: number; height: number }) => {
    setFreeTextZones(prev =>
      prev.map(zone =>
        zone.id === id 
          ? { 
              ...zone, 
              [previewMode]: { 
                ...zone[previewMode], 
                size: {
                  width: Math.max(50, Math.min(size.width, containerBounds.width - zone[previewMode].position.x)),
                  height: Math.max(20, Math.min(size.height, containerBounds.height - zone[previewMode].position.y))
                }
              }
            } 
          : zone
      )
    );
  };

  const updateZoneContent = (id: string, content: string) => {
    setFreeTextZones(prev =>
      prev.map(zone =>
        zone.id === id ? { ...zone, content } : zone
      )
    );
  };

  const updateZoneStyle = (id: string, style: any) => {
    setFreeTextZones(prev =>
      prev.map(zone =>
        zone.id === id ? { ...zone, style: { ...zone.style, ...style } } : zone
      )
    );
  };

  const deleteZone = (id: string) => {
    setFreeTextZones(prev => prev.filter(zone => zone.id !== id));
    setEditingZone('');
  };

  return (
    <>
      {/* Add Free Text Button */}
      <div
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          zIndex: 200
        }}
      >
        <button
          onClick={() => setIsPlacementMode(!isPlacementMode)}
          style={{
            background: isPlacementMode ? '#059669' : '#841b60',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '6px 8px',
            cursor: 'pointer',
            fontSize: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <Plus className="w-3 h-3" />
          <Type className="w-3 h-3" />
          {isPlacementMode ? 'Cliquez pour placer' : 'Texte libre'}
        </button>
      </div>

      {/* Click Area for Placement */}
      {isPlacementMode && (
        <div
          onClick={addFreeText}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 100,
            cursor: 'crosshair',
            backgroundColor: 'rgba(132, 27, 96, 0.1)'
          }}
        />
      )}

      {/* Free Text Zones */}
      {freeTextZones.map((zone) => {
        const deviceConfig = zone[previewMode];
        return (
          <FreeTextZone
            key={zone.id}
            id={zone.id}
            position={deviceConfig.position}
            size={deviceConfig.size}
            content={zone.content}
            style={zone.style}
            isEditing={editingZone === zone.id}
            onEdit={setEditingZone}
            onPositionChange={updateZonePosition}
            onSizeChange={updateZoneSize}
            onContentChange={updateZoneContent}
            onStyleChange={updateZoneStyle}
            onDelete={deleteZone}
            containerBounds={containerBounds}
          />
        );
      })}

      {/* Instructions */}
      {isPlacementMode && (
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(4px)',
            padding: '8px 12px',
            borderRadius: '4px',
            fontSize: '10px',
            zIndex: 200,
            border: '1px solid #e5e7eb',
            textAlign: 'center'
          }}
        >
          Cliquez n'importe où pour placer un texte libre
        </div>
      )}

      {/* Device indicator */}
      <div
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '10px',
          zIndex: 200
        }}
      >
        {previewMode}
      </div>
    </>
  );
};

export default FreeTextManager;
