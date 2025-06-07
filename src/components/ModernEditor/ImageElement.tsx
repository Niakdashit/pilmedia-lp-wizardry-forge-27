
import React, { useState, useRef } from 'react';
import { Trash2, RotateCw, Move, Maximize2 } from 'lucide-react';

interface ImageElementProps {
  element: any;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (updates: any) => void;
  onDelete: () => void;
  containerRef: React.RefObject<HTMLDivElement>;
}

const ImageElement: React.FC<ImageElementProps> = ({
  element,
  isSelected,
  onSelect,
  onUpdate,
  onDelete,
  containerRef
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent, action: 'drag' | 'resize') => {
    e.preventDefault();
    e.stopPropagation();
    onSelect();

    if (action === 'drag') {
      setIsDragging(true);
      const startX = e.clientX - element.x;
      const startY = e.clientY - element.y;

      const handleMouseMove = (moveEvent: MouseEvent) => {
        if (!containerRef.current) return;
        
        const containerRect = containerRef.current.getBoundingClientRect();
        const newX = Math.max(0, Math.min(moveEvent.clientX - startX, containerRect.width - element.width));
        const newY = Math.max(0, Math.min(moveEvent.clientY - startY, containerRect.height - element.height));
        
        onUpdate({ x: newX, y: newY });
      };

      const handleMouseUp = () => {
        setIsDragging(false);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else if (action === 'resize') {
      setIsResizing(true);
      const startX = e.clientX;
      const startY = e.clientY;
      const startWidth = element.width;
      const startHeight = element.height;

      const handleMouseMove = (moveEvent: MouseEvent) => {
        if (!containerRef.current) return;
        
        const deltaX = moveEvent.clientX - startX;
        const deltaY = moveEvent.clientY - startY;
        const newWidth = Math.max(50, Math.min(startWidth + deltaX, containerRef.current.getBoundingClientRect().width - element.x));
        const newHeight = Math.max(50, Math.min(startHeight + deltaY, containerRef.current.getBoundingClientRect().height - element.y));
        
        onUpdate({ width: newWidth, height: newHeight });
      };

      const handleMouseUp = () => {
        setIsResizing(false);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
  };

  return (
    <div
      ref={elementRef}
      style={{
        position: 'absolute',
        left: element.x,
        top: element.y,
        width: element.width,
        height: element.height,
        cursor: isDragging ? 'grabbing' : 'grab',
        zIndex: isSelected ? 30 : 20,
        transform: `rotate(${element.rotation || 0}deg)`,
        transition: isDragging || isResizing ? 'none' : 'all 0.2s ease'
      }}
      onMouseDown={(e) => handleMouseDown(e, 'drag')}
      className={`${isSelected ? 'ring-2 ring-blue-500' : 'hover:ring-2 hover:ring-gray-300'} transition-all duration-200`}
    >
      <img
        src={element.src}
        alt="Custom element"
        className="w-full h-full object-cover rounded"
        draggable={false}
      />
      
      {isSelected && (
        <>
          {/* Controls */}
          <div className="absolute -top-8 left-0 flex space-x-1 bg-white rounded shadow-lg px-2 py-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onUpdate({ rotation: (element.rotation || 0) + 15 });
              }}
              className="p-1 hover:bg-gray-100 rounded"
              title="Rotation"
            >
              <RotateCw className="w-3 h-3" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="p-1 hover:bg-red-100 text-red-600 rounded"
              title="Supprimer"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>

          {/* Resize handle */}
          <div
            className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded cursor-se-resize"
            onMouseDown={(e) => handleMouseDown(e, 'resize')}
            title="Redimensionner"
          >
            <Maximize2 className="w-3 h-3 text-white" />
          </div>
        </>
      )}
    </div>
  );
};

export default ImageElement;
