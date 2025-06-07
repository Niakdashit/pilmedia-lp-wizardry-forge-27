
import React, { useState, useRef } from 'react';
import { Trash2, Move, Maximize2 } from 'lucide-react';

interface FreeTextZoneProps {
  id: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
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
  isEditing: boolean;
  onEdit: (id: string) => void;
  onPositionChange: (id: string, position: { x: number; y: number }) => void;
  onSizeChange: (id: string, size: { width: number; height: number }) => void;
  onContentChange: (id: string, content: string) => void;
  onStyleChange: (id: string, style: any) => void;
  onDelete: (id: string) => void;
  containerBounds: { width: number; height: number };
}

const FreeTextZone: React.FC<FreeTextZoneProps> = ({
  id,
  position,
  size,
  content,
  style,
  isEditing,
  onEdit,
  onPositionChange,
  onSizeChange,
  onContentChange,
  onStyleChange,
  onDelete,
  containerBounds
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const zoneRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleMouseDown = (e: React.MouseEvent, action: 'drag' | 'resize') => {
    e.preventDefault();
    e.stopPropagation();
    
    if (action === 'drag') {
      setIsDragging(true);
      setDragStart({ 
        x: e.clientX - position.x, 
        y: e.clientY - position.y 
      });
    } else {
      setIsResizing(true);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const newX = Math.max(0, Math.min(e.clientX - dragStart.x, containerBounds.width - size.width));
      const newY = Math.max(0, Math.min(e.clientY - dragStart.y, containerBounds.height - size.height));
      onPositionChange(id, { x: newX, y: newY });
    } else if (isResizing) {
      const newWidth = Math.max(50, Math.min(e.clientX - position.x, containerBounds.width - position.x));
      const newHeight = Math.max(20, Math.min(e.clientY - position.y, containerBounds.height - position.y));
      onSizeChange(id, { width: newWidth, height: newHeight });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  React.useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, dragStart, position, size, containerBounds]);

  // Auto-focus textarea when editing starts
  React.useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
    }
  }, [isEditing]);

  return (
    <div
      ref={zoneRef}
      data-free-text-zone-id={id}
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        zIndex: 200,
        border: isEditing ? '2px dashed #841b60' : '1px solid transparent',
        backgroundColor: 'transparent',
        cursor: isDragging ? 'grabbing' : (isEditing ? 'default' : 'pointer'),
        userSelect: isEditing ? 'text' : 'none',
        overflow: 'hidden'
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (!isEditing) {
          onEdit(id);
        }
      }}
    >
      {/* Text Content */}
      {isEditing ? (
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => onContentChange(id, e.target.value)}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            background: 'transparent',
            resize: 'none',
            outline: 'none',
            fontSize: `${style.fontSize}px`,
            fontWeight: style.fontWeight,
            color: style.color,
            textAlign: style.textAlign,
            fontFamily: style.fontFamily,
            lineHeight: style.lineHeight,
            letterSpacing: `${style.letterSpacing}px`,
            padding: '4px'
          }}
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          placeholder="Saisissez votre texte..."
        />
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            fontSize: `${style.fontSize}px`,
            fontWeight: style.fontWeight,
            color: style.color,
            textAlign: style.textAlign,
            fontFamily: style.fontFamily,
            lineHeight: style.lineHeight,
            letterSpacing: `${style.letterSpacing}px`,
            padding: '4px',
            overflow: 'hidden',
            wordWrap: 'break-word',
            display: 'flex',
            alignItems: 'flex-start'
          }}
        >
          {content || 'Cliquez pour éditer'}
        </div>
      )}

      {/* Controls - Only show when editing */}
      {isEditing && (
        <>
          {/* Drag Handle */}
          <div
            style={{
              position: 'absolute',
              top: '-24px',
              left: '0px',
              background: '#841b60',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '4px 4px 0 0',
              cursor: 'grab',
              fontSize: '11px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontFamily: 'Inter, sans-serif'
            }}
            onMouseDown={(e) => handleMouseDown(e, 'drag')}
          >
            <Move className="w-3 h-3" />
            <span>Déplacer</span>
          </div>

          {/* Resize Handle */}
          <div
            style={{
              position: 'absolute',
              bottom: '-2px',
              right: '-2px',
              width: '12px',
              height: '12px',
              background: '#841b60',
              cursor: 'nw-resize',
              borderRadius: '0 0 4px 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseDown={(e) => handleMouseDown(e, 'resize')}
          >
            <Maximize2 className="w-3 h-3 text-white" />
          </div>

          {/* Style Controls */}
          <div
            style={{
              position: 'absolute',
              right: '0px',
              top: '-24px',
              background: 'rgba(255, 255, 255, 0.95)',
              padding: '4px',
              borderRadius: '4px',
              display: 'flex',
              gap: '4px',
              fontSize: '11px',
              border: '1px solid #e5e7eb'
            }}
          >
            <input
              type="color"
              value={style.color}
              onChange={(e) => onStyleChange(id, { color: e.target.value })}
              style={{ width: '20px', height: '20px', border: 'none', cursor: 'pointer' }}
              title="Couleur du texte"
            />
            <input
              type="number"
              value={style.fontSize}
              onChange={(e) => onStyleChange(id, { fontSize: parseInt(e.target.value) || 16 })}
              style={{ width: '40px', padding: '2px', border: '1px solid #ccc', borderRadius: '2px' }}
              min="8"
              max="72"
              title="Taille de police"
            />
            <select
              value={style.fontWeight}
              onChange={(e) => onStyleChange(id, { fontWeight: e.target.value })}
              style={{ padding: '2px', border: '1px solid #ccc', borderRadius: '2px' }}
              title="Poids de police"
            >
              <option value="normal">Normal</option>
              <option value="bold">Gras</option>
              <option value="lighter">Léger</option>
            </select>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(id);
              }}
              style={{
                background: '#dc2626',
                color: 'white',
                border: 'none',
                borderRadius: '2px',
                padding: '2px 4px',
                cursor: 'pointer'
              }}
              title="Supprimer"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default FreeTextZone;
