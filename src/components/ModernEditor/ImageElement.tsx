import React, { useState, useRef } from 'react';
import { Trash2, RotateCw, Target, Lock, Unlock } from 'lucide-react';

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
  const [aspectRatioLocked, setAspectRatioLocked] = useState(true);
  const elementRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent, action: 'drag' | 'resize') => {
    e.preventDefault();
    e.stopPropagation();
    onSelect();

    if (!containerRef.current || !elementRef.current) return;

    if (action === 'drag') {
      const elementRect = elementRef.current.getBoundingClientRect();
      
      const offsetX = e.clientX - elementRect.left;
      const offsetY = e.clientY - elementRect.top;
      
      setIsDragging(true);

      const handleMouseMove = (moveEvent: MouseEvent) => {
        if (!containerRef.current) return;
        
        const containerRect = containerRef.current.getBoundingClientRect();
        
        let newX = moveEvent.clientX - containerRect.left - offsetX;
        let newY = moveEvent.clientY - containerRect.top - offsetY;
        
        // Constrain to container bounds
        newX = Math.max(0, Math.min(newX, containerRect.width - element.width));
        newY = Math.max(0, Math.min(newY, containerRect.height - element.height));
        
        // Use requestAnimationFrame for smooth updates
        requestAnimationFrame(() => {
          onUpdate({ x: newX, y: newY });
        });
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
      const aspectRatio = startWidth / startHeight;

      const handleMouseMove = (moveEvent: MouseEvent) => {
        if (!containerRef.current) return;
        
        const containerRect = containerRef.current.getBoundingClientRect();
        const deltaX = moveEvent.clientX - startX;
        const deltaY = moveEvent.clientY - startY;
        
        let newWidth = Math.max(20, startWidth + deltaX);
        let newHeight = Math.max(20, startHeight + deltaY);
        
        // Apply aspect ratio lock if enabled
        if (aspectRatioLocked) {
          const avgDelta = (deltaX + deltaY) / 2;
          newWidth = Math.max(20, startWidth + avgDelta);
          newHeight = newWidth / aspectRatio;
        }
        
        // Constrain to container bounds
        const maxWidth = containerRect.width - element.x;
        const maxHeight = containerRect.height - element.y;
        
        newWidth = Math.min(newWidth, maxWidth);
        newHeight = Math.min(newHeight, maxHeight);
        
        // Re-apply aspect ratio if constrained
        if (aspectRatioLocked) {
          if (newWidth / aspectRatio > newHeight) {
            newWidth = newHeight * aspectRatio;
          } else {
            newHeight = newWidth / aspectRatio;
          }
        }
        
        requestAnimationFrame(() => {
          onUpdate({ width: newWidth, height: newHeight });
        });
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

  const handleCenterElement = () => {
    if (!containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const centerX = (containerRect.width - element.width) / 2;
    const centerY = (containerRect.height - element.height) / 2;
    
    onUpdate({ x: centerX, y: centerY });
  };

  const toggleAspectRatio = () => {
    setAspectRatioLocked(!aspectRatioLocked);
  };

  if (!element.src) {
    return (
      <div
        style={{
          position: 'absolute',
          left: element.x,
          top: element.y,
          width: element.width,
          height: element.height,
          border: '2px dashed #cbd5e1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#64748b',
          fontSize: '12px',
          zIndex: isSelected ? 30 : 20
        }}
        onClick={onSelect}
        className="bg-gray-50 rounded"
      >
        Image vide
      </div>
    );
  }

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
        transform: `rotate(${element.rotation || 0}deg) ${isDragging ? 'scale(1.02)' : 'scale(1)'}`,
        transition: isDragging || isResizing ? 'none' : 'all 0.1s ease-out',
        willChange: isDragging || isResizing ? 'transform' : 'auto'
      }}
      onMouseDown={(e) => handleMouseDown(e, 'drag')}
      className={`${isSelected ? 'ring-2 ring-blue-500' : 'hover:ring-2 hover:ring-gray-300'} transition-all duration-100`}
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
          <div className="absolute -top-10 left-0 flex space-x-1 bg-white rounded shadow-lg px-2 py-1 border">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCenterElement();
              }}
              className="p-1 hover:bg-blue-100 text-blue-600 rounded"
              title="Centrer l'élément"
            >
              <Target className="w-3 h-3" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleAspectRatio();
              }}
              className={`p-1 rounded ${aspectRatioLocked ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
              title={aspectRatioLocked ? "Déverrouiller les proportions" : "Verrouiller les proportions"}
            >
              {aspectRatioLocked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
            </button>
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

          {/* Resize handles */}
          <div
            className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded cursor-se-resize hover:bg-blue-600 flex items-center justify-center"
            onMouseDown={(e) => handleMouseDown(e, 'resize')}
            title="Redimensionner"
          >
            <div className="w-2 h-2 bg-white rounded-sm"></div>
          </div>
          
          {/* Corner resize handles for better UX */}
          <div
            className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded cursor-ne-resize hover:bg-blue-600"
            onMouseDown={(e) => handleMouseDown(e, 'resize')}
            title="Redimensionner"
          />
          <div
            className="absolute -bottom-1 -left-1 w-3 h-3 bg-blue-500 rounded cursor-sw-resize hover:bg-blue-600"
            onMouseDown={(e) => handleMouseDown(e, 'resize')}
            title="Redimensionner"
          />
          <div
            className="absolute -top-1 -left-1 w-3 h-3 bg-blue-500 rounded cursor-nw-resize hover:bg-blue-600"
            onMouseDown={(e) => handleMouseDown(e, 'resize')}
            title="Redimensionner"
          />
        </>
      )}
    </div>
  );
};

export default ImageElement;
