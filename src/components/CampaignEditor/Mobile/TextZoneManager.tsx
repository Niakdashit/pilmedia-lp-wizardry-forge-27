
import React, { useState } from 'react';
import DraggableTextZone from './DraggableTextZone';
import ContrastBackground from '../../common/ContrastBackground';
import { Plus, Type } from 'lucide-react';

interface TextZone {
  id: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  content: {
    title?: string;
    description?: string;
    showTitle: boolean;
    showDescription: boolean;
  };
}

interface TextZoneManagerProps {
  mobileConfig: any;
  campaign: any;
  gameArea?: { x: number; y: number; width: number; height: number };
  containerBounds: { width: number; height: number };
}

const TextZoneManager: React.FC<TextZoneManagerProps> = ({
  mobileConfig,
  campaign,
  gameArea,
  containerBounds
}) => {
  const [textZones, setTextZones] = useState<TextZone[]>(() => {
    const initialTitle = campaign?.screens?.[1]?.title || '';
    const initialDescription = campaign?.screens?.[1]?.description || '';
    if (initialTitle || initialDescription) {
      return [
        {
          id: 'main-text',
          position: { x: 20, y: 20 },
          size: { width: 200, height: 80 },
          content: {
            title: initialTitle,
            description: initialDescription,
            showTitle: mobileConfig.showTitle !== false,
            showDescription: mobileConfig.showDescription !== false,
          },
        },
      ];
    }
    return [];
  });
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

  const handlePositionChange = (id: string, position: { x: number; y: number }) => {
    setTextZones(zones => 
      zones.map(zone => 
        zone.id === id ? { ...zone, position } : zone
      )
    );
  };

  const handleSizeChange = (id: string, size: { width: number; height: number }) => {
    setTextZones(zones => 
      zones.map(zone => 
        zone.id === id ? { ...zone, size } : zone
      )
    );
  };

  const addNewTextZone = () => {
    const newZone: TextZone = {
      id: `text-zone-${Date.now()}`,
      position: { x: 50, y: 120 },
      size: { width: 180, height: 60 },
      content: {
        title: '',
        description: '',
        showTitle: true,
        showDescription: true
      }
    };
    setTextZones(zones => [...zones, newZone]);
    setSelectedZone(newZone.id);
  };

  const removeTextZone = (id: string) => {
    setTextZones(zones => zones.filter(zone => zone.id !== id));
    setSelectedZone(null);
  };

  const renderTextContent = (zone: TextZone) => {
    const contrastBg = mobileConfig.contrastBackground || {};
    
    return (
      <ContrastBackground enabled={contrastBg.enabled} config={contrastBg} className="w-full h-full">
        <div style={{ fontSize: '12px', lineHeight: '1.2' }}>
          {zone.content.showTitle && zone.content.title && (
            <div style={{ 
              fontWeight: 'bold', 
              marginBottom: '4px',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {zone.content.title}
            </div>
          )}
          {zone.content.showDescription && zone.content.description && (
            <div style={{ 
              fontSize: '10px',
              opacity: 0.8,
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {zone.content.description}
            </div>
          )}
        </div>
      </ContrastBackground>
    );
  };

  return (
    <>
      {/* Add new text zone button */}
      <div
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          zIndex: 200
        }}
      >
        <button
          onClick={addNewTextZone}
          style={{
            background: '#841b60',
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
        </button>
      </div>

      {/* Text zones */}
      {textZones.map((zone) => (
        <DraggableTextZone
          key={zone.id}
          id={zone.id}
          initialPosition={zone.position}
          initialSize={zone.size}
          onPositionChange={handlePositionChange}
          onSizeChange={handleSizeChange}
          gameArea={gameArea}
          containerBounds={containerBounds}
          isSelected={selectedZone === zone.id}
          onSelect={() => setSelectedZone(zone.id)}
        >
          {renderTextContent(zone)}
        </DraggableTextZone>
      ))}

      {/* Zone info panel */}
      {selectedZone && (
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '10px',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(4px)',
            padding: '8px',
            borderRadius: '4px',
            fontSize: '10px',
            zIndex: 200,
            border: '1px solid #e5e7eb'
          }}
        >
          <div>Zone sélectionnée: {selectedZone}</div>
          {selectedZone !== 'main-text' && (
            <button
              onClick={() => removeTextZone(selectedZone)}
              style={{
                background: '#dc2626',
                color: 'white',
                border: 'none',
                borderRadius: '2px',
                padding: '2px 6px',
                cursor: 'pointer',
                fontSize: '9px',
                marginTop: '4px'
              }}
            >
              Supprimer
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default TextZoneManager;
