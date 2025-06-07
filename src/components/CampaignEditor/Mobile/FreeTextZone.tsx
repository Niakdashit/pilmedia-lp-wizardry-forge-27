
import React, { useState } from 'react';

interface FreeTextZoneProps {
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
  isEditing: boolean;
  onEdit: (id: string) => void;
  onUpdate: (id: string, updates: any) => void;
  onDelete: (id: string) => void;
  onContentChange: (id: string, content: string) => void;
}

const FreeTextZone: React.FC<FreeTextZoneProps> = ({
  id,
  position,
  content,
  style,
  isEditing,
  onEdit,
  onUpdate,
  onDelete,
  onContentChange
}) => {
  const [tempContent, setTempContent] = useState(content);

  const handleContentSubmit = () => {
    onContentChange(id, tempContent);
    onEdit('');
  };

  const handleStyleChange = (key: string, value: any) => {
    onUpdate(id, { style: { ...style, [key]: value } });
  };

  return (
    <>
      {/* Text Display */}
      <div
        style={{
          position: 'absolute',
          left: position.x,
          top: position.y,
          fontSize: `${style.fontSize}px`,
          fontWeight: style.fontWeight,
          color: style.color,
          textAlign: style.textAlign,
          fontFamily: style.fontFamily,
          zIndex: 150,
          cursor: 'pointer',
          userSelect: 'none',
          whiteSpace: 'nowrap',
          pointerEvents: isEditing ? 'none' : 'auto'
        }}
        onClick={() => onEdit(id)}
      >
        {content}
      </div>

      {/* Edit Controls */}
      {isEditing && (
        <div
          style={{
            position: 'absolute',
            left: position.x,
            top: position.y - 40,
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            padding: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            zIndex: 200,
            minWidth: '300px'
          }}
        >
          {/* Content Editor */}
          <div className="mb-3">
            <input
              type="text"
              value={tempContent}
              onChange={(e) => setTempContent(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleContentSubmit()}
              style={{
                width: '100%',
                padding: '6px 8px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '14px'
              }}
              placeholder="Tapez votre texte..."
              autoFocus
            />
          </div>

          {/* Style Controls */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '12px' }}>
            {/* Font Size */}
            <div>
              <label style={{ display: 'block', marginBottom: '2px', fontWeight: '500' }}>Taille</label>
              <input
                type="range"
                min="10"
                max="32"
                value={style.fontSize}
                onChange={(e) => handleStyleChange('fontSize', parseInt(e.target.value))}
                style={{ width: '100%' }}
              />
              <span style={{ fontSize: '10px', color: '#666' }}>{style.fontSize}px</span>
            </div>

            {/* Font Weight */}
            <div>
              <label style={{ display: 'block', marginBottom: '2px', fontWeight: '500' }}>Poids</label>
              <select
                value={style.fontWeight}
                onChange={(e) => handleStyleChange('fontWeight', e.target.value)}
                style={{ width: '100%', padding: '2px', fontSize: '12px' }}
              >
                <option value="normal">Normal</option>
                <option value="bold">Gras</option>
                <option value="600">Semi-gras</option>
              </select>
            </div>

            {/* Color */}
            <div>
              <label style={{ display: 'block', marginBottom: '2px', fontWeight: '500' }}>Couleur</label>
              <input
                type="color"
                value={style.color}
                onChange={(e) => handleStyleChange('color', e.target.value)}
                style={{ width: '100%', height: '24px', padding: '0', border: 'none' }}
              />
            </div>

            {/* Text Align */}
            <div>
              <label style={{ display: 'block', marginBottom: '2px', fontWeight: '500' }}>Alignement</label>
              <select
                value={style.textAlign}
                onChange={(e) => handleStyleChange('textAlign', e.target.value)}
                style={{ width: '100%', padding: '2px', fontSize: '12px' }}
              >
                <option value="left">Gauche</option>
                <option value="center">Centre</option>
                <option value="right">Droite</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
            <button
              onClick={handleContentSubmit}
              style={{
                background: '#841b60',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '6px 12px',
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              Valider
            </button>
            <button
              onClick={() => onDelete(id)}
              style={{
                background: '#dc2626',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '6px 12px',
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              Supprimer
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FreeTextZone;
