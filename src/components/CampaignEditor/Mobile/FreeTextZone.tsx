
import React, { useState, useRef } from 'react';
import { Edit3, Trash2, Move, Maximize2 } from 'lucide-react';

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
  const [resizeStart, setResizeStart] = useState({ width: 0, height: 0 });
  const zoneRef = useRef<HTMLDivElement>(null);

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
      setResizeStart({ 
        width: e.clientX - position.x, 
        height: e.clientY - position.y 
      });
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
  }, [isDragging, isResizing, dragStart, resizeStart, position, size, containerBounds]);

  return (
    <div
      ref={zoneRef}
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        zIndex: 150,
        border: isEditing ? '2px dashed #841b60' : '1px solid transparent',
        backgroundColor: 'transparent',
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        overflow: 'hidden'
      }}
      onClick={(e) => {
        e.stopPropagation();
        onEdit(isEditing ? '' : id);
      }}
    >
      {/* Text Content */}
      {isEditing ? (
        <textarea
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
            padding: '2px'
          }}
          onClick={(e) => e.stopPropagation()}
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
            padding: '2px',
            overflow: 'hidden',
            wordWrap: 'break-word'
          }}
        >
          {content}
        </div>
      )}

      {/* Controls */}
      {isEditing && (
        <>
          {/* Drag Handle */}
          <div
            style={{
              position: 'absolute',
              top: '-20px',
              left: '0px',
              background: '#841b60',
              color: 'white',
              padding: '2px 6px',
              borderRadius: '4px 4px 0 0',
              cursor: 'grab',
              fontSize: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
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
              borderRadius: '0 0 4px 0'
            }}
            onMouseDown={(e) => handleMouseDown(e, 'resize')}
          >
            <Maximize2 className="w-3 h-3 text-white" style={{ fontSize: '8px' }} />
          </div>

          {/* Style Controls */}
          <div
            style={{
              position: 'absolute',
              top: '-20px',
              right: '0px',
              background: 'rgba(255, 255, 255, 0.9)',
              padding: '4px',
              borderRadius: '4px',
              display: 'flex',
              gap: '4px',
              fontSize: '10px'
            }}
          >
            <input
              type="color"
              value={style.color}
              onChange={(e) => onStyleChange(id, { color: e.target.value })}
              style={{ width: '20px', height: '20px', border: 'none', cursor: 'pointer' }}
            />
            <input
              type="number"
              value={style.fontSize}
              onChange={(e) => onStyleChange(id, { fontSize: parseInt(e.target.value) || 16 })}
              style={{ width: '40px', padding: '2px', border: '1px solid #ccc', borderRadius: '2px' }}
              min="8"
              max="72"
            />
            <select
              value={style.textAlign}
              onChange={(e) => onStyleChange(id, { textAlign: e.target.value })}
              style={{ padding: '2px', border: '1px solid #ccc', borderRadius: '2px' }}
            >
              <option value="left">←</option>
              <option value="center">↔</option>
              <option value="right">→</option>
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
