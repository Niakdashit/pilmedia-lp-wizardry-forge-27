
import React, { useState, useRef, useEffect } from 'react';
import { Move, RotateCcw } from 'lucide-react';

interface DraggableTextZoneProps {
  id: string;
  initialPosition: { x: number; y: number };
  initialSize: { width: number; height: number };
  children: React.ReactNode;
  onPositionChange: (id: string, position: { x: number; y: number }) => void;
  onSizeChange: (id: string, size: { width: number; height: number }) => void;
  gameArea?: { x: number; y: number; width: number; height: number };
  containerBounds: { width: number; height: number };
  isSelected: boolean;
  onSelect: () => void;
}

const DraggableTextZone: React.FC<DraggableTextZoneProps> = ({
  id,
  initialPosition,
  initialSize,
  children,
  onPositionChange,
  onSizeChange,
  gameArea,
  containerBounds,
  isSelected,
  onSelect
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState(initialSize);
  const elementRef = useRef<HTMLDivElement>(null);

  // Check collision with game area
  const checkCollision = (newPos: { x: number; y: number }, newSize: { width: number; height: number }) => {
    if (!gameArea) return false;
    
    const textZone = {
      left: newPos.x,
      right: newPos.x + newSize.width,
      top: newPos.y,
      bottom: newPos.y + newSize.height
    };
    
    const game = {
      left: gameArea.x,
      right: gameArea.x + gameArea.width,
      top: gameArea.y,
      bottom: gameArea.y + gameArea.height
    };
    
    return !(textZone.right < game.left || 
             textZone.left > game.right || 
             textZone.bottom < game.top || 
             textZone.top > game.bottom);
  };

  // Constrain position to container bounds
  const constrainToContainer = (newPos: { x: number; y: number }, currentSize: { width: number; height: number }) => {
    return {
      x: Math.max(0, Math.min(containerBounds.width - currentSize.width, newPos.x)),
      y: Math.max(0, Math.min(containerBounds.height - currentSize.height, newPos.y))
    };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).classList.contains('drag-handle')) {
      e.preventDefault();
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
      onSelect();
    }
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    onSelect();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newPosition = {
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y
        };
        
        const constrainedPosition = constrainToContainer(newPosition, size);
        
        if (!checkCollision(constrainedPosition, size)) {
          setPosition(constrainedPosition);
          onPositionChange(id, constrainedPosition);
        }
      } else if (isResizing && elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const newSize = {
          width: Math.max(100, e.clientX - rect.left),
          height: Math.max(50, e.clientY - rect.top)
        };
        
        const constrainedPosition = constrainToContainer(position, newSize);
        
        if (!checkCollision(constrainedPosition, newSize)) {
          setSize(newSize);
          setPosition(constrainedPosition);
          onSizeChange(id, newSize);
          onPositionChange(id, constrainedPosition);
        }
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragStart, position, size, id, onPositionChange, onSizeChange, gameArea, containerBounds]);

  const resetPosition = () => {
    const defaultPos = { x: 20, y: 20 };
    const defaultSize = { width: 200, height: 80 };
    setPosition(defaultPos);
    setSize(defaultSize);
    onPositionChange(id, defaultPos);
    onSizeChange(id, defaultSize);
  };

  return (
    <div
      ref={elementRef}
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        border: isSelected ? '2px solid #841b60' : '1px dashed rgba(132, 27, 96, 0.3)',
        borderRadius: '4px',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(4px)',
        cursor: isDragging ? 'grabbing' : 'grab',
        zIndex: isSelected ? 100 : 50,
        minWidth: '100px',
        minHeight: '50px',
        overflow: 'hidden'
      }}
      onMouseDown={handleMouseDown}
      onClick={onSelect}
    >
      {/* Drag handle */}
      {isSelected && (
        <div
          className="drag-handle"
          style={{
            position: 'absolute',
            top: '-8px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#841b60',
            color: 'white',
            padding: '2px 6px',
            borderRadius: '4px',
            fontSize: '10px',
            cursor: 'grab',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <Move className="w-3 h-3" />
          <button
            onClick={(e) => {
              e.stopPropagation();
              resetPosition();
            }}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              padding: '0',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Content */}
      <div style={{ padding: '8px', height: '100%', overflow: 'hidden' }}>
        {children}
      </div>

      {/* Resize handle */}
      {isSelected && (
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            right: '0',
            width: '12px',
            height: '12px',
            background: '#841b60',
            cursor: 'se-resize',
            borderRadius: '0 0 4px 0'
          }}
          onMouseDown={handleResizeMouseDown}
        />
      )}
    </div>
  );
};

export default DraggableTextZone;
