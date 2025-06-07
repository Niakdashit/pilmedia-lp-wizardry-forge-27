
import React, { useState } from 'react';
import FreeTextZone from './FreeTextZone';
import { Plus, Type } from 'lucide-react';

interface FreeTextZone {
  id: string;
  position: { x: number; y: number };
  content: string;
  style: {
    fontSize: number;
    fontWeight: string;
    color: string;
    textAlign: 'left' | 'center' | 'right';
    fontFamily: string;
  };
}

interface FreeTextManagerProps {
  containerBounds: { width: number; height: number };
}

const FreeTextManager: React.FC<FreeTextManagerProps> = ({ containerBounds }) => {
  const [freeTextZones, setFreeTextZones] = useState<FreeTextZone[]>([]);
  const [editingZone, setEditingZone] = useState<string>('');
  const [isPlacementMode, setIsPlacementMode] = useState(false);

  const addFreeText = (event: React.MouseEvent) => {
    if (!isPlacementMode) return;
    
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const newZone: FreeTextZone = {
      id: `free-text-${Date.now()}`,
      position: { x, y },
      content: 'Nouveau texte',
      style: {
        fontSize: 16,
        fontWeight: 'normal',
        color: '#000000',
        textAlign: 'left',
        fontFamily: 'Inter, sans-serif'
      }
    };

    setFreeTextZones(prev => [...prev, newZone]);
    setEditingZone(newZone.id);
    setIsPlacementMode(false);
  };

  const updateZone = (id: string, updates: any) => {
    setFreeTextZones(prev =>
      prev.map(zone =>
        zone.id === id ? { ...zone, ...updates } : zone
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
      {freeTextZones.map((zone) => (
        <FreeTextZone
          key={zone.id}
          id={zone.id}
          position={zone.position}
          content={zone.content}
          style={zone.style}
          isEditing={editingZone === zone.id}
          onEdit={setEditingZone}
          onUpdate={updateZone}
          onDelete={deleteZone}
          onContentChange={updateZoneContent}
        />
      ))}

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
    </>
  );
};

export default FreeTextManager;
